import React from 'react';
import { ProductId } from '../types';

interface SpiceVisualProps {
  productId: ProductId;
  className?: string;
  isFloatingHero?: boolean;
}

export const SpiceVisual: React.FC<SpiceVisualProps> = ({
  productId,
  className = 'w-full h-48',
  isFloatingHero = false,
}) => {
  switch (productId) {
    case 'berbere':
      return (
        <div
          className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#5A1608] via-[#85230D] to-[#390C03] p-4 flex items-center justify-center ${className}`}
        >
          {/* Subtle Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(242,135,26,0.3),transparent_70%)]" />

          {/* SVG Artwork: Deep Crimson Berbere Powder & Sun-Dried Chilies */}
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-44 drop-shadow-xl" fill="none">
            {/* Terracotta Artisan Dish */}
            <ellipse cx="100" cy="115" rx="76" ry="30" fill="#240702" opacity="0.6" />
            <path
              d="M 28 92 C 30 128, 170 128, 172 92 C 170 82, 30 82, 28 92 Z"
              fill="#521C10"
              stroke="#833220"
              strokeWidth="2.5"
            />
            {/* Spice Mountain (Berbere Powder) */}
            <path
              d="M 38 90 C 60 70, 80 44, 100 40 C 120 44, 140 70, 162 90 C 130 98, 70 98, 38 90 Z"
              fill="url(#berbereGrad)"
            />
            {/* Spice texture grain flecks */}
            <circle cx="85" cy="62" r="2" fill="#FFA149" opacity="0.8" />
            <circle cx="115" cy="58" r="1.5" fill="#FFE2B8" opacity="0.7" />
            <circle cx="98" cy="74" r="2.5" fill="#581005" />
            <circle cx="132" cy="76" r="1.8" fill="#F47D1C" opacity="0.8" />
            <circle cx="68" cy="80" r="2" fill="#F47D1C" opacity="0.7" />

            {/* Sun-dried Chili Pod */}
            <path
              d="M 125 110 C 145 102, 168 85, 175 65 C 160 72, 140 92, 125 110 Z"
              fill="#A7240E"
              stroke="#5A1207"
              strokeWidth="1.5"
            />
            <path d="M 175 65 Q 182 58 178 52" stroke="#487332" strokeWidth="2.5" strokeLinecap="round" />

            {/* Korarima Cardamom Pods */}
            <ellipse cx="65" cy="112" rx="10" ry="7" transform="rotate(-20 65 112)" fill="#3B180C" stroke="#7A391E" strokeWidth="1.5" />
            <ellipse cx="82" cy="118" rx="8" ry="6" transform="rotate(15 82 118)" fill="#2C1208" stroke="#683018" strokeWidth="1.2" />

            {/* Gradients */}
            <defs>
              <linearGradient id="berbereGrad" x1="100" y1="40" x2="100" y2="98" gradientUnits="userSpaceOnUse">
                <stop stopColor="#D9381E" />
                <stop offset="0.45" stopColor="#B3240D" />
                <stop offset="1" stopColor="#7E1807" />
              </linearGradient>
            </defs>
          </svg>

          {/* Luxury Tag overlay */}
          <div className="absolute top-3 left-3 text-[11px] font-medium tracking-wider text-[#FFCDB2] uppercase">
            Export Grade · Red Chilies & Korarima
          </div>
          {isFloatingHero && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none animate-shine" />
          )}
        </div>
      );

    case 'shiro':
      return (
        <div
          className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#543813] via-[#7B531C] to-[#2E1E09] p-4 flex items-center justify-center ${className}`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,200,87,0.25),transparent_70%)]" />

          {/* SVG Artwork: Silky Golden Shiro in Clay Tegabino Pot */}
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-44 drop-shadow-xl" fill="none">
            {/* Clay Pot Base */}
            <ellipse cx="100" cy="116" rx="74" ry="28" fill="#1A0D04" opacity="0.6" />
            <path
              d="M 32 88 C 34 126, 166 126, 168 88 C 166 80, 34 80, 32 88 Z"
              fill="#56301C"
              stroke="#8F5435"
              strokeWidth="2.5"
            />
            {/* Golden Shiro Stew & Powder Mound */}
            <path
              d="M 40 86 C 58 66, 80 48, 100 46 C 120 48, 142 66, 160 86 C 132 94, 68 94, 40 86 Z"
              fill="url(#shiroGrad)"
            />
            {/* Herb Flecks (Besobila sacred basil) */}
            <circle cx="88" cy="66" r="2.2" fill="#3D5A2E" />
            <circle cx="112" cy="62" r="1.8" fill="#486B37" />
            <circle cx="102" cy="74" r="2" fill="#314824" />
            <circle cx="74" cy="78" r="1.5" fill="#3D5A2E" />
            <circle cx="128" cy="76" r="2.2" fill="#486B37" />

            {/* Whole Roasted Chickpeas */}
            <circle cx="60" cy="110" r="7" fill="#D49942" stroke="#87581B" strokeWidth="1.5" />
            <circle cx="74" cy="115" r="6" fill="#C48935" stroke="#7A4E16" strokeWidth="1.2" />
            <circle cx="140" cy="108" r="6.5" fill="#D49942" stroke="#87581B" strokeWidth="1.5" />

            {/* Clay handles */}
            <path d="M 28 88 C 16 88, 16 100, 30 102" stroke="#8F5435" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 172 88 C 184 88, 184 100, 170 102" stroke="#8F5435" strokeWidth="3" fill="none" strokeLinecap="round" />

            <defs>
              <linearGradient id="shiroGrad" x1="100" y1="46" x2="100" y2="92" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F5BF5B" />
                <stop offset="0.5" stopColor="#D99B26" />
                <stop offset="1" stopColor="#A86E12" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute top-3 left-3 text-[11px] font-medium tracking-wider text-[#FFE8B8] uppercase">
            Roasted Chickpeas · Wild Besobila
          </div>
          {isFloatingHero && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none animate-shine" />
          )}
        </div>
      );

    case 'mitmita':
      return (
        <div
          className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#681C08] via-[#9B2A0C] to-[#3B0C02] p-4 flex items-center justify-center ${className}`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,140,25,0.35),transparent_70%)]" />

          {/* SVG Artwork: Fiery Orange Mitmita & Cardamom Seeds */}
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-44 drop-shadow-xl" fill="none">
            {/* Dark Basalt Dish */}
            <ellipse cx="100" cy="114" rx="74" ry="28" fill="#120503" opacity="0.7" />
            <path
              d="M 30 90 C 32 126, 168 126, 170 90 C 168 80, 32 80, 30 90 Z"
              fill="#2E110A"
              stroke="#582417"
              strokeWidth="2.5"
            />
            {/* Flaming Mitmita Mound */}
            <path
              d="M 40 88 C 60 62, 82 42, 100 38 C 118 42, 140 62, 160 88 C 130 96, 70 96, 40 88 Z"
              fill="url(#mitmitaGrad)"
            />
            {/* Sea Salt & Cardamom Specks */}
            <circle cx="86" cy="60" r="1.6" fill="#FFF5EB" />
            <circle cx="114" cy="56" r="1.8" fill="#FFF5EB" />
            <circle cx="98" cy="72" r="2.2" fill="#3E1508" />
            <circle cx="126" cy="72" r="2" fill="#3E1508" />
            <circle cx="72" cy="76" r="1.5" fill="#FFE2CC" />

            {/* Whole Cloves & Cardamom Stars */}
            <path d="M 68 112 L 80 114 M 74 108 L 74 118" stroke="#421E10" strokeWidth="2.5" strokeLinecap="round" />
            <ellipse cx="138" cy="112" rx="9" ry="6" transform="rotate(-30 138 112)" fill="#3A170A" stroke="#7A3618" strokeWidth="1.5" />

            {/* Miniature Bird's Eye Chili */}
            <path
              d="M 100 120 C 115 116, 128 104, 130 94 C 118 100, 108 110, 100 120 Z"
              fill="#FF441A"
              stroke="#991A04"
              strokeWidth="1.2"
            />
            <path d="M 130 94 Q 134 88 132 84" stroke="#4B772A" strokeWidth="2" strokeLinecap="round" />

            <defs>
              <linearGradient id="mitmitaGrad" x1="100" y1="38" x2="100" y2="94" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF6B26" />
                <stop offset="0.5" stopColor="#E63F0B" />
                <stop offset="1" stopColor="#A81D00" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute top-3 left-3 text-[11px] font-medium tracking-wider text-[#FFD6C2] uppercase">
            Highland Bird’s Eye · Cardamom & Cloves
          </div>
          {isFloatingHero && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none animate-shine" />
          )}
        </div>
      );

    case 'genfo':
      return (
        <div
          className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4D3219] via-[#6B4622] to-[#291A0D] p-4 flex items-center justify-center ${className}`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(235,178,110,0.25),transparent_70%)]" />

          {/* SVG Artwork: Nourishing Genfo Grains & Porridge with Spiced Butter Well */}
          <svg viewBox="0 0 200 160" className="w-full h-full max-h-44 drop-shadow-xl" fill="none">
            {/* Hand-carved Wooden Bowl */}
            <ellipse cx="100" cy="116" rx="74" ry="28" fill="#140C06" opacity="0.6" />
            <path
              d="M 30 88 C 32 126, 168 126, 170 88 C 168 78, 32 78, 30 88 Z"
              fill="#54371D"
              stroke="#8B5C32"
              strokeWidth="2.5"
            />
            {/* Genfo Porridge Volcano Form */}
            <path
              d="M 38 86 C 54 64, 76 52, 100 50 C 124 52, 146 64, 162 86 C 132 94, 68 94, 38 86 Z"
              fill="url(#genfoGrad)"
            />
            {/* Center Well filled with Golden Spiced Niter Kibbeh & Berbere */}
            <ellipse cx="100" cy="62" rx="22" ry="11" fill="#7D2B12" stroke="#541705" strokeWidth="1.5" />
            <ellipse cx="100" cy="62" rx="16" ry="7" fill="#F4A220" />
            <circle cx="100" cy="62" r="3" fill="#A8280D" />

            {/* Whole Barley & Wheat Ears */}
            <path d="M 50 114 C 62 108, 70 116, 76 112" stroke="#C9A066" strokeWidth="2" strokeLinecap="round" />
            <path d="M 148 114 C 136 108, 128 116, 122 112" stroke="#C9A066" strokeWidth="2" strokeLinecap="round" />
            <circle cx="58" cy="112" r="2" fill="#E2BD84" />
            <circle cx="68" cy="111" r="2" fill="#E2BD84" />
            <circle cx="140" cy="112" r="2" fill="#E2BD84" />
            <circle cx="130" cy="111" r="2" fill="#E2BD84" />

            <defs>
              <linearGradient id="genfoGrad" x1="100" y1="50" x2="100" y2="92" gradientUnits="userSpaceOnUse">
                <stop stopColor="#C49658" />
                <stop offset="0.6" stopColor="#9C6F35" />
                <stop offset="1" stopColor="#6E4A1E" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute top-3 left-3 text-[11px] font-medium tracking-wider text-[#F2D7B3] uppercase">
            Heritage Barley · Spiced Niter Kibbeh Well
          </div>
          {isFloatingHero && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none animate-shine" />
          )}
        </div>
      );
  }
};
