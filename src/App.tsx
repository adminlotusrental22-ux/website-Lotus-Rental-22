import { PrivateTourPage } from './components/PrivateTourPage';
import React, { useEffect, useState } from 'react';
import { Currency, ScooterCategory } from './types';
import { LotusLogoCrest } from './components/LotusLogoCrest';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ScooterStudio } from './components/ScooterStudio';
import { DeliverySection } from './components/DeliverySection';
import { BookingModal } from './components/BookingModal';
import { StickyMobileBar } from './components/StickyMobileBar';
import { TripGuide } from './components/TripGuide';
import { GarageLocationSection } from './components/GarageLocationSection';
import { BUSINESS_INFO } from './data/businessData';
import { resolveScooterId } from './lib/booking';
export default function App() {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' });
  }, []);
  const [privateTour,setPrivateTour]=useState(window.location.hash==='#private-tour');
  useEffect(()=>{const update=()=>{const hash=window.location.hash;setPrivateTour(hash==='#private-tour'||hash.startsWith('#tour-'));requestAnimationFrame(()=>{const el=document.getElementById(hash.slice(1));if(el instanceof HTMLDetailsElement)el.open=true;if(el)el.scrollIntoView({block:'start'});else window.scrollTo(0,0);});};window.addEventListener('hashchange',update);return()=>window.removeEventListener('hashchange',update);},[]);
  useEffect(()=>{document.title=privateTour?'Private Labuan Bajo Tour · Toyota Rush | Lotus Rental 22':'Lotus Rental 22 — Premium Scooter Rental Labuan Bajo';},[privateTour]);
  const currency: Currency = 'IDR';
  const [category, setCategory] = useState<ScooterCategory>('all');
  const [bookingOpen, setBookingOpen] = useState(false);
  const [scooterId, setScooterId] = useState<string | null>(null);
  const openBooking = (id?: string) => {
    const validId = resolveScooterId(id);
    setScooterId(validId);
    setBookingOpen(true);
  };
  if(privateTour)return <PrivateTourPage/>;
  return <div className="app-shell">
    <a className="skip-link" href="#scooters">Skip to scooters</a>
    <Header onOpenBookingModal={openBooking} />
    <main id="home"><HeroSection />
      <ScooterStudio selectedCategory={category} onCategoryChange={setCategory} currentCurrency={currency} onSelectScooterForBooking={openBooking} />
      <DeliverySection /><GarageLocationSection /><TripGuide onBook={openBooking} />
    </main>
    <footer className="site-footer"><div className="page-width policy-footer-links"><a href="#rental-terms" onClick={()=>{const el=document.getElementById("rental-terms") as HTMLDetailsElement;if(el)el.open=true;}}>Rental terms</a><a href="#privacy-policy" onClick={()=>{const el=document.getElementById("privacy-policy") as HTMLDetailsElement;if(el)el.open=true;}}>Privacy &amp; verification</a></div><div className="page-width footer-inner"><div><a href="#home" className="footer-brand" aria-label="Lotus Rental 22 home"><LotusLogoCrest size="lg" showTextLabel={false}/><strong>LOTUS RENTAL 22</strong></a><p>Local wheels. More of Bajo.</p><details className="footer-coming-soon"><summary>More from Lotus · coming soon</summary><p>Private car + driver · Komodo speedboat tours · City & sunset trips · Airport VIP transfers</p></details></div><div><a href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}`} target="_blank" rel="noreferrer">{BUSINESS_INFO.phoneDisplay}</a><a href={`mailto:${BUSINESS_INFO.email}`}>{BUSINESS_INFO.email}</a></div><div><p className="footer-address"><strong>Address</strong><br/>{BUSINESS_INFO.address}<br/>{BUSINESS_INFO.fullAddress}</p><a href={BUSINESS_INFO.googleMapsUrl} target="_blank" rel="noreferrer">Visit our garage · Google Maps ↗</a><a href="https://www.instagram.com/lotus_rental22/" target="_blank" rel="noreferrer">Instagram · @lotus_rental22</a><p>Daily · 08:00–19:00 WITA · Cash / QRIS</p></div></div></footer>
    <StickyMobileBar />
    <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} preselectedScooterId={scooterId} currentCurrency={currency} />
  </div>;
}






