import React, { useEffect, useState } from 'react';
import { Bike, MapPin, Compass, ClipboardList } from 'lucide-react';
export const StickyMobileBar = () => {
  const [active, setActive] = useState('scooters');
  useEffect(() => {
    let frame=0;
    const update=()=>{
      frame=0;
      const marker=(document.querySelector('.site-header')?.getBoundingClientRect().bottom ?? 80)+24;
      let current='scooters';
      for(const id of ['scooters','delivery','routes','rental-policies']){
        const section=document.getElementById(id);
        if(section&&section.getBoundingClientRect().top<=marker)current=id;
      }
      setActive(current);
    };
    const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',schedule);
    const observer=new ResizeObserver(schedule);
    observer.observe(document.body);
    update();
    return ()=>{cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);};
  }, []);
  return <nav className="mobile-nav" aria-label="Quick navigation">{[{ id:'scooters', label:'Scooters', Icon:Bike },{ id:'delivery', label:'Delivery', Icon:MapPin },{ id:'routes', label:'Explore', Icon:Compass },{ id:'rental-policies', label:'FAQ', Icon:ClipboardList }].map(({id,label,Icon}) => <a key={id} href={`#${id}`} className={active===id?'active':''} aria-current={active===id?'location':undefined}><Icon size={20}/><span>{label}</span></a>)}</nav>;
};
