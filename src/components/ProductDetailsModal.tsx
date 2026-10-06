import React, { useState, useEffect } from 'react';
import {
  X,
  Star,
  Heart,
  ShoppingBag,
  Zap,
  Truck,
  RotateCcw,
  ShieldCheck,
  Ruler,
  CheckCircle2,
  MapPin,
  Send,
  Sparkles,
} from 'lucide-react';
import { Product, ProductColor, Review } from '../types';
import { BRAND_INFO } from '../data/products';

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, color: ProductColor, size: number, quantity: number) => void;
  onBuyNow: (product: Product, color: ProductColor, size: number, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onOpenSizeGuide: () => void;
  onSelectRelated: (product: Product) => void;
  allProducts: Product[];
  onAskAi?: (prompt: string) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isWishlisted,
  onOpenSizeGuide,
  onSelectRelated,
  allProducts,
  onAskAi,
}) => {
  const fallbackColor: ProductColor = product?.colors[0] || {
    name: 'Standard',
    hex: '#000000',
    image: '',
  };

  const [selectedColor, setSelectedColor] = useState<ProductColor>(fallbackColor);
  const [selectedSize, setSelectedSize] = useState<number>(product?.availableSizes[0] || 8);
  const [selectedImage, setSelectedImage] = useState<string>(fallbackColor.image);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');

  // Pincode check state
  const [pincode, setPincode] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState<string | null>(null);

  // New review state
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewCity, setReviewCity] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [reviewsList, setReviewsList] = useState<Review[]>(product?.reviews || []);

  // Sync state when product changes
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedSize(product.availableSizes[0] || 8);
      setSelectedImage(product.colors[0].image);
      setQuantity(1);
      setReviewsList(product.reviews);
      setDeliveryStatus(null);
      setPincode('');
    }
  }, [product?.id]);

  if (!isOpen || !product) return null;

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleColorChange = (color: ProductColor) => {
    setSelectedColor(color);
    setSelectedImage(color.image);
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.length !== 6) {
      setDeliveryStatus('Please enter a valid 6-digit Indian PIN code');
      return;
    }
    // Calculate delivery date 3-5 days from now
    const now = new Date();
    const deliveryDate = new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000);
    const dateStr = deliveryDate.toLocaleDateString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
    setDeliveryStatus(`Express delivery by ${dateStr} • Cash on Delivery available`);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewText.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: reviewAuthor.trim(),
      location: reviewCity.trim() || 'India',
      rating: reviewRating,
      date: 'Just now',
      comment: reviewText.trim(),
      verified: true,
    };

    setReviewsList([newRev, ...reviewsList]);
    setReviewSubmitted(true);
    setReviewAuthor('');
    setReviewCity('');
    setReviewText('');
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-auto border border-zinc-200 max-h-[92vh] flex flex-col animate-fadeIn text-left">
        {/* Top Sticky Bar */}
        <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between bg-white/95 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
            <span>Shop</span>
            <span>/</span>
            <span>{product.category}</span>
            <span>/</span>
            <span className="text-zinc-900 font-bold">{product.name}</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-zinc-500 hover:text-zinc-950 rounded-full hover:bg-zinc-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left: Gallery (Thumbnails + Main Image) */}
            <div className="lg:col-span-6 space-y-4">
              {/* Main Display Image */}
              <div className="relative aspect-square w-full rounded-2xl bg-zinc-100 p-6 flex items-center justify-center overflow-hidden border border-zinc-200/80">
                {product.isNewArrival && (
                  <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-[#0F0F11] text-white text-[11px] font-tech font-extrabold uppercase tracking-wider rounded-md">
                    NEW DROP
                  </span>
                )}
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-contain filter drop-shadow-[0_15px_20px_rgba(0,0,0,0.15)] hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Gallery Thumbnails */}
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {selectedColor.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 rounded-xl bg-zinc-100 p-2 border-2 shrink-0 transition-all cursor-pointer ${
                      selectedImage === img
                        ? 'border-[#FF4800] ring-1 ring-[#FF4800]'
                        : 'border-transparent hover:border-zinc-300'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>

              {/* Trust Value Box */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs text-zinc-600">
                <div className="p-2.5 bg-zinc-50 rounded-xl border border-zinc-200/70">
                  <Truck className="w-4 h-4 text-[#FF4800] mx-auto mb-1" />
                  <span className="font-bold text-zinc-900 block">Free Shipping</span>
                  <span className="text-[10px]">On orders &gt; ₹1,999</span>
                </div>
                <div className="p-2.5 bg-zinc-50 rounded-xl border border-zinc-200/70">
                  <RotateCcw className="w-4 h-4 text-[#FF4800] mx-auto mb-1" />
                  <span className="font-bold text-zinc-900 block">7-Day Return</span>
                  <span className="text-[10px]">Instant size swap</span>
                </div>
                <div className="p-2.5 bg-zinc-50 rounded-xl border border-zinc-200/70">
                  <ShieldCheck className="w-4 h-4 text-[#FF4800] mx-auto mb-1" />
                  <span className="font-bold text-zinc-900 block">Original Quality</span>
                  <span className="text-[10px]">Chikhli Engineered</span>
                </div>
              </div>
            </div>

            {/* Right: Product Details & Purchase Form */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
                  <span className="font-tech uppercase tracking-widest text-[#FF4800] font-bold">
                    {product.category} • {product.gender}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-zinc-900 text-sm">{product.rating}</span>
                    <span className="text-zinc-500">({reviewsList.length} reviews)</span>
                  </div>
                </div>

                <h1 className="font-display font-black text-3xl sm:text-4xl text-zinc-950 uppercase tracking-tight">
                  {product.name}
                </h1>
                <p className="text-sm text-zinc-600 mt-1 font-medium">
                  {product.subtitle}
                </p>
              </div>

              {/* Price & Offer Area */}
              <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="font-display font-black text-3xl text-zinc-950">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-base text-zinc-400 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="px-2.5 py-0.5 bg-[#FF4800] text-white text-xs font-bold rounded-md uppercase">
                    SAVE {discountPercent}%
                  </span>
                </div>
                <div className="text-xs text-zinc-600 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#FF4800]" />
                  <span>
                    Special Offer: Get extra 10% off with coupon <strong>FOUR5FIRST</strong> at checkout!
                  </span>
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-zinc-900 mb-2">
                  <span>SELECT COLOR: <span className="font-normal text-zinc-600">{selectedColor.name}</span></span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => handleColorChange(color)}
                      className={`w-9 h-9 rounded-xl border-2 flex items-center justify-center transition-all cursor-pointer ${
                        selectedColor.name === color.name
                          ? 'border-[#FF4800] ring-2 ring-[#FF4800]/20 scale-105'
                          : 'border-zinc-300 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection & Size Guide */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-zinc-900 mb-2">
                  <span>SELECT SIZE (UK / INDIA):</span>
                  <button
                    onClick={onOpenSizeGuide}
                    className="text-xs text-[#FF4800] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size Guide</span>
                  </button>
                </div>

                <div className="grid grid-cols-6 gap-2">
                  {product.availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 text-xs sm:text-sm font-bold uppercase rounded-xl border transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'bg-[#0F0F11] text-white border-[#0F0F11] shadow-sm'
                          : 'bg-white text-zinc-800 border-zinc-300 hover:border-zinc-900 hover:bg-zinc-50'
                      }`}
                    >
                      UK {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-zinc-900">QUANTITY:</span>
                <div className="flex items-center border border-zinc-300 rounded-xl bg-white overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-sm font-bold hover:bg-zinc-100 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-sm font-bold text-zinc-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-sm font-bold hover:bg-zinc-100 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons (Add to Cart, Buy Now, Wishlist) */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onAddToCart(product, selectedColor, selectedSize, quantity)}
                    className="flex-1 py-4 px-6 bg-[#0F0F11] hover:bg-zinc-800 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#FF4800]" />
                    <span>ADD TO CART</span>
                  </button>

                  <button
                    onClick={() => onBuyNow(product, selectedColor, selectedSize, quantity)}
                    className="flex-1 py-4 px-6 bg-[#FF4800] hover:bg-[#E03E00] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-orange-950/20 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
                  >
                    <span>BUY NOW</span>
                  </button>

                  <button
                    onClick={() => onToggleWishlist(product)}
                    className={`p-4 rounded-xl border transition-colors cursor-pointer ${
                      isWishlisted
                        ? 'bg-rose-50 border-rose-200 text-rose-600'
                        : 'bg-white border-zinc-300 text-zinc-700 hover:border-zinc-900'
                    }`}
                    title="Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current text-rose-600' : ''}`} />
                  </button>
                </div>

                {/* Ask AI Stylist Button */}
                {onAskAi && (
                  <button
                    type="button"
                    onClick={() => {
                      onAskAi(`Tell me more about the fit, sizing, and styling advice for ${product.name}!`);
                      onClose();
                    }}
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 hover:from-orange-100 hover:to-amber-100 border border-orange-200/90 rounded-xl text-zinc-900 text-xs font-bold flex items-center justify-between transition-all cursor-pointer group shadow-xs"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#FF4800] text-white flex items-center justify-center shadow-xs">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <span>Ask AI Stylist: Sizing & match for {product.name}</span>
                    </div>
                    <span className="text-[#FF4800] font-black group-hover:translate-x-1 transition-transform">
                      Ask Gemini →
                    </span>
                  </button>
                )}
              </div>

              {/* Delivery Check with Pincode */}
              <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-2">
                <span className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#FF4800]" />
                  <span>CHECK DELIVERY TO YOUR PINCODE</span>
                </span>
                <form onSubmit={handleCheckPincode} className="flex items-center gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 6-digit PIN (e.g. 443201)"
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-zinc-300 bg-white focus:outline-none focus:border-[#FF4800]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-zinc-900 text-white text-xs font-bold rounded-xl hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    CHECK
                  </button>
                </form>
                {deliveryStatus && (
                  <p className="text-xs font-medium text-emerald-700 mt-1">
                    {deliveryStatus}
                  </p>
                )}
              </div>

            </div>
          </div>

          {/* Tabbed Info (Description, Specs, Reviews) */}
          <div className="pt-6 border-t border-zinc-200">
            <div className="flex items-center gap-6 border-b border-zinc-200 pb-3">
              <button
                onClick={() => setActiveTab('details')}
                className={`text-sm font-bold uppercase tracking-wider pb-1 transition-all cursor-pointer ${
                  activeTab === 'details'
                    ? 'text-[#FF4800] border-b-2 border-[#FF4800]'
                    : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                Description & Story
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`text-sm font-bold uppercase tracking-wider pb-1 transition-all cursor-pointer ${
                  activeTab === 'specs'
                    ? 'text-[#FF4800] border-b-2 border-[#FF4800]'
                    : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`text-sm font-bold uppercase tracking-wider pb-1 transition-all cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'text-[#FF4800] border-b-2 border-[#FF4800]'
                    : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                Customer Reviews ({reviewsList.length})
              </button>
            </div>

            <div className="py-6">
              {activeTab === 'details' && (
                <div className="space-y-6 text-zinc-700 text-sm leading-relaxed max-w-3xl">
                  <div>
                    <h4 className="font-bold text-zinc-900 text-base mb-2">About The Silhouette</h4>
                    <p>{product.description}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-zinc-900 text-base mb-2">The Design Story</h4>
                    <p>{product.story}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-zinc-900 text-base mb-2">Key Engineering Highlights</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {product.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#FF4800] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="max-w-xl border border-zinc-200 rounded-2xl overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <tbody className="divide-y divide-zinc-200">
                      <tr className="bg-zinc-50">
                        <td className="py-3 px-4 font-bold text-zinc-900">Total Weight</td>
                        <td className="py-3 px-4 text-zinc-700 font-tech">{product.specs.weight}</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold text-zinc-900">Upper Construction</td>
                        <td className="py-3 px-4 text-zinc-700">{product.specs.upperMaterial}</td>
                      </tr>
                      <tr className="bg-zinc-50">
                        <td className="py-3 px-4 font-bold text-zinc-900">Midsole Core</td>
                        <td className="py-3 px-4 text-zinc-700">{product.specs.midsole}</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-bold text-zinc-900">Outsole Traction</td>
                        <td className="py-3 px-4 text-zinc-700">{product.specs.soleGrip}</td>
                      </tr>
                      <tr className="bg-zinc-50">
                        <td className="py-3 px-4 font-bold text-zinc-900">Manufacturing Origin</td>
                        <td className="py-3 px-4 text-zinc-700 font-semibold">{product.specs.origin}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-8 max-w-3xl">
                  {/* Reviews List */}
                  <div className="space-y-4">
                    {reviewsList.map((rev) => (
                      <div key={rev.id} className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-zinc-900 text-sm">{rev.author}</span>
                            <span className="text-xs text-zinc-400">• {rev.location}</span>
                            {rev.verified && (
                              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                                Verified Buyer
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-zinc-400">{rev.date}</span>
                        </div>
                        <div className="flex items-center text-amber-500">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                          &ldquo;{rev.comment}&rdquo;
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Add Review Form */}
                  <div className="p-6 bg-white border border-zinc-200 rounded-2xl space-y-4">
                    <h4 className="font-display font-extrabold text-base uppercase text-zinc-900">
                      Write a Review
                    </h4>
                    {reviewSubmitted ? (
                      <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Thank you! Your verified review has been published.</span>
                      </div>
                    ) : (
                      <form onSubmit={handleAddReview} className="space-y-3 text-xs">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block font-bold text-zinc-700 mb-1">Your Name *</label>
                            <input
                              type="text"
                              required
                              value={reviewAuthor}
                              onChange={(e) => setReviewAuthor(e.target.value)}
                              placeholder="e.g. Rahul Sharma"
                              className="w-full px-3 py-2 rounded-xl border border-zinc-300 focus:outline-none focus:border-[#FF4800]"
                            />
                          </div>
                          <div>
                            <label className="block font-bold text-zinc-700 mb-1">City, State</label>
                            <input
                              type="text"
                              value={reviewCity}
                              onChange={(e) => setReviewCity(e.target.value)}
                              placeholder="e.g. Pune, Maharashtra"
                              className="w-full px-3 py-2 rounded-xl border border-zinc-300 focus:outline-none focus:border-[#FF4800]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block font-bold text-zinc-700 mb-1">Rating</label>
                          <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setReviewRating(star)}
                                className="text-amber-400 hover:scale-110 transition-transform"
                              >
                                <Star
                                  className={`w-5 h-5 ${
                                    star <= reviewRating ? 'fill-current text-amber-500' : 'text-zinc-300'
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block font-bold text-zinc-700 mb-1">Review *</label>
                          <textarea
                            required
                            rows={3}
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            placeholder="How is the fit, cushioning and quality of your FOUR5 shoes?"
                            className="w-full px-3 py-2 rounded-xl border border-zinc-300 focus:outline-none focus:border-[#FF4800]"
                          />
                        </div>

                        <button
                          type="submit"
                          className="px-6 py-2.5 bg-[#0F0F11] hover:bg-zinc-800 text-white font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer flex items-center gap-2"
                        >
                          <Send className="w-3.5 h-3.5 text-[#FF4800]" />
                          <span>Submit Review</span>
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Products Carousel / Grid */}
          {relatedProducts.length > 0 && (
            <div className="pt-8 border-t border-zinc-200">
              <h3 className="font-display font-black text-xl uppercase tracking-tight text-zinc-950 mb-4">
                You May Also Like
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectRelated(rel)}
                    className="p-3 bg-zinc-50 hover:bg-white border border-zinc-200 hover:border-[#FF4800] rounded-2xl cursor-pointer transition-all flex items-center gap-3 group"
                  >
                    <img
                      src={rel.colors[0].image}
                      alt={rel.name}
                      className="w-16 h-16 object-contain bg-white rounded-xl p-1"
                    />
                    <div>
                      <span className="text-[10px] font-tech text-[#FF4800] uppercase font-bold">
                        {rel.category}
                      </span>
                      <h4 className="font-display font-bold text-xs text-zinc-900 group-hover:text-[#FF4800] line-clamp-1">
                        {rel.name}
                      </h4>
                      <span className="font-tech font-bold text-xs text-zinc-950">
                        ₹{rel.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
