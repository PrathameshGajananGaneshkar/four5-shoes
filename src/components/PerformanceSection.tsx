import React, { useState } from 'react';
import {
  ShieldCheck,
  Zap,
  Compass,
  CheckCircle2,
  Award,
  ArrowRight,
} from 'lucide-react';

interface PerformanceSectionProps {
  onExploreTech?: () => void;
}

export const PerformanceSection: React.FC<PerformanceSectionProps> = ({ onExploreTech }) => {
  const [activeTab, setActiveTab] = useState<'design' | 'comfort' | 'performance'>('performance');

  // Performance shoe image state with persistence
  const [shoeImage] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('four5_performance_image');
      if (saved) return saved;
    } catch {
      // ignore
    }
    return '/performance-shoe.jpg';
  });

  const specs = [
    {
      title: 'Kinetic-Foam™ Core',
      metric: '82%',
      desc: 'Energy return on impact heel-to-toe',
      icon: Zap,
    },
    {
      title: 'Feather-Light Carbon',
      metric: '185g',
      desc: 'Sub-200g racing chassis architecture',
      icon: Compass,
    },
    {
      title: 'Diamond Traction 45',
      metric: '4.8x',
      desc: 'Grip index tested on wet asphalt & grit',
      icon: ShieldCheck,
    },
  ];

  const tabContent = {
    performance: {
      headline: 'Engineered for Maharashtra & Global Roads',
      body: 'Forged through 14 iterations in Chikhli, Maharashtra. The Kinetic Plate flexes dynamically under strike force, propelling the foot forward with minimal metabolic cost.',
      bullets: [
        'Multi-density EVA midsole with micro-cellular rebound cells',
        'Directional chevron tread optimized for Indian terrain',
        'Torsional carbon-shank prevents midfoot strain',
      ],
    },
    comfort: {
      headline: 'Orthopedic Cushioning Meets Speed',
      body: 'Engineered for athletes and everyday hustle. Anatomical heel cradle dampens impact up to 40% more than conventional running shoes.',
      bullets: [
        'Memory-rebound arch contouring',
        'Breathable jacquard mesh upper with climate ventilation',
        'Seamless inner bootie for zero friction/blisters',
      ],
    },
    design: {
      headline: 'Minimalist Architecture, Zero Waste',
      body: 'Every line serves an aerodynamic purpose. Clean silhouettes born from athletic function, styled for street luxury.',
      bullets: [
        'Precision sonic-welded overlays without heavy stitching',
        'Custom 45 geometry branding in reflective high-vis pigment',
        'Matte and gloss contrasting architectural finishes',
      ],
    },
  };

  return (
    <section className="py-20 lg:py-28 bg-[#0B0B0D] text-white relative overflow-hidden border-t border-b border-zinc-800/80">
      {/* Background Tech Grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4800]/10 border border-[#FF4800]/30 text-[#FF4800] text-xs font-tech font-bold uppercase tracking-wider mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>Chikhli Innovation Lab</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-none">
              FOUR5 <span className="text-[#FF4800]">Performance</span> Lab
            </h2>
          </div>
          <p className="text-zinc-400 text-sm max-w-md">
            Our footwear isn’t just designed—it is stress-tested on real roads, gym floors, and endurance tracks before reaching your feet.
          </p>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {specs.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-colors backdrop-blur-xs relative group overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF4800]/5 rounded-bl-full group-hover:bg-[#FF4800]/10 transition-colors pointer-events-none" />
                <div className="w-10 h-10 rounded-xl bg-black border border-zinc-800 flex items-center justify-center text-[#FF4800] mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="font-display font-black text-3xl sm:text-4xl text-white mb-1">
                  {item.metric}
                </div>
                <div className="font-bold text-sm text-zinc-200 mb-1">{item.title}</div>
                <div className="text-xs text-zinc-400">{item.desc}</div>
              </div>
            );
          })}
        </div>

        {/* Interactive Lab Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-zinc-900/30 rounded-3xl p-6 sm:p-10 border border-zinc-800/60">
          
          {/* Left Column: Interactive Tabs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Tabs */}
            <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
              {(['performance', 'comfort', 'design'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === tab
                      ? 'bg-[#FF4800] text-white shadow-lg'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Body */}
            <div className="space-y-4 min-h-[160px]">
              <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
                {tabContent[activeTab].headline}
              </h3>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                {tabContent[activeTab].body}
              </p>
              <ul className="space-y-2 pt-2">
                {tabContent[activeTab].bullets.map((b, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-400">
                    <CheckCircle2 className="w-4 h-4 text-[#FF4800] shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Button */}
            {onExploreTech && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onExploreTech}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF4800] hover:text-white transition-colors cursor-pointer group"
                >
                  <span>Explore 45 Laboratory Testing Log</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Shoe Visual */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            {/* Image Card Container */}
            <div
              className="w-full aspect-4/3 rounded-2xl overflow-hidden border border-zinc-700/80 bg-zinc-950 flex items-center justify-center p-6 relative group shadow-2xl"
            >
              {/* Subtle orange glow */}
              <div className="absolute inset-0 bg-radial from-[#FF4800]/10 via-transparent to-transparent opacity-60 pointer-events-none" />

              {/* The Shoe Image */}
              <img
                src={shoeImage}
                alt="FOUR5 Kinetic Performance Engineering Shoe"
                className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.95)] group-hover:scale-105 transition-transform duration-500"
              />

              {/* Bottom Right Original Badge */}
              <div className="absolute bottom-3 right-3 z-20 bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-zinc-800 text-[11px] font-tech text-zinc-300 flex items-center gap-1.5 shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4800]" />
                <span>PROTOTYPED IN CHIKHLI</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
