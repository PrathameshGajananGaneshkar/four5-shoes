import React from 'react';
import { ArrowRight } from 'lucide-react';

interface GenderSplitSectionProps {
  onShopMen?: () => void;
  onShopWomen?: () => void;
  onSelectGender?: (gender: string) => void;
}

export const GenderSplitSection: React.FC<GenderSplitSectionProps> = ({
  onShopMen,
  onShopWomen,
  onSelectGender,
}) => {
  const handleMen = () => {
    if (onShopMen) onShopMen();
    else if (onSelectGender) onSelectGender('Men');
  };

  const handleWomen = () => {
    if (onShopWomen) onShopWomen();
    else if (onSelectGender) onSelectGender('Women');
  };

  return (
    <section className="py-8 bg-[#FAFAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* MEN BANNER */}
          <div
            onClick={handleMen}
            className="group relative overflow-hidden rounded-3xl min-h-[460px] sm:min-h-[520px] bg-zinc-950 flex flex-col justify-end p-8 sm:p-10 cursor-pointer shadow-lg"
          >
            {/* Background Athlete Image */}
            <img
              src="https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=1000&auto=format&fit=crop&q=80"
              alt="FOUR5 Men Footwear"
              className="absolute inset-0 w-full h-full object-cover object-center brightness-75 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Content */}
            <div className="relative z-10 space-y-3">
              <span className="font-tech text-xs tracking-widest text-[#FF4800] uppercase font-bold">
                MEN’S COLLECTION
              </span>
              <h3 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight leading-none">
                Move With <br />Purpose.
              </h3>
              <p className="text-zinc-300 text-sm max-w-sm">
                Built for aggressive stability, explosive traction, and relentless city runs.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMen();
                  }}
                  className="px-6 py-3.5 bg-white text-zinc-950 hover:bg-[#FF4800] hover:text-white font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all flex items-center gap-2 cursor-pointer active:scale-98"
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
            className="group relative overflow-hidden rounded-3xl min-h-[460px] sm:min-h-[520px] bg-zinc-950 flex flex-col justify-end p-8 sm:p-10 cursor-pointer shadow-lg"
          >
            {/* Background Athlete Image */}
            <img
              src="https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=1000&auto=format&fit=crop&q=80"
              alt="FOUR5 Women Footwear"
              className="absolute inset-0 w-full h-full object-cover object-center brightness-75 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Content */}
            <div className="relative z-10 space-y-3">
              <span className="font-tech text-xs tracking-widest text-[#FF4800] uppercase font-bold">
                WOMEN’S COLLECTION
              </span>
              <h3 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight leading-none">
                Own Every <br />Move.
              </h3>
              <p className="text-zinc-300 text-sm max-w-sm">
                Featherweight comfort meets refined silhouettes for daily momentum.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWomen();
                  }}
                  className="px-6 py-3.5 bg-white text-zinc-950 hover:bg-[#FF4800] hover:text-white font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all flex items-center gap-2 cursor-pointer active:scale-98"
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
