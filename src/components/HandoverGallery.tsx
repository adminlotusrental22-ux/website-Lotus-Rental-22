import React, { useState } from 'react';
import { Image } from 'lucide-react';
import { GUEST_STORIES } from '../data/guestStories';

export const HandoverGallery = () => {
  const [held, setHeld] = useState(false);
  // Repeat short collections so both halves fill a wide screen and loop seamlessly.
  const originals = GUEST_STORIES.length;
  const itemCount = originals ? Math.ceil(8 / originals) * originals : 8;
  const items = Array.from({ length: itemCount }, (_, i) => originals ? GUEST_STORIES[i % originals] : null);
  return <section id="trust" className="guest-ribbon-section" aria-label="Guest handover photos">
    <div className="page-width guest-ribbon-heading"><h2>Trusted by our guests.</h2></div>
    <div className="guest-ribbon" tabIndex={0} role="region" aria-label="Guest photo gallery. Focus or hold to pause."
      onTouchStart={() => setHeld(true)} onTouchEnd={() => setHeld(false)} onTouchCancel={() => setHeld(false)}>
      <div className={`guest-ribbon-track${held ? ' is-held' : ''}`} style={{ animationDuration: `${itemCount * 7}s` }}>
        {[0, 1].map(copy => <div className="guest-ribbon-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
          {items.map((photo, index) => <div className={`guest-ribbon-photo${photo ? '' : ' is-upcoming'}`} key={`${copy}-${index}`} data-landscape={photo?.landscape || undefined} aria-hidden={!photo || index >= originals ? true : undefined}>
            {photo ? <img src={photo.imageUrl} alt={copy === 0 && index < originals ? photo.imageAlt : ''} loading="eager" draggable={false}/> : <Image size={28} strokeWidth={1}/>}
          </div>)}
        </div>)}
      </div>
    </div>
    {!originals && <p className="guest-ribbon-note">Guest photos coming soon.</p>}
  </section>;
};




