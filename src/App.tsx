import { isCityTourRoute } from './lib/tourRouting';
import { CityTourPage } from './components/CityTourPage';
import React, { useEffect, useState } from 'react';
import { Currency, ScooterCategory } from './types';
import { SiteFooter } from './components/SiteFooter';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ScooterStudio } from './components/ScooterStudio';
import { DeliverySection } from './components/DeliverySection';
import { BookingModal } from './components/BookingModal';
import { StickyMobileBar } from './components/StickyMobileBar';
import { TripGuide } from './components/TripGuide';
import { GarageLocationSection } from './components/GarageLocationSection';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { WHATSAPP_CHAT_URL } from './data/businessData';
import { resolveScooterId } from './lib/booking';
export default function App() {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' });
  }, []);
  const [cityTour,setCityTour]=useState(()=>isCityTourRoute(window.location.hash));
  useEffect(()=>{const update=()=>{const hash=window.location.hash;setCityTour(isCityTourRoute(hash));requestAnimationFrame(()=>{const el=document.getElementById(hash.slice(1));if(el instanceof HTMLDetailsElement)el.open=true;if(el)el.scrollIntoView({block:'start'});else window.scrollTo(0,0);});};window.addEventListener('hashchange',update);return()=>window.removeEventListener('hashchange',update);},[]);
  useEffect(()=>{document.title=cityTour?'Labuan Bajo City Tour · Toyota Rush | Lotus Rental 22':'Lotus Rental 22 — Premium Scooter Rental Labuan Bajo';},[cityTour]);
  const currency: Currency = 'IDR';
  const [category, setCategory] = useState<ScooterCategory>('all');
  const [bookingOpen, setBookingOpen] = useState(false);
  const [scooterId, setScooterId] = useState<string | null>(null);
  const openBooking = (id?: string) => {
    const validId = resolveScooterId(id);
    setScooterId(validId);
    setBookingOpen(true);
  };
  if(cityTour)return <CityTourPage/>;
  return <div className="app-shell">
    <a className="skip-link" href="#scooters">Skip to scooters</a>
    <Header onOpenBookingModal={openBooking} />
    <main id="home"><HeroSection />
      <ScooterStudio selectedCategory={category} onCategoryChange={setCategory} currentCurrency={currency} onSelectScooterForBooking={openBooking} />
      <DeliverySection /><GarageLocationSection /><TripGuide onBook={openBooking} />
    </main>
    <SiteFooter/>
    <StickyMobileBar /><FloatingWhatsApp href={WHATSAPP_CHAT_URL} label="Ask about scooter rental on WhatsApp" />
    <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} preselectedScooterId={scooterId} currentCurrency={currency} />
  </div>;
}






