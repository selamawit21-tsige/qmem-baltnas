import { RewardsAccount, RewardsTier } from '../types';

export const INITIAL_REWARDS_ACCOUNT: RewardsAccount = {
  points: 250,
  lifetimePoints: 250,
  tier: 'apprentice',
  memberSince: 'October 2026',
  referralCode: 'QMEM-HERITAGE-8842',
  history: [
    {
      id: 'tx-welcome-01',
      type: 'welcome',
      points: 250,
      description: {
        en: 'Welcome Gift: Q’mem Heritage Rewards membership activated',
        am: 'የእንኳን ደህና መጡ ስጦታ፡ የቅመም ቅርስ ሽልማት አባልነት ተጀምሯል',
      },
      timestamp: 'Just now',
    },
  ],
};

export const TIERS_CONFIG: Record<
  RewardsTier,
  {
    name: { en: string; am: string };
    minPoints: number;
    multiplier: number;
    perk: { en: string; am: string };
    color: string;
  }
> = {
  apprentice: {
    name: { en: 'Spice Apprentice', am: 'የቅመም ጀማሪ' },
    minPoints: 0,
    multiplier: 1.0,
    perk: {
      en: 'Earn 1 pt per 10 ETB ($1) spent. Redeem anytime.',
      am: 'በየ 10 ብር ($1) 1 ነጥብ ያግኙ። በፈለጉት ጊዜ ይጠቀሙ።',
    },
    color: '#8C462E',
  },
  connoisseur: {
    name: { en: 'Korarima Connoisseur', am: 'ኮረሪማ አዋቂ' },
    minPoints: 500,
    multiplier: 1.25,
    perk: {
      en: '1.25× point earning boost + Free local Addis Ababa delivery.',
      am: '1.25× የነጥብ ጭማሪ + ነፃ የአዲስ አበባ ማጓጓዣ።',
    },
    color: '#C47A1F',
  },
  master: {
    name: { en: 'Gold Saffron Master', am: 'ወርቅ ቅመም ባለሙያ' },
    minPoints: 1500,
    multiplier: 1.5,
    perk: {
      en: '1.5× point multiplier + Priority seasonal harvest access.',
      am: '1.5× የነጥብ ጭማሪ + የልዩ ወቅት ምርቶች ቀዳሚ ተጠቃሚ።',
    },
    color: '#D4AF37',
  },
  matriarch: {
    name: { en: 'Heritage Matriarch', am: 'የባልትና እናት' },
    minPoints: 3000,
    multiplier: 2.0,
    perk: {
      en: '2.0× double points + Complimentary recipe collector box.',
      am: '2.0× እጥፍ ነጥቦች + የነፃ የምግብ አሰራር መጽሐፍ ስጦታ።',
    },
    color: '#942F12',
  },
};

export function calculateTier(lifetimePoints: number): RewardsTier {
  if (lifetimePoints >= 3000) return 'matriarch';
  if (lifetimePoints >= 1500) return 'master';
  if (lifetimePoints >= 500) return 'connoisseur';
  return 'apprentice';
}

/**
 * 100 points = 100 ETB (or $1 USD) discount
 */
export function calculateDiscountFromPoints(
  points: number,
  currency: 'ETB' | 'USD'
): number {
  if (currency === 'ETB') {
    return Math.floor(points); // 1 point = 1 ETB
  } else {
    return Number((points / 100).toFixed(2)); // 100 points = $1 USD
  }
}

/**
 * Calculate points earned based on subtotal amount
 */
export function calculatePointsEarned(
  subtotal: number,
  currency: 'ETB' | 'USD',
  tier: RewardsTier
): number {
  const mult = TIERS_CONFIG[tier].multiplier;
  let basePoints = 0;
  if (currency === 'ETB') {
    basePoints = Math.floor(subtotal / 10); // 1 pt per 10 ETB
  } else {
    basePoints = Math.floor(subtotal * 10); // 10 pts per $1 USD
  }
  return Math.max(10, Math.floor(basePoints * mult));
}
