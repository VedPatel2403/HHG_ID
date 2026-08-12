import React, { useState } from 'react';
import { Sparkles, Volume2, VolumeX, Share2, Menu, X, ShieldCheck } from 'lucide-react';
import { sounds } from '../utils/audioEffects';

export default function Header({ soundEnabled, setSoundEnabled, onOpenShare }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 px-3 sm:px-6 py-2.5 sm:py-3.5 backdrop-blur-xl w-full overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 w-full">
        
        {/* Left Side: Logo + Brand Title */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink min-w-0">
          
          {/* Palm Icon */}
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-[1.5px] shadow-md shadow-cyan-500/20 shrink-0">
            <div className="w-full h-full bg-[#090E1A] rounded-[9px] flex items-center justify-center text-sm sm:text-xl font-bold">
              🌴
            </div>
          </div>

          {/* Single-Line Brand Name */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-0 sm:space-x-2 whitespace-nowrap min-w-0">
            <h1 className="font-black text-sm sm:text-xl tracking-tight text-white whitespace-nowrap shrink-0">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-amber-300">
                HH GOA 2026
              </span>
            </h1>
            <p className="text-[10px] sm:text-xs text-slate-400 font-medium hidden xs:block">
              PFP & Builder ID Generator
            </p>
          </div>

        </div>

        {/* Desktop Hashtag Pill (Hidden on Mobile) */}
        <div className="hidden lg:flex items-center space-x-2 bg-slate-900/90 border border-cyan-500/30 rounded-full px-3.5 py-1.5 shadow-inner shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span className="text-xs font-mono font-bold text-cyan-300">Hashtag:</span>
          <span className="text-xs font-mono font-extrabold text-white bg-cyan-500/20 px-2 py-0.5 rounded border border-cyan-400/40">
            #FrameInGoa
          </span>
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        </div>

        {/* Right Side Desktop Controls */}
        <div className="hidden md:flex items-center space-x-2 shrink-0">
          
          {/* Sound Toggle Button */}
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              sounds.enabled = !soundEnabled;
            }}
            className="p-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 transition-all border border-slate-700/60 active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0 touch-target"
            title={soundEnabled ? "Mute Touch Sounds" : "Enable Touch Sounds"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Quick Export Button */}
          <button
            onClick={onOpenShare}
            className="flex items-center space-x-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-cyan-500/20 active:scale-95 text-xs sm:text-sm min-h-[44px] shrink-0 whitespace-nowrap touch-target"
          >
            <Share2 className="w-4 h-4 shrink-0" />
            <span>Export</span>
          </button>

        </div>

        {/* Mobile Hamburger Toggle Button (< 768px) */}
        <div className="flex md:hidden items-center space-x-1.5 shrink-0">
          
          {/* Quick Mobile Export CTA */}
          <button
            onClick={onOpenShare}
            className="flex items-center space-x-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold px-3 py-1.5 rounded-xl text-xs min-h-[38px] active:scale-95 shrink-0"
          >
            <Share2 className="w-3.5 h-3.5 shrink-0" />
            <span>Export</span>
          </button>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => {
              sounds.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 rounded-xl bg-slate-800/90 text-slate-200 hover:text-white border border-slate-700/60 min-h-[38px] min-w-[38px] flex items-center justify-center active:scale-95 shrink-0"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Mobile Slide-Down Menu Drawer (< 768px) */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-3 pb-2 border-t border-slate-800/80 mt-2.5 space-y-2.5 animate-fadeIn">
          
          <div className="flex items-center justify-between bg-slate-900/90 border border-cyan-500/30 rounded-xl p-2.5">
            <div className="flex items-center space-x-2 text-xs font-mono">
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="text-cyan-300 font-bold">#FrameInGoa</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              Required
            </span>
          </div>

          <div className="flex items-center justify-between bg-slate-900/90 border border-slate-800 rounded-xl p-2.5">
            <span className="text-xs font-medium text-slate-300">UI Touch Sound & Haptics:</span>
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                sounds.enabled = !soundEnabled;
              }}
              className="flex items-center space-x-1.5 py-1.5 px-3 rounded-lg bg-slate-800 text-xs font-bold text-cyan-300 border border-slate-700 min-h-[36px]"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              <span>{soundEnabled ? 'Enabled' : 'Muted'}</span>
            </button>
          </div>

        </div>
      )}

    </header>
  );
}
