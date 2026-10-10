import React, { useState } from 'react';
import { Currency, Language, RewardsAccount } from '../types';
import { TIERS_CONFIG } from '../data/rewards';
import {
  X,
  Award,
  Sparkles,
  Gift,
  Share2,
  Copy,
  Check,
  TrendingUp,
  History,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';

interface RewardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  rewards: RewardsAccount;
  currency: Currency;
  language: Language;
  onOpenShop: () => void;
}

export const RewardsModal: React.FC<RewardsModalProps> = ({
  isOpen,
  onClose,
  rewards,
  currency,
  language,
  onOpenShop,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const tierConfig = TIERS_CONFIG[rewards.tier];
  const cashValue =
    currency === 'ETB'
      ? `${rewards.points.toLocaleString()} ETB`
      : `$${(rewards.points / 100).toFixed(2)}`;

  // Next tier math
  const nextTierPoints =
    rewards.tier === 'apprentice'
      ? 500
      : rewards.tier === 'connoisseur'
      ? 1500
      : rewards.tier === 'master'
      ? 3000
      : 3000;

  const progressPercent = Math.min(
    100,
    Math.round((rewards.lifetimePoints / nextTierPoints) * 100)
  );

  const copyReferral = () => {
    navigator.clipboard.writeText(rewards.referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FDFBF7] rounded-3xl shadow-2xl border border-[#E5D7BF] overflow-hidden my-6">
        {/* Top Header Banner with Luxury Terracotta/Gold gradient */}
        <div className="bg-gradient-to-r from-[#30120B] via-[#521C11] to-[#30120B] text-[#FFF5EB] p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F2871A]/15 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-start justify-between relative z-10">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#F2871A] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Q&apos;mem Heritage Rewards</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-white">
                Loyalty &amp; Heritage Account
              </h2>
              <p className="text-xs text-[#DEC8B9]">
                Earn points with every authentic spice order. Redeem for instant checkout discounts.
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close Rewards Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Points Balance Big Stat Box */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#F2871A] block">
                Available Points Balance
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl sm:text-4xl font-black font-mono tabular-nums text-white">
                  {rewards.points.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-[#EADFCB]">points</span>
              </div>
              <span className="text-xs text-[#DEC8BA] block mt-0.5">
                = <strong>{cashValue}</strong> discount value
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#F2871A] block">
                  Current Tier Status
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <Award className="w-5 h-5 text-[#F2871A]" />
                  <span className="text-lg font-bold text-white">
                    {tierConfig.name[language]}
                  </span>
                </div>
              </div>
              <span className="text-[11px] text-[#DEC8BA] block mt-1">
                {tierConfig.perk[language]}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Tier Progress Bar */}
          <div className="p-4 rounded-2xl bg-white border border-[#EADBCA] shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#30120B]">
                Lifetime Points Progress: {rewards.lifetimePoints} / {nextTierPoints}
              </span>
              <span className="font-mono font-bold text-[#942F12]">
                {progressPercent}%
              </span>
            </div>
            <div className="w-full h-2.5 bg-[#F2ECE1] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#942F12] to-[#F2871A] rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-[11px] text-[#7A6658]">
              {rewards.lifetimePoints >= 3000
                ? 'You have achieved the highest Heritage Matriarch status!'
                : `Earn ${nextTierPoints - rewards.lifetimePoints} more points to reach the next tier.`}
            </p>
          </div>

          {/* Referral & Invite Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF6EE] border border-[#EADBCA] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#942F12] uppercase">
                <Gift className="w-4 h-4 text-[#F2871A]" />
                <span>Refer Friends &amp; Diaspora Family</span>
              </div>
              <p className="text-xs text-[#5C4A3E]">
                Share your personal code. Friends get <strong>100 ETB / $1 off</strong> their first order, and you earn <strong>150 bonus points</strong>!
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="font-mono font-bold text-xs bg-white px-3 py-2 rounded-xl border border-[#DACBB5] text-[#30120B]">
                {rewards.referralCode}
              </span>
              <button
                onClick={copyReferral}
                className="p-2 rounded-xl bg-[#942F12] text-white hover:bg-[#7D240B] transition-colors"
                title="Copy referral code"
              >
                {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Points Ledger / Activity History */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#30120B] uppercase">
              <History className="w-4 h-4 text-[#942F12]" />
              <span>Recent Points Ledger</span>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {rewards.history.map((tx) => (
                <div
                  key={tx.id}
                  className="p-3 rounded-xl bg-white border border-[#EADBCA] flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-[#30120B] block">
                      {tx.description[language]}
                    </span>
                    <span className="text-[10px] text-[#8C7667]">{tx.timestamp}</span>
                  </div>
                  <span
                    className={`font-mono font-bold text-sm ${
                      tx.points > 0 ? 'text-[#2E6B34]' : 'text-[#B3240D]'
                    }`}
                  >
                    {tx.points > 0 ? `+${tx.points}` : tx.points} pts
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-4 border-t border-[#EADBCA] flex items-center justify-between">
            <span className="text-xs text-[#7A6658]">
              Points can be applied directly at checkout.
            </span>
            <button
              onClick={() => {
                onClose();
                onOpenShop();
              }}
              className="px-6 py-2.5 rounded-xl bg-[#942F12] text-white text-xs font-bold hover:bg-[#7D240B] transition-colors shadow-sm"
            >
              Shop Spices &amp; Redeem
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
