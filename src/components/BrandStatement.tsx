import React from 'react';
import { ArrowRight, Compass, ShieldCheck, Flame } from 'lucide-react';
import { BRAND_INFO } from '../data/products';

interface BrandStatementProps {
  onDiscover?: () => void;
}

export const BrandStatement: React.FC<BrandStatementProps> = ({ onDiscover }) => {
  const handleDiscover = () => {
    if (onDiscover) onDiscover();
  };

  return (
    <section className="py-20 lg:py-28 bg-[#FAFAFB] border-b border-zinc-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          {/* Subheading pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 text-white text-xs font-tech font-bold uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5 text-[#FF4800]" />
            <span>OUR MANIFESTO</span>
          </div>

          {/* Big Editorial Headline */}
          <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tighter uppercase text-zinc-950 leading-none">
            {BRAND_INFO.tagline}
          </h2>

          {/* Editorial Paragraph */}
          <p className="text-xl sm:text-2xl text-zinc-700 font-normal leading-relaxed tracking-tight max-w-3xl mx-auto">
            &ldquo;FOUR5 is built for the next generation — combining premium design, everyday comfort and performance for people who refuse to move like everyone else.&rdquo;
          </p>

          {/* Action CTA */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleDiscover}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#0F0F11] hover:bg-zinc-800 text-white font-bold text-sm tracking-wider uppercase rounded-xl transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg active:scale-98"
            >
              <span>DISCOVER FOUR5</span>
              <ArrowRight className="w-4 h-4 text-[#FF4800]" />
            </button>
          </div>

          {/* Three Pillars Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 mt-8 border-t border-zinc-200/80 text-left">
            <div className="p-5 rounded-2xl bg-white border border-zinc-200/70 shadow-xs hover:border-zinc-300 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#FF4800] mb-3">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-display font-extrabold text-lg text-zinc-900 uppercase">
                Original Silhouettes
              </h3>
              <p className="text-zinc-600 text-sm mt-1 leading-relaxed">
                Sculpted from clean lines, bespoke outsoles, and zero generic mass-market molds.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-zinc-200/70 shadow-xs hover:border-zinc-300 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#FF4800] mb-3">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="font-display font-extrabold text-lg text-zinc-900 uppercase">
                Kinetic Energy Return
              </h3>
              <p className="text-zinc-600 text-sm mt-1 leading-relaxed">
                Dual-density EVA foam tuned specifically for high impact resistance on Indian pavements.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-zinc-200/70 shadow-xs hover:border-zinc-300 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#FF4800] mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-display font-extrabold text-lg text-zinc-900 uppercase">
                Chikhli Engineering
              </h3>
              <p className="text-zinc-600 text-sm mt-1 leading-relaxed">
                Proudly engineered in Buldhana, Maharashtra, with international finishing standards.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
