import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface AnnouncementBarProps {
  onNavigateShop?: () => void;
  onOpenTrendRadar?: () => void;
}

const ANNOUNCEMENTS = [
  { text: 'FREE SHIPPING ON ORDERS ABOVE ₹1,999', linkText: 'SHOP NOW', code: '', action: 'shop' },
  { text: 'LIVE TREND RADAR: SNEAKER TECH GROUNDED WITH GOOGLE SEARCH', linkText: 'VIEW TRENDS', code: '', action: 'radar' },
  { text: 'NEW ARRIVALS ARE HERE — STEP INTO YOUR LEGACY', linkText: 'EXPLORE DROPS', code: '', action: 'shop' },
  { text: 'USE CODE "FOUR5FIRST" FOR EXTRA 10% OFF', linkText: 'COPY CODE', code: 'FOUR5FIRST', action: 'copy' },
  { text: 'ENGINEERED IN CHIKHLI, MAHARASHTRA | PAN-INDIA DELIVERY', linkText: 'DISCOVER', code: '', action: 'shop' },
];

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onNavigateShop, onOpenTrendRadar }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length);
  };

  const handleAction = (item: (typeof ANNOUNCEMENTS)[0]) => {
    if (item.action === 'radar' && onOpenTrendRadar) {
      onOpenTrendRadar();
    } else if (item.code) {
      navigator.clipboard?.writeText(item.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else if (onNavigateShop) {
      onNavigateShop();
    }
  };

  const current = ANNOUNCEMENTS[currentIndex];

  return (
    <div className="bg-[#0F0F11] text-white text-xs tracking-wider border-b border-zinc-800 relative z-40 select-none">
      <div className="max-w-7xl mx-auto px-4 h-9 flex items-center justify-between">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous announcement"
          className="p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer hidden sm:flex items-center"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <div className="flex-1 flex items-center justify-center gap-2 text-center overflow-hidden py-1 px-2">
          <Sparkles className="w-3 h-3 text-[#FF4800] shrink-0 animate-pulse" />
          <span className="font-semibold tracking-wide uppercase transition-all duration-300">
            {current.text}
          </span>
          <button
            type="button"
            onClick={() => handleAction(current)}
            className="hidden md:inline-flex items-center underline underline-offset-4 decoration-[#FF4800] text-zinc-300 hover:text-white font-medium ml-2 cursor-pointer transition-colors"
          >
            {copied && current.code ? 'COPIED!' : current.linkText}
          </button>
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next announcement"
          className="p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer hidden sm:flex items-center"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
