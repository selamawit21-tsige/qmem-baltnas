import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { BrandLogo } from './BrandLogo';
import {
  Instagram,
  Linkedin,
  Facebook,
  Phone,
  Mail,
  MapPin,
  ArrowUp,
  MessageSquare,
  ChefHat,
  Clock,
} from 'lucide-react';

interface FooterProps {
  language: Language;
  onOpenKitchenHelper?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onOpenKitchenHelper }) => {
  const t = TRANSLATIONS[language].footer;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1C0904] text-[#EFE4DA] border-t border-[#3B150A] relative overflow-hidden">
      {/* Decorative ambient glow */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-[#942F12]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#36130B]">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-5">
            <BrandLogo className="h-14" invertLight={true} />
            <p className="text-sm text-[#CDB9A9] max-w-sm leading-relaxed">
              Every taste carries the memory of home. Hand-crafted from authentic Habesha recipes, prepared to export standards for families, chefs, and diaspora communities around the world.
            </p>
            <div className="text-xs text-[#E78200] font-semibold tracking-wider uppercase">
              Powered by Nobe Business Holdings
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              {t.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs text-[#BBA798]">
              <li>
                <a href="#home" className="hover:text-[#F2871A] transition-colors">
                  Home & Overview
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-[#F2871A] transition-colors">
                  Shop 4 Premium Spices
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#F2871A] transition-colors">
                  Our Mother&apos;s Recipe Story
                </a>
              </li>
              <li>
                <a href="#heritage" className="hover:text-[#F2871A] transition-colors">
                  Four Spices, One Heritage
                </a>
              </li>
              <li>
                <a href="#who-we-serve" className="hover:text-[#F2871A] transition-colors">
                  Commercial Bulk & Retail
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#F2871A] transition-colors">
                  Direct Inquiries & Order Line
                </a>
              </li>
              {onOpenKitchenHelper && (
                <li className="pt-1">
                  <button
                    onClick={onOpenKitchenHelper}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#2D120B] border border-[#F2871A]/40 text-[#F2871A] hover:bg-[#3D1A10] hover:text-white transition-all text-xs font-semibold"
                  >
                    <ChefHat className="w-3.5 h-3.5" />
                    <span>Kitchen Helper Cooking Timers</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Contact & Social Links */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              {t.followUs}
            </h4>

            {/* Social Media Accounts: Instagram, LinkedIn, Facebook, TikTok, WhatsApp */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-[#2D120B] border border-[#481E13] flex items-center justify-center text-[#E5D2C2] hover:text-[#F2871A] hover:border-[#F2871A]/50 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-[#2D120B] border border-[#481E13] flex items-center justify-center text-[#E5D2C2] hover:text-[#F2871A] hover:border-[#F2871A]/50 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-[#2D120B] border border-[#481E13] flex items-center justify-center text-[#E5D2C2] hover:text-[#F2871A] hover:border-[#F2871A]/50 transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-[#2D120B] border border-[#481E13] flex items-center justify-center text-[#E5D2C2] hover:text-[#F2871A] hover:border-[#F2871A]/50 transition-all"
                aria-label="TikTok"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.16 1.18 2.09 2.35 2.26.88.14 1.82-.09 2.49-.67.65-.54.98-1.39.97-2.25.03-4.48-.01-8.96.02-13.44.02-.32.06-.65.12-.97.1-.48.24-.95.43-1.41.35-.87.89-1.65 1.57-2.28z" />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/251903195454"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>

            {/* Quick contact direct info */}
            <div className="space-y-2 pt-2 text-xs text-[#BBA798]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#F2871A]" />
                <span>Bole Wollo Sefer Garad Bldg, Addis Ababa</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#F2871A]" />
                <a href="tel:+251903195454" className="hover:text-white transition-colors">
                  +251 903 19 54 54
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#F2871A]" />
                <a href="mailto:info@qmembaltna.com" className="hover:text-white transition-colors">
                  info@qmembaltna.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Exact Required Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9E8B7F]">
          <p className="font-medium text-center sm:text-left">
            © 2025 Q&apos;mem Baltna · Product by Q&apos;memBaltna · Packed by Nobe Business Holdings
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2D120B] border border-[#481E13] text-[#E5D2C2] hover:text-white hover:bg-[#3D1A10] transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
