import React, { useState } from 'react';
import { Currency, Language, Product, ProductWeight } from '../types';
import {
  Plane,
  BookOpen,
  Sparkles,
  Clock,
  ShieldCheck,
  ShoppingBag,
  Flame,
  ArrowRight,
  Globe2,
} from 'lucide-react';

interface GlobalMarketFeaturesProps {
  language: Language;
  currency: Currency;
  products: Product[];
  onAddSingleToCart: (product: Product, weight: ProductWeight, quantity: number) => void;
}

export const GlobalMarketFeatures: React.FC<GlobalMarketFeaturesProps> = ({
  language,
  currency,
  products,
  onAddSingleToCart,
}) => {
  const [activeTab, setActiveTab] = useState<'shipping' | 'recipes'>('shipping');

  // Global shipping calculator destinations
  const [selectedCountry, setSelectedCountry] = useState('US');

  const shippingDestinations: Record<
    string,
    { country: string; hub: string; days: string; airMethod: string; rateETB: number; rateUSD: number }
  > = {
    US: {
      country: 'United States',
      hub: 'Washington Dulles (IAD) / Atlanta / New York',
      days: '3–5 Business Days',
      airMethod: 'Ethiopian Cargo / DHL Express',
      rateETB: 1800,
      rateUSD: 24,
    },
    UK: {
      country: 'United Kingdom',
      hub: 'London Heathrow (LHR) / Manchester',
      days: '2–4 Business Days',
      airMethod: 'Direct Ethiopian Airlines Cargo',
      rateETB: 1600,
      rateUSD: 20,
    },
    DE: {
      country: 'Germany & EU',
      hub: 'Frankfurt (FRA) / Berlin / Paris',
      days: '3–4 Business Days',
      airMethod: 'Lufthansa Cargo / DHL International',
      rateETB: 1600,
      rateUSD: 22,
    },
    CA: {
      country: 'Canada',
      hub: 'Toronto Pearson (YYZ) / Calgary',
      days: '4–6 Business Days',
      airMethod: 'ET Cargo / Canada Post Priority',
      rateETB: 2000,
      rateUSD: 26,
    },
    AE: {
      country: 'United Arab Emirates',
      hub: 'Dubai (DXB) / Abu Dhabi',
      days: '2–3 Business Days',
      airMethod: 'Emirates SkyCargo / DHL Air',
      rateETB: 1400,
      rateUSD: 18,
    },
    SE: {
      country: 'Sweden & Scandinavia',
      hub: 'Stockholm Arlanda (ARN)',
      days: '3–5 Business Days',
      airMethod: 'SAS Cargo / PostNord Express',
      rateETB: 1750,
      rateUSD: 23,
    },
  };

  const currentShipping = shippingDestinations[selectedCountry] || shippingDestinations.US;

  // Recipe Compass Database
  const [selectedRecipe, setSelectedRecipe] = useState<'dorowat' | 'shirotegabino' | 'kitfo' | 'genfobreakfast'>('dorowat');

  const recipeDatabase = {
    dorowat: {
      title: 'Mother’s Doro Wat (Ethiopian Chicken Stew)',
      prepTime: '2.5 Hours · Slow Cooked',
      servings: '6–8 Servings',
      primarySpice: 'berbere' as const,
      primaryWeight: '1kg' as const,
      spiceRatio: '4–5 Tbsp Berbere Blend + 1 Tsp Korarima',
      secretTip: 'Caramelize onions for 45 minutes with no oil first; then add spiced butter and simmer Berbere on low heat to develop velvet crimson depth without bitterness.',
      heat: 4,
    },
    shirotegabino: {
      title: 'Sizzling Shiro Tegabino in Clay Pot',
      prepTime: '20 Minutes · Quick Comfort',
      servings: '4 Servings',
      primarySpice: 'shiro' as const,
      primaryWeight: '1kg' as const,
      spiceRatio: '1 Cup Pure Shiro Powder whisked into simmering onion broth',
      secretTip: 'Whisk Shiro in room-temperature broth before bringing to a rolling boil. Top with a spoonful of spiced butter and sliced fresh green chilies as it bubbles.',
      heat: 1,
    },
    kitfo: {
      title: 'Spiced Kitfo with Mitmita & Niter Kibbeh',
      prepTime: '15 Minutes · Highland Delicacy',
      servings: '3–4 Servings',
      primarySpice: 'mitmita' as const,
      primaryWeight: '500g' as const,
      spiceRatio: '1.5 Tbsp Artisan Mitmita with 4 Tbsp Spiced Clarified Butter',
      secretTip: 'Use fresh finely minced beef. Warm the spiced butter gently so the meat absorbs cardamom and chili warmth without cooking through.',
      heat: 5,
    },
    genfobreakfast: {
      title: 'Warm Genfo Porridge with Kibbeh Well',
      prepTime: '25 Minutes · Comfort Breakfast',
      servings: '2–3 Servings',
      primarySpice: 'genfo' as const,
      primaryWeight: '500g' as const,
      spiceRatio: '1.5 Cups Genfo Grains + 2 Cups Boiling Water + 1 Tsp Berbere for center well',
      secretTip: 'Stir vigorously with a wooden spatula while pouring boiling water into the roasted flour to prevent lumps. Create a center crater and fill with melted kibbeh and Berbere.',
      heat: 0,
    },
  };

  const currentRecipe = recipeDatabase[selectedRecipe];

  return (
    <section className="py-20 bg-[#FDFBF7] relative overflow-hidden border-t border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Clean, Non-Repetitive Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF2E4] text-[#8C3A14] text-xs font-bold uppercase tracking-wider">
            <Globe2 className="w-3.5 h-3.5" />
            <span>International Dispatch &amp; Kitchen Guide</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#30120B] font-serif-luxury tracking-tight">
            Global Delivery &amp; Culinary Compass
          </h2>
          <p className="text-sm sm:text-base text-[#665346] leading-relaxed">
            Direct air cargo to overseas communities and authentic traditional recipes straight from home.
          </p>
        </div>

        {/* 2 Focused Navigation Tabs */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#EFE6D5] border border-[#DFCBB2] gap-1">
            <button
              onClick={() => setActiveTab('shipping')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'shipping'
                  ? 'bg-[#942F12] text-white shadow-md'
                  : 'text-[#5A473D] hover:text-[#30120B]'
              }`}
            >
              <Plane className="w-4 h-4" />
              <span>Air Express Transit Times</span>
            </button>

            <button
              onClick={() => setActiveTab('recipes')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'recipes'
                  ? 'bg-[#942F12] text-white shadow-md'
                  : 'text-[#5A473D] hover:text-[#30120B]'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Authentic Recipe Compass</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Worldwide Air Express Shipping Tracker */}
        {activeTab === 'shipping' && (
          <div className="bg-white rounded-3xl p-7 sm:p-10 border border-[#E5D7BF] shadow-sm space-y-7 animate-in fade-in duration-200">
            <div className="max-w-2xl space-y-1.5">
              <h3 className="text-2xl font-bold font-serif-luxury text-[#30120B]">
                Direct Air Cargo to International Destinations
              </h3>
              <p className="text-xs sm:text-sm text-[#5D4A3E]">
                Select your country to view carrier routes, estimated transit days, and sanitary export clearance.
              </p>
            </div>

            {/* Country Selector */}
            <div className="space-y-2">
              <span className="block text-xs font-bold text-[#554238] uppercase">
                Destination Country:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {Object.entries(shippingDestinations).map(([code, dest]) => (
                  <button
                    key={code}
                    onClick={() => setSelectedCountry(code)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                      selectedCountry === code
                        ? 'bg-[#942F12] text-white border-[#942F12] shadow-xs'
                        : 'bg-[#FAF6EE] border-[#DACBB5] text-[#554238] hover:bg-white'
                    }`}
                  >
                    {dest.country}
                  </button>
                ))}
              </div>
            </div>

            {/* Country Transit Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5 rounded-2xl bg-[#FBF8F2] border border-[#EADBCA]">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#942F12] uppercase">
                  <Clock className="w-4 h-4 text-[#F2871A]" />
                  <span>Estimated Flight Transit:</span>
                </div>
                <p className="text-xl font-bold text-[#30120B]">
                  {currentShipping.days}
                </p>
                <span className="text-xs text-[#7A6658] block">
                  Departing Addis Ababa Bole International Cargo
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#942F12] uppercase">
                  <Plane className="w-4 h-4 text-[#F2871A]" />
                  <span>Carrier &amp; Routing Hub:</span>
                </div>
                <p className="text-sm sm:text-base font-bold text-[#30120B]">
                  {currentShipping.hub}
                </p>
                <span className="text-xs text-[#7A6658] block">
                  {currentShipping.airMethod}
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#2E6B34] uppercase">
                  <ShieldCheck className="w-4 h-4 text-[#2E6B34]" />
                  <span>Sanitary Customs Clearance:</span>
                </div>
                <p className="text-sm sm:text-base font-bold text-[#2E6B34]">
                  Phytosanitary Inspected
                </p>
                <span className="text-xs text-[#7A6658] block">
                  Sealed multi-barrier export pouches
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Authentic Recipe Compass */}
        {activeTab === 'recipes' && (
          <div className="bg-white rounded-3xl p-7 sm:p-10 border border-[#E5D7BF] shadow-sm space-y-7 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-2xl font-bold font-serif-luxury text-[#30120B]">
                  Mother’s Traditional Cooking Compass
                </h3>
                <p className="text-xs text-[#5D4A3F]">
                  Traditional measurements and slow-cooking secrets for authentic taste.
                </p>
              </div>

              {/* Recipe Selector */}
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'dorowat', label: 'Doro Wat' },
                  { key: 'shirotegabino', label: 'Shiro Tegabino' },
                  { key: 'kitfo', label: 'Kitfo' },
                  { key: 'genfobreakfast', label: 'Genfo' },
                ].map((rec) => (
                  <button
                    key={rec.key}
                    onClick={() => setSelectedRecipe(rec.key as any)}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                      selectedRecipe === rec.key
                        ? 'bg-[#942F12] text-white border-[#942F12]'
                        : 'bg-[#FAF6EE] border-[#DACBB5] text-[#554238] hover:bg-white'
                    }`}
                  >
                    {rec.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Recipe Details */}
            <div className="p-6 rounded-2xl bg-[#FBF8F2] border border-[#EADBCA] space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EADBCA] pb-3">
                <div>
                  <h4 className="text-xl font-bold text-[#30120B] font-serif-luxury">
                    {currentRecipe.title}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-[#7A6658] mt-0.5">
                    <span>{currentRecipe.prepTime}</span>
                    <span>·</span>
                    <span>{currentRecipe.servings}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-[#E03E15]">
                  <span>Heat:</span>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Flame
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < currentRecipe.heat
                            ? 'fill-[#E03E15] text-[#E03E15]'
                            : 'text-gray-300 fill-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="space-y-1.5">
                  <span className="font-bold text-[#30120B] uppercase tracking-wider block">
                    Spice Measurement:
                  </span>
                  <p className="p-3 rounded-xl bg-white border border-[#E8DEC8] font-semibold text-[#8C3A14]">
                    {currentRecipe.spiceRatio}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <span className="font-bold text-[#30120B] uppercase tracking-wider block">
                    Matriarch Technique:
                  </span>
                  <p className="p-3 rounded-xl bg-white border border-[#E8DEC8] text-[#554238] leading-relaxed">
                    {currentRecipe.secretTip}
                  </p>
                </div>
              </div>

              {/* 1-Click Add Spice to Cart */}
              <div className="pt-3 border-t border-[#EADBCA] flex items-center justify-between">
                <span className="text-xs text-[#7A6658]">
                  Need this blend in your pantry?
                </span>
                <button
                  onClick={() => {
                    const prod = products.find((p) => p.id === currentRecipe.primarySpice);
                    if (prod) {
                      onAddSingleToCart(prod, currentRecipe.primaryWeight, 1);
                    }
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#942F12] text-white text-xs font-bold hover:bg-[#7D240B] flex items-center gap-2 shadow-xs transition-colors"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>
                    Add {currentRecipe.primarySpice.toUpperCase()} ({currentRecipe.primaryWeight}) to Bag
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
