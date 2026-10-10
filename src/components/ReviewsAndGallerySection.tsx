import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Star, ShieldCheck, Heart, PackageCheck } from 'lucide-react';

interface ReviewsAndGallerySectionProps {
  language: Language;
}

export const ReviewsAndGallerySection: React.FC<ReviewsAndGallerySectionProps> = ({
  language,
}) => {
  const t = TRANSLATIONS[language].feedback;

  const galleryItems = [
    {
      title: 'Hermetic Aroma Pouch',
      caption: 'Multi-layer food grade barrier locking in sacred cardamom & fenugreek aromatics.',
      badge: 'Export Packaging',
    },
    {
      title: 'Artisanal Sun-Drying',
      caption: 'Highland chilies dried naturally under Ethiopian sunlight before sorting.',
      badge: 'Natural Harvest',
    },
    {
      title: 'Stone Mill Grinding',
      caption: 'Slow milling speeds that preserve delicate volatile spice oils from heat degradation.',
      badge: 'Purity Standard',
    },
    {
      title: 'Mother’s Recipe Ratios',
      caption: 'Generational recipes measured by hand for perfect spice warmth and balance.',
      badge: 'Family Heritage',
    },
  ];

  return (
    <section id="reviews" className="py-24 bg-[#FAF6EE] border-t border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Testimonials Header */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold tracking-widest text-[#942F12] uppercase">
              Global Trust & Diaspora Love
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#30120B] font-serif-luxury tracking-tight">
              {t.title}
            </h2>
            <p className="text-base sm:text-lg text-[#614E43]">
              {t.subtitle}
            </p>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {t.reviews.map((rev, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 border border-[#E5D7BF] shadow-xs flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-[#F2871A]">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#F2871A]" />
                    ))}
                  </div>

                  <p className="text-sm text-[#4E3D34] leading-relaxed italic">
                    &ldquo;{rev.text}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F3ECE0] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#30120B] block">{rev.author}</span>
                    <span className="text-[#887366]">{rev.location}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#942F12] bg-[#F9EFE2] px-2 py-0.5 rounded">
                    {rev.product}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery / Packaging Craftsmanship Showcase */}
        <div id="gallery" className="pt-10 border-t border-[#E8DEC8]">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold tracking-widest text-[#942F12] uppercase">
              Packaging & Quality Gallery
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#30120B] font-serif-luxury">
              Crafted for Continental Travel
            </h3>
            <p className="text-sm text-[#665448]">
              Designed to look elegant on supermarket shelves and stay fresh in any home pantry.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-[#E6D9C5] shadow-xs hover:border-[#942F12]/40 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="h-28 rounded-xl bg-gradient-to-br from-[#4A160A] to-[#250904] p-4 flex flex-col justify-between text-white relative overflow-hidden">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFC499]">
                      {item.badge}
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="font-serif-luxury text-lg font-bold">Q&apos;mem Baltna</span>
                      <PackageCheck className="w-5 h-5 text-[#F2871A]" />
                    </div>
                  </div>

                  <h4 className="font-bold text-base text-[#30120B]">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#5E4B41] leading-relaxed">
                    {item.caption}
                  </p>
                </div>

                <div className="pt-3 mt-4 border-t border-[#F2ECE1] flex items-center gap-1.5 text-[11px] font-semibold text-[#8C462E]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2E6B34]" />
                  <span>Quality Inspected</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
