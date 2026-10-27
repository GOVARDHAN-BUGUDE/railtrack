import React from 'react';
import { SeatClass, INITIAL_SEAT_AVAILABILITY } from '../types/railway';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

interface SeatAvailabilityBoxProps {
  seatClass: SeatClass;
  availableSeats: number;
  price: number;
  isSelected?: boolean;
  onSelect: () => void;
}

export const SeatAvailabilityBox: React.FC<SeatAvailabilityBoxProps> = ({
  seatClass,
  availableSeats,
  price,
  isSelected = false,
  onSelect,
}) => {
  const baseline = INITIAL_SEAT_AVAILABILITY[seatClass];
  const isAvailable = availableSeats > 0;
  const isLow = availableSeats > 0 && availableSeats <= 15;

  const classDescriptions: Record<SeatClass, string> = {
    Sleeper: 'Standard Sleeper (SL)',
    '3A': 'AC 3-Tier Berths',
    '2A': 'AC 2-Tier Berths',
    '1A': 'AC First Class Coupe',
  };

  return (
    <div
      onClick={onSelect}
      className={`p-3 rounded-[8px] border transition-all cursor-pointer flex flex-col justify-between ${
        isSelected
          ? 'border-[#008ecc] bg-cyan-50/60 ring-2 ring-[#008ecc]/30'
          : 'border-slate-200 bg-white hover:border-[#008ecc]/60 hover:bg-slate-50/70 shadow-xs'
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-1 mb-1">
          <span className="text-xs font-bold text-slate-900 font-heading">
            {seatClass}
          </span>
          <span className="text-xs font-bold font-mono tabular-nums text-slate-900">
            ₹{price}
          </span>
        </div>
        <p className="text-[11px] text-slate-500 truncate mb-2">
          {classDescriptions[seatClass]}
        </p>
      </div>

      <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {isAvailable ? (
            <span
              className={`text-xs font-bold font-mono tabular-nums ${
                isLow ? 'text-amber-600' : 'text-emerald-700'
              }`}
            >
              AVL {availableSeats}
            </span>
          ) : (
            <span className="text-xs font-bold font-mono text-rose-600">
              WL 0
            </span>
          )}
          <span className="text-[10px] text-slate-400 font-mono">
            /{baseline}
          </span>
        </div>

        <span
          className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-[4px] ${
            isAvailable
              ? isLow
                ? 'bg-amber-100 text-amber-800'
                : 'bg-emerald-100 text-emerald-800'
              : 'bg-rose-100 text-rose-800'
          }`}
        >
          {isAvailable ? (isLow ? 'Filling Fast' : 'Available') : 'Sold Out'}
        </span>
      </div>
    </div>
  );
};
