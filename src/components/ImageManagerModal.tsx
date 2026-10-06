import React, { useState, useRef } from 'react';
import {
  X,
  Camera,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Image as ImageIcon,
  Layers,
  ArrowRight,
  UploadCloud,
  Trash2,
  Info,
} from 'lucide-react';
import { Product } from '../types';
import { CATEGORIES_DATA } from '../data/products';
import {
  getCustomProductImages,
  setCustomProductImage,
  resetCustomProductImage,
  getCustomCategoryImages,
  setCustomCategoryImage,
  resetCustomCategoryImage,
  resetAllCustomImages,
} from '../utils/customImages';

interface ImageManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onRefresh: () => void;
}

// Client-side image compressor using HTML Canvas to stay well within localStorage quota
const compressImage = (file: File, maxWidth = 1000, maxHeight = 1000, quality = 0.85): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const image = new Image();
      image.onload = () => {
        let width = image.width;
        let height = image.height;

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
          resolve(readerEvent.target?.result as string);
          return;
        }

        ctx.drawImage(image, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      image.onerror = (e) => reject(e);
      image.src = readerEvent.target?.result as string;
    };
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
};

export const ImageManagerModal: React.FC<ImageManagerModalProps> = ({
  isOpen,
  onClose,
  products,
  onRefresh,
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'hero'>('products');
  const [customProductMap, setCustomProductMap] = useState<Record<string, string>>(() =>
    getCustomProductImages()
  );
  const [customCategoryMap, setCustomCategoryMap] = useState<Record<string, string>>(() =>
    getCustomCategoryImages()
  );
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  if (!isOpen) return null;

  const showNotification = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3500);
  };

  const handleProductUpload = async (productId: string, file: File) => {
    try {
      setUploadingId(productId);
      const compressedDataUrl = await compressImage(file, 1000, 1000, 0.85);
      setCustomProductImage(productId, compressedDataUrl);
      setCustomProductMap(getCustomProductImages());
      onRefresh();
      showNotification('फोटो यशस्वीरीत्या सेव्ह झाला आणि वेबसाइटवर अपडेट झाला!');
    } catch (err) {
      console.error(err);
      alert('फोटो सेव्ह करताना समस्या आली. कृपया लहान आकाराचा फोटो निवडा.');
    } finally {
      setUploadingId(null);
    }
  };

  const handleProductReset = (productId: string) => {
    resetCustomProductImage(productId);
    setCustomProductMap(getCustomProductImages());
    onRefresh();
    showNotification('फोटो मूळ स्थितीत परत आणला.');
  };

  const handleCategoryUpload = async (slug: string, file: File) => {
    try {
      setUploadingId(slug);
      const compressedDataUrl = await compressImage(file, 1200, 800, 0.85);
      setCustomCategoryImage(slug, compressedDataUrl);
      setCustomCategoryMap(getCustomCategoryImages());
      onRefresh();
      showNotification('कॅटेगरी फोटो यशस्वीरीत्या बदलला!');
    } catch (err) {
      console.error(err);
      alert('फोटो सेव्ह करताना समस्या आली.');
    } finally {
      setUploadingId(null);
    }
  };

  const handleCategoryReset = (slug: string) => {
    resetCustomCategoryImage(slug);
    setCustomCategoryMap(getCustomCategoryImages());
    onRefresh();
    showNotification('कॅटेगरी फोटो मूळ स्थितीत आणला.');
  };

  const handleResetAll = () => {
    if (window.confirm('तुम्हाला खरोखर सर्व कस्टम फोटो काढून मूळ डिझाइन रिस्टोर करायची आहे का?')) {
      resetAllCustomImages();
      setCustomProductMap({});
      setCustomCategoryMap({});
      onRefresh();
      showNotification('सर्व फोटो मूळ सॅम्पल स्थितीत रिसेट केले.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#121216] border border-zinc-700/80 text-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-zinc-800 bg-[#16161D] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF4800] to-amber-500 flex items-center justify-center text-white shadow-lg">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-black text-lg sm:text-xl uppercase tracking-tight text-white">
                  45 Shoes Photo Manager
                </h2>
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FF4800]/20 text-[#FF4800] border border-[#FF4800]/40">
                  LIVE CUSTOMIZER
                </span>
              </div>
              <p className="text-zinc-400 text-xs sm:text-sm">
                वेबसाइटवरील शूजचे फोटो बदला (Change & Replace Shoe Images)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Marathi Instruction Notice Box */}
        <div className="bg-gradient-to-r from-amber-950/40 via-zinc-900 to-zinc-900 border-b border-amber-900/30 px-5 py-3.5 flex items-start gap-3 shrink-0">
          <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-zinc-300">
            <span className="font-bold text-amber-300">फोटो कसे बदलायचे? </span>
            खालील कोणत्याही शूजच्या कार्डवरील{' '}
            <strong className="text-white">"फोटो बदला (Upload)"</strong> बटणावर क्लिक करून तुमच्या
            मोबाईल किंवा कॉम्प्युटरमधून फोटो निवडा. तो लगेच वेबसाइटवर लाइव्ह होईल!
            <span className="block text-[11px] text-zinc-400 mt-0.5">
              (तसेच तुम्ही चॅटमध्येही थेट इमेज पाठवून मला बदलण्यास सांगू शकता.)
            </span>
          </div>
        </div>

        {/* Success Alert Toast */}
        {successMsg && (
          <div className="bg-emerald-950/80 border-b border-emerald-600/50 px-5 py-2.5 flex items-center gap-2 text-emerald-300 text-xs font-semibold shrink-0 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-zinc-800 px-5 bg-zinc-900/50 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('products')}
            className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'products'
                ? 'border-[#FF4800] text-white bg-zinc-800/40'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-[#FF4800]" />
            <span>सर्व शूज ({products.length} Products)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('categories')}
            className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'categories'
                ? 'border-[#FF4800] text-white bg-zinc-800/40'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Layers className="w-4 h-4 text-amber-400" />
            <span>कॅटेगरीज ({CATEGORIES_DATA.length} Categories)</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'products' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((p) => {
                const currentImg = customProductMap[p.id] || p.colors[0]?.image;
                const isCustom = Boolean(customProductMap[p.id]);

                return (
                  <div
                    key={p.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col justify-between bg-zinc-900/80 ${
                      isCustom
                        ? 'border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                        : 'border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      {/* Image Preview Box */}
                      <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-black/50 border border-zinc-800 mb-3 flex items-center justify-center group">
                        <img
                          src={currentImg}
                          alt={p.name}
                          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform"
                        />
                        {isCustom && (
                          <div className="absolute top-2 right-2 bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>कस्टम फोटो</span>
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-bold text-sm text-white line-clamp-1">{p.name}</h3>
                          <span className="text-[11px] text-zinc-400 font-medium block">
                            {p.category} • ₹{p.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center gap-2">
                      <input
                        type="file"
                        ref={(el) => {
                          fileInputRefs.current[p.id] = el;
                        }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleProductUpload(p.id, file);
                        }}
                        accept="image/*"
                        className="hidden"
                      />

                      <button
                        type="button"
                        onClick={() => fileInputRefs.current[p.id]?.click()}
                        disabled={uploadingId === p.id}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-[#FF4800] to-orange-600 hover:from-orange-600 hover:to-[#FF4800] text-white text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-50"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>{uploadingId === p.id ? 'अपलोड होत आहे...' : 'फोटो बदला'}</span>
                      </button>

                      {isCustom && (
                        <button
                          type="button"
                          onClick={() => handleProductReset(p.id)}
                          title="मूळ फोटो रिस्टोर करा"
                          className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'categories' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CATEGORIES_DATA.map((cat) => {
                const currentImg = customCategoryMap[cat.slug] || cat.image;
                const isCustom = Boolean(customCategoryMap[cat.slug]);

                return (
                  <div
                    key={cat.slug}
                    className={`p-4 rounded-2xl border transition-all flex flex-col justify-between bg-zinc-900/80 ${
                      isCustom
                        ? 'border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                        : 'border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      {/* Image Preview Box */}
                      <div className="relative aspect-16/9 w-full rounded-xl overflow-hidden bg-black/50 border border-zinc-800 mb-3 flex items-center justify-center group">
                        <img
                          src={currentImg}
                          alt={cat.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        {isCustom && (
                          <div className="absolute top-2 right-2 bg-amber-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>कस्टम</span>
                          </div>
                        )}
                      </div>

                      {/* Category Info */}
                      <div>
                        <h3 className="font-bold text-sm text-white">{cat.name}</h3>
                        <p className="text-[11px] text-zinc-400 line-clamp-1">{cat.tagline}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center gap-2">
                      <input
                        type="file"
                        ref={(el) => {
                          fileInputRefs.current[cat.slug] = el;
                        }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleCategoryUpload(cat.slug, file);
                        }}
                        accept="image/*"
                        className="hidden"
                      />

                      <button
                        type="button"
                        onClick={() => fileInputRefs.current[cat.slug]?.click()}
                        disabled={uploadingId === cat.slug}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-amber-400 text-xs font-bold transition-all border border-amber-500/30 cursor-pointer disabled:opacity-50"
                      >
                        <UploadCloud className="w-3.5 h-3.5" />
                        <span>{uploadingId === cat.slug ? 'अपलोड होत आहे...' : 'कॅटेगरी फोटो बदला'}</span>
                      </button>

                      {isCustom && (
                        <button
                          type="button"
                          onClick={() => handleCategoryReset(cat.slug)}
                          title="मूळ फोटो रिस्टोर करा"
                          className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer with Reset All & Close */}
        <div className="p-4 sm:p-5 border-t border-zinc-800 bg-[#16161D] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={handleResetAll}
            className="text-xs text-zinc-400 hover:text-red-400 flex items-center gap-1.5 transition-colors cursor-pointer py-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>सर्व कस्टम फोटो काढून पूर्ववत करा (Reset All)</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md"
          >
            पूर्ण झाले (Done)
          </button>
        </div>
      </div>
    </div>
  );
};
