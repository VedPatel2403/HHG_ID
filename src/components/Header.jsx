import React from 'react';
import { Sparkles, Volume2, VolumeX, Share2 } from 'lucide-react';
import { sounds } from '../utils/audioEffects';

export default function Header({ soundEnabled, setSoundEnabled, onOpenShare }) {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 px-2.5 sm:px-6 py-2 sm:py-3 backdrop-blur-xl w-full overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-1.5 sm:gap-4 w-full">
        
        {/* Left Side: Logo + Single-Line Title + ID Generator Badge */}
        <div className="flex items-center space-x-1.5 sm:space-x-3 shrink min-w-0">
          
          {/* Palm Icon */}
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-[1.5px] shadow-md shadow-cyan-500/20 shrink-0">
            <div className="w-full h-full bg-[#090E1A] rounded-[9px] flex items-center justify-center text-sm sm:text-xl font-bold">
              🌴
            </div>
          </div>

          {/* Single-Line Brand Name + Badge */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 whitespace-nowrap min-w-0">
            <h1 className="font-black text-xs sm:text-lg tracking-tight text-white whitespace-nowrap shrink-0">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-amber-300">
                HH GOA 2026
              </span>
            </h1>

            {/* ID GENERATOR TOOL Pill Badge */}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white text-[8px] sm:text-[10px] font-extrabold px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm shrink-0 whitespace-nowrap">
              ID GENERATOR TOOL
            </span>
          </div>

        </div>

        {/* Desktop Hashtag Pill (Hidden on Mobile) */}
        <div className="hidden lg:flex items-center space-x-2 bg-slate-900/90 border border-cyan-500/30 rounded-full px-3.5 py-1.5 shadow-inner shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span className="text-xs font-mono font-bold text-cyan-300">Hashtag:</span>
          <span className="text-xs font-mono font-extrabold text-white bg-cyan-500/20 px-2 py-0.5 rounded border border-cyan-400/40">
            #FrameInGoa
          </span>
        </div>

        {/* Right Side: Action Controls (Sound & Export) */}
        <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
          
          {/* Sound Toggle Button */}
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              sounds.enabled = !soundEnabled;
            }}
            className="p-1.5 sm:p-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 transition-all border border-slate-700/60 active:scale-95 min-h-[34px] min-w-[34px] flex items-center justify-center shrink-0"
            title={soundEnabled ? "Mute Touch Sounds" : "Enable Touch Sounds"}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500" />}
          </button>

          {/* Quick Export Button */}
          <button
            onClick={onOpenShare}
            className="flex items-center space-x-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-xl transition-all shadow-md shadow-cyan-500/20 active:scale-95 text-[11px] sm:text-sm min-h-[34px] shrink-0 whitespace-nowrap"
          >
            <Share2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span>Export</span>
          </button>

        </div>

      </div>
    </header>
  );
}
