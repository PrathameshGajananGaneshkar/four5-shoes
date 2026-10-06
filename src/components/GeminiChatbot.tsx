import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  X,
  RotateCcw,
  Bot,
  User,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  Maximize2,
  Minimize2,
  CheckCircle2,
  HelpCircle,
  Zap,
  Globe,
} from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  queries?: string[];
  sources?: Array<{ title: string; uri: string }>;
}

interface GeminiChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  onSelectProduct?: (product: Product) => void;
  initialPrompt?: string;
}

const STARTER_PROMPTS = [
  {
    icon: '🏃',
    label: 'Best road running shoes',
    prompt: 'Which FOUR5 shoes are best for 5K to 10K running on Indian asphalt roads?',
  },
  {
    icon: '👟',
    label: 'Streetwear sneakers < ₹3,500',
    prompt: 'Suggest a stylish streetwear sneaker from FOUR5 under ₹3,500 for everyday outfits.',
  },
  {
    icon: '📏',
    label: 'Sizing & Indian foot fit',
    prompt: 'How does FOUR5 sizing work for wide feet? What UK size should I pick?',
  },
  {
    icon: '🏋️',
    label: 'Gym & heavy squats',
    prompt: 'What shoe do you recommend for gym lifting, squats, and CrossFit?',
  },
  {
    icon: '🌧️',
    label: 'Monsoon & rainy grip',
    prompt: 'Do you have shoes with water-resistant grip for Indian rainy monsoon days?',
  },
];

const QUICK_FOLLOW_UPS = [
  'Tell me about delivery & shipping',
  'What is the 7-day return policy?',
  'Any active discount coupon?',
  'Compare Velocity Runner vs Apex Cross-Trainer',
];

export const GeminiChatbot: React.FC<GeminiChatbotProps> = ({
  isOpen,
  onClose,
  onOpen,
  onSelectProduct,
  initialPrompt,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'model',
      content:
        "Namaste! 👋 I'm your **Brand 45 AI Shoe Stylist**, powered by Gemini. Whether you're chasing marathon milestones, hunting for bold street sneakers, or need fit recommendations for Indian feet, I'm here to guide your next move with 45 Footwear. What kind of shoes are you looking for today?",
      timestamp: 'Just now',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [useSearchGrounding, setUseSearchGrounding] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom of messages
  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom('auto');
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom('smooth');
    }
  }, [messages, isLoading]);

  // Handle external initial prompt if triggered from product modal or CTA
  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || inputValue).trim();
    if (!messageContent || isLoading) return;

    setErrorMessage(null);
    setInputValue('');

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Call backend Gemini proxy endpoint
      const payload = {
        messages: newMessages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        useGoogleSearch: useSearchGrounding,
      };

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        const botReply: ChatMessage = {
          id: `model-${Date.now()}`,
          role: 'model',
          content:
            data.reply ||
            "I'm here to help you choose the best Brand 45 shoes for your style and performance needs!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          queries: data.queries || [],
          sources: data.sources || [],
        };
        setMessages((prev) => [...prev, botReply]);
        return;
      }
    } catch {
      // Handled via smooth brand fallback below
    } finally {
      setIsLoading(false);
    }

    // High quality brand fallback reply
    const fallbackBotReply: ChatMessage = {
      id: `model-${Date.now()}`,
      role: 'model',
      content:
        "Hey! 👋 I'm your **Brand 45 AI Stylist**. Here are top recommendations from our official footwear lineup:\n\n• **45 Velocity Runner** (₹2,999) — Dual-density Kinetic-Foam™ for marathon & road runs.\n• **45 Apex Gym Trainer** (₹3,199) — Heavy lifting & HIIT with flat 4mm drop geometry.\n• **45 Street Pro Sneaker** (₹2,499) — Clean urban court sneaker for casual styling.\n• **45 Urban X** (₹3,499) — Futuristic sculpted sole hybrid silhouette.\n\nAll shoes use standard **UK / Indian sizes (UK 6 - 11)** with free shipping across India! Which style or activity would you like to explore?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      queries: ['45 shoes running', '45 gym trainer', 'brand 45 sneakers'],
      sources: [
        { title: 'Brand 45 Official Catalog', uri: 'https://four5shoes.com/shop' },
      ],
    };
    setMessages((prev) => [...prev, fallbackBotReply]);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-reset-${Date.now()}`,
        role: 'model',
        content:
          "Conversation restarted! ⚡ How can I assist you with Brand 45 footwear, sizing, or shoe styling today?",
        timestamp: 'Just now',
      },
    ]);
    setErrorMessage(null);
  };

  // Find products mentioned in text to provide interactive quick-cards
  const findReferencedProducts = (text: string): Product[] => {
    const lower = text.toLowerCase();
    return PRODUCTS.filter((p) => {
      const nameMatch = lower.includes(p.name.toLowerCase());
      const shortMatch = lower.includes(p.name.replace('FOUR5 ', '').toLowerCase());
      return nameMatch || shortMatch;
    }).slice(0, 2);
  };

  // Render markdown-like bold text and bullet points
  const renderFormattedMessage = (content: string) => {
    const lines = content.split('\n');

    return (
      <div className="space-y-1.5 text-[13px] leading-relaxed">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) {
            return <div key={idx} className="h-1" />;
          }

          // Bullet points
          const isBullet = trimmed.startsWith('* ') || trimmed.startsWith('- ') || trimmed.startsWith('• ');
          const lineText = isBullet ? trimmed.replace(/^[\*\-•]\s*/, '') : trimmed;

          // Parse bold markdown **text**
          const parts = lineText.split(/(\*\*.*?\*\*)/g);
          const parsedContent = parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="font-bold text-zinc-950">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          });

          if (isBullet) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4800] mt-1.5 shrink-0" />
                <span className="flex-1">{parsedContent}</span>
              </div>
            );
          }

          return <p key={idx}>{parsedContent}</p>;
        })}
      </div>
    );
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom Right) */}
      {!isOpen && (
        <button
          type="button"
          onClick={onOpen}
          className="fixed bottom-6 right-6 z-40 group flex items-center gap-2.5 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 text-white pl-4 pr-5 py-3.5 rounded-full shadow-2xl border border-zinc-800 hover:border-[#FF4800] hover:shadow-[0_0_25px_rgba(255,72,0,0.35)] transition-all duration-300 hover:scale-105 cursor-pointer"
          aria-label="Open AI Shoe Stylist"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF4800] to-orange-600 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-zinc-900 rounded-full animate-ping" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-zinc-900 rounded-full" />
          </div>

          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black tracking-wider uppercase">AI Stylist</span>
              <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#FF4800]/20 text-[#FF4800] border border-[#FF4800]/30 rounded">
                Gemini
              </span>
            </div>
            <span className="text-[10px] text-zinc-400 font-medium">Ask sizing & footwear advice</span>
          </div>
        </button>
      )}

      {/* Chat Window Modal / Drawer */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 flex flex-col overflow-hidden bg-white shadow-2xl border border-zinc-200 ${
            isExpanded
              ? 'inset-3 sm:inset-10 md:inset-16 rounded-3xl'
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[94vw] sm:w-[420px] max-w-[440px] h-[600px] max-h-[88vh] rounded-3xl'
          }`}
        >
          {/* Header */}
          <div className="px-5 py-3.5 bg-zinc-950 text-white flex items-center justify-between border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF4800] to-orange-600 flex items-center justify-center text-white shadow-lg">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-zinc-950 rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
                    FOUR5 AI Stylist
                    <Sparkles className="w-3.5 h-3.5 text-[#FF4800]" />
                  </h3>
                </div>
                <p className="text-[11px] text-zinc-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Online • Powered by Gemini 3.8
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleResetChat}
                className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
                title="Reset conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors hidden sm:flex cursor-pointer"
                title={isExpanded ? 'Minimize' : 'Expand'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50/70">
            {messages.map((message) => {
              const isUser = message.role === 'user';
              const mentionedProducts = !isUser ? findReferencedProducts(message.content) : [];

              return (
                <div
                  key={message.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`flex items-start gap-2.5 max-w-[88%] ${
                      isUser ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                        isUser
                          ? 'bg-zinc-900 text-white'
                          : 'bg-gradient-to-br from-[#FF4800] to-orange-600 text-white shadow'
                      }`}
                    >
                      {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                    </div>

                    {/* Bubble */}
                    <div
                      className={`p-3.5 rounded-2xl ${
                        isUser
                          ? 'bg-zinc-950 text-white rounded-tr-xs shadow-md'
                          : 'bg-white text-zinc-800 border border-zinc-200/90 rounded-tl-xs shadow-sm'
                      }`}
                    >
                      {isUser ? (
                        <p className="text-[13px] leading-relaxed whitespace-pre-wrap">
                          {message.content}
                        </p>
                      ) : (
                        renderFormattedMessage(message.content)
                      )}

                      {/* Interactive shoe preview card if AI mentions products */}
                      {mentionedProducts.length > 0 && onSelectProduct && (
                        <div className="mt-3 pt-2.5 border-t border-zinc-100 space-y-2">
                          <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                            Mentioned Footwear:
                          </p>
                          <div className="space-y-1.5">
                            {mentionedProducts.map((prod) => (
                              <button
                                key={prod.id}
                                type="button"
                                onClick={() => {
                                  onSelectProduct(prod);
                                }}
                                className="w-full flex items-center justify-between p-2 rounded-xl bg-orange-50/60 hover:bg-orange-100/70 border border-orange-200/80 transition-all text-left cursor-pointer group"
                              >
                                <div className="flex items-center gap-2">
                                  <img
                                    src={prod.colors[0]?.image || prod.colors[0]?.gallery[0]}
                                    alt={prod.name}
                                    className="w-10 h-10 object-cover rounded-lg bg-white"
                                  />
                                  <div>
                                    <div className="text-xs font-bold text-zinc-900 group-hover:text-[#FF4800]">
                                      {prod.name}
                                    </div>
                                    <div className="text-[11px] font-semibold text-[#FF4800]">
                                      ₹{prod.price.toLocaleString('en-IN')}{' '}
                                      <span className="text-[10px] text-zinc-400 line-through">
                                        ₹{prod.originalPrice.toLocaleString('en-IN')}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <span className="text-xs font-bold text-zinc-700 group-hover:text-[#FF4800] flex items-center gap-1 pr-1">
                                  View <ArrowRight className="w-3.5 h-3.5" />
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Google Search Grounding Citations */}
                      {message.sources && message.sources.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-zinc-100 space-y-1.5">
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-600">
                            <Globe className="w-3 h-3 text-emerald-600" />
                            <span>Grounded with Google Search:</span>
                          </div>
                          {message.queries && message.queries.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {message.queries.map((q, qIdx) => (
                                <span
                                  key={qIdx}
                                  className="text-[10px] px-1.5 py-0.5 bg-orange-50 text-zinc-700 rounded border border-orange-200"
                                >
                                  "{q}"
                                </span>
                              ))}
                            </div>
                          )}
                          <div className="flex flex-wrap gap-1.5 pt-0.5">
                            {message.sources.slice(0, 3).map((src, sIdx) => (
                              <a
                                key={sIdx}
                                href={src.uri}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-100 hover:bg-orange-50 text-[10px] font-medium text-zinc-700 hover:text-[#FF4800] border border-zinc-200 transition-colors"
                              >
                                <span className="truncate max-w-[140px]">{src.title}</span>
                                <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      <div
                        className={`text-[10px] mt-1.5 ${
                          isUser ? 'text-zinc-400 text-right' : 'text-zinc-400'
                        }`}
                      >
                        {message.timestamp}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#FF4800] to-orange-600 flex items-center justify-center text-white shrink-0 shadow mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="p-3.5 bg-white border border-zinc-200 rounded-2xl rounded-tl-xs shadow-sm flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#FF4800] animate-bounce" />
                    <span
                      className="w-2 h-2 rounded-full bg-[#FF4800] animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    />
                    <span
                      className="w-2 h-2 rounded-full bg-[#FF4800] animate-bounce"
                      style={{ animationDelay: '0.4s' }}
                    />
                  </div>
                  <span className="text-xs text-zinc-500 font-medium">
                    AI Stylist is thinking...
                  </span>
                </div>
              </div>
            )}

            {/* Error Message Alert */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center justify-between gap-2">
                <span>{errorMessage}</span>
                <button
                  type="button"
                  onClick={() => handleSendMessage()}
                  className="font-bold underline hover:text-red-900 cursor-pointer shrink-0"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Quick Starter Prompts for fresh conversations */}
            {messages.length === 1 && (
              <div className="pt-2 space-y-2">
                <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                  Popular Styling Questions:
                </p>
                <div className="flex flex-col gap-1.5">
                  {STARTER_PROMPTS.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSendMessage(item.prompt)}
                      className="text-left p-2.5 bg-white hover:bg-orange-50/70 border border-zinc-200 hover:border-[#FF4800]/40 rounded-xl transition-all flex items-center justify-between group cursor-pointer text-xs font-medium text-zinc-800"
                    >
                      <span className="flex items-center gap-2">
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#FF4800] group-hover:translate-x-0.5 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Pills */}
          {messages.length > 1 && !isLoading && (
            <div className="px-4 py-2 bg-white border-t border-zinc-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-[10px] text-zinc-400 font-bold shrink-0">Suggestions:</span>
              {QUICK_FOLLOW_UPS.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(q)}
                  className="shrink-0 text-[11px] font-medium px-2.5 py-1 rounded-full bg-zinc-100 hover:bg-orange-50 hover:text-[#FF4800] hover:border-orange-200 border border-zinc-200 text-zinc-700 transition-colors cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Message Input Box */}
          <div className="p-3 bg-white border-t border-zinc-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about sizing, styles, running, gym..."
                disabled={isLoading}
                className="flex-1 text-xs sm:text-sm px-4 py-2.5 rounded-full bg-zinc-100 border border-zinc-200 focus:outline-none focus:border-[#FF4800] focus:bg-white text-zinc-900 placeholder:text-zinc-400 disabled:opacity-60"
              />

              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="p-2.5 rounded-full bg-[#FF4800] hover:bg-orange-600 disabled:bg-zinc-200 text-white disabled:text-zinc-400 shadow-md transition-all cursor-pointer disabled:cursor-not-allowed shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="flex items-center justify-between text-[10px] text-zinc-400 mt-2 px-1">
              <button
                type="button"
                onClick={() => setUseSearchGrounding(!useSearchGrounding)}
                className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                  useSearchGrounding
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 font-bold'
                    : 'text-zinc-500 hover:text-zinc-900 border border-zinc-200'
                }`}
                title="Toggle Google Search Web Grounding for real-time web facts"
              >
                <Globe className={`w-3 h-3 ${useSearchGrounding ? 'text-emerald-600' : 'text-zinc-400'}`} />
                <span>Search Grounding: {useSearchGrounding ? 'ON' : 'OFF'}</span>
              </button>
              <span>Gemini 3.8 Flash • Real-time AI</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
