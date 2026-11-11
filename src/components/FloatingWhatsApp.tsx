import { MessageCircle } from 'lucide-react';

export function FloatingWhatsApp({ href, label }: { href: string; label: string }) {
  return <a className="floating-whatsapp" href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
    <MessageCircle size={24} aria-hidden="true"/><span>Ask us</span>
  </a>;
}
