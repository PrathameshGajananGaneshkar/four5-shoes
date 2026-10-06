import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Camera, ArrowLeft } from 'lucide-react';
import { ActiveView, CartItem, Product, ProductColor } from './types';
import { PRODUCTS, BRAND_INFO, CATEGORIES_DATA } from './data/products';
import {
  applyCustomImagesToProducts,
  applyCustomImagesToCategories,
} from './utils/customImages';

// Layout & Navigation
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';

// Homepage Sections
import { Hero } from './components/Hero';
import { OneByOneShowcase } from './components/OneByOneShowcase';
import { BrandStatement } from './components/BrandStatement';
import { CategorySection } from './components/CategorySection';
import { FeaturedProducts } from './components/FeaturedProducts';
import { NewArrivalsSection } from './components/NewArrivalsSection';
import { GenderSplitSection } from './components/GenderSplitSection';
import { PerformanceSection } from './components/PerformanceSection';
import { BrandStorySection } from './components/BrandStorySection';
import { SocialSection } from './components/SocialSection';
import { NewsletterSection } from './components/NewsletterSection';

// Page Views
import { ShopView } from './components/ShopView';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';

// Modals & Drawers
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchModal } from './components/SearchModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CustomerAccountModal } from './components/CustomerAccountModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { GeminiChatbot } from './components/GeminiChatbot';
import { TrendRadarModal } from './components/TrendRadarModal';
import { ImageManagerModal } from './components/ImageManagerModal';

export default function App() {
  // Navigation View State
  const [currentView, setCurrentView] = useState<ActiveView>('home');
  const [shopCategoryFilter, setShopCategoryFilter] = useState<string | undefined>(undefined);
  const [shopGenderFilter, setShopGenderFilter] = useState<string | undefined>(undefined);

  // Dynamic Products and Categories with Custom User Uploaded Images
  const [productsList, setProductsList] = useState<Product[]>(() =>
    applyCustomImagesToProducts(PRODUCTS)
  );
  const [categoriesList, setCategoriesList] = useState(() =>
    applyCustomImagesToCategories(CATEGORIES_DATA)
  );
  const [isImageManagerOpen, setIsImageManagerOpen] = useState(false);

  const handleRefreshImages = () => {
    setProductsList(applyCustomImagesToProducts(PRODUCTS));
    setCategoriesList(applyCustomImagesToCategories(CATEGORIES_DATA));
  };

  useEffect(() => {
    const onImagesUpdated = () => handleRefreshImages();
    window.addEventListener('four5:images-updated', onImagesUpdated);
    return () => window.removeEventListener('four5:images-updated', onImagesUpdated);
  }, []);

  // E-Commerce Core State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0], // Preload with Velocity Runner for rich demonstration
      selectedColor: PRODUCTS[0].colors[0],
      selectedSize: 8,
      quantity: 1,
    },
  ]);
  const [wishlistProductIds, setWishlistProductIds] = useState<string[]>([PRODUCTS[1].id]);
  const [appliedCoupon, setAppliedCoupon] = useState<string>('FOUR5FIRST');

  // Modal / Drawer Active States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [accountInitialTab, setAccountInitialTab] = useState<'orders' | 'track' | 'addresses' | 'profile'>('orders');
  const [accountInitialOrderId, setAccountInitialOrderId] = useState<string>('');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInitialPrompt, setChatInitialPrompt] = useState<string | undefined>(undefined);
  const [isTrendRadarOpen, setIsTrendRadarOpen] = useState(false);

  const handleOpenChatWithPrompt = (prompt?: string) => {
    setChatInitialPrompt(prompt);
    setIsChatOpen(true);
  };

  const handleOpenAccount = (
    tab: 'orders' | 'track' | 'addresses' | 'profile' = 'orders',
    orderId: string = ''
  ) => {
    setAccountInitialTab(tab);
    setAccountInitialOrderId(orderId);
    setIsAccountOpen(true);
  };

  // Toast notification feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Navigation handler
  const handleNavigate = (view: ActiveView, filter?: string, gender?: string) => {
    setCurrentView(view);
    setShopCategoryFilter(filter);
    setShopGenderFilter(gender);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const handleAddToCart = (
    product: Product,
    color: ProductColor,
    size: number,
    quantity: number = 1
  ) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (it) =>
          it.product.id === product.id &&
          it.selectedColor.name === color.name &&
          it.selectedSize === size
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }
      return [...prev, { product, selectedColor: color, selectedSize: size, quantity }];
    });
    showToast(`Added ${product.name} (UK ${size}) to your bag`);
    setIsCartOpen(true);
  };

  const handleBuyNow = (
    product: Product,
    color: ProductColor,
    size: number,
    quantity: number = 1
  ) => {
    handleAddToCart(product, color, size, quantity);
    setSelectedProduct(null);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleUpdateCartQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(index);
      return;
    }
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
    showToast('Item removed from your bag');
  };

  const handleApplyCoupon = (code: string): boolean => {
    if (code === 'FOUR5FIRST' || code === 'NEXTMOVE') {
      setAppliedCoupon(code);
      return true;
    }
    return false;
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon('');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlistProductIds((prev) => {
      if (prev.includes(product.id)) {
        showToast(`Removed ${product.name} from wishlist`);
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Saved ${product.name} to wishlist`);
        return [...prev, product.id];
      }
    });
  };

  const wishlistProducts = productsList.filter((p) => wishlistProductIds.includes(p.id));

  // Scroll Progress Bar for smooth scroll visual feedback
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="min-h-screen bg-white text-zinc-950 font-sans selection:bg-[#FF4800] selection:text-white relative">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#FF4800] via-orange-500 to-amber-400 origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />

      {/* Toast Notification with Motion AnimatePresence */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-20 right-6 z-50 bg-[#0F0F11] text-white px-5 py-3 rounded-2xl shadow-2xl border border-zinc-700 text-xs font-bold flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF4800] animate-pulse" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Banner & Header Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md">
        <AnnouncementBar
          onNavigateShop={() => handleNavigate('shop')}
          onOpenTrendRadar={() => setIsTrendRadarOpen(true)}
        />
        <Navbar
          currentView={currentView}
          currentGender={shopGenderFilter}
          currentCategory={shopCategoryFilter}
          onNavigate={handleNavigate}
          cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
          wishlistCount={wishlistProductIds.length}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          onOpenAccount={() => handleOpenAccount('orders')}
          onOpenChat={() => setIsChatOpen(true)}
          onOpenTrendRadar={() => setIsTrendRadarOpen(true)}
          onOpenImageManager={() => setIsImageManagerOpen(true)}
        />
      </header>

      {/* Main View Router */}
      <main>
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* 1. Hero Section - Mount Entrance */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <Hero
                  onShopNow={() => handleNavigate('shop')}
                  onShopMen={() => handleNavigate('shop', undefined, 'Men')}
                  onShopWomen={() => handleNavigate('shop', undefined, 'Women')}
                  onExploreNew={() => handleNavigate('shop', 'new-arrivals')}
                  onQuickView={(p) => setSelectedProduct(p)}
                />
              </motion.div>

              {/* 2. Brand Editorial Statement - Scroll Entrance */}
              <motion.section
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                <BrandStatement
                  onDiscover={() => handleNavigate('about')}
                />
              </motion.section>

              {/* 3. Official Brand 45 Shoes One-By-One Showcase */}
              <motion.section
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <OneByOneShowcase
                  products={productsList}
                  onQuickView={(p) => setSelectedProduct(p)}
                  onAddToCart={(p, c, s) => handleAddToCart(p, c, s)}
                  onToggleWishlist={handleToggleWishlist}
                  wishlistIds={wishlistProductIds}
                  onAskAiStylist={(prompt) => handleOpenChatWithPrompt(prompt)}
                />
              </motion.section>

              {/* 4. Product Categories Grid - Scroll Entrance */}
              <motion.section
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                <CategorySection
                  categories={categoriesList}
                  onSelectCategory={(catName) => handleNavigate('shop', catName)}
                />
              </motion.section>

              {/* 4. Featured Silhouettes Grid - Scroll Entrance */}
              <motion.section
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <FeaturedProducts
                  products={productsList}
                  onQuickView={(p) => setSelectedProduct(p)}
                  onAddToCart={(p, c, s) => handleAddToCart(p, c, s)}
                  onToggleWishlist={handleToggleWishlist}
                  wishlistIds={wishlistProductIds}
                  onViewAll={() => handleNavigate('shop')}
                />
              </motion.section>

              {/* 5. New Arrivals Carousel Section - Scroll Entrance */}
              <motion.section
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <NewArrivalsSection
                  products={productsList}
                  onQuickView={(p) => setSelectedProduct(p)}
                  onAddToCart={(p, c, s) => handleAddToCart(p, c, s)}
                  onToggleWishlist={handleToggleWishlist}
                  wishlistIds={wishlistProductIds}
                  onShopNewArrivals={() => handleNavigate('shop', 'new-arrivals')}
                />
              </motion.section>

              {/* 6. Gender Split Section (Men vs Women) - Scroll Entrance */}
              <motion.section
                initial={{ opacity: 0, y: 48, scale: 0.985 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <GenderSplitSection
                  onShopMen={() => handleNavigate('shop', undefined, 'Men')}
                  onShopWomen={() => handleNavigate('shop', undefined, 'Women')}
                  onSelectGender={(gender) => handleNavigate('shop', undefined, gender)}
                />
              </motion.section>

              {/* 7. Performance & Engineering Highlights - Scroll Entrance */}
              <motion.section
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <PerformanceSection
                  onExploreTech={() => handleNavigate('about')}
                />
              </motion.section>

              {/* 8. Brand Story & Heritage Section - Scroll Entrance */}
              <motion.section
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                <BrandStorySection
                  onOurStory={() => handleNavigate('about')}
                  onReadStory={() => handleNavigate('about')}
                />
              </motion.section>

              {/* 9. Social Community (#FOUR5MOVE) - Scroll Entrance */}
              <motion.section
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                <SocialSection />
              </motion.section>

              {/* 10. Newsletter Signup - Scroll Entrance */}
              <motion.section
                initial={{ opacity: 0, y: 40, scale: 0.985 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <NewsletterSection />
              </motion.section>
            </motion.div>
          )}

          {currentView === 'shop' && (
            <motion.div
              key="shop"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <ShopView
                products={productsList}
                initialCategory={shopCategoryFilter}
                initialGender={shopGenderFilter}
                onQuickView={(p) => setSelectedProduct(p)}
                onAddToCart={(p, c, s) => handleAddToCart(p, c, s)}
                onToggleWishlist={handleToggleWishlist}
                wishlistIds={wishlistProductIds}
                onNavigateHome={() => handleNavigate('home')}
              />
            </motion.div>
          )}

          {currentView === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <AboutView
                onExploreShop={() => handleNavigate('shop')}
                onContact={() => handleNavigate('contact')}
                onNavigateHome={() => handleNavigate('home')}
              />
            </motion.div>
          )}

          {currentView === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <ContactView onNavigateHome={() => handleNavigate('home')} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenTracking={() => handleOpenAccount('track')}
        onOpenTrendRadar={() => setIsTrendRadarOpen(true)}
      />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppButton />

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          isOpen={Boolean(selectedProduct)}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(p, c, s, q) => handleAddToCart(p, c, s, q)}
          onBuyNow={(p, c, s, q) => handleBuyNow(p, c, s, q)}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={wishlistProductIds.includes(selectedProduct.id)}
          onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
          onSelectRelated={(rel) => setSelectedProduct(rel)}
          allProducts={PRODUCTS}
          onAskAi={(prompt) => handleOpenChatWithPrompt(prompt)}
        />
      )}

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
      />

      {/* Express Checkout Modal */}
      {isCheckoutOpen && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          items={cartItems}
          appliedCoupon={appliedCoupon}
          onClearCart={handleClearCart}
          onNavigateHome={() => handleNavigate('home')}
          onTrackOrder={(orderId) => {
            setIsCheckoutOpen(false);
            handleOpenAccount('track', orderId);
          }}
        />
      )}

      {/* Live Search Modal */}
      {isSearchOpen && (
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          products={productsList}
          onSelectProduct={(p) => setSelectedProduct(p)}
        />
      )}

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={(p, c, s) => handleAddToCart(p, c, s)}
        onQuickView={(p) => setSelectedProduct(p)}
      />

      {/* Customer Account & Orders Modal */}
      {isAccountOpen && (
        <CustomerAccountModal
          isOpen={isAccountOpen}
          onClose={() => setIsAccountOpen(false)}
          onNavigateShop={() => {
            setIsAccountOpen(false);
            handleNavigate('shop');
          }}
          initialTab={accountInitialTab}
          initialOrderId={accountInitialOrderId}
        />
      )}

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <SizeGuideModal
          isOpen={isSizeGuideOpen}
          onClose={() => setIsSizeGuideOpen(false)}
        />
      )}

      {/* FOUR5 AI Shoe Stylist (Gemini Chatbot) */}
      <GeminiChatbot
        isOpen={isChatOpen}
        onClose={() => {
          setIsChatOpen(false);
          setChatInitialPrompt(undefined);
        }}
        onOpen={() => setIsChatOpen(true)}
        onSelectProduct={(p) => {
          setSelectedProduct(p);
        }}
        initialPrompt={chatInitialPrompt}
      />

      {/* Real-time Footwear Trend Radar (Grounded with Google Search) */}
      <TrendRadarModal
        isOpen={isTrendRadarOpen}
        onClose={() => setIsTrendRadarOpen(false)}
        onNavigateShop={(cat) => {
          setIsTrendRadarOpen(false);
          handleNavigate('shop', cat);
        }}
        onSelectProduct={(p) => {
          setIsTrendRadarOpen(false);
          setSelectedProduct(p);
        }}
      />

      {/* Floating Back to Home button when browsing other pages */}
      {currentView !== 'home' && (
        <button
          type="button"
          onClick={() => handleNavigate('home')}
          className="fixed bottom-6 left-6 z-40 group flex items-center gap-2 px-4 py-2.5 rounded-full bg-zinc-950 text-white border border-zinc-700 hover:bg-[#FF4800] hover:border-[#FF4800] shadow-2xl backdrop-blur-md text-xs font-bold uppercase tracking-wider transition-all cursor-pointer active:scale-95"
          title="मुख्य होमपेजवर परत जा (Back to Home)"
        >
          <ArrowLeft className="w-4 h-4 text-[#FF4800] group-hover:text-white transition-colors" />
          <span>← Back to Home</span>
        </button>
      )}

      {/* Live Store Shoe Photo Manager Modal */}
      <ImageManagerModal
        isOpen={isImageManagerOpen}
        onClose={() => setIsImageManagerOpen(false)}
        products={productsList}
        onRefresh={handleRefreshImages}
      />
    </div>
  );
}
