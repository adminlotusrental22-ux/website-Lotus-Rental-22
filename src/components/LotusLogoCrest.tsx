import React from 'react';
interface LotusLogoCrestProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTextLabel?: boolean;
}
export const LotusLogoCrest = ({className = '', size = 'md', showTextLabel = true}: LotusLogoCrestProps) => (
  <span className={`lotus-logo lotus-logo--${size} ${className}`}>
    <img src="/assets/brand/lotus-flower.svg?v=lotus-ripples6" alt="Lotus Rental 22 — Labuan Bajo" width="256" height="256" />
    {showTextLabel && <span className="lotus-logo-label">LOTUS RENTAL 22<small>LABUAN BAJO</small></span>}
  </span>
);
