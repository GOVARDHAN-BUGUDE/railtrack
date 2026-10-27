import React from 'react';
import { Ticket, Compass, Search, ArrowRightLeft, Calendar, ShieldCheck, Clock, Zap } from 'lucide-react';
import { SeatClass } from '../types/railway';
import { POPULAR_CITIES } from '../data/trainsData';

interface HeroBannerProps {
  activeTab: 'book' | 'track';
  setActiveTab: (tab: 'book' | 'track') => void;
  // Booking filters
  originCity: string;
  setOriginCity: (city: string) => void;
  destinationCity: string;
  setDestinationCity: (city: string) => void;
  travelDate: string;
  setTravelDate: (date: string) => void;
  selectedClassFilter: string;
  setSelectedClassFilter: (cls: string) => void;
  onSearchTrains: () => void;
  onSwapStations: () => void;
  // Tracking search
  trackQuery: string;
  setTrackQuery: (query: string) => void;
  onTrackSearch: (trainNum?: string) => void;
  availableTrainNumbers: Array<{ number: string; name: string }>;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  activeTab,
  setActiveTab,
  originCity,
  setOriginCity,
  destinationCity,
  setDestinationCity,
  travelDate,
  setTravelDate,
  selectedClassFilter,
  setSelectedClassFilter,
  onSearchTrains,
  onSwapStations,
  trackQuery,
  setTrackQuery,
  onTrackSearch,
  availableTrainNumbers,
}) => {
  return (
    <div className="bg-[#1f2937] text-white pt-10 pb-16 px-4 sm:px-8 relative overflow-hidden border-b border-slate-700">
      {/* Subtle decorative geometric grid lines in navy */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Header Typography */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800/80 border border-slate-700 rounded-[6px] text-xs font-medium text-cyan-300 mb-3">
            <Zap className="w-3.5 h-3.5 text-[#008ecc]" />
            <span>Official Real-Time Rail Reservation & GPS Radar</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading tracking-tight text-white text-balance leading-tight">
            Track Live Trains & Book Confirmed Seats
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Instant real-time seat availability across Sleeper (118), AC 3-Tier (88), AC 2-Tier (68), and First Class (43). Live GPS train tracking by train number with zero hassle cancellations.
          </p>
        </div>

        {/* Tab & Search Control Container */}
        <div className="bg-white rounded-[8px] p-4 sm:p-6 text-slate-900 shadow-[0_4px_6px_rgba(0,0,0,0.1)] border border-slate-100">
          {/* Tab Switcher */}
          <div className="flex items-center gap-3 border-b border-slate-200 pb-4 mb-5">
            <button
              onClick={() => setActiveTab('book')}
              className={`flex items-center gap-2.5 pb-2 text-sm sm:text-base font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'book'
                  ? 'border-[#008ecc] text-[#008ecc]'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Ticket className="w-5 h-5" />
              <span>Book Train Tickets</span>
            </button>

            <button
              onClick={() => setActiveTab('track')}
              className={`flex items-center gap-2.5 pb-2 text-sm sm:text-base font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'track'
                  ? 'border-[#008ecc] text-[#008ecc]'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Compass className="w-5 h-5" />
              <span>Track Train by Number</span>
            </button>
          </div>

          {/* Conditional View: Booking Search Form */}
          {activeTab === 'book' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                {/* From Station */}
                <div className="md:col-span-3">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                    From Station
                  </label>
                  <select
                    value={originCity}
                    onChange={(e) => setOriginCity(e.target.value)}
                    className="w-full h-11 px-3 bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-[#008ecc] focus:ring-2 focus:ring-[#008ecc]/20 rounded-[8px] text-sm text-slate-900 font-medium transition-all"
                  >
                    {POPULAR_CITIES.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Swap button */}
                <div className="hidden md:flex md:col-span-1 justify-center pb-1">
                  <button
                    type="button"
                    onClick={onSwapStations}
                    title="Swap origin and destination"
                    className="w-10 h-10 rounded-[8px] border border-slate-200 hover:border-[#008ecc] bg-white hover:bg-cyan-50 text-slate-600 hover:text-[#008ecc] flex items-center justify-center transition-all shadow-xs"
                  >
                    <ArrowRightLeft className="w-4 h-4" />
                  </button>
                </div>

                {/* To Station */}
                <div className="md:col-span-3">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                    To Station
                  </label>
                  <select
                    value={destinationCity}
                    onChange={(e) => setDestinationCity(e.target.value)}
                    className="w-full h-11 px-3 bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-[#008ecc] focus:ring-2 focus:ring-[#008ecc]/20 rounded-[8px] text-sm text-slate-900 font-medium transition-all"
                  >
                    {POPULAR_CITIES.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Travel Date */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                    Journey Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full h-11 px-3 bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-[#008ecc] focus:ring-2 focus:ring-[#008ecc]/20 rounded-[8px] text-sm text-slate-900 font-medium transition-all"
                    />
                  </div>
                </div>

                {/* Class selector */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                    Travel Class
                  </label>
                  <select
                    value={selectedClassFilter}
                    onChange={(e) => setSelectedClassFilter(e.target.value)}
                    className="w-full h-11 px-3 bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-[#008ecc] focus:ring-2 focus:ring-[#008ecc]/20 rounded-[8px] text-sm text-slate-900 font-medium transition-all"
                  >
                    <option value="ALL">All Classes (SL, 3A, 2A, 1A)</option>
                    <option value="Sleeper">Sleeper Class (SL)</option>
                    <option value="3A">AC 3 Tier (3A)</option>
                    <option value="2A">AC 2 Tier (2A)</option>
                    <option value="1A">AC First Class (1A)</option>
                  </select>
                </div>

                {/* Search CTA */}
                <div className="md:col-span-1 flex items-end">
                  <button
                    onClick={onSearchTrains}
                    id="search-trains-btn"
                    className="w-full h-11 bg-[#008ecc] hover:bg-[#007cb3] text-white font-semibold rounded-[8px] flex items-center justify-center gap-1.5 shadow-sm transition-all whitespace-nowrap cursor-pointer"
                  >
                    <Search className="w-4 h-4" />
                    <span className="md:hidden">Search Trains</span>
                  </button>
                </div>
              </div>

              {/* Quick info badges */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#008ecc]" />
                  Instant seat confirmation
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#008ecc]" />
                  Real-time inventory sync
                </span>
                <span>·</span>
                <span className="text-slate-400">
                  Showing trains between major railway junctions
                </span>
              </div>
            </div>
          )}

          {/* Conditional View: Tracking Search Form */}
          {activeTab === 'track' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Search className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    value={trackQuery}
                    onChange={(e) => setTrackQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && onTrackSearch()}
                    placeholder="Enter 5-digit train number (e.g., 12951, 22436, 12002) or train name"
                    className="w-full h-12 pl-11 pr-4 bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-[#008ecc] focus:ring-2 focus:ring-[#008ecc]/20 rounded-[8px] text-sm sm:text-base text-slate-900 font-medium transition-all"
                  />
                </div>
                <button
                  onClick={() => onTrackSearch()}
                  id="track-train-btn"
                  className="w-full sm:w-auto h-12 px-6 bg-[#008ecc] hover:bg-[#007cb3] text-white font-semibold rounded-[8px] flex items-center justify-center gap-2 shadow-sm transition-all whitespace-nowrap cursor-pointer shrink-0"
                >
                  <Compass className="w-4 h-4" />
                  <span>Track Live Status</span>
                </button>
              </div>

              {/* Quick selector chips */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="text-slate-500 font-medium">Popular Trains:</span>
                {availableTrainNumbers.slice(0, 5).map((t) => (
                  <button
                    key={t.number}
                    onClick={() => {
                      setTrackQuery(t.number);
                      onTrackSearch(t.number);
                    }}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-cyan-50 hover:text-[#008ecc] border border-slate-200 rounded-[6px] text-slate-700 font-medium transition-colors cursor-pointer"
                  >
                    {t.number} - {t.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Global baseline seats KPI strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-[8px] p-3 text-center">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Sleeper Class (SL)
            </span>
            <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-white mt-0.5">
              118 <span className="text-xs font-normal text-slate-400">seats baseline</span>
            </div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-[8px] p-3 text-center">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              AC 3 Tier (3A)
            </span>
            <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-white mt-0.5">
              88 <span className="text-xs font-normal text-slate-400">seats baseline</span>
            </div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-[8px] p-3 text-center">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              AC 2 Tier (2A)
            </span>
            <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-white mt-0.5">
              68 <span className="text-xs font-normal text-slate-400">seats baseline</span>
            </div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-[8px] p-3 text-center">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              AC First Class (1A)
            </span>
            <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-white mt-0.5">
              43 <span className="text-xs font-normal text-slate-400">seats baseline</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
