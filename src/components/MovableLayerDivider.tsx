import React from 'react';

export type DividerTheme =
  | 'bubbling-peppers'
  | 'simmering-shiro'
  | 'roasted-grains'
  | 'woven-tibeb'
  | 'fiery-mitmita-embers'
  | 'korarima-botanicals'
  | 'aromatic-roasting-smoke';

interface MovableLayerDividerProps {
  theme?: DividerTheme;
  variant?: string; // Backwards-compatible alias
  flip?: boolean;
}

export const MovableLayerDivider: React.FC<MovableLayerDividerProps> = ({
  theme,
  variant,
  flip = false,
}) => {
  // Resolve theme with intelligent fallback if variant was provided instead
  let activeTheme: DividerTheme = theme || 'bubbling-peppers';
  if (!theme && variant) {
    if (variant === 'ivory-to-sand') activeTheme = 'simmering-shiro';
    else if (variant === 'sand-to-ivory') activeTheme = 'roasted-grains';
    else if (
      [
        'bubbling-peppers',
        'simmering-shiro',
        'roasted-grains',
        'woven-tibeb',
        'fiery-mitmita-embers',
        'korarima-botanicals',
        'aromatic-roasting-smoke',
      ].includes(variant)
    ) {
      activeTheme = variant as DividerTheme;
    }
  }

  const containerClass = `relative w-full overflow-hidden select-none pointer-events-none transition-all duration-300 ${
    flip ? 'rotate-180' : ''
  }`;

  switch (activeTheme) {
    // 1. Bubbling Red Chili Peppers & Korarima Pods (Berbere Soul)
    case 'bubbling-peppers':
      return (
        <div className={`${containerClass} bg-[#FDFBF7]`}>
          <div className="relative h-16 sm:h-20 w-full overflow-hidden">
            {/* Background Warm Ochre Dune - continuous undulating motion */}
            <svg
              className="absolute bottom-0 w-[150%] h-full animate-layer-wave opacity-25"
              viewBox="0 0 1200 100"
              preserveAspectRatio="none"
            >
              <path
                d="M0,40 C150,90 350,10 550,60 C750,110 950,20 1200,50 L1200,100 L0,100 Z"
                fill="#8C2E12"
              />
            </svg>

            {/* Front Terracotta Wave with Lively Chili Pods & Bubbling Seeds */}
            <svg
              className="absolute bottom-0 w-full h-full"
              viewBox="0 0 1200 100"
              preserveAspectRatio="none"
            >
              <path
                d="M0,50 Q300,15 600,60 T1200,45 L1200,100 L0,100 Z"
                fill="#F7EFE3"
              />

              {/* Lively Bouncing Red Chili Peppers along the wave */}
              {/* Chili 1 - animated bobbing */}
              <g className="animate-pepper-1">
                <path d="M0,0 C12,4 28,15 30,28 C20,24 8,12 0,0 Z" fill="#B3240D" />
                <path d="M30,28 Q34,34 32,38" stroke="#3A6624" strokeWidth="2" strokeLinecap="round" />
              </g>

              {/* Chili 2 - animated swaying tilt */}
              <g className="animate-pepper-2">
                <path d="M0,0 C14,5 30,16 32,30 C22,25 10,14 0,0 Z" fill="#942F12" />
                <path d="M32,30 Q36,36 34,40" stroke="#3A6624" strokeWidth="2" strokeLinecap="round" />
              </g>

              {/* Chili 3 - animated floating drift */}
              <g className="animate-pepper-3">
                <path d="M0,0 C12,4 26,14 28,26 C18,22 8,10 0,0 Z" fill="#B3240D" />
                <path d="M28,26 Q32,32 30,36" stroke="#3A6624" strokeWidth="2" strokeLinecap="round" />
              </g>

              {/* Korarima Cardamom Pods (ovals with gentle simmer pulse) */}
              <ellipse cx="380" cy="58" rx="8" ry="5.5" transform="rotate(-25 380 58)" fill="#3B180C" className="animate-simmer-pulse" />
              <ellipse cx="440" cy="52" rx="7" ry="5" transform="rotate(20 440 52)" fill="#542413" className="animate-simmer-pulse" />
              <ellipse cx="820" cy="62" rx="8.5" ry="5.5" transform="rotate(-15 820 62)" fill="#3B180C" className="animate-simmer-pulse" />

              {/* Lively Bubbling Spice Droplets & Seeds with realistic bubbling pops */}
              <circle cx="270" cy="46" r="3.5" fill="#D9381E" className="animate-bubble-pop-a" />
              <circle cx="510" cy="56" r="3" fill="#F2871A" className="animate-bubble-pop-b" />
              <circle cx="740" cy="50" r="4" fill="#D9381E" className="animate-bubble-pop-c" />
              <circle cx="890" cy="54" r="2.5" fill="#F2871A" className="animate-bubble-pop-a" />
              <circle cx="1100" cy="48" r="3.5" fill="#942F12" className="animate-bubble-pop-b" />
              <circle cx="140" cy="58" r="2.2" fill="#F2871A" className="animate-bubble-pop-c" />
              <circle cx="470" cy="60" r="2.2" fill="#D9381E" className="animate-bubble-pop-a" />

              {/* Floating tiny golden oil droplets that simmer */}
              <circle cx="340" cy="44" r="2" fill="#E69500" className="animate-bubble-pop-b" />
              <circle cx="630" cy="52" r="2.4" fill="#E69500" className="animate-bubble-pop-a" />
              <circle cx="990" cy="42" r="1.8" fill="#E69500" className="animate-bubble-pop-c" />
            </svg>
          </div>
        </div>
      );

    // 2. Simmering Shiro Clay Pot Bubbles & Steam Swirls
    case 'simmering-shiro':
      return (
        <div className={`${containerClass} bg-[#FDFBF7]`}>
          <div className="relative h-16 sm:h-20 w-full overflow-hidden">
            {/* Background Broth Wave */}
            <svg
              className="absolute bottom-0 w-[140%] h-full animate-layer-wave opacity-30"
              viewBox="0 0 1200 100"
              preserveAspectRatio="none"
            >
              <path
                d="M0,45 C250,85 500,20 750,70 C1000,10 1150,60 1200,45 L1200,100 L0,100 Z"
                fill="#E8BA60"
              />
            </svg>

            {/* Golden Turmeric Broth Wave */}
            <svg
              className="absolute bottom-0 w-full h-full"
              viewBox="0 0 1200 100"
              preserveAspectRatio="none"
            >
              <path
                d="M0,60 C200,30 400,80 600,45 C800,15 1000,75 1200,50 L1200,100 L0,100 Z"
                fill="#F7ECD3"
              />

              {/* Simmering Shiro Bubbles with vivid boiling pops */}
              <g fill="#D49942">
                <circle cx="120" cy="55" r="5" className="animate-bubble-pop-a" />
                <circle cx="123" cy="53" r="1.5" fill="#FFF9EB" className="animate-bubble-pop-a" />

                <circle cx="240" cy="62" r="7" className="animate-bubble-pop-b" />
                <circle cx="243" cy="60" r="2" fill="#FFF9EB" className="animate-bubble-pop-b" />

                <circle cx="390" cy="48" r="4.5" className="animate-bubble-pop-c" />

                <circle cx="520" cy="66" r="6.5" className="animate-bubble-pop-a" />
                <circle cx="523" cy="64" r="2" fill="#FFF9EB" className="animate-bubble-pop-a" />

                <circle cx="680" cy="42" r="5" className="animate-bubble-pop-b" />
                <circle cx="790" cy="58" r="6" className="animate-bubble-pop-c" />
                <circle cx="793" cy="56" r="1.8" fill="#FFF9EB" className="animate-bubble-pop-c" />

                <circle cx="940" cy="46" r="4" className="animate-bubble-pop-a" />
                <circle cx="1060" cy="54" r="7" className="animate-bubble-pop-b" />
                <circle cx="1063" cy="52" r="2.2" fill="#FFF9EB" className="animate-bubble-pop-b" />
              </g>

              {/* Besobila Sacred Basil Herbal Flecks floating */}
              <circle cx="180" cy="50" r="2.5" fill="#3D5A2E" className="animate-bubble-pop-c" />
              <circle cx="320" cy="58" r="2" fill="#3D5A2E" className="animate-bubble-pop-a" />
              <circle cx="610" cy="46" r="2.2" fill="#3D5A2E" className="animate-bubble-pop-b" />
              <circle cx="860" cy="52" r="2.5" fill="#3D5A2E" className="animate-bubble-pop-c" />
              <circle cx="1120" cy="56" r="2" fill="#3D5A2E" className="animate-bubble-pop-a" />

              {/* Delicate Wafting Steam Swirl Lines in active upward motion */}
              <path
                d="M230,50 Q238,35 244,20"
                stroke="#C48935"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
                className="animate-steam-waft"
              />
              <path
                d="M510,54 Q518,38 524,24"
                stroke="#C48935"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
                className="animate-steam-waft-delayed"
              />
              <path
                d="M780,48 Q788,32 794,18"
                stroke="#C48935"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
                className="animate-steam-waft"
              />
              <path
                d="M1050,44 Q1058,30 1064,16"
                stroke="#C48935"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
                className="animate-steam-waft-delayed"
              />
            </svg>
          </div>
        </div>
      );

    // 3. Roasted Grains & Wheat Harvest Scatter (Genfo / Atmit Tradition)
    case 'roasted-grains':
      return (
        <div className={`${containerClass} bg-[#FDFBF7]`}>
          <div className="relative h-16 sm:h-20 w-full overflow-hidden">
            {/* Background Dune Wave */}
            <svg
              className="absolute bottom-0 w-[140%] h-full animate-layer-wave opacity-25"
              viewBox="0 0 1200 100"
              preserveAspectRatio="none"
            >
              <path
                d="M0,50 C200,20 400,85 700,35 C950,75 1100,25 1200,45 L1200,100 L0,100 Z"
                fill="#C49658"
              />
            </svg>

            {/* Dune of Roasted Golden Grains */}
            <svg
              className="absolute bottom-0 w-full h-full"
              viewBox="0 0 1200 100"
              preserveAspectRatio="none"
            >
              <path
                d="M0,45 C250,75 500,25 750,65 C950,95 1100,35 1200,55 L1200,100 L0,100 Z"
                fill="#F3E9D5"
              />

              {/* Roasted Barley Kernels (with gentle harvest rustling motion) */}
              {/* Grain cluster 1 */}
              <g className="animate-grain-1">
                <ellipse cx="0" cy="0" rx="6" ry="3.5" fill="#C49658" stroke="#8A5A24" strokeWidth="0.8" />
                <line x1="-5" y1="0" x2="5" y2="0" stroke="#684216" strokeWidth="0.8" />
              </g>

              {/* Grain cluster 2 */}
              <g className="animate-grain-2">
                <ellipse cx="0" cy="0" rx="6.5" ry="3.8" fill="#C49658" stroke="#8A5A24" strokeWidth="0.8" />
                <line x1="-5.5" y1="0" x2="5.5" y2="0" stroke="#684216" strokeWidth="0.8" />
              </g>

              {/* Grain cluster 3 */}
              <g className="animate-grain-3">
                <ellipse cx="0" cy="0" rx="6" ry="3.5" fill="#C49658" stroke="#8A5A24" strokeWidth="0.8" />
                <line x1="-5" y1="0" x2="5" y2="0" stroke="#684216" strokeWidth="0.8" />
              </g>

              {/* Wheat Ear Motifs with gentle breeze sway */}
              <g className="animate-spice-sway">
                <path
                  d="M720,60 Q735,45 750,35 M732,50 L736,44 M740,43 L745,38 M745,46 L749,42"
                  stroke="#A87532"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>
              <g className="animate-spice-sway" style={{ animationDelay: '1.5s' }}>
                <path
                  d="M1020,55 Q1035,40 1050,30 M1032,45 L1036,39 M1040,38 L1045,33 M1045,41 L1049,37"
                  stroke="#A87532"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>

              {/* Roasted Cereal Flecks with subtle bubbling motion */}
              <circle cx="290" cy="52" r="2" fill="#8C5C26" className="animate-bubble-pop-a" />
              <circle cx="340" cy="58" r="2.5" fill="#C49658" className="animate-bubble-pop-b" />
              <circle cx="620" cy="46" r="2.2" fill="#8C5C26" className="animate-bubble-pop-c" />
              <circle cx="940" cy="62" r="2" fill="#8C5C26" className="animate-bubble-pop-a" />
              <circle cx="1120" cy="48" r="2.5" fill="#C49658" className="animate-bubble-pop-b" />
            </svg>
          </div>
        </div>
      );

    // 4. Traditional Ethiopian Woven Tibeb Loom Ribbon - Infinite Gliding Loom Motion!
    case 'woven-tibeb':
      return (
        <div className={`${containerClass} bg-[#FDFBF7]`}>
          <div className="py-2 overflow-hidden">
            {/* Woven Textile Ribbon Strip with continuous smooth gliding animation */}
            <div className="w-full bg-[#30120B] py-2 border-y border-[#F2871A]/50 shadow-sm overflow-hidden">
              <div className="flex w-[200%] animate-tibeb-scroll">
                {/* Two identical 1200-width strips repeated side-by-side for infinite seamless scroll */}
                {[0, 1].map((stripIndex) => (
                  <svg
                    key={stripIndex}
                    className="w-1/2 h-8 shrink-0"
                    viewBox="0 0 1200 32"
                    preserveAspectRatio="none"
                    fill="none"
                  >
                    {Array.from({ length: 24 }).map((_, i) => {
                      const x = i * 50 + 25;
                      return (
                        <g key={i} transform={`translate(${x}, 16)`}>
                          {/* Outer Diamond */}
                          <polygon
                            points="0,-12 12,0 0,12 -12,0"
                            fill="#942F12"
                            stroke="#F2871A"
                            strokeWidth="1.2"
                          />
                          {/* Inner Diamond */}
                          <polygon points="0,-6 6,0 0,6 -6,0" fill="#2E6B34" />
                          {/* Central Golden Accent */}
                          <circle cx="0" cy="0" r="2" fill="#FFDC69" />
                          {/* Small side stitch accents */}
                          <circle cx="0" cy="-14" r="1" fill="#E8D1BA" />
                          <circle cx="0" cy="14" r="1" fill="#E8D1BA" />
                        </g>
                      );
                    })}
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      );

    // 5. Fiery Mitmita Ember Sparks & Cloves - Glowing Crackling Motion
    case 'fiery-mitmita-embers':
      return (
        <div className={`${containerClass} bg-[#FDFBF7]`}>
          <div className="relative h-16 sm:h-20 w-full overflow-hidden">
            {/* Background Heat Wave */}
            <svg
              className="absolute bottom-0 w-[140%] h-full animate-layer-wave opacity-25"
              viewBox="0 0 1200 100"
              preserveAspectRatio="none"
            >
              <path
                d="M0,45 C200,85 500,20 750,75 C950,25 1100,80 1200,45 L1200,100 L0,100 Z"
                fill="#801F09"
              />
            </svg>

            <svg
              className="absolute bottom-0 w-full h-full"
              viewBox="0 0 1200 100"
              preserveAspectRatio="none"
            >
              {/* Deep Maroon / Burnt Spiced Charcoal Ridge */}
              <path
                d="M0,50 Q300,80 600,45 T1200,60 L1200,100 L0,100 Z"
                fill="#2E110A"
              />

              {/* Glowing Fiery Ember Sparks with active animated flickering */}
              <g>
                <circle cx="140" cy="42" r="4" fill="#FF5E1E" className="animate-ember-glow" />
                <circle cx="140" cy="42" r="1.5" fill="#FFF0E6" />

                <circle cx="310" cy="38" r="3" fill="#F2871A" className="animate-ember-glow-alt" />
                <circle cx="480" cy="46" r="4" fill="#FF5E1E" className="animate-ember-glow" />
                <circle cx="480" cy="46" r="1.3" fill="#FFF0E6" />

                <circle cx="670" cy="36" r="3.5" fill="#FF5E1E" className="animate-ember-glow-alt" />
                <circle cx="820" cy="44" r="2.8" fill="#F2871A" className="animate-ember-glow" />
                <circle cx="950" cy="34" r="4.2" fill="#FF5E1E" className="animate-ember-glow-alt" />
                <circle cx="950" cy="34" r="1.6" fill="#FFF0E6" />

                <circle cx="1110" cy="48" r="2.8" fill="#F2871A" className="animate-ember-glow" />
              </g>

              {/* Star Clove Silhouettes with subtle hearth rocking */}
              <g transform="translate(230, 48)" className="animate-spice-sway">
                <line x1="-6" y1="0" x2="6" y2="0" stroke="#7A3618" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="0" y1="-6" x2="0" y2="6" stroke="#7A3618" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="0" cy="0" r="2.5" fill="#99441E" />
              </g>

              <g transform="translate(740, 42)" className="animate-spice-sway" style={{ animationDelay: '2s' }}>
                <line x1="-6" y1="0" x2="6" y2="0" stroke="#7A3618" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="0" y1="-6" x2="0" y2="6" stroke="#7A3618" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="0" cy="0" r="2.5" fill="#99441E" />
              </g>

              {/* White Sea Salt Crystals shimmering */}
              <polygon points="410,48 413,52 409,55 406,51" fill="#FFFFFF" className="animate-simmer-pulse" />
              <polygon points="880,44 883,48 879,51 876,47" fill="#FFFFFF" className="animate-simmer-pulse" />
            </svg>
          </div>
        </div>
      );

    // 6. Korarima Botanicals & Ethiopian Wild Cardamom Pods - Highland Breeze Motion
    case 'korarima-botanicals':
      return (
        <div className={`${containerClass} bg-[#FDFBF7]`}>
          <div className="relative h-16 sm:h-20 w-full overflow-hidden">
            {/* Background Highland Wave */}
            <svg
              className="absolute bottom-0 w-[140%] h-full animate-layer-wave opacity-25"
              viewBox="0 0 1200 100"
              preserveAspectRatio="none"
            >
              <path
                d="M0,50 C200,20 450,75 750,30 C950,85 1100,20 1200,45 L1200,100 L0,100 Z"
                fill="#3D5A2E"
              />
            </svg>

            <svg
              className="absolute bottom-0 w-full h-full"
              viewBox="0 0 1200 100"
              preserveAspectRatio="none"
            >
              {/* Forest Moss & Highland Clay Gradient Wave */}
              <path
                d="M0,45 C200,70 450,25 700,60 C900,85 1050,30 1200,50 L1200,100 L0,100 Z"
                fill="#273820"
              />

              {/* Whole Brown Korarima Pods */}
              <g transform="translate(210, 48) rotate(-20)" className="animate-spice-sway">
                <ellipse cx="0" cy="0" rx="9" ry="6" fill="#4A2612" stroke="#6E3A1C" strokeWidth="1" />
                <path d="M-6,-2 Q0,0 6,2" stroke="#2B1408" strokeWidth="0.8" fill="none" />
              </g>
              <g transform="translate(560, 42) rotate(15)" className="animate-spice-sway" style={{ animationDelay: '1.2s' }}>
                <ellipse cx="0" cy="0" rx="10" ry="6.5" fill="#5A2E16" stroke="#7A4222" strokeWidth="1" />
                <path d="M-7,-2 Q0,0 7,2" stroke="#331709" strokeWidth="0.8" fill="none" />
              </g>
              <g transform="translate(890, 52) rotate(-10)" className="animate-spice-sway" style={{ animationDelay: '2.5s' }}>
                <ellipse cx="0" cy="0" rx="9.5" ry="6" fill="#4A2612" stroke="#6E3A1C" strokeWidth="1" />
                <path d="M-6,-2 Q0,0 6,2" stroke="#2B1408" strokeWidth="0.8" fill="none" />
              </g>

              {/* Koseret Herbal Leaves with delicate fluttering motion */}
              <g transform="translate(360, 46)" className="animate-leaf-sway">
                <path d="M0,0 Q8,-6 14,0 Q8,6 0,0 Z" fill="#4B6E32" />
                <line x1="0" y1="0" x2="12" y2="0" stroke="#2B441B" strokeWidth="0.6" />
              </g>
              <g transform="translate(720, 50)" className="animate-leaf-sway" style={{ animationDelay: '1.8s' }}>
                <path d="M0,0 Q8,-6 14,0 Q8,6 0,0 Z" fill="#58823B" />
                <line x1="0" y1="0" x2="12" y2="0" stroke="#345222" strokeWidth="0.6" />
              </g>
              <g transform="translate(1040, 44)" className="animate-leaf-sway" style={{ animationDelay: '3s' }}>
                <path d="M0,0 Q8,-6 14,0 Q8,6 0,0 Z" fill="#4B6E32" />
                <line x1="0" y1="0" x2="12" y2="0" stroke="#2B441B" strokeWidth="0.6" />
              </g>

              {/* Golden Ginger Rhizome Slices with subtle floating bob */}
              <circle cx="120" cy="54" r="5" fill="#E8B86D" stroke="#B8863A" strokeWidth="0.8" className="animate-bubble-pop-b" />
              <circle cx="480" cy="56" r="4.5" fill="#E8B86D" stroke="#B8863A" strokeWidth="0.8" className="animate-bubble-pop-a" />
              <circle cx="810" cy="46" r="5.2" fill="#E8B86D" stroke="#B8863A" strokeWidth="0.8" className="animate-bubble-pop-c" />
              <circle cx="1140" cy="52" r="4.8" fill="#E8B86D" stroke="#B8863A" strokeWidth="0.8" className="animate-bubble-pop-b" />
            </svg>
          </div>
        </div>
      );

    // 7. Aromatic Roasting Smoke & Coffee Hearth Swirls - Fragrant Smoke Motion
    case 'aromatic-roasting-smoke':
    default:
      return (
        <div className={`${containerClass} bg-[#FDFBF7]`}>
          <div className="relative h-16 sm:h-20 w-full overflow-hidden">
            {/* Background Hearth Wave */}
            <svg
              className="absolute bottom-0 w-[140%] h-full animate-layer-wave opacity-25"
              viewBox="0 0 1200 100"
              preserveAspectRatio="none"
            >
              <path
                d="M0,45 C200,80 500,20 800,65 C1000,15 1150,70 1200,45 L1200,100 L0,100 Z"
                fill="#54281B"
              />
            </svg>

            <svg
              className="absolute bottom-0 w-full h-full"
              viewBox="0 0 1200 100"
              preserveAspectRatio="none"
            >
              <path
                d="M0,55 C300,20 600,75 900,40 C1050,20 1150,60 1200,50 L1200,100 L0,100 Z"
                fill="#3A1C14"
              />

              {/* Gentle Swirling Fragrant Vapor Lines with animated wafting smoke curl */}
              <path
                d="M150,60 Q180,30 220,40 T280,25"
                stroke="#D4A77D"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
                className="animate-smoke-curl"
              />
              <path
                d="M500,55 Q530,25 570,35 T630,20"
                stroke="#D4A77D"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
                className="animate-smoke-curl-alt"
              />
              <path
                d="M850,58 Q880,28 920,38 T980,22"
                stroke="#D4A77D"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
                className="animate-smoke-curl"
              />

              {/* Floating golden aroma flecks */}
              <circle cx="320" cy="40" r="1.8" fill="#F2871A" className="animate-bubble-pop-a" />
              <circle cx="680" cy="35" r="2.2" fill="#F2871A" className="animate-bubble-pop-b" />
              <circle cx="1020" cy="38" r="1.8" fill="#F2871A" className="animate-bubble-pop-c" />
            </svg>
          </div>
        </div>
      );
  }
};
