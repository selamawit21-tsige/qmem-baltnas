import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import {
  Building2,
  Store,
  UserCheck,
  MessageCircle,
  ArrowRight,
  Sparkles,
  CheckCircle,
} from 'lucide-react';

interface WhoWeServeSectionProps {
  language: Language;
}

export const WhoWeServeSection: React.FC<WhoWeServeSectionProps> = ({ language }) => {
  const t = TRANSLATIONS[language].whoWeServe;
  const [activeCard, setActiveCard] = useState<number | null>(null);

  // Character quotes / word bubbles for each persona
  const wordBubbles = [
    {
      role: 'Commercial Kitchens & Caterers',
      bubbles: [
        {
          speaker: 'Chef Dawit · London Habesha Grill',
          quote: '“We order 30kg of Berbere monthly. Zero batch variance and incredible deep red color.”',
          badge: 'Consistency Guarantee',
        },
        {
          speaker: 'Mesob Catering · Washington DC',
          quote: '“The Shiro dissolves smoothly in our 120-person banquet pots without clumping!”',
          badge: 'Bulk Kitchen Tested',
        },
      ],
      features: [
        '5kg & 10kg export buckets available',
        'Batch lab analysis certificates',
        'Direct airport cargo dispatch',
      ],
      icon: <Building2 className="w-8 h-8 text-[#942F12]" />,
    },
    {
      role: 'Retail & Diaspora Supermarkets',
      bubbles: [
        {
          speaker: 'Addis Supermarket · Toronto',
          quote: '“The multi-barrier standup pouches look luxurious on our shelves. Customers trust the export seal.”',
          badge: 'High Turnaround',
        },
        {
          speaker: 'Habesha Deli · Frankfurt am Main',
          quote: '“Aroma-locked foil keeps it freshly milled for 18 months. Never goes dull or stale.”',
          badge: 'Long Shelf Life',
        },
      ],
      features: [
        'GS1 international barcodes included',
        'Sanitary sealed resealable zippers',
        'Bilingual English & Amharic packaging',
      ],
      icon: <Store className="w-8 h-8 text-[#942F12]" />,
    },
    {
      role: 'Individual Diaspora & Global Gourmets',
      bubbles: [
        {
          speaker: 'Bethlehem T. · Atlanta, GA',
          quote: '“One bite of my weekend Doro Wat and I was instantly back in my grandmother’s kitchen in Addis!”',
          badge: 'Pure Nostalgia',
        },
        {
          speaker: 'Marcus L. · Culinary Explorer, Melbourne',
          quote: '“The Mitmita has this incredible cardamom floral heat unlike anything in Western supermarkets.”',
          badge: 'True Habesha Fire',
        },
      ],
      features: [
        'Express door-to-door courier dispatch',
        'Free authentic recipe booklet with each pack',
        '500g and 1kg family sizes',
      ],
      icon: <UserCheck className="w-8 h-8 text-[#942F12]" />,
    },
  ];

  return (
    <section id="who-we-serve" className="py-24 bg-[#FBF8F1] relative overflow-hidden scroll-mt-10">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#F2871A]/6 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F3E7D3] text-[#942F12] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#F2871A]" />
            <span>Connecting Diaspora & Global Palates</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#30120B] font-serif-luxury tracking-tight">
            {t.title}
          </h2>
          <p className="text-base sm:text-lg text-[#635044] leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* 3 Animated Cards with Dynamic Word Bubbles */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {t.items.map((channel, idx) => {
            const personaData = wordBubbles[idx];
            const isHovered = activeCard === idx;

            return (
              <div
                key={idx}
                onMouseEnter={() => setActiveCard(idx)}
                onMouseLeave={() => setActiveCard(null)}
                className={`relative bg-white rounded-3xl p-7 sm:p-8 border transition-all duration-300 flex flex-col justify-between space-y-6 ${
                  isHovered
                    ? 'border-[#942F12] shadow-2xl -translate-y-2 ring-1 ring-[#942F12]/30'
                    : 'border-[#E6D9C3] shadow-md hover:shadow-xl'
                }`}
              >
                {/* Floating Word Bubble 1 (Animated Speech Bubble) */}
                <div
                  className={`relative -mt-3 mb-2 p-3.5 rounded-2xl bg-[#FFF9F2] border border-[#ECD9C0] shadow-sm ${
                    idx % 2 === 0 ? 'animate-bubble' : 'animate-bubble-alt'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#942F12] uppercase mb-1">
                    <MessageCircle className="w-3 h-3 text-[#F2871A]" />
                    <span>{personaData.bubbles[0].speaker}</span>
                  </div>
                  <p className="text-xs text-[#523F34] italic font-medium leading-relaxed">
                    {personaData.bubbles[0].quote}
                  </p>

                  {/* Speech Bubble Tail */}
                  <div className="absolute -bottom-2 left-6 w-3 h-3 bg-[#FFF9F2] border-r border-b border-[#ECD9C0] rotate-45" />
                </div>

                {/* Card Main Identity */}
                <div className="space-y-4 pt-1">
                  <div className="w-16 h-16 rounded-2xl bg-[#FAF0E1] flex items-center justify-center shadow-inner">
                    {personaData.icon}
                  </div>

                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#FAF0E1] text-[#942F12] uppercase tracking-wider inline-block">
                    {channel.badge}
                  </span>

                  <h3 className="text-2xl font-bold text-[#30120B]">
                    {channel.title}
                  </h3>

                  <p className="text-sm text-[#5C4A3E] leading-relaxed">
                    {channel.desc}
                  </p>

                  {/* Persona Feature Bullets */}
                  <div className="space-y-2 pt-3 border-t border-[#F2ECE1]">
                    {personaData.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs font-semibold text-[#48372D]">
                        <CheckCircle className="w-3.5 h-3.5 text-[#2E6B34] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Second Word Bubble (Active Reveal on Hover or bottom accent) */}
                <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#E9DEC9] text-xs space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-[#8C7667]">
                    <span className="font-bold text-[#942F12]">{personaData.bubbles[1].badge}</span>
                    <span>Verified Feedback</span>
                  </div>
                  <p className="text-[11px] text-[#4E3C32] italic">
                    {personaData.bubbles[1].quote}
                  </p>
                </div>

                {/* CTA Action */}
                <div className="pt-2 border-t border-[#F2ECE1]">
                  <a
                    href="#contact"
                    className="w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 bg-[#F6ECE0] text-[#942F12] hover:bg-[#942F12] hover:text-white transition-all shadow-xs"
                  >
                    <span>Request Details for {channel.title.split(' ')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
