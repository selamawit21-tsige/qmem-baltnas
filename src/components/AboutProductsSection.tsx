import React from 'react';
import { Language, Product } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Sparkles, Utensils, HeartHandshake, ShieldCheck } from 'lucide-react';

interface AboutProductsSectionProps {
  language: Language;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const AboutProductsSection: React.FC<AboutProductsSectionProps> = ({
  language,
  products,
  onSelectProduct,
}) => {
  const t = TRANSLATIONS[language].aboutProducts;

  return (
    <section id="heritage" className="py-20 bg-[#F7F2E7] border-y border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#942F12]">
            <Sparkles className="w-4 h-4 text-[#F2871A]" />
            <span>Habesha Heritage & Culinary Art</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#30120B] font-serif-luxury tracking-tight">
            {t.title}
          </h2>
          <p className="text-base sm:text-lg text-[#665448]">
            {t.subtitle}
          </p>
        </div>

        {/* 4 Spices Heritage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E4D7C2] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Header with Title and Heat/Type */}
                <div className="flex items-start justify-between gap-4 border-b border-[#F2EAE0] pb-4">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#942F12]">
                      {product.subtitle[language]}
                    </span>
                    <h3 className="text-2xl font-bold text-[#30120B] mt-0.5">
                      {product.name[language]}
                    </h3>
                  </div>

                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#FAF3E6] border border-[#ECDCC4] text-[#7A3614]">
                    {product.badgeText[language]}
                  </span>
                </div>

                {/* Narrative description */}
                <p className="text-sm sm:text-base text-[#523E33] leading-relaxed">
                  {product.description[language]}
                </p>

                {/* Heritage origin secret */}
                <div className="bg-[#FBF8F2] border-l-3 border-[#942F12] p-3.5 rounded-r-lg text-xs sm:text-sm text-[#5E473A] italic">
                  &ldquo;{product.heritageStory[language]}&rdquo;
                </div>

                {/* Culinary Pairings */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#30120B] uppercase tracking-wider">
                    <Utensils className="w-3.5 h-3.5 text-[#942F12]" />
                    <span>Best Paired In:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.bestFor[language].map((dish, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-medium text-[#4D3628] bg-[#F4EDE2] px-2.5 py-1 rounded-md"
                      >
                        {dish}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Ingredients Transparency */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-xs font-bold text-[#30120B] uppercase tracking-wider block">
                    Authentic Natural Spices Included:
                  </span>
                  <p className="text-xs text-[#705C4F] leading-relaxed">
                    {product.ingredients[language].join(' · ')}
                  </p>
                </div>
              </div>

              {/* Bottom Quick Action */}
              <div className="pt-4 border-t border-[#F2EAE0] flex items-center justify-between">
                <span className="text-xs font-semibold text-[#826959]">
                  {product.prepTip[language]}
                </span>
                <button
                  onClick={() => onSelectProduct(product)}
                  className="text-xs font-bold text-[#942F12] hover:text-[#6E1C06] underline underline-offset-4 whitespace-nowrap shrink-0 ml-4"
                >
                  Order This Blend &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Export Standards Trust Banner */}
        <div className="mt-14 rounded-2xl bg-[#30120B] text-[#FFF4E8] p-8 sm:p-10 shadow-xl border border-[#F2871A]/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="space-y-2">
              <div className="flex items-center justify-center md:justify-start gap-2.5 text-[#F2871A]">
                <ShieldCheck className="w-6 h-6" />
                <h4 className="font-bold text-base text-white">Sanitary Export Seal</h4>
              </div>
              <p className="text-xs text-[#DEC8B9] leading-relaxed">
                Packaged in hermetically heat-sealed multi-barrier pouches that lock in sacred aromas through intercontinental transit.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-center md:justify-start gap-2.5 text-[#F2871A]">
                <HeartHandshake className="w-6 h-6" />
                <h4 className="font-bold text-base text-white">Zero Artificial Fillers</h4>
              </div>
              <p className="text-xs text-[#DEC8B9] leading-relaxed">
                Never adulterated with artificial red colorants or bulking flours. 100% pure sun-dried whole spices and herbs.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-center md:justify-start gap-2.5 text-[#F2871A]">
                <Sparkles className="w-6 h-6" />
                <h4 className="font-bold text-base text-white">Mother&apos;s Secret Ratios</h4>
              </div>
              <p className="text-xs text-[#DEC8B9] leading-relaxed">
                Balanced by generational matriarchal recipes so every batch carries the warmth of home cooking without compromise.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
