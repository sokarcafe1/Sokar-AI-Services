import React, { useState, useEffect } from 'react';
import {
  X,
  GraduationCap,
  PlayCircle,
  FileText,
  Award,
  CheckCircle2,
  BookOpen,
  Download,
  Star,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  RotateCcw,
  Sparkles,
  Subtitles,
  ChevronRight,
  ShieldCheck,
  Tv,
  Clock,
  Check
} from 'lucide-react';

interface CourseVideo {
  id: string;
  title: string;
  duration: string;
  category: string;
  completed: boolean;
  description: string;
  previewColor: string;
  chapters: { time: string; title: string }[];
  transcript: { time: string; text: string }[];
}

interface TrainingCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrainingCenterModal: React.FC<TrainingCenterModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'videos' | 'pdf_guides' | 'quiz' | 'certificate'>('videos');

  const [courses, setCourses] = useState<CourseVideo[]>([
    {
      id: 'c1',
      title: 'الشرح الشامل لإدخال المعاملات وإدارة الشباك الحكومي',
      duration: '15:00',
      category: 'الأساسيات',
      completed: true,
      description: 'تعلم خطوة بخطوة كيفية اختيار الخدمة الحكومية، تسجيل بيانات المواطن، قراءة الرقم القومي، واستخراج إيصال السداد المعتمد.',
      previewColor: 'from-emerald-900 to-slate-950',
      chapters: [
        { time: '00:00', title: 'المقدمة والواجهة الرئيسية للمكتب' },
        { time: '02:30', title: 'إدخال بيانات المواطن والرقم القومي 14 رقم' },
        { time: '06:15', title: 'حساب الرسوم وإضافة المعاملة للشباك' },
        { time: '10:40', title: 'طباعة الإيصال الحراري وتسليمه للعميل' }
      ],
      transcript: [
        { time: '00:05', text: 'أهلاً بكم في الدورة التعليمية الخاصة ببرنامج Sokar OS للخدمات الحكومية.' },
        { time: '02:35', text: 'عند فتح الواجهة الرئيسية، اضغط على زر "إضافة معاملة جديدة" في الشباك النشط.' },
        { time: '06:20', text: 'يقوم النظام بحساب الرسوم وتوزيعها بين رسوم الدولة وعمولة المكتب تلقائياً.' },
        { time: '10:45', text: 'اضغط على زر الطباعة السريعة F12 لاستخراج الإيصال ذو كود QR المعتمد.' }
      ]
    },
    {
      id: 'c2',
      title: 'دورة الذكاء الاصطناعي والماسح الضوئي OCR لقراءة البطاقات',
      duration: '12:30',
      category: 'الذكاء الاصطناعي',
      completed: true,
      description: 'شرح استخدام ماسح البطاقات الذكي، الاستخراج التلقائي للاسم والرقم القومي والعنوان، والمساعد الذكي للإجابة عن إجراءات الخدمات.',
      previewColor: 'from-blue-900 to-slate-950',
      chapters: [
        { time: '00:00', title: 'تفعيل الكاميرا والماسح الضوئي' },
        { time: '03:10', title: 'قراءة البطاقات الشخصية واستخراج البيانات' },
        { time: '07:45', title: 'استخدام المساعد الذكي لمعرفة المستندات المطلوب تقديمها' }
      ],
      transcript: [
        { time: '00:10', text: 'يوفر النظام تقنية OCR المتقدمة لقراءة البطاقات والمستندات بضغطة واحدة.' },
        { time: '03:15', text: 'وجه صورة البطاقة أمام الكاميرا أو افحصها بالماسح الضوئي وسيتم ملء الاستمارة فورا.' },
        { time: '07:50', text: 'يمكنك سؤال المساعد الذكي عن أي شرط أو ورقة مطلوبة لأي وزارة في مصر.' }
      ]
    },
    {
      id: 'c3',
      title: 'دورة إدارة الخزينة والشفتات والتقارير المالية اليومية',
      duration: '18:15',
      category: 'الحسابات',
      completed: false,
      description: 'كيفية قفل ورديات الموظفين، مطابقة النقدية الفعلية مع النظام، استخراج تقارير الأرباح، وتصدير ملفات Excel للضرائب.',
      previewColor: 'from-amber-900 to-slate-950',
      chapters: [
        { time: '00:00', title: 'بدء الشفت اليومي واستلام الخزينة' },
        { time: '05:20', title: 'تسجيل المصروفات والإيرادات الجانبية' },
        { time: '11:00', title: 'إغلاق الورقية وطباعة تقرير التصفية' }
      ],
      transcript: [
        { time: '00:15', text: 'تعتبر الخزينة والوردية المركزية هي عصب العمل المالي داخل مكتب الخدمات.' },
        { time: '05:25', text: 'قم بتسجيل أي مصروفات نثرية أو صيانة ليتم خصمها من صافي ربح المكتب.' },
        { time: '11:05', text: 'عند نهاية اليوم اضغط على "تصفية الشفت" لمطابقة درج النقدية وطباعة التقرير.' }
      ]
    },
    {
      id: 'c4',
      title: 'دورة إدارة اشتراكات المكتب، التراخيص وتوثيق معرّف الهاردوير HWID',
      duration: '14:20',
      category: 'الأمان والتراخيص',
      completed: false,
      description: 'شرح تفعيل التراخيص، تجديد الاشتراك عبر إنستا باي وفودافون كاش، وربط حساب المكتب بأجهزة الكمبيوتر المعتمدة.',
      previewColor: 'from-purple-900 to-slate-950',
      chapters: [
        { time: '00:00', title: 'خطوات تجديد الاشتراك واختيار الباقة' },
        { time: '04:15', title: 'التحويل المباشر لـ 01002997208 وتوليد الترخيص' },
        { time: '09:00', title: 'إدارة أجهزة الكمبيوتر المقترنة وحمايتها بـ HWID' }
      ],
      transcript: [
        { time: '00:20', text: 'تستطيع اختيار الباقة المناسبة لمكتبك والتجديد الفوري من داخل النظام.' },
        { time: '04:20', text: 'بعد التحويل لـ 01002997208 أدخل رقم عملية التحويل لتفعيل الترخيص فوراً.' },
        { time: '09:05', text: 'يتم قفل الحساب على جهاز كمبيوتر رئيسي لحمايته ويمكنك إضافة أجهزة أخرى بمرونة.' }
      ]
    }
  ]);

  // Player state
  const [selectedVideo, setSelectedVideo] = useState<CourseVideo | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(15);
  const [isMuted, setIsMuted] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Quiz state
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizPassed, setQuizPassed] = useState(false);

  // Video progress animation timer
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            if (selectedVideo) {
              setCourses(cList => cList.map(c => c.id === selectedVideo.id ? { ...c, completed: true } : c));
            }
            return 100;
          }
          return prev + 1;
        });
      }, 500);
    }
    return () => clearInterval(timer);
  }, [isPlaying, selectedVideo]);

  if (!isOpen) return null;

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quizAnswer === 1) { // Correct answer index
      setQuizPassed(true);
      setActiveTab('certificate');
    } else {
      alert('إجابة غير صحيحة، يرجى إعادة مراجعة دورة الأساسيات وحاول مرة أخرى!');
    }
  };

  const currentTranscript = selectedVideo?.transcript[Math.floor((progress / 100) * (selectedVideo.transcript.length || 1))] || selectedVideo?.transcript[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-3 md:p-6 overflow-y-auto dir-rtl font-sans">
      <div className="bg-slate-900 text-slate-100 rounded-3xl border border-emerald-500/30 shadow-2xl w-full max-w-5xl max-h-[94vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-slate-950 p-4 px-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl shadow-lg">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">مركز الكورسات والفيديوهات التفاعلية لشرح الموقع - Video Tutorials</h2>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Sokar OS Academy
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                شرح حي وتفاعلي لكل شاشات ووظائف نظام تشغيل المكاتب الحكومية بالصوت والصورة
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 p-2 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-slate-950/70 border-b border-slate-800 px-6 py-2.5 flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
          {[
            { id: 'videos', label: 'الفيديوهات التدريبية والمحاكاة', icon: PlayCircle },
            { id: 'pdf_guides', label: 'كتيبات الاستخدام PDF', icon: FileText },
            { id: 'quiz', label: 'الاختبار التأهيلي', icon: BookOpen },
            { id: 'certificate', label: 'شهادة إتقان النظام', icon: Award }
          ].map(tab => {
            const IconComp = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  if (tab.id !== 'videos') setSelectedVideo(null);
                }}
                className={`px-4 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <IconComp className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-900/90 text-slate-200 space-y-4 text-xs">
          
          {/* VIDEO PLAYER SCREEN IF A VIDEO IS SELECTED */}
          {activeTab === 'videos' && selectedVideo && (
            <div className="space-y-4 animate-in fade-in">
              <button
                onClick={() => {
                  setSelectedVideo(null);
                  setIsPlaying(false);
                }}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1 border border-slate-700 w-fit"
              >
                <ChevronRight className="w-4 h-4" />
                <span>الرجوع إلى قائمة الكورسات</span>
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Main Interactive Video Canvas Area */}
                <div className="lg:col-span-2 space-y-3">
                  <div className={`relative rounded-3xl overflow-hidden border-2 border-emerald-500/40 bg-gradient-to-br ${selectedVideo.previewColor} shadow-2xl aspect-video flex flex-col justify-between p-4`}>
                    
                    {/* Top Overlay Badge */}
                    <div className="flex items-center justify-between z-10">
                      <span className="bg-slate-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/40 font-black text-[10px] px-3 py-1 rounded-full flex items-center gap-1.5">
                        <Tv className="w-3.5 h-3.5" />
                        <span>عرض توضيحي مباشر للبرنامج (Live Simulated Video Tutorial)</span>
                      </span>
                      <span className="bg-slate-950/80 backdrop-blur-md text-amber-300 font-mono text-[11px] font-bold px-2.5 py-1 rounded-lg border border-slate-800">
                        {selectedVideo.duration}
                      </span>
                    </div>

                    {/* Middle Animated Walkthrough UI Simulation */}
                    <div className="my-auto text-center space-y-4 py-6 z-10">
                      <div className="w-16 h-16 bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 rounded-full flex items-center justify-center mx-auto shadow-2xl backdrop-blur-md">
                        {isPlaying ? (
                          <Sparkles className="w-8 h-8 animate-spin text-emerald-400" />
                        ) : (
                          <Play className="w-8 h-8 translate-x-0.5 text-white" />
                        )}
                      </div>

                      <div className="space-y-1 max-w-md mx-auto">
                        <h3 className="font-black text-white text-base leading-snug">{selectedVideo.title}</h3>
                        <p className="text-slate-300 text-xs font-bold bg-slate-950/60 p-2 rounded-xl border border-slate-800">
                          {isPlaying ? 'جاري التشغيل والعرض التفاعلي... تابع التعليمات على الشاشة' : 'انقر على زر التشغيل لبدء مشاهدة الشرح المباشر'}
                        </p>
                      </div>

                      {/* Animated Simulated Screen Action */}
                      {isPlaying && (
                        <div className="bg-slate-950/90 border border-emerald-500/50 p-3 rounded-2xl max-w-sm mx-auto space-y-2 text-right animate-pulse">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-emerald-400 font-bold">🖥️ شاشة النظام الحية:</span>
                            <span className="text-slate-400 font-mono">الخطوة {Math.floor((progress / 25) + 1)} من 4</span>
                          </div>
                          <div className="bg-slate-900 p-2 rounded-xl text-[11px] text-slate-200 border border-slate-800">
                            {progress < 25 && '1. إدخال الرقم القومي والاسم وتحديد نوع الخدمة الحكومية...'}
                            {progress >= 25 && progress < 50 && '2. المسح الضوئي الذكي للبطاقات واستخراج المستندات المطلوب إرفاقها...'}
                            {progress >= 50 && progress < 75 && '3. حساب الإجمالي وطباعة الإيصال الحراري برقم مرجعي...'}
                            {progress >= 75 && '4. حفظ المعاملة تلقائياً بالسحابة وتحديث الخزينة بالشفت...'}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Subtitle / Voiceover Transcript Display */}
                    {showSubtitles && currentTranscript && (
                      <div className="bg-slate-950/90 backdrop-blur-md border border-amber-500/40 p-2.5 rounded-2xl text-center text-amber-200 text-xs font-bold shadow-lg z-10 max-w-xl mx-auto w-full">
                        💬 الشرح الصوتي: "{currentTranscript.text}"
                      </div>
                    )}

                    {/* Bottom Controls Bar */}
                    <div className="bg-slate-950/90 backdrop-blur-md p-3 rounded-2xl border border-slate-800 flex items-center gap-3 z-10 mt-2">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all shadow-md"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => setProgress(0)}
                        className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl"
                        title="إعادة من البداية"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>

                      {/* Scrub Bar */}
                      <div className="flex-1 space-y-1">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={progress}
                          onChange={(e) => setProgress(Number(e.target.value))}
                          className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                        />
                      </div>

                      <span className="font-mono text-[11px] text-slate-300 font-bold min-w-[50px] text-center">
                        {Math.floor((progress / 100) * 15)}:00 / {selectedVideo.duration}
                      </span>

                      <button
                        onClick={() => setShowSubtitles(!showSubtitles)}
                        className={`p-2 rounded-xl text-xs font-bold transition-all ${
                          showSubtitles ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'bg-slate-800 text-slate-400'
                        }`}
                        title="ترجمة الشرح"
                      >
                        <Subtitles className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl"
                      >
                        {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                    </div>

                  </div>

                  {/* Description Box */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                    <h4 className="font-bold text-white text-sm flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-emerald-400" />
                      <span>تفاصيل هذا الشرح التدريبي:</span>
                    </h4>
                    <p className="text-slate-300 text-xs leading-relaxed">{selectedVideo.description}</p>
                  </div>
                </div>

                {/* Chapters & Index Column */}
                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded-3xl border border-slate-800 space-y-3">
                    <h4 className="font-black text-white text-xs flex items-center gap-2 border-b border-slate-800 pb-2">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <span>فصول ومحطات الدرس (Video Chapters):</span>
                    </h4>

                    <div className="space-y-1.5">
                      {selectedVideo.chapters.map((ch, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setProgress(idx * 28);
                            setIsPlaying(true);
                          }}
                          className="w-full text-right p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 transition-all flex items-center justify-between group"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-slate-800 group-hover:bg-emerald-600 text-slate-300 group-hover:text-white flex items-center justify-center text-[10px] font-bold">
                              {idx + 1}
                            </span>
                            <span className="text-xs text-slate-200 group-hover:text-white font-bold">{ch.title}</span>
                          </div>
                          <span className="font-mono text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                            {ch.time}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Mark Completed Button */}
                  <button
                    onClick={() => {
                      setCourses(cList => cList.map(c => c.id === selectedVideo.id ? { ...c, completed: true } : c));
                      alert('تم تسجيل إكمال هذه الدورة بنجاح في سجل الموظف!');
                    }}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3 rounded-2xl shadow-lg flex items-center justify-center gap-2 text-xs"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>تأكيد إكمال مشاهدة الفيديو وحفظ التقديم</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: VIDEOS LIST VIEW (WHEN NO VIDEO SELECTED) */}
          {activeTab === 'videos' && !selectedVideo && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="font-black text-white text-sm">مكتبة الدروس الشاملة لشرح كافة خواص وميزات الموقع:</h3>
                  <p className="text-slate-400 text-xs">اختر الفيديو المطلوب لمشاهدته مباشرة داخل مشغل الموقع التفاعلي</p>
                </div>
                <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-xs font-bold px-3 py-1 rounded-full">
                  {courses.filter(c => c.completed).length} من {courses.length} مكتملة
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.map(c => (
                  <div key={c.id} className="bg-slate-950 p-5 rounded-3xl border border-slate-800 hover:border-emerald-500/40 space-y-3 flex flex-col justify-between transition-all group">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] bg-slate-800 text-emerald-400 font-bold px-2.5 py-0.5 rounded-lg border border-slate-700">{c.category}</span>
                        <span className="text-[11px] text-amber-300 font-mono font-bold flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{c.duration}</span>
                        </span>
                      </div>
                      <h4 className="font-black text-white text-base leading-snug group-hover:text-emerald-300 transition-colors">{c.title}</h4>
                      <p className="text-slate-400 text-xs line-clamp-2">{c.description}</p>
                    </div>

                    <div className="pt-3 flex items-center justify-between border-t border-slate-800/80">
                      {c.completed ? (
                        <span className="text-emerald-400 font-bold text-xs flex items-center gap-1 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>مكتمل تم الشرح</span>
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs font-bold">لم تشاهد بعد</span>
                      )}
                      
                      <button
                        onClick={() => {
                          setSelectedVideo(c);
                          setIsPlaying(true);
                          setProgress(5);
                        }}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-lg shadow-emerald-950/50 transition-all text-xs"
                      >
                        <PlayCircle className="w-4 h-4" />
                        <span>تشغيل الشرح بالفيديو</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: PDF GUIDES */}
          {activeTab === 'pdf_guides' && (
            <div className="space-y-3 animate-in fade-in">
              <h3 className="font-bold text-white text-sm">أدلة التشغيل السريع والأدلة الإرشادية بصيغة PDF:</h3>
              {[
                { title: 'دليل المستخدم الشامل لنظام Sokar Office OS (إصدار 2026)', size: '4.2 MB' },
                { title: 'دليل ربط وتعريف الطابعات الحرارية والـ POS والـ HWID', size: '1.8 MB' },
                { title: 'كتيب إرشادات أمان الأرشيف الرقمي وقانون حماية البيانات', size: '2.5 MB' }
              ].map((pdf, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-rose-400" />
                    <div>
                      <h4 className="font-bold text-white text-xs">{pdf.title}</h4>
                      <span className="text-[10px] text-slate-500 font-mono">{pdf.size}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => alert(`جاري تنزيل الملف: ${pdf.title}...`)}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center gap-1"
                  >
                    <Download className="w-4 h-4" />
                    <span>تحميل</span>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: QUIZ */}
          {activeTab === 'quiz' && (
            <form onSubmit={handleQuizSubmit} className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 animate-in fade-in">
              <h3 className="font-bold text-white text-base">الاختبار التأهيلي للحصول على شهادة استخدام النظام</h3>
              <p className="text-slate-400">سؤال: ما هو الخيار الصحيح للبحث عن المعاملة السابقة في النظام؟</p>

              <div className="space-y-2 pt-2">
                {[
                  '1. البحث اليدوي في الملفات الورقية القديمة فقط.',
                  '2. إدخال الرقم القومي للمواطن أو الرقم المرجعي للإيصال في شريط البحث الذكي.',
                  '3. إعادة إدخال جميع بيانات المواطن من الجديد.'
                ].map((opt, idx) => (
                  <label key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer">
                    <input
                      type="radio"
                      name="quiz"
                      onChange={() => setQuizAnswer(idx)}
                      className="accent-emerald-500"
                    />
                    <span className="font-bold text-slate-200">{opt}</span>
                  </label>
                ))}
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3 rounded-xl shadow-lg"
              >
                تأكيد الإجابة واستخراج الشهادة
              </button>
            </form>
          )}

          {/* TAB 4: CERTIFICATE */}
          {activeTab === 'certificate' && (
            <div className="space-y-4 text-center py-4 animate-in fade-in">
              <div className="bg-gradient-to-b from-emerald-950 to-slate-950 p-8 rounded-3xl border-2 border-amber-400/50 space-y-4 max-w-xl mx-auto shadow-2xl relative">
                <Star className="w-10 h-10 text-amber-400 mx-auto animate-pulse" />
                <h3 className="text-2xl font-black text-amber-300">شهادة إتقان واجتياز نظام تشغيل المكاتب</h3>
                <p className="text-xs text-slate-300">
                  تشهد إدارة Sokar OS بأن موظفي <strong className="text-white">مكتب الخدمات الحكومية المعتمد</strong> قد أتموا الدورة التدريبية والاختبار العملي بنجاح.
                </p>
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>كود الشهادة: CERT-2026-9081</span>
                  <span>التاريخ: {new Date().toLocaleDateString('ar-EG')}</span>
                </div>
              </div>

              <button
                onClick={() => alert('جاري طباعة أو تنزيل الشهادة الرسمية صيغة PDF...')}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 py-2.5 rounded-xl shadow-lg flex items-center gap-2 mx-auto"
              >
                <Download className="w-4 h-4" />
                <span>طباعة / تنزيل الشهادة المعتمدة</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

