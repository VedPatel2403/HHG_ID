import React from 'react';
import { UserCheck, CreditCard, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audioEffects';

export default function FormatSelector({ activeFormat, setActiveFormat }) {
  return (
    <div className="bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 grid grid-cols-2 gap-1.5 sm:gap-2 mb-6">
      
      {/* Format A: PFP Frame */}
      <button
        onClick={() => {
          sounds.playClick();
          setActiveFormat('pfp');
        }}
        className={`flex items-center justify-center space-x-2 py-3 px-2 sm:px-4 rounded-xl font-bold text-xs sm:text-sm transition-all active:scale-98 min-h-[46px] ${
          activeFormat === 'pfp'
            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/20'
            : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
        }`}
      >
        <UserCheck className="w-4 h-4 shrink-0" />
        <div className="text-left truncate">
          <div className="truncate">Format A: PFP</div>
          <div className="text-[9px] sm:text-[10px] font-normal opacity-80 truncate hidden xs:block">1:1 Profile Picture</div>
        </div>
      </button>

      {/* Format B: Builder ID Card */}
      <button
        onClick={() => {
          sounds.playClick();
          setActiveFormat('card');
        }}
        className={`flex items-center justify-center space-x-2 py-3 px-2 sm:px-4 rounded-xl font-bold text-xs sm:text-sm transition-all active:scale-98 min-h-[46px] ${
          activeFormat === 'card'
            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/20'
            : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
        }`}
      >
        <CreditCard className="w-4 h-4 shrink-0" />
        <div className="text-left truncate">
          <div className="flex items-center space-x-1 truncate">
            <span className="truncate">Format B: ID Card</span>
          </div>
          <div className="text-[9px] sm:text-[10px] font-normal opacity-80 truncate hidden xs:block">4:5 Event Badge</div>
        </div>
      </button>

    </div>
  );
}
