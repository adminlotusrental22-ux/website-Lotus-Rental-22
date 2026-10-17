import React from 'react';
import { MapPin, ArrowUpRight, MessageCircle } from 'lucide-react';
import { WHATSAPP_BOOKING_URL } from '../data/businessData';
import { LanguageSwitcher } from '../i18n/LanguageProvider';
import { LotusLogoCrest } from './LotusLogoCrest';
interface Props { onOpenBookingModal: () => void }
export const Header = ({ onOpenBookingModal }: Props) => <header className="site-header">
  <div className="page-width header-inner">
    <a href="#home" className="brand" aria-label="Lotus Rental 22 home"><LotusLogoCrest size="sm" showTextLabel={false} /><span className="brand-name">LOTUS <span>RENTAL 22</span><small><MapPin size={10}/> LABUAN BAJO</small></span></a>
    <nav className="desktop-nav" aria-label="Main navigation"><a href="#scooters">Scooters</a><a href="#how-it-works">How it works</a><a href="#delivery">Delivery</a><a href="#location">Garage</a><a href="#routes">Explore Bajo</a><a href="#trust">Guest moments</a><a href="#faq">FAQ</a></nav>
    <div className="header-actions"><LanguageSwitcher/><a className="header-whatsapp" href={WHATSAPP_BOOKING_URL} target="_blank" rel="noreferrer" aria-label="WhatsApp direct booking"><MessageCircle size={18}/><span>WhatsApp</span></a><button type="button" className="button primary desktop-book" aria-label="Book a ride" onClick={() => onOpenBookingModal()}><span className="book-label-desktop">Book a ride</span><span className="book-label-mobile">Book</span><ArrowUpRight size={16}/></button></div>
  </div>
</header>;



