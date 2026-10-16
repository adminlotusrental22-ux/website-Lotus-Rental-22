import React, { useState } from 'react';
import { MapPin, Clock, Luggage, ArrowUpRight, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO, WHATSAPP_BOOKING_URL } from '../data/businessData';

export const GarageLocationSection = () => {
  const [zoom, setZoom] = useState(15);
  return <section id="location" className="page-width content-section garage-section">
  <div className="section-heading"><div><span className="eyebrow">GARAGE & DIRECT PICKUP</span><h2>Visit our garage in Labuan Bajo.</h2></div><a className="text-link" href={BUSINESS_INFO.googleMapsUrl} target="_blank" rel="noreferrer">Open Google Maps <ArrowUpRight size={15}/></a></div>
  <div className="garage-grid">
    <div className="garage-copy"><p>Prefer to pick up your scooter? Come by our garage in Wae Mata. Check the map for our exact location.</p>
      <ul className="garage-facts"><li><MapPin size={17}/><div><strong>LOTUS RENTAL 22</strong><span>{BUSINESS_INFO.address}</span></div></li><li><Clock size={17}/><div><strong>Daily · 08:00–20:00 WITA</strong><span>Early or late handovers by prior WhatsApp arrangement.</span></div></li><li><Luggage size={17}/><div><strong>Travel light</strong><span>Free luggage storage during your rental & complimentary helmet fitting.</span></div></li></ul>
      <div className="garage-actions"><a className="button primary" href={BUSINESS_INFO.googleMapsUrl} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={16}/></a><a className="text-link" href={WHATSAPP_BOOKING_URL} target="_blank" rel="noreferrer"><MessageCircle size={16}/> Ask about pickup</a></div>
    </div>
    <div className="garage-media"><img className="garage-photo" src="/assets/garage/lotus-garage.jpg" alt="Rental scooters parked inside the Lotus Rental 22 garage in Wae Mata" width="1672" height="941" loading="lazy"/><div className="garage-map"><div className="map-zoom" role="group" aria-label="Map zoom"><button type="button" aria-label="Zoom in map" disabled={zoom >= 19} onClick={() => setZoom(z => Math.min(19,z+1))}>+</button><button type="button" aria-label="Zoom out map" disabled={zoom <= 10} onClick={() => setZoom(z => Math.max(10,z-1))}>−</button></div><iframe title="LOTUS RENTAL 22 garage location in Labuan Bajo" src={`https://maps.google.com/maps?q=-8.5035334,119.8878866&hl=en&z=${zoom}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen/><a className="map-open-link" href={BUSINESS_INFO.googleMapsUrl} target="_blank" rel="noreferrer"><MapPin size={13}/> LOTUS RENTAL 22 <ArrowUpRight size={14}/></a></div>
  </div>
<a className="text-link airport-directions" href="https://www.google.com/maps/dir/?api=1&origin=Komodo+International+Airport,+Labuan+Bajo&destination=-8.5035334,119.8878866&travelmode=driving" target="_blank" rel="noreferrer">Route from Komodo Airport · distance &amp; travel time <ArrowUpRight size={15}/></a></div></section>;
};






