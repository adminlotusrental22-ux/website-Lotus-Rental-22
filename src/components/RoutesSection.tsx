import React from 'react';
import { LABUAN_BAJO_ROUTES } from '../data/businessData';
import { Compass, ArrowRight } from 'lucide-react';

interface RoutesSectionProps {
  onSelectScooterForBooking: (scooterId: string) => void;
}

export const RoutesSection: React.FC<RoutesSectionProps> = ({ onSelectScooterForBooking }) => {
  return (
    <section id="routes" className="py-12 sm:py-20 bg-slate-950 text-white relative overflow-hidden font-sans">
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider mb-3 border border-amber-500/20">
            <Compass className="w-3.5 h-3.5" />
            <span>LABUAN BAJO RIDING JOURNAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Where Will Your Scooter Take You?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 leading-relaxed">
            Labuan Bajo is more than boat trips. Ride through pristine coastal highways, swim in crystal underground cave pools, and chase golden sunsets over the Komodo archipelago.
          </p>
        </div>

        {/* Bento-Style 3-Column Travel Card Grid (Horizontal Scroll on Mobile with Snap) */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 md:grid md:grid-cols-3 md:gap-6 md:pb-0 scrollbar-none">
          {LABUAN_BAJO_ROUTES.map((route) => {
            const distanceClean = route.distance.replace(' from town', '').replace(' north', '').replace(' from center', '');
            const timeClean = route.timeMins.replace(' ride', '');
            const distTimePill = `${distanceClean} • ${timeClean}`;

            return (
              <div
                key={route.id}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden hover:border-amber-500/40 transition duration-300 flex flex-col justify-between group h-full min-w-[280px] sm:min-w-[320px] md:min-w-0 snap-center shrink-0 md:shrink"
              >
                {/* Image Container (Top) */}
                <div className="w-full aspect-video sm:h-48 overflow-hidden relative bg-slate-800">
                  <img
                    src={route.imageUrl}
                    alt={route.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />

                  {/* Floating Badges on Image */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-black/60 backdrop-blur-md text-amber-400 text-xs font-semibold px-3 py-1 rounded-full border border-white/10 tracking-wider">
                      {route.tag}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 z-10">
                    <span className="bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full border border-white/10 font-medium">
                      {distTimePill}
                    </span>
                  </div>
                </div>

                {/* Card Body & Content Condensation */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-2">
                      {route.title}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
                      {route.subtitle}
                    </p>
                  </div>

                  {/* Compact Recommended Scooter Footer */}
                  <div className="pt-3 border-t border-slate-800/80 space-y-3 mt-auto">
                    <div className="text-xs text-slate-300 flex items-center justify-between gap-2">
                      <span className="text-slate-500 font-medium text-[11px] uppercase tracking-wider">Recommended:</span>
                      <span className="font-semibold text-amber-400 truncate max-w-[180px] text-right">{route.recommendedScooter}</span>
                    </div>

                    <button
                      onClick={() => onSelectScooterForBooking(route.scooterModelId)}
                      className="w-full inline-flex items-center justify-center gap-2 bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-slate-950 border border-amber-500/30 font-semibold py-2.5 px-4 rounded-xl transition duration-200 text-xs sm:text-sm"
                    >
                      <span>Reserve Bike</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
