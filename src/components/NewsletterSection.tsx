import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubmitted(true);
  };

  return (
    <section className="py-20 bg-white border-b border-zinc-200 text-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F0F11] text-white rounded-3xl p-8 sm:p-14 lg:p-16 relative overflow-hidden text-center shadow-xl">
          {/* Subtle Background Radial Accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF4800]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="font-tech text-xs tracking-widest uppercase font-bold text-[#FF4800]">
              FOUR5 INSIDERS
            </span>

            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight leading-tight">
              BE PART OF THE NEXT MOVE.
            </h2>

            <p className="text-zinc-300 text-base sm:text-lg">
              Get first access to new drops, exclusive offers and FOUR5 updates.
            </p>

            {submitted ? (
              <div className="p-6 bg-zinc-900 border border-zinc-700 rounded-2xl max-w-md mx-auto space-y-2 animate-fadeIn">
                <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>YOU&apos;RE ON THE VIP LIST!</span>
                </div>
                <p className="text-xs text-zinc-400">
                  Use coupon code <span className="font-tech font-bold text-white bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700">FOUR5FIRST</span> for 10% off your first pair.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto pt-2"
              >
                <div className="relative w-full">
                  <Mail className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#FF4800] focus:ring-1 focus:ring-[#FF4800] transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 bg-[#FF4800] hover:bg-[#E03E00] text-white font-extrabold text-sm uppercase tracking-wider rounded-xl transition-all duration-200 cursor-pointer shrink-0 shadow-lg flex items-center justify-center gap-2"
                >
                  <span>JOIN FOUR5</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            <p className="text-xs text-zinc-500">
              Zero spam. Unsubscribe anytime. By subscribing, you agree to FOUR5 Terms & Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
