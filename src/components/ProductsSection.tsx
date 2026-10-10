import React, { useState } from 'react';
import { Currency, Language, Product, ProductWeight } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { SpiceVisual } from './SpiceVisual';
import { ShoppingBag, Flame, Plus, Minus, Info, Check } from 'lucide-react';

interface ProductsSectionProps {
  language: Language;
  currency: Currency;
  products: Product[];
  onAddToCart: (product: Product, weight: ProductWeight, quantity: number) => void;
  onOpenProductDetail: (product: Product) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  language,
  currency,
  products,
  onAddToCart,
  onOpenProductDetail,
}) => {
  const t = TRANSLATIONS[language].products;

  // Track weight and quantity per product
  const [selectedWeights, setSelectedWeights] = useState<Record<string, ProductWeight>>({
    berbere: '500g',
    shiro: '500g',
    mitmita: '500g',
    genfo: '500g',
  });

  const [quantities, setQuantities] = useState<Record<string, number>>({
    berbere: 1,
    shiro: 1,
    mitmita: 1,
    genfo: 1,
  });

  const [addedNotice, setAddedNotice] = useState<Record<string, boolean>>({});

  const handleWeightChange = (productId: string, weight: ProductWeight) => {
    setSelectedWeights((prev) => ({ ...prev, [productId]: weight }));
  };

  const handleQuantityChange = (productId: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[productId] || 1;
      const next = Math.max(1, Math.min(20, current + delta));
      return { ...prev, [productId]: next };
    });
  };

  const handleAdd = (product: Product) => {
    const weight = selectedWeights[product.id] || '500g';
    const qty = quantities[product.id] || 1;
    onAddToCart(product, weight, qty);

    setAddedNotice((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedNotice((prev) => ({ ...prev, [product.id]: false }));
    }, 1800);
  };

  return (
    <section id="products" className="py-24 bg-[#FDFBF7] scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E5224] text-white text-xs font-black tracking-wider uppercase shadow-sm">
            <span className="text-[#9EF01A] font-black">100% ORGANIC</span>
            <span className="text-white/60">·</span>
            <span>SANITARY EXPORT-READY PACKAGING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#30120B] font-serif-luxury tracking-tight">
            {t.sectionTitle}
          </h2>
          <p className="text-base sm:text-lg text-[#614F44] leading-relaxed">
            {t.sectionSubtitle}
          </p>
        </div>

        {/* 4-Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          {products.map((product) => {
            const currentWeight = selectedWeights[product.id] || '500g';
            const currentQty = quantities[product.id] || 1;
            const priceObj = product.prices[currentWeight];
            const priceFormatted =
              currency === 'ETB'
                ? `${(priceObj.etb * currentQty).toLocaleString()} ETB`
                : `$${(priceObj.usd * currentQty).toFixed(2)}`;
            const unitPriceStr =
              currency === 'ETB'
                ? `${priceObj.etb.toLocaleString()} ETB`
                : `$${priceObj.usd}`;

            return (
              <div
                key={product.id}
                className="flex flex-col bg-white rounded-2xl border border-[#E8DEC8] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:border-[#942F12]/40"
              >
                {/* Visual Header */}
                <div className="relative">
                  <SpiceVisual
                    productId={product.id}
                    className="w-full h-48"
                  />
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase">
                    {product.badgeText[language]}
                  </div>

                  {/* Quick Detail Trigger */}
                  <button
                    onClick={() => onOpenProductDetail(product)}
                    className="absolute bottom-3 right-3 p-2 rounded-lg bg-white/90 backdrop-blur-xs text-[#30120B] hover:bg-white hover:text-[#942F12] shadow-sm transition-colors"
                    title={t.viewRecipe}
                    aria-label={`View culinary details for ${product.name[language]}`}
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>

                {/* Card Body */}
                <div className="flex-1 p-5 flex flex-col justify-between space-y-4">
                  {/* Title & Metadata (Unboxed text with dots) */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs text-[#7B685C]">
                      <span className="font-black text-[#1E5224]">100% Organic</span>
                      <span aria-hidden="true">·</span>
                      <span>{t.exportPackaged}</span>
                      <span aria-hidden="true">·</span>
                      <div className="flex items-center text-[#E03E15]">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Flame
                            key={i}
                            className={`w-3 h-3 ${
                              i < product.heatLevel
                                ? 'fill-[#E03E15] text-[#E03E15]'
                                : 'text-gray-300 fill-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-[#30120B] leading-snug">
                      {product.name[language]}
                    </h3>
                    <p className="text-xs font-semibold text-[#8C462E]">
                      {product.subtitle[language]}
                    </p>

                    <p className="text-xs text-[#5D4B40] leading-relaxed line-clamp-3 pt-1">
                      {product.description[language]}
                    </p>
                  </div>

                  {/* Weight Selector Segmented Tabs */}
                  <div className="space-y-2 pt-2 border-t border-[#F2ECE1]">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#665347]">{t.selectSize}</span>
                      <span className="font-bold text-[#942F12] tabular-nums font-mono">
                        {unitPriceStr}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 p-1 bg-[#F9F6F0] rounded-xl border border-[#E6DBCA]">
                      <button
                        type="button"
                        onClick={() => handleWeightChange(product.id, '500g')}
                        className={`py-2 text-xs font-bold rounded-lg transition-all ${
                          currentWeight === '500g'
                            ? 'bg-[#942F12] text-white shadow-sm'
                            : 'text-[#614F44] hover:text-[#30120B]'
                        }`}
                      >
                        {t.per500g}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleWeightChange(product.id, '1kg')}
                        className={`py-2 text-xs font-bold rounded-lg transition-all ${
                          currentWeight === '1kg'
                            ? 'bg-[#942F12] text-white shadow-sm'
                            : 'text-[#614F44] hover:text-[#30120B]'
                        }`}
                      >
                        {t.per1kg}
                      </button>
                    </div>
                  </div>

                  {/* Quantity Stepper & Price Calculation */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center border border-[#DACBB5] rounded-lg bg-white">
                      <button
                        onClick={() => handleQuantityChange(product.id, -1)}
                        className="p-1.5 text-[#503E33] hover:bg-[#F5ECE0] rounded-l-lg transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold tabular-nums font-mono">
                        {currentQty}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(product.id, 1)}
                        className="p-1.5 text-[#503E33] hover:bg-[#F5ECE0] rounded-r-lg transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-sm sm:text-base font-extrabold text-[#30120B] tabular-nums font-mono block">
                        {priceFormatted}
                      </span>
                    </div>
                  </div>

                  {/* Primary Add to Cart Button */}
                  <button
                    onClick={() => handleAdd(product)}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                      addedNotice[product.id]
                        ? 'bg-[#2E6B34] text-white'
                        : 'bg-[#942F12] text-white hover:bg-[#7D240B] shadow-sm'
                    }`}
                  >
                    {addedNotice[product.id] ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Bag</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>{t.addToCart}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
