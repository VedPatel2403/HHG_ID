import React from 'react';
import { ExternalLink, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/90 py-10 px-4 lg:px-8 mt-12 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Branding */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-xl border border-cyan-200">
            🌴
          </div>
          <div>
            <div className="font-extrabold text-slate-900 text-base">Hacker House Goa 2026</div>
            <p className="text-xs text-slate-500">PFP Frame & Builder ID Card Generator</p>
          </div>
        </div>

        {/* Shortlisting Requirements & Deadline */}
        <div className="text-center md:text-right">
          <div className="flex items-center justify-center md:justify-end space-x-2 text-xs font-mono text-cyan-800 mb-1 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Submission Deadline: <strong>11:59 PM, 13th August 2026</strong></span>
          </div>
          <div className="text-xs text-slate-500">
            Must share on X with <span className="font-mono font-bold text-pink-600">#FrameInGoa</span> & submit form at{' '}
            <a
              href="https://forms.gle/jM5hTaGvsrfEfixPA"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-600 hover:underline font-semibold"
            >
              forms.gle/jM5hTaGvsrfEfixPA
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
