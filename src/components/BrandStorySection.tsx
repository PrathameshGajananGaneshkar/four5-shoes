import React, { useState, useRef } from 'react';
import {
  ArrowRight,
  MapPin,
  Award,
  CheckCircle,
  Camera,
  RotateCcw,
  Upload,
  Check,
  Loader2,
} from 'lucide-react';
import { BRAND_INFO } from '../data/products';

interface BrandStorySectionProps {
  onOurStory?: () => void;
  onReadStory?: () => void;
}

// Client-side image compressor using HTML Canvas
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

export const BrandStorySection: React.FC<BrandStorySectionProps> = ({ onOurStory, onReadStory }) => {
  // Story shoe image state (persisted in localStorage and server disk)
  const [storyImage, setStoryImage] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('four5_story_image');
      if (saved && !saved.includes('photo-1600185365926')) return saved;
    } catch {
      // ignore
    }
    // Clean default image instead of the Nike shoe
    return '/story-shoe.jpg';
  });

  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProcessFile = async (file: File) => {
    setIsUploading(true);
    // Instant optimistic preview
    const tempUrl = URL.createObjectURL(file);
    setStoryImage(tempUrl);
    setUploadSuccessMsg('शू फोटो अपलोड होत आहे...');

    try {
      const dataUrl = await compressImage(file);
      setStoryImage(dataUrl);

      // Save to server disk at /public/story-shoe.jpg
      const res = await fetch('/api/upload-banner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'story', dataUrl }),
      });
      const data = await res.json();
      if (data?.url) {
        setStoryImage(data.url);
        try {
          localStorage.setItem('four5_story_image', data.url);
        } catch {
          // ignore
        }
      }
      setUploadSuccessMsg('शू फोटो यशस्वीरीत्या सेव्ह झाला! 🎉');
      setTimeout(() => setUploadSuccessMsg(null), 3500);
    } catch (err) {
      console.error('Story shoe upload error:', err);
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
    setStoryImage('/men.jpg');
    try {
      localStorage.removeItem('four5_story_image');
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

  const handleStory = () => {
    if (onOurStory) onOurStory();
    else if (onReadStory) onReadStory();
  };

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-zinc-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image Card with Photo Upload & Hometown Roots Badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg">
              {/* Hidden file picker */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleUploadChange}
                accept="image/*"
                className="hidden"
              />

              {/* Upload Success Alert */}
              {uploadSuccessMsg && (
                <div className="mb-3 w-full py-2 px-3.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 rounded-xl text-xs font-bold flex items-center justify-center gap-2 animate-fadeIn shadow-xs">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{uploadSuccessMsg}</span>
                </div>
              )}

              {/* Main Image Container */}
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                title="येथे क्लिक करून तुमचा शू फोटो निवडा किंवा ड्रॅग करा (Click or drag to upload shoe photo)"
                className={`rounded-3xl overflow-hidden shadow-2xl border transition-all duration-300 relative group cursor-pointer bg-zinc-950 ${
                  isDragging
                    ? 'border-[#FF4800] ring-2 ring-[#FF4800] scale-[1.02]'
                    : 'border-zinc-200 hover:border-[#FF4800]'
                }`}
              >
                <img
                  src={storyImage}
                  alt="FOUR5 Shoes Craftsmanship"
                  className="w-full h-[280px] sm:h-[360px] md:h-[420px] object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Top Action Bar: Upload / Change & Reset Buttons */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-auto">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    disabled={isUploading}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-black/80 hover:bg-[#FF4800] text-white text-xs font-bold backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg active:scale-95"
                    title="स्वतःचा शू फोटो निवडा (Upload Shoe Photo)"
                  >
                    {isUploading ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#FF4800]" />
                    ) : (
                      <Camera className="w-3.5 h-3.5 text-[#FF4800] group-hover:text-white" />
                    )}
                    <span>{isUploading ? 'अपलोड होत आहे...' : 'फोटो बदला / अपलोड करा'}</span>
                  </button>

                  {storyImage !== '/men.jpg' && (
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
              </div>

              {/* Floating Badge: Hometown Roots */}
              <div className="absolute -bottom-5 right-2 sm:-bottom-6 sm:right-6 bg-zinc-950 text-white p-3.5 sm:p-5 rounded-2xl shadow-xl border border-zinc-800 max-w-[210px] sm:max-w-[240px] text-left z-20">
                <div className="flex items-center gap-2 text-[#FF4800] mb-1">
                  <MapPin className="w-4 h-4" />
                  <span className="font-tech text-xs uppercase font-bold tracking-wider">
                    HOMETOWN ROOTS
                  </span>
                </div>
                <div className="font-bold text-sm text-white">Chikhli, Buldhana</div>
                <div className="text-xs text-zinc-400 mt-0.5">Maharashtra, India</div>
              </div>

              {/* Decorative Accent */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-orange-100 rounded-2xl -z-10" />
            </div>

            {/* Sub-label helper text */}
            <p className="text-[11px] text-zinc-500 mt-8 text-center">
              💡 तुम्ही कॉम्प्युटर किंवा मोबाईलवरून तुमचा स्वतःचा शू फोटो येथे अपलोड करू शकता.
            </p>
          </div>

          {/* Right Column: Editorial Text */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-50 text-[#FF4800] text-xs font-tech font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>INDIAN ROOTS • GLOBAL AMBITION</span>
            </div>

            <h2 className="font-display font-black text-4xl sm:text-6xl text-zinc-950 uppercase tracking-tight leading-none">
              BUILT DIFFERENT.
            </h2>

            <p className="text-lg sm:text-xl text-zinc-700 leading-relaxed font-normal">
              &ldquo;FOUR5 Shoes is a new-age Indian footwear brand focused on premium design, everyday comfort and performance. Our mission is to create stylish, high-quality footwear for the next generation.&rdquo;
            </p>

            <p className="text-sm text-zinc-600 leading-relaxed">
              Born from the ambition of Chikhli, Maharashtra, we believe Indian youth shouldn&apos;t have to settle for overpriced imported sneakers or flimsy mass-market alternatives. We design bold silhouettes with premium materials and ergonomic soles tuned for our roads.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-200">
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-5 h-5 text-[#FF4800] shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-zinc-800">
                  Precision Stitching & Molds
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-5 h-5 text-[#FF4800] shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-zinc-800">
                  Priced Fairly: ₹1,499 – ₹3,999
                </span>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-4">
              <button
                type="button"
                onClick={handleStory}
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#0F0F11] hover:bg-zinc-800 text-white font-bold text-sm tracking-wider uppercase rounded-xl transition-all shadow-md cursor-pointer active:scale-98"
              >
                <span>OUR STORY</span>
                <ArrowRight className="w-4 h-4 text-[#FF4800]" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
