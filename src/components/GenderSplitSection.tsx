import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface GenderSplitSectionProps {
  onShopMen?: () => void;
  onShopWomen?: () => void;
  onSelectGender?: (gender: string) => void;
}

// Clean fallback athletic sneakers
const FALLBACK_MEN_IMAGE =
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&auto=format&fit=crop&q=80';
const FALLBACK_WOMEN_IMAGE =
  'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1000&auto=format&fit=crop&q=80';

export const GenderSplitSection: React.FC<GenderSplitSectionProps> = ({
  onShopMen,
  onShopWomen,
  onSelectGender,
}) => {
  const [menImage] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('four5_banner_men_image');
      if (saved && !saved.includes('photo-1579338559194')) return saved;
    } catch {
      // ignore
    }
    return '/men.jpg';
  });

  const [womenImage] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('four5_banner_women_image');
      if (saved && !saved.includes('photo-1525966222134')) return saved;
    } catch {
      // ignore
    }
    return '/women.jpg';
  });

  const handleMen = () => {
    if (onShopMen) onShopMen();
    else if (onSelectGender) onSelectGender('Men');
  };

  const handleWomen = () => {
    if (onShopWomen) onShopWomen();
    else if (onSelectGender) onSelectGender('Women');
  };

  return (
    <section className="py-10 bg-[#FAFAFB] relative text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* MEN BANNER */}
          <div
            onClick={handleMen}
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
            onClick={handleWomen}
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

            {/* Content */}
            <div className="relative z-10 space-y-3 pointer-events-none">
              <span className="font-tech text-xs tracking-widest text-[#FF4800] uppercase font-bold">
                WOMEN’S COLLECTION
              </span>
              <h3 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight leading-none drop-shadow-md">
                Own Every <br />Move.
              </h3>
              <p className="text-zinc-200 text-sm max-w-sm drop-shadow">
                Precision sculpted for lightweight comfort, agility, and all-day bounce.
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
