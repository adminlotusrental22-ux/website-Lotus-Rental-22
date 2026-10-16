import React from 'react';
import { Plane, Hotel, Store, ChevronDown, Clock } from 'lucide-react';
export const DeliverySection = () => <section id="delivery" className="page-width content-section delivery-section">
  <div className="section-heading"><div><span className="eyebrow">MEET. GRAB THE KEYS. GO.</span><h2>Your ride, where you need it.</h2></div><span className="muted delivery-hours"><Clock size={14}/> 08:00–20:00 WITA</span></div>
  <div className="delivery-grid">{[
    {Icon:Plane,title:'Komodo Airport',sub:'Meet at the arrival exit',fee:'Rp 20k / scooter',detail:'Share your flight number and arrival time when booking. Our team will arrange the handover at the arrival exit with your scooter, two helmets, and phone mount.'},
    {Icon:Hotel,title:'Hotel or villa',sub:'Delivered to your doorstep',fee:'Rp 20k / scooter',detail:'Tell us your hotel or villa name and address. Confirm the delivery time and coverage with our team on WhatsApp before your trip.'},
    {Icon:Store,title:'Pick up yourself',sub:'Lotus garage · Wae Mata',fee:'No delivery fee',detail:'Pick up at our garage in Wae Mata, Labuan Bajo. Find the exact location and directions in the garage section below. Free luggage storage and helmet fitting are included.'}
  ].map(({Icon,title,sub,fee,detail}) => <details key={title} className="delivery-item"><summary><span className="delivery-icon"><Icon size={21}/></span><span className="delivery-title"><strong>{title}</strong><small>{sub}</small><b>{fee}</b></span><ChevronDown size={16}/></summary><p>{detail}</p></details>)}</div>
  <p className="section-note">Delivery fee is per scooter. Need an early or late handover? Confirm with us on WhatsApp.</p>
  <a className="text-link" href="#location">Find our garage & pickup directions ↗</a>
</section>;

