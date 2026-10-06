import React from 'react';
import { ArrowRight, MapPin, Award, CheckCircle } from 'lucide-react';
import { BRAND_INFO } from '../data/products';

interface BrandStorySectionProps {
  onOurStory?: () => void;
  onReadStory?: () => void;
}

export const BrandStorySection: React.FC<BrandStorySectionProps> = ({ onOurStory, onReadStory }) => {
  const handleStory = () => {
    if (onOurStory) onOurStory();
    else if (onReadStory) onReadStory();
  };
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-zinc-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image Collage / Brand Craft */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg">
              {/* Main Image */}
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-zinc-200">
                <img
                  src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=900&auto=format&fit=crop&q=80"
                  alt="FOUR5 Shoes Craftsmanship"
                  className="w-full h-[420px] object-cover"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-4 sm:right-6 bg-zinc-950 text-white p-5 rounded-2xl shadow-xl border border-zinc-800 max-w-[240px] text-left">
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
