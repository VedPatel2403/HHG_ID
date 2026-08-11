import React from 'react';
import { Sparkles, Volume2, VolumeX, Share2, ShieldCheck } from 'lucide-react';
import { sounds } from '../utils/audioEffects';

export default function Header({ soundEnabled, setSoundEnabled, onOpenShare }) {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 px-3 sm:px-6 py-2 sm:py-3 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        
        {/* Main Header Bar */}
        <div className="w-full flex items-center justify-between gap-2">
          
          {/* Logo & Event Tag */}
          <div className="flex items-center space-x-2 shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-[2px] shadow-lg shadow-cyan-500/20 shrink-0">
              <div className="w-full h-full bg-[#090E1A] rounded-[10px] flex items-center justify-center text-base sm:text-xl font-bold">
                🌴
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h1 className="font-black text-sm sm:text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-amber-300">
                  HH GOA 2026
                </h1>
                <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[8px] sm:text-[10px] font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm shrink-0">
                  Shortlist
                </span>
              </div>
              <p className="text-[9px] sm:text-xs text-slate-400 font-medium">
                PFP & Builder ID Card Generator
              </p>
            </div>
          </div>

          {/* Desktop Hashtag Pill */}
          <div className="hidden lg:flex items-center space-x-2 bg-slate-900/90 border border-cyan-500/30 rounded-full px-3.5 py-1.5 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="text-xs font-mono font-bold text-cyan-300">Hashtag:</span>
            <span className="text-xs font-mono font-extrabold text-white bg-cyan-500/20 px-2 py-0.5 rounded border border-cyan-400/40">
              #FrameInGoa
            </span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          </div>

          {/* Header Action Controls */}
          <div className="flex items-center space-x-2 shrink-0">
            
            {/* Touch Sound Toggle Button */}
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                sounds.enabled = !soundEnabled;
              }}
              className="p-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 transition-all border border-slate-700/60 active:scale-95 min-h-[36px] min-w-[36px] flex items-center justify-center"
              title={soundEnabled ? "Mute Touch Sounds" : "Enable Touch Sounds"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>

            {/* Quick Export Button */}
            <button
              onClick={onOpenShare}
              className="flex items-center space-x-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all shadow-md shadow-cyan-500/20 active:scale-95 text-xs sm:text-sm min-h-[36px]"
            >
              <Share2 className="w-3.5 h-3.5 shrink-0" />
              <span>Export</span>
            </button>

          </div>

        </div>

        {/* Mobile Hashtag Sub-Bar (< 1024px) */}
        <div className="w-full lg:hidden flex items-center justify-between bg-slate-900/80 border border-cyan-500/25 rounded-xl px-3 py-1 text-[10px] font-mono">
          <div className="flex items-center space-x-1.5 text-cyan-300 font-bold">
            <Sparkles className="w-3 h-3 text-amber-400 animate-pulse shrink-0" />
            <span>Required Hashtag:</span>
          </div>
          <span className="font-extrabold text-white bg-cyan-500/20 px-2 py-0.5 rounded border border-cyan-400/40">
            #FrameInGoa
          </span>
        </div>

      </div>
    </header>
  );
}
