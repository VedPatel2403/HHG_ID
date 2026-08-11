import React from 'react';
import { Sparkles, Volume2, VolumeX, Share2, ShieldCheck } from 'lucide-react';
import { sounds } from '../utils/audioEffects';

export default function Header({ soundEnabled, setSoundEnabled, onOpenShare }) {
  return (
    <header className="sticky top-0 z-50 liquid-glass border-b border-white/80 px-4 lg:px-8 py-3.5 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo & Event Tag */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 p-[2px] shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-white/90 rounded-[14px] flex items-center justify-center text-xl font-bold">
              🌴
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-black text-lg lg:text-xl tracking-tight text-slate-900">
                HH GOA 2026
              </h1>
              <span className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                Liquid Shortlist Tool
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Official Hacker House Frame & ID Card Generator
            </p>
          </div>
        </div>

        {/* Required Hashtag Callout Pill */}
        <div className="hidden md:flex items-center space-x-2 bg-white/70 backdrop-blur-md border border-cyan-300/60 rounded-full px-4 py-1.5 shadow-sm">
          <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
          <span className="text-xs font-mono font-bold text-slate-700">Hashtag:</span>
          <span className="text-xs font-mono font-extrabold text-cyan-700 bg-cyan-100/80 px-2 py-0.5 rounded-md border border-cyan-300">
            #FrameInGoa
          </span>
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          {/* Sound Toggle */}
          <button
            onClick={() => {
              sounds.playClick();
              setSoundEnabled(!soundEnabled);
              sounds.enabled = !soundEnabled;
            }}
            className="p-2.5 rounded-2xl bg-white/80 hover:bg-white text-slate-700 transition-all border border-slate-200/80 shadow-sm"
            title={soundEnabled ? "Mute UI Sounds" : "Enable UI Sounds"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Quick Share / Export Button */}
          <button
            onClick={() => {
              sounds.playSuccess();
              onOpenShare();
            }}
            className="liquid-button flex items-center space-x-2 text-white font-bold px-4 py-2.5 rounded-2xl text-xs lg:text-sm"
          >
            <Share2 className="w-4 h-4" />
            <span>Export & Share</span>
          </button>
        </div>

      </div>
    </header>
  );
}
