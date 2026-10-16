import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/businessData';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string>(FAQ_ITEMS[0].id);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredFaqs = FAQ_ITEMS.filter((faq) => {
    if (activeCategory === 'all') return true;
    return faq.category === activeCategory;
  });

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-[#0D4D4D] text-xs font-bold uppercase tracking-widest block">
            Clear Answers
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#11161B] tracking-tight font-heading">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm">
            Everything you need to know about renting a scooter with Lotus Rental 22 in Labuan Bajo.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeCategory === 'all'
                ? 'bg-[#11161B] text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            All Questions
          </button>
          <button
            onClick={() => setActiveCategory('booking')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeCategory === 'booking'
                ? 'bg-[#11161B] text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Booking & Documents
          </button>
          <button
            onClick={() => setActiveCategory('delivery')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeCategory === 'delivery'
                ? 'bg-[#11161B] text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Airport & Hotel Delivery
          </button>
          <button
            onClick={() => setActiveCategory('riding')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeCategory === 'riding'
                ? 'bg-[#11161B] text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Riding & Support
          </button>
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenId(isOpen ? '' : faq.id)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-heading font-bold text-base text-[#11161B]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 bg-[#11161B] text-white' : 'text-slate-600'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Unanswered Question Box */}
        <div className="mt-12 text-center bg-white p-6 rounded-3xl border border-slate-200 max-w-md mx-auto shadow-sm">
          <HelpCircle className="w-8 h-8 text-[#0D4D4D] mx-auto mb-2" />
          <h4 className="font-bold text-sm text-[#11161B]">Still have a question?</h4>
          <p className="text-xs text-slate-500 mt-1">
            Our standard operating hours are 08:00 AM – 08:00 PM WITA. For early morning flights or late arrivals, special arrangements can be requested upon advance confirmation via WhatsApp.
          </p>
          <a
            href={`https://wa.me/6282226392207?text=${encodeURIComponent(
              "Hi Lotus Rental 22! I have a question regarding your scooter rental service in Labuan Bajo:\n\n"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>Chat with Lotus Rental 22</span>
          </a>
        </div>
      </div>
    </section>
  );
};
