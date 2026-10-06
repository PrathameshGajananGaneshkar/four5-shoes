import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { BRAND_INFO } from '../data/products';

export const WhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl = `https://wa.me/${BRAND_INFO.whatsapp}?text=${encodeURIComponent(
    BRAND_INFO.whatsappDefaultMsg
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 select-none">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="bg-white text-zinc-900 border border-zinc-200 shadow-xl rounded-2xl p-3 max-w-[220px] text-xs relative animate-bounce">
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="absolute top-1.5 right-1.5 text-zinc-400 hover:text-zinc-700 p-0.5 rounded-full cursor-pointer"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="font-bold text-[#0F0F11] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Chat with FOUR5</span>
          </div>
          <p className="text-[11px] text-zinc-500 mt-1">
            Questions on sizing or orders? Talk to us directly on WhatsApp!
          </p>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:shadow-2xl hover:bg-[#20bd5a] hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
        aria-label="Chat with FOUR5 Shoes on WhatsApp"
        title="Chat on WhatsApp (+91 86687 20597)"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
        <MessageCircle className="w-7 h-7 fill-current relative z-10" />
      </a>
    </div>
  );
};
