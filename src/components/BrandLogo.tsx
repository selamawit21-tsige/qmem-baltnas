import React, { useId } from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'full' | 'mark-only' | 'compact';
  invertLight?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = 'h-11',
  variant = 'full',
  invertLight = false,
}) => {
  const reactId = useId();
  const gradId = `pestle-grad-${reactId.replace(/:/g, '')}`;
  const glowId = `pestle-glow-${reactId.replace(/:/g, '')}`;

  const primaryColor = invertLight ? '#FFF2EB' : '#4E1107';

  // Mark-only layout
  if (variant === 'mark-only') {
    return (
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} group`}
        aria-label="Q'mem Baltna Insignia"
      >
        <defs>
          {/* Radiant Highland Saffron to Berbere Orange Gradient */}
          <linearGradient id={gradId} x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#FFA63A" />
            <stop offset="45%" stopColor="#F2871A" />
            <stop offset="100%" stopColor="#D45308" />
          </linearGradient>
          <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#F2871A" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Outer Circular Framing Arc */}
        <path
          d="M 14 62 C 12 36, 28 18, 54 18 C 74 18, 88 26, 92 40"
          stroke={primaryColor}
          strokeWidth="8.5"
          strokeLinecap="round"
        />

        {/* Mortar Bowl in Deep Traditional Clay / Mahogany */}
        <path
          d="M 18 64 C 20 87, 74 87, 76 64 Z"
          fill={primaryColor}
        />

        {/* Moving Dynamic Orange Pestle (Ergonomically positioned at 28° grind angle) */}
        <g className="animate-logo-pestle transition-transform duration-300 group-hover:scale-105" filter={`url(#${glowId})`}>
          {/* Pestle Top Handle Crown */}
          <circle cx="33" cy="20" r="7.5" fill={`url(#${gradId})`} />
          {/* Pestle Shaft with Ergonomic Taper nestled into the mortar */}
          <path
            d="M 33 26 L 51 68"
            stroke={`url(#${gradId})`}
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* Pestle Rounded Grinding Head inside the bowl */}
          <ellipse cx="51" cy="68" rx="5.5" ry="4" fill={`url(#${gradId})`} />
          {/* Subtle Golden Highlight on the Pestle Crown */}
          <circle cx="31.5" cy="18.5" r="2.2" fill="#FFE2B8" opacity="0.85" />
        </g>

        {/* Moving Orange Spice Sparks & Floating Essence */}
        {/* Primary Accent Spark */}
        <circle
          cx="78"
          cy="80"
          r="5.5"
          fill={`url(#${gradId})`}
          className="animate-logo-spark"
        />
        {/* Floating Aromatic Spice Particle 1 */}
        <circle
          cx="63"
          cy="50"
          r="3"
          fill="#FFA63A"
          className="animate-logo-spark-alt"
          opacity="0.9"
        />
        {/* Floating Micro-spark 2 */}
        <circle
          cx="74"
          cy="38"
          r="2"
          fill="#F2871A"
          className="animate-logo-spark"
          opacity="0.8"
        />
      </svg>
    );
  }

  // Full Brand Logo Lockup
  return (
    <div className={`group flex items-center gap-2 sm:gap-3 select-none ${className}`}>
      {/* Mortar & Pestle Icon from Brand Heritage */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full aspect-square shrink-0 drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
        aria-hidden="true"
      >
        <defs>
          {/* Radiant Highland Saffron to Berbere Orange Gradient */}
          <linearGradient id={gradId} x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#FFA63A" />
            <stop offset="45%" stopColor="#F2871A" />
            <stop offset="100%" stopColor="#D45308" />
          </linearGradient>
          <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#F2871A" floodOpacity="0.45" />
          </filter>
        </defs>

        {/* Left Outer Arc */}
        <path
          d="M 14 62 C 12 36, 28 18, 54 18 C 74 18, 88 26, 92 40"
          stroke={primaryColor}
          strokeWidth="8.5"
          strokeLinecap="round"
        />

        {/* Mortar Bowl Base */}
        <path
          d="M 18 64 C 20 87, 74 87, 76 64 Z"
          fill={primaryColor}
        />

        {/* Moving Dynamic Orange Pestle (Re-positioned with attractive angle & rhythmic grinding motion) */}
        <g className="animate-logo-pestle transition-transform duration-300 group-hover:scale-105" filter={`url(#${glowId})`}>
          {/* Ergonomic Pestle Top Handle */}
          <circle cx="33" cy="20" r="7.5" fill={`url(#${gradId})`} />
          {/* Pestle Tapered Shaft */}
          <path
            d="M 33 26 L 51 68"
            stroke={`url(#${gradId})`}
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* Pestle Rounded Grinding Head */}
          <ellipse cx="51" cy="68" rx="5.5" ry="4" fill={`url(#${gradId})`} />
          {/* Subtle Golden Highlight Crown */}
          <circle cx="31.5" cy="18.5" r="2.2" fill="#FFE2B8" opacity="0.85" />
        </g>

        {/* Moving Orange Spice Particles (Active floating aroma essence) */}
        {/* Main Base Spice Spark */}
        <circle
          cx="78"
          cy="80"
          r="5.5"
          fill={`url(#${gradId})`}
          className="animate-logo-spark"
        />
        {/* Floating Spice Sparkle Rising near rim */}
        <circle
          cx="63"
          cy="50"
          r="3"
          fill="#FFA63A"
          className="animate-logo-spark-alt"
          opacity="0.9"
        />
        {/* Micro Aroma Sparkle */}
        <circle
          cx="74"
          cy="38"
          r="2"
          fill="#F2871A"
          className="animate-logo-spark"
          opacity="0.8"
        />
      </svg>

      {/* Brand Typographic Lockup */}
      <div className="flex flex-col justify-center leading-none">
        {/* Ethiopic Script: ቅመም ባልትና */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          <span
            className="text-[0.72rem] sm:text-[0.85rem] md:text-[0.9rem] font-semibold italic tracking-wider transition-colors"
            style={{ color: primaryColor, fontFamily: 'var(--font-amharic)' }}
          >
            ቅመም ባልትና
          </span>
          {/* Subtle Amber Spice Pip */}
          <span className="w-1.5 h-1.5 rounded-full bg-[#F2871A] animate-pulse inline-block" />
        </div>

        {/* Latin Brand Name: Q'mem Baltna with accented orange apostrophe */}
        <div className="flex items-baseline gap-0.5 sm:gap-1 mt-0.5">
          <span
            className="text-lg sm:text-xl md:text-2xl font-black tracking-tight flex items-baseline"
            style={{ color: primaryColor }}
          >
            Q
            <span className="text-[#F2871A] group-hover:scale-125 inline-block transition-transform duration-300 font-serif font-black text-xl sm:text-2xl mx-[0.5px]">
              &apos;
            </span>
            mem
          </span>
          <span
            className="text-base sm:text-lg md:text-xl font-medium italic tracking-normal ml-0.5 sm:ml-1"
            style={{ color: primaryColor }}
          >
            Baltna
          </span>
        </div>
      </div>
    </div>
  );
};
