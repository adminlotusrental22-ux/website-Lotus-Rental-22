import React, { useEffect, useState } from 'react';
import { Bike, MapPin, Compass, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';
export const StickyMobileBar = () => {
  const [active, setActive] = useState('scooters');
  useEffect(() => {
    const observer = new IntersectionObserver(entries => { const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio-a.intersectionRatio)[0]; if (visible) setActive(visible.target.id); }, { rootMargin: '-10% 0px -40% 0px', threshold: [0, .1, .5] });
    ['scooters','delivery','routes'].forEach(id => { const element = document.getElementById(id); if(element) observer.observe(element); });
    return () => observer.disconnect();
  }, []);
  return <nav className="mobile-nav" aria-label="Quick navigation">{[{ id:'scooters', label:'Scooters', Icon:Bike },{ id:'delivery', label:'Delivery', Icon:MapPin },{ id:'routes', label:'Explore', Icon:Compass }].map(({id,label,Icon}) => <a key={id} href={`#${id}`} onClick={() => setActive(id)} className={active===id?'active':''} aria-current={active===id?'location':undefined}><Icon size={20}/><span>{label}</span></a>)}<a href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}`} target="_blank" rel="noreferrer"><MessageCircle size={20}/><span>Chat with us</span></a></nav>;
};
