import React from 'react';
import { CheckCircle2, RotateCcw, AlertTriangle, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'booking' | 'cancellation' | 'reset' | 'info';
  title: string;
  description: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-white border border-slate-200 rounded-[8px] p-4 shadow-xl flex items-start gap-3 animate-in slide-in-from-bottom-4 duration-200"
        >
          <div className="shrink-0 mt-0.5">
            {toast.type === 'booking' && (
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            )}
            {toast.type === 'cancellation' && (
              <div className="w-7 h-7 rounded-full bg-cyan-100 text-[#008ecc] flex items-center justify-center">
                <RotateCcw className="w-4 h-4" />
              </div>
            )}
            {toast.type === 'reset' && (
              <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <RotateCcw className="w-4 h-4" />
              </div>
            )}
            {toast.type === 'info' && (
              <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h5 className="text-xs font-bold text-slate-900 leading-tight">
              {toast.title}
            </h5>
            <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
              {toast.description}
            </p>
          </div>

          <button
            onClick={() => onDismiss(toast.id)}
            className="text-slate-400 hover:text-slate-600 shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
