import React, { useState } from 'react';
import {
  ArrowRight,
  MapPin,
  Award,
  CheckCircle,
} from 'lucide-react';
import { BRAND_INFO } from '../data/products';

interface BrandStorySectionProps {
  onOurStory?: () => void;
  onReadStory?: () => void;
}

export const BrandStorySection: React.FC<BrandStorySectionProps> = ({ onOurStory, onReadStory }) => {
  // Story shoe image state (persisted in localStorage and server disk)
  const [storyImage] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('four5_story_image');
      if (saved && !saved.includes('photo-1600185365926')) return saved;
    } catch {
      // ignore
    }
    return '/story-shoe.jpg';
  });

  const handleAction = () => {
    if (onOurStory) onOurStory();
    else if (onReadStory) onReadStory();
  };

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-zinc-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image Card with Hometown Roots Badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg">
              {/* Main Image Container */}
              <div
                className="rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 relative group bg-zinc-950"
              >
                <img
                  src={storyImage}
                  alt="FOUR5 Shoes Craftsmanship"
                  className="w-full h-[280px] sm:h-[360px] md:h-[420px] object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
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
          </div>

          {/* Right Column: Editorial Text */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-50 text-[#FF4800] text-xs font-tech font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>THE FOUR5 MANIFESTO</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-zinc-950 uppercase tracking-tight leading-none">
              BORN IN CHIKHLI. <br />
              <span className="text-[#FF4800]">BUILT FOR</span> THE WORLD.
            </h2>

            <div className="space-y-4 text-zinc-600 text-sm sm:text-base leading-relaxed">
              <p>
                FOUR5 (Brand 45) was born from a singular obsession: to build world-class athletic footwear right here in Chikhli, Buldhana, Maharashtra. We refused the compromise between international athletic performance and local grassroots grit.
              </p>
              <p>
                Every silhouette is designed with high-density kinetic cushioning, reinforced carbon stability arches, and abrasion-proof outsoles that thrive from Buldhana’s asphalt to metropolitan marathons.
              </p>
            </div>

            {/* Core Values Bullet Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-50 border border-zinc-200">
                <CheckCircle className="w-4 h-4 text-[#FF4800] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-xs text-zinc-900 uppercase">100% Indian Engineering</div>
                  <div className="text-[11px] text-zinc-500">Designed & stress-tested in Maharashtra</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-50 border border-zinc-200">
                <CheckCircle className="w-4 h-4 text-[#FF4800] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-xs text-zinc-900 uppercase">Kinetic Core Sole</div>
                  <div className="text-[11px] text-zinc-500">Up to 82% explosive energy return</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-50 border border-zinc-200">
                <CheckCircle className="w-4 h-4 text-[#FF4800] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-xs text-zinc-900 uppercase">Direct-to-Athlete</div>
                  <div className="text-[11px] text-zinc-500">No inflated middleman luxury tax</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-50 border border-zinc-200">
                <CheckCircle className="w-4 h-4 text-[#FF4800] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-xs text-zinc-900 uppercase">Free Express Shipping</div>
                  <div className="text-[11px] text-zinc-500">Fast 2-4 day doorstep delivery</div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={handleAction}
                className="px-6 py-3.5 bg-zinc-950 text-white hover:bg-[#FF4800] font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg active:scale-95"
              >
                <span>Read Full Brand Story</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-xs font-semibold text-zinc-500">
                Contact: <strong className="text-zinc-900">{BRAND_INFO.phone}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
