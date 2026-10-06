import React, { useState, useEffect } from 'react';
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ArrowRight,
  Phone,
  Sparkles,
  Globe,
  Camera,
} from 'lucide-react';
import { ActiveView } from '../types';
import { BRAND_INFO } from '../data/products';

interface NavbarProps {
  currentView: ActiveView;
  currentGender?: string;
  currentCategory?: string;
  onNavigate: (view: ActiveView, categoryFilter?: string, genderFilter?: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  onOpenChat?: () => void;
  onOpenTrendRadar?: () => void;
  onOpenImageManager?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  currentGender,
  currentCategory,
  onNavigate,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenAccount,
  onOpenChat,
  onOpenTrendRadar,
  onOpenImageManager,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', view: 'home' as ActiveView },
    { label: 'Shop', view: 'shop' as ActiveView },
    { label: 'Men', view: 'shop' as ActiveView, gender: 'Men' },
    { label: 'Women', view: 'shop' as ActiveView, gender: 'Women' },
    { label: 'New Arrivals', view: 'shop' as ActiveView, filter: 'new-arrivals' },
    { label: 'About FOUR5', view: 'about' as ActiveView },
    { label: 'Contact', view: 'contact' as ActiveView },
  ];

  const checkIsActive = (item: (typeof navItems)[0]) => {
    if (currentView !== item.view) return false;
    if (item.view === 'shop') {
      if (item.gender) {
        return currentGender?.toLowerCase() === item.gender.toLowerCase();
      }
      if (item.filter === 'new-arrivals') {
        return currentCategory === 'new-arrivals';
      }
      return !currentGender && !currentCategory;
    }
    return true;
  };

  return (
    <>
      <nav
        aria-label="Main Navigation"
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'shadow-sm border-b border-zinc-200/80 py-3.5'
            : 'border-b border-zinc-200/50 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Menu Toggle & Brand Logo Left */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 -ml-2 text-zinc-900 hover:text-[#FF4800] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* FOUR5 Brand Wordmark */}
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="group flex items-center gap-1.5 text-left cursor-pointer focus:outline-none"
            >
              <div className="flex items-center">
                <span className="font-display font-black text-2xl sm:text-3xl tracking-tighter text-zinc-950 group-hover:text-[#0F0F11] transition-colors">
                  FOUR
                </span>
                <span className="font-display font-black text-2xl sm:text-3xl tracking-tighter text-[#FF4800] group-hover:scale-105 transition-transform duration-200">
                  5
                </span>
              </div>
              <div className="hidden sm:flex flex-col ml-1 border-l border-zinc-300 pl-2 leading-none">
                <span className="font-tech text-[9px] font-bold tracking-widest text-zinc-900 uppercase">
                  SHOES
                </span>
                <span className="text-[7.5px] font-semibold tracking-wider text-[#FF4800] uppercase">
                  INDIA
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = checkIsActive(item);

              return (
                <button
                  type="button"
                  key={item.label}
                  onClick={() => {
                    onNavigate(item.view, item.filter, item.gender);
                  }}
                  className={`px-3.5 py-2 text-sm font-semibold tracking-wide rounded-md transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'text-[#FF4800] bg-orange-50/70 font-bold'
                      : 'text-zinc-800 hover:text-zinc-950 hover:bg-zinc-100/70'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Trend Radar Button */}
            {onOpenTrendRadar && (
              <button
                type="button"
                onClick={onOpenTrendRadar}
                className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 transition-all text-xs font-bold cursor-pointer shadow-xs group"
                aria-label="Footwear Trend Radar"
                title="Live Footwear Trend Radar (Google Search Grounded)"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-400 group-hover:rotate-45 transition-transform" />
                <span>Trend Radar</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </button>
            )}

            {/* Photo Manager Button */}
            {onOpenImageManager && (
              <button
                type="button"
                onClick={onOpenImageManager}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 hover:bg-[#FF4800] text-white transition-all text-xs font-bold cursor-pointer shadow-xs group"
                aria-label="Manage Shoe Photos"
                title="फोटो मॅनेजर - वेबसाइटवरील शूजचे फोटो बदला"
              >
                <Camera className="w-3.5 h-3.5 text-amber-300 group-hover:text-white transition-colors" />
                <span className="hidden sm:inline">फोटो बदला</span>
                <span className="sm:hidden">फोटो</span>
              </button>
            )}

            {/* AI Stylist Button */}
            {onOpenChat && (
              <button
                type="button"
                onClick={onOpenChat}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 text-zinc-900 border border-orange-200/90 transition-all text-xs font-bold cursor-pointer shadow-xs group"
                aria-label="AI Shoe Stylist"
                title="Chat with FOUR5 AI Stylist (Gemini)"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FF4800] group-hover:rotate-12 transition-transform" />
                <span>AI Stylist</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </button>
            )}

            {/* Search */}
            <button
              type="button"
              onClick={onOpenSearch}
              className="p-2 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 rounded-full transition-colors cursor-pointer"
              aria-label="Search products"
              title="Search products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Customer Account */}
            <button
              type="button"
              onClick={onOpenAccount}
              className="p-2 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 rounded-full transition-colors cursor-pointer hidden sm:flex"
              aria-label="Account profile"
              title="Account"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button
              type="button"
              onClick={onOpenWishlist}
              className="p-2 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 rounded-full transition-colors relative cursor-pointer"
              aria-label="Wishlist"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-zinc-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-white">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Bag */}
            <button
              type="button"
              onClick={onOpenCart}
              className="p-2 text-zinc-900 hover:text-[#FF4800] hover:bg-orange-50 rounded-full transition-colors relative cursor-pointer"
              aria-label="Shopping Cart"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#FF4800] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-full max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
            {/* Header */}
            <div className="p-4 border-b border-zinc-200 flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-display font-black text-2xl tracking-tighter text-zinc-950">
                  FOUR
                </span>
                <span className="font-display font-black text-2xl tracking-tighter text-[#FF4800]">
                  5
                </span>
                <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase ml-2">
                  SHOES
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-zinc-500 hover:text-zinc-950 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tagline pill */}
            <div className="px-4 py-2.5 bg-zinc-900 text-white text-xs font-semibold flex items-center justify-between">
              <span>{BRAND_INFO.tagline}</span>
              <span className="text-[#FF4800] text-[11px] font-tech font-bold">CHIKHLI, MH</span>
            </div>

            {/* Navigation links */}
            <div className="p-4 space-y-1 flex-1">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate(item.view, item.filter, item.gender);
                  }}
                  className="w-full text-left px-3 py-3 rounded-lg text-base font-bold text-zinc-900 hover:bg-orange-50 hover:text-[#FF4800] flex items-center justify-between transition-colors"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-4 h-4 text-zinc-400" />
                </button>
              ))}

              <div className="pt-4 mt-4 border-t border-zinc-200 space-y-2">
                {onOpenImageManager && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenImageManager();
                    }}
                    className="w-full text-left px-3 py-2.5 text-sm font-bold text-white bg-zinc-900 hover:bg-[#FF4800] rounded-lg flex items-center justify-between transition-colors shadow-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <Camera className="w-4 h-4 text-amber-300" />
                      <span>📸 शूज फोटो मॅनेजर (Change Photos)</span>
                    </div>
                    <span className="text-[10px] bg-[#FF4800] text-white px-2 py-0.5 rounded-full font-bold">
                      Admin
                    </span>
                  </button>
                )}
                {onOpenTrendRadar && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenTrendRadar();
                    }}
                    className="w-full text-left px-3 py-2.5 text-sm font-bold text-zinc-900 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 rounded-lg flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <Globe className="w-4 h-4 text-emerald-600" />
                      <span>Live Trend Radar</span>
                    </div>
                    <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold">
                      LIVE
                    </span>
                  </button>
                )}
                {onOpenChat && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenChat();
                    }}
                    className="w-full text-left px-3 py-2.5 text-sm font-bold text-zinc-950 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-lg flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <Sparkles className="w-4 h-4 text-[#FF4800]" />
                      <span>FOUR5 AI Stylist</span>
                    </div>
                    <span className="text-[10px] bg-[#FF4800] text-white px-2 py-0.5 rounded-full font-bold">
                      Gemini
                    </span>
                  </button>
                )}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAccount();
                  }}
                  className="w-full text-left px-3 py-2.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 rounded-lg flex items-center gap-2.5"
                >
                  <User className="w-4 h-4 text-[#FF4800]" />
                  <span>My Account & Orders</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenWishlist();
                  }}
                  className="w-full text-left px-3 py-2.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 rounded-lg flex items-center gap-2.5"
                >
                  <Heart className="w-4 h-4 text-[#FF4800]" />
                  <span>Wishlist ({wishlistCount})</span>
                </button>
              </div>
            </div>

            {/* Bottom Support */}
            <div className="p-4 bg-zinc-50 border-t border-zinc-200 text-xs text-zinc-600 space-y-2">
              <div className="flex items-center gap-2 font-medium">
                <Phone className="w-3.5 h-3.5 text-[#FF4800]" />
                <span>Call: {BRAND_INFO.phoneDisplay}</span>
              </div>
              <div className="text-[11px] text-zinc-500">
                Chikhli, Buldhana, Maharashtra, India
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
