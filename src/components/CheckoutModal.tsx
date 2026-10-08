import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  MessageCircle,
} from 'lucide-react';
import { CartItem } from '../types';
import { BRAND_INFO } from '../data/products';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedCoupon: string;
  onClearCart: () => void;
  onNavigateHome: () => void;
  onTrackOrder?: (orderId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  appliedCoupon,
  onClearCart,
  onNavigateHome,
  onTrackOrder,
}) => {
  const [step, setStep] = useState<'details' | 'success'>('details');

  // Form State
  const [name, setName] = useState('Aarav Sharma');
  const [phone, setPhone] = useState('9876543210');
  const [email, setEmail] = useState('customer@example.com');
  const [address, setAddress] = useState('Flat 402, Green Park Avenue');
  const [city, setCity] = useState('Pune');
  const [state, setState] = useState('Maharashtra');
  const [pincode, setPincode] = useState('411038');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod' | 'card'>('upi');
  const [upiApp, setUpiApp] = useState<'gpay' | 'phonepe' | 'paytm'>('gpay');

  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = BRAND_INFO.shippingThreshold;
  const shippingFee = subtotal >= freeShippingThreshold ? 0 : 149;

  let discountAmount = 0;
  if (appliedCoupon === 'FOUR5FIRST') {
    discountAmount = Math.round(subtotal * 0.1);
  } else if (appliedCoupon === 'NEXTMOVE') {
    discountAmount = Math.min(500, subtotal);
  }

  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `F45-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);

    try {
      const existingRaw = localStorage.getItem('four5_user_orders');
      const existing = existingRaw ? JSON.parse(existingRaw) : [];
      const newOrder = {
        id: generatedId,
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        productName: items[0]?.product.name || 'FOUR5 Performance Footwear',
        details: items.map((i) => `${i.product.name} (${i.selectedColor.name}, UK ${i.selectedSize})`).join(', ') || 'Size UK 8 • Custom Order',
        total: `₹${finalTotal.toLocaleString('en-IN')}`,
        status: 'Order Confirmed',
        tracking: `Dispatched from Chikhli Facility to ${city}, ${state}`,
        image: items[0]?.selectedColor.image || items[0]?.product.colors[0]?.image || '/shoes/four5-velocity-runner.jpg',
        carrier: 'Delhivery Surface Express',
        awbNumber: `DLV-${Math.floor(100000000 + Math.random() * 900000000)}`,
        deliveryCity: `${city}, ${state}`,
        currentLocation: 'Chikhli Innovation Lab Fulfillment Center #1',
        paymentMethod: paymentMethod.toUpperCase(),
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem('four5_user_orders', JSON.stringify([newOrder, ...existing]));
    } catch (err) {
      console.error('Failed to store order in localStorage', err);
    }

    setStep('success');
    onClearCart();
  };

  const handleFinish = () => {
    onClose();
    onNavigateHome();
  };

  const whatsappSupportUrl = `https://wa.me/${BRAND_INFO.whatsapp}?text=${encodeURIComponent(
    `Hello FOUR5 Shoes, I just placed order ${orderId} for ₹${finalTotal.toLocaleString('en-IN')}. Please confirm my shipment details!`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        onClick={step === 'details' ? onClose : undefined}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-auto border border-zinc-200 animate-fadeIn text-left max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between bg-white sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-2xl tracking-tighter text-zinc-950">
              FOUR
            </span>
            <span className="font-display font-black text-2xl tracking-tighter text-[#FF4800]">
              5
            </span>
            <span className="text-xs font-tech font-bold uppercase tracking-wider text-zinc-500 ml-2">
              EXPRESS CHECKOUT
            </span>
          </div>
          {step === 'details' && (
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-zinc-900 rounded-lg hover:bg-zinc-100"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8">
          {step === 'details' ? (
            <form onSubmit={handlePlaceOrder} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                
                {/* Left: Shipping & Payment form */}
                <div className="md:col-span-7 space-y-6">
                  
                  {/* Shipping Address */}
                  <div>
                    <h4 className="font-display font-black text-base uppercase text-zinc-950 mb-3 flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#FF4800]" />
                      <span>1. Shipping Information</span>
                    </h4>

                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block font-bold text-zinc-700 mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Aarav Sharma"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:border-[#FF4800]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-zinc-700 mb-1">Phone Number (+91) *</label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="10 digit mobile"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:border-[#FF4800]"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-zinc-700 mb-1">Email Address *</label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="For order tracking"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:border-[#FF4800]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-zinc-700 mb-1">Street Address / House No. *</label>
                        <input
                          type="text"
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Building, street, landmark"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:border-[#FF4800]"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block font-bold text-zinc-700 mb-1">City *</label>
                          <input
                            type="text"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:border-[#FF4800]"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-zinc-700 mb-1">State *</label>
                          <input
                            type="text"
                            required
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:border-[#FF4800]"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-zinc-700 mb-1">PIN Code *</label>
                          <input
                            type="text"
                            required
                            maxLength={6}
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:border-[#FF4800]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="pt-4 border-t border-zinc-200">
                    <h4 className="font-display font-black text-base uppercase text-zinc-950 mb-3 flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#FF4800]" />
                      <span>2. Select Payment Method</span>
                    </h4>

                    <div className="space-y-2.5">
                      {/* UPI Option */}
                      <label
                        className={`p-3.5 rounded-xl border flex flex-col gap-2 cursor-pointer transition-all ${
                          paymentMethod === 'upi'
                            ? 'border-[#FF4800] bg-orange-50/40 ring-1 ring-[#FF4800]'
                            : 'border-zinc-200 hover:border-zinc-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <input
                              type="radio"
                              name="payment"
                              checked={paymentMethod === 'upi'}
                              onChange={() => setPaymentMethod('upi')}
                              className="accent-[#FF4800]"
                            />
                            <span className="font-bold text-xs sm:text-sm text-zinc-900">
                              Instant UPI (Google Pay / PhonePe / Paytm)
                            </span>
                          </div>
                          <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                            Fastest
                          </span>
                        </div>

                        {paymentMethod === 'upi' && (
                          <div className="flex items-center gap-2 pl-6 pt-1">
                            <button
                              type="button"
                              onClick={() => setUpiApp('gpay')}
                              className={`px-3 py-1 text-xs rounded-lg font-bold border transition-colors ${
                                upiApp === 'gpay'
                                  ? 'bg-zinc-900 text-white border-zinc-900'
                                  : 'bg-white text-zinc-700 border-zinc-300'
                              }`}
                            >
                              Google Pay
                            </button>
                            <button
                              type="button"
                              onClick={() => setUpiApp('phonepe')}
                              className={`px-3 py-1 text-xs rounded-lg font-bold border transition-colors ${
                                upiApp === 'phonepe'
                                  ? 'bg-zinc-900 text-white border-zinc-900'
                                  : 'bg-white text-zinc-700 border-zinc-300'
                              }`}
                            >
                              PhonePe
                            </button>
                            <button
                              type="button"
                              onClick={() => setUpiApp('paytm')}
                              className={`px-3 py-1 text-xs rounded-lg font-bold border transition-colors ${
                                upiApp === 'paytm'
                                  ? 'bg-zinc-900 text-white border-zinc-900'
                                  : 'bg-white text-zinc-700 border-zinc-300'
                              }`}
                            >
                              Paytm
                            </button>
                          </div>
                        )}
                      </label>

                      {/* Cash on Delivery */}
                      <label
                        className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          paymentMethod === 'cod'
                            ? 'border-[#FF4800] bg-orange-50/40 ring-1 ring-[#FF4800]'
                            : 'border-zinc-200 hover:border-zinc-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="radio"
                            name="payment"
                            checked={paymentMethod === 'cod'}
                            onChange={() => setPaymentMethod('cod')}
                            className="accent-[#FF4800]"
                          />
                          <span className="font-bold text-xs sm:text-sm text-zinc-900">
                            Cash On Delivery (COD)
                          </span>
                        </div>
                        <span className="text-xs text-zinc-500 font-tech">Pay at doorstep</span>
                      </label>

                      {/* Debit/Credit Card */}
                      <label
                        className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          paymentMethod === 'card'
                            ? 'border-[#FF4800] bg-orange-50/40 ring-1 ring-[#FF4800]'
                            : 'border-zinc-200 hover:border-zinc-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="radio"
                            name="payment"
                            checked={paymentMethod === 'card'}
                            onChange={() => setPaymentMethod('card')}
                            className="accent-[#FF4800]"
                          />
                          <span className="font-bold text-xs sm:text-sm text-zinc-900">
                            Credit / Debit Card / Net Banking
                          </span>
                        </div>
                        <span className="text-xs text-zinc-500 font-tech">Visa, RuPay, MC</span>
                      </label>
                    </div>
                  </div>

                </div>

                {/* Right: Order Summary */}
                <div className="md:col-span-5 space-y-4">
                  <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-4">
                    <h4 className="font-display font-black text-sm uppercase text-zinc-950">
                      Order Items ({items.length})
                    </h4>

                    <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                      {items.map((it, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-xs">
                          <img
                            src={it.selectedColor.image}
                            alt={it.product.name}
                            className="w-12 h-12 object-contain bg-white rounded-lg p-1 border border-zinc-200 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-zinc-900 truncate">{it.product.name}</p>
                            <p className="text-zinc-500 text-[11px]">
                              UK {it.selectedSize} • Qty {it.quantity}
                            </p>
                          </div>
                          <div className="font-tech font-bold text-zinc-900">
                            ₹{(it.product.price * it.quantity).toLocaleString('en-IN')}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Price Breakdown */}
                    <div className="border-t border-zinc-200 pt-3 space-y-1.5 text-xs text-zinc-600">
                      <div className="flex justify-between">
                        <span>Items Subtotal</span>
                        <span className="font-bold text-zinc-900">₹{subtotal.toLocaleString('en-IN')}</span>
                      </div>
                      {discountAmount > 0 && (
                        <div className="flex justify-between text-emerald-600 font-bold">
                          <span>Coupon Discount ({appliedCoupon})</span>
                          <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Delivery Fee</span>
                        <span>{shippingFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `₹${shippingFee}`}</span>
                      </div>
                      <div className="flex justify-between text-base font-display font-black text-zinc-950 pt-2 border-t border-zinc-200">
                        <span>TOTAL AMOUNT</span>
                        <span>₹{finalTotal.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-[#FF4800] hover:bg-[#E03E00] text-white font-extrabold text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-orange-950/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                    >
                      <span>PLACE ORDER (₹{finalTotal.toLocaleString('en-IN')})</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-500">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Encrypted • 7-Day Replacement Guarantee</span>
                    </div>
                  </div>
                </div>

              </div>
            </form>
          ) : (
            /* Order Success Confirmation View */
            <div className="py-8 text-center max-w-lg mx-auto space-y-6 animate-fadeIn">
              <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-200">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-900 text-white text-xs font-tech font-bold uppercase rounded-full">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF4800]" />
                  <span>STEP INTO YOUR LEGACY</span>
                </span>
                <h3 className="font-display font-black text-3xl text-zinc-950 uppercase">
                  ORDER CONFIRMED!
                </h3>
                <p className="text-sm text-zinc-600">
                  Thank you, <strong>{name}</strong>. Your FOUR5 shipment is being prepared at our Chikhli distribution facility in Maharashtra.
                </p>
              </div>

              {/* Order Info Card */}
              <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-200 text-left text-xs space-y-3">
                <div className="flex justify-between border-b border-zinc-200 pb-2">
                  <span className="text-zinc-500">Order ID</span>
                  <span className="font-tech font-bold text-zinc-950 text-sm">{orderId}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-200 pb-2">
                  <span className="text-zinc-500">Payment Mode</span>
                  <span className="font-bold text-zinc-950 uppercase">{paymentMethod}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-200 pb-2">
                  <span className="text-zinc-500">Total Paid / Payable</span>
                  <span className="font-tech font-bold text-zinc-950 text-sm">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block mb-1">Delivering to</span>
                  <p className="font-medium text-zinc-800">
                    {address}, {city}, {state} - {pincode}
                  </p>
                </div>
              </div>

              {/* Real-time Tracking Quick Action */}
              {onTrackOrder && (
                <button
                  type="button"
                  onClick={() => onTrackOrder(orderId)}
                  className="w-full py-4 px-4 bg-gradient-to-r from-[#FF4800] via-orange-600 to-amber-500 hover:opacity-95 text-white font-display font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-950/20 cursor-pointer active:scale-98"
                >
                  <Truck className="w-4 h-4 text-white" />
                  <span>Track Live Delivery Progress</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}

              {/* WhatsApp notification action */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={whatsappSupportUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3.5 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-md cursor-pointer transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Get WhatsApp Updates</span>
                </a>

                <button
                  type="button"
                  onClick={handleFinish}
                  className="flex-1 py-3.5 px-4 bg-[#0F0F11] hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer active:scale-98"
                >
                  Back to Store
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
