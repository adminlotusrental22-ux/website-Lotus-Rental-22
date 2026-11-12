import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, MessageCircle, Menu, X } from 'lucide-react';
import { WHATSAPP_BOOKING_URL } from '../data/businessData';
import { LanguageSwitcher } from '../i18n/LanguageProvider';
import { LotusLogoCrest } from './LotusLogoCrest';
interface Props { onOpenBookingModal?: () => void; variant?: 'scooter' | 'tour' }
export const Header = ({ onOpenBookingModal, variant='scooter' }: Props) => {
  const tour=variant==='tour';
  const [menuOpen,setMenuOpen]=useState(false);
  const headerRef=useRef<HTMLElement>(null);
  useEffect(()=>{
    if(!menuOpen)return;
    const outside=(event:PointerEvent)=>{if(!headerRef.current?.contains(event.target as Node))setMenuOpen(false);};
    const escape=(event:KeyboardEvent)=>{if(event.key==='Escape'){setMenuOpen(false);headerRef.current?.querySelector<HTMLButtonElement>('.mobile-menu-toggle')?.focus();}};
    document.addEventListener('pointerdown',outside);
    document.addEventListener('keydown',escape);
    return()=>{document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',escape);};
  },[menuOpen]);
  return <header ref={headerRef} className={`site-header${tour?' site-header--tour':''}`}>
    <div className="page-width header-inner">
      <a href="#home" onClick={()=>setMenuOpen(false)} className="brand" aria-label="Lotus Rental 22 home"><LotusLogoCrest size="sm" /></a>
      {!tour&&<nav className="desktop-nav" aria-label="Main navigation"><a href="#scooters">Scooters</a><a href="#how-it-works">How it works</a><a href="#delivery">Delivery</a><a href="#location">Garage</a><a href="#routes">Explore Bajo</a><a href="#trust">Guest moments</a><a href="#private-tour">Private tour</a></nav>}
      <div className="header-actions">
        <a className={`tour-entry${tour?' tour-entry--back':''}`} href={tour?'#home':'#private-tour'}><span>{tour?'Scooter rental':'Private tour'}</span><ArrowUpRight size={14} aria-hidden="true"/></a>
        <LanguageSwitcher/>
        {!tour&&<a className="header-whatsapp" href={WHATSAPP_BOOKING_URL} target="_blank" rel="noreferrer" aria-label="WhatsApp direct booking"><MessageCircle size={18}/><span>WhatsApp</span></a>}
        {tour?<a className="button primary desktop-book" href="#tour-booking">Book tour <ArrowUpRight size={16}/></a>:<button type="button" className="button primary desktop-book" aria-label="Book a ride" onClick={onOpenBookingModal}><span className="book-label-desktop">Book a ride</span><span className="book-label-mobile">Book</span><ArrowUpRight size={16}/></button>}
        <button className="mobile-menu-toggle" type="button" aria-label="Menu" aria-expanded={menuOpen} aria-controls="mobile-header-navigation" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X size={22}/>:<Menu size={22}/>}</button>
      </div>
      {menuOpen&&<nav id="mobile-header-navigation" className="mobile-header-dropdown" aria-label="Mobile navigation" onClick={()=>setMenuOpen(false)}>
        <a href={tour?'#home':'#private-tour'}>{tour?'Scooter rental':'Private tour'}<ArrowUpRight size={17}/></a>
        {tour?<a href="#tour-booking">Book tour<ArrowUpRight size={17}/></a>:<button type="button" onClick={onOpenBookingModal}>Book a ride<ArrowUpRight size={17}/></button>}
      </nav>}
    </div>
  </header>;
};
