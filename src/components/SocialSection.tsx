import React, { useState, useRef, useEffect } from 'react';
import {
  Instagram,
  Heart,
  Camera,
  RotateCcw,
  Upload,
  Check,
  Loader2,
  Trash2,
  Sliders,
  X,
  Sparkles,
  Image as ImageIcon,
} from 'lucide-react';

// Canvas-based image optimizer to prevent large payloads and quota errors
const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const isPng = file.type === 'image/png';
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const maxWidth = 1000;
        const maxHeight = 1000;
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

const DEFAULT_POSTS = [
  {
    id: 'p1',
    slotNumber: 1,
    title: 'कार्ड १ (Velocity Pro)',
    defaultImg: '/social-p1.jpg',
    likes: '1.4k',
    caption: 'Velocity Runner on the asphalt. #TheNextMove #FOUR5Shoes',
  },
  {
    id: 'p2',
    slotNumber: 2,
    title: 'कार्ड २ (Street Movement)',
    defaultImg: '/social-p2.jpg',
    likes: '2.1k',
    caption: 'Street Pro in monochrome. Made for daily movement.',
  },
  {
    id: 'p3',
    slotNumber: 3,
    title: 'कार्ड ३ (Hometown 45)',
    defaultImg: '/story-shoe.jpg',
    likes: '980',
    caption: 'Urban X architectural lines. #ChikhliToWorld',
  },
  {
    id: 'p4',
    slotNumber: 4,
    title: 'कार्ड ४ (Training Essentials)',
    defaultImg: '/social-p4.jpg',
    likes: '1.7k',
    caption: 'Kinetic power training gear. #Brand45',
  },
  {
    id: 'p5',
    slotNumber: 5,
    title: 'कार्ड ५ (Classic Court)',
    defaultImg: '/social-p5.jpg',
    likes: '3.2k',
    caption: 'Legacy Sneaker. Timeless heritage court vibes.',
  },
  {
    id: 'p6',
    slotNumber: 6,
    title: 'कार्ड ६ (Performance Fit)',
    defaultImg: '/social-p6.jpg',
    likes: '840',
    caption: 'Apex Trainer in cloud white. Featherweight engineering.',
  },
];

export const SocialSection: React.FC = () => {
  const [activeUploadId, setActiveUploadId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draggedOverId, setDraggedOverId] = useState<string | null>(null);

  // Custom image map for social posts (persisted in localStorage)
  const [customImages, setCustomImages] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    try {
      const savedStory = localStorage.getItem('four5_story_image');
      if (savedStory && !savedStory.includes('photo-1600185365926')) {
        map['p3'] = savedStory;
      }
      const savedSocial = localStorage.getItem('four5_social_images');
      if (savedSocial) {
        const parsed = JSON.parse(savedSocial);
        Object.assign(map, parsed);
      }
    } catch {
      // ignore
    }
    return map;
  });

  // Sync with four5_story_image if changed externally
  useEffect(() => {
    const handleStorage = () => {
      try {
        const savedStory = localStorage.getItem('four5_story_image');
        if (savedStory && !savedStory.includes('photo-1600185365926')) {
          setCustomImages((prev) => ({ ...prev, p3: savedStory }));
        }
      } catch {
        // ignore
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleStartUpload = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveUploadId(id);
    fileInputRef.current?.click();
  };

  const handleProcessFileForPost = async (id: string, file: File) => {
    setIsUploading(true);
    // Instant optimistic preview
    const tempUrl = URL.createObjectURL(file);
    setCustomImages((prev) => ({ ...prev, [id]: tempUrl }));
    showToast(`कार्ड ${id.replace('p', '')} चा फोटो अपलोड होत आहे...`);

    try {
      const dataUrl = await compressImage(file);
      setCustomImages((prev) => {
        const next = { ...prev, [id]: dataUrl };
        try {
          localStorage.setItem('four5_social_images', JSON.stringify(next));
          if (id === 'p3') {
            localStorage.setItem('four5_story_image', dataUrl);
          }
        } catch {
          // ignore quota
        }
        return next;
      });

      // Persist to server disk
      const typeKey = id === 'p3' ? 'story' : `social-${id}`;
      const res = await fetch('/api/upload-banner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: typeKey, dataUrl }),
      });
      const data = await res.json();
      if (data?.url) {
        setCustomImages((prev) => ({ ...prev, [id]: data.url }));
        try {
          const stored = JSON.parse(localStorage.getItem('four5_social_images') || '{}');
          stored[id] = data.url;
          localStorage.setItem('four5_social_images', JSON.stringify(stored));
          if (id === 'p3') {
            localStorage.setItem('four5_story_image', data.url);
          }
        } catch {
          // ignore
        }
      }

      showToast(`कार्ड ${id.replace('p', '')} चा फोटो यशस्वीरीत्या सेव्ह झाला! 🎉`);
    } catch (err) {
      console.error('Social upload error:', err);
      showToast('फोटो सेट झाला!');
    } finally {
      setIsUploading(false);
      setActiveUploadId(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const targetId = activeUploadId;
    if (file && targetId) {
      handleProcessFileForPost(targetId, file);
    }
  };

  // Remove image from card and revert to default
  const handleRemoveImage = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCustomImages((prev) => {
      const next = { ...prev };
      delete next[id];
      try {
        localStorage.setItem('four5_social_images', JSON.stringify(next));
        if (id === 'p3') {
          localStorage.removeItem('four5_story_image');
        }
      } catch {
        // ignore
      }
      return next;
    });
    showToast(`कार्ड ${id.replace('p', '')} चा फोटो काढून टाकला!`);
  };

  const handleResetAll = () => {
    setCustomImages({});
    try {
      localStorage.removeItem('four5_social_images');
      localStorage.removeItem('four5_story_image');
    } catch {
      // ignore
    }
    showToast('सर्व फोटो मूळ स्वरूपात रिस्टोअर झाले!');
  };

  const handleDragOver = (id: string, e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggedOverId(id);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggedOverId(null);
  };

  const handleDrop = (id: string, e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggedOverId(null);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleProcessFileForPost(id, file);
    }
  };

  return (
    <section className="py-14 sm:py-20 bg-[#FAFAFB] border-b border-zinc-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hidden File Picker */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {/* Section Header with Direct Manage/Upload Button */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2.5 sm:space-y-3">
          <div className="flex items-center justify-center gap-2.5 sm:gap-3 flex-wrap">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 text-xs font-tech font-bold uppercase tracking-wider text-zinc-800 shadow-xs">
              <Instagram className="w-3.5 h-3.5 text-[#FF4800]" />
              <span>@FOUR5SHOES</span>
            </div>

            {/* Direct Button to Upload / Change Gallery Images */}
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FF4800] hover:bg-[#E03E00] text-white text-xs font-bold transition-all shadow-sm hover:shadow cursor-pointer active:scale-95"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>फोटो बदला / अपलोड करा</span>
            </button>
          </div>

          <h2 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-zinc-950 uppercase tracking-tight">
            STEP INTO FOUR5
          </h2>
          <p className="text-zinc-600 text-xs sm:text-sm lg:text-base">
            Follow the movement. Tag <strong className="text-zinc-900">#TheNextMove</strong> and <strong className="text-zinc-900">#FOUR5Shoes</strong> to be featured on our official drop wall.
          </p>

          {/* Quick Helper Tip */}
          <div className="pt-1">
            <span className="inline-block text-xs font-medium text-zinc-500 bg-zinc-100 px-3 py-1 rounded-lg">
              💡 खालील कोणत्याही फोटोवर थेट क्लिक करून तुम्ही तुमचा नवीन फोटो अपलोड करू शकता.
            </span>
          </div>

          {/* Success Toast */}
          {toastMsg && (
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 rounded-xl text-xs font-bold animate-fadeIn shadow-xs">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>{toastMsg}</span>
            </div>
          )}
        </div>

        {/* 6-Grid Gallery with Clear Upload / Remove Options */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {DEFAULT_POSTS.map((post) => {
            const currentImg = customImages[post.id] || post.defaultImg;
            const hasCustomImg = Boolean(customImages[post.id]);
            const isDragging = draggedOverId === post.id;
            const isCurrentlyUploading = isUploading && activeUploadId === post.id;

            return (
              <div
                key={post.id}
                onClick={() => handleStartUpload(post.id)}
                onDragOver={(e) => handleDragOver(post.id, e)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(post.id, e)}
                title={`कार्ड ${post.slotNumber} चा फोटो बदलण्यासाठी येथे क्लिक करा किंवा ड्रॅग करा`}
                className={`group relative aspect-square rounded-2xl overflow-hidden bg-zinc-950 shadow-xs cursor-pointer border transition-all duration-300 ${
                  isDragging
                    ? 'border-[#FF4800] ring-2 ring-[#FF4800] scale-[1.03]'
                    : 'border-zinc-200 hover:border-[#FF4800] hover:shadow-lg'
                }`}
              >
                {/* Image */}
                <img
                  src={currentImg}
                  alt={`FOUR5 Social Post ${post.slotNumber}`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Upload Action Bar (Permanently accessible buttons on the card) */}
                <div className="absolute top-2 right-2 z-20 flex items-center gap-1.5">
                  {/* Upload / Change Button */}
                  <button
                    type="button"
                    onClick={(e) => handleStartUpload(post.id, e)}
                    title="नवीन फोटो अपलोड करा (Upload Photo)"
                    className="flex items-center gap-1 px-2 py-1 rounded-lg bg-black/80 hover:bg-[#FF4800] text-white text-[11px] font-bold backdrop-blur-md border border-white/20 transition-all shadow-md active:scale-95"
                  >
                    {isCurrentlyUploading ? (
                      <Loader2 className="w-3 h-3 animate-spin text-[#FF4800]" />
                    ) : (
                      <Camera className="w-3 h-3 text-[#FF4800] group-hover:text-white" />
                    )}
                    <span className="hidden sm:inline">बदला</span>
                  </button>

                  {/* Remove Button (If custom photo is uploaded) */}
                  {hasCustomImg && (
                    <button
                      type="button"
                      onClick={(e) => handleRemoveImage(post.id, e)}
                      title="फोटो काढून टाका (Remove Photo)"
                      className="p-1 rounded-lg bg-rose-600/90 hover:bg-rose-700 text-white text-xs backdrop-blur-md border border-white/20 transition-all shadow-md"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Slot Number Tag */}
                <div className="absolute top-2 left-2 z-20">
                  <span className="px-1.5 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-white font-tech text-[10px] font-bold border border-white/10">
                    #{post.slotNumber}
                  </span>
                </div>

                {/* Hover overlay with upload prompt and Instagram details */}
                <div className="absolute inset-0 bg-black/65 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3 text-white pointer-events-none z-10">
                  <div className="flex justify-end pt-7">
                    <Instagram className="w-4 h-4 text-white/80" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-xs font-bold text-rose-400">
                      <Heart className="w-3.5 h-3.5 fill-current" />
                      <span>{post.likes}</span>
                    </div>
                    <p className="text-[10px] text-zinc-300 mt-0.5 line-clamp-1">
                      {post.caption}
                    </p>
                    <div className="mt-2 flex items-center justify-center gap-1.5 py-1 px-2 rounded-lg bg-[#FF4800] text-white font-bold text-[11px] shadow">
                      <Upload className="w-3 h-3" />
                      <span>फोटो बदला</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* MODAL: Full Gallery Photo Manager */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-zinc-950 text-white border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FF4800] flex items-center justify-center text-white shadow-lg">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-black text-lg uppercase">
                    सोशल गॅलरी फोटो मॅनेजर
                  </h3>
                  <p className="text-xs text-zinc-400">
                    खालील ६ कार्ड्सपैकी कोणत्याही कार्डचा फोटो बदला किंवा काढून टाका.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-zinc-400 hover:text-white rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Grid of All 6 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              {DEFAULT_POSTS.map((post) => {
                const currentImg = customImages[post.id] || post.defaultImg;
                const hasCustomImg = Boolean(customImages[post.id]);
                const isCurrentlyUploading = isUploading && activeUploadId === post.id;

                return (
                  <div
                    key={post.id}
                    className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-zinc-200">
                        {post.title}
                      </span>
                      {hasCustomImg && (
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                          कस्टम फोटो
                        </span>
                      )}
                    </div>

                    {/* Preview Thumbnail */}
                    <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800">
                      <img
                        src={currentImg}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => handleStartUpload(post.id)}
                        disabled={isCurrentlyUploading}
                        className="flex-1 py-2 px-3 rounded-xl bg-[#FF4800] hover:bg-[#E03E00] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow active:scale-95"
                      >
                        {isCurrentlyUploading ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Upload className="w-3.5 h-3.5" />
                        )}
                        <span>{isCurrentlyUploading ? 'अपलोड...' : 'फोटो निवडा'}</span>
                      </button>

                      {hasCustomImg && (
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(post.id)}
                          title="हा फोटो काढून टाका"
                          className="p-2 rounded-xl bg-zinc-800 hover:bg-rose-600 text-zinc-300 hover:text-white transition-all cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between flex-wrap gap-3">
              <button
                type="button"
                onClick={handleResetAll}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-zinc-400 hover:text-white rounded-xl bg-zinc-900 hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>सर्व फोटो मूळ स्वरूपात रिसेट करा</span>
              </button>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 font-bold text-xs uppercase cursor-pointer"
              >
                पूर्ण झाले (Done)
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
