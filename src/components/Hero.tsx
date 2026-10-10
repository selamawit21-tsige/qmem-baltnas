import React from 'react';
import { Currency, Language, Product } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { SpiceVisual } from './SpiceVisual';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  language: Language;
  currency: Currency;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  currency,
  products,
  onSelectProduct,
}) => {
  const t = TRANSLATIONS[language].hero;

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-[#F9F5EC] via-[#FDFBF7] to-[#FDFBF7] pt-12 pb-20 border-b border-[#EADFCB]/60"
    >
      {/* Decorative Warm Ambient Glow Background */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#F2871A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-[#942F12]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Brand Story & Call to Actions */}
          <div className="lg:col-span-6 space-y-7 z-10">
            {/* 100% Organic Eye-Catching Bold Pill */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E5224] text-white text-xs sm:text-sm font-extrabold tracking-wider uppercase shadow-lg shadow-[#1E5224]/20 border border-[#3E8E48]">
                <span className="w-2 h-2 rounded-full bg-[#70E000] animate-ping" />
                <span className="font-black text-amber-200">100% ORGANIC</span>
                <span className="text-white/80">·</span>
                <span className="tracking-normal font-bold">EXPORT CERTIFIED</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF1E3] border border-[#E0D0B7] text-[#7A240C] text-xs font-bold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#F2871A]" />
                <span>HABESHA RECIPES</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#30120B] leading-[1.12] text-balance font-serif-luxury">
              {t.headline}
            </h1>

            {/* Sub-headline */}
            <p className="text-lg sm:text-xl text-[#5E4A3F] leading-relaxed max-w-xl">
              {t.subheadline}
            </p>

            {/* Mother's Memory Emotional Anchor */}
            <div className="border-l-3 border-[#942F12] pl-4 py-1 italic text-[#63200E] font-medium text-base bg-[#F8EFE4]/60 rounded-r-lg">
              {t.quote}
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#942F12] text-white font-bold text-base shadow-lg shadow-[#942F12]/20 hover:bg-[#7D240B] active:scale-[0.98] transition-all"
              >
                <span>{t.ctaOrder}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#about"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl border-2 border-[#D8C7B0] text-[#422216] font-semibold text-base hover:bg-[#F3E9DA] hover:border-[#942F12]/40 transition-colors"
              >
                {t.ctaStory}
              </a>
            </div>

            {/* Export & Quality Pillars */}
            <div className="grid grid-cols-2 gap-2.5 pt-4 border-t border-[#E8DEC8]">
              {t.guaranteePillars.map((pillar, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-[#57443A]">
                  <CheckCircle2 className="w-4 h-4 text-[#2E6B34] shrink-0" />
                  <span className={idx === 0 ? "font-black text-[#1E5224] text-sm" : "truncate"}>
                    {pillar}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Floating 4 Premium Products with Shine Animation */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Floating Container Grid */}
              <div className="grid grid-cols-2 gap-4 sm:gap-5">
                {products.map((prod, idx) => {
                  const floatClass =
                    idx % 2 === 0 ? 'animate-float-slow' : 'animate-float-delayed';
                  const price =
                    currency === 'ETB'
                      ? `${prod.prices['500g'].etb.toLocaleString()} ETB`
                      : `$${prod.prices['500g'].usd}`;

                  return (
                    <div
                      key={prod.id}
                      onClick={() => onSelectProduct(prod)}
                      className={`group relative cursor-pointer rounded-2xl bg-white border border-[#E8DEC8] p-3 shadow-md hover:shadow-xl hover:border-[#942F12]/50 hover:-translate-y-1.5 transition-all duration-300 ${floatClass}`}
                    >
                      {/* Product Visual Container with Shine */}
                      <div className="relative overflow-hidden rounded-xl">
                        <SpiceVisual
                          productId={prod.id}
                          className="w-full h-32 sm:h-36"
                          isFloatingHero={true}
                        />

                        {/* Top Badge */}
                        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                          {prod.badgeText[language]}
                        </div>
                      </div>

                      {/* Product Info Card Footer */}
                      <div className="mt-3 flex items-start justify-between gap-1">
                        <div>
                          <h2 className="font-bold text-sm text-[#30120B] group-hover:text-[#942F12] transition-colors">
                            {prod.name[language]}
                          </h2>
                          <p className="text-[11px] text-[#786357] line-clamp-1 mt-0.5">
                            {prod.subtitle[language]}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs font-bold text-[#942F12] tabular-nums font-mono">
                            {price}
                          </span>
                          <span className="block text-[9px] text-[#9A8477]">500g</span>
                        </div>
                      </div>

                      {/* Subtle hover prompt */}
                      <div className="mt-2 pt-2 border-t border-[#F2ECE1] text-[11px] text-[#942F12] font-semibold flex items-center justify-between opacity-80 group-hover:opacity-100">
                        <span>Details & Order</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Central Seal Indicator */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-[#30120B] text-[#FFF4E8] text-xs font-semibold py-1.5 px-4 rounded-full shadow-lg border border-[#F2871A]/40 flex items-center gap-2 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-[#F2871A] animate-ping" />
                <span>Nobe Business Holdings · Export Grade</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
