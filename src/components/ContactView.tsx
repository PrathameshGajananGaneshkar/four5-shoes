import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  Send,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { BRAND_INFO } from '../data/products';

interface ContactViewProps {
  onNavigateHome?: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigateHome }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Product Inquiry / Sizing');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  const whatsappUrl = `https://wa.me/${BRAND_INFO.whatsapp}?text=${encodeURIComponent(
    BRAND_INFO.whatsappDefaultMsg
  )}`;

  const faqs = [
    {
      q: 'How long does delivery take across India?',
      a: 'We dispatch all orders within 24 hours from Chikhli, Maharashtra. Delivery typically takes 2–4 business days for metro areas and 3–6 days for regional destinations.',
    },
    {
      q: 'What is your size exchange and return policy?',
      a: 'We offer a hassle-free 7-day replacement or exchange policy on all unworn footwear in original packaging. If you ordered the wrong size, we will pick it up and deliver your correct size.',
    },
    {
      q: 'How can I track my order?',
      a: 'Once your order is processed, you will receive a tracking link via SMS, Email, and WhatsApp containing real-time courier updates (BlueDart / Delhivery / DTDC).',
    },
    {
      q: 'Do you accept Cash on Delivery (COD)?',
      a: 'Yes, Cash on Delivery is available across 19,000+ PIN codes in India. We also accept instant UPI, cards, and net banking.',
    },
  ];

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

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="font-tech text-xs tracking-widest text-[#FF4800] uppercase font-bold">
            GET IN TOUCH
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-zinc-950 uppercase tracking-tight">
            We&apos;re Here To Help You Move Forward.
          </h1>
          <p className="text-zinc-600 text-sm sm:text-base">
            Have questions about product sizing, order status, bulk inquiries, or brand collaborations? Reach out directly to our headquarters in Chikhli.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Call */}
          <a
            href={`tel:${BRAND_INFO.phone}`}
            className="p-6 bg-white rounded-2xl border border-zinc-200 hover:border-[#FF4800] transition-all group shadow-xs cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#FF4800] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Phone className="w-5 h-5" />
            </div>
            <span className="text-xs font-tech font-bold uppercase tracking-wider text-zinc-400">
              DIRECT CALL
            </span>
            <h3 className="font-display font-bold text-lg text-zinc-950 mt-1">
              {BRAND_INFO.phoneDisplay}
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Mon to Sat: 9:00 AM – 8:00 PM IST
            </p>
          </a>

          {/* Card 2: WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="p-6 bg-white rounded-2xl border border-zinc-200 hover:border-emerald-500 transition-all group shadow-xs cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-5 h-5" />
            </div>
            <span className="text-xs font-tech font-bold uppercase tracking-wider text-zinc-400">
              INSTANT CHAT
            </span>
            <h3 className="font-display font-bold text-lg text-zinc-950 mt-1">
              WhatsApp Support
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              {BRAND_INFO.whatsappDisplay} (Fast Response)
            </p>
          </a>

          {/* Card 3: Email */}
          <a
            href={`mailto:${BRAND_INFO.email}`}
            className="p-6 bg-white rounded-2xl border border-zinc-200 hover:border-[#FF4800] transition-all group shadow-xs cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#FF4800] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
            <span className="text-xs font-tech font-bold uppercase tracking-wider text-zinc-400">
              EMAIL US
            </span>
            <h3 className="font-display font-bold text-lg text-zinc-950 mt-1 truncate">
              {BRAND_INFO.email}
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              24-hour response guarantee
            </p>
          </a>

          {/* Card 4: Location */}
          <div className="p-6 bg-white rounded-2xl border border-zinc-200 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#FF4800] flex items-center justify-center mb-4">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="text-xs font-tech font-bold uppercase tracking-wider text-zinc-400">
              HEADQUARTERS
            </span>
            <h3 className="font-display font-bold text-lg text-zinc-950 mt-1">
              Chikhli, Maharashtra
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Buldhana District, Maharashtra, India
            </p>
          </div>
        </div>

        {/* Contact Form & Office Hours */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-zinc-200 shadow-sm">
            <h3 className="font-display font-black text-2xl uppercase tracking-tight text-zinc-950 mb-6">
              Send Us A Message
            </h3>

            {submitted ? (
              <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-lg text-emerald-900 uppercase">
                  Message Sent Successfully!
                </h4>
                <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                  Thank you, <strong>{name}</strong>. A FOUR5 customer executive will respond to {email} within 4 to 6 business hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setPhone('');
                    setMessage('');
                  }}
                  className="mt-4 px-6 py-2 bg-emerald-700 text-white text-xs font-bold uppercase rounded-xl"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-zinc-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Aarav Sharma"
                      className="w-full px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:border-[#FF4800]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-zinc-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. name@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:border-[#FF4800]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-zinc-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:border-[#FF4800]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-zinc-700 mb-1">Inquiry Topic</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:border-[#FF4800] bg-white cursor-pointer"
                    >
                      <option value="Product Sizing & Fit">Product Sizing & Fit</option>
                      <option value="Order Tracking / Delivery">Order Tracking / Delivery</option>
                      <option value="Exchange & Return Request">Exchange & Return Request</option>
                      <option value="Bulk / Retail Distribution">Bulk / Retail Distribution</option>
                      <option value="Brand Partnership">Brand Partnership</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Your Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you need help with..."
                    className="w-full px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:border-[#FF4800]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 bg-[#0F0F11] hover:bg-[#FF4800] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-[#FF4800]" />
                  <span>Submit Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Info & WhatsApp Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* WhatsApp VIP Card */}
            <div className="bg-[#0F0F11] text-white rounded-3xl p-8 border border-zinc-800 relative overflow-hidden space-y-4">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-tech text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  CUSTOMER DESK LIVE NOW
                </span>
              </div>

              <h4 className="font-display font-black text-2xl uppercase">
                Chat Directly on WhatsApp
              </h4>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Need quick confirmation on sizes, delivery timelines for your PIN code, or instant order assistance? Chat directly with our Chikhli support squad.
              </p>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Open WhatsApp (+91 86687 20597)</span>
              </a>
            </div>

            {/* Operating Hours */}
            <div className="bg-white rounded-3xl p-6 border border-zinc-200 space-y-3">
              <h4 className="font-display font-bold text-base uppercase text-zinc-950 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#FF4800]" />
                <span>Operating Timings</span>
              </h4>
              <ul className="text-xs text-zinc-600 space-y-1.5">
                <li className="flex justify-between py-1 border-b border-zinc-100">
                  <span>Monday – Friday</span>
                  <strong className="text-zinc-900">9:00 AM – 8:00 PM IST</strong>
                </li>
                <li className="flex justify-between py-1 border-b border-zinc-100">
                  <span>Saturday</span>
                  <strong className="text-zinc-900">10:00 AM – 6:00 PM IST</strong>
                </li>
                <li className="flex justify-between py-1">
                  <span>Sunday</span>
                  <span className="text-zinc-500">WhatsApp Dispatch Only</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* FAQs Section */}
        <div className="pt-8 border-t border-zinc-200">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="font-tech text-xs tracking-widest text-[#FF4800] uppercase font-bold">
              KNOWLEDGE BASE
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl uppercase text-zinc-950">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 bg-white rounded-2xl border border-zinc-200 space-y-2"
              >
                <h4 className="font-display font-bold text-sm uppercase text-zinc-950 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-[#FF4800] shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
