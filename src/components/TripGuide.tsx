import React from 'react';
import { ArrowUpRight, ChevronDown, MessageCircle, Check } from 'lucide-react';
import { BUSINESS_INFO, WHATSAPP_BOOKING_URL, FAQ_ITEMS, LABUAN_BAJO_ROUTES } from '../data/businessData';
import { HandoverGallery } from './HandoverGallery';
export const TripGuide = ({onBook}:{onBook:(id?:string)=>void}) => <>
  <section id="how-it-works" className="how-section"><div className="page-width how-inner"><h2>Three steps.<br/>Then you're off.</h2><ol><li><b>01</b><div><strong>Pick your scooter</strong><p>Choose a model and your travel dates.</p></div></li><li><b>02</b><div><strong>Confirm on WhatsApp</strong><p>Our team confirms availability, delivery &amp; document verification.</p></div></li><li><b>03</b><div><strong>Meet us & ride</strong><p>Inspect your scooter, then pay with cash or QRIS. No deposit.</p></div></li></ol></div><p className="page-width verification-note how-verification"><strong>Document verification</strong> {BUSINESS_INFO.verificationNote}</p></section>
  <section id="routes" className="page-width content-section"><div className="section-heading"><div><span className="eyebrow">THE LONG WAY IS THE GOOD WAY.</span><h2>A little further from ordinary.</h2></div><span className="muted desktop-only">Ideas for your days in Bajo</span></div><div className="route-grid">{LABUAN_BAJO_ROUTES.map(r=><article className="route-card" key={r.id}><div className="route-photo"><img src={r.imageUrl} alt={r.title} loading="lazy" decoding="async" width={r.id==="gua-rangko"?1536:1672} height={r.id==="gua-rangko"?1024:941}/></div><div className="route-body"><p className="eyebrow">{r.distance} · {r.timeMins}</p><h3>{r.title}</h3><p>{r.subtitle}</p><button className="text-link" onClick={()=>onBook(r.scooterModelId)}>Find a ride for this route <ArrowUpRight size={15}/></button></div></article>)}</div></section>
  <HandoverGallery />
  <section id="faq" className="page-width content-section faq-section"><div><span className="eyebrow">BEFORE YOU SET OFF.</span><h2>Good to know.</h2><p className="muted">A few answers for a smoother trip.</p><a className="text-link" href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}`} target="_blank" rel="noreferrer"><MessageCircle size={16}/> Ask us on WhatsApp <ArrowUpRight size={14}/></a></div><div className="faq-list">{FAQ_ITEMS.map(f=><details key={f.id}><summary>{f.question}<ChevronDown size={17}/></summary><p>{f.answer}</p></details>)}</div></section>
  <section className="page-width help-banner"><div><span className="eyebrow"><Check size={13}/> LOCAL TEAM. DIRECT BOOKING.</span><h2>See you on the road.</h2><p>Tell us your dates. We'll help with the rest.</p></div><div className="help-actions"><a className="button primary" href={WHATSAPP_BOOKING_URL} target="_blank" rel="noreferrer"><MessageCircle size={16}/> WhatsApp direct booking</a><button className="text-link" onClick={()=>onBook()}>Calculate my rental <ArrowUpRight size={15}/></button></div></section>
</>;




