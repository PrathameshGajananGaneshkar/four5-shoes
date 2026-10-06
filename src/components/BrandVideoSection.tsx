import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Upload,
  Link,
  Film,
  Sparkles,
  RotateCcw,
  Check,
  X,
} from 'lucide-react';
import { BRAND_INFO } from '../data/products';

const DEFAULT_SNEAKER_VIDEOS = [
  {
    title: 'Brand 45 Official Motion Reel',
    url: '/hero-video.mp4',
    category: 'Official 45 Shoes Reel',
  },
  {
    title: 'Kinetic Track Sprint (Track Running)',
    url: 'https://www.youtube.com/embed/n2b2dJ_b24w',
    category: 'Running & Marathon',
  },
  {
    title: 'Urban Lace-Up & Street Moves',
    url: 'https://www.youtube.com/embed/fA8M3h7bYw0',
    category: 'Lifestyle & Streetwear',
  },
];

interface BrandVideoSectionProps {
  onExploreShop?: () => void;
}

export const BrandVideoSection: React.FC<BrandVideoSectionProps> = ({ onExploreShop }) => {
  const [videoUrl, setVideoUrl] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('four5_brand_video_url');
      if (saved && !saved.includes('mixkit.co')) {
        return saved;
      }
      localStorage.removeItem('four5_brand_video_url');
    } catch {
      // ignore
    }
    return DEFAULT_SNEAKER_VIDEOS[0].url;
  });

  const [hasVideoError, setHasVideoError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {
          setIsPlaying(false);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, videoUrl]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      setIsPlaying(true);
      setFeedbackMsg('व्हिडिओ यशस्वीरीत्या अपलोड झाला!');
      try {
        localStorage.setItem('four5_brand_video_url', url);
      } catch {
        // blob url in storage
      }
      setTimeout(() => {
        setIsModalOpen(false);
        setFeedbackMsg(null);
      }, 900);
    }
  };

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;
    let finalUrl = inputUrl.trim();
    setVideoUrl(finalUrl);
    setIsPlaying(true);
    try {
      localStorage.setItem('four5_brand_video_url', finalUrl);
    } catch {
      // ignore
    }
    setFeedbackMsg('नवीन व्हिडिओ लिंक सेव्ह झाली!');
    setTimeout(() => {
      setIsModalOpen(false);
      setFeedbackMsg(null);
      setInputUrl('');
    }, 900);
  };

  const handleSelectPreset = (url: string) => {
    setVideoUrl(url);
    setIsPlaying(true);
    try {
      localStorage.setItem('four5_brand_video_url', url);
    } catch {
      // ignore
    }
    setFeedbackMsg('सॅम्पल व्हिडिओ लागू झाला!');
    setTimeout(() => {
      setIsModalOpen(false);
      setFeedbackMsg(null);
    }, 700);
  };

  const handleResetDefault = () => {
    const def = DEFAULT_SNEAKER_VIDEOS[0].url;
    setVideoUrl(def);
    try {
      localStorage.removeItem('four5_brand_video_url');
    } catch {
      // ignore
    }
    setIsModalOpen(false);
  };

  // Detect if YouTube url
  const isYouTube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');
  const getYouTubeEmbedUrl = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1&loop=1&playlist=${match[1]}` : url;
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF4800] animate-ping" />
            <span className="text-xs font-tech font-bold uppercase tracking-widest text-[#FF4800]">
              CINEMATIC MOTION REEL
            </span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight uppercase">
            THE NEXT MOVE <span className="text-[#FF4800]">IN ACTION</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
            कठीण रस्त्यांवर, मॅरेथॉन ट्रॅकवर आणि जिममध्ये 45 Shoes ची उच्च दर्जाची ऊर्जा आणि आराम पहा.
          </p>
        </div>

        {/* Change Video Button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 bg-zinc-900/90 hover:bg-[#FF4800] text-white border border-zinc-700 hover:border-[#FF4800] text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-lg active:scale-95 group"
            title="होमपेजवरील व्हिडिओ बदला (Change Video)"
          >
            <Film className="w-4 h-4 text-amber-300 group-hover:text-white transition-colors" />
            <span>व्हिडिओ बदला (Change Video)</span>
          </button>
        </div>
      </div>

      {/* Video Container Box */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] max-h-[580px] rounded-3xl overflow-hidden bg-black border border-zinc-800 shadow-2xl group">
        {/* Subtle Decorative Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10 pointer-events-none" />

        {isYouTube || hasVideoError ? (
          <iframe
            src={getYouTubeEmbedUrl(videoUrl)}
            title="FOUR5 Brand Video"
            className="w-full h-full object-cover"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            ref={videoRef}
            src={videoUrl}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onError={() => setHasVideoError(true)}
            className="w-full h-full object-cover"
            onClick={togglePlay}
          />
        )}

        {/* Floating Overlay Badge: Live Tech */}
        <div className="absolute top-4 left-4 z-20 hidden sm:flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-white text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-[#FF4800]" />
          <span>FOUR5 Kinetic-Foam™ in Motion</span>
        </div>

        {/* Overlay Video Controls (Bottom Bar) */}
        {!isYouTube && (
          <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-black/70 hover:bg-[#FF4800] backdrop-blur-md flex items-center justify-center transition-all cursor-pointer border border-white/20 active:scale-90"
                aria-label={isPlaying ? 'Pause' : 'Play'}
                title={isPlaying ? 'Pause Video' : 'Play Video'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 translate-x-0.5" />}
              </button>

              <button
                type="button"
                onClick={toggleMute}
                className="w-10 h-10 rounded-full bg-black/70 hover:bg-zinc-800 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer border border-white/20 active:scale-90"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
                title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-zinc-400" /> : <Volume2 className="w-4 h-4 text-white" />}
              </button>
            </div>

            <div className="flex items-center gap-2">
              {onExploreShop && (
                <button
                  type="button"
                  onClick={onExploreShop}
                  className="px-4 py-2 rounded-full bg-[#FF4800] hover:bg-orange-600 text-white text-xs font-bold transition-all cursor-pointer shadow-md active:scale-95"
                >
                  Shop This Drop &rarr;
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Video Manager Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-zinc-950 text-white border border-zinc-800 rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#FF4800] flex items-center justify-center text-white">
                  <Film className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-black text-base uppercase">
                    होमपेज व्हिडिओ बदला (Change Video)
                  </h3>
                  <p className="text-[11px] text-zinc-400">
                    तुमच्या कॉम्प्युटरवरून किंवा लिंकद्वारे व्हिडिओ सेट करा
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {feedbackMsg && (
              <div className="mt-4 p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-xs font-bold text-emerald-400 flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>{feedbackMsg}</span>
              </div>
            )}

            {/* Option 1: Upload from Computer */}
            <div className="mt-5 p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
              <h4 className="text-xs font-bold uppercase text-zinc-300 mb-1 flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5 text-[#FF4800]" />
                १. कॉम्प्युटर / मोबाईलवरून व्हिडिओ अपलोड करा
              </h4>
              <p className="text-[11px] text-zinc-400 mb-3">
                तुमच्याकडे असलेला कोणताही MP4, WebM किंवा शॉर्ट्स व्हिडिओ निवडा.
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept="video/mp4,video/webm,video/quicktime"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3 bg-[#FF4800] hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md"
              >
                <Upload className="w-4 h-4" />
                <span>व्हिडिओ फाईल निवडा (Select Video File)</span>
              </button>
            </div>

            {/* Option 2: Enter Video URL / YouTube Link */}
            <form onSubmit={handleApplyUrl} className="mt-4 p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
              <h4 className="text-xs font-bold uppercase text-zinc-300 mb-1 flex items-center gap-1.5">
                <Link className="w-3.5 h-3.5 text-amber-400" />
                २. व्हिडिओ लिंक किंवा YouTube URL टाका
              </h4>
              <p className="text-[11px] text-zinc-400 mb-3">
                कोणतीही थेट MP4 व्हिडिओ लिंक किंवा YouTube लिंक पेस्ट करा.
              </p>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="https://... किंवा YouTube लिंक"
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

            {/* Option 3: Presets */}
            <div className="mt-4 p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
              <h4 className="text-xs font-bold uppercase text-zinc-300 mb-2">
                ३. तयार सॅम्पल व्हिडिओ निवडा:
              </h4>
              <div className="space-y-2">
                {DEFAULT_SNEAKER_VIDEOS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectPreset(preset.url)}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between text-xs transition-all cursor-pointer ${
                      videoUrl === preset.url
                        ? 'bg-[#FF4800]/20 border-[#FF4800] text-white font-bold'
                        : 'bg-black/60 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-white">{preset.title}</div>
                      <div className="text-[10px] text-zinc-400">{preset.category}</div>
                    </div>
                    {videoUrl === preset.url && (
                      <span className="text-[10px] bg-[#FF4800] text-white px-2 py-0.5 rounded font-bold">
                        निवडलेला
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset Button */}
            <div className="mt-4 pt-3 border-t border-zinc-800 flex justify-between items-center">
              <button
                type="button"
                onClick={handleResetDefault}
                className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>डीफॉल्ट व्हिडिओवर रिसेट करा</span>
              </button>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                बंद करा
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
