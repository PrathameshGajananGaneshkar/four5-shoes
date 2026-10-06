import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { Product, ProductColor } from '../types';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, color: ProductColor, size: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [isHovered, setIsHovered] = useState(false);

  // Determine which image to show on hover (either second gallery item or main)
  const displayImage =
    isHovered && selectedColor.gallery.length > 1
      ? selectedColor.gallery[1]
      : selectedColor.image;

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Use default first available size
    const defaultSize = product.availableSizes[0] || 8;
    onAddToCart(product, selectedColor, defaultSize);
  };

  return (
    <div
      className="group relative bg-white rounded-2xl border border-zinc-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden text-left"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual Image Container */}
      <div
        onClick={() => onQuickView(product)}
        className="relative aspect-square w-full bg-zinc-100 overflow-hidden cursor-pointer flex items-center justify-center p-4"
      >
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
          {product.isNewArrival && (
            <span className="px-2.5 py-1 bg-[#0F0F11] text-white text-[10px] font-tech font-extrabold uppercase tracking-wider rounded-md">
              NEW DROP
            </span>
          )}
          {product.isBestSeller && !product.isNewArrival && (
            <span className="px-2.5 py-1 bg-[#FF4800] text-white text-[10px] font-tech font-extrabold uppercase tracking-wider rounded-md">
              BEST SELLER
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 bg-zinc-900/80 backdrop-blur-xs text-white text-[10px] font-bold rounded">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600 shadow-md scale-105'
              : 'bg-white/90 text-zinc-700 hover:text-rose-600 hover:bg-white shadow-sm'
          }`}
        >
          <Heart
            className={`w-4 h-4 ${isWishlisted ? 'fill-current text-rose-600' : ''}`}
          />
        </button>

        {/* Product Photo with Smooth Transition */}
        <img
          src={displayImage}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain filter contrast-105 group-hover:scale-108 transition-transform duration-500 ease-out"
        />

        {/* 45 Brand Stamp Badge */}
        <div className="absolute bottom-2.5 right-2.5 z-5 group-hover:opacity-0 transition-opacity bg-black/70 backdrop-blur-xs text-white text-[9px] font-mono px-1.5 py-0.5 rounded font-extrabold flex items-center gap-1 border border-white/10">
          <span className="text-[#FF4800]">45</span> SHOES
        </div>

        {/* Hover Quick Action Buttons */}
        <div className="absolute inset-x-3 bottom-3 z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="flex-1 py-2.5 px-3 bg-[#0F0F11] hover:bg-[#FF4800] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer active:scale-98"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Quick Add</span>
          </button>
          <button
            type="button"
            onClick={() => onQuickView(product)}
            className="w-10 h-10 bg-white hover:bg-zinc-100 text-zinc-900 rounded-xl shadow-lg flex items-center justify-center transition-colors cursor-pointer active:scale-98"
            title="Quick View"
            aria-label={`Quick view ${product.name}`}
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Category & Gender */}
          <div className="flex items-center justify-between text-xs text-zinc-600 mb-1">
            <span className="font-tech uppercase tracking-wider text-[11px] font-semibold text-zinc-500">
              {product.category}
            </span>
            <span className="text-[11px] font-medium text-zinc-500">{product.gender}</span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-display font-extrabold text-base text-zinc-950 uppercase tracking-tight hover:text-[#FF4800] transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Subtitle / Key spec */}
          <p className="text-xs text-zinc-600 mt-0.5 line-clamp-1 font-medium">
            {product.subtitle}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2.5">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-bold text-zinc-900">{product.rating}</span>
            <span className="text-xs text-zinc-600">({product.reviewCount})</span>
          </div>
        </div>

        {/* Bottom: Color Swatches & Price */}
        <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
          {/* Color swatches */}
          <div className="flex items-center gap-1.5">
            {product.colors.map((color) => (
              <button
                key={color.name}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(color);
                }}
                aria-label={`Select color ${color.name}`}
                className={`w-4 h-4 rounded-full border transition-all cursor-pointer ${
                  selectedColor.name === color.name
                    ? 'ring-2 ring-[#FF4800] ring-offset-1 scale-110'
                    : 'border-zinc-300 hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            <span className="text-[10px] text-zinc-500 ml-1 font-medium">
              {product.colors.length} {product.colors.length === 1 ? 'color' : 'colors'}
            </span>
          </div>

          {/* Price In INR */}
          <div className="text-right">
            <span className="text-xs text-zinc-600 line-through mr-1.5 font-medium">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
            <span className="font-display font-black text-base text-zinc-950">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
