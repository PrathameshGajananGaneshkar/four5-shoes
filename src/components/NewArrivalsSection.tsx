import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { Product, ProductColor } from '../types';
import { ProductCard } from './ProductCard';

interface NewArrivalsSectionProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, color: ProductColor, size: number) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onShopNewArrivals?: () => void;
}

export const NewArrivalsSection: React.FC<NewArrivalsSectionProps> = ({
  products,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onShopNewArrivals,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Filter new arrivals or top items
  const newArrivals = products.filter((p) => p.isNewArrival || p.isFeatured);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleShopNewArrivals = () => {
    if (onShopNewArrivals) onShopNewArrivals();
  };

  return (
    <section className="py-20 bg-white border-b border-zinc-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 text-white text-xs font-tech font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#FF4800]" />
              <span>JUST DROPPED</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-zinc-950 uppercase tracking-tight">
              NEW ARRIVALS
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base mt-1">
              Fresh silhouettes. New energy. Your next move starts here.
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleShopNewArrivals}
              className="text-xs font-bold uppercase tracking-wider text-zinc-900 hover:text-[#FF4800] flex items-center gap-1.5 mr-2 cursor-pointer transition-colors"
            >
              <span>SHOP NEW ARRIVALS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scroll('left')}
                className="w-10 h-10 rounded-full border border-zinc-300 hover:border-zinc-900 flex items-center justify-center text-zinc-800 hover:text-zinc-950 transition-colors cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => scroll('right')}
                className="w-10 h-10 rounded-full border border-zinc-300 hover:border-zinc-900 flex items-center justify-center text-zinc-800 hover:text-zinc-950 transition-colors cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Carousel Track */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {newArrivals.map((product) => (
            <div
              key={product.id}
              className="w-[280px] sm:w-[320px] shrink-0"
            >
              <ProductCard
                product={product}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlistIds.includes(product.id)}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
