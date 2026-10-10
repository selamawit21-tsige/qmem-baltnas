/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Currency, Language, CartItem, Product, ProductWeight, RewardsAccount } from './types';
import { PRODUCTS } from './data/products';
import { INITIAL_REWARDS_ACCOUNT, calculateTier } from './data/rewards';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductsSection } from './components/ProductsSection';
import { GlobalMarketFeatures } from './components/GlobalMarketFeatures';
import { AboutProductsSection } from './components/AboutProductsSection';
import { StoryAndValuesSection } from './components/StoryAndValuesSection';
import { WhoWeServeSection } from './components/WhoWeServeSection';
import { ReviewsAndGallerySection } from './components/ReviewsAndGallerySection';
import { ContactSection } from './components/ContactSection';
import { MovableLayerDivider } from './components/MovableLayerDivider';
import { CartSidebar } from './components/CartSidebar';
import { CheckoutModal } from './components/CheckoutModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { RewardsModal } from './components/RewardsModal';
import { KitchenHelperWidget } from './components/KitchenHelperWidget';
import { Footer } from './components/Footer';
import { CheckCircle2, ShoppingBag } from 'lucide-react';

export default function App() {
  // 1. Language & Currency State with LocalStorage
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('qb_language');
    return saved === 'am' || saved === 'en' ? saved : 'en';
  });

  const [currency, setCurrency] = useState<Currency>(() => {
    const saved = localStorage.getItem('qb_currency');
    return saved === 'USD' || saved === 'ETB' ? saved : 'ETB';
  });

  // 2. Cart Items State with LocalStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('qb_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 3. Q'mem Heritage Rewards State with LocalStorage
  const [rewards, setRewards] = useState<RewardsAccount>(() => {
    try {
      const saved = localStorage.getItem('qb_rewards');
      return saved ? JSON.parse(saved) : INITIAL_REWARDS_ACCOUNT;
    } catch {
      return INITIAL_REWARDS_ACCOUNT;
    }
  });

  // 4. UI Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isRewardsModalOpen, setIsRewardsModalOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);

  // 5. Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persist settings
  useEffect(() => {
    localStorage.setItem('qb_language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('qb_currency', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('qb_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('qb_rewards', JSON.stringify(rewards));
  }, [rewards]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Rewards transaction processor
  const handleApplyRewards = (
    pointsRedeemed: number,
    pointsEarned: number,
    orderId: string
  ) => {
    setRewards((prev) => {
      const newPoints = Math.max(0, prev.points - pointsRedeemed + pointsEarned);
      const newLifetime = prev.lifetimePoints + pointsEarned;
      const newTier = calculateTier(newLifetime);

      const newHistory = [...prev.history];
      if (pointsRedeemed > 0) {
        newHistory.unshift({
          id: `tx-red-${Date.now()}`,
          type: 'redeemed',
          points: -pointsRedeemed,
          description: {
            en: `Redeemed on order #${orderId}`,
            am: `በትዕዛዝ #${orderId} ላይ የተጠቀሙት`,
          },
          timestamp: 'Just now',
        });
      }
      if (pointsEarned > 0) {
        newHistory.unshift({
          id: `tx-earn-${Date.now()}`,
          type: 'earned',
          points: pointsEarned,
          description: {
            en: `Earned from export order #${orderId}`,
            am: `ከትዕዛዝ #${orderId} ያገኙት ነጥብ`,
          },
          timestamp: 'Just now',
        });
      }

      return {
        ...prev,
        points: newPoints,
        lifetimePoints: newLifetime,
        tier: newTier,
        history: newHistory,
      };
    });

    if (pointsRedeemed > 0 && pointsEarned > 0) {
      showToast(`Saved discount with ${pointsRedeemed} pts & earned +${pointsEarned} Heritage Points!`);
    } else if (pointsEarned > 0) {
      showToast(`Earned +${pointsEarned} Q’mem Heritage Points on your order!`);
    }
  };

  // Cart operations
  const handleAddToCart = (product: Product, weight: ProductWeight, quantity: number) => {
    const itemId = `${product.id}-${weight}`;
    const unitPrice = product.prices[weight];

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: itemId,
            productId: product.id,
            weight,
            quantity,
            unitPrice,
          },
        ];
      }
    });

    const name = product.name[language];
    showToast(`Added ${quantity}× ${name} (${weight}) to bag`);
  };


  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.id === itemId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#2D1B14] font-sans selection:bg-[#942F12]/15 selection:text-[#942F12]">
      {/* Top Banner: 100% Organic & Export Standard (Hidden on Mobile) */}
      <div className="hidden md:flex bg-[#1C0904] text-[#FFF4E8] text-xs py-2.5 px-4 text-center border-b border-[#3B150A] items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#70E000] animate-ping shrink-0" />
        <span className="font-extrabold tracking-wide uppercase text-amber-300">
          100% ORGANIC CERTIFIED
        </span>
        <span className="text-white/40">·</span>
        <span className="font-semibold tracking-wide text-xs">
          Official Q&apos;mem Baltna Store · Export Standards · Worldwide Air Shipping &amp; Addis Ababa Delivery
        </span>
      </div>

      {/* Navigation Header */}
      <Navbar
        language={language}
        currency={currency}
        cartCount={totalCartCount}
        rewardsPoints={rewards.points}
        onLanguageToggle={() => setLanguage((prev) => (prev === 'en' ? 'am' : 'en'))}
        onCurrencyToggle={() => setCurrency((prev) => (prev === 'ETB' ? 'USD' : 'ETB'))}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenRewards={() => setIsRewardsModalOpen(true)}
        onOpenKitchenHelper={() => {
          const btn = document.querySelector('button[aria-label="Toggle Ethiopian Kitchen Helper Timer"]') as HTMLButtonElement | null;
          if (btn) btn.click();
        }}
      />

      {/* Main Page Layout with Movable Transition Layers & Ambient Spice Motion */}
      <main className="flex-1 relative overflow-hidden">
        {/* Ambient Floating Spice Atmosphere across the page */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
          <div className="absolute top-[8%] left-[12%] w-2 h-2 rounded-full bg-[#B3240D]/35 blur-[0.5px] animate-ambient-spice" style={{ animationDelay: '0s', animationDuration: '16s' }} />
          <div className="absolute top-[22%] right-[15%] w-2.5 h-2.5 rounded-full bg-[#E69500]/40 blur-[0.5px] animate-ambient-spice" style={{ animationDelay: '3s', animationDuration: '14s' }} />
          <div className="absolute top-[38%] left-[8%] w-2 h-2 rounded-full bg-[#942F12]/35 blur-[0.5px] animate-ambient-spice" style={{ animationDelay: '6s', animationDuration: '18s' }} />
          <div className="absolute top-[52%] right-[10%] w-3 h-3 rounded-full bg-[#D49942]/35 blur-[0.5px] animate-ambient-spice" style={{ animationDelay: '2s', animationDuration: '15s' }} />
          <div className="absolute top-[68%] left-[16%] w-2 h-2 rounded-full bg-[#3D5A2E]/30 blur-[0.5px] animate-ambient-spice" style={{ animationDelay: '5s', animationDuration: '17s' }} />
          <div className="absolute top-[82%] right-[18%] w-2.5 h-2.5 rounded-full bg-[#FF5E1E]/35 blur-[0.5px] animate-ambient-spice" style={{ animationDelay: '8s', animationDuration: '13s' }} />
        </div>
        {/* 1. Hero Section */}
        <Hero
          language={language}
          currency={currency}
          products={PRODUCTS}
          onSelectProduct={(p) => setDetailProduct(p)}
        />

        {/* Partition 1: Hero to Products (Bubbling Red Chili Peppers & Cardamom Seeds) */}
        <MovableLayerDivider theme="bubbling-peppers" />

        {/* 2. 4 Premium Spices Catalog */}
        <ProductsSection
          language={language}
          currency={currency}
          products={PRODUCTS}
          onAddToCart={handleAddToCart}
          onOpenProductDetail={(p) => setDetailProduct(p)}
        />

        {/* Partition 2: Products to Global Market (Simmering Golden Shiro Broth & Herbs) */}
        <MovableLayerDivider theme="simmering-shiro" flip={true} />

        {/* 3. Global Market Features (Air Shipping Tracker, Recipe Compass) */}
        <GlobalMarketFeatures
          language={language}
          currency={currency}
          products={PRODUCTS}
          onAddSingleToCart={handleAddToCart}
        />

        {/* Partition 3: Global Features to Heritage (Toasted Highland Barley & Grains) */}
        <MovableLayerDivider theme="roasted-grains" />

        {/* 4. Four Spices, One Heritage Section */}
        <AboutProductsSection
          language={language}
          products={PRODUCTS}
          onSelectProduct={(p) => setDetailProduct(p)}
        />

        {/* Partition 4: Heritage to Story (Traditional Ethiopian Woven Tibeb Loom Ribbon) */}
        <MovableLayerDivider theme="woven-tibeb" />

        {/* 5. Our Story & What Makes Us Different */}
        <StoryAndValuesSection language={language} />

        {/* Partition 5: Story to Who We Serve (Fiery Mitmita Embers, Cloves & Sea Salt) */}
        <MovableLayerDivider theme="fiery-mitmita-embers" flip={true} />

        {/* 6. Who We Serve (Animated Cards & Word Dialogue Bubbles) */}
        <WhoWeServeSection language={language} />

        {/* Partition 6: Who We Serve to Feedback & Gallery (Korarima Botanicals & Koseret Leaves) */}
        <MovableLayerDivider theme="korarima-botanicals" />

        {/* 7. Customer Feedback & Packaging Craftsmanship Gallery */}
        <ReviewsAndGallerySection language={language} />

        {/* Partition 7: Gallery to Contact (Aromatic Roasting Smoke & Coffee Hearth Swirls) */}
        <MovableLayerDivider theme="aromatic-roasting-smoke" />

        {/* 8. Contact & Inquiries Section */}
        <ContactSection language={language} />
      </main>

      {/* Footer */}
      <Footer
        language={language}
        onOpenKitchenHelper={() => {
          // If user clicks from footer, it triggers the widget button
          const btn = document.querySelector('button[aria-label="Toggle Ethiopian Kitchen Helper Timer"]') as HTMLButtonElement | null;
          if (btn) btn.click();
        }}
      />

      {/* Floating Kitchen Helper Countdown Timer Widget */}
      <KitchenHelperWidget language={language} />

      {/* Slide-over Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        products={PRODUCTS}
        currency={currency}
        language={language}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Multi-Rail Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        products={PRODUCTS}
        currency={currency}
        language={language}
        rewards={rewards}
        onClearCart={handleClearCart}
        onApplyRewards={handleApplyRewards}
      />

      {/* Q'mem Heritage Rewards Account Modal */}
      <RewardsModal
        isOpen={isRewardsModalOpen}
        onClose={() => setIsRewardsModalOpen(false)}
        rewards={rewards}
        currency={currency}
        language={language}
        onOpenShop={() => {
          setIsRewardsModalOpen(false);
          document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Detailed Spice / Recipe Modal */}
      <ProductDetailModal
        product={detailProduct}
        onClose={() => setDetailProduct(null)}
        currency={currency}
        language={language}
        onAddToCart={handleAddToCart}
      />

      {/* Floating Bottom Quick Cart Button on Mobile if cart has items */}
      {totalCartCount > 0 && !isCartOpen && !isCheckoutOpen && (
        <div className="fixed bottom-5 right-5 z-40 sm:hidden">
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#942F12] text-white shadow-xl font-bold text-xs active:scale-95 transition-all"
            aria-label="View shopping bag"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Bag ({totalCartCount})</span>
          </button>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#30120B] text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 border border-[#F2871A]/40 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#F2871A]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
