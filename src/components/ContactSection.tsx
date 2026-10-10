import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { MapPin, Phone, Mail, Globe, Send, CheckCircle2, MessageSquare } from 'lucide-react';

interface ContactSectionProps {
  language: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ language }) => {
  const t = TRANSLATIONS[language].contact;

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setFormState({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  return (
    <section id="contact" className="py-24 bg-[#FDFBF7] scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold tracking-widest text-[#942F12] uppercase">
            We Value Every Connection
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#30120B] font-serif-luxury tracking-tight">
            {t.title}
          </h2>
          <p className="text-base sm:text-lg text-[#614E43]">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-[#30120B] text-[#FFF5EB] rounded-3xl p-8 sm:p-10 shadow-xl border border-[#F2871A]/20 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#F2871A]">
                  Corporate Office & Facility
                </span>
                <h3 className="text-2xl font-bold font-serif-luxury text-white mt-1">
                  Q&apos;mem Baltna
                </h3>
                <p className="text-xs text-[#DEC8BA] mt-1">
                  Packed & Powered by Nobe Business Holdings
                </p>
              </div>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#542114] flex items-center justify-center shrink-0 text-[#F2871A]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#B9A394] block">
                      {t.addressLabel}
                    </span>
                    <span className="font-medium text-white leading-relaxed">
                      {t.addressVal}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#542114] flex items-center justify-center shrink-0 text-[#F2871A]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#B9A394] block">
                      {t.phoneLabel}
                    </span>
                    <a
                      href="tel:+251903195454"
                      className="font-medium text-white hover:text-[#F2871A] transition-colors"
                    >
                      +251 903 19 54 54
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#542114] flex items-center justify-center shrink-0 text-[#F2871A]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#B9A394] block">
                      {t.emailLabel}
                    </span>
                    <a
                      href="mailto:info@qmembaltna.com"
                      className="font-medium text-white hover:text-[#F2871A] transition-colors"
                    >
                      info@qmembaltna.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#542114] flex items-center justify-center shrink-0 text-[#F2871A]">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#B9A394] block">
                      {t.webLabel}
                    </span>
                    <a
                      href="https://www.qmembaltna.com"
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-white hover:text-[#F2871A] transition-colors"
                    >
                      www.qmembaltna.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Ordering Assistance */}
            <div className="pt-6 border-t border-[#542B1F] flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-[#B9A394]">Instant Support</span>
                <span className="text-sm font-bold text-white block">Chat on WhatsApp</span>
              </div>
              <a
                href="https://wa.me/251903195454?text=Hello%20Qmem%20Baltna,%20I%20would%20like%20to%20inquire%20about%20ordering%20spices."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366] text-white font-bold text-xs hover:bg-[#1EBE5D] transition-colors shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>+251 903 19 54 54</span>
              </a>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[#E7D9C2] shadow-sm">
            <h3 className="text-2xl font-bold text-[#30120B] font-serif-luxury mb-6">
              Send an Inquiry or Wholesale Request
            </h3>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-[#F0F8F1] border border-[#BBE3C2] text-center space-y-3 animate-in fade-in">
                <CheckCircle2 className="w-12 h-12 text-[#2E6B34] mx-auto" />
                <h4 className="text-lg font-bold text-[#1E5224]">
                  {t.messageSent}
                </h4>
                <p className="text-xs text-[#3D6B42]">
                  We will get back to your email within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 text-xs font-bold text-[#1E5224] bg-white rounded-lg border border-[#BBE3C2]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#554238] uppercase mb-1">
                      {t.formName} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      placeholder="e.g. Almaz Bekele"
                      className="w-full px-4 py-3 rounded-xl border border-[#DACBB5] text-sm text-[#30120B] focus:outline-none focus:ring-2 focus:ring-[#942F12] focus:border-transparent bg-[#FDFBF7]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#554238] uppercase mb-1">
                      {t.formEmail} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-[#DACBB5] text-sm text-[#30120B] focus:outline-none focus:ring-2 focus:ring-[#942F12] focus:border-transparent bg-[#FDFBF7]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#554238] uppercase mb-1">
                    {t.formSubject}
                  </label>
                  <input
                    type="text"
                    value={formState.subject}
                    onChange={(e) =>
                      setFormState({ ...formState, subject: e.target.value })
                    }
                    placeholder="e.g. Export Shipping to London / Restaurant Bulk Order"
                    className="w-full px-4 py-3 rounded-xl border border-[#DACBB5] text-sm text-[#30120B] focus:outline-none focus:ring-2 focus:ring-[#942F12] focus:border-transparent bg-[#FDFBF7]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#554238] uppercase mb-1">
                    {t.formMessage} *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    placeholder="Tell us what spices, quantities, or delivery location you are inquiring about..."
                    className="w-full px-4 py-3 rounded-xl border border-[#DACBB5] text-sm text-[#30120B] focus:outline-none focus:ring-2 focus:ring-[#942F12] focus:border-transparent bg-[#FDFBF7]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#942F12] text-white font-bold text-sm hover:bg-[#7D240B] shadow-md transition-all inline-flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.sendMessage}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
