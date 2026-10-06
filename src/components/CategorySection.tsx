import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES_DATA } from '../data/products';
import { ProductCategory } from '../types';

interface CategorySectionProps {
  onSelectCategory: (category: ProductCategory) => void;
  categories?: typeof CATEGORIES_DATA;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  onSelectCategory,
  categories = CATEGORIES_DATA,
}) => {
  return (
    <section className="py-14 sm:py-20 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-3 sm:gap-4">
          <div>
            <span className="font-tech text-xs tracking-widest text-[#FF4800] uppercase font-bold">
              CURATED COLLECTIONS
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-zinc-950 uppercase tracking-tight mt-1">
              Shop By Category
            </h2>
          </div>
          <p className="text-zinc-600 text-xs sm:text-sm lg:text-base max-w-md">
            From competition tracks to city sidewalks. Explore performance footwear and sneakers engineered for modern lifestyles.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat, index) => {
            const isFeaturedLarge = index === 0 || index === 2;

            return (
              <div
                key={cat.name}
                role="button"
                tabIndex={0}
                onClick={() => onSelectCategory(cat.name)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectCategory(cat.name);
                  }
                }}
                className={`group relative overflow-hidden rounded-2xl bg-zinc-900 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-end min-h-[260px] sm:min-h-[320px] lg:min-h-[360px] focus:outline-none focus:ring-2 focus:ring-[#FF4800] ${
                  isFeaturedLarge ? 'sm:col-span-2 lg:col-span-2' : 'col-span-1'
                }`}
              >
                {/* Background Image */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-85 group-hover:brightness-95"
                />

                {/* Dark Gradient Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Category Info Container */}
                <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-end h-full">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-tech text-xs uppercase tracking-wider text-orange-400 font-bold">
                      {cat.count} Silhouettes
                    </span>
                    <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-[#FF4800] group-hover:text-white transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                    {cat.name}
                  </h3>

                  <p className="text-zinc-300 text-xs sm:text-sm mt-1.5 line-clamp-2 max-w-sm">
                    {cat.tagline}
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/20 flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-white group-hover:text-[#FF4800] transition-colors">
                    <span>Shop Now</span>
                    <span>&rarr;</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
