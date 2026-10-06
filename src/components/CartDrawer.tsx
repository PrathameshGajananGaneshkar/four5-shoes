import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../types';
import { BRAND_INFO } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: () => void;
  appliedCoupon: string;
  onApplyCoupon: (code: string) => boolean;
  onRemoveCoupon: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Free shipping threshold
  const freeShippingThreshold = BRAND_INFO.shippingThreshold; // 1999
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const shippingFee = subtotal === 0 || subtotal >= freeShippingThreshold ? 0 : 149;

  // Coupon calculations
  let discountAmount = 0;
  if (appliedCoupon === 'FOUR5FIRST') {
    discountAmount = Math.round(subtotal * 0.1);
  } else if (appliedCoupon === 'NEXTMOVE') {
    discountAmount = Math.min(500, subtotal);
  }

  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    const valid = onApplyCoupon(code);
    if (valid) {
      setCouponSuccess(`Coupon "${code}" applied successfully!`);
      setCouponInput('');
    } else {
      setCouponError('Invalid coupon. Try FOUR5FIRST or NEXTMOVE');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Slide-out Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-slideLeft text-left">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#FF4800]" />
            <h3 className="font-display font-black text-xl uppercase tracking-tight text-zinc-950">
              Your Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-500 hover:text-zinc-950 rounded-lg hover:bg-zinc-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="p-4 bg-zinc-50 border-b border-zinc-200">
          <div className="flex items-center justify-between text-xs font-bold text-zinc-800 mb-1.5">
            <span>
              {amountNeededForFreeShipping > 0
                ? `Add ₹${amountNeededForFreeShipping.toLocaleString('en-IN')} more for FREE Express Shipping`
                : '🎉 You have unlocked FREE Express Shipping!'}
            </span>
            <span className="font-tech text-zinc-500">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 bg-zinc-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#FF4800] transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {items.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-display font-bold text-lg text-zinc-900 uppercase">
                  Your bag is empty
                </h4>
                <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto">
                  Step into your legacy. Explore our latest performance runners and street silhouettes.
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-[#0F0F11] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-zinc-800 transition-colors"
              >
                Shop New Arrivals
              </button>
            </div>
          ) : (
            items.map((item, index) => (
              <div
                key={`${item.product.id}-${item.selectedColor.name}-${item.selectedSize}-${index}`}
                className="p-3.5 bg-zinc-50 rounded-2xl border border-zinc-200/80 flex gap-3.5"
              >
                {/* Product Thumbnail */}
                <div className="w-20 h-20 rounded-xl bg-white p-1.5 border border-zinc-200 shrink-0 flex items-center justify-center">
                  <img
                    src={item.selectedColor.image}
                    alt={item.product.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-display font-bold text-sm text-zinc-950 truncate">
                        {item.product.name}
                      </h4>
                      <div className="text-xs text-zinc-500 mt-0.5 flex items-center gap-2">
                        <span>UK {item.selectedSize}</span>
                        <span>•</span>
                        <span className="truncate">{item.selectedColor.name}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveItem(index)}
                      className="p-1 text-zinc-400 hover:text-rose-600 transition-colors cursor-pointer"
                      title="Remove item"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-zinc-300 rounded-lg bg-white overflow-hidden text-xs">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                        className="px-2.5 py-1 hover:bg-zinc-100 font-bold cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-1 font-bold text-zinc-900">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                        className="px-2.5 py-1 hover:bg-zinc-100 font-bold cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <div className="font-display font-black text-sm text-zinc-950">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Action */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-zinc-200 bg-white space-y-3.5">
            {/* Coupon Code Input */}
            <div className="space-y-1">
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Coupon &quot;{appliedCoupon}&quot; applied</span>
                  </div>
                  <button
                    type="button"
                    onClick={onRemoveCoupon}
                    className="text-rose-600 font-bold hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Coupon (e.g. FOUR5FIRST)"
                    className="flex-1 px-3 py-2 text-xs uppercase font-tech rounded-xl border border-zinc-300 focus:outline-none focus:border-[#FF4800]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold rounded-xl uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && <p className="text-[11px] text-rose-600">{couponError}</p>}
              {couponSuccess && <p className="text-[11px] text-emerald-600">{couponSuccess}</p>}
            </div>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-zinc-600 border-t border-zinc-100 pt-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-zinc-900">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Discount</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shippingFee === 0 ? (
                    <strong className="text-emerald-600 uppercase">FREE</strong>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-display font-black text-zinc-950 pt-2 border-t border-zinc-200">
                <span>TOTAL</span>
                <span>₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Proceed to Checkout CTA */}
            <button
              type="button"
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-4 bg-[#FF4800] hover:bg-[#E03E00] text-white font-extrabold text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-orange-950/20 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>100% Secure Checkout • Cash on Delivery & UPI</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
