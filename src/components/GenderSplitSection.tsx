import React, { useState, useRef } from 'react';
import { ArrowRight, Camera, RotateCcw, CheckCircle2, Upload, Sparkles } from 'lucide-react';

interface GenderSplitSectionProps {
  onShopMen?: () => void;
  onShopWomen?: () => void;
  onSelectGender?: (gender: string) => void;
}

// Clean athletic sneakers (NO Nike / NO Vans)
const FALLBACK_MEN_IMAGE =
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&auto=format&fit=crop&q=80';
const FALLBACK_WOMEN_IMAGE =
  'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1000&auto=format&fit=crop&q=80';

// Canvas-based image optimizer to prevent browser localStorage quota errors
const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
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
        resolve(canvas.toDataURL('image/jpeg', 0.88));
      };
      img.onerror = () => resolve(e.target?.result as string);
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const GenderSplitSection: React.FC<GenderSplitSectionProps> = ({
  onShopMen,
  onShopWomen,
  onSelectGender,
}) => {
  const [menImage, setMenImage] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('four5_banner_men_image');
      if (saved && !saved.includes('photo-1579338559194')) return saved;
    } catch {
      // ignore
    }
    return '/men.jpg';
  });

  const [womenImage, setWomenImage] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('four5_banner_women_image');
      if (saved && !saved.includes('photo-1525966222134')) return saved;
    } catch {
      // ignore
    }
    return '/women.jpg';
  });

  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const menInputRef = useRef<HTMLInputElement>(null);
  const womenInputRef = useRef<HTMLInputElement>(null);

  const handleMenUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    // Instant optimistic preview
    const tempUrl = URL.createObjectURL(file);
    setMenImage(tempUrl);
    setSuccessMsg("Men's फोटो अपलोड होत आहे...");

    try {
      const dataUrl = await compressImage(file);
      setMenImage(dataUrl);

      // Save to server disk at /public/men.jpg
      const res = await fetch('/api/upload-banner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'men', dataUrl }),
      });
      const data = await res.json();
      if (data?.url) {
        setMenImage(data.url);
        try {
          localStorage.setItem('four5_banner_men_image', data.url);
        } catch {
          // ignore
        }
      }
      setSuccessMsg("Men's कलेक्शनचा फोटो यशस्वीरीत्या सेव्ह झाला! 🎉");
      setTimeout(() => setSuccessMsg(null), 3500);
    } catch (err) {
      console.error('Men upload error:', err);
      setSuccessMsg("Men's फोटो सेट झाला!");
      setTimeout(() => setSuccessMsg(null), 3000);
    } finally {
      setIsUploading(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleWomenUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    // Instant optimistic preview
    const tempUrl = URL.createObjectURL(file);
    setWomenImage(tempUrl);
    setSuccessMsg("Women's फोटो अपलोड होत आहे...");

    try {
      const dataUrl = await compressImage(file);
      setWomenImage(dataUrl);

      // Save to server disk at /public/women.jpg
      const res = await fetch('/api/upload-banner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'women', dataUrl }),
      });
      const data = await res.json();
      if (data?.url) {
        setWomenImage(data.url);
        try {
          localStorage.setItem('four5_banner_women_image', data.url);
        } catch {
          // ignore
        }
      }
      setSuccessMsg("Women's कलेक्शनचा फोटो यशस्वीरीत्या सेव्ह झाला! 🎉");
      setTimeout(() => setSuccessMsg(null), 3500);
    } catch (err) {
      console.error('Women upload error:', err);
      setSuccessMsg("Women's फोटो सेट झाला!");
      setTimeout(() => setSuccessMsg(null), 3000);
    } finally {
      setIsUploading(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleResetMen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenImage('/men.jpg');
    try {
      localStorage.removeItem('four5_banner_men_image');
    } catch {
      // ignore
    }
  };

  const handleResetWomen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setWomenImage('/women.jpg');
    try {
      localStorage.removeItem('four5_banner_women_image');
    } catch {
      // ignore
    }
  };

  const handleMen = () => {
    if (onShopMen) onShopMen();
    else if (onSelectGender) onSelectGender('Men');
  };

  const handleWomen = () => {
    if (onShopWomen) onShopWomen();
    else if (onSelectGender) onSelectGender('Women');
  };

  const handleCardClick = (e: React.MouseEvent, type: 'men' | 'women') => {
    // If clicked on buttons or file inputs, do NOT navigate away
    const target = e.target as HTMLElement;
    if (target.closest('button, input, label, .action-ignore')) {
      return;
    }
    if (type === 'men') handleMen();
    else handleWomen();
  };

  return (
    <section className="py-10 bg-[#FAFAFB] relative text-left">
      {/* Toast Notification */}
      {successMsg && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold animate-bounce border border-emerald-400">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Hidden file inputs placed at top-level to prevent click bubbling */}
      <input
        ref={menInputRef}
        type="file"
        accept="image/*"
        onChange={handleMenUpload}
        onClick={(e) => {
          (e.target as HTMLInputElement).value = '';
        }}
        className="hidden"
      />
      <input
        ref={womenInputRef}
        type="file"
        accept="image/*"
        onChange={handleWomenUpload}
        onClick={(e) => {
          (e.target as HTMLInputElement).value = '';
        }}
        className="hidden"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Banner Quick Control Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-zinc-900 text-white p-4 rounded-2xl border border-zinc-800 shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FF4800] flex items-center justify-center text-white font-black text-xs">
              45
            </div>
            <div>
              <div className="text-xs font-tech font-bold uppercase tracking-wider text-zinc-200">
                COLLECTIONS SHOWCASE (कलेक्शन फोटो अपलोड)
              </div>
              <div className="text-[11px] text-zinc-400">
                तुमच्या आवडीचे शूज फोटो (उदा. s20.jpeg, s21.jpeg) येथे १-क्लिकमध्ये सेट करा:
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => menInputRef.current?.click()}
              disabled={isUploading}
              className="flex-1 sm:flex-initial px-3.5 py-2 bg-[#FF4800] hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Men's फोटो अपलोड करा (s20)</span>
            </button>

            <button
              type="button"
              onClick={() => womenInputRef.current?.click()}
              disabled={isUploading}
              className="flex-1 sm:flex-initial px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <Upload className="w-3.5 h-3.5 text-amber-300" />
              <span>Women's फोटो अपलोड करा (s21)</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* MEN BANNER */}
          <div
            onClick={(e) => handleCardClick(e, 'men')}
            className="group relative overflow-hidden rounded-3xl min-h-[380px] sm:min-h-[480px] lg:min-h-[540px] bg-zinc-950 flex flex-col justify-end p-6 sm:p-8 lg:p-10 cursor-pointer shadow-xl border border-zinc-800/80"
          >
            {/* Background Athlete Image with fallback */}
            <img
              key={menImage}
              src={menImage}
              alt="FOUR5 Men Footwear"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = FALLBACK_MEN_IMAGE;
              }}
              className="absolute inset-0 w-full h-full object-cover object-center brightness-75 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

            {/* Change Image Button (Top Right) */}
            <div className="action-ignore absolute top-4 right-4 z-20 flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  menInputRef.current?.click();
                }}
                title="Men's कलेक्शनचा फोटो बदला (Upload Image)"
                className="px-3.5 py-2 rounded-full bg-black/80 hover:bg-[#FF4800] text-white border border-white/20 backdrop-blur-md shadow-xl transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold active:scale-95"
              >
                <Camera className="w-4 h-4 text-amber-300" />
                <span>फोटो बदला</span>
              </button>
              {menImage !== '/men.jpg' && (
                <button
                  type="button"
                  onClick={handleResetMen}
                  title="मूळ फोटोवर रिसेट करा"
                  className="p-2 rounded-full bg-black/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/20 backdrop-blur-md transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Content */}
            <div className="relative z-10 space-y-3 pointer-events-none">
              <span className="font-tech text-xs tracking-widest text-[#FF4800] uppercase font-bold">
                MEN’S COLLECTION
              </span>
              <h3 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight leading-none drop-shadow-md">
                Move With <br />Purpose.
              </h3>
              <p className="text-zinc-200 text-sm max-w-sm drop-shadow">
                Built for aggressive stability, explosive traction, and relentless city runs.
              </p>
              <div className="pt-2 pointer-events-auto">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMen();
                  }}
                  className="px-6 py-3.5 bg-white text-zinc-950 hover:bg-[#FF4800] hover:text-white font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all flex items-center gap-2 cursor-pointer active:scale-98 shadow-lg"
                >
                  <span>SHOP MEN</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* WOMEN BANNER */}
          <div
            onClick={(e) => handleCardClick(e, 'women')}
            className="group relative overflow-hidden rounded-3xl min-h-[380px] sm:min-h-[480px] lg:min-h-[540px] bg-zinc-950 flex flex-col justify-end p-6 sm:p-8 lg:p-10 cursor-pointer shadow-xl border border-zinc-800/80"
          >
            {/* Background Athlete Image with fallback */}
            <img
              key={womenImage}
              src={womenImage}
              alt="FOUR5 Women Footwear"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = FALLBACK_WOMEN_IMAGE;
              }}
              className="absolute inset-0 w-full h-full object-cover object-center brightness-75 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

            {/* Change Image Button (Top Right) */}
            <div className="action-ignore absolute top-4 right-4 z-20 flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  womenInputRef.current?.click();
                }}
                title="Women's कलेक्शनचा फोटो बदला (Upload Image)"
                className="px-3.5 py-2 rounded-full bg-black/80 hover:bg-[#FF4800] text-white border border-white/20 backdrop-blur-md shadow-xl transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold active:scale-95"
              >
                <Camera className="w-4 h-4 text-amber-300" />
                <span>फोटो बदला</span>
              </button>
              {womenImage !== '/women.jpg' && (
                <button
                  type="button"
                  onClick={handleResetWomen}
                  title="मूळ फोटोवर रिसेट करा"
                  className="p-2 rounded-full bg-black/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/20 backdrop-blur-md transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Content */}
            <div className="relative z-10 space-y-3 pointer-events-none">
              <span className="font-tech text-xs tracking-widest text-[#FF4800] uppercase font-bold">
                WOMEN’S COLLECTION
              </span>
              <h3 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight leading-none drop-shadow-md">
                Own Every <br />Move.
              </h3>
              <p className="text-zinc-200 text-sm max-w-sm drop-shadow">
                Featherweight comfort meets refined silhouettes for daily momentum.
              </p>
              <div className="pt-2 pointer-events-auto">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWomen();
                  }}
                  className="px-6 py-3.5 bg-white text-zinc-950 hover:bg-[#FF4800] hover:text-white font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all flex items-center gap-2 cursor-pointer active:scale-98 shadow-lg"
                >
                  <span>SHOP WOMEN</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
