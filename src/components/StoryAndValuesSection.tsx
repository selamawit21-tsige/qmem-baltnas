import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Heart, Award, Users, Compass, Shield, Building2, Store, UserCheck } from 'lucide-react';

interface StoryAndValuesSectionProps {
  language: Language;
}

export const StoryAndValuesSection: React.FC<StoryAndValuesSectionProps> = ({
  language,
}) => {
  const story = TRANSLATIONS[language].story;
  const diff = TRANSLATIONS[language].differentiators;
  const serve = TRANSLATIONS[language].whoWeServe;

  const diffIcons = [
    <Award key="0" className="w-6 h-6 text-[#942F12]" />,
    <Shield key="1" className="w-6 h-6 text-[#942F12]" />,
    <Users key="2" className="w-6 h-6 text-[#942F12]" />,
    <Heart key="3" className="w-6 h-6 text-[#942F12]" />,
    <Compass key="4" className="w-6 h-6 text-[#942F12]" />,
  ];

  const serveIcons = [
    <Building2 key="0" className="w-7 h-7 text-[#942F12]" />,
    <Store key="1" className="w-7 h-7 text-[#942F12]" />,
    <UserCheck key="2" className="w-7 h-7 text-[#942F12]" />,
  ];

  return (
    <div id="about" className="scroll-mt-10">
      {/* 1. Our Story Section */}
      <section className="py-24 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Story Text */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold tracking-widest text-[#942F12] uppercase">
                From Our Hearth to the World
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#30120B] font-serif-luxury tracking-tight">
                {story.title}
              </h2>
              <p className="text-lg text-[#85452C] font-medium">
                {story.subtitle}
              </p>

              <div className="space-y-4 text-base text-[#57443A] leading-relaxed">
                <p>{story.paragraph1}</p>
                <p>{story.paragraph2}</p>
              </div>

              {/* Quotation Plaque */}
              <blockquote className="my-6 p-6 rounded-2xl bg-[#F7EFE2] border-l-4 border-[#942F12] text-[#4F190B] font-serif-luxury text-xl sm:text-2xl italic leading-snug">
                {story.quote}
              </blockquote>

              {/* Mission & Vision Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-3">
                <div className="p-5 rounded-xl bg-white border border-[#EADBCA] shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-[#942F12] font-bold text-sm uppercase">
                    <Heart className="w-4 h-4 text-[#F2871A]" />
                    <span>{story.missionTitle}</span>
                  </div>
                  <p className="text-xs text-[#5D4A3F] leading-relaxed">
                    {story.missionText}
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-white border border-[#EADBCA] shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-[#942F12] font-bold text-sm uppercase">
                    <Compass className="w-4 h-4 text-[#F2871A]" />
                    <span>{story.visionTitle}</span>
                  </div>
                  <p className="text-xs text-[#5D4A3F] leading-relaxed">
                    {story.visionText}
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Callout Box with Heritage Details */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl bg-[#30120B] text-[#FFF4E8] p-8 sm:p-10 shadow-2xl border border-[#F2871A]/30 overflow-hidden">
                <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-[#942F12]/30 rounded-full blur-2xl pointer-events-none" />

                <div className="space-y-6 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-[#942F12] flex items-center justify-center text-[#F2871A] shadow-inner">
                    <Award className="w-6 h-6" />
                  </div>

                  <h3 className="text-2xl font-bold font-serif-luxury text-white">
                    The Q&apos;mem Baltna Standard
                  </h3>

                  <p className="text-sm text-[#DEC7B8] leading-relaxed">
                    We prepare every batch to international sanitary export regulations without sacrificing a single drop of mother&apos;s traditional spice depth.
                  </p>

                  <div className="space-y-3 pt-4 border-t border-[#542B1F] text-xs">
                    <div className="flex items-center justify-between py-1">
                      <span className="text-[#B9A394]">Processing Center:</span>
                      <span className="font-semibold text-white">Bole Wollo Sefer Garad Bldg</span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-[#B9A394]">Parent Organization:</span>
                      <span className="font-semibold text-white">Nobe Business Holdings</span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-[#B9A394]">Origin:</span>
                      <span className="font-semibold text-white">Addis Ababa, Ethiopia</span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-[#B9A394]">Dispatch Standard:</span>
                      <span className="font-semibold text-[#F2871A]">Aroma-Barrier Export Sealed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. What Makes Us Different? */}
      <section className="py-20 bg-[#F5ECE0] border-t border-[#E8DEC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold tracking-widest text-[#942F12] uppercase">
              Core Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#30120B] font-serif-luxury tracking-tight">
              {diff.title}
            </h2>
            <p className="text-base text-[#614E43] leading-relaxed">
              {diff.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {diff.items.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#E3D4BD] shadow-xs hover:shadow-md transition-shadow space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F7EFE4] flex items-center justify-center">
                  {diffIcons[idx % diffIcons.length]}
                </div>
                <h3 className="text-lg font-bold text-[#30120B]">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5D4A3F] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
