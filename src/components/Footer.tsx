import React from 'react';
import { 
  TrainTrack, 
  Phone, 
  Mail, 
  MapPin, 
  Smartphone, 
  Download, 
  ShieldCheck, 
  Headphones, 
  ArrowUpRight,
  ChevronRight
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#008ecc] text-white pt-14 pb-8 border-t-4 border-cyan-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Main 4-column corporate layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-cyan-400/40">
          {/* Column 1: RailTrack Corporate Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-[8px] bg-white text-[#008ecc] flex items-center justify-center font-bold shadow-sm">
                <TrainTrack className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold font-heading tracking-tight text-white">
                RailTrack
              </span>
            </div>
            <p className="text-xs text-cyan-100 leading-relaxed">
              Official real-time passenger train tracking and high-speed online seat reservation network. Providing real-time dynamic inventory synchronization across Sleeper, AC 3-Tier, AC 2-Tier, and First Class.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-cyan-100">
              <ShieldCheck className="w-4 h-4 text-cyan-200" />
              <span>Verified 256-Bit SSL Ticket Encryption</span>
            </div>
          </div>

          {/* Column 2: Customer Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white font-heading">
              Customer Services
            </h4>
            <ul className="space-y-2 text-xs text-cyan-100">
              <li>
                <a href="#track" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-cyan-300" />
                  <span>Real-Time Train GPS Tracker</span>
                </a>
              </li>
              <li>
                <a href="#pnr" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-cyan-300" />
                  <span>Check PNR Current Status</span>
                </a>
              </li>
              <li>
                <a href="#rules" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-cyan-300" />
                  <span>Seat Availability & Allocation Rules</span>
                </a>
              </li>
              <li>
                <a href="#refund" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-cyan-300" />
                  <span>Instant Cancellation & Refund Policy</span>
                </a>
              </li>
              <li>
                <a href="#schedule" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-cyan-300" />
                  <span>All-India Express Route Timetable</span>
                </a>
              </li>
              <li>
                <a href="#tatkal" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-cyan-300" />
                  <span>Tatkal & Premium Quota Guide</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white font-heading">
              Contact Us
            </h4>
            <div className="space-y-2.5 text-xs text-cyan-100">
              <div className="flex items-start gap-2.5">
                <Headphones className="w-4 h-4 text-cyan-300 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Toll-Free Rail Helpline:</strong>
                  <span>139 (24 Hours / 7 Days)</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-cyan-300 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Support Desk:</strong>
                  <span>care@railtrack-express.gov.in</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-300 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Central Operations HQ:</strong>
                  <span>Rail Bhavan, Raisina Road, New Delhi 110001</span>
                </div>
              </div>

              <div className="pt-1">
                <span className="inline-block px-2 py-1 rounded-[4px] bg-cyan-700/60 text-cyan-100 text-[11px]">
                  Average Helpline Response: &lt; 45 seconds
                </span>
              </div>
            </div>
          </div>

          {/* Column 4: App Download Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white font-heading">
              Download Mobile App
            </h4>
            <p className="text-xs text-cyan-100">
              Get live audio train announcements, offline station GPS alerts, and 1-tap ticket booking.
            </p>

            <div className="space-y-2 pt-1">
              {/* Google Play store badge */}
              <a
                href="#googleplay"
                className="flex items-center gap-3 p-2.5 rounded-[8px] bg-slate-900/40 hover:bg-slate-900/60 border border-cyan-400/30 transition-colors text-white"
              >
                <Smartphone className="w-5 h-5 text-cyan-300" />
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-wider text-cyan-200">Get it on</div>
                  <div className="text-xs font-bold leading-tight">Google Play Store</div>
                </div>
              </a>

              {/* Apple App Store badge */}
              <a
                href="#appstore"
                className="flex items-center gap-3 p-2.5 rounded-[8px] bg-slate-900/40 hover:bg-slate-900/60 border border-cyan-400/30 transition-colors text-white"
              >
                <Download className="w-5 h-5 text-cyan-300" />
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-wider text-cyan-200">Download on the</div>
                  <div className="text-xs font-bold leading-tight">Apple App Store</div>
                </div>
              </a>
            </div>

            <div className="text-[11px] text-cyan-200 pt-1">
              Rated 4.8/5 by 2.4 Million+ Rail Travelers
            </div>
          </div>
        </div>

        {/* Corporate bottom sub-footer bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cyan-100">
          <div>
            © 2026 RailTrack National Rail Logistics. All rights reserved.
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>·</span>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Carriage</a>
            <span>·</span>
            <a href="#security" className="hover:text-white transition-colors">Security Disclosure</a>
            <span>·</span>
            <a href="#sitemap" className="hover:text-white transition-colors">Station Directory</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
