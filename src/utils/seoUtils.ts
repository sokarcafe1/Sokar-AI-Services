import { EducationService, OfficialAnnouncement } from '../types';

export function generateServiceJsonLd(service: EducationService) {
  return {
    '@context': 'https://schema.org',
    '@type': 'GovernmentService',
    'name': service.name,
    'alternateName': service.nameEn || service.name,
    'description': service.description,
    'provider': {
      '@type': 'GovernmentOrganization',
      'name': service.authority || 'الحكومة المصرية',
      'url': service.officialUrl || 'https://digital.gov.eg'
    },
    'serviceType': service.category,
    'offers': {
      '@type': 'Offer',
      'price': service.fees ? service.fees : '0',
      'priceCurrency': 'EGP'
    },
    'url': service.officialUrl || 'https://digital.gov.eg',
    'serviceOutput': service.whoCanApply,
    'dateModified': service.lastVerifiedDate || '2026-07-24'
  };
}

export function generateAnnouncementJsonLd(announcement: OfficialAnnouncement) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SpecialAnnouncement',
    'name': announcement.titleAr,
    'alternateName': announcement.titleEn,
    'announcementLocation': {
      '@type': 'CivicStructure',
      'name': announcement.officialAuthorityAr
    },
    'category': announcement.category,
    'url': announcement.officialUrl,
    'datePosted': announcement.openingDate !== 'غير معلن رسمياً' ? announcement.openingDate : '2026-07-01',
    'expires': announcement.closingDate !== 'غير معلن رسمياً' ? announcement.closingDate : '2026-08-31',
    'provider': {
      '@type': 'GovernmentOrganization',
      'name': announcement.officialAuthorityAr,
      'url': announcement.officialUrl
    }
  };
}

export function injectStructuredData(data: object, id: string) {
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.text = JSON.stringify(data, null, 2);
}

export function generateSitemapXml(services: EducationService[], announcements: OfficialAnnouncement[]): string {
  const domain = 'https://egypt-services.gov.eg';
  const now = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Home Page
  xml += `  <url>\n    <loc>${domain}/</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;

  // Services
  services.forEach(s => {
    xml += `  <url>\n    <loc>${domain}/service/${s.id}</loc>\n    <lastmod>${s.lastVerifiedDate || now}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
  });

  // Announcements
  announcements.forEach(a => {
    xml += `  <url>\n    <loc>${domain}/announcement/${a.id}</loc>\n    <lastmod>${a.openingDate !== 'غير معلن رسمياً' ? a.openingDate : now}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
  });

  xml += `</urlset>`;
  return xml;
}
