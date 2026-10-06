import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Truck,
  Sparkles,
  Camera,
  RotateCcw,
  Film,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Upload,
  Link,
  Sliders,
  Check,
  X,
  ExternalLink,
} from 'lucide-react';
import { BRAND_INFO, PRODUCTS_DATA } from '../data/products';
import { Product } from '../types';
import { saveVideoToStorage, loadVideoFromStorage } from '../utils/videoStorage';

interface HeroProps {
  onShopMen?: () => void;
  onShopWomen?: () => void;
  onShopNow?: () => void;
  onExploreNew?: () => void;
  onQuickView?: (product: Product) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onShopMen,
  onShopWomen,
  onShopNow,
  onExploreNew,
  onQuickView,
}) => {
  const heroProduct = PRODUCTS_DATA[0]; // FOUR5 Velocity Runner
  const [activeAngleIndex, setActiveAngleIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoInputUrl, setVideoInputUrl] = useState('');
  const [videoVibrancy, setVideoVibrancy] = useState<'cinematic' | 'vibrant' | 'subtle'>('cinematic');
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string | null>(null);

  // Background Video State: check IndexedDB, /hero-video.mp4, or YouTube fallback
  const [heroVideoUrl, setHeroVideoUrl] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('four5_hero_video_url');
      if (saved && !saved.includes('mixkit.co')) {
        return saved;
      }
      localStorage.removeItem('four5_hero_video_url');
    } catch {
      // ignore
    }
    return '/hero-video.mp4';
  });

  const [heroVideoError, setHeroVideoError] = useState(false);

  // Load user video from IndexedDB on startup
  useEffect(() => {
    loadVideoFromStorage().then((storedBlobUrl) => {
      if (storedBlobUrl) {
        setHeroVideoUrl(storedBlobUrl);
        setHeroVideoError(false);
      }
    });
  }, []);

  const [customHeroImage, setCustomHeroImage] = useState<string | null>(() => {
    try {
      const saved = localStorage.getItem('four5_custom_hero_image');
      if (saved && (saved.includes('shoe2.png') || saved.includes('shoe2.jpeg') || saved.includes('shoe2-clean.svg'))) {
        localStorage.removeItem('four5_custom_hero_image');
        return null;
      }
      return saved;
    } catch {
      return null;
    }
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const modalVideoInputRef = useRef<HTMLInputElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  const isYouTubeHero = heroVideoUrl.includes('youtube.com') || heroVideoUrl.includes('youtu.be');
  const getYouTubeEmbedUrl = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    const id = match ? match[1] : 'n2b2dJ_b24w';
    return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&modestbranding=1`;
  };

  useEffect(() => {
    if (heroVideoRef.current && !isYouTubeHero) {
      heroVideoRef.current.muted = isVideoMuted;
      if (isVideoPlaying) {
        heroVideoRef.current.play().catch(() => {
          // If browser policy blocks unmuted autoplay, ensure muted and retry
          if (heroVideoRef.current) {
            heroVideoRef.current.muted = true;
            setIsVideoMuted(true);
            heroVideoRef.current.play().catch(() => setIsVideoPlaying(false));
          }
        });
      } else {
        heroVideoRef.current.pause();
      }
    }
  }, [isVideoPlaying, heroVideoUrl, isYouTubeHero, isVideoMuted]);

  const toggleVideoPlay = () => {
    if (!heroVideoRef.current) return;
    if (isVideoPlaying) {
      heroVideoRef.current.pause();
      setIsVideoPlaying(false);
    } else {
      heroVideoRef.current.play().catch(() => {});
      setIsVideoPlaying(true);
    }
  };

  const toggleVideoMute = () => {
    if (!heroVideoRef.current) return;
    heroVideoRef.current.muted = !isVideoMuted;
    setIsVideoMuted(!isVideoMuted);
  };

  const handleCustomVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setHeroVideoUrl(url);
      setHeroVideoError(false);
      setIsVideoPlaying(true);
      setUploadSuccessMsg('व्हिडिओ यशस्वीरीत्या सेट झाला!');
      await saveVideoToStorage(file);
      setTimeout(() => {
        setUploadSuccessMsg(null);
        setIsVideoModalOpen(false);
      }, 1000);
    }
  };

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoInputUrl.trim()) return;
    const url = videoInputUrl.trim();
    setHeroVideoUrl(url);
    setHeroVideoError(false);
    setIsVideoPlaying(true);
    try {
      localStorage.setItem('four5_hero_video_url', url);
    } catch {
      // ignore
    }
    setUploadSuccessMsg('व्हिडिओ लिंक लागू झाली!');
    setTimeout(() => {
      setUploadSuccessMsg(null);
      setIsVideoModalOpen(false);
      setVideoInputUrl('');
    }, 900);
  };

  const handleResetVideo = () => {
    setHeroVideoUrl('/hero-video.mp4');
    setHeroVideoError(false);
    setIsVideoPlaying(true);
    try {
      localStorage.removeItem('four5_hero_video_url');
    } catch {
      // ignore
    }
    setIsVideoModalOpen(false);
  };

  const handleCustomImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setCustomHeroImage(result);
        try {
          localStorage.setItem('four5_custom_hero_image', result);
        } catch {
          // Ignore quota errors
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetImage = () => {
    setCustomHeroImage(null);
    try {
      localStorage.removeItem('four5_custom_hero_image');
    } catch {
      // Ignore
    }
  };

  const handleMenClick = () => {
    if (onShopMen) onShopMen();
    else if (onShopNow) onShopNow();
  };

  const handleWomenClick = () => {
    if (onShopWomen) onShopWomen();
    else if (onShopNow) onShopNow();
  };

  const handleInspectClick = () => {
    if (onQuickView) {
      onQuickView(heroProduct);
    } else if (onExploreNew) {
      onExploreNew();
    } else if (onShopNow) {
      onShopNow();
    }
  };

  const heroImages = [
    {
      label: 'Velocity Runner',
      url: customHeroImage || '/shoe2-clean.png',
    },
  ];

  // Dynamic overlay opacity for maximum background video clarity
  const overlayClass =
    videoVibrancy === 'vibrant'
      ? 'bg-gradient-to-r from-black/45 via-black/20 to-transparent'
      : videoVibrancy === 'subtle'
      ? 'bg-gradient-to-r from-black/75 via-black/50 to-black/25'
      : 'bg-gradient-to-r from-black/60 via-black/35 to-transparent';

  return (
    <section className="relative overflow-hidden min-h-[92vh] flex items-center bg-[#09090b] text-white pt-8 pb-16 lg:py-24">
      {/* 1. BACKGROUND LOOPING VIDEO LAYER */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {isYouTubeHero || heroVideoError ? (
          <iframe
            src={getYouTubeEmbedUrl(heroVideoUrl)}
            title="Hero Background Video"
            className="w-full h-full object-cover scale-150 pointer-events-none opacity-60"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        ) : (
          <video
            ref={heroVideoRef}
            key={heroVideoUrl}
            autoPlay
            loop
            muted={isVideoMuted}
            playsInline
            onError={() => {
              // Smooth fallback if custom url fails
              setHeroVideoError(true);
            }}
            className="w-full h-full object-cover opacity-90 scale-100 transition-opacity duration-700"
          >
            <source src={heroVideoUrl} type="video/mp4" />
            <source src="/hero-video.mp4" type="video/mp4" />
            <source src="/video.mp4" type="video/mp4" />
          </video>
        )}

        {/* Clear Translucent Overlays for High Background Video Visibility */}
        <div className={`absolute inset-0 ${overlayClass} z-10 transition-colors duration-500`} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/80 via-transparent to-black/30 z-10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF4800]/15 rounded-full blur-3xl pointer-events-none z-10" />
      </div>

      {/* 2. FOREGROUND CONTENT: All Home Page Text Layered on Top of Video */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Top Brand Tag with Live Motion beacon */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/20 backdrop-blur-md shadow-xl">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF4800] animate-ping" />
              <span className="font-tech text-xs tracking-wider uppercase font-black text-white drop-shadow">
                LIVE IT. WEAR IT. BE FOUR5. • INDIA
              </span>
            </div>

            {/* Brand Title & Hero Statement */}
            <div className="space-y-2 sm:space-y-3">
              <h2 className="font-tech text-xs sm:text-sm lg:text-base tracking-[0.2em] sm:tracking-[0.25em] text-[#FF4800] font-black uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                {BRAND_INFO.heroHeadline}
              </h2>
              <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-tighter leading-[0.95] uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                Step Into <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-orange-400">
                  Your Legacy.
                </span>
              </h1>
            </div>

            {/* Supporting Description */}
            <p className="text-zinc-200 text-sm sm:text-base lg:text-lg max-w-xl font-normal leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
              {BRAND_INFO.heroSupportingText} Engineered with responsive Kinetic-Foam™, breathable Jacquard mesh, and uncompromising Indian athletic ambition.
            </p>

            {/* Price indicator & launch badge */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 py-1 text-sm">
              <div className="bg-black/75 border border-zinc-700/80 backdrop-blur-md rounded-xl px-3 py-1 sm:px-3.5 sm:py-1.5 flex items-center gap-2 shadow-xl">
                <span className="text-[11px] sm:text-xs text-zinc-400 font-tech">STARTING AT</span>
                <span className="font-black text-white text-sm sm:text-base">₹1,499</span>
              </div>
              <div className="text-zinc-300 text-[11px] sm:text-xs flex items-center gap-1.5 font-medium drop-shadow">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Engineered in Chikhli, Maharashtra</span>
              </div>
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-row items-center gap-2.5 sm:gap-3.5 pt-2">
              <button
                type="button"
                onClick={handleMenClick}
                className="flex-1 sm:flex-initial group px-5 sm:px-7 py-3 sm:py-4 bg-[#FF4800] hover:bg-[#E03E00] text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase rounded-xl shadow-xl shadow-orange-950/80 flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer active:scale-98"
              >
                <span>SHOP MEN</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={handleWomenClick}
                className="flex-1 sm:flex-initial px-5 sm:px-7 py-3 sm:py-4 bg-black/60 hover:bg-black/80 border border-white/25 text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase rounded-xl backdrop-blur-md flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer active:scale-98 shadow-xl"
              >
                <span>SHOP WOMEN</span>
              </button>
            </div>

            {/* Value Props Row with glassmorphism */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-4 sm:pt-6 border-t border-white/15 text-left">
              <div className="space-y-0.5 sm:space-y-1 bg-black/40 p-2 sm:p-2.5 rounded-xl backdrop-blur-sm border border-white/5">
                <div className="flex items-center gap-1 sm:gap-1.5 text-[#FF4800]">
                  <Truck className="w-3.5 h-3.5 shrink-0" />
                  <span className="text-[10px] sm:text-xs font-bold text-white">FREE SHIPPING</span>
                </div>
                <p className="text-[9px] sm:text-[11px] text-zinc-300 leading-tight">Over ₹1,999</p>
              </div>

              <div className="space-y-0.5 sm:space-y-1 bg-black/40 p-2 sm:p-2.5 rounded-xl backdrop-blur-sm border border-white/5">
                <div className="flex items-center gap-1 sm:gap-1.5 text-[#FF4800]">
                  <Zap className="w-3.5 h-3.5 shrink-0" />
                  <span className="text-[10px] sm:text-xs font-bold text-white">KINETIC FOAM</span>
                </div>
                <p className="text-[9px] sm:text-[11px] text-zinc-300 leading-tight">Shock rebound</p>
              </div>

              <div className="space-y-0.5 sm:space-y-1 bg-black/40 p-2 sm:p-2.5 rounded-xl backdrop-blur-sm border border-white/5">
                <div className="flex items-center gap-1 sm:gap-1.5 text-[#FF4800]">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span className="text-[10px] sm:text-xs font-bold text-white">7-DAY RETURN</span>
                </div>
                <p className="text-[9px] sm:text-[11px] text-zinc-300 leading-tight">Easy exchange</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Sneaker Showcase with Floating Badges & Video Controls */}
          <div className="lg:col-span-6 relative flex flex-col items-center">
            {/* Visual Frame */}
            <div className="relative w-full aspect-square max-w-[320px] sm:max-w-[420px] lg:max-w-lg mx-auto flex items-center justify-center">
              
              {/* Subtle Backglow Accent */}
              <div className="absolute inset-4 rounded-full bg-[#FF4800]/15 blur-3xl pointer-events-none" />

              {/* Central Sneaker Image (with drop shadow & hover animation) */}
              <div className="relative z-10 w-full h-full flex items-center justify-center p-2 sm:p-4">
                <img
                  src={heroImages[activeAngleIndex].url}
                  alt="FOUR5 Velocity Runner - Hero Athletic Sneaker"
                  className="w-full h-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.95)] hover:scale-105 transition-transform duration-500 cursor-pointer"
                  onClick={handleInspectClick}
                />
              </div>
            </div>

            {/* Bottom Floating Bar: Sneaker Controls & Video Settings */}
            <div className="flex flex-wrap items-center justify-between w-full max-w-[320px] sm:max-w-[420px] lg:max-w-lg mt-3 sm:mt-4 px-1 sm:px-2 gap-2 sm:gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                {/* Upload Photo Button */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleCustomImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  title="Upload / Change Photo from your device"
                  className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-xl bg-black/70 hover:bg-zinc-800 text-amber-300 border border-white/10 transition-all cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">Photo</span>
                </button>

                {customHeroImage && (
                  <button
                    type="button"
                    onClick={handleResetImage}
                    title="Reset to default"
                    className="p-1.5 text-zinc-400 hover:text-white bg-black/70 border border-white/10 rounded-xl cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Background Video Quick Modal Button */}
                <input
                  type="file"
                  ref={videoInputRef}
                  onChange={handleCustomVideoUpload}
                  accept="video/mp4,video/webm,video/quicktime"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(true)}
                  title="होमपेज बॅकग्राउंड व्हिडिओ बदला / अपलोड करा (Change Background Video)"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-xl bg-gradient-to-r from-[#FF4800] to-amber-500 hover:opacity-95 text-white font-bold transition-all cursor-pointer shadow-md active:scale-95"
                >
                  <Film className="w-3.5 h-3.5" />
                  <span>व्हिडिओ सेटिंग</span>
                </button>

                {/* Video Play & Mute Controls */}
                {!isYouTubeHero && (
                  <div className="flex items-center gap-1 ml-1 bg-black/70 border border-white/15 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={toggleVideoPlay}
                      className="p-1 hover:text-[#FF4800] text-zinc-200 transition-colors cursor-pointer"
                      title={isVideoPlaying ? 'व्हिडिओ थांबवा (Pause Video)' : 'व्हिडिओ सुरू करा (Play Video)'}
                    >
                      {isVideoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      type="button"
                      onClick={toggleVideoMute}
                      className="p-1 hover:text-[#FF4800] text-zinc-200 transition-colors cursor-pointer"
                      title={isVideoMuted ? 'आवाज सुरू करा (Unmute)' : 'आवाज बंद करा (Mute)'}
                    >
                      {isVideoMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#FF4800]" />}
                    </button>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleInspectClick}
                className="text-xs font-bold text-zinc-200 hover:text-white underline underline-offset-4 decoration-[#FF4800] cursor-pointer"
              >
                Inspect Velocity Runner (₹2,999) &rarr;
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* 3. HERO BACKGROUND VIDEO MANAGER MODAL */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-zinc-950 text-white border border-zinc-800 rounded-3xl p-6 shadow-2xl max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#FF4800] flex items-center justify-center text-white">
                  <Film className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-black text-base uppercase">
                    होमपेज बॅकग्राउंड व्हिडिओ (Hero Background Video)
                  </h3>
                  <p className="text-[11px] text-zinc-400">
                    व्हिडिओ बॅकग्राउंडमध्ये लूपमध्ये प्ले होईल आणि त्यावर सर्व टेक्स्ट दिसेल.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {uploadSuccessMsg && (
              <div className="mt-4 p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-xs font-bold text-emerald-400 flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>{uploadSuccessMsg}</span>
              </div>
            )}

            {/* Option 1: Upload from Computer/Mobile */}
            <div className="mt-5 p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
              <h4 className="text-xs font-bold uppercase text-zinc-300 mb-1 flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5 text-[#FF4800]" />
                १. तुमच्या कॉम्प्युटर / मोबाईलवरून व्हिडिओ निवडा
              </h4>
              <p className="text-[11px] text-zinc-400 mb-3">
                तुमच्याकडे असलेली MP4, WebM किंवा MOV फाईल थेट निवडा. ती बॅकग्राउंडमध्ये लूप प्ले होईल.
              </p>

              <input
                ref={modalVideoInputRef}
                type="file"
                accept="video/mp4,video/webm,video/quicktime"
                onChange={handleCustomVideoUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => modalVideoInputRef.current?.click()}
                className="w-full py-3 bg-[#FF4800] hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md"
              >
                <Upload className="w-4 h-4" />
                <span>व्हिडिओ फाईल अपलोड करा (Upload Video File)</span>
              </button>
            </div>

            {/* Option 2: Enter URL or YouTube */}
            <form onSubmit={handleApplyUrl} className="mt-4 p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
              <h4 className="text-xs font-bold uppercase text-zinc-300 mb-1 flex items-center gap-1.5">
                <Link className="w-3.5 h-3.5 text-amber-400" />
                २. व्हिडिओ लिंक किंवा YouTube URL टाका
              </h4>
              <p className="text-[11px] text-zinc-400 mb-3">
                कोणतीही ऑनलाइन व्हिडिओ लिंक किंवा YouTube URL टाका.
              </p>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={videoInputUrl}
                  onChange={(e) => setVideoInputUrl(e.target.value)}
                  placeholder="उदा. /hero-video.mp4 किंवा YouTube URL"
                  className="flex-1 px-3 py-2 bg-black border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#FF4800]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-zinc-800 hover:bg-[#FF4800] text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  लागू करा
                </button>
              </div>
            </form>

            {/* Option 3: Video Vibrancy / Overlay Contrast Adjustment */}
            <div className="mt-4 p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
              <h4 className="text-xs font-bold uppercase text-zinc-300 mb-1 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-orange-400" />
                ३. व्हिडिओची दृश्यमानता (Visibility / Dark Overlay)
              </h4>
              <p className="text-[11px] text-zinc-400 mb-3">
                व्हिडिओ किती ठळक किंवा डार्क दिसावा ते निवडा:
              </p>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setVideoVibrancy('vibrant')}
                  className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
                    videoVibrancy === 'vibrant'
                      ? 'bg-[#FF4800] text-white border-[#FF4800]'
                      : 'bg-black/60 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  ठळक (Vibrant)
                </button>
                <button
                  type="button"
                  onClick={() => setVideoVibrancy('cinematic')}
                  className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
                    videoVibrancy === 'cinematic'
                      ? 'bg-[#FF4800] text-white border-[#FF4800]'
                      : 'bg-black/60 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  सिनेमॅटिक (Cinematic)
                </button>
                <button
                  type="button"
                  onClick={() => setVideoVibrancy('subtle')}
                  className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
                    videoVibrancy === 'subtle'
                      ? 'bg-[#FF4800] text-white border-[#FF4800]'
                      : 'bg-black/60 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  गंभीर (Subtle)
                </button>
              </div>
            </div>

            {/* Developer tip for VS Code */}
            <div className="mt-4 p-3 bg-zinc-900/60 rounded-xl border border-zinc-800/80 text-[11px] text-zinc-400">
              <span className="font-bold text-amber-300 block mb-1">💡 VS Code मधील कायमस्वरूपी पद्धत:</span>
              तुमच्या <code className="text-white bg-black px-1 py-0.5 rounded">four5-shoes/public/</code> फोल्डरमध्ये तुमच्या व्हिडिओचे नाव <code className="text-[#FF4800] bg-black px-1 py-0.5 rounded">hero-video.mp4</code> असे सेव्ह करा. तो आपोआप वेबसाईटवर कायम दिसेल!
            </div>

            {/* Modal Footer */}
            <div className="mt-5 pt-3 border-t border-zinc-800 flex justify-between items-center">
              <button
                type="button"
                onClick={handleResetVideo}
                className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>मूळ व्हिडिओवर रिसेट करा</span>
              </button>

              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                पूर्ण झाले (Done)
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
