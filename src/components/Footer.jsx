import React from 'react';
import { ExternalLink, Calendar, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="glass-panel border-t border-slate-800/80 py-6 sm:py-8 px-4 sm:px-6 relative z-10 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-between space-y-4 sm:space-y-6">
        
        {/* Deadline & Official Registration Card */}
        <div className="w-full max-w-2xl bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center space-y-2">
          
          <div className="inline-flex items-center space-x-1.5 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-amber-300 font-mono font-bold text-[11px]">
            <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Submission Deadline: 11:59 PM, 13th August 2026</span>
          </div>

          <p className="text-slate-300 text-xs leading-normal">
            Complete your Hacker House Goa 2026 application by submitting your graphic:
          </p>

          <a
            href="https://forms.gle/jM5hTaGvsrfEfixPA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/40 px-4 py-2 rounded-xl font-mono font-bold text-xs transition-all active:scale-95 min-h-[38px]"
          >
            <span>Official Application Form</span>
            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
          </a>

        </div>

        {/* Requirements Checklist Line */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-medium text-slate-400">
          <div className="flex items-center space-x-1 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Format A (PFP 1:1) & Format B (Card 4:5)</span>
          </div>
          <span className="hidden xs:inline">•</span>
          <div className="flex items-center space-x-1 text-cyan-300 font-mono font-bold">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Hashtag: #FrameInGoa</span>
          </div>
        </div>

        {/* Copyright & Tag */}
        <div className="text-center space-y-1 text-[11px]">
          <p className="text-slate-500">
            © 2026 Hacker House Goa. Built with React & Web Audio API.
          </p>
        </div>

      </div>
    </footer>
  );
}
