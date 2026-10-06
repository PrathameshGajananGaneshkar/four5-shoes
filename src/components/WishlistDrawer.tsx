import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Product, ProductColor } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product, color: ProductColor, size: number) => void;
  onQuickView: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
  onQuickView,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-slideLeft text-left">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-current" />
            <h3 className="font-display font-black text-xl uppercase tracking-tight text-zinc-950">
              Wishlist ({wishlistProducts.length})
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-950 rounded-lg hover:bg-zinc-100 cursor-pointer"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {wishlistProducts.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mx-auto text-rose-400">
                <Heart className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-display font-bold text-lg text-zinc-900 uppercase">
                  Your wishlist is empty
                </h4>
                <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto">
                  Save your favorite silhouettes to review, compare or purchase later.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 bg-[#0F0F11] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-zinc-800 transition-colors cursor-pointer active:scale-98"
              >
                Browse Silhouettes
              </button>
            </div>
          ) : (
            wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="p-3.5 bg-zinc-50 rounded-2xl border border-zinc-200 flex gap-3.5"
              >
                <div
                  onClick={() => {
                    onClose();
                    onQuickView(product);
                  }}
                  className="w-20 h-20 rounded-xl bg-white p-1.5 border border-zinc-200 shrink-0 flex items-center justify-center cursor-pointer"
                >
                  <img
                    src={product.colors[0].image}
                    alt={product.name}
                    className="w-full h-full object-contain hover:scale-105 transition-transform"
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-1">
                    <div>
                      <span className="text-[10px] font-tech font-bold text-[#FF4800] uppercase">
                        {product.category}
                      </span>
                      <h4
                        onClick={() => {
                          onClose();
                          onQuickView(product);
                        }}
                        className="font-display font-bold text-sm text-zinc-950 truncate hover:text-[#FF4800] cursor-pointer"
                      >
                        {product.name}
                      </h4>
                      <div className="font-display font-black text-sm text-zinc-900 mt-0.5">
                        ₹{product.price.toLocaleString('en-IN')}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveFromWishlist(product)}
                      className="p-1 text-zinc-400 hover:text-rose-600 transition-colors cursor-pointer"
                      title="Remove from wishlist"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => {
                        onAddToCart(product, product.colors[0], product.availableSizes[0] || 8);
                        onRemoveFromWishlist(product);
                      }}
                      className="flex-1 py-1.5 px-3 bg-[#0F0F11] hover:bg-[#FF4800] text-white text-xs font-bold uppercase rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {wishlistProducts.length > 0 && (
          <div className="p-4 border-t border-zinc-200 bg-white">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer active:scale-98"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
