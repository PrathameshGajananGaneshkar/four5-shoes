import React from 'react';
import { ArrowRight, ArrowLeft, MapPin, Compass, ShieldCheck, Award, Heart, CheckCircle2 } from 'lucide-react';
import { BRAND_INFO } from '../data/products';

interface AboutViewProps {
  onExploreShop: () => void;
  onContact: () => void;
  onNavigateHome?: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onExploreShop, onContact, onNavigateHome }) => {
  return (
    <div className="py-12 lg:py-20 bg-[#FAFAFB] text-zinc-900 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Back Button */}
        {onNavigateHome && (
          <div>
            <button
              type="button"
              onClick={onNavigateHome}
              className="group inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-zinc-100 text-zinc-900 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer border border-zinc-200 shadow-xs active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 text-[#FF4800] group-hover:-translate-x-1 transition-transform" />
              <span>← मुख्य पेजवर परत जा (Back to Home)</span>
            </button>
          </div>
        )}

        {/* Hero Banner for About */}
        <div className="bg-[#0F0F11] text-white rounded-3xl p-8 sm:p-14 lg:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF4800]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-tech font-bold uppercase tracking-wider text-[#FF4800]">
              <MapPin className="w-3.5 h-3.5" />
              <span>BORN IN CHIKHLI, BULDHANA, MAHARASHTRA</span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight leading-none">
              THE NEXT <br />
              <span className="text-[#FF4800]">MOVE</span> STARTS HERE.
            </h1>

            <p className="text-zinc-300 text-lg sm:text-xl font-normal leading-relaxed">
              FOUR5 Shoes is an ambitious Indian athletic and lifestyle footwear company built for those who refuse to move like everyone else.
            </p>
          </div>
        </div>

        {/* The Origin Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="font-tech text-xs tracking-widest text-[#FF4800] uppercase font-bold">
              THE ORIGIN
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-zinc-950">
              Why We Founded FOUR5
            </h2>

            <div className="space-y-4 text-zinc-700 text-base leading-relaxed">
              <p>
                In smaller Indian cities and bustling metropolises alike, sneaker lovers face the same dilemma: high-end international footwear brands charge exorbitant prices (often exceeding ₹8,000 to ₹15,000), while budget alternatives offer cheap plastics, rigid soles, and generic copied designs.
              </p>
              <p>
                From our studio in <strong>Chikhli, Buldhana, Maharashtra</strong>, we set out to build an indigenous Indian powerhouse. We asked ourselves: why can&apos;t Indian engineering produce world-class athletic runners, structured court silhouettes, and responsive training shoes at an honest price?
              </p>
              <p>
                That conviction birthed <strong>FOUR5 Shoes</strong>. The name represents continuous propulsion—a bold leap past conventional standards.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold text-zinc-900">
              <div className="px-4 py-2 bg-white rounded-xl border border-zinc-200">
                🚀 Fair Indian Pricing: ₹1,499 – ₹3,999
              </div>
              <div className="px-4 py-2 bg-white rounded-xl border border-zinc-200">
                🧪 Kinetic-Foam Rebound Technology
              </div>
              <div className="px-4 py-2 bg-white rounded-xl border border-zinc-200">
                🇮🇳 Designed in Maharashtra
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-zinc-200">
              <img
                src="https://images.unsplash.com/photo-1552346154-21d32810aba3?w=900&auto=format&fit=crop&q=80"
                alt="FOUR5 Design Ethos"
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                <div className="text-white">
                  <div className="font-tech text-xs font-bold uppercase tracking-wider text-[#FF4800]">
                    CRAFTSMANSHIP MANDATE
                  </div>
                  <div className="font-display font-black text-2xl uppercase mt-1">
                    Zero Generic Molds. Pure Identity.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="font-tech text-xs tracking-widest text-[#FF4800] uppercase font-bold">
              STANDARDS
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-zinc-950">
              The Four Pillars of FOUR5
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-zinc-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FF4800] flex items-center justify-center font-black">
                01
              </div>
              <h3 className="font-display font-extrabold text-xl uppercase text-zinc-950">
                Kinetic Energy Return
              </h3>
              <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
                Tuned dual-density EVA midsoles designed to absorb shock on hard surfaces and propel every stride forward.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-zinc-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FF4800] flex items-center justify-center font-black">
                02
              </div>
              <h3 className="font-display font-extrabold text-xl uppercase text-zinc-950">
                Monsoon & Summer Durability
              </h3>
              <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
                Weather-adaptive fabrics, breathable Jacquard mesh, and high-abrasion Hexa-Grip rubber outsoles.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-zinc-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FF4800] flex items-center justify-center font-black">
                03
              </div>
              <h3 className="font-display font-extrabold text-xl uppercase text-zinc-950">
                Honest Transparency
              </h3>
              <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
                No artificial inflated markups. Direct-to-consumer athletic luxury accessible across all Indian PIN codes.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-zinc-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FF4800] flex items-center justify-center font-black">
                04
              </div>
              <h3 className="font-display font-extrabold text-xl uppercase text-zinc-950">
                Youth Ambition
              </h3>
              <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
                Designed for those who hustle relentlessly—whether on sports turfs, university campuses, or late-night workstations.
              </p>
            </div>
          </div>
        </div>

        {/* Location & Headquarters Callout */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-zinc-200 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="font-tech text-xs tracking-widest text-[#FF4800] uppercase font-bold">
              HEADQUARTERS & DISTRIBUTION
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl uppercase text-zinc-950">
              Rooted In Chikhli, Maharashtra
            </h3>
            <p className="text-zinc-600 text-sm leading-relaxed">
              {BRAND_INFO.address}. Our team oversees product design, fit prototyping, material testing, and customer support right here in Buldhana district.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onExploreShop}
              className="px-6 py-3.5 bg-[#FF4800] hover:bg-[#E03E00] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-md active:scale-98"
            >
              Shop The Collection
            </button>
            <button
              type="button"
              onClick={onContact}
              className="px-6 py-3.5 bg-[#0F0F11] hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer active:scale-98"
            >
              Contact Us
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
