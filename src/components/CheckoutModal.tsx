import React, { useState } from 'react';
import {
  CartItem,
  Currency,
  CustomerDetails,
  Language,
  OrderConfirmation,
  PaymentMethod,
  Product,
  RewardsAccount,
} from '../types';
import { TRANSLATIONS } from '../data/translations';
import { calculateDiscountFromPoints, calculatePointsEarned } from '../data/rewards';
import {
  X,
  CreditCard,
  Building,
  Smartphone,
  Truck,
  MessageSquare,
  CheckCircle2,
  Copy,
  Check,
  Printer,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Award,
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  products: Product[];
  currency: Currency;
  language: Language;
  rewards: RewardsAccount;
  onClearCart: () => void;
  onApplyRewards: (pointsRedeemed: number, pointsEarned: number, orderId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  products,
  currency,
  language,
  rewards,
  onClearCart,
  onApplyRewards,
}) => {
  const t = TRANSLATIONS[language].checkout;

  // Multi-step state: 1 = Details, 2 = Payment, 3 = Confirmation
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Rewards points to redeem
  const [pointsToRedeem, setPointsToRedeem] = useState<number>(0);

  // Form details
  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: '',
    phone: '',
    email: '',
    city: 'Addis Ababa',
    address: '',
    deliveryType: 'local',
    notes: '',
  });

  // Selected payment method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('telebirr');
  const [paymentRef, setPaymentRef] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  // Confirmation result
  const [confirmation, setConfirmation] = useState<OrderConfirmation | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  if (!isOpen) return null;

  // Pricing math
  const subtotal = items.reduce((acc, item) => {
    const unitPrice =
      currency === 'ETB' ? item.unitPrice.etb : item.unitPrice.usd;
    return acc + unitPrice * item.quantity;
  }, 0);

  // Rewards discount calculation
  const rewardsDiscount = calculateDiscountFromPoints(pointsToRedeem, currency);
  const pointsToEarn = calculatePointsEarned(subtotal, currency, rewards.tier);

  // Free shipping threshold for local Addis Ababa if subtotal >= 2500 ETB
  const isFreeLocalShipping = customer.deliveryType === 'local' && subtotal >= 2500;
  const shippingFee =
    customer.deliveryType === 'local'
      ? isFreeLocalShipping
        ? 0
        : currency === 'ETB'
        ? 200
        : 2
      : currency === 'ETB'
      ? 1800
      : 25; // International air shipping estimate

  const total = Math.max(0, subtotal - rewardsDiscount) + shippingFee;

  const formatPrice = (amount: number) => {
    return currency === 'ETB'
      ? `${amount.toLocaleString()} ETB`
      : `$${amount.toFixed(2)}`;
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.fullName || !customer.phone || !customer.address) return;
    setStep(2);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const uniqueId = `QB-${new Date().getFullYear()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    const newConfirmation: OrderConfirmation = {
      orderId: uniqueId,
      items: [...items],
      customer: { ...customer },
      paymentMethod,
      currency,
      subtotal,
      shippingFee,
      rewardsDiscount: rewardsDiscount > 0 ? rewardsDiscount : undefined,
      pointsRedeemed: pointsToRedeem > 0 ? pointsToRedeem : undefined,
      pointsEarned: pointsToEarn,
      total,
      createdAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      paymentReference: paymentRef || (paymentMethod === 'chapa_stripe' ? 'AUTH_CARD_OK' : undefined),
    };

    onApplyRewards(pointsToRedeem, pointsToEarn, uniqueId);
    setConfirmation(newConfirmation);
    setStep(3);
    onClearCart();
  };

  const copyOrderId = () => {
    if (!confirmation) return;
    navigator.clipboard.writeText(confirmation.orderId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const printReceipt = () => {
    window.print();
  };

  // WhatsApp order text generator
  const getWhatsAppUrl = () => {
    if (!confirmation) return '';
    const itemLines = confirmation.items
      .map((it) => {
        const prod = products.find((p) => p.id === it.productId);
        const name = prod ? prod.name.en : it.productId;
        return `• ${name} (${it.weight}) x${it.quantity}`;
      })
      .join('%0A');

    const msg = `Hello Q'mem Baltna!%0AI have placed an order:%0A*Order ID:* ${confirmation.orderId}%0A*Customer:* ${confirmation.customer.fullName} (${confirmation.customer.phone})%0A*Delivery City:* ${confirmation.customer.city}%0A*Total:* ${formatPrice(confirmation.total)}%0A*Payment:* ${confirmation.paymentMethod}%0A%0A*Items:*%0A${itemLines}%0A%0APlease confirm my order delivery.`;
    return `https://wa.me/251903195454?text=${msg}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FDFBF7] rounded-3xl shadow-2xl border border-[#E5D7BF] overflow-hidden my-6">
        {/* Modal Top Bar */}
        <div className="px-6 py-5 bg-white border-b border-[#E8DEC8] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#942F12]">
              Q&apos;mem Baltna Storefront
            </span>
            <h2 className="text-xl font-bold text-[#30120B] font-serif-luxury">
              {step === 3 ? t.orderSuccessTitle : t.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#7A6658] hover:text-[#30120B] rounded-xl hover:bg-[#F5ECE0] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Indicator (for Steps 1 & 2) */}
        {step !== 3 && (
          <div className="px-6 py-3 bg-[#F8F2E6] border-b border-[#EADBCA] flex items-center justify-between text-xs font-semibold text-[#665449]">
            <div
              className={`flex items-center gap-1.5 ${
                step === 1 ? 'text-[#942F12] font-bold' : ''
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-[#942F12] text-white flex items-center justify-center text-[10px]">
                1
              </span>
              <span>{t.step1}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#C9BAA6]" />
            <div
              className={`flex items-center gap-1.5 ${
                step === 2 ? 'text-[#942F12] font-bold' : ''
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  step === 2 ? 'bg-[#942F12] text-white' : 'bg-[#E0D0BB] text-[#554238]'
                }`}
              >
                2
              </span>
              <span>{t.step2}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#C9BAA6]" />
            <div className="flex items-center gap-1.5 text-[#A18F80]">
              <span className="w-5 h-5 rounded-full bg-[#E0D0BB] text-[#554238] flex items-center justify-center text-[10px]">
                3
              </span>
              <span>{t.step3}</span>
            </div>
          </div>
        )}

        {/* Step 1: Customer Details & Delivery Form */}
        {step === 1 && (
          <form onSubmit={handleDetailsSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Delivery Destination Segmented Toggle */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#554238] uppercase">
                {t.deliveryType} *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setCustomer({
                      ...customer,
                      deliveryType: 'local',
                      city: 'Addis Ababa',
                    })
                  }
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    customer.deliveryType === 'local'
                      ? 'border-[#942F12] bg-[#FAF1E3] ring-1 ring-[#942F12]'
                      : 'border-[#DACBB5] bg-white hover:bg-[#F9F6F0]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#30120B]">
                      {t.localDelivery}
                    </span>
                    <Truck className="w-4 h-4 text-[#942F12]" />
                  </div>
                  <span className="text-xs text-[#7A6658] mt-1 block">
                    Same-day / Next-day courier inside Addis Ababa
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setCustomer({
                      ...customer,
                      deliveryType: 'international',
                      city: 'International City',
                    })
                  }
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    customer.deliveryType === 'international'
                      ? 'border-[#942F12] bg-[#FAF1E3] ring-1 ring-[#942F12]'
                      : 'border-[#DACBB5] bg-white hover:bg-[#F9F6F0]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#30120B]">
                      {t.internationalDelivery}
                    </span>
                    <ShieldCheck className="w-4 h-4 text-[#942F12]" />
                  </div>
                  <span className="text-xs text-[#7A6658] mt-1 block">
                    Export courier via Ethiopian Airlines Cargo / DHL
                  </span>
                </button>
              </div>
            </div>

            {/* Input Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#554238] uppercase mb-1">
                  {t.fullName} *
                </label>
                <input
                  type="text"
                  required
                  value={customer.fullName}
                  onChange={(e) =>
                    setCustomer({ ...customer, fullName: e.target.value })
                  }
                  placeholder="e.g. Almaz Bekele"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DACBB5] text-sm text-[#30120B] focus:outline-none focus:ring-2 focus:ring-[#942F12] bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#554238] uppercase mb-1">
                  {t.phone} *
                </label>
                <input
                  type="tel"
                  required
                  value={customer.phone}
                  onChange={(e) =>
                    setCustomer({ ...customer, phone: e.target.value })
                  }
                  placeholder="+251 912 34 56 78"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DACBB5] text-sm text-[#30120B] focus:outline-none focus:ring-2 focus:ring-[#942F12] bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#554238] uppercase mb-1">
                  {t.email} *
                </label>
                <input
                  type="email"
                  required
                  value={customer.email}
                  onChange={(e) =>
                    setCustomer({ ...customer, email: e.target.value })
                  }
                  placeholder="you@domain.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DACBB5] text-sm text-[#30120B] focus:outline-none focus:ring-2 focus:ring-[#942F12] bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#554238] uppercase mb-1">
                  {t.city} *
                </label>
                <input
                  type="text"
                  required
                  value={customer.city}
                  onChange={(e) =>
                    setCustomer({ ...customer, city: e.target.value })
                  }
                  placeholder="e.g. Addis Ababa / Washington DC"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DACBB5] text-sm text-[#30120B] focus:outline-none focus:ring-2 focus:ring-[#942F12] bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#554238] uppercase mb-1">
                {t.address} *
              </label>
              <textarea
                required
                rows={2}
                value={customer.address}
                onChange={(e) =>
                  setCustomer({ ...customer, address: e.target.value })
                }
                placeholder="Street address, building, floor, apartment number, landmark..."
                className="w-full px-4 py-2.5 rounded-xl border border-[#DACBB5] text-sm text-[#30120B] focus:outline-none focus:ring-2 focus:ring-[#942F12] bg-white"
              />
            </div>

            {/* Quick Order Totals Recap */}
            <div className="p-4 rounded-xl bg-[#F8F2E6] border border-[#EADBCA] flex items-center justify-between text-xs">
              <div>
                <span className="font-semibold text-[#554238]">Items: {items.reduce((s, i) => s + i.quantity, 0)}</span>
                <span className="mx-2 text-[#C9BAA6]">·</span>
                <span className="font-semibold text-[#554238]">Est. Shipping: {formatPrice(shippingFee)}</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-[#942F12] text-sm tabular-nums font-mono">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-[#DACBB5] text-[#554238] text-sm font-semibold hover:bg-[#F5ECE0]"
              >
                Back to Bag
              </button>
              <button
                type="submit"
                className="px-7 py-2.5 rounded-xl bg-[#942F12] text-white text-sm font-bold hover:bg-[#7D240B] shadow-md flex items-center gap-1.5"
              >
                <span>Continue to Payment</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Payment Rail Selection */}
        {step === 2 && (
          <form onSubmit={handlePlaceOrder} className="p-6 sm:p-8 space-y-6">
            <div className="space-y-3">
              <label className="block text-xs font-bold text-[#554238] uppercase">
                {t.paymentMethodTitle}
              </label>

              {/* 5 Payment Methods as specified in brief */}
              <div className="space-y-2.5">
                {/* 1. Telebirr */}
                <label
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'telebirr'
                      ? 'border-[#942F12] bg-[#FAF1E3] ring-1 ring-[#942F12]'
                      : 'border-[#DACBB5] bg-white hover:bg-[#F9F6F0]'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="telebirr"
                    checked={paymentMethod === 'telebirr'}
                    onChange={() => setPaymentMethod('telebirr')}
                    className="mt-1 text-[#942F12] focus:ring-[#942F12]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-[#1C69D4]" />
                      <span className="font-bold text-sm text-[#30120B]">
                        Telebirr Mobile Payment
                      </span>
                      <span className="text-[10px] font-bold bg-[#E6F0FF] text-[#1C69D4] px-1.5 py-0.5 rounded">
                        Ethiopia Instant
                      </span>
                    </div>
                    <p className="text-xs text-[#7A6658] mt-0.5">
                      {t.telebirrDesc}
                    </p>

                    {paymentMethod === 'telebirr' && (
                      <div className="mt-3 p-3 rounded-lg bg-white border border-[#E0D0BA] text-xs space-y-2 animate-in fade-in">
                        <div className="flex items-center justify-between text-[#30120B]">
                          <span>Telebirr Merchant Code:</span>
                          <span className="font-mono font-bold text-[#942F12]">
                            QMEM-903195
                          </span>
                        </div>
                        <p className="text-[11px] text-[#7A6658]">
                          Open Telebirr App &rarr; Pay Merchant &rarr; Enter Amount: <strong>{formatPrice(total)}</strong>.
                        </p>
                        <div>
                          <label className="block text-[11px] font-semibold text-[#554238] mb-0.5">
                            Transaction Reference Number:
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. TLB829384729"
                            value={paymentRef}
                            onChange={(e) => setPaymentRef(e.target.value)}
                            className="w-full px-3 py-1.5 border border-[#DACBB5] rounded text-xs bg-[#FAF7F2]"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </label>

                {/* 2. Chapa / International Card / Stripe */}
                <label
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'chapa_stripe'
                      ? 'border-[#942F12] bg-[#FAF1E3] ring-1 ring-[#942F12]'
                      : 'border-[#DACBB5] bg-white hover:bg-[#F9F6F0]'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="chapa_stripe"
                    checked={paymentMethod === 'chapa_stripe'}
                    onChange={() => setPaymentMethod('chapa_stripe')}
                    className="mt-1 text-[#942F12] focus:ring-[#942F12]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#2E6B34]" />
                      <span className="font-bold text-sm text-[#30120B]">
                        Chapa / International Cards (Visa, Mastercard, Stripe)
                      </span>
                      <span className="text-[10px] font-bold bg-[#EBF5EE] text-[#2E6B34] px-1.5 py-0.5 rounded">
                        Diaspora & Global
                      </span>
                    </div>
                    <p className="text-xs text-[#7A6658] mt-0.5">
                      {t.chapaStripeDesc}
                    </p>

                    {paymentMethod === 'chapa_stripe' && (
                      <div className="mt-3 p-3 rounded-lg bg-white border border-[#E0D0BA] text-xs space-y-2 animate-in fade-in">
                        <div>
                          <label className="block text-[11px] font-semibold text-[#554238] mb-0.5">
                            Card Number
                          </label>
                          <input
                            type="text"
                            placeholder="4000 1234 5678 9010"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full px-3 py-1.5 border border-[#DACBB5] rounded text-xs font-mono"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] font-semibold text-[#554238] mb-0.5">
                              MM / YY
                            </label>
                            <input
                              type="text"
                              placeholder="08/28"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              className="w-full px-3 py-1.5 border border-[#DACBB5] rounded text-xs font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-[#554238] mb-0.5">
                              CVC
                            </label>
                            <input
                              type="text"
                              placeholder="849"
                              value={cardCvc}
                              onChange={(e) => setCardCvc(e.target.value)}
                              className="w-full px-3 py-1.5 border border-[#DACBB5] rounded text-xs font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </label>

                {/* 3. Bank Transfer */}
                <label
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'bank_transfer'
                      ? 'border-[#942F12] bg-[#FAF1E3] ring-1 ring-[#942F12]'
                      : 'border-[#DACBB5] bg-white hover:bg-[#F9F6F0]'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank_transfer"
                    checked={paymentMethod === 'bank_transfer'}
                    onChange={() => setPaymentMethod('bank_transfer')}
                    className="mt-1 text-[#942F12] focus:ring-[#942F12]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-[#8C3A14]" />
                      <span className="font-bold text-sm text-[#30120B]">
                        Bank Transfer (CBE / Awash / Abyssinia)
                      </span>
                    </div>
                    <p className="text-xs text-[#7A6658] mt-0.5">
                      {t.bankDesc}
                    </p>

                    {paymentMethod === 'bank_transfer' && (
                      <div className="mt-3 p-3 rounded-lg bg-white border border-[#E0D0BA] text-xs space-y-1.5 animate-in fade-in">
                        <div className="flex justify-between">
                          <span className="text-[#6B574B]">Commercial Bank of Ethiopia:</span>
                          <span className="font-mono font-bold text-[#30120B]">
                            1000 4829 3847 2
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#6B574B]">Awash Bank:</span>
                          <span className="font-mono font-bold text-[#30120B]">
                            0132 0948 2938 00
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#6B574B]">Account Name:</span>
                          <span className="font-bold text-[#942F12]">
                            Nobe Business Holdings / Q&apos;mem Baltna
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </label>

                {/* 4. Cash on Delivery */}
                <label
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'cash_on_delivery'
                      ? 'border-[#942F12] bg-[#FAF1E3] ring-1 ring-[#942F12]'
                      : 'border-[#DACBB5] bg-white hover:bg-[#F9F6F0]'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash_on_delivery"
                    checked={paymentMethod === 'cash_on_delivery'}
                    onChange={() => setPaymentMethod('cash_on_delivery')}
                    className="mt-1 text-[#942F12] focus:ring-[#942F12]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#7A4518]" />
                      <span className="font-bold text-sm text-[#30120B]">
                        Cash on Delivery (Addis Ababa)
                      </span>
                    </div>
                    <p className="text-xs text-[#7A6658] mt-0.5">
                      {t.codDesc}
                    </p>
                  </div>
                </label>

                {/* 5. Contact for Payment */}
                <label
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'contact'
                      ? 'border-[#942F12] bg-[#FAF1E3] ring-1 ring-[#942F12]'
                      : 'border-[#DACBB5] bg-white hover:bg-[#F9F6F0]'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="contact"
                    checked={paymentMethod === 'contact'}
                    onChange={() => setPaymentMethod('contact')}
                    className="mt-1 text-[#942F12] focus:ring-[#942F12]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-[#25D366]" />
                      <span className="font-bold text-sm text-[#30120B]">
                        Contact Representative for Custom Payment
                      </span>
                    </div>
                    <p className="text-xs text-[#7A6658] mt-0.5">
                      {t.contactDesc}
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Q'mem Heritage Rewards Redemption Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#FAF5EC] to-[#F3E8D5] border border-[#E2D2BC] shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#942F12] text-[#F2871A] flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#30120B]">
                      Q&apos;mem Heritage Rewards
                    </h4>
                    <span className="text-[11px] text-[#7A6658]">
                      Available Balance: <strong>{rewards.points} pts</strong> ({formatPrice(calculateDiscountFromPoints(rewards.points, currency))} value)
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase text-[#2E6B34] bg-[#EBF5EE] px-2 py-0.5 rounded border border-[#CDE5D1]">
                    +{pointsToEarn} pts to earn
                  </span>
                </div>
              </div>

              {/* Redemption Preset Buttons */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-bold text-[#554238] block">
                  Redeem Points for Instant Cash Discount:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setPointsToRedeem(0)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      pointsToRedeem === 0
                        ? 'bg-[#30120B] text-white border-[#30120B]'
                        : 'bg-white border-[#DACBB5] text-[#554238] hover:bg-[#FAF6EE]'
                    }`}
                  >
                    No Points (0)
                  </button>

                  {rewards.points >= 100 && (
                    <button
                      type="button"
                      onClick={() => setPointsToRedeem(100)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        pointsToRedeem === 100
                          ? 'bg-[#942F12] text-white border-[#942F12] shadow-xs'
                          : 'bg-white border-[#DACBB5] text-[#554238] hover:bg-[#FAF6EE]'
                      }`}
                    >
                      Redeem 100 pts (-{formatPrice(calculateDiscountFromPoints(100, currency))})
                    </button>
                  )}

                  {rewards.points >= 250 && (
                    <button
                      type="button"
                      onClick={() => setPointsToRedeem(250)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        pointsToRedeem === 250
                          ? 'bg-[#942F12] text-white border-[#942F12] shadow-xs'
                          : 'bg-white border-[#DACBB5] text-[#554238] hover:bg-[#FAF6EE]'
                      }`}
                    >
                      Redeem 250 pts (-{formatPrice(calculateDiscountFromPoints(250, currency))})
                    </button>
                  )}

                  {rewards.points > 250 && (
                    <button
                      type="button"
                      onClick={() => setPointsToRedeem(rewards.points)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        pointsToRedeem === rewards.points
                          ? 'bg-[#942F12] text-white border-[#942F12] shadow-xs'
                          : 'bg-white border-[#DACBB5] text-[#554238] hover:bg-[#FAF6EE]'
                      }`}
                    >
                      Max ({rewards.points} pts · -{formatPrice(calculateDiscountFromPoints(rewards.points, currency))})
                    </button>
                  )}
                </div>
              </div>

              {pointsToRedeem > 0 && (
                <div className="flex items-center justify-between text-xs font-bold text-[#2E6B34] bg-white p-2.5 rounded-xl border border-[#CDE5D1]">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Loyalty Discount Applied:</span>
                  </div>
                  <span>-{formatPrice(rewardsDiscount)} ({pointsToRedeem} points redeemed)</span>
                </div>
              )}
            </div>

            {/* Total Recap */}
            <div className="p-4 rounded-xl bg-white border border-[#EADBCA] space-y-2">
              <div className="space-y-1 text-xs text-[#635043]">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-mono font-bold text-[#30120B]">{formatPrice(subtotal)}</span>
                </div>
                {rewardsDiscount > 0 && (
                  <div className="flex justify-between text-[#2E6B34] font-semibold">
                    <span>Heritage Rewards Discount:</span>
                    <span className="font-mono">-{formatPrice(rewardsDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="font-mono">{formatPrice(shippingFee)}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#F2ECE1] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#7A6658] block">Total to Pay:</span>
                  <span className="text-xl font-black text-[#942F12] tabular-nums font-mono">
                    {formatPrice(total)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-semibold text-[#2E6B34] bg-[#EBF5EE] px-2.5 py-1 rounded-md block">
                    +{pointsToEarn} Heritage Points Earned
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-2.5 rounded-xl border border-[#DACBB5] text-[#554238] text-sm font-semibold hover:bg-[#F5ECE0]"
              >
                Back to Details
              </button>
              <button
                type="submit"
                className="px-7 py-2.5 rounded-xl bg-[#942F12] text-white text-sm font-bold hover:bg-[#7D240B] shadow-md flex items-center gap-1.5"
              >
                <span>{t.completeOrder}</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Order Confirmation Voucher */}
        {step === 3 && confirmation && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-[#EBF5EE] text-[#2E6B34] rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold font-serif-luxury text-[#30120B]">
                {t.orderSuccessTitle}
              </h3>
              <p className="text-xs sm:text-sm text-[#614E43] max-w-md mx-auto">
                {t.orderSuccessSub}
              </p>
            </div>

            {/* Order Voucher Box */}
            <div className="p-5 rounded-2xl bg-white border-2 border-dashed border-[#DACBB5] space-y-4">
              {/* Top Banner with Unique Order ID */}
              <div className="flex items-center justify-between border-b border-[#F2EAE0] pb-3">
                <div>
                  <span className="text-[11px] text-[#7A6658] uppercase font-bold block">
                    {t.orderIdLabel}
                  </span>
                  <span className="font-mono text-xl font-black text-[#942F12]">
                    {confirmation.orderId}
                  </span>
                </div>
                <button
                  onClick={copyOrderId}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border border-[#DACBB5] hover:bg-[#F5ECE0] text-[#554238] transition-colors"
                >
                  {copiedId ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#2E6B34]" />
                      <span>{t.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{t.copyOrderId}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Order Info Details */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[#7A6658] block">Customer:</span>
                  <span className="font-bold text-[#30120B]">
                    {confirmation.customer.fullName}
                  </span>
                </div>
                <div>
                  <span className="text-[#7A6658] block">Phone:</span>
                  <span className="font-bold text-[#30120B]">
                    {confirmation.customer.phone}
                  </span>
                </div>
                <div>
                  <span className="text-[#7A6658] block">Destination:</span>
                  <span className="font-bold text-[#30120B]">
                    {confirmation.customer.city} ({confirmation.customer.deliveryType})
                  </span>
                </div>
                <div>
                  <span className="text-[#7A6658] block">Payment Rail:</span>
                  <span className="font-bold text-[#942F12] uppercase">
                    {confirmation.paymentMethod.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Itemized List */}
              <div className="border-t border-[#F2EAE0] pt-3 space-y-2">
                <span className="text-[11px] font-bold text-[#7A6658] uppercase block">
                  Items Ordered:
                </span>
                {confirmation.items.map((it) => {
                  const prod = products.find((p) => p.id === it.productId);
                  const name = prod ? prod.name[language] : it.productId;
                  const itemPrice =
                    confirmation.currency === 'ETB'
                      ? `${(it.unitPrice.etb * it.quantity).toLocaleString()} ETB`
                      : `$${(it.unitPrice.usd * it.quantity).toFixed(2)}`;

                  return (
                    <div
                      key={it.id}
                      className="flex items-center justify-between text-xs"
                    >
                      <span className="text-[#4F3C32]">
                        {name} ({it.weight}) &times; {it.quantity}
                      </span>
                      <span className="font-mono font-bold text-[#30120B]">
                        {itemPrice}
                      </span>
                    </div>
                  );
                })}

                {confirmation.rewardsDiscount && (
                  <div className="flex items-center justify-between text-xs text-[#2E6B34] font-semibold">
                    <span>Heritage Rewards ({confirmation.pointsRedeemed} pts redeemed):</span>
                    <span className="font-mono">-{formatPrice(confirmation.rewardsDiscount)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-[#6B574A]">
                  <span>Shipping:</span>
                  <span className="font-mono">{formatPrice(confirmation.shippingFee)}</span>
                </div>

                <div className="border-t border-[#F2EAE0] pt-2 flex items-center justify-between text-xs font-bold text-[#30120B]">
                  <span>Total Amount Paid / Payable:</span>
                  <span className="text-base text-[#942F12] font-mono font-black">
                    {formatPrice(confirmation.total)}
                  </span>
                </div>

                {confirmation.pointsEarned && (
                  <div className="p-2.5 rounded-xl bg-[#FAF6EE] border border-[#EADBCA] flex items-center justify-between text-xs font-semibold text-[#8C462E]">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#F2871A]" />
                      <span>Heritage Rewards Earned:</span>
                    </div>
                    <span className="font-mono font-bold text-[#2E6B34]">+{confirmation.pointsEarned} pts</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] text-white font-bold text-xs hover:bg-[#1EBE5D] flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t.sendWhatsApp}</span>
              </a>

              <button
                onClick={printReceipt}
                className="py-3 px-4 rounded-xl border border-[#DACBB5] text-[#554238] font-bold text-xs hover:bg-[#F5ECE0] flex items-center justify-center gap-1.5 transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print Receipt</span>
              </button>

              <button
                onClick={onClose}
                className="py-3 px-5 rounded-xl bg-[#942F12] text-white font-bold text-xs hover:bg-[#7D240B] shadow-sm transition-colors"
              >
                {t.continueShopping}
              </button>
            </div>

            <p className="text-center text-[11px] text-[#8C7667]">
              {t.poweredByNote} · Nobe Business Holdings
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
