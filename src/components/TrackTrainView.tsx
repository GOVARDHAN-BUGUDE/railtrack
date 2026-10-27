import React, { useState } from 'react';
import { Train, SeatClass, SEAT_CLASSES } from '../types/railway';
import { ApiFetchMetadata } from '../services/trainTrackingApi';
import { 
  Compass, 
  MapPin, 
  Clock, 
  Navigation, 
  Gauge, 
  TrainTrack, 
  RotateCw, 
  Ticket,
  ChevronRight,
  Code,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { SeatAvailabilityBox } from './SeatAvailabilityBox';

interface TrackTrainViewProps {
  trains: Train[];
  activeTrainNumber: string;
  onSearchTrainWithApi: (num: string) => Promise<void>;
  isLoadingApi: boolean;
  lastApiMetadata: ApiFetchMetadata | null;
  onBookTrainClass: (train: Train, seatClass: SeatClass) => void;
  onSwitchToBookTab: () => void;
}

export const TrackTrainView: React.FC<TrackTrainViewProps> = ({
  trains,
  activeTrainNumber,
  onSearchTrainWithApi,
  isLoadingApi,
  lastApiMetadata,
  onBookTrainClass,
  onSwitchToBookTab,
}) => {
  const [searchInput, setSearchInput] = useState(activeTrainNumber || '12951');

  // Find train
  const currentTrain = trains.find(
    (t) =>
      t.number === activeTrainNumber ||
      t.number === searchInput ||
      t.name.toLowerCase().includes(searchInput.toLowerCase())
  ) || trains[0];

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    await onSearchTrainWithApi(searchInput.trim());
  };

  const handleQuickSelect = async (num: string) => {
    setSearchInput(num);
    await onSearchTrainWithApi(num);
  };

  // Calculate progress percentage
  const progressPercent = currentTrain
    ? Math.min(100, Math.round((currentTrain.tracking.distanceCoveredKm / currentTrain.distanceKm) * 100))
    : 42;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-6">
      {/* Search Bar calling real fetch() with the required API key */}
      <div className="train-card p-5 sm:p-6">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 flex-wrap gap-2">
          <div>
            <h3 className="text-base sm:text-lg font-bold font-heading text-slate-900 flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#008ecc]" />
              Live Train Tracking (API Search)
            </h3>
            <p className="text-xs text-slate-500">
              Input any Indian Railways train number to fetch live GPS status via JavaScript &apos;fetch()&apos;
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1 rounded-[6px]">
            <Code className="w-3.5 h-3.5 text-[#008ecc]" />
            <span>API Key: <strong className="font-mono text-slate-800">rg_aeb241607bb645e9baabddbc6f026a82</strong></span>
          </div>
        </div>

        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Compass className="w-5 h-5 text-[#008ecc]" />
            </div>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter 5-digit train number (e.g., 12951, 22436, 12002, 12626, 12424)"
              className="w-full h-12 pl-11 pr-4 bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-[#008ecc] focus:ring-2 focus:ring-[#008ecc]/20 rounded-[8px] text-sm sm:text-base text-slate-900 font-semibold transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isLoadingApi}
            id="track-submit-button"
            className="w-full sm:w-auto h-12 px-7 bg-[#008ecc] hover:bg-[#007cb3] disabled:bg-cyan-300 text-white font-semibold rounded-[8px] flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer whitespace-nowrap"
          >
            {isLoadingApi ? (
              <>
                <RotateCw className="w-4 h-4 animate-spin" />
                <span>Calling API...</span>
              </>
            ) : (
              <>
                <Compass className="w-4 h-4" />
                <span>Fetch Live Status</span>
              </>
            )}
          </button>
        </form>

        {/* Quick select chips */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100 mt-4 text-xs">
          <span className="text-slate-500 font-medium">Quick Train Numbers:</span>
          {['12951', '22436', '12002', '12301', '12626', '12675', '12424', '20901'].map((num) => (
            <button
              key={num}
              onClick={() => handleQuickSelect(num)}
              className={`px-2.5 py-1 rounded-[6px] font-mono text-xs font-semibold transition-colors cursor-pointer ${
                currentTrain?.number === num
                  ? 'bg-[#008ecc] text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-cyan-50 hover:text-[#008ecc] text-slate-700'
              }`}
            >
              #{num}
            </button>
          ))}
        </div>
      </div>

      {/* Live API Telemetry & Automatic Capture Notice */}
      {lastApiMetadata && (
        <div className="bg-slate-900 text-slate-200 rounded-[8px] p-4 text-xs space-y-2 border border-slate-800 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <strong className="text-white font-mono">Live API Fetch Verified:</strong>
              <span className="text-slate-400 truncate max-w-md">{lastApiMetadata.endpoint}</span>
            </div>
            <div className="flex items-center gap-3 font-mono text-slate-400">
              <span>Status: <strong className="text-emerald-400">{lastApiMetadata.httpStatus}</strong></span>
              <span>·</span>
              <span>Latency: <strong className="text-cyan-300">{lastApiMetadata.latencyMs}ms</strong></span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>
                Train <strong>#{currentTrain?.number} ({currentTrain?.name})</strong> fetched from API and captured into &apos;Book Train&apos; with default seats:
                <strong className="text-white ml-1">SL: 118 · 3A: 88 · 2A: 68 · 1A: 43</strong>
              </span>
            </div>
            <button
              onClick={onSwitchToBookTab}
              className="px-3 py-1 bg-[#008ecc] hover:bg-cyan-600 text-white font-semibold rounded-[6px] transition-colors whitespace-nowrap self-start sm:self-auto cursor-pointer flex items-center gap-1"
            >
              <span>View in Book Train</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {currentTrain && (
        <>
          {/* Live Train Status Card */}
          <div className="train-card p-6 sm:p-8 relative overflow-hidden">
            {/* Header info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="px-3 py-1 bg-slate-900 text-white font-mono text-sm font-bold rounded-[6px]">
                    #{currentTrain.number}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
                    {currentTrain.name}
                  </h2>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-[4px] bg-slate-100 text-slate-700">
                    {currentTrain.type}
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-slate-500 mt-1 flex items-center gap-2 flex-wrap">
                  <span>{currentTrain.fromCity} ({currentTrain.fromCode})</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  <span>{currentTrain.toCity} ({currentTrain.toCode})</span>
                  <span>·</span>
                  <span>Total Distance: {currentTrain.distanceKm} km</span>
                </div>
              </div>

              {/* Delay status */}
              <div className="flex items-center gap-3">
                <div
                  className={`px-3 py-1.5 rounded-[8px] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                    currentTrain.tracking.delayMinutes === 0
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : 'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      currentTrain.tracking.delayMinutes === 0 ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                  />
                  <span>
                    {currentTrain.tracking.delayMinutes === 0
                      ? 'On Time (On Schedule)'
                      : `Delayed by ${currentTrain.tracking.delayMinutes} mins`}
                  </span>
                </div>
              </div>
            </div>

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-b border-slate-100">
              <div className="bg-slate-50 rounded-[8px] p-3.5 border border-slate-200/60">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-1">
                  <Navigation className="w-3.5 h-3.5 text-[#008ecc]" />
                  Current Station
                </span>
                <div className="text-base font-bold text-slate-900 mt-1 truncate">
                  {currentTrain.tracking.currentStation}
                </div>
                <span className="text-xs text-slate-500 font-mono">
                  {currentTrain.tracking.currentPlatform}
                </span>
              </div>

              <div className="bg-slate-50 rounded-[8px] p-3.5 border border-slate-200/60">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#008ecc]" />
                  Next Station
                </span>
                <div className="text-base font-bold text-slate-900 mt-1 truncate">
                  {currentTrain.tracking.nextStation}
                </div>
                <span className="text-xs text-slate-500">
                  Code: {currentTrain.tracking.nextStationCode}
                </span>
              </div>

              <div className="bg-slate-50 rounded-[8px] p-3.5 border border-slate-200/60">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-1">
                  <Gauge className="w-3.5 h-3.5 text-[#008ecc]" />
                  Current Speed
                </span>
                <div className="text-base font-bold font-mono tabular-nums text-slate-900 mt-1">
                  {currentTrain.tracking.speedKmH} km/h
                </div>
                <span className="text-xs text-emerald-600 font-medium">Cruising Speed</span>
              </div>

              <div className="bg-slate-50 rounded-[8px] p-3.5 border border-slate-200/60">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#008ecc]" />
                  Distance Covered
                </span>
                <div className="text-base font-bold font-mono tabular-nums text-slate-900 mt-1">
                  {currentTrain.tracking.distanceCoveredKm} / {currentTrain.distanceKm} km
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  {progressPercent}% Traversed
                </span>
              </div>
            </div>

            {/* Route Progress Bar */}
            <div className="py-6 border-b border-slate-100">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-2">
                <span>{currentTrain.fromStation} ({currentTrain.departureTime})</span>
                <span className="text-[#008ecc] flex items-center gap-1">
                  <TrainTrack className="w-4 h-4" />
                  Live GPS En Route ({progressPercent}% Completed)
                </span>
                <span>{currentTrain.toStation} ({currentTrain.arrivalTime})</span>
              </div>

              <div className="relative w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div
                  className="h-full bg-gradient-to-r from-[#008ecc] to-cyan-400 rounded-full transition-all duration-700"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Live Seat Inventory on this train with Default 118, 88, 68, 43 */}
            <div className="pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                    Real-Time Seat Availability on Train #{currentTrain.number}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Initialized default seats: Sleeper (118), 3A (88), 2A (68), 1A (43). Decreases on booking, increases on cancellation.
                  </p>
                </div>
                <button
                  onClick={onSwitchToBookTab}
                  className="text-xs font-bold text-[#008ecc] hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
                >
                  <span>Go to Booking Portal</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {SEAT_CLASSES.map((cls) => (
                  <SeatAvailabilityBox
                    key={cls}
                    seatClass={cls}
                    availableSeats={currentTrain.seats[cls]}
                    price={currentTrain.prices[cls]}
                    onSelect={() => onBookTrainClass(currentTrain, cls)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Stops Timeline */}
          <div className="train-card p-6 sm:p-8">
            <h3 className="text-lg font-bold font-heading text-slate-900 mb-1 flex items-center gap-2">
              <TrainTrack className="w-5 h-5 text-[#008ecc]" />
              Schedule & Stops Timeline
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Track arrival and departure times across intermediate stations for Train #{currentTrain.number}.
            </p>

            <div className="relative pl-6 sm:pl-8 space-y-6 before:content-[''] before:absolute before:left-[11px] sm:before:left-[15px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {currentTrain.stops.map((stop) => {
                const isCurrent = stop.status === 'current';
                const isPassed = stop.status === 'passed';

                return (
                  <div key={stop.code} className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    {/* Node */}
                    <div
                      className={`absolute -left-[27px] sm:-left-[31px] top-1 w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                        isCurrent
                          ? 'bg-[#008ecc] border-white text-white shadow-md ring-4 ring-cyan-100'
                          : isPassed
                          ? 'bg-emerald-600 border-white text-white'
                          : 'bg-white border-slate-300 text-slate-400'
                      }`}
                    >
                      {isCurrent ? (
                        <Navigation className="w-3 h-3 animate-pulse" />
                      ) : isPassed ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm sm:text-base font-bold text-slate-900">
                          {stop.name}
                        </span>
                        <span className="px-1.5 py-0.5 rounded-[4px] bg-slate-100 text-[11px] font-mono font-semibold text-slate-600">
                          {stop.code}
                        </span>
                        {isCurrent && (
                          <span className="px-2 py-0.5 rounded-[4px] bg-[#008ecc] text-white text-[10px] font-bold uppercase tracking-wider animate-pulse">
                            Current Position
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Distance: {stop.distanceKm} km · {stop.platform} · Halt: {stop.haltMinutes} min
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono tabular-nums sm:text-right">
                      <div>
                        <span className="block text-[10px] text-slate-400 uppercase font-sans">
                          Scheduled
                        </span>
                        <span className="font-semibold text-slate-700">
                          {stop.scheduledArrival} / {stop.scheduledDeparture}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-slate-400 uppercase font-sans">
                          Actual / Status
                        </span>
                        <span
                          className={`font-bold ${
                            isCurrent
                              ? 'text-[#008ecc]'
                              : isPassed
                              ? 'text-emerald-700'
                              : 'text-slate-500'
                          }`}
                        >
                          {stop.actualArrival} / {stop.actualDeparture}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
