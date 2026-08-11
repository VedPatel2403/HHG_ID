import React from 'react';
import { Sparkles, CheckCircle, Zap, ShieldAlert, Award } from 'lucide-react';

export default function HeroBanner() {
  return (
    <div className="relative overflow-hidden rounded-3xl liquid-glass p-6 lg:p-8 mb-8 border border-white">
      {/* Soft Glow Orbs */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-pink-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl">
        <div className="inline-flex items-center space-x-2 bg-cyan-50/90 border border-cyan-300/80 rounded-full px-4 py-1.5 text-xs font-bold text-cyan-900 mb-4 shadow-sm backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-amber-500 animate-spin-slow" />
          <span>Hacker House Goa 2026 Shortlisting Requirement</span>
        </div>

        <h2 className="text-3xl lg:text-5xl font-black tracking-tight text-slate-900 mb-3 leading-tight">
          Create Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600">HH Goa 2026</span> Graphic
        </h2>

        <p className="text-slate-600 text-sm lg:text-base leading-relaxed mb-6 max-w-2xl font-medium">
          Upload your photo, fine-tune your avatar, generate custom hacker titles, and get your high-resolution branded <strong className="text-cyan-700 font-bold">PFP Frame</strong> or <strong className="text-indigo-700 font-bold">Builder ID Badge</strong> ready for X!
        </p>

        {/* 4-Step Requirement Checklist */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="bg-white/80 border border-white/90 rounded-2xl p-3.5 flex items-start space-x-2.5 shadow-sm backdrop-blur-md">
            <div className="w-6 h-6 rounded-lg bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-xs shrink-0 shadow-inner">1</div>
            <div>
              <p className="text-xs font-bold text-slate-900">Upload Photo</p>
              <p className="text-[11px] text-slate-500">JPG, PNG or Selfie</p>
            </div>
          </div>

          <div className="bg-white/80 border border-white/90 rounded-2xl p-3.5 flex items-start space-x-2.5 shadow-sm backdrop-blur-md">
            <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0 shadow-inner">2</div>
            <div>
              <p className="text-xs font-bold text-slate-900">Customize Badge</p>
              <p className="text-[11px] text-slate-500">Select stack & title</p>
            </div>
          </div>

          <div className="bg-white/80 border border-white/90 rounded-2xl p-3.5 flex items-start space-x-2.5 shadow-sm backdrop-blur-md">
            <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs shrink-0 shadow-inner">3</div>
            <div>
              <p className="text-xs font-bold text-slate-900">Download Image</p>
              <p className="text-[11px] text-slate-500">Crisp 2000px HD PNG</p>
            </div>
          </div>

          <div className="bg-cyan-50/90 border border-cyan-300 rounded-2xl p-3.5 flex items-start space-x-2.5 shadow-sm backdrop-blur-md">
            <div className="w-6 h-6 rounded-lg bg-pink-100 text-pink-700 flex items-center justify-center font-bold text-xs shrink-0 shadow-inner">4</div>
            <div>
              <p className="text-xs font-bold text-cyan-900">Post on X</p>
              <p className="text-[11px] text-pink-600 font-mono font-bold">#FrameInGoa</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
