import React, { useState, useEffect } from 'react';
import {
  Search,
  Truck,
  Package,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  RotateCcw,
  RefreshCw,
  Radio,
  PhoneCall,
  ShieldCheck,
  ExternalLink,
  Navigation,
  ArrowRight,
} from 'lucide-react';
import { BRAND_INFO } from '../data/products';

export interface OrderTrackingData {
  id: string;
  productName: string;
  details: string;
  total: string;
  orderDate: string;
  estimatedDelivery: string;
  carrier: string;
  awbNumber: string;
  currentLocation: string;
  deliveryCity: string;
  progressPercent: number; // 0 to 100
  currentStepIndex: number; // 0: Confirmed, 1: Packed, 2: In Transit, 3: Out for Delivery, 4: Delivered
  isDelivered: boolean;
  statusBadge: string;
  statusBadgeColor: string;
  image: string;
  riderName?: string;
  riderPhone?: string;
  deliveryOtp?: string;
  timeline: {
    title: string;
    description: string;
    timestamp: string;
    completed: boolean;
    current: boolean;
    facility?: string;
  }[];
}

export const PRESET_TRACKING_ORDERS: Record<string, OrderTrackingData> = {
  'F45-782194': {
    id: 'F45-782194',
    productName: 'FOUR5 Velocity Runner',
    details: 'Size UK 8 • Kinetic Infrared',
    total: '₹2,999',
    orderDate: '10 Sep 2026, 11:32 AM',
    estimatedDelivery: 'Delivered on 12 Sep 2026',
    carrier: 'Blue Dart Apex Express',
    awbNumber: 'BD-884920194',
    currentLocation: 'Delivered at Doorstep, Pune',
    deliveryCity: 'Pune, Maharashtra',
    progressPercent: 100,
    currentStepIndex: 3,
    isDelivered: true,
    statusBadge: 'Delivered',
    statusBadgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    image: '/shoe2-clean.png',
    deliveryOtp: 'VERIFIED',
    timeline: [
      {
        title: 'Order Confirmed & Payment Verified',
        description: 'Order confirmed and queued for priority packaging at Central Hub.',
        timestamp: '10 Sep 2026, 11:32 AM',
        completed: true,
        current: false,
        facility: 'Chikhli Innovation Lab DC, MH',
      },
      {
        title: 'Quality Check & Packed',
        description: 'Athletic footwear passed 45-point inspection, sealed in tamper-proof box.',
        timestamp: '10 Sep 2026, 04:15 PM',
        completed: true,
        current: false,
        facility: 'Chikhli Fulfillment DC',
      },
      {
        title: 'In Transit via Blue Dart Air Cargo',
        description: 'Dispatched from Western Hub, sorted at regional hub Pune.',
        timestamp: '11 Sep 2026, 06:40 AM',
        completed: true,
        current: false,
        facility: 'Pune Central Sort Hub',
      },
      {
        title: 'Delivered to Customer Doorstep',
        description: 'Successfully handed over to Aarav Sharma. Contactless signature captured.',
        timestamp: '12 Sep 2026, 02:18 PM',
        completed: true,
        current: true,
        facility: 'Kothrud Delivery Hub, Pune',
      },
    ],
  },
  'F45-519203': {
    id: 'F45-519203',
    productName: '45 Street Pro Sneaker',
    details: 'Size UK 9 • Monochrome Pitch Black',
    total: '₹2,499',
    orderDate: '23 Sep 2026, 03:45 PM',
    estimatedDelivery: 'Arriving Today by 8:00 PM',
    carrier: 'Delhivery Surface Express',
    awbNumber: 'DLV-449102392',
    currentLocation: 'Out with delivery agent, Pune Hub',
    deliveryCity: 'Pune, Maharashtra',
    progressPercent: 88,
    currentStepIndex: 2,
    isDelivered: false,
    statusBadge: 'Out for Delivery',
    statusBadgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&auto=format&fit=crop&q=80',
    riderName: 'Rajesh K. (Delhivery Rider)',
    riderPhone: '+91 98231 45091',
    deliveryOtp: '4509',
    timeline: [
      {
        title: 'Order Confirmed',
        description: 'Payment captured via UPI. Order registered on logistics EDI.',
        timestamp: '23 Sep 2026, 03:45 PM',
        completed: true,
        current: false,
        facility: 'Mumbai Operations Terminal',
      },
      {
        title: 'Packed & Dispatched from Warehouse',
        description: 'Parcel scanned at outbound gate and assigned to expressway line-haul.',
        timestamp: '23 Sep 2026, 08:30 PM',
        completed: true,
        current: false,
        facility: 'Chikhli Hub DC #2',
      },
      {
        title: 'Arrived at Local Sorting Center',
        description: 'Bag opened and sorted to delivery sector route 14.',
        timestamp: 'Today, 05:20 AM',
        completed: true,
        current: false,
        facility: 'Pune Sector 4 Facility',
      },
      {
        title: 'Out for Delivery (Rider En Route)',
        description: 'Assigned to delivery executive Rajesh K. (OTP: 4509 for receipt).',
        timestamp: 'Today, 09:15 AM',
        completed: true,
        current: true,
        facility: 'Pune West Delivery Van #45',
      },
    ],
  },
  'F45-903412': {
    id: 'F45-903412',
    productName: 'FOUR5 AeroFlow Training Shorts',
    details: 'Size M • Jet Black',
    total: '₹1,799',
    orderDate: '24 Sep 2026, 08:12 AM',
    estimatedDelivery: 'Expected in 2 Days (Tomorrow, 6:00 PM)',
    carrier: 'Blue Dart Air Cargo',
    awbNumber: 'BD-918234812',
    currentLocation: 'Departed Western Transit Hub via Air',
    deliveryCity: 'Pune, Maharashtra',
    progressPercent: 55,
    currentStepIndex: 1,
    isDelivered: false,
    statusBadge: 'In Transit',
    statusBadgeColor: 'bg-sky-100 text-sky-800 border-sky-300',
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&auto=format&fit=crop&q=80',
    timeline: [
      {
        title: 'Order Confirmed',
        description: 'Verified & allocated to South Distribution warehouse.',
        timestamp: '24 Sep 2026, 08:12 AM',
        completed: true,
        current: false,
        facility: 'Bengaluru E-com Terminal',
      },
      {
        title: 'Manifested & Dispatched to Air Terminal',
        description: 'En route via cargo flight BD-712 to Western Distribution Node.',
        timestamp: 'Yesterday, 07:45 PM',
        completed: true,
        current: true,
        facility: 'Bengaluru Airport Air Hub',
      },
      {
        title: 'Destination Sort Hub Arrival',
        description: 'Awaiting scheduled arrival and inbound barcode scanning.',
        timestamp: 'Expected Tonight',
        completed: false,
        current: false,
        facility: 'Pune Airport Cargo Bay',
      },
      {
        title: 'Final Mile Delivery',
        description: 'Dispatched to your registered delivery address.',
        timestamp: 'Tomorrow, by 6:00 PM',
        completed: false,
        current: false,
        facility: 'Pune Local Hub',
      },
    ],
  },
  'F45-314092': {
    id: 'F45-314092',
    productName: 'FOUR5 Performance Hydro Cap',
    details: 'One Size • Matte Stealth',
    total: '₹999',
    orderDate: '25 Sep 2026, 01:20 AM',
    estimatedDelivery: 'Expected in 3 Days',
    carrier: 'Delhivery Express',
    awbNumber: 'DLV-102938475',
    currentLocation: 'Fulfillment Center Packing Station #4',
    deliveryCity: 'Pune, Maharashtra',
    progressPercent: 25,
    currentStepIndex: 0,
    isDelivered: false,
    statusBadge: 'Processing & Packing',
    statusBadgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&auto=format&fit=crop&q=80',
    timeline: [
      {
        title: 'Order Placed & Verified',
        description: 'Inventory allocated from Maharashtra master stock.',
        timestamp: '25 Sep 2026, 01:20 AM',
        completed: true,
        current: true,
        facility: 'Chikhli Innovation Lab DC',
      },
      {
        title: 'Quality Packing & Barcode Tagging',
        description: 'Security hologram seal attached. Package prepared for carrier handover.',
        timestamp: 'In Progress',
        completed: false,
        current: false,
        facility: 'Chikhli Hub Unit 3',
      },
      {
        title: 'Carrier Dispatch',
        description: 'Courier partner scheduled for daily 4:00 PM pickup sweep.',
        timestamp: 'Scheduled Today',
        completed: false,
        current: false,
        facility: 'Outbound Bay A',
      },
      {
        title: 'Doorstep Delivery',
        description: 'Delivery to specified customer address.',
        timestamp: 'Estimated in 3 Days',
        completed: false,
        current: false,
        facility: 'Pune Delivery Route',
      },
    ],
  },
};

interface RealTimeOrderTrackerCardProps {
  initialOrderId?: string;
  onSelectOrder?: (orderId: string) => void;
  compactMode?: boolean;
}

export const RealTimeOrderTrackerCard: React.FC<RealTimeOrderTrackerCardProps> = ({
  initialOrderId = '',
  onSelectOrder,
  compactMode = false,
}) => {
  const [orderInput, setOrderInput] = useState<string>(initialOrderId);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [trackingData, setTrackingData] = useState<OrderTrackingData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedAwb, setCopiedAwb] = useState<boolean>(false);
  const [lastRefreshedTime, setLastRefreshedTime] = useState<string>('Just now');
  const [userSavedOrders, setUserSavedOrders] = useState<any[]>([]);

  // Load any user placed orders from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('four5_user_orders');
      if (raw) {
        const parsed = JSON.parse(raw);
        setUserSavedOrders(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleTrackSubmit = (orderIdToTrack?: string, isManualRefresh = false) => {
    const rawId = (orderIdToTrack ?? orderInput).trim();
    if (!rawId) {
      setErrorMessage('कृपया ट्रॅक करण्यासाठी Order ID प्रविष्ट करा (Enter Order ID).');
      setTrackingData(null);
      return;
    }

    setErrorMessage(null);
    if (isManualRefresh) {
      setIsRefreshing(true);
    } else {
      setIsSearching(true);
    }

    const formattedId = rawId.toUpperCase();
    setOrderInput(formattedId);
    if (onSelectOrder) onSelectOrder(formattedId);

    // Simulate realistic live API request to logistics endpoint
    setTimeout(() => {
      setIsSearching(false);
      setIsRefreshing(false);
      setLastRefreshedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));

      // 1. Check presets
      if (PRESET_TRACKING_ORDERS[formattedId]) {
        setTrackingData(PRESET_TRACKING_ORDERS[formattedId]);
        return;
      }

      // 2. Check localStorage user placed orders
      const userOrder = userSavedOrders.find((o) => o.id?.toUpperCase() === formattedId);
      if (userOrder) {
        const dynamicUserTracking: OrderTrackingData = {
          id: userOrder.id,
          productName: userOrder.productName || 'FOUR5 Footwear Package',
          details: userOrder.details || 'Express Shipment',
          total: userOrder.total || '₹2,999',
          orderDate: userOrder.date || 'Today',
          estimatedDelivery: 'Expected in 2-3 Days',
          carrier: userOrder.carrier || 'Delhivery Surface Express',
          awbNumber: userOrder.awbNumber || `DLV-${Math.floor(100000000 + Math.random() * 900000000)}`,
          currentLocation: userOrder.currentLocation || 'Dispatched from Chikhli Innovation Hub, MH',
          deliveryCity: userOrder.deliveryCity || 'Pune, Maharashtra',
          progressPercent: 40,
          currentStepIndex: 1,
          isDelivered: false,
          statusBadge: 'Dispatched & In Transit',
          statusBadgeColor: 'bg-sky-100 text-sky-800 border-sky-300',
          image: userOrder.image || '/shoe2-clean.png',
          deliveryOtp: '4582',
          timeline: [
            {
              title: 'Order Confirmed & Paid',
              description: `Payment recorded via ${userOrder.paymentMethod || 'UPI'}. Processing verified.`,
              timestamp: `${userOrder.date || 'Today'}, Just now`,
              completed: true,
              current: false,
              facility: 'FOUR5 Central Gateway',
            },
            {
              title: 'Packed at Chikhli Innovation Lab',
              description: 'Inspected, boxed, and passed to outbound carrier dock.',
              timestamp: 'Today, Live Scan',
              completed: true,
              current: true,
              facility: 'Chikhli Master DC #1',
            },
            {
              title: 'Carrier Line-Haul Movement',
              description: 'In transit to destination distribution hub.',
              timestamp: 'Expected Tomorrow',
              completed: false,
              current: false,
              facility: 'Regional Transit Express',
            },
            {
              title: 'Doorstep Delivery',
              description: `Final mile delivery to ${userOrder.deliveryCity || 'your registered address'}.`,
              timestamp: 'Estimated in 2-3 Days',
              completed: false,
              current: false,
              facility: 'Local Sort Facility',
            },
          ],
        };
        setTrackingData(dynamicUserTracking);
        return;
      }

      // 3. For any other custom ID entered by the user, dynamically generate realistic live data
      const randomProgress = Math.floor(40 + Math.random() * 45);
      const simulated: OrderTrackingData = {
        id: formattedId,
        productName: 'FOUR5 Performance Footwear Package',
        details: 'Tamper-Proof Express Courier Shipment',
        total: '₹2,499',
        orderDate: 'Recent Order',
        estimatedDelivery: 'Arriving in 2-3 Business Days',
        carrier: 'Blue Dart Surface Express',
        awbNumber: `BD-${Math.floor(100000000 + Math.random() * 900000000)}`,
        currentLocation: 'Regional Sorting Facility, Hub #7 (Live GPS Tracked)',
        deliveryCity: 'Pune, Maharashtra',
        progressPercent: randomProgress,
        currentStepIndex: 2,
        isDelivered: false,
        statusBadge: 'Live In Transit',
        statusBadgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
        image: '/shoe2-clean.png',
        deliveryOtp: '8412',
        timeline: [
          {
            title: 'Order Confirmed',
            description: `Order ${formattedId} verified and inventory reserved.`,
            timestamp: 'Confirmed',
            completed: true,
            current: false,
            facility: 'Chikhli Hub, Maharashtra',
          },
          {
            title: 'Packed & Dispatched',
            description: 'Passed 45-point athletic check and assigned to line-haul carrier.',
            timestamp: 'Yesterday',
            completed: true,
            current: false,
            facility: 'Western Logistics Center',
          },
          {
            title: 'Live Transit Hub Milestone',
            description: 'Package scanned at automated sorter, moving towards destination cluster.',
            timestamp: 'Today, Live Movement',
            completed: true,
            current: true,
            facility: 'Regional Transit Hub',
          },
          {
            title: 'Final Mile Delivery',
            description: 'Doorstep handover with secure OTP verification.',
            timestamp: 'Expected Soon',
            completed: false,
            current: false,
            facility: 'Pune Delivery Route',
          },
        ],
      };
      setTrackingData(simulated);
    }, 550);
  };

  useEffect(() => {
    if (initialOrderId) {
      setOrderInput(initialOrderId);
      handleTrackSubmit(initialOrderId);
    }
  }, [initialOrderId]);

  const handleCopyAwb = (awb: string) => {
    navigator.clipboard?.writeText(awb);
    setCopiedAwb(true);
    setTimeout(() => setCopiedAwb(false), 2000);
  };

  // Combine preset sample keys and user's placed orders
  const sampleOrderIds = Array.from(
    new Set([
      ...userSavedOrders.map((o) => o.id).filter(Boolean),
      ...Object.keys(PRESET_TRACKING_ORDERS),
    ])
  );

  return (
    <div className="space-y-4 text-left">
      {/* Search / Input Box Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-zinc-900 via-[#181820] to-zinc-900 text-white border border-zinc-700/80 shadow-xl relative overflow-hidden">
        {/* Subtle Decorative Background Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF4800]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FF4800] to-amber-500 flex items-center justify-center text-white shadow-md">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-display font-black text-sm sm:text-base uppercase tracking-tight text-white">
                  Real-Time Order Tracking
                </h4>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  LIVE GPS
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">
                तुमचा Order ID टाका आणि कुरिअरचा थेट डिलिव्हरी प्रोग्रेस तपासा (Track Live Shipment)
              </p>
            </div>
          </div>
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleTrackSubmit();
          }}
          className="flex flex-col sm:flex-row gap-2 mt-2"
        >
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500 font-mono font-bold text-xs">
              #
            </div>
            <input
              type="text"
              value={orderInput}
              onChange={(e) => {
                setOrderInput(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              placeholder="e.g. F45-782194, F45-519203"
              className="w-full pl-8 pr-10 py-3 bg-black/50 border border-zinc-600/80 rounded-xl text-xs sm:text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-[#FF4800] focus:border-[#FF4800] uppercase placeholder:normal-case placeholder:font-normal placeholder:text-zinc-500 transition-all shadow-inner"
            />
            {orderInput && (
              <button
                type="button"
                onClick={() => {
                  setOrderInput('');
                  setTrackingData(null);
                  setErrorMessage(null);
                }}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-white cursor-pointer"
                title="Clear"
              >
                ✕
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={isSearching}
            className="px-6 py-3 bg-gradient-to-r from-[#FF4800] to-orange-600 hover:from-orange-600 hover:to-[#FF4800] active:scale-[0.98] text-white font-display font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-orange-950/40 disabled:opacity-60 shrink-0"
          >
            {isSearching ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Tracking Live...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Track Progress</span>
              </>
            )}
          </button>
        </form>

        {errorMessage && (
          <div className="mt-2.5 text-xs text-rose-400 flex items-center gap-1.5 font-medium">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Quick Clickable Sample Order IDs */}
        <div className="mt-3.5 pt-3 border-t border-zinc-800 flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-[11px] font-semibold text-zinc-400">Quick Test Order IDs:</span>
          <div className="flex flex-wrap gap-1.5">
            {sampleOrderIds.slice(0, 5).map((sId) => {
              const isActive = orderInput.toUpperCase() === sId;
              const isDelivered = sId === 'F45-782194';
              const isOutForDelivery = sId === 'F45-519203';

              return (
                <button
                  key={sId}
                  type="button"
                  onClick={() => {
                    setOrderInput(sId);
                    handleTrackSubmit(sId);
                  }}
                  className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
                    isActive
                      ? 'bg-[#FF4800] text-white border-[#FF4800] shadow-sm'
                      : 'bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
                  }`}
                >
                  <span>{sId}</span>
                  {isDelivered && (
                    <span className="text-[9px] text-emerald-400 font-sans font-bold">✓ Delivered</span>
                  )}
                  {isOutForDelivery && (
                    <span className="text-[9px] text-amber-400 font-sans font-bold">🚚 Out</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Real-time Order Tracking Status Result Card */}
      {trackingData && (
        <div className="rounded-3xl border border-zinc-200 bg-white overflow-hidden shadow-xl animate-fadeIn text-zinc-900 transition-all">
          {/* Header Banner: Status + Estimated Delivery */}
          <div className="p-5 bg-gradient-to-r from-zinc-950 via-zinc-900 to-[#15151c] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="font-mono font-black text-base text-[#FF4800] tracking-wider">
                  {trackingData.id}
                </span>
                <span
                  className={`px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full border shadow-sm ${trackingData.statusBadgeColor}`}
                >
                  {trackingData.statusBadge}
                </span>

                <span className="inline-flex items-center gap-1 text-[10px] text-zinc-400 font-medium">
                  <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                  Synced {lastRefreshedTime}
                </span>
              </div>

              <div className="flex items-center gap-2 mt-2 text-xs text-zinc-300">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-bold text-white text-sm">
                  {trackingData.estimatedDelivery}
                </span>
              </div>
            </div>

            {/* Refresh Live Status Button */}
            <div className="flex items-center gap-2 self-start sm:self-center">
              <button
                type="button"
                onClick={() => handleTrackSubmit(trackingData.id, true)}
                disabled={isRefreshing}
                className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-zinc-200 hover:text-white border border-zinc-700 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm disabled:opacity-50"
                title="Poll logistics server for real-time telemetry"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>{isRefreshing ? 'Refreshing...' : 'Live Refresh'}</span>
              </button>
            </div>
          </div>

          {/* Interactive Progress Bar & Moving Delivery Van */}
          <div className="px-5 pt-5 pb-3 bg-zinc-50 border-b border-zinc-200">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-zinc-700 flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-[#FF4800]" />
                Delivery Journey
              </span>
              <span className="font-mono font-black text-xs text-[#FF4800]">
                {trackingData.progressPercent}% Complete
              </span>
            </div>

            {/* Progress track */}
            <div className="relative w-full h-3 bg-zinc-200 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-orange-600 via-[#FF4800] to-amber-400 rounded-full transition-all duration-700 ease-out shadow-sm"
                style={{ width: `${trackingData.progressPercent}%` }}
              />
            </div>

            {/* 4 Step Milestone Dots */}
            <div className="grid grid-cols-4 mt-3 text-center text-[10px] sm:text-xs">
              <div className="flex flex-col items-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-bold mb-1 transition-all ${
                    trackingData.progressPercent >= 25
                      ? 'bg-[#FF4800] text-white shadow-md'
                      : 'bg-zinc-200 text-zinc-500'
                  }`}
                >
                  ✓
                </div>
                <span className="font-bold text-zinc-900 leading-tight">Confirmed</span>
                <span className="text-[10px] text-zinc-500 hidden sm:inline">Order Placed</span>
              </div>

              <div className="flex flex-col items-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-bold mb-1 transition-all ${
                    trackingData.progressPercent >= 50
                      ? 'bg-[#FF4800] text-white shadow-md'
                      : 'bg-zinc-200 text-zinc-500'
                  }`}
                >
                  {trackingData.progressPercent >= 50 ? '✓' : '2'}
                </div>
                <span className="font-bold text-zinc-900 leading-tight">Packed</span>
                <span className="text-[10px] text-zinc-500 hidden sm:inline">Chikhli DC</span>
              </div>

              <div className="flex flex-col items-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-bold mb-1 transition-all ${
                    trackingData.progressPercent >= 75
                      ? 'bg-[#FF4800] text-white shadow-md'
                      : trackingData.progressPercent >= 50
                      ? 'bg-amber-500 text-white animate-pulse'
                      : 'bg-zinc-200 text-zinc-500'
                  }`}
                >
                  {trackingData.progressPercent >= 75 ? '✓' : '3'}
                </div>
                <span className="font-bold text-zinc-900 leading-tight">In Transit</span>
                <span className="text-[10px] text-zinc-500 hidden sm:inline">Sort Facility</span>
              </div>

              <div className="flex flex-col items-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-bold mb-1 transition-all ${
                    trackingData.progressPercent === 100
                      ? 'bg-emerald-600 text-white shadow-md'
                      : trackingData.progressPercent >= 85
                      ? 'bg-amber-500 text-white animate-pulse'
                      : 'bg-zinc-200 text-zinc-500'
                  }`}
                >
                  {trackingData.progressPercent === 100 ? '✓' : '4'}
                </div>
                <span className="font-bold text-zinc-900 leading-tight">
                  {trackingData.isDelivered ? 'Delivered' : 'Out for Delivery'}
                </span>
                <span className="text-[10px] text-zinc-500 hidden sm:inline">Doorstep</span>
              </div>
            </div>
          </div>

          {/* Product & Order Details Row */}
          <div className="p-4 sm:p-5 border-b border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
            <div className="flex items-center gap-3.5">
              <img
                src={trackingData.image}
                alt={trackingData.productName}
                className="w-14 h-14 object-contain bg-zinc-50 rounded-xl p-1.5 border border-zinc-200 shrink-0"
              />
              <div>
                <h5 className="font-display font-extrabold text-sm sm:text-base text-zinc-950">
                  {trackingData.productName}
                </h5>
                <p className="text-xs text-zinc-500 mt-0.5">{trackingData.details}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[11px] font-bold text-zinc-600">
                    Ordered: {trackingData.orderDate}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center sm:flex-col sm:items-end justify-between border-t sm:border-t-0 pt-2 sm:pt-0 border-zinc-100">
              <div className="text-right">
                <span className="font-display font-black text-base text-zinc-950 block">
                  {trackingData.total}
                </span>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Paid Online • Verified
                </span>
              </div>
            </div>
          </div>

          {/* Live Telemetry Info Grid: Carrier, AWB, Current Location, Rider/OTP */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4 sm:p-5 bg-orange-50/30 border-b border-orange-100 text-xs">
            {/* Courier Partner & AWB */}
            <div className="p-3 bg-white rounded-xl border border-orange-200/80 shadow-2xs">
              <div className="flex items-center gap-1.5 text-zinc-500 text-[11px] mb-1">
                <Truck className="w-3.5 h-3.5 text-[#FF4800]" />
                <span>Courier Partner</span>
              </div>
              <p className="font-bold text-zinc-900">{trackingData.carrier}</p>
              <div className="flex items-center gap-1.5 mt-1.5 pt-1.5 border-t border-zinc-100">
                <span className="text-[10px] text-zinc-400 font-mono">AWB: {trackingData.awbNumber}</span>
                <button
                  type="button"
                  onClick={() => handleCopyAwb(trackingData.awbNumber)}
                  className="p-1 hover:bg-orange-100 text-zinc-600 hover:text-zinc-900 rounded transition-colors cursor-pointer"
                  title="Copy AWB Tracking Number"
                >
                  {copiedAwb ? (
                    <Check className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>
            </div>

            {/* Current Real-time Location Checkpoint */}
            <div className="p-3 bg-white rounded-xl border border-orange-200/80 shadow-2xs">
              <div className="flex items-center gap-1.5 text-zinc-500 text-[11px] mb-1">
                <MapPin className="w-3.5 h-3.5 text-[#FF4800]" />
                <span>Current Real-Time Location</span>
              </div>
              <p className="font-bold text-zinc-900 flex items-start gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping mt-1 shrink-0" />
                <span>{trackingData.currentLocation}</span>
              </p>
              <span className="text-[10px] text-zinc-400 block mt-1">
                Destination: <strong>{trackingData.deliveryCity}</strong>
              </span>
            </div>

            {/* Delivery OTP / Rider Contact */}
            <div className="p-3 bg-white rounded-xl border border-orange-200/80 shadow-2xs sm:col-span-2 lg:col-span-1">
              {trackingData.riderName ? (
                <div>
                  <div className="flex items-center gap-1.5 text-zinc-500 text-[11px] mb-1">
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Assigned Delivery Rider</span>
                  </div>
                  <p className="font-bold text-zinc-900">{trackingData.riderName}</p>
                  <div className="flex items-center justify-between mt-1 pt-1 border-t border-zinc-100">
                    <span className="text-[11px] font-mono text-emerald-700 font-bold">
                      {trackingData.riderPhone}
                    </span>
                    {trackingData.deliveryOtp && (
                      <span className="text-[10px] bg-amber-100 text-amber-900 font-mono font-black px-1.5 py-0.5 rounded">
                        OTP: {trackingData.deliveryOtp}
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-1.5 text-zinc-500 text-[11px] mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Secure Contactless Delivery</span>
                  </div>
                  <p className="font-bold text-zinc-900">
                    {trackingData.isDelivered ? 'Delivery Completed' : 'Contactless OTP Required'}
                  </p>
                  <p className="text-[10px] text-zinc-500 mt-1">
                    {trackingData.deliveryOtp
                      ? `Delivery Security OTP: ${trackingData.deliveryOtp}`
                      : 'OTP will be sent via SMS before delivery'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Live Milestone Timeline Log */}
          <div className="p-4 sm:p-5 bg-white">
            <div className="flex items-center justify-between mb-4">
              <h6 className="font-display font-extrabold text-xs uppercase tracking-wider text-zinc-400">
                Detailed Shipment Milestones
              </h6>
              <span className="text-[11px] text-zinc-500 font-medium">
                {trackingData.timeline.length} Checkpoints Recorded
              </span>
            </div>

            <div className="space-y-4 relative pl-2 sm:pl-3">
              {/* Vertical connecting line */}
              <div className="absolute left-[15px] sm:left-[19px] top-3 bottom-3 w-0.5 bg-zinc-200" />

              {trackingData.timeline.map((step, idx) => (
                <div key={idx} className="relative flex items-start gap-3.5 group">
                  {/* Step Dot */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 transition-all ${
                      step.current
                        ? 'bg-[#FF4800] text-white ring-4 ring-orange-200 shadow-md animate-pulse'
                        : step.completed
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-zinc-200 text-zinc-400'
                    }`}
                  >
                    {step.completed ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <span className="text-[10px] font-bold">{idx + 1}</span>
                    )}
                  </div>

                  {/* Step Info */}
                  <div className="flex-1 pt-0.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5 sm:gap-2">
                      <div className="flex items-center gap-2">
                        <h5
                          className={`text-xs font-bold ${
                            step.current
                              ? 'text-[#FF4800] font-display text-sm'
                              : step.completed
                              ? 'text-zinc-950 font-display'
                              : 'text-zinc-400'
                          }`}
                        >
                          {step.title}
                        </h5>
                        {step.current && (
                          <span className="px-1.5 py-0.5 bg-orange-100 text-[#FF4800] text-[9px] font-black rounded uppercase">
                            CURRENT
                          </span>
                        )}
                      </div>
                      <span
                        className={`text-[10px] font-mono ${
                          step.current
                            ? 'text-[#FF4800] font-bold'
                            : step.completed
                            ? 'text-zinc-500'
                            : 'text-zinc-400'
                        }`}
                      >
                        {step.timestamp}
                      </span>
                    </div>

                    <p
                      className={`text-[11px] mt-0.5 leading-relaxed ${
                        step.completed || step.current ? 'text-zinc-600' : 'text-zinc-400'
                      }`}
                    >
                      {step.description}
                    </p>

                    {step.facility && (
                      <div className="mt-1 flex items-center gap-1 text-[10px] text-zinc-400">
                        <MapPin className="w-2.5 h-2.5" />
                        <span>{step.facility}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Action Bar */}
          <div className="p-4 bg-zinc-50 border-t border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <button
              type="button"
              onClick={() => {
                setTrackingData(null);
                setOrderInput('');
              }}
              className="text-zinc-600 hover:text-zinc-950 font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>दुसरा Order ID ट्रॅक करा (Track Another Order)</span>
            </button>

            <a
              href={`https://wa.me/${BRAND_INFO.whatsapp}?text=${encodeURIComponent(
                `Hello FOUR5 Logistics Team, I am checking the status of my Order ${trackingData.id} (${trackingData.productName}). Please assist me with live delivery details.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>WhatsApp Delivery Support</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
