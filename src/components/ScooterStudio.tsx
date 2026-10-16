import React, { useState } from 'react';
import { ArrowUpRight, SlidersHorizontal, Check, Bike, ChevronDown } from 'lucide-react';
import { SCOOTER_FLEET, formatPrice } from '../data/businessData';
import { Currency, ScooterCategory, ScooterModel } from '../types';
import { Dialog } from './Dialog';
interface Props { selectedCategory: ScooterCategory; onCategoryChange: (category: ScooterCategory) => void; currentCurrency: Currency; onSelectScooterForBooking: (id: string) => void }
const categories: {id:ScooterCategory;label:string}[] = [{id:'all',label:'All scooters'},{id:'compact',label:'Compact'},{id:'sport',label:'Sport & hills'},{id:'maxi',label:'Maxi'}];
const ridingLabels = {compact:'Light & easy',sport:'Made for exploring',maxi:'Room to stretch'};
export const ScooterStudio = ({ selectedCategory, onCategoryChange, currentCurrency, onSelectScooterForBooking }: Props) => {
  const [spec, setSpec] = useState<ScooterModel | null>(null);
  const [sort, setSort] = useState('recommended');
  const filtered = SCOOTER_FLEET.filter(s => selectedCategory==='all'||s.category===selectedCategory).slice().sort((a,b) => sort==='price-low'? a.dailyRateIdr-b.dailyRateIdr : sort==='price-high'?b.dailyRateIdr-a.dailyRateIdr:0);
  return <section id="scooters" className="fleet-section"><div className="page-width">
    <div className="section-heading fleet-heading"><div><span className="eyebrow">A LITTLE FREEDOM, EVERY DAY.</span><h2>Find your kind of ride<span className="gold-dot">.</span></h2><p className="desktop-only muted">From quick coffee runs to the long way home. All automatic, all yours to explore.</p></div><span className="fleet-count">{filtered.length} scooters</span></div>
    <div className="fleet-toolbar"><div className="filter-tabs" role="group" aria-label="Scooter category">{categories.map(c => <button key={c.id} aria-pressed={selectedCategory===c.id} className={selectedCategory===c.id?'selected':''} onClick={() => onCategoryChange(c.id)}>{c.label}</button>)}</div><label className="sort-picker"><SlidersHorizontal size={15}/><select aria-label="Sort scooters" value={sort} onChange={e=>setSort(e.target.value)}><option value="recommended">Recommended</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select><ChevronDown size={13}/></label></div>
    <div className="scooter-grid">{filtered.map((s,index) => <article className="scooter-card" key={s.id}>
      <button className="scooter-visual" onClick={() => setSpec(s)} aria-label={`View ${s.name} details`}><span className={`product-tag ${s.category==='maxi'?'gold':''}`}>{s.id==='honda-beat'?'Best value':s.id==='yamaha-nmax-155'?'Touring favourite':ridingLabels[s.category]}</span><img src={s.imageUrl} alt={s.name} loading={index<4?'eager':'lazy'} onError={e=>{e.currentTarget.style.display='none';e.currentTarget.nextElementSibling?.removeAttribute('hidden');}}/><span className="photo-fallback" hidden><Bike size={45}/>Photo on request</span></button>
      <div className="scooter-info"><p className="scooter-meta">{s.engineCc.split(' ')[0]} <span>·</span> Automatic</p><h3><button onClick={() => setSpec(s)}>{s.name}</button></h3><p className="ride-hint">{s.category==='compact'?'Town rides & café stops':s.category==='sport'?'Coastal roads & hill climbs':'Longer rides, extra comfort'}</p><div className="card-bottom"><div className="product-price"><strong>{formatPrice(s.dailyRateIdr,currentCurrency)}</strong><span>/ day</span></div><button className="card-book" onClick={() => onSelectScooterForBooking(s.id)} aria-label={`Book ${s.name}`}><span>Book</span><ArrowUpRight size={16}/></button></div></div>
    </article>)}</div>
    <p className="section-note fleet-note"><Check size={13}/> Every ride includes 2 helmets & a phone mount. <span>Product images are illustrative; colour and variant are confirmed by our team.</span>{currentCurrency!=='IDR'&&<span>Currency amounts are approximate. Final rates are in IDR.</span>}</p>
    {spec&&<Dialog title={spec.name} onClose={()=>setSpec(null)}><div className="dialog-body"><img className="spec-photo" src={spec.imageUrl} alt={spec.name}/><p>{spec.shortDesc}</p><dl className="spec-grid"><div><dt>Engine</dt><dd>{spec.engineCc}</dd></div><div><dt>Transmission</dt><dd>Automatic</dd></div><div><dt>Best for</dt><dd>{spec.idealFor}</dd></div><div><dt>Included</dt><dd>2 helmets, phone mount</dd></div></dl><p className="section-note">Photo and specifications are a guide. Confirm the exact variant with our team.</p></div><div className="dialog-footer"><div><small>Daily rate</small><strong>{formatPrice(spec.dailyRateIdr,currentCurrency)}</strong></div><button className="button primary" onClick={()=>{const id=spec.id;setSpec(null);onSelectScooterForBooking(id);}}>Book this ride <ArrowUpRight size={17}/></button></div></Dialog>}
  </div></section>;
};


