import React from 'react';
import { Sparkles, CheckCircle, Zap, ShieldAlert, Award } from 'lucide-react';

export default function HeroBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl glass-panel p-4 sm:p-8 mb-6 sm:mb-8 border border-cyan-500/20">
      {/* Background Ambient Glow Orbs */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl">
        {/* Top Tagline Pill */}
        <div className="inline-flex items-center space-x-1.5 sm:space-x-2 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/30 rounded-full px-3 py-1 text-[11px] sm:text-xs font-semibold text-cyan-300 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin-slow shrink-0" />
          <span className="truncate">HH Goa 2026 Shortlisting Requirement</span>
        </div>

        {/* Main Title */}
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-2 sm:mb-3 leading-tight">
          Create Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-amber-300">HH Goa 2026</span> Graphic
        </h2>

        {/* Subtitle */}
        <p className="text-slate-300 text-xs sm:text-base leading-relaxed mb-5 sm:mb-6 max-w-2xl">
          Upload your photo, adjust your avatar, generate hacker titles, and export your HD <strong className="text-cyan-300 font-semibold">PFP Frame</strong> or <strong className="text-amber-300 font-semibold">Builder ID Badge</strong> ready for X!
        </p>

        {/* 4-Step Mobile Responsive Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 pt-1">
          
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 flex items-center sm:items-start space-x-2 sm:space-x-2.5">
            <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0">1</div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">Upload Photo</p>
              <p className="text-[10px] sm:text-[11px] text-slate-400 truncate">JPG/PNG/Selfie</p>
            </div>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 flex items-center sm:items-start space-x-2 sm:space-x-2.5">
            <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0">2</div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">Customize</p>
              <p className="text-[10px] sm:text-[11px] text-slate-400 truncate">Stack & title</p>
            </div>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 flex items-center sm:items-start space-x-2 sm:space-x-2.5">
            <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0">3</div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">Download</p>
              <p className="text-[10px] sm:text-[11px] text-slate-400 truncate">HD PNG image</p>
            </div>
          </div>

          <div className="bg-cyan-950/40 border border-cyan-500/40 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 flex items-center sm:items-start space-x-2 sm:space-x-2.5">
            <div className="w-6 h-6 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold text-xs shrink-0">4</div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-cyan-300 truncate">Post on X</p>
              <p className="text-[10px] sm:text-[11px] text-pink-300 font-mono font-bold truncate">#FrameInGoa</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
