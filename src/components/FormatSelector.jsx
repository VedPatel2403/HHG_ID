import React from 'react';
import { UserCheck, CreditCard, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audioEffects';

export default function FormatSelector({ activeFormat, setActiveFormat }) {
  return (
    <div className="liquid-glass p-1.5 rounded-2xl border border-white/90 flex items-center space-x-2 mb-6 shadow-md">
      
      {/* Format A: PFP Frame */}
      <button
        onClick={() => {
          sounds.playClick();
          setActiveFormat('pfp');
        }}
        className={`flex-1 flex items-center justify-center space-x-2.5 py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all ${
          activeFormat === 'pfp'
            ? 'liquid-button text-white shadow-lg'
            : 'text-slate-700 hover:text-slate-900 hover:bg-white/70'
        }`}
      >
        <UserCheck className="w-4 h-4" />
        <div className="text-left">
          <div>Format A: PFP Frame</div>
          <div className="text-[10px] font-normal opacity-90 hidden sm:block">1:1 X Profile Picture Overlay</div>
        </div>
      </button>

      {/* Format B: Builder ID Card */}
      <button
        onClick={() => {
          sounds.playClick();
          setActiveFormat('card');
        }}
        className={`flex-1 flex items-center justify-center space-x-2.5 py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all ${
          activeFormat === 'card'
            ? 'liquid-button text-white shadow-lg'
            : 'text-slate-700 hover:text-slate-900 hover:bg-white/70'
        }`}
      >
        <CreditCard className="w-4 h-4" />
        <div className="text-left">
          <div className="flex items-center space-x-1">
            <span>Format B: Builder ID Badge</span>
            <span className="bg-amber-100 text-amber-800 text-[9px] px-1.5 py-0.5 rounded font-extrabold uppercase border border-amber-300">Popular</span>
          </div>
          <div className="text-[10px] font-normal opacity-90 hidden sm:block">4:5 HD Event Badge + Details</div>
        </div>
      </button>

    </div>
  );
}
