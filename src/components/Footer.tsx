import React from 'react';
import { LotusLogoCrest } from './LotusLogoCrest';
import { BUSINESS_INFO } from '../data/businessData';
import { MessageCircle, Phone, Mail, MapPin, Sparkles, Heart } from 'lucide-react';

interface FooterProps {
  onOpenBookingModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBookingModal }) => {
  return (
    <footer className="bg-[#0D1115] text-white pt-16 pb-12 border-t border-[#1E262E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#1E262E]">
          {/* Col 1: Brand Info & Emblem (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <LotusLogoCrest size="lg" className="text-white" />

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Lotus Rental 22 provides premium, hassle-free scooter rentals for travelers in Labuan Bajo, Flores. Free Komodo Airport (LBJ) and hotel delivery, zero security deposit, well-maintained bikes with helmets and phone holder included.
            </p>
          </div>

          {/* Col 2: Phase 1 & Phase 2 Services (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-heading font-extrabold text-sm text-[#F7E08B] uppercase tracking-wider">
              Services & Phase Roadmap
            </h4>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-[#161D23] rounded-xl border border-teal-500/30">
                <span className="font-bold text-[#62F2D0] block text-[11px] uppercase tracking-widest">
                  Active (Phase 1)
                </span>
                <p className="text-white font-bold text-sm mt-0.5">🛵 Scooter Rental Fleet</p>
                <p className="text-slate-400 text-[11px]">Honda Beat, Scoopy, Fazzio, Vario 125/160, NMAX 155, PCX 160</p>
              </div>

              <div className="p-3 bg-[#161D23]/60 rounded-xl border border-slate-800">
                <span className="font-bold text-amber-400 block text-[10px] uppercase tracking-widest flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Coming Soon (Phase 2)
                </span>
                <ul className="text-slate-400 text-[11px] mt-1 space-y-1">
                  <li>• Private Car + Driver (Labuan Bajo & Overland)</li>
                  <li>• Komodo Island Speedboat Tours</li>
                  <li>• Labuan Bajo City Tour & Sunset Trips</li>
                  <li>• Komodo Airport VIP Transfer</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Col 3: Contact & Address (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-extrabold text-sm text-[#F7E08B] uppercase tracking-wider">
              Contact & Location
            </h4>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.address}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#62F2D0] flex-shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phoneFormatted}`} className="hover:text-white transition-colors">
                  {BUSINESS_INFO.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-white transition-colors">
                  {BUSINESS_INFO.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Rights */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 LOTUS RENTAL 22 — Labuan Bajo, Indonesia. All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Crafted for travelers in</span>
            <span className="text-amber-400 font-bold">Labuan Bajo</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
          </div>
        </div>
      </div>
    </footer>
  );
};
