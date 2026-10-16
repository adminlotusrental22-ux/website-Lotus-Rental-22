import React, { useEffect, useId, useRef } from 'react';
import { X } from 'lucide-react';
export function Dialog({ title, onClose, children, className = '' }: { title: string; onClose: () => void; children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();
    return () => { dialog?.close(); document.body.style.overflow = oldOverflow; previous?.focus(); };
  }, []);
  return <dialog ref={ref} className={`dialog ${className}`} aria-labelledby={titleId} onCancel={e => { e.preventDefault(); onClose(); }} onClick={e => { if(e.target===e.currentTarget) onClose(); }}>
    <div className="dialog-inner"><header className="dialog-header"><div><span className="eyebrow">LOTUS RENTAL 22</span><h2 id={titleId}>{title}</h2></div><button type="button" className="icon-button" autoFocus onClick={onClose} aria-label="Close dialog"><X size={20}/></button></header>{children}</div>
  </dialog>;
}
