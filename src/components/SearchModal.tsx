import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, ArrowRight, TrendingUp, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      setQuery('');
    }
  }, [isOpen]);

  const trendingTags = [
    'Velocity Runner',
    'Under ₹3,000',
    'Street Pro',
    'Running Shoes',
    'Track Suits',
    'Apex Trainer',
  ];

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return products.filter((p) => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      const matchSubtitle = p.subtitle.toLowerCase().includes(q);
      const matchGender = p.gender.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchPrice = q.includes('3000') || q.includes('3,000') ? p.price <= 3000 : false;
      return matchName || matchCat || matchSubtitle || matchGender || matchDesc || matchPrice;
    });
  }, [query, products]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-zinc-200 z-10 animate-fadeIn">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-zinc-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-zinc-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 45 shoes, sneakers, category (e.g. Velocity Runner, Street Pro, Trainer)..."
            className="w-full text-base font-medium text-zinc-900 placeholder-zinc-400 focus:outline-none bg-transparent"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-zinc-400 hover:text-zinc-700 rounded-full cursor-pointer"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Modal Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6">
          {/* Trending Suggestions when query is empty */}
          {!query.trim() && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-tech font-bold uppercase tracking-wider text-zinc-500">
                <TrendingUp className="w-4 h-4 text-[#FF4800]" />
                <span>POPULAR SEARCHES</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingTags.map((tag) => (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-orange-50 hover:text-[#FF4800] text-zinc-800 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Quick Picks */}
              <div className="pt-4 border-t border-zinc-100">
                <span className="text-xs font-tech font-bold uppercase tracking-wider text-zinc-500 block mb-3">
                  FEATURED DROPS
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {products.slice(0, 2).map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => {
                        onSelectProduct(prod);
                        onClose();
                      }}
                      className="p-2.5 rounded-xl border border-zinc-200 hover:border-[#FF4800] flex items-center gap-3 cursor-pointer group transition-all bg-zinc-50/50"
                    >
                      <img
                        src={prod.colors[0].image}
                        alt={prod.name}
                        className="w-12 h-12 object-contain bg-white rounded-lg p-1"
                      />
                      <div>
                        <div className="font-bold text-xs text-zinc-900 group-hover:text-[#FF4800] line-clamp-1">
                          {prod.name}
                        </div>
                        <div className="text-[11px] font-tech font-bold text-zinc-600">
                          ₹{prod.price.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Results List */}
          {query.trim() && (
            <div>
              <div className="text-xs text-zinc-500 font-medium mb-3">
                Found {results.length} results for &ldquo;{query}&rdquo;
              </div>

              {results.length === 0 ? (
                <div className="py-12 text-center text-zinc-500 space-y-2">
                  <p className="text-sm font-semibold">No products found matching &ldquo;{query}&rdquo;</p>
                  <p className="text-xs">Try searching for &quot;Runner&quot;, &quot;Sneaker&quot;, &quot;Men&quot; or &quot;Women&quot;</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {results.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                      className="p-3 rounded-xl border border-zinc-200/80 hover:border-[#FF4800] hover:bg-orange-50/30 flex items-center justify-between gap-4 cursor-pointer transition-all group text-left"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={product.colors[0].image}
                          alt={product.name}
                          className="w-14 h-14 object-contain bg-zinc-100 rounded-lg p-1.5 shrink-0"
                        />
                        <div>
                          <span className="text-[10px] font-tech uppercase tracking-wider text-[#FF4800] font-bold">
                            {product.category} • {product.gender}
                          </span>
                          <h4 className="font-display font-bold text-sm text-zinc-900 group-hover:text-[#FF4800] transition-colors">
                            {product.name}
                          </h4>
                          <p className="text-xs text-zinc-500 line-clamp-1">
                            {product.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="font-display font-bold text-sm text-zinc-950">
                          ₹{product.price.toLocaleString('en-IN')}
                        </div>
                        <span className="text-[11px] text-zinc-400 line-through">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
