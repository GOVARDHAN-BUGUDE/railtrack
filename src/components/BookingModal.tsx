import React, { useState } from 'react';
import { Train, SeatClass, Passenger, Booking } from '../types/railway';
import { 
  X, 
  Ticket, 
  User, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Printer, 
  Compass,
  ArrowRight
} from 'lucide-react';

interface BookingModalProps {
  train: Train;
  seatClass: SeatClass;
  travelDate: string;
  onClose: () => void;
  onConfirmBooking: (booking: Booking) => void;
  onTrackTrain: (trainNumber: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  train,
  seatClass,
  travelDate,
  onClose,
  onConfirmBooking,
  onTrackTrain,
}) => {
  const [passengers, setPassengers] = useState<Passenger[]>([
    { name: '', age: 28, gender: 'Male', berthPreference: 'Lower' },
  ]);
  const [contactEmail, setContactEmail] = useState('traveler@example.com');
  const [contactPhone, setContactPhone] = useState('+91 98765 43210');
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const availableSeats = train.seats[seatClass];
  const unitPrice = train.prices[seatClass];

  const handleAddPassenger = () => {
    if (passengers.length >= availableSeats) {
      setValidationError(`Cannot add more passengers than available seats (${availableSeats} left).`);
      return;
    }
    if (passengers.length >= 6) {
      setValidationError('Maximum 6 passengers per booking ticket.');
      return;
    }
    setValidationError(null);
    setPassengers([
      ...passengers,
      { name: '', age: 25, gender: 'Female', berthPreference: 'No Preference' },
    ]);
  };

  const handleRemovePassenger = (index: number) => {
    if (passengers.length <= 1) return;
    setValidationError(null);
    setPassengers(passengers.filter((_, i) => i !== index));
  };

  const handlePassengerChange = (index: number, field: keyof Passenger, value: any) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  // Fare calculations
  const baseFare = passengers.length * unitPrice;
  const reservationFee = 40;
  const gst = Math.round(baseFare * 0.05);
  const totalAmount = baseFare + reservationFee + gst;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    if (passengers.some((p) => !p.name.trim())) {
      setValidationError('Please enter full names for all passengers.');
      return;
    }

    if (passengers.length > availableSeats) {
      setValidationError(`Only ${availableSeats} seats available in ${seatClass}. Please reduce passengers.`);
      return;
    }

    // Generate PNR and coach/seat numbers
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const randomDigits2 = Math.floor(1000 + Math.random() * 9000);
    const pnr = `PNR-${randomDigits}-${randomDigits2}`;

    const coachPrefix = seatClass === 'Sleeper' ? 'S' : seatClass === '3A' ? 'B' : seatClass === '2A' ? 'A' : 'H';
    const coachNumber = `${coachPrefix}${Math.floor(1 + Math.random() * 5)}`;
    
    const startingBerth = Math.floor(10 + Math.random() * 50);
    const seatsAssigned = passengers.map((_, i) => `${coachNumber}-${startingBerth + i}`);

    const newBooking: Booking = {
      id: `book-${Date.now()}`,
      pnr,
      trainId: train.id,
      trainNumber: train.number,
      trainName: train.name,
      fromStation: train.fromStation,
      fromCode: train.fromCode,
      toStation: train.toStation,
      toCode: train.toCode,
      departureTime: train.departureTime,
      arrivalTime: train.arrivalTime,
      travelDate,
      bookingTimestamp: new Date().toLocaleString(),
      seatClass,
      passengers,
      seatsAssigned,
      coachAssigned: coachNumber,
      fareBreakdown: {
        baseFare,
        reservationCharge: reservationFee,
        gst,
        totalPaid: totalAmount,
      },
      contactEmail,
      contactPhone,
      status: 'CONFIRMED',
    };

    onConfirmBooking(newBooking);
    setConfirmedBooking(newBooking);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-[8px] shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in duration-200">
        {/* Modal Header */}
        <div className="bg-[#1f2937] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[6px] bg-[#008ecc] flex items-center justify-center text-white">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-heading">
                {confirmedBooking ? 'Booking Confirmed!' : `Book Ticket · ${seatClass}`}
              </h3>
              <p className="text-xs text-slate-300">
                Train #{train.number} - {train.name}
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

        {/* State 1: Booking Success Screen */}
        {confirmedBooking ? (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="bg-emerald-50 border border-emerald-200 rounded-[8px] p-4 text-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
              <h4 className="text-lg font-bold text-emerald-900">
                Seat Reservation Confirmed!
              </h4>
              <p className="text-xs text-emerald-700 mt-1">
                Your seats have been reserved and inventory deducted in real-time.
              </p>
              <div className="mt-3 inline-block bg-white px-4 py-1.5 rounded-[6px] border border-emerald-300 shadow-xs font-mono text-sm font-bold text-slate-900">
                PNR: {confirmedBooking.pnr}
              </div>
            </div>

            {/* Ticket Card Details */}
            <div className="border border-slate-200 rounded-[8px] p-5 bg-slate-50 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
                <div>
                  <span className="text-xs text-slate-500 font-medium">Train & Journey</span>
                  <div className="font-bold text-slate-900 text-sm">
                    #{train.number} {train.name}
                  </div>
                  <div className="text-xs text-slate-600">
                    {train.fromCity} ({train.departureTime}) → {train.toCity} ({train.arrivalTime})
                  </div>
                </div>
                <div className="sm:text-right">
                  <span className="text-xs text-slate-500 font-medium">Class & Coach</span>
                  <div className="font-bold text-[#008ecc] text-sm">
                    {seatClass} ({confirmedBooking.coachAssigned})
                  </div>
                  <div className="text-xs text-slate-600 font-mono">
                    Seats: {confirmedBooking.seatsAssigned.join(', ')}
                  </div>
                </div>
              </div>

              {/* Passengers List */}
              <div>
                <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide block mb-2">
                  Passengers ({confirmedBooking.passengers.length})
                </span>
                <div className="space-y-1.5">
                  {confirmedBooking.passengers.map((p, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs bg-white p-2.5 rounded-[6px] border border-slate-200"
                    >
                      <span className="font-bold text-slate-900">
                        {idx + 1}. {p.name} ({p.age}y, {p.gender})
                      </span>
                      <span className="font-mono text-[#008ecc] font-semibold">
                        Berth: {confirmedBooking.seatsAssigned[idx]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Paid */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-sm">
                <span className="font-semibold text-slate-700">Total Amount Paid</span>
                <span className="font-bold font-mono text-base text-slate-900">
                  ₹{confirmedBooking.fareBreakdown.totalPaid}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  onTrackTrain(train.number);
                }}
                className="w-full sm:flex-1 h-11 bg-[#008ecc] hover:bg-[#007cb3] text-white font-semibold rounded-[8px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>Track This Train Live</span>
              </button>

              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto h-11 px-5 border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold rounded-[8px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Ticket</span>
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto h-11 px-5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-[8px] transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* State 2: Booking Input Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Real-time Inventory Banner */}
            <div className="bg-cyan-50/70 border border-cyan-200 rounded-[8px] p-3 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-[#008ecc]">Current Real-Time Availability:</span>
                <span className="ml-1 text-slate-700 font-mono font-bold">
                  {availableSeats} seats left in {seatClass}
                </span>
              </div>
              <span className="text-slate-500 font-mono">
                Fare: ₹{unitPrice}/passenger
              </span>
            </div>

            {validationError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-[8px] text-xs font-semibold text-rose-700">
                {validationError}
              </div>
            )}

            {/* Passengers Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  Passenger Details
                </label>
                <button
                  type="button"
                  onClick={handleAddPassenger}
                  className="text-xs font-semibold text-[#008ecc] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Passenger</span>
                </button>
              </div>

              <div className="space-y-3">
                {passengers.map((passenger, index) => (
                  <div
                    key={index}
                    className="p-3.5 bg-slate-50 border border-slate-200 rounded-[8px] space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">
                        Passenger {index + 1}
                      </span>
                      {passengers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemovePassenger(index)}
                          className="text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                      <div className="sm:col-span-5">
                        <input
                          type="text"
                          required
                          value={passenger.name}
                          onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                          placeholder="Full Name (as on ID)"
                          className="w-full h-9 px-3 bg-white border border-slate-300 rounded-[6px] text-xs font-medium focus:border-[#008ecc] focus:ring-1 focus:ring-[#008ecc]"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <input
                          type="number"
                          min="1"
                          max="110"
                          required
                          value={passenger.age}
                          onChange={(e) =>
                            handlePassengerChange(index, 'age', parseInt(e.target.value) || 18)
                          }
                          placeholder="Age"
                          className="w-full h-9 px-3 bg-white border border-slate-300 rounded-[6px] text-xs font-medium focus:border-[#008ecc] focus:ring-1 focus:ring-[#008ecc]"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <select
                          value={passenger.gender}
                          onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
                          className="w-full h-9 px-2 bg-white border border-slate-300 rounded-[6px] text-xs font-medium focus:border-[#008ecc] focus:ring-1 focus:ring-[#008ecc]"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div className="sm:col-span-3">
                        <select
                          value={passenger.berthPreference}
                          onChange={(e) =>
                            handlePassengerChange(index, 'berthPreference', e.target.value)
                          }
                          className="w-full h-9 px-2 bg-white border border-slate-300 rounded-[6px] text-xs font-medium focus:border-[#008ecc] focus:ring-1 focus:ring-[#008ecc]"
                        >
                          <option value="Lower">Lower Berth</option>
                          <option value="Middle">Middle Berth</option>
                          <option value="Upper">Upper Berth</option>
                          <option value="Side Lower">Side Lower</option>
                          <option value="No Preference">No Preference</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email for Ticket Confirmation
                </label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full h-9 px-3 bg-white border border-slate-300 rounded-[6px] text-xs font-medium focus:border-[#008ecc] focus:ring-1 focus:ring-[#008ecc]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile Number (SMS alerts)
                </label>
                <input
                  type="tel"
                  required
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full h-9 px-3 bg-white border border-slate-300 rounded-[6px] text-xs font-medium focus:border-[#008ecc] focus:ring-1 focus:ring-[#008ecc]"
                />
              </div>
            </div>

            {/* Fare Breakdown Summary */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-[8px] space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Base Fare ({passengers.length} × ₹{unitPrice}):</span>
                <span className="font-mono">₹{baseFare}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Reservation & IRCTC Fee:</span>
                <span className="font-mono">₹{reservationFee}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Goods & Service Tax (5% GST):</span>
                <span className="font-mono">₹{gst}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-900 text-sm">
                <span>Total Fare Payable:</span>
                <span className="font-mono text-base text-[#008ecc]">₹{totalAmount}</span>
              </div>
            </div>

            {/* Submit CTA */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-[8px] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={availableSeats <= 0}
                className="px-6 py-2.5 bg-[#008ecc] hover:bg-[#007cb3] disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-xs font-bold rounded-[8px] shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Confirm & Reserve {passengers.length} Seat{passengers.length > 1 ? 's' : ''}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
