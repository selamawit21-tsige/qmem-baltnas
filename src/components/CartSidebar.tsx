import React from 'react';
import { CartItem, Currency, Language, Product } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { SpiceVisual } from './SpiceVisual';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  products: Product[];
  currency: Currency;
  language: Language;
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({
  isOpen,
  onClose,
  items,
  products,
  currency,
  language,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const t = TRANSLATIONS[language].cart;

  if (!isOpen) return null;

  // Calculate subtotal
  const subtotal = items.reduce((acc, item) => {
    const unitPrice =
      currency === 'ETB' ? item.unitPrice.etb : item.unitPrice.usd;
    return acc + unitPrice * item.quantity;
  }, 0);

  const subtotalStr =
    currency === 'ETB'
      ? `${subtotal.toLocaleString()} ETB`
      : `$${subtotal.toFixed(2)}`;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FDFBF7] shadow-2xl flex flex-col border-l border-[#E5D7BF] animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#EADFCB] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#942F12]" />
              <h3 className="font-bold text-lg text-[#30120B]">
                {t.title} ({items.reduce((s, i) => s + i.quantity, 0)})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#7A6658] hover:text-[#30120B] rounded-lg hover:bg-[#F5ECE0] transition-colors"
              aria-label="Close Shopping Bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F5ECE0] flex items-center justify-center text-[#942F12]">
                  <ShoppingBag className="w-8 h-8 opacity-70" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-base text-[#30120B]">
                    {t.emptyTitle}
                  </h4>
                  <p className="text-xs text-[#7A6658] max-w-xs">
                    {t.emptyDesc}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-[#942F12] text-white text-xs font-bold hover:bg-[#7D240B] transition-colors"
                >
                  {t.exploreProducts}
                </button>
              </div>
            ) : (
              items.map((item) => {
                const product = products.find((p) => p.id === item.productId);
                if (!product) return null;

                const itemTotal =
                  currency === 'ETB'
                    ? `${(item.unitPrice.etb * item.quantity).toLocaleString()} ETB`
                    : `$${(item.unitPrice.usd * item.quantity).toFixed(2)}`;

                return (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 rounded-xl bg-white border border-[#EADBCA] shadow-2xs"
                  >
                    {/* Small Product Visual */}
                    <div className="w-18 h-18 shrink-0 rounded-lg overflow-hidden border border-[#EADBCA]">
                      <SpiceVisual productId={item.productId} className="w-full h-full" />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-bold text-sm text-[#30120B]">
                            {product.name[language]}
                          </h4>
                          <span className="text-[11px] font-semibold text-[#8C3A14] bg-[#F9EFE2] px-2 py-0.5 rounded inline-block mt-0.5">
                            {item.weight}
                          </span>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[#9E8A7E] hover:text-[#B3240D] p-1 transition-colors"
                          aria-label={`Remove ${product.name[language]} from bag`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Quantity Stepper & Price */}
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#F5ECE0]">
                        <div className="flex items-center border border-[#DACBB5] rounded-md bg-[#FAF7F2]">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 hover:bg-[#EFE4D3] text-[#554238] rounded-l-md transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold font-mono">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 hover:bg-[#EFE4D3] text-[#554238] rounded-r-md transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-bold text-[#30120B] tabular-nums font-mono">
                          {itemTotal}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer with Subtotal & Proceed Button */}
          {items.length > 0 && (
            <div className="p-6 bg-white border-t border-[#EADFCB] space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-base">
                  <span className="font-semibold text-[#5C493E]">{t.subtotal}</span>
                  <span className="font-extrabold text-[#30120B] tabular-nums font-mono text-lg">
                    {subtotalStr}
                  </span>
                </div>
                <p className="text-[11px] text-[#8C7667]">
                  {t.freeShippingNote}
                </p>

                {/* Heritage Points Earn Preview */}
                <div className="flex items-center gap-1.5 p-2 rounded-lg bg-[#FAF5EB] text-[11px] font-semibold text-[#8C462E] border border-[#EADBCA]">
                  <Sparkles className="w-3.5 h-3.5 text-[#F2871A] shrink-0" />
                  <span>
                    You will earn ~{Math.max(10, Math.floor(currency === 'ETB' ? subtotal / 10 : subtotal * 10))} Heritage Points on this order!
                  </span>
                </div>
              </div>

              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-4 rounded-xl bg-[#942F12] text-white font-bold text-sm hover:bg-[#7D240B] shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <span>{t.checkoutBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
