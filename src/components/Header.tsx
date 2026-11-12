import React from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { WHATSAPP_BOOKING_URL } from '../data/businessData';
import { LanguageSwitcher } from '../i18n/LanguageProvider';
import { LotusLogoCrest } from './LotusLogoCrest';
interface Props { onOpenBookingModal?: () => void; variant?: 'scooter' | 'tour' }
export const Header = ({ onOpenBookingModal, variant='scooter' }: Props) => {
  const tour=variant==='tour';
  return <header className={`site-header${tour?' site-header--tour':''}`}>
    <div className="page-width header-inner">
      <a href="#home" className="brand" aria-label="Lotus Rental 22 home"><LotusLogoCrest size="sm" /></a>
      {!tour&&<nav className="desktop-nav" aria-label="Main navigation"><a href="#scooters">Scooters</a><a href="#how-it-works">How it works</a><a href="#delivery">Delivery</a><a href="#location">Garage</a><a href="#routes">Explore Bajo</a><a href="#trust">Guest moments</a><a href="#private-tour">Private tour</a></nav>}
      <div className="header-actions">
        <a className={`tour-entry${tour?' tour-entry--back':''}`} href={tour?'#home':'#private-tour'}><span>{tour?'Scooter rental':'Private tour'}</span><ArrowUpRight size={14} aria-hidden="true"/></a>
        <LanguageSwitcher/>
        {!tour&&<a className="header-whatsapp" href={WHATSAPP_BOOKING_URL} target="_blank" rel="noreferrer" aria-label="WhatsApp direct booking"><MessageCircle size={18}/><span>WhatsApp</span></a>}
        {tour?<a className="button primary desktop-book" href="#tour-booking">Book tour <ArrowUpRight size={16}/></a>:<button type="button" className="button primary desktop-book" aria-label="Book a ride" onClick={onOpenBookingModal}><span className="book-label-desktop">Book a ride</span><span className="book-label-mobile">Book</span><ArrowUpRight size={16}/></button>}
      </div>
    </div>
  </header>;
};
