import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Sparkles,
  Eye,
  Heart,
  Check,
  Zap,
  ShieldCheck,
  Layers,
} from 'lucide-react';
import { Product, ProductColor } from '../types';
import { BRAND_INFO } from '../data/products';

interface OneByOneShowcaseProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, color: ProductColor, size: number) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onAskAiStylist: (prompt: string) => void;
}

export const OneByOneShowcase: React.FC<OneByOneShowcaseProps> = ({
  products,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onAskAiStylist,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentProduct = products[currentIndex] || products[0];

  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    currentProduct?.colors[0] || {
      name: 'Default',
      hex: '#000000',
      image: '',
      gallery: [],
    }
  );
  const [selectedSize, setSelectedSize] = useState<number>(
    currentProduct?.availableSizes[0] || 8
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Sync color and size when index changes
  useEffect(() => {
    if (currentProduct) {
      setSelectedColor(currentProduct.colors[0]);
      setSelectedSize(currentProduct.availableSizes[0] || 8);
      setSelectedImageIndex(0);
    }
  }, [currentIndex, currentProduct]);

  if (!currentProduct) return null;

  const isWishlisted = wishlistIds.includes(currentProduct.id);
  const discountPercent = Math.round(
    ((currentProduct.originalPrice - currentProduct.price) /
      currentProduct.originalPrice) *
      100
  );

  const imagesList = [
    selectedColor.image,
    ...(selectedColor.gallery || []),
  ].filter(Boolean);

  const activeImage = imagesList[selectedImageIndex] || selectedColor.image;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-12 sm:py-20 lg:py-24 bg-gradient-to-b from-[#0F0F11] via-[#16161A] to-[#111113] text-white relative overflow-hidden border-t border-b border-zinc-800">
      {/* Background radial accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF4800]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-tech font-bold uppercase tracking-wider text-[#FF4800] mb-2 sm:mb-3">
              <span className="w-2 h-2 rounded-full bg-[#FF4800] animate-pulse" />
              EXCLUSIVE BRAND 45 LINEUP
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight uppercase">
              Brand 45 Shoes — One By One
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="font-mono text-sm tracking-widest text-zinc-400">
              <span className="text-[#FF4800] font-bold text-lg">
                0{currentIndex + 1}
              </span>
              {' / '}
              <span>0{products.length}</span>
            </div>

            {/* Prev / Next Header Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous 45 shoe"
                className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 flex items-center justify-center text-white transition-all cursor-pointer hover:scale-105"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next 45 shoe"
                className="w-10 h-10 rounded-full bg-[#FF4800] hover:bg-[#FF4800]/90 text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 shadow-lg shadow-[#FF4800]/25"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Stage Spotlight Card */}
        <div className="bg-zinc-900/90 border border-zinc-800/90 rounded-3xl p-4 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Visual Image Gallery */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-zinc-950/80 rounded-2xl border border-zinc-800/80 flex items-center justify-center p-6 overflow-hidden group">
                
                {/* 45 Watermark Badge */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg text-xs font-mono">
                  <span className="text-[#FF4800] font-black text-sm">45</span>
                  <span className="text-zinc-300 font-semibold tracking-wider">OFFICIAL</span>
                </div>

                {/* Wishlist Button */}
                <button
                  type="button"
                  onClick={() => onToggleWishlist(currentProduct)}
                  aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  className={`absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                    isWishlisted
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                      : 'bg-black/50 hover:bg-black/80 text-zinc-300 hover:text-white border border-white/10'
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${isWishlisted ? 'fill-current text-rose-500' : ''}`}
                  />
                </button>

                {/* Shoe Main Image */}
                <img
                  src={activeImage}
                  alt={currentProduct.name}
                  referrerPolicy="no-referrer"
                  className="max-h-[85%] max-w-[85%] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)] transition-transform duration-500 hover:scale-105"
                />

                {/* Left/Right Floating Steppers */}
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center border border-white/10 transition-transform active:scale-95 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center border border-white/10 transition-transform active:scale-95 cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Multi-angle thumb strips */}
              {imagesList.length > 1 && (
                <div className="flex items-center gap-3 mt-4">
                  {imagesList.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-16 h-12 rounded-lg bg-zinc-950 border overflow-hidden transition-all cursor-pointer p-1 ${
                        selectedImageIndex === idx
                          ? 'border-[#FF4800] ring-2 ring-[#FF4800]/30 scale-105'
                          : 'border-zinc-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt="Angle preview"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Product Data & Instant Controls */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6 text-left">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-tech uppercase tracking-widest text-[#FF4800] font-bold">
                    {currentProduct.category}
                  </span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-xs font-mono text-zinc-400">
                    {currentProduct.gender} Footwear
                  </span>
                </div>

                <h3 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight">
                  {currentProduct.name}
                </h3>
                <p className="text-zinc-400 text-sm mt-1">
                  {currentProduct.subtitle}
                </p>

                {/* Price block */}
                <div className="flex items-baseline gap-3 mt-4">
                  <span className="font-display font-black text-3xl sm:text-4xl text-white">
                    ₹{currentProduct.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-zinc-500 line-through text-lg">
                    ₹{currentProduct.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold font-mono">
                    {discountPercent}% OFF
                  </span>
                </div>
              </div>

              {/* Colorways */}
              <div>
                <label className="block text-xs font-tech font-bold uppercase tracking-wider text-zinc-300 mb-2">
                  Selected Colorway:{' '}
                  <span className="text-white font-normal">
                    {selectedColor.name}
                  </span>
                </label>
                <div className="flex items-center gap-3">
                  {currentProduct.colors.map((color) => {
                    const isSelected = selectedColor.name === color.name;
                    return (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => {
                          setSelectedColor(color);
                          setSelectedImageIndex(0);
                        }}
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer relative ${
                          isSelected
                            ? 'ring-2 ring-[#FF4800] ring-offset-2 ring-offset-zinc-900 scale-110'
                            : 'border border-zinc-700 hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {isSelected && (
                          <Check
                            className={`w-4 h-4 ${
                              color.hex.toLowerCase() === '#ffffff' ||
                              color.hex.toLowerCase() === '#f4f4f5'
                                ? 'text-black'
                                : 'text-white'
                            }`}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-tech font-bold uppercase tracking-wider text-zinc-300">
                    Select Size (UK/India)
                  </span>
                  <span className="text-[11px] text-zinc-400 font-mono">
                    True to size fit
                  </span>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {currentProduct.availableSizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 rounded-xl text-xs font-tech font-extrabold transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-[#FF4800] text-white border-[#FF4800] shadow-md shadow-[#FF4800]/25'
                            : 'bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-300 border-zinc-700'
                        }`}
                      >
                        UK {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      onAddToCart(currentProduct, selectedColor, selectedSize)
                    }
                    className="flex-1 py-4 px-6 rounded-xl bg-[#FF4800] hover:bg-[#e03f00] text-white font-tech font-bold tracking-wider uppercase text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#FF4800]/20 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add To Bag • ₹{currentProduct.price.toLocaleString('en-IN')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onQuickView(currentProduct)}
                    className="p-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 hover:text-white transition-all cursor-pointer"
                    title="Inspect 45 Shoe Details"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>

                {/* Ask AI Stylist Button */}
                <button
                  type="button"
                  onClick={() =>
                    onAskAiStylist(
                      `Tell me about the ${currentProduct.name} (Brand 45): fit, sizing recommendations, and what to pair it with!`
                    )
                  }
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-950/40 to-indigo-950/40 hover:from-purple-900/50 hover:to-indigo-900/50 border border-purple-500/30 text-purple-300 hover:text-purple-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>Ask 45 AI Stylist about this shoe</span>
                </button>
              </div>

              {/* Specs Micro Bar */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-zinc-800/80 text-[11px] text-zinc-400 font-mono">
                <div>
                  <span className="block text-zinc-500">Weight</span>
                  <span className="text-zinc-200">{currentProduct.specs.weight}</span>
                </div>
                <div>
                  <span className="block text-zinc-500">Midsole</span>
                  <span className="text-zinc-200 truncate block">
                    {currentProduct.specs.midsole}
                  </span>
                </div>
                <div>
                  <span className="block text-zinc-500">Origin</span>
                  <span className="text-zinc-200">Chikhli, MH</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* One By One Thumbnail Navigation Strip */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-tech uppercase tracking-wider text-zinc-400 font-bold">
              BROWSE ALL 45 SHOES ONE BY ONE
            </span>
            <span className="text-xs text-zinc-500 font-mono">
              Click any shoe to switch view
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {products.map((p, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-zinc-800/90 border-[#FF4800] ring-2 ring-[#FF4800]/30 shadow-lg'
                      : 'bg-zinc-900/60 border-zinc-800 hover:bg-zinc-800/50 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                    <span
                      className={`font-bold ${
                        isSelected ? 'text-[#FF4800]' : 'text-zinc-400'
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-black/50 text-zinc-300 font-bold">
                      45
                    </span>
                  </div>

                  <div className="w-full aspect-[4/3] bg-zinc-950/60 rounded-lg flex items-center justify-center p-2 mb-2">
                    <img
                      src={p.colors[0]?.image || p.colors[0]?.gallery[0]}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain filter contrast-105"
                    />
                  </div>

                  <div className="mt-auto">
                    <p className="text-xs font-bold text-white truncate">
                      {p.name}
                    </p>
                    <p className="text-[11px] font-mono text-[#FF4800] mt-0.5">
                      ₹{p.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
