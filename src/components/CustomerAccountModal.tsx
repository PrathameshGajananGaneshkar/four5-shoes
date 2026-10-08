import React, { useState, useEffect } from 'react';
import {
  X,
  Package,
  MapPin,
  Award,
  Search,
  Truck,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { BRAND_INFO } from '../data/products';
import { RealTimeOrderTrackerCard } from './RealTimeOrderTrackerCard';

interface CustomerAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateShop: () => void;
  initialTab?: 'orders' | 'track' | 'addresses' | 'profile';
  initialOrderId?: string;
}

export const CustomerAccountModal: React.FC<CustomerAccountModalProps> = ({
  isOpen,
  onClose,
  onNavigateShop,
  initialTab = 'orders',
  initialOrderId = '',
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'track' | 'addresses' | 'profile'>(initialTab);
  const [trackingInput, setTrackingInput] = useState<string>(initialOrderId);
  const [userOrders, setUserOrders] = useState<any[]>([]);
  const [quickOrderInput, setQuickOrderInput] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      if (initialTab) {
        setActiveTab(initialTab);
      }
      if (initialOrderId) {
        setTrackingInput(initialOrderId);
      }
      try {
        const raw = localStorage.getItem('four5_user_orders');
        if (raw) {
          setUserOrders(JSON.parse(raw));
        }
      } catch {
        // ignore
      }
    }
  }, [isOpen, initialTab, initialOrderId]);

  if (!isOpen) return null;

  const baseDemoOrders = [
    {
      id: 'F45-782194',
      date: '12 Sep 2026',
      productName: 'FOUR5 Velocity Runner',
      details: 'Size UK 8 • Kinetic Infrared',
      total: '₹2,999',
      status: 'Delivered',
      tracking: 'Delivered to Pune, Maharashtra',
      image: '/shoes/four5-velocity-runner.jpg',
    },
    {
      id: 'F45-519203',
      date: '23 Sep 2026',
      productName: '45 Street Pro Sneaker',
      details: 'Size UK 9 • Monochrome Pitch Black',
      total: '₹2,499',
      status: 'Out for Delivery',
      tracking: 'Out for delivery in Pune Hub',
      image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400&auto=format&fit=crop&q=80',
    },
  ];

  // Merge newly placed user orders from localStorage at top
  const allOrders = [
    ...userOrders.map((o) => ({
      id: o.id,
      date: o.date || 'Today',
      productName: o.productName,
      details: o.details,
      total: o.total,
      status: o.status || 'Order Placed',
      tracking: o.tracking || 'In Fulfillment',
      image: o.image || '/shoes/four5-velocity-runner.jpg',
    })),
    ...baseDemoOrders,
  ];

  const handleTrackFromOrderList = (orderId: string) => {
    setTrackingInput(orderId);
    setActiveTab('track');
  };

  const handleQuickTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickOrderInput.trim()) return;
    setTrackingInput(quickOrderInput.trim().toUpperCase());
    setActiveTab('track');
    setQuickOrderInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Window */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-auto border border-zinc-200 animate-fadeIn text-left max-h-[92vh] flex flex-col">
        {/* Header with Member Badge */}
        <div className="p-5 sm:p-6 bg-[#0F0F11] text-white flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF4800] to-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-md shrink-0">
              AS
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-display font-extrabold text-lg text-white">
                  Aarav Sharma
                </h3>
                <span className="px-2 py-0.5 bg-white/20 text-[#FF4800] font-tech text-[10px] font-bold uppercase tracking-wider rounded">
                  ELITE MEMBER
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Pune, Maharashtra • 450 FOUR5 Velocity Coins
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-zinc-200 px-3 sm:px-6 bg-zinc-50 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-3 sm:px-4 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer border-b-2 ${
              activeTab === 'orders'
                ? 'border-[#FF4800] text-[#FF4800]'
                : 'border-transparent text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Past Orders ({allOrders.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('track')}
            className={`py-3 px-3 sm:px-4 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer border-b-2 flex items-center gap-1.5 ${
              activeTab === 'track'
                ? 'border-[#FF4800] text-[#FF4800]'
                : 'border-transparent text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            Order Status
            <span className="w-2 h-2 rounded-full bg-[#FF4800] animate-pulse"></span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('addresses')}
            className={`py-3 px-3 sm:px-4 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer border-b-2 ${
              activeTab === 'addresses'
                ? 'border-[#FF4800] text-[#FF4800]'
                : 'border-transparent text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Saved Address
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-3 sm:px-4 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer border-b-2 ${
              activeTab === 'profile'
                ? 'border-[#FF4800] text-[#FF4800]'
                : 'border-transparent text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Loyalty & Perks
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {/* TAB 1: PAST ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {/* Quick Real-Time Order Tracking Status Search Banner */}
              <div className="bg-gradient-to-br from-zinc-900 via-[#181820] to-zinc-900 text-white p-4 rounded-2xl border border-zinc-700/80 shadow-md">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FF4800] to-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-display font-black text-xs uppercase tracking-tight text-white flex items-center gap-2">
                        <span>Real-Time Order Tracking</span>
                        <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded-full border border-emerald-500/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                          LIVE STATUS
                        </span>
                      </h5>
                      <p className="text-[11px] text-zinc-400">
                        कोणताही Order ID टाका आणि कुरिअरचा थेट डिलिव्हरी प्रोग्रेस तपासा (Track Live Progress)
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleQuickTrackSubmit} className="flex gap-2 mt-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={quickOrderInput}
                      onChange={(e) => setQuickOrderInput(e.target.value)}
                      placeholder="e.g. F45-782194, F45-519203..."
                      className="w-full px-3.5 py-2.5 bg-black/60 border border-zinc-700 rounded-xl text-xs font-mono font-bold text-white focus:outline-none focus:ring-2 focus:ring-[#FF4800] uppercase placeholder:normal-case placeholder:font-normal placeholder:text-zinc-500 transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#FF4800] hover:bg-orange-600 active:scale-95 text-white font-display font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 shadow-md"
                  >
                    <span>Track Status</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>

              {allOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-zinc-300 transition-all shadow-sm"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={ord.image}
                      alt={ord.productName}
                      className="w-14 h-14 object-contain bg-white rounded-xl p-1 border border-zinc-200 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-[#FF4800]">
                          {ord.id}
                        </span>
                        <span className="text-[11px] text-zinc-400">• {ord.date}</span>
                      </div>
                      <h4 className="font-display font-bold text-sm text-zinc-950 mt-0.5">
                        {ord.productName}
                      </h4>
                      <p className="text-xs text-zinc-500">{ord.details}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-200">
                    <div className="text-left sm:text-right">
                      <span className="font-display font-black text-sm text-zinc-950 block">
                        {ord.total}
                      </span>
                      <span
                        className={`inline-block px-2.5 py-0.5 text-[10px] font-bold rounded-full ${
                          ord.status === 'Delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {ord.status}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleTrackFromOrderList(ord.id)}
                      className="px-3.5 py-1.5 bg-zinc-900 hover:bg-[#FF4800] text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-sm active:scale-95"
                    >
                      <Truck className="w-3.5 h-3.5 text-amber-300" />
                      <span>Live Track Status</span>
                    </button>
                  </div>
                </div>
              ))}

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigateShop();
                  }}
                  className="text-xs text-[#FF4800] font-bold hover:underline cursor-pointer"
                >
                  Explore New Drops in Shop &rarr;
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: REAL-TIME ORDER TRACKING STATUS CARD (USER REQUEST) */}
          {activeTab === 'track' && (
            <div className="space-y-4">
              <RealTimeOrderTrackerCard
                initialOrderId={trackingInput}
                onSelectOrder={(id) => setTrackingInput(id)}
              />
            </div>
          )}

          {/* TAB 3: SAVED ADDRESS */}
          {activeTab === 'addresses' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl border-2 border-[#FF4800] bg-orange-50/20 relative">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-sm text-zinc-950">Home (Primary)</span>
                  <span className="text-[10px] bg-[#FF4800] text-white px-2 py-0.5 rounded font-bold">
                    DEFAULT
                  </span>
                </div>
                <p className="text-zinc-700 leading-relaxed">
                  Aarav Sharma<br />
                  Plot 42, Sunrise Enclave, Main Road<br />
                  Kothrud, Pune, Maharashtra - 411038<br />
                  Phone: +91 98765 43210
                </p>
              </div>

              <div className="p-3 bg-zinc-50 border border-dashed border-zinc-300 rounded-xl text-center text-zinc-500 cursor-pointer hover:bg-zinc-100 transition-colors">
                + Add Another Delivery Address
              </div>
            </div>
          )}

          {/* TAB 4: LOYALTY & PERKS */}
          {activeTab === 'profile' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-zinc-900 text-white space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-tech text-xs text-orange-400 font-bold uppercase">
                    FOUR5 PASS PRIVILEGES
                  </span>
                  <Award className="w-5 h-5 text-orange-400" />
                </div>
                <h4 className="font-display font-black text-xl text-white">
                  Tier: Gold Athlete
                </h4>
                <p className="text-zinc-400 text-xs">
                  Early 24-hour drop access, free standard express shipping on all orders, and birthday vouchers.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200">
                  <span className="text-zinc-500 block text-[11px]">Available Coins</span>
                  <span className="font-display font-black text-lg text-zinc-900">450</span>
                </div>
                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200">
                  <span className="text-zinc-500 block text-[11px]">Lifetime Orders</span>
                  <span className="font-display font-black text-lg text-zinc-900">2</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
