import React, { useState } from 'react';
import { Train, SeatClass, SEAT_CLASSES } from '../types/railway';
import { SeatAvailabilityBox } from './SeatAvailabilityBox';
import { Clock, ArrowRight, Compass, ShieldCheck, Filter, AlertCircle, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';

interface BookTrainViewProps {
  trains: Train[];
  originFilter: string;
  destinationFilter: string;
  classFilter: string;
  travelDate: string;
  onSelectTrainForBooking: (train: Train, seatClass: SeatClass) => void;
  onTrackTrain: (trainNumber: string) => void;
  onResetFilters: () => void;
  onResetSeats: () => void;
}

export const BookTrainView: React.FC<BookTrainViewProps> = ({
  trains,
  originFilter,
  destinationFilter,
  classFilter,
  travelDate,
  onSelectTrainForBooking,
  onTrackTrain,
  onResetFilters,
  onResetSeats,
}) => {
  const [sortBy, setSortBy] = useState<'departure' | 'duration' | 'price'>('departure');

  // Filter trains
  const filteredTrains = trains.filter((train) => {
    const matchesOrigin =
      originFilter === 'All Stations' ||
      train.fromCity.toLowerCase().includes(originFilter.toLowerCase()) ||
      train.fromStation.toLowerCase().includes(originFilter.toLowerCase());

    const matchesDestination =
      destinationFilter === 'All Stations' ||
      train.toCity.toLowerCase().includes(destinationFilter.toLowerCase()) ||
      train.toStation.toLowerCase().includes(destinationFilter.toLowerCase());

    const matchesClass =
      classFilter === 'ALL' || train.seats[classFilter as SeatClass] > 0;

    return matchesOrigin && matchesDestination && matchesClass;
  });

  // Sort trains
  const sortedTrains = [...filteredTrains].sort((a, b) => {
    if (sortBy === 'departure') {
      return a.departureTime.localeCompare(b.departureTime);
    }
    if (sortBy === 'duration') {
      return parseInt(a.duration) - parseInt(b.duration);
    }
    if (sortBy === 'price') {
      return a.prices['3A'] - b.prices['3A'];
    }
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-6">
      {/* Notice Banner: Automatically populated from Live API Tracking with standard seat baseline */}
      <div className="bg-cyan-50 border border-cyan-200 rounded-[8px] p-4 text-xs text-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-start sm:items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#008ecc] text-white flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 font-bold">
            ✓
          </div>
          <div>
            <div className="font-bold text-slate-900 text-sm">
              Replica Train Booking System · {trains.length} Trains Populated
            </div>
            <p className="text-slate-600 mt-0.5">
              Every train fetched from the tracking API is automatically populated here with standard default seat availability:
              <strong className="text-[#008ecc] ml-1">Sleeper (118) · 3A (88) · 2A (68) · 1A (43)</strong>
            </p>
          </div>
        </div>

        <button
          onClick={onResetSeats}
          className="self-start md:self-auto px-3 py-1.5 bg-white hover:bg-slate-50 border border-cyan-300 text-[#008ecc] font-semibold rounded-[6px] transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Baseline Seats</span>
        </button>
      </div>

      {/* Control Strip & Active Filter Breadcrumbs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
              Available Trains for Booking
            </h2>
            <span className="text-xs font-semibold text-[#008ecc] bg-cyan-50 px-2 py-0.5 rounded-[4px] border border-cyan-200">
              {filteredTrains.length} Populated Express Trains
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time seat availability for travel on{' '}
            <strong className="text-slate-700 font-medium">{travelDate}</strong>
            {originFilter !== 'All Stations' && ` from ${originFilter}`}
            {destinationFilter !== 'All Stations' && ` to ${destinationFilter}`}
          </p>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <span className="text-xs font-medium text-slate-500 flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            Sort by:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="h-9 px-3 bg-white border border-slate-300 rounded-[8px] text-xs font-semibold text-slate-700 focus:border-[#008ecc] focus:ring-1 focus:ring-[#008ecc] cursor-pointer"
          >
            <option value="departure">Earliest Departure</option>
            <option value="duration">Shortest Duration</option>
            <option value="price">Lowest Fare (3A)</option>
          </select>
        </div>
      </div>

      {/* Train Cards List */}
      {sortedTrains.length === 0 ? (
        <div className="train-card p-12 text-center my-6">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400 mb-4">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">No trains found for this route filter</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            Try choosing &apos;All Stations&apos; or track a new train in the &apos;Track Train&apos; tab to automatically capture and populate it here!
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <button
              onClick={onResetFilters}
              className="px-4 py-2 bg-[#008ecc] text-white text-xs font-semibold rounded-[8px] hover:bg-[#007cb3] transition-colors cursor-pointer"
            >
              Show All Populated Trains
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {sortedTrains.map((train) => {
            const totalAvailableSeats =
              train.seats.Sleeper + train.seats['3A'] + train.seats['2A'] + train.seats['1A'];

            return (
              <div
                key={train.id}
                className="train-card train-card-hover p-5 sm:p-6 transition-all"
              >
                {/* Top Row: Train Identity & Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 bg-slate-900 text-white font-mono text-xs font-bold rounded-[6px] tracking-wide">
                      #{train.number}
                    </span>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold font-heading text-slate-900 flex items-center gap-2">
                        {train.name}
                        <span className="text-[11px] font-normal text-slate-500">
                          ({train.type})
                        </span>
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                        <span>Runs on: {train.runsOn.join(', ')}</span>
                        <span>·</span>
                        <span className="text-[#008ecc] font-semibold">
                          Total Seats Left: {totalAvailableSeats}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => onTrackTrain(train.number)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#008ecc] hover:bg-cyan-50 border border-cyan-200 rounded-[8px] transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <Compass className="w-3.5 h-3.5" />
                      <span>Track Live Location</span>
                    </button>
                  </div>
                </div>

                {/* Middle Row: Departure, Duration, Arrival Route Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-5 items-center">
                  {/* Origin */}
                  <div className="md:col-span-4">
                    <div className="text-2xl font-bold font-mono tabular-nums text-slate-900">
                      {train.departureTime}
                    </div>
                    <div className="text-sm font-semibold text-slate-800">
                      {train.fromCity} ({train.fromCode})
                    </div>
                    <div className="text-xs text-slate-500 truncate">
                      {train.fromStation}
                    </div>
                  </div>

                  {/* Journey Duration Graphic */}
                  <div className="md:col-span-4 flex flex-col items-center justify-center text-center py-2">
                    <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#008ecc]" />
                      {train.duration}
                    </span>
                    <div className="w-full max-w-[200px] flex items-center gap-1.5 my-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#008ecc]" />
                      <div className="h-0.5 flex-1 bg-gradient-to-r from-[#008ecc] to-[#008ecc]" />
                      <div className="w-2 h-2 rounded-full border-2 border-[#008ecc] bg-white" />
                    </div>
                    <span className="text-[11px] text-slate-400">
                      {train.distanceKm} km · {train.stops.length} stops
                    </span>
                  </div>

                  {/* Destination */}
                  <div className="md:col-span-4 md:text-right">
                    <div className="text-2xl font-bold font-mono tabular-nums text-slate-900">
                      {train.arrivalTime}
                    </div>
                    <div className="text-sm font-semibold text-slate-800">
                      {train.toCity} ({train.toCode})
                    </div>
                    <div className="text-xs text-slate-500 truncate">
                      {train.toStation}
                    </div>
                  </div>
                </div>

                {/* Bottom Row: 4 Seat Classes (Sleeper: 118, 3A: 88, 2A: 68, 1A: 43) */}
                <div className="pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                      Select Class to Book (Real-Time Availability):
                    </span>
                    <span className="text-xs text-slate-500">
                      Decreases immediately on booking · Increases on cancellation
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {SEAT_CLASSES.map((cls) => (
                      <SeatAvailabilityBox
                        key={cls}
                        seatClass={cls}
                        availableSeats={train.seats[cls]}
                        price={train.prices[cls]}
                        onSelect={() => onSelectTrainForBooking(train, cls)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
