import React from 'react';
import { Compass, Ticket, RotateCcw, TrainTrack, ChevronRight } from 'lucide-react';

interface HeaderProps {
  activeTab: 'book' | 'track';
  setActiveTab: (tab: 'book' | 'track') => void;
  bookingCount: number;
  onOpenBookings: () => void;
  onResetSeats: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  bookingCount,
  onOpenBookings,
  onResetSeats,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      {/* Top micro announcement bar */}
      <div className="bg-[#1f2937] text-slate-300 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-white font-medium">Live Seat Inventory</span>
            <span className="text-slate-500">·</span>
            <span>Standard: SL (118) · 3A (88) · 2A (68) · 1A (43)</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-slate-400">
            <span>24x7 Railway Helpline: 139</span>
            <span>·</span>
            <span>Zero Cancellation Charges on First Ticket</span>
          </div>
        </div>
      </div>

      {/* Main crisp navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 flex items-center justify-between gap-6">
        {/* Brand Zone */}
        <div 
          onClick={() => setActiveTab('book')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-[8px] bg-[#008ecc] flex items-center justify-center text-white shadow-sm">
            <TrainTrack className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-[#1f2937] font-heading flex items-center gap-1.5">
              RailTrack
              <span className="text-xs font-semibold uppercase tracking-wider text-[#008ecc] bg-cyan-50 px-1.5 py-0.5 rounded-[4px]">
                Express
              </span>
            </span>
            <span className="text-[11px] text-slate-500 font-medium">Tracking & Booking Portal</span>
          </div>
        </div>

        {/* Two Main Navigation Options / Tabs */}
        <nav className="flex items-center gap-2 bg-slate-100/90 p-1 rounded-[8px] border border-slate-200/80">
          <button
            id="nav-tab-book"
            onClick={() => setActiveTab('book')}
            className={`flex items-center gap-2 px-4 py-2 rounded-[6px] text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'book'
                ? 'bg-[#008ecc] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Ticket className="w-4 h-4" />
            <span>Book Train</span>
          </button>

          <button
            id="nav-tab-track"
            onClick={() => setActiveTab('track')}
            className={`flex items-center gap-2 px-4 py-2 rounded-[6px] text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'track'
                ? 'bg-[#008ecc] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Track Train</span>
          </button>
        </nav>

        {/* Right utility actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onResetSeats}
            title="Reset all trains back to default seat counts (118, 88, 68, 43)"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-[#008ecc] hover:bg-slate-50 border border-slate-200 rounded-[8px] transition-colors whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Baseline Seats</span>
          </button>

          <button
            id="header-my-bookings-btn"
            onClick={onOpenBookings}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#008ecc] bg-cyan-50/80 hover:bg-cyan-100/80 border border-cyan-200/80 rounded-[8px] transition-colors whitespace-nowrap"
          >
            <Ticket className="w-4 h-4" />
            <span>My Bookings</span>
            {bookingCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#008ecc] text-white text-xs font-bold flex items-center justify-center">
                {bookingCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
