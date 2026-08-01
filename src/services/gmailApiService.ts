// Gmail API Integration Service for Sokar Office OS

export interface GmailHeader {
  name: string;
  value: string;
}

export interface GmailMessageSummary {
  id: string;
  threadId: string;
  snippet?: string;
  subject?: string;
  from?: string;
  date?: string;
  unread?: boolean;
}

export interface GmailMessageDetail extends GmailMessageSummary {
  body?: string;
  to?: string;
  headers?: GmailHeader[];
}

export const fetchGmailMessages = async (
  accessToken: string,
  maxResults: number = 15,
  query: string = ''
): Promise<GmailMessageSummary[]> => {
  const q = query ? `&q=${encodeURIComponent(query)}` : '';
  const url = `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=${maxResults}${q}`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || 'فشل في جلب رسائل البريد من Gmail');
  }

  const data = await res.json();
  if (!data.messages || !Array.isArray(data.messages)) {
    return [];
  }

  // Fetch headers for summary
  const summaries: GmailMessageSummary[] = await Promise.all(
    data.messages.map(async (msg: { id: string; threadId: string }) => {
      try {
        const detailRes = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=Date`,
          {
            headers: { Authorization: `Bearer ${accessToken}` }
          }
        );
        if (!detailRes.ok) return { id: msg.id, threadId: msg.threadId };
        const detail = await detailRes.json();
        const headers = detail.payload?.headers || [];
        const subject = headers.find((h: any) => h.name.toLowerCase() === 'subject')?.value || 'بدون عنوان';
        const from = headers.find((h: any) => h.name.toLowerCase() === 'from')?.value || 'غير معروف';
        const date = headers.find((h: any) => h.name.toLowerCase() === 'date')?.value || '';
        const unread = detail.labelIds ? detail.labelIds.includes('UNREAD') : false;

        return {
          id: msg.id,
          threadId: msg.threadId,
          snippet: detail.snippet || '',
          subject,
          from,
          date,
          unread
        };
      } catch {
        return { id: msg.id, threadId: msg.threadId };
      }
    })
  );

  return summaries;
};

export const fetchGmailMessageDetail = async (
  accessToken: string,
  messageId: string
): Promise<GmailMessageDetail> => {
  const url = `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}?format=full`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!res.ok) {
    throw new Error('تعذر تحميل تفاصيل الرسالة');
  }

  const detail = await res.json();
  const headers = detail.payload?.headers || [];
  const subject = headers.find((h: any) => h.name.toLowerCase() === 'subject')?.value || 'بدون عنوان';
  const from = headers.find((h: any) => h.name.toLowerCase() === 'from')?.value || 'غير معروف';
  const to = headers.find((h: any) => h.name.toLowerCase() === 'to')?.value || '';
  const date = headers.find((h: any) => h.name.toLowerCase() === 'date')?.value || '';

  // Parse body text
  let body = detail.snippet || '';
  if (detail.payload) {
    body = extractBodyFromPayload(detail.payload) || body;
  }

  return {
    id: messageId,
    threadId: detail.threadId,
    snippet: detail.snippet || '',
    subject,
    from,
    to,
    date,
    body,
    headers
  };
};

function extractBodyFromPayload(payload: any): string {
  if (payload.body && payload.body.data) {
    return decodeBase64Url(payload.body.data);
  }
  if (payload.parts && Array.isArray(payload.parts)) {
    for (const part of payload.parts) {
      if (part.mimeType === 'text/plain' && part.body && part.body.data) {
        return decodeBase64Url(part.body.data);
      }
      if (part.mimeType === 'text/html' && part.body && part.body.data) {
        // Fallback to text version
        const html = decodeBase64Url(part.body.data);
        return html.replace(/<[^>]+>/g, ' ');
      }
      if (part.parts) {
        const sub = extractBodyFromPayload(part);
        if (sub) return sub;
      }
    }
  }
  return '';
}

function decodeBase64Url(str: string): string {
  try {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder('utf-8').decode(bytes);
  } catch {
    return str;
  }
}

export const sendGmailEmail = async (
  accessToken: string,
  to: string,
  subject: string,
  bodyText: string
): Promise<{ id: string; threadId: string }> => {
  // Construct RFC 2822 email format UTF-8
  const utf8Subject = `=?utf-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`;
  const emailLines = [
    `To: ${to}`,
    `Subject: ${utf8Subject}`,
    'Content-Type: text/plain; charset=utf-8',
    'MIME-Version: 1.0',
    '',
    bodyText
  ];

  const rawEmail = emailLines.join('\r\n');
  const encodedRaw = btoa(unescape(encodeURIComponent(rawEmail)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ raw: encodedRaw })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || 'فشل إرسال البريد الإلكتروني عبر Gmail');
  }

  return await res.json();
};

export const trashGmailMessage = async (
  accessToken: string,
  messageId: string
): Promise<boolean> => {
  const res = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}/trash`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  return res.ok;
};
