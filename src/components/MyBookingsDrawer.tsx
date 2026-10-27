import React, { useState } from 'react';
import { Booking } from '../types/railway';
import { 
  X, 
  Ticket, 
  Trash2, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar, 
  User, 
  ChevronRight, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface MyBookingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  onCancelBooking: (bookingId: string) => void;
  onTrackTrain: (trainNumber: string) => void;
}

export const MyBookingsDrawer: React.FC<MyBookingsDrawerProps> = ({
  isOpen,
  onClose,
  bookings,
  onCancelBooking,
  onTrackTrain,
}) => {
  const [selectedBookingForCancel, setSelectedBookingForCancel] = useState<Booking | null>(null);
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'cancelled'>('all');

  if (!isOpen) return null;

  const filteredBookings = bookings.filter((b) => {
    if (filter === 'confirmed') return b.status === 'CONFIRMED';
    if (filter === 'cancelled') return b.status === 'CANCELLED';
    return true;
  });

  const handleConfirmCancel = () => {
    if (!selectedBookingForCancel) return;
    onCancelBooking(selectedBookingForCancel.id);
    setSelectedBookingForCancel(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-end">
      <div className="bg-white w-full max-w-xl h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="bg-[#1f2937] text-white p-5 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[6px] bg-[#008ecc] flex items-center justify-center text-white">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-heading">My Railway Bookings</h3>
              <p className="text-xs text-slate-300">
                Manage your reservations & instant ticket cancellations
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-[6px] hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-[6px] text-xs font-semibold transition-colors cursor-pointer ${
              filter === 'all'
                ? 'bg-[#008ecc] text-white'
                : 'bg-white text-slate-600 hover:bg-slate-200/60 border border-slate-200'
            }`}
          >
            All Tickets ({bookings.length})
          </button>
          <button
            onClick={() => setFilter('confirmed')}
            className={`px-3 py-1 rounded-[6px] text-xs font-semibold transition-colors cursor-pointer ${
              filter === 'confirmed'
                ? 'bg-[#008ecc] text-white'
                : 'bg-white text-slate-600 hover:bg-slate-200/60 border border-slate-200'
            }`}
          >
            Active Confirmed ({bookings.filter((b) => b.status === 'CONFIRMED').length})
          </button>
          <button
            onClick={() => setFilter('cancelled')}
            className={`px-3 py-1 rounded-[6px] text-xs font-semibold transition-colors cursor-pointer ${
              filter === 'cancelled'
                ? 'bg-[#008ecc] text-white'
                : 'bg-white text-slate-600 hover:bg-slate-200/60 border border-slate-200'
            }`}
          >
            Cancelled ({bookings.filter((b) => b.status === 'CANCELLED').length})
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {filteredBookings.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400 mb-3">
                <Ticket className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-semibold text-slate-900">No bookings found</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Search trains in the booking portal to reserve seats with instant real-time inventory updates.
              </p>
            </div>
          ) : (
            filteredBookings.map((booking) => {
              const isConfirmed = booking.status === 'CONFIRMED';

              return (
                <div
                  key={booking.id}
                  className={`p-4 rounded-[8px] border transition-all ${
                    isConfirmed
                      ? 'border-slate-200 bg-white shadow-xs'
                      : 'border-slate-200 bg-slate-50 opacity-80'
                  }`}
                >
                  {/* Top Bar: PNR & Status */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-[4px] bg-slate-900 text-white">
                        {booking.pnr}
                      </span>
                      <span className="text-xs font-bold text-[#008ecc]">
                        {booking.seatClass}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[4px] ${
                        isConfirmed
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  {/* Train Identity & Journey Route */}
                  <div className="space-y-1 mb-3">
                    <div className="font-bold text-slate-900 text-sm">
                      #{booking.trainNumber} {booking.trainName}
                    </div>
                    <div className="text-xs text-slate-600 flex items-center gap-1.5">
                      <span>{booking.fromStation} ({booking.departureTime})</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      <span>{booking.toStation} ({booking.arrivalTime})</span>
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-2 pt-0.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        Date: {booking.travelDate}
                      </span>
                      <span>·</span>
                      <span className="font-mono">
                        Coach: {booking.coachAssigned}
                      </span>
                    </div>
                  </div>

                  {/* Passenger berths */}
                  <div className="bg-slate-50 p-2.5 rounded-[6px] border border-slate-100 text-xs space-y-1 mb-3">
                    <div className="font-semibold text-slate-700">
                      Passengers ({booking.passengers.length} berths):
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {booking.passengers.map((p, idx) => (
                        <span
                          key={idx}
                          className="bg-white px-2 py-0.5 rounded-[4px] border border-slate-200 text-slate-800 text-[11px]"
                        >
                          {p.name} · <strong className="font-mono">{booking.seatsAssigned[idx]}</strong>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Fare and Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <div>
                      <span className="text-slate-500">Paid Amount: </span>
                      <span className="font-mono font-bold text-slate-900">
                        ₹{booking.fareBreakdown.totalPaid}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          onClose();
                          onTrackTrain(booking.trainNumber);
                        }}
                        className="px-2.5 py-1 text-slate-700 hover:text-[#008ecc] bg-slate-100 hover:bg-cyan-50 rounded-[6px] font-medium transition-colors cursor-pointer"
                      >
                        Track Train
                      </button>

                      {isConfirmed && (
                        <button
                          onClick={() => setSelectedBookingForCancel(booking)}
                          className="px-2.5 py-1 text-rose-700 hover:text-white bg-rose-50 hover:bg-rose-600 border border-rose-200 rounded-[6px] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Cancel Ticket</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {!isConfirmed && booking.cancelledAt && (
                    <div className="mt-2 text-[11px] text-rose-700 bg-rose-50/80 p-2 rounded-[6px] flex items-center justify-between">
                      <span>Cancelled on {booking.cancelledAt}</span>
                      <span className="font-semibold">
                        Refund of ₹{booking.refundAmount} issued
                      </span>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span>Cancelling releases berths back to real-time seat inventory</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 text-white rounded-[6px] font-semibold hover:bg-slate-900 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>

      {/* Cancellation Confirmation Dialog */}
      {selectedBookingForCancel && (
        <div className="fixed inset-0 z-60 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-[8px] p-6 shadow-2xl border border-slate-100 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center">
              <h4 className="text-lg font-bold font-heading text-slate-900">
                Cancel Ticket Reservation?
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                PNR: <strong className="font-mono text-slate-800">{selectedBookingForCancel.pnr}</strong> · Train #{selectedBookingForCancel.trainNumber}
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-[8px] p-3 text-xs text-amber-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <RotateCcw className="w-4 h-4 text-amber-700" />
                <span>Real-Time Seat Inventory Impact:</span>
              </div>
              <p>
                Cancelling will release{' '}
                <strong>
                  {selectedBookingForCancel.passengers.length} seat(s) back to {selectedBookingForCancel.seatClass}
                </strong>{' '}
                availability on Train #{selectedBookingForCancel.trainNumber}.
              </p>
            </div>

            <div className="border border-slate-200 rounded-[8px] p-3 bg-slate-50 text-xs space-y-1">
              <div className="flex justify-between text-slate-600">
                <span>Original Fare Paid:</span>
                <span className="font-mono">₹{selectedBookingForCancel.fareBreakdown.totalPaid}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Cancellation Processing Fee:</span>
                <span className="font-mono">₹60</span>
              </div>
              <div className="pt-1.5 border-t border-slate-200 flex justify-between font-bold text-slate-900">
                <span>Instant Refund Amount:</span>
                <span className="font-mono text-emerald-700">
                  ₹{Math.max(0, selectedBookingForCancel.fareBreakdown.totalPaid - 60)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedBookingForCancel(null)}
                className="flex-1 h-10 border border-slate-300 hover:bg-slate-100 rounded-[8px] text-xs font-semibold text-slate-700 cursor-pointer transition-colors"
              >
                Keep Ticket
              </button>
              <button
                type="button"
                onClick={handleConfirmCancel}
                className="flex-1 h-10 bg-rose-600 hover:bg-rose-700 text-white rounded-[8px] text-xs font-bold cursor-pointer transition-colors"
              >
                Confirm & Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
