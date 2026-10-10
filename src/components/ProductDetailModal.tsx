import React from 'react';
import { Currency, Language, Product, ProductWeight } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { SpiceVisual } from './SpiceVisual';
import { X, Flame, Utensils, CheckCircle2, ShoppingBag } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  currency: Currency;
  language: Language;
  onAddToCart: (product: Product, weight: ProductWeight, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  currency,
  language,
  onAddToCart,
}) => {
  const [weight, setWeight] = React.useState<ProductWeight>('500g');
  const [qty, setQty] = React.useState(1);
  const [added, setAdded] = React.useState(false);

  if (!product) return null;

  const t = TRANSLATIONS[language].products;
  const price = product.prices[weight];
  const formattedPrice =
    currency === 'ETB'
      ? `${(price.etb * qty).toLocaleString()} ETB`
      : `$${(price.usd * qty).toFixed(2)}`;

  const handleAdd = () => {
    onAddToCart(product, weight, qty);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FDFBF7] rounded-3xl shadow-2xl border border-[#E5D7BF] overflow-hidden my-6">
        {/* Header */}
        <div className="relative">
          <SpiceVisual productId={product.id} className="w-full h-56" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-xs text-white text-xs font-bold px-3 py-1 rounded-md">
            {product.badgeText[language]}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-[#942F12] font-bold uppercase tracking-wider">
              <span>{product.subtitle[language]}</span>
              <span>·</span>
              <div className="flex items-center text-[#E03E15]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Flame
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < product.heatLevel
                        ? 'fill-[#E03E15] text-[#E03E15]'
                        : 'text-gray-300 fill-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
            <h3 className="text-3xl font-bold font-serif-luxury text-[#30120B]">
              {product.name[language]}
            </h3>
            <p className="text-sm text-[#5D4A3F] leading-relaxed">
              {product.description[language]}
            </p>
          </div>

          {/* Heritage Quote */}
          <div className="p-4 rounded-xl bg-[#FAF2E6] border-l-4 border-[#942F12] text-xs sm:text-sm text-[#5C4538] italic">
            &ldquo;{product.heritageStory[language]}&rdquo;
          </div>

          {/* Flavor Notes & Ingredients */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-white border border-[#E8DEC8] space-y-2">
              <span className="font-bold text-[#30120B] uppercase tracking-wide block">
                Flavor Bouquet:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.flavorNotes[language].map((f, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-[#F4EDE2] text-[#553E31]"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#E8DEC8] space-y-2">
              <span className="font-bold text-[#30120B] uppercase tracking-wide block">
                Recommended For:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.bestFor[language].map((d, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-[#F4EDE2] text-[#553E31]"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Preparation Tip */}
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8DEC8] text-xs text-[#5D4B41]">
            <Utensils className="w-4 h-4 text-[#942F12] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#30120B]">Mother&apos;s Kitchen Secret: </span>
              <span>{product.prepTip[language]}</span>
            </div>
          </div>

          {/* Purchase Controls inside Modal */}
          <div className="pt-4 border-t border-[#E8DEC8] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setWeight('500g')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                  weight === '500g'
                    ? 'border-[#942F12] bg-[#942F12] text-white'
                    : 'border-[#DACBB5] text-[#554238]'
                }`}
              >
                500g
              </button>
              <button
                type="button"
                onClick={() => setWeight('1kg')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                  weight === '1kg'
                    ? 'border-[#942F12] bg-[#942F12] text-white'
                    : 'border-[#DACBB5] text-[#554238]'
                }`}
              >
                1kg Export
              </button>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
              <span className="font-mono font-bold text-lg text-[#30120B]">
                {formattedPrice}
              </span>
              <button
                onClick={handleAdd}
                className="px-6 py-2.5 rounded-xl bg-[#942F12] text-white text-xs font-bold hover:bg-[#7D240B] flex items-center gap-1.5 shadow-md"
              >
                {added ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Added!</span>
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
        </div>
      </div>
    </div>
  );
};
