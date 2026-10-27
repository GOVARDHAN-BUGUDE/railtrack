/**
 * Train tracking and booking data structures
 */

export type SeatClass = 'Sleeper' | '3A' | '2A' | '1A';

export const SEAT_CLASSES: SeatClass[] = ['Sleeper', '3A', '2A', '1A'];

export const INITIAL_SEAT_AVAILABILITY: Record<SeatClass, number> = {
  Sleeper: 118,
  '3A': 88,
  '2A': 68,
  '1A': 43,
};

export const CLASS_LABELS: Record<SeatClass, { name: string; code: string; desc: string }> = {
  Sleeper: { name: 'Sleeper Class', code: 'SL', desc: 'Standard non-AC sleeper berths' },
  '3A': { name: 'AC 3 Tier', code: '3A', desc: 'Air-conditioned 3-tier berths with bedding' },
  '2A': { name: 'AC 2 Tier', code: '2A', desc: 'Spacious air-conditioned 2-tier berths with curtains' },
  '1A': { name: 'AC First Class', code: '1A', desc: 'Private lockable 2/4-berth luxury AC coupes' },
};

export interface StationStop {
  code: string;
  name: string;
  scheduledArrival: string;
  scheduledDeparture: string;
  actualArrival: string;
  actualDeparture: string;
  distanceKm: number;
  platform: string;
  status: 'passed' | 'current' | 'upcoming';
  haltMinutes: number;
}

export interface TrainTrackingStatus {
  currentStation: string;
  currentStationCode: string;
  nextStation: string;
  nextStationCode: string;
  statusMessage: string;
  delayMinutes: number;
  speedKmH: number;
  distanceCoveredKm: number;
  totalDistanceKm: number;
  currentPlatform: string;
  lastUpdated: string;
}

export interface Train {
  id: string;
  number: string;
  name: string;
  type: string;
  fromCity: string;
  fromStation: string;
  fromCode: string;
  toCity: string;
  toStation: string;
  toCode: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  distanceKm: number;
  runsOn: string[]; // e.g. ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  prices: Record<SeatClass, number>;
  seats: Record<SeatClass, number>;
  tracking: TrainTrackingStatus;
  stops: StationStop[];
}

export interface Passenger {
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  berthPreference: 'Lower' | 'Middle' | 'Upper' | 'Side Lower' | 'No Preference';
}

export interface Booking {
  id: string;
  pnr: string;
  trainId: string;
  trainNumber: string;
  trainName: string;
  fromStation: string;
  fromCode: string;
  toStation: string;
  toCode: string;
  departureTime: string;
  arrivalTime: string;
  travelDate: string;
  bookingTimestamp: string;
  seatClass: SeatClass;
  passengers: Passenger[];
  seatsAssigned: string[];
  coachAssigned: string;
  fareBreakdown: {
    baseFare: number;
    reservationCharge: number;
    gst: number;
    totalPaid: number;
  };
  contactEmail: string;
  contactPhone: string;
  status: 'CONFIRMED' | 'CANCELLED';
  cancelledAt?: string;
  refundAmount?: number;
}
