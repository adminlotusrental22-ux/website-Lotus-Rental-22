import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

interface HowItWorksProps {
  onOpenBookingModal: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenBookingModal }) => {
  const steps = [
    {
      number: '01',
      title: 'Pick Scooter',
      desc: 'Select from our fleet of 8 models. Choose dates and pickup location.',
    },
    {
      number: '02',
      title: 'Chat on WhatsApp',
      desc: 'Send details to confirm availability instantly. No deposit required.',
    },
    {
      number: '03',
      title: 'Airport or Hotel Handover',
      desc: 'We meet you at Komodo Airport (LBJ) or hotel with clean helmets & phone holder.',
    },
    {
      number: '04',
      title: 'Pay & Ride',
      desc: 'Inspect your bike, pay upon delivery in cash or transfer, and ride away.',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-20 bg-[#11161B] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Minimal Section Title */}
        <div className="max-w-2xl mb-12 space-y-2">
          <span className="text-[#C5A059] text-xs font-bold uppercase tracking-widest block">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
            Four Simple Steps. Zero Deposit.
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Renting a scooter in Labuan Bajo is fast and transparent.
          </p>
        </div>

        {/* Minimal Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-[#1C232B] p-6 rounded-2xl border border-[#2A343D] hover:border-[#C5A059]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-2xl font-extrabold font-heading text-[#C5A059] block mb-3">
                  {step.number}
                </span>
                <h3 className="text-base font-bold font-heading text-white mb-1.5">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Callout Box */}
        <div className="mt-10 bg-[#0D4D4D] text-white p-5 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-teal-500/20 shadow-xl">
          <div className="space-y-0.5 text-center sm:text-left">
            <h4 className="text-lg font-bold font-heading text-white">
              Ready to Rent in Labuan Bajo?
            </h4>
            <p className="text-xs text-teal-100">
              Instant confirmation on WhatsApp ({BUSINESS_INFO.phoneDisplay})
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Direct</span>
            </a>

            <button
              onClick={onOpenBookingModal}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-black bg-[#C5A059] hover:bg-[#E0B648] transition-all shadow"
            >
              <span>Book Scooter</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
