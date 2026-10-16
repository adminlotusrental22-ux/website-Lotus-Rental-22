import React from 'react';
import { ArrowUpRight, ShieldCheck, Smartphone, MapPin, MessageCircle, Wallet, Headphones } from 'lucide-react';
import { WHATSAPP_BOOKING_URL } from '../data/businessData';
export const HeroSection = () => <section className="page-width hero">
  <div className="hero-panel">
    <div className="hero-copy"><span className="eyebrow"><span className="status-dot"/> YOUR BAJO DAYS, SORTED.</span><h1>Bajo, at<br/><em>your pace.</em></h1><p>Scooters from Rp 100k/day.<br className="mobile-break"/> Airport or hotel delivery.</p><div className="hero-actions"><a href="#scooters" className="button hero-cta">Find your ride <ArrowUpRight size={17}/></a><a className="hero-whatsapp" href={WHATSAPP_BOOKING_URL} target="_blank" rel="noreferrer"><MessageCircle size={16}/><span>WhatsApp direct booking</span><ArrowUpRight size={13}/></a></div></div>
    <div className="hero-photo" role="img" aria-label="Sunset city and harbour view in Labuan Bajo"><span className="photo-label"><MapPin size={12}/> Labuan Bajo</span><span className="photo-note">Take the<br/><i>scenic way.</i></span></div>
  </div>
  <div className="rental-promise-strip" aria-label="Rental benefits"><div><ShieldCheck/><span><strong>Zero security deposit</strong><small>No passport held hostage</small></span></div><div><Wallet/><span><strong>Cash or QRIS</strong><small>Pay at scooter handover</small></span></div><div><Smartphone/><span><strong>Ready to ride</strong><small>2 helmets + phone mount</small></span></div><div><Headphones/><span><strong>Local assistance</strong><small>08:00–20:00 WITA</small></span></div></div>
</section>;

