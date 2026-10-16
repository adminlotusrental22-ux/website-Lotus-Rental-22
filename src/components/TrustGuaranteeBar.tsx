import React from 'react';
import { ShieldCheck, Truck, Headphones, Smartphone } from 'lucide-react';

export const TrustGuaranteeBar: React.FC = () => {
  const guarantees = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#C5A059]" />,
      title: 'Zero Security Deposit',
      description: 'No passport hold or hidden cash deposits. Simply pay the daily rate when bike is delivered.',
    },
    {
      icon: <Truck className="w-5 h-5 text-[#0D4D4D]" />,
      title: 'Airport (LBJ) & Hotel Delivery',
      description: 'We meet you directly at Komodo Airport arrival gates or hotel lobbies in Labuan Bajo.',
    },
    {
      icon: <Smartphone className="w-5 h-5 text-[#C5A059]" />,
      title: '2 Helmets & Phone Mount Included',
      description: 'Clean sanitized helmets and a sturdy handlebar phone holder included with every rental.',
    },
    {
      icon: <Headphones className="w-5 h-5 text-[#0D4D4D]" />,
      title: '08:00 AM – 08:00 PM Local Assistance',
      description: 'Standard hours 08:00 AM – 08:00 PM WITA. After-hours requests available upon advance WhatsApp confirmation.',
    },
  ];

  return (
    <section id="trust" className="py-6 sm:py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {guarantees.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="font-heading font-bold text-base text-[#11161B] mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
