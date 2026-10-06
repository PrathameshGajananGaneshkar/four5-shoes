import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { Product, ProductColor } from '../types';

interface FeaturedProductsProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, color: ProductColor, size: number) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onViewAll: () => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onViewAll,
}) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Running Shoes' | 'Sneakers' | 'Sports Shoes'>('All');

  const filterTabs = ['All', 'Running Shoes', 'Sneakers', 'Sports Shoes'] as const;

  const filtered =
    activeTab === 'All'
      ? products.slice(0, 6)
      : products.filter((p) => p.category === activeTab);

  return (
    <section className="py-20 bg-[#FAFAFB] border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-[#FF4800] text-xs font-tech font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE CORE ROTATION</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-zinc-950 uppercase tracking-tight">
              Featured Silhouettes
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base mt-1">
              Engineered in Chikhli with bold aesthetics, featherlight foam, and zero compromises.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {filterTabs.map((tab) => (
              <button
                type="button"
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer active:scale-98 ${
                  activeTab === tab
                    ? 'bg-[#0F0F11] text-white shadow-sm'
                    : 'bg-white text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 border border-zinc-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistIds.includes(product.id)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <button
            type="button"
            onClick={onViewAll}
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-white hover:bg-zinc-50 text-zinc-950 font-bold text-sm uppercase tracking-wider rounded-xl border-2 border-zinc-900 shadow-sm transition-all cursor-pointer hover:shadow-md active:scale-98"
          >
            <span>Explore All Brand 45 Shoes ({products.length})</span>
            <ArrowRight className="w-4 h-4 text-[#FF4800]" />
          </button>
        </div>

      </div>
    </section>
  );
};
