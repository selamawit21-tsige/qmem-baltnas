export type ProductId = 'berbere' | 'shiro' | 'mitmita' | 'genfo';

export type ProductWeight = '500g' | '1kg';

export type Currency = 'ETB' | 'USD';

export type Language = 'en' | 'am';

export interface PriceTier {
  etb: number;
  usd: number;
}

export interface Product {
  id: ProductId;
  name: {
    en: string;
    am: string;
  };
  subtitle: {
    en: string;
    am: string;
  };
  tagline: {
    en: string;
    am: string;
  };
  description: {
    en: string;
    am: string;
  };
  heritageStory: {
    en: string;
    am: string;
  };
  ingredients: {
    en: string[];
    am: string[];
  };
  bestFor: {
    en: string[];
    am: string[];
  };
  flavorNotes: {
    en: string[];
    am: string[];
  };
  heatLevel: number; // 0 to 5
  prepTip: {
    en: string;
    am: string;
  };
  prices: {
    '500g': PriceTier;
    '1kg': PriceTier;
  };
  accentColor: string;
  badgeText: {
    en: string;
    am: string;
  };
}

export interface CartItem {
  id: string; // `${productId}-${weight}`
  productId: ProductId;
  weight: ProductWeight;
  quantity: number;
  unitPrice: PriceTier;
}

export type PaymentMethod = 
  | 'telebirr' 
  | 'chapa_stripe' 
  | 'bank_transfer' 
  | 'cash_on_delivery' 
  | 'contact';

export interface CustomerDetails {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  deliveryType: 'local' | 'international';
  notes?: string;
}

export interface OrderConfirmation {
  orderId: string;
  items: CartItem[];
  customer: CustomerDetails;
  paymentMethod: PaymentMethod;
  currency: Currency;
  subtotal: number;
  shippingFee: number;
  rewardsDiscount?: number;
  pointsRedeemed?: number;
  pointsEarned?: number;
  total: number;
  createdAt: string;
  paymentReference?: string;
}

export type RewardsTier = 'apprentice' | 'connoisseur' | 'master' | 'matriarch';

export interface RewardsTransaction {
  id: string;
  type: 'welcome' | 'earned' | 'redeemed' | 'referral';
  points: number; // positive for earned, negative for redeemed
  description: {
    en: string;
    am: string;
  };
  timestamp: string;
}

export interface RewardsAccount {
  points: number;
  lifetimePoints: number;
  tier: RewardsTier;
  memberSince: string;
  referralCode: string;
  history: RewardsTransaction[];
}
