import React, { useState, useRef } from 'react';
import { ArrowRight, ShieldCheck, Zap, Truck, Sparkles, Camera, RotateCcw } from 'lucide-react';
import { BRAND_INFO, PRODUCTS_DATA } from '../data/products';
import { Product } from '../types';

interface HeroProps {
  onShopMen?: () => void;
  onShopWomen?: () => void;
  onShopNow?: () => void;
  onExploreNew?: () => void;
  onQuickView?: (product: Product) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onShopMen,
  onShopWomen,
  onShopNow,
  onExploreNew,
  onQuickView,
}) => {
  const heroProduct = PRODUCTS_DATA[0]; // FOUR5 Velocity Runner
  const [activeAngleIndex, setActiveAngleIndex] = useState(0);
  const [customHeroImage, setCustomHeroImage] = useState<string | null>(() => {
    try {
      return localStorage.getItem('four5_custom_hero_image');
    } catch {
      return null;
    }
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCustomImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setCustomHeroImage(result);
        try {
          localStorage.setItem('four5_custom_hero_image', result);
        } catch {
          // Ignore quota errors
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetImage = () => {
    setCustomHeroImage(null);
    try {
      localStorage.removeItem('four5_custom_hero_image');
    } catch {
      // Ignore
    }
  };

  const handleMenClick = () => {
    if (onShopMen) onShopMen();
    else if (onShopNow) onShopNow();
  };

  const handleWomenClick = () => {
    if (onShopWomen) onShopWomen();
    else if (onShopNow) onShopNow();
  };

  const handleInspectClick = () => {
    if (onQuickView) {
      onQuickView(heroProduct);
    } else if (onExploreNew) {
      onExploreNew();
    } else if (onShopNow) {
      onShopNow();
    }
  };

  const heroImages = [
    {
      label: 'FOUR5 Drop Edition',
      url: customHeroImage || '/shoe2.png',
    },
    {
      label: 'Clean Studio',
      url: '/shoe2-clean.png',
    },
    {
      label: 'Drop Banner',
      url: '/shoe2.jpeg',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#111113] via-[#18181B] to-[#0F0F11] text-white pt-8 pb-16 lg:py-24">
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Ambient Glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#FF4800]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Top Brand Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#FF4800] animate-ping" />
              <span className="font-tech text-xs tracking-wider uppercase font-bold text-zinc-200">
                {BRAND_INFO.tagline} • INDIA
              </span>
            </div>

            {/* Brand Title & Hero Statement */}
            <div className="space-y-3">
              <h2 className="font-tech text-sm sm:text-base tracking-[0.25em] text-[#FF4800] font-extrabold uppercase">
                {BRAND_INFO.heroHeadline}
              </h2>
              <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-tighter leading-[0.95] uppercase">
                Step Into <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-zinc-400">
                  Your Legacy.
                </span>
              </h1>
            </div>

            {/* Supporting Description */}
            <p className="text-zinc-300 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
              {BRAND_INFO.heroSupportingText} Engineered with responsive Kinetic-Foam™, breathable Jacquard mesh, and uncompromising Indian athletic ambition.
            </p>

            {/* Price indicator & launch badge */}
            <div className="flex items-center gap-4 py-1 text-sm">
              <div className="bg-zinc-800/80 border border-zinc-700/60 rounded-lg px-3 py-1.5 flex items-center gap-2">
                <span className="text-xs text-zinc-400 font-tech">STARTING AT</span>
                <span className="font-bold text-white text-base">₹1,499</span>
              </div>
              <div className="text-zinc-400 text-xs flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Engineered in Chikhli, Maharashtra</span>
              </div>
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={handleMenClick}
                className="group px-7 py-4 bg-[#FF4800] hover:bg-[#E03E00] text-white font-extrabold text-sm tracking-wider uppercase rounded-xl shadow-lg shadow-orange-950/40 flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer active:scale-98"
              >
                <span>SHOP MEN</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={handleWomenClick}
                className="px-7 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold text-sm tracking-wider uppercase rounded-xl backdrop-blur-md flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer active:scale-98"
              >
                <span>SHOP WOMEN</span>
              </button>
            </div>

            {/* Value Props Row */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-zinc-800/80 text-left">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[#FF4800]">
                  <Truck className="w-4 h-4" />
                  <span className="text-xs font-bold text-zinc-200">FREE SHIPPING</span>
                </div>
                <p className="text-[11px] text-zinc-400">On all orders over ₹1,999</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[#FF4800]">
                  <Zap className="w-4 h-4" />
                  <span className="text-xs font-bold text-zinc-200">KINETIC FOAM</span>
                </div>
                <p className="text-[11px] text-zinc-400">Ultra-plush shock rebound</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[#FF4800]">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs font-bold text-zinc-200">7-DAY RETURNS</span>
                </div>
                <p className="text-[11px] text-zinc-400">Hassle-free size exchange</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Sneaker Showcase with Floating Badges & Angle Toggles */}
          <div className="lg:col-span-6 relative flex flex-col items-center">
            {/* Visual Frame */}
            <div className="relative w-full aspect-square max-w-lg mx-auto flex items-center justify-center">
              
              {/* Backglow Circle */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#FF4800]/20 via-zinc-800 to-transparent blur-2xl opacity-70" />

              {/* Central Sneaker Image */}
              <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
                <img
                  src={heroImages[activeAngleIndex].url}
                  alt="FOUR5 Velocity Runner - Hero Athletic Sneaker"
                  className="w-full h-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)] hover:scale-105 transition-transform duration-500 cursor-pointer"
                  onClick={handleInspectClick}
                />
              </div>

              {/* Floating Feature Pin 1: Cushioning */}
              <div className="absolute top-6 left-4 sm:left-0 z-20 bg-zinc-900/90 border border-zinc-700/80 backdrop-blur-md rounded-xl p-3 shadow-xl max-w-[170px] hidden sm:block">
                <div className="text-[10px] font-tech text-[#FF4800] uppercase font-bold tracking-wider">
                  TECH HIGHLIGHT
                </div>
                <div className="text-xs font-bold text-white mt-0.5">Dual Kinetic Core</div>
                <div className="text-[11px] text-zinc-400">72% energy return on stride</div>
              </div>

              {/* Floating Feature Pin 2: Weight */}
              <div className="absolute bottom-10 right-2 sm:right-0 z-20 bg-zinc-900/90 border border-zinc-700/80 backdrop-blur-md rounded-xl p-3 shadow-xl max-w-[170px]">
                <div className="text-[10px] font-tech text-emerald-400 uppercase font-bold tracking-wider">
                  WEIGHT METRIC
                </div>
                <div className="text-xs font-bold text-white mt-0.5">238 Grams</div>
                <div className="text-[11px] text-zinc-400">Featherweight engineering</div>
              </div>
            </div>

            {/* Angle Preview Switcher & Quick View link */}
            <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-lg mt-4 px-2 gap-3">
              <div className="flex items-center gap-2">
                {heroImages.map((img, idx) => (
                  <button
                    key={img.label}
                    type="button"
                    onClick={() => setActiveAngleIndex(idx)}
                    className={`px-3 py-1.5 text-xs rounded-md transition-all cursor-pointer font-medium ${
                      activeAngleIndex === idx
                        ? 'bg-[#FF4800] text-white shadow-md'
                        : 'bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700'
                    }`}
                  >
                    {idx === 0 ? 'Drop Edition' : idx === 1 ? 'Studio' : 'Poster'}
                  </button>
                ))}

                {/* Upload Photo Button */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleCustomImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  title="Upload / Change Photo from your device"
                  className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-md bg-zinc-800/90 hover:bg-zinc-700 text-amber-300 border border-amber-500/30 transition-all cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">Upload</span>
                </button>

                {customHeroImage && (
                  <button
                    type="button"
                    onClick={handleResetImage}
                    title="Reset to default"
                    className="p-1.5 text-zinc-400 hover:text-white bg-zinc-800/80 rounded-md cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={handleInspectClick}
                className="text-xs font-bold text-zinc-300 hover:text-white underline underline-offset-4 decoration-[#FF4800] cursor-pointer"
              >
                Inspect Velocity Runner (₹2,999) &rarr;
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
