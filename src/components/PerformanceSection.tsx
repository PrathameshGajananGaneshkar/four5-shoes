import React, { useState, useRef } from 'react';
import {
  ShieldCheck,
  Zap,
  Compass,
  CheckCircle2,
  Award,
  ArrowRight,
  Camera,
  RotateCcw,
  Upload,
  Check,
  Loader2,
} from 'lucide-react';

interface PerformanceSectionProps {
  onExploreTech?: () => void;
}

// Canvas-based image optimizer to keep memory low and preserve PNG transparency
const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const isPng = file.type === 'image/png';
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const maxWidth = 1200;
        const maxHeight = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        // Preserve PNG transparency if user uploads transparent sneaker PNG cutout
        if (isPng) {
          resolve(canvas.toDataURL('image/png'));
        } else {
          resolve(canvas.toDataURL('image/jpeg', 0.88));
        }
      };
      img.onerror = () => resolve(e.target?.result as string);
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const PerformanceSection: React.FC<PerformanceSectionProps> = ({ onExploreTech }) => {
  const [activeTab, setActiveTab] = useState<'design' | 'comfort' | 'performance'>('performance');

  // Performance shoe image state with persistence
  const [shoeImage, setShoeImage] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('four5_performance_image');
      if (saved) return saved;
    } catch {
      // ignore
    }
    return '/performance-shoe.jpg';
  });

  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProcessFile = async (file: File) => {
    setIsUploading(true);
    // Instant optimistic preview
    const tempUrl = URL.createObjectURL(file);
    setShoeImage(tempUrl);
    setUploadSuccessMsg('शू फोटो अपलोड होत आहे...');

    try {
      const dataUrl = await compressImage(file);
      setShoeImage(dataUrl);

      // Save to server disk at /public/performance-shoe.png
      const res = await fetch('/api/upload-banner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'performance', dataUrl }),
      });
      const data = await res.json();
      if (data?.url) {
        setShoeImage(data.url);
        try {
          localStorage.setItem('four5_performance_image', data.url);
        } catch {
          // ignore
        }
      }
      setUploadSuccessMsg('शू फोटो यशस्वीरीत्या सेव्ह झाला! 🎉');
      setTimeout(() => setUploadSuccessMsg(null), 3500);
    } catch (err) {
      console.error('Performance shoe upload error:', err);
      setUploadSuccessMsg('शू फोटो सेट झाला!');
      setTimeout(() => setUploadSuccessMsg(null), 3000);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
  };

  const handleResetImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShoeImage('/shoe2-clean.png');
    try {
      localStorage.removeItem('four5_performance_image');
    } catch {
      // ignore
    }
    setUploadSuccessMsg('डिफॉल्ट फोटो रिस्टोअर केला!');
    setTimeout(() => setUploadSuccessMsg(null), 2500);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleProcessFile(file);
    }
  };

  const tabs = [
    {
      id: 'design' as const,
      title: 'PREMIUM DESIGN',
      subtitle: 'Designed with a modern aesthetic for everyday confidence.',
      icon: Compass,
      highlights: [
        'Minimalist lines sculpted for seamless pairing with jeans, gym gear, or casual trousers',
        'Bespoke matte textured overlays that resist scuffs and creasing',
        'Subtle, understated branding with high-precision debossed logos',
      ],
      stat: '100% Original Molds',
    },
    {
      id: 'comfort' as const,
      title: 'EVERYDAY COMFORT',
      subtitle: 'Built for comfort from your first step to your last.',
      icon: ShieldCheck,
      highlights: [
        'Dual-density OrthoStep footbeds that cradle your natural arch and relieve heel stress',
        'Seamless inner sockliner eliminates friction hot spots and blisters',
        'Featherweight composite structure weighing less than 250 grams per shoe',
      ],
      stat: '14+ Hours Wear Time',
    },
    {
      id: 'performance' as const,
      title: 'PERFORMANCE',
      subtitle: 'Engineered for movement, training and an active lifestyle.',
      icon: Zap,
      highlights: [
        'Kinetic-Foam™ midsole delivers 72% energy return on every sprint stride',
        'High-abrasion Hexa-Grip rubber outsole grips wet tarmac, tile, and turf',
        'Engineered 3D Jacquard mesh accelerates airflow to keep feet cool in Indian heat',
      ],
      stat: '72% Energy Return',
    },
  ];

  const current = tabs.find((t) => t.id === activeTab)!;

  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-[#0F0F11] text-white relative overflow-hidden border-b border-zinc-800">
      {/* Background Subtle Lines */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FF4800_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#FF4800] text-xs font-tech font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>FOUR5 PERFORMANCE LAB</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-4xl lg:text-6xl uppercase tracking-tight leading-tight">
            ENGINEERED FOR <br />
            <span className="text-[#FF4800]">UNCOMPROMISING</span> MOMENTUM.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base lg:text-lg mt-2 sm:mt-3 max-w-2xl">
            We don’t compromise between aesthetics and athletics. Every silhouette is tested to withstand the demanding conditions of Indian daily life.
          </p>
        </div>

        {/* 3 Interactive Feature Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTab;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-6 rounded-2xl text-left transition-all duration-200 cursor-pointer border ${
                  isActive
                    ? 'bg-zinc-800/90 border-[#FF4800] shadow-xl shadow-orange-950/20 ring-1 ring-[#FF4800]'
                    : 'bg-zinc-900/60 border-zinc-800 hover:bg-zinc-800/50 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isActive ? 'bg-[#FF4800] text-white' : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-tech text-xs font-bold text-zinc-500">0{tabs.indexOf(tab) + 1}</span>
                </div>

                <h3 className="font-display font-extrabold text-xl uppercase tracking-tight text-white">
                  {tab.title}
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm mt-1.5 line-clamp-2">
                  {tab.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Highlight Focus Area */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-5 sm:p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-[#FF4800]/20 text-[#FF4800] rounded-lg font-tech text-xs font-bold uppercase tracking-wider">
                FEATURE FOCUS
              </span>
              <span className="text-sm font-bold text-zinc-300">{current.stat}</span>
            </div>

            <h4 className="font-display font-black text-2xl sm:text-4xl uppercase text-white">
              {current.title}
            </h4>

            <p className="text-zinc-300 text-base leading-relaxed">
              {current.subtitle}
            </p>

            <ul className="space-y-3 pt-2">
              {current.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                  <CheckCircle2 className="w-5 h-5 text-[#FF4800] shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            {onExploreTech && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onExploreTech}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-zinc-950 hover:bg-[#FF4800] hover:text-white font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all cursor-pointer active:scale-98"
                >
                  <span>EXPLORE FOUR5 LAB & MISSION</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Shoe Visual with Direct Photo Upload Controls */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleUploadChange}
              accept="image/*"
              className="hidden"
            />

            {/* Notification / Toast Message */}
            {uploadSuccessMsg && (
              <div className="mb-3 w-full py-2 px-3.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-bold flex items-center justify-center gap-2 animate-fadeIn shadow-lg">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{uploadSuccessMsg}</span>
              </div>
            )}

            {/* Image Card Container */}
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              title="येथे क्लिक करून तुमचा शू फोटो निवडा किंवा ड्रॅग करा (Click or drag to upload shoe photo)"
              className={`w-full aspect-4/3 rounded-2xl overflow-hidden border transition-all duration-300 bg-zinc-950 flex items-center justify-center p-6 relative group cursor-pointer ${
                isDragging
                  ? 'border-[#FF4800] ring-2 ring-[#FF4800] scale-[1.02]'
                  : 'border-zinc-700/80 hover:border-[#FF4800]/80 shadow-2xl hover:shadow-orange-950/30'
              }`}
            >
              {/* Subtle orange glow */}
              <div className="absolute inset-0 bg-radial from-[#FF4800]/10 via-transparent to-transparent opacity-60 pointer-events-none" />

              {/* The Shoe Image */}
              <img
                src={shoeImage}
                alt="FOUR5 Kinetic Performance Engineering Shoe"
                className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.95)] group-hover:scale-105 transition-transform duration-500"
              />

              {/* Top Action Bar: Upload / Change & Reset Buttons */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-auto">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  disabled={isUploading}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/80 hover:bg-[#FF4800] text-white text-xs font-bold backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg active:scale-95"
                  title="स्वतःचा शू फोटो निवडा (Upload Shoe Photo)"
                >
                  {isUploading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#FF4800]" />
                  ) : (
                    <Camera className="w-3.5 h-3.5 text-[#FF4800] group-hover:text-white" />
                  )}
                  <span>{isUploading ? 'अपलोड होत आहे...' : 'फोटो अपलोड करा'}</span>
                </button>

                {shoeImage !== '/shoe2-clean.png' && (
                  <button
                    type="button"
                    onClick={handleResetImage}
                    className="p-1.5 rounded-xl bg-black/80 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg"
                    title="डिफॉल्ट फोटो रिस्टोअर करा (Reset to Default)"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none z-10">
                <div className="px-4 py-2 rounded-xl bg-black/80 border border-white/20 text-white text-xs font-bold flex items-center gap-2 backdrop-blur-md shadow-2xl">
                  <Upload className="w-4 h-4 text-[#FF4800]" />
                  <span>फोटो बदलण्यासाठी येथे क्लिक करा</span>
                </div>
              </div>

              {/* Bottom Right Original Badge */}
              <div className="absolute bottom-3 right-3 z-20 bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-zinc-800 text-[11px] font-tech text-zinc-300 flex items-center gap-1.5 shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4800]" />
                <span>PROTOTYPED IN CHIKHLI</span>
              </div>
            </div>

            {/* Sub-label helper text */}
            <p className="text-[11px] text-zinc-400 mt-2 text-center flex items-center gap-1.5">
              <span>💡 तुम्ही कॉम्प्युटर किंवा मोबाईलमधून तुमचा शू फोटो (PNG/JPG) येथे अपलोड करू शकता.</span>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
