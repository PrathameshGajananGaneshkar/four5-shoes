import React, { useState, useEffect, useMemo } from 'react';
import {
  Filter,
  SlidersHorizontal,
  X,
  Search,
  ChevronDown,
  RotateCcw,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';
import { Product, ProductCategory, ProductColor } from '../types';
import { ProductCard } from './ProductCard';
import { CATEGORIES_DATA } from '../data/products';

interface ShopViewProps {
  products: Product[];
  initialCategory?: string;
  initialGender?: string;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, color: ProductColor, size: number) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onNavigateHome?: () => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  products,
  initialCategory,
  initialGender,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onNavigateHome,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory || 'All'
  );
  const [selectedGender, setSelectedGender] = useState<string>(
    initialGender || 'All'
  );
  const [maxPrice, setMaxPrice] = useState<number>(4000);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating' | 'newest'>('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Synchronize when parent navigation filters change
  useEffect(() => {
    setSelectedCategory(initialCategory || 'All');
  }, [initialCategory]);

  useEffect(() => {
    setSelectedGender(initialGender || 'All');
  }, [initialGender]);

  // Available Sizes in collection
  const allSizes = [6, 7, 8, 9, 10, 11];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category Filter
        if (selectedCategory !== 'All') {
          if (selectedCategory === 'new-arrivals') {
            if (!p.isNewArrival) return false;
          } else if (p.category !== selectedCategory) {
            return false;
          }
        }

        // Gender Filter
        if (selectedGender !== 'All') {
          if (p.gender !== selectedGender && p.gender !== 'Unisex') return false;
        }

        // Price Filter
        if (p.price > maxPrice) return false;

        // Size Filter
        if (selectedSize !== null) {
          if (!p.availableSizes.includes(selectedSize)) return false;
        }

        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          if (!matchName && !matchCat && !matchDesc) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, selectedCategory, selectedGender, maxPrice, selectedSize, sortBy, searchQuery]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedGender('All');
    setMaxPrice(4000);
    setSelectedSize(null);
    setSearchQuery('');
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedGender !== 'All' ||
    maxPrice < 4000 ||
    selectedSize !== null ||
    searchQuery !== '';

  return (
    <div className="py-8 sm:py-12 bg-[#FAFAFB] min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title & Breadcrumbs */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-tech uppercase tracking-widest text-[#FF4800] font-bold mb-1">
            <span>OFFICIAL CATALOG</span>
            <span>•</span>
            <span>CHIKHLI, MAHARASHTRA</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-zinc-950 uppercase tracking-tight">
            {selectedGender === 'Men'
              ? "Men's Footwear Collection"
              : selectedGender === 'Women'
              ? "Women's Footwear Collection"
              : 'Explore All Brand 45 Shoes'}
          </h1>
          <p className="text-zinc-600 text-sm sm:text-base mt-1 max-w-2xl">
            {selectedGender === 'Men'
              ? "Engineered for maximum athletic response, street styling, and durable everyday comfort for men."
              : selectedGender === 'Women'
              ? "Lightweight, ergonomic athletic footwear and sneakers sculpted for all-day comfort and bold style."
              : 'Explore high-response running shoes, urban sneakers, gym trainers, and lifestyle court footwear engineered for active lifestyles.'}
          </p>
        </div>

        {/* Search & Top Controls */}
        <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by shoe name, silhouette or category..."
              className="w-full pl-10 pr-8 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#FF4800]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Right Sort & Mobile Filter trigger */}
          <div className="flex items-center justify-between md:justify-end gap-3">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="md:hidden px-4 py-2.5 bg-zinc-100 text-zinc-800 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#FF4800]" />
              <span>Filters ({hasActiveFilters ? 'Active' : '0'})</span>
            </button>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-zinc-500 font-medium hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-900 focus:outline-none focus:border-[#FF4800] cursor-pointer"
              >
                <option value="featured">Featured / Best Sellers</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">New Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Content Layout (Sidebar Filters + Products Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Filter Sidebar */}
          <aside
            className={`md:col-span-3 space-y-6 ${
              showMobileFilters
                ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto block'
                : 'hidden md:block'
            }`}
          >
            {/* Mobile close header */}
            <div className="flex items-center justify-between md:hidden pb-4 border-b border-zinc-200">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-[#FF4800]" />
                <span className="font-display font-black text-lg uppercase text-zinc-950">
                  Filter Footwear
                </span>
              </div>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-1 text-zinc-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs space-y-6">
              
              {/* Reset All */}
              <div className="flex items-center justify-between">
                <span className="font-tech text-xs font-bold uppercase tracking-wider text-zinc-900 flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-[#FF4800]" />
                  <span>FILTERS</span>
                </span>
                {hasActiveFilters && (
                  <button
                    onClick={handleResetFilters}
                    className="text-xs text-rose-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              {/* Gender Filter */}
              <div className="space-y-2 border-t border-zinc-100 pt-4">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-700 block">
                  Gender
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {['All', 'Men', 'Women'].map((g) => (
                    <button
                      key={g}
                      onClick={() => setSelectedGender(g)}
                      className={`py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                        selectedGender === g
                          ? 'bg-[#0F0F11] text-white'
                          : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div className="space-y-2 border-t border-zinc-100 pt-4">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-700 block">
                  Category
                </span>
                <div className="space-y-1 text-xs">
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className={`w-full text-left px-3 py-2 rounded-lg font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                      selectedCategory === 'All'
                        ? 'bg-orange-50 text-[#FF4800] font-bold'
                        : 'text-zinc-700 hover:bg-zinc-100'
                    }`}
                  >
                    <span>All Products</span>
                    <span className="text-zinc-400 text-[11px]">{products.length}</span>
                  </button>

                  <button
                    onClick={() => setSelectedCategory('new-arrivals')}
                    className={`w-full text-left px-3 py-2 rounded-lg font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                      selectedCategory === 'new-arrivals'
                        ? 'bg-orange-50 text-[#FF4800] font-bold'
                        : 'text-zinc-700 hover:bg-zinc-100'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#FF4800]" />
                      <span>New Arrivals</span>
                    </span>
                  </button>

                  {CATEGORIES_DATA.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full text-left px-3 py-2 rounded-lg font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                        selectedCategory === cat.name
                          ? 'bg-orange-50 text-[#FF4800] font-bold'
                          : 'text-zinc-700 hover:bg-zinc-100'
                      }`}
                    >
                      <span>{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="space-y-2 border-t border-zinc-100 pt-4">
                <div className="flex items-center justify-between text-xs font-bold text-zinc-700">
                  <span>Max Price:</span>
                  <span className="font-tech text-zinc-950 font-bold">
                    ₹{maxPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min={1499}
                  max={4000}
                  step={100}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#FF4800] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-zinc-400 font-tech">
                  <span>₹1,499</span>
                  <span>₹4,000</span>
                </div>
              </div>

              {/* Size Filter */}
              <div className="space-y-2 border-t border-zinc-100 pt-4">
                <div className="flex items-center justify-between text-xs font-bold text-zinc-700">
                  <span>Shoe Size (UK):</span>
                  {selectedSize !== null && (
                    <button
                      onClick={() => setSelectedSize(null)}
                      className="text-[11px] text-rose-600 font-normal hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {allSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() =>
                        setSelectedSize(selectedSize === size ? null : size)
                      }
                      className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'bg-[#0F0F11] text-white border-[#0F0F11]'
                          : 'bg-white text-zinc-800 border-zinc-200 hover:border-zinc-400'
                      }`}
                    >
                      UK {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Done Button */}
              <div className="md:hidden pt-4">
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="w-full py-3 bg-[#FF4800] text-white text-xs font-bold uppercase tracking-wider rounded-xl"
                >
                  Apply Filters ({filteredProducts.length} Results)
                </button>
              </div>

            </div>
          </aside>

          {/* Right Product Grid */}
          <main className="md:col-span-9 space-y-6">
            {/* Results count & Active filter tags */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-500">
              <div>
                Showing <strong className="text-zinc-950 font-bold">{filteredProducts.length}</strong> silhouettes
              </div>

              {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-1.5">
                  {selectedCategory !== 'All' && (
                    <span className="px-2.5 py-1 bg-zinc-200 text-zinc-800 rounded-md font-bold flex items-center gap-1">
                      <span>Category: {selectedCategory}</span>
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => setSelectedCategory('All')}
                      />
                    </span>
                  )}
                  {selectedGender !== 'All' && (
                    <span className="px-2.5 py-1 bg-zinc-200 text-zinc-800 rounded-md font-bold flex items-center gap-1">
                      <span>Gender: {selectedGender}</span>
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => setSelectedGender('All')}
                      />
                    </span>
                  )}
                  {selectedSize !== null && (
                    <span className="px-2.5 py-1 bg-zinc-200 text-zinc-800 rounded-md font-bold flex items-center gap-1">
                      <span>Size: UK {selectedSize}</span>
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => setSelectedSize(null)}
                      />
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-16 text-center border border-zinc-200 space-y-4">
                <div className="w-16 h-16 rounded-full bg-orange-50 text-[#FF4800] flex items-center justify-center mx-auto">
                  <Filter className="w-8 h-8" />
                </div>
                <h3 className="font-display font-black text-2xl uppercase text-zinc-950">
                  No Silhouettes Match Your Criteria
                </h3>
                <p className="text-sm text-zinc-500 max-w-sm mx-auto">
                  Try adjusting your price range, category, or clear search keywords to explore other FOUR5 footwear.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-3 bg-[#0F0F11] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              /* Products Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
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
            )}
          </main>

        </div>

        {/* Bottom Back to Home Banner */}
        {onNavigateHome && (
          <div className="mt-16 text-center py-8 border-t border-zinc-200">
            <button
              type="button"
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-zinc-950 hover:bg-[#FF4800] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer shadow-lg active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>← मुख्य होमपेजवर परत जा (Back to Home)</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
