import React from 'react';
import { Phone, Mail, MapPin, MessageCircle, Instagram, Facebook, ArrowUpRight } from 'lucide-react';
import { BRAND_INFO } from '../data/products';
import { ActiveView } from '../types';

interface FooterProps {
  onNavigate: (view: ActiveView, filter?: string, gender?: string) => void;
  onOpenTracking?: () => void;
  onOpenTrendRadar?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenTracking, onOpenTrendRadar }) => {
  return (
    <footer className="bg-[#0F0F11] text-zinc-400 border-t border-zinc-800 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        
        {/* 4 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1: Brand & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black text-3xl tracking-tighter text-white">
                FOUR
              </span>
              <span className="font-display font-black text-3xl tracking-tighter text-[#FF4800]">
                5
              </span>
              <span className="font-tech text-xs font-bold tracking-widest text-zinc-500 uppercase ml-2">
                SHOES
              </span>
            </div>

            <p className="font-display font-extrabold text-white text-lg tracking-tight uppercase">
              &ldquo;{BRAND_INFO.tagline}&rdquo;
            </p>

            <p className="text-sm text-zinc-400 leading-relaxed">
              {BRAND_INFO.secondaryTagline} A new-age Indian footwear brand creating high-performance, everyday comfort footwear for those who move differently.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white hover:border-[#FF4800] hover:bg-[#FF4800]/10 transition-all cursor-pointer"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white hover:border-[#FF4800] hover:bg-[#FF4800]/10 transition-all cursor-pointer"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${BRAND_INFO.whatsapp}?text=${encodeURIComponent(BRAND_INFO.whatsappDefaultMsg)}`}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400 hover:text-emerald-300 hover:border-emerald-500 hover:bg-emerald-500/10 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Shop */}
          <div>
            <h4 className="font-tech text-xs font-bold uppercase tracking-widest text-white mb-4">
              SHOP
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('shop', undefined, 'Men')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Men
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('shop', undefined, 'Women')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Women
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('shop', 'Sneakers')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Sneakers
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('shop', 'Sports Shoes')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Sports Shoes
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('shop', 'Running Shoes')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Running Shoes
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('shop', 'Casual Shoes')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Casual Shoes
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('shop', 'Lifestyle Footwear')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Lifestyle Footwear
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('shop', 'Track Suits')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Track Suits
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('shop', 'Sports T-Shirts')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Sports T-Shirts
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('shop', 'new-arrivals')}
                  className="text-[#FF4800] hover:underline transition-all cursor-pointer font-semibold flex items-center gap-1 pt-1"
                >
                  <span>New Arrivals</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: About */}
          <div>
            <h4 className="font-tech text-xs font-bold uppercase tracking-widest text-white mb-4">
              ABOUT
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About FOUR5
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onNavigate.bind(null, 'contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenTracking}
                  className="text-orange-400 hover:text-orange-300 font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Track Order / Status</span>
                  <span className="text-[9px] bg-[#FF4800]/20 text-[#FF4800] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                    Live
                  </span>
                </button>
              </li>
              {onOpenTrendRadar && (
                <li>
                  <button
                    type="button"
                    onClick={onOpenTrendRadar}
                    className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Footwear Trend Radar</span>
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                      Google Grounded
                    </span>
                  </button>
                </li>
              )}
              <li>
                <span className="text-zinc-500 cursor-default">Shipping & Delivery (Free &gt; ₹1,999)</span>
              </li>
              <li>
                <span className="text-zinc-500 cursor-default">Returns & Refunds (7-Day Exchange)</span>
              </li>
              <li>
                <span className="text-zinc-500 cursor-default">Privacy Policy</span>
              </li>
              <li>
                <span className="text-zinc-500 cursor-default">Terms & Conditions</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div className="space-y-4">
            <h4 className="font-tech text-xs font-bold uppercase tracking-widest text-white mb-4">
              CONTACT
            </h4>

            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${BRAND_INFO.phone}`}
                  className="flex items-center gap-3 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#FF4800] shrink-0" />
                  <span>{BRAND_INFO.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${BRAND_INFO.whatsapp}?text=${encodeURIComponent(BRAND_INFO.whatsappDefaultMsg)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 hover:text-emerald-400 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>WhatsApp: {BRAND_INFO.whatsappDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BRAND_INFO.email}`}
                  className="flex items-center gap-3 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#FF4800] shrink-0" />
                  <span>{BRAND_INFO.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#FF4800] shrink-0 mt-0.5" />
                <span className="text-zinc-400 leading-snug">
                  {BRAND_INFO.address}
                </span>
              </li>
            </ul>

            {/* Indian E-commerce Trust Badges */}
            <div className="pt-2 border-t border-zinc-800">
              <span className="text-[11px] font-tech text-zinc-500 uppercase tracking-wider block mb-2">
                SECURE PAYMENTS ACCEPTED
              </span>
              <div className="flex flex-wrap gap-2 text-[10px] text-zinc-400 font-bold">
                <span className="px-2 py-1 bg-zinc-900 rounded border border-zinc-800">UPI / GPay</span>
                <span className="px-2 py-1 bg-zinc-900 rounded border border-zinc-800">PhonePe</span>
                <span className="px-2 py-1 bg-zinc-900 rounded border border-zinc-800">RuPay</span>
                <span className="px-2 py-1 bg-zinc-900 rounded border border-zinc-800">Cards</span>
                <span className="px-2 py-1 bg-zinc-900 rounded border border-zinc-800">COD</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-16 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© 2026 FOUR5 Shoes. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span>Domain: four5shoes.com</span>
            <span>Chikhli, Buldhana, Maharashtra</span>
            <span className="text-zinc-400 font-tech">#THENEXTMOVE</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
