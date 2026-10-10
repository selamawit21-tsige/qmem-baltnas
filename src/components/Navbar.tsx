import React, { useState } from 'react';
import { Currency, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { BrandLogo } from './BrandLogo';
import { ShoppingBag, Globe, Menu, X, Sparkles, ChefHat } from 'lucide-react';

interface NavbarProps {
  language: Language;
  currency: Currency;
  cartCount: number;
  rewardsPoints: number;
  onLanguageToggle: () => void;
  onCurrencyToggle: () => void;
  onOpenCart: () => void;
  onOpenRewards: () => void;
  onOpenKitchenHelper?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  currency,
  cartCount,
  rewardsPoints,
  onLanguageToggle,
  onCurrencyToggle,
  onOpenCart,
  onOpenRewards,
  onOpenKitchenHelper,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[language].nav;

  const navLinks = [
    { label: t.home, href: '#home' },
    { label: t.products, href: '#products' },
    { label: t.about, href: '#about' },
    { label: t.heritage, href: '#heritage' },
    { label: t.whoWeServe, href: '#who-we-serve' },
    { label: t.contact, href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E8DEC8]/80 transition-colors">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3 sm:gap-4">
        {/* Zone 1: Brand Wordmark & Emblem */}
        <a
          href="#home"
          className="flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#942F12] rounded-md transition-transform hover:scale-[1.01]"
          aria-label="Q'mem Baltna Home"
        >
          <BrandLogo className="h-10 sm:h-12" />
        </a>

        {/* Zone 2: Primary Nav Links (Desktop only) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-[#503E33]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap hover:text-[#942F12] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#942F12] hover:after:w-full after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3 Desktop: Currency, Language, Rewards, Cart (Hidden on Mobile) */}
        <div className="hidden lg:flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Currency Toggle (ETB / USD) */}
          <button
            onClick={onCurrencyToggle}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold tracking-wide rounded-lg border border-[#DACBB5] text-[#503E33] hover:bg-[#F3EAD8] hover:border-[#942F12]/40 transition-colors focus-visible:ring-2 focus-visible:ring-[#942F12]"
            title="Switch Currency between Ethiopian Birr (ETB) and USD"
            aria-label={`Current currency: ${currency}. Click to switch.`}
          >
            <span className={currency === 'ETB' ? 'text-[#942F12]' : 'text-[#857064]'}>
              ETB
            </span>
            <span className="text-[#DACBB5] font-normal">/</span>
            <span className={currency === 'USD' ? 'text-[#942F12]' : 'text-[#857064]'}>
              USD
            </span>
          </button>

          {/* Language Toggle (EN / AM) */}
          <button
            onClick={onLanguageToggle}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-[#DACBB5] text-[#503E33] hover:bg-[#F3EAD8] hover:border-[#942F12]/40 transition-colors focus-visible:ring-2 focus-visible:ring-[#942F12]"
            title="Switch Language between English and Amharic"
            aria-label={`Current language: ${language.toUpperCase()}. Click to switch.`}
          >
            <Globe className="w-3.5 h-3.5 text-[#942F12]" />
            <span className="font-bold">{language === 'en' ? 'አማ' : 'EN'}</span>
          </button>

          {/* Heritage Rewards Button */}
          <button
            onClick={onOpenRewards}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold rounded-lg border border-[#DACBB5] bg-[#FAF5EB] text-[#30120B] hover:bg-[#F3EAD8] hover:border-[#942F12]/40 transition-colors focus-visible:ring-2 focus-visible:ring-[#942F12]"
            title="View Q'mem Heritage Rewards Loyalty Account"
            aria-label={`Heritage Rewards: ${rewardsPoints} points. Click to view.`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F2871A]" />
            <span className="font-mono tabular-nums text-[#942F12]">{rewardsPoints}</span>
            <span className="text-[10px] text-[#7A6658]">pts</span>
          </button>

          {/* Shopping Bag Trigger Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center justify-center p-2.5 rounded-lg bg-[#942F12] text-white hover:bg-[#7D240B] active:scale-95 transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-[#942F12]"
            aria-label={`Open shopping cart with ${cartCount} items`}
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 bg-[#F2871A] text-white text-[11px] font-black rounded-full flex items-center justify-center shadow-md animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Zone 3 Mobile: ONLY Toggle Button (Clean header with zero clutter) */}
        <div className="lg:hidden flex items-center shrink-0">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="relative p-2.5 rounded-xl border border-[#DACBB5] bg-white/80 text-[#30120B] hover:bg-[#F3EAD8] active:scale-95 transition-all shadow-xs"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            {cartCount > 0 && !mobileMenuOpen && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-[#F2871A] text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu (Contains Cart, Currency, Language, Rewards, Navigation, & Cooking Helper) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8DEC8] bg-[#FDFBF7] px-4 pt-3.5 pb-6 space-y-3.5 shadow-2xl animate-in slide-in-from-top duration-200 max-h-[calc(100vh-4.5rem)] overflow-y-auto">
          {/* Quick Cart Banner */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCart();
            }}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-[#942F12] text-white shadow-sm active:scale-[0.99] transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="relative p-2 rounded-lg bg-white/15">
                <ShoppingBag className="w-5 h-5 text-white" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-[#F2871A] text-white text-[10px] font-black rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="text-left">
                <div className="text-sm font-bold leading-tight">
                  {language === 'am' ? 'የግዢ ቅርጫት' : 'Shopping Bag'}
                </div>
                <div className="text-[11px] text-[#FFE0D2] leading-tight mt-0.5">
                  {cartCount > 0
                    ? `${cartCount} ${cartCount === 1 ? 'item' : 'items'} in order`
                    : (language === 'am' ? 'ባዶ ነው · ቅመሞችን ይዘዙ' : 'Your bag is empty')}
                </div>
              </div>
            </div>
            <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30">
              {cartCount > 0 ? (language === 'am' ? 'ይመልከቱ' : 'View') : (language === 'am' ? 'ይምረጡ' : 'Shop')}
            </span>
          </button>

          {/* Dual Toggle Bar: Currency and Language */}
          <div className="grid grid-cols-2 gap-2">
            {/* Currency switch */}
            <div className="p-2.5 rounded-xl border border-[#DACBB5] bg-white flex flex-col justify-between">
              <span className="text-[10px] uppercase font-bold text-[#8A7568] tracking-wider">
                {language === 'am' ? 'የገንዘብ አይነት' : 'Currency'}
              </span>
              <div className="flex items-center gap-1 mt-1.5">
                <button
                  onClick={() => {
                    if (currency !== 'ETB') onCurrencyToggle();
                  }}
                  className={`flex-1 py-1 text-xs font-bold rounded-md transition-all ${
                    currency === 'ETB'
                      ? 'bg-[#942F12] text-white shadow-xs'
                      : 'text-[#634E42] hover:bg-[#F3EAD8]'
                  }`}
                >
                  ETB (ብር)
                </button>
                <button
                  onClick={() => {
                    if (currency !== 'USD') onCurrencyToggle();
                  }}
                  className={`flex-1 py-1 text-xs font-bold rounded-md transition-all ${
                    currency === 'USD'
                      ? 'bg-[#942F12] text-white shadow-xs'
                      : 'text-[#634E42] hover:bg-[#F3EAD8]'
                  }`}
                >
                  USD ($)
                </button>
              </div>
            </div>

            {/* Language switch */}
            <div className="p-2.5 rounded-xl border border-[#DACBB5] bg-white flex flex-col justify-between">
              <span className="text-[10px] uppercase font-bold text-[#8A7568] tracking-wider">
                {language === 'am' ? 'ቋንቋ' : 'Language'}
              </span>
              <div className="flex items-center gap-1 mt-1.5">
                <button
                  onClick={() => {
                    if (language !== 'en') onLanguageToggle();
                  }}
                  className={`flex-1 py-1 text-xs font-bold rounded-md transition-all ${
                    language === 'en'
                      ? 'bg-[#942F12] text-white shadow-xs'
                      : 'text-[#634E42] hover:bg-[#F3EAD8]'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => {
                    if (language !== 'am') onLanguageToggle();
                  }}
                  className={`flex-1 py-1 text-xs font-bold rounded-md transition-all ${
                    language === 'am'
                      ? 'bg-[#942F12] text-white shadow-xs'
                      : 'text-[#634E42] hover:bg-[#F3EAD8]'
                  }`}
                >
                  አማርኛ
                </button>
              </div>
            </div>
          </div>

          {/* Heritage Rewards Account Card */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenRewards();
            }}
            className="w-full flex items-center justify-between p-3 rounded-xl border border-[#DACBB5] bg-[#FAF5EB] text-[#30120B] hover:bg-[#F3EAD8] transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#F2871A]/20 text-[#942F12] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#F2871A]" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-[#30120B]">
                  {language === 'am' ? 'የቅመም ቅርስ ሽልማት' : "Q'mem Heritage Rewards"}
                </div>
                <div className="text-[10px] text-[#7A6658]">
                  {language === 'am' ? 'ነጥቦች እና ቅናሾች' : 'Loyalty Points & Redeem Discounts'}
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="font-mono text-sm font-black text-[#942F12]">{rewardsPoints}</span>
              <span className="text-[10px] text-[#7A6658] ml-1">pts</span>
            </div>
          </button>

          {/* Ethiopian Kitchen Helper Timers Launcher */}
          {onOpenKitchenHelper && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenKitchenHelper();
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-[#E0D0B7] bg-[#FFFBF5] text-[#30120B] hover:bg-[#F5ECE0] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#30120B] text-[#F2871A] flex items-center justify-center">
                  <ChefHat className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-[#30120B]">
                    {language === 'am' ? 'የሀበሻ ኩሽና አጋዥ ሰዓት' : 'Habesha Kitchen Helper'}
                  </div>
                  <div className="text-[10px] text-[#7A6658]">
                    {language === 'am' ? 'የዶሮ ወጥ፣ ሽሮ እና እሸት ቆላ ሰዓት' : 'Cooking countdowns & step audio chimes'}
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold text-[#942F12] px-2.5 py-1 rounded-md bg-[#FAF0E4]">
                {language === 'am' ? 'ክፈት' : 'Open'}
              </span>
            </button>
          )}

          {/* Navigation Links */}
          <div className="space-y-1 pt-2 border-t border-[#E8DEC8]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-semibold text-[#503E33] hover:text-[#942F12] hover:bg-[#F5ECE0] rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Primary CTA */}
          <div className="pt-1">
            <a
              href="#products"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-3 text-center font-bold text-white bg-[#942F12] rounded-xl shadow-md hover:bg-[#7D240B] transition-colors text-sm"
            >
              {t.orderNow}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
