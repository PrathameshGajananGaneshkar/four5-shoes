import React, { useState } from 'react';
import { ShieldCheck, Zap, Compass, CheckCircle2, Award, ArrowRight } from 'lucide-react';

interface PerformanceSectionProps {
  onExploreTech?: () => void;
}

export const PerformanceSection: React.FC<PerformanceSectionProps> = ({ onExploreTech }) => {
  const [activeTab, setActiveTab] = useState<'design' | 'comfort' | 'performance'>('performance');

  const tabs = [
    {
      id: 'design' as const,
      title: 'PREMIUM DESIGN',
      subtitle: 'Designed with a modern aesthetic for everyday confidence.',
      icon: Compass,
      highlights: [
        'Minimalist lines sculpted for seamless pairing with jeans, gym gear, or casual trousers',
        'Bespoke matte textured overlays that resist scuffs and creasing',
        'Subtle, understated branding with high-precision debossed logos',
      ],
      stat: '100% Original Molds',
    },
    {
      id: 'comfort' as const,
      title: 'EVERYDAY COMFORT',
      subtitle: 'Built for comfort from your first step to your last.',
      icon: ShieldCheck,
      highlights: [
        'Dual-density OrthoStep footbeds that cradle your natural arch and relieve heel stress',
        'Seamless inner sockliner eliminates friction hot spots and blisters',
        'Featherweight composite structure weighing less than 250 grams per shoe',
      ],
      stat: '14+ Hours Wear Time',
    },
    {
      id: 'performance' as const,
      title: 'PERFORMANCE',
      subtitle: 'Engineered for movement, training and an active lifestyle.',
      icon: Zap,
      highlights: [
        'Kinetic-Foam™ midsole delivers 72% energy return on every sprint stride',
        'High-abrasion Hexa-Grip rubber outsole grips wet tarmac, tile, and turf',
        'Engineered 3D Jacquard mesh accelerates airflow to keep feet cool in Indian heat',
      ],
      stat: '72% Energy Return',
    },
  ];

  const current = tabs.find((t) => t.id === activeTab)!;

  return (
    <section className="py-20 lg:py-28 bg-[#0F0F11] text-white relative overflow-hidden border-b border-zinc-800">
      {/* Background Subtle Lines */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FF4800_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#FF4800] text-xs font-tech font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>FOUR5 PERFORMANCE LAB</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight leading-tight">
            ENGINEERED FOR <br />
            <span className="text-[#FF4800]">UNCOMPROMISING</span> MOMENTUM.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg mt-3 max-w-2xl">
            We don’t compromise between aesthetics and athletics. Every silhouette is tested to withstand the demanding conditions of Indian daily life.
          </p>
        </div>

        {/* 3 Interactive Feature Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTab;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-6 rounded-2xl text-left transition-all duration-200 cursor-pointer border ${
                  isActive
                    ? 'bg-zinc-800/90 border-[#FF4800] shadow-xl shadow-orange-950/20 ring-1 ring-[#FF4800]'
                    : 'bg-zinc-900/60 border-zinc-800 hover:bg-zinc-800/50 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isActive ? 'bg-[#FF4800] text-white' : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-tech text-xs font-bold text-zinc-500">0{tabs.indexOf(tab) + 1}</span>
                </div>

                <h3 className="font-display font-extrabold text-xl uppercase tracking-tight text-white">
                  {tab.title}
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm mt-1.5 line-clamp-2">
                  {tab.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Highlight Focus Area */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-[#FF4800]/20 text-[#FF4800] rounded-lg font-tech text-xs font-bold uppercase tracking-wider">
                FEATURE FOCUS
              </span>
              <span className="text-sm font-bold text-zinc-300">{current.stat}</span>
            </div>

            <h4 className="font-display font-black text-2xl sm:text-4xl uppercase text-white">
              {current.title}
            </h4>

            <p className="text-zinc-300 text-base leading-relaxed">
              {current.subtitle}
            </p>

            <ul className="space-y-3 pt-2">
              {current.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                  <CheckCircle2 className="w-5 h-5 text-[#FF4800] shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            {onExploreTech && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onExploreTech}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-zinc-950 hover:bg-[#FF4800] hover:text-white font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all cursor-pointer active:scale-98"
                >
                  <span>EXPLORE FOUR5 LAB & MISSION</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full aspect-4/3 rounded-2xl overflow-hidden border border-zinc-700/80 bg-zinc-950 flex items-center justify-center p-6 relative group">
              <img
                src="/shoe2-clean.png"
                alt="FOUR5 Kinetic Performance Engineering"
                className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)] group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-zinc-800 text-[11px] font-tech text-zinc-300">
                PROTOTYPED IN CHIKHLI
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
