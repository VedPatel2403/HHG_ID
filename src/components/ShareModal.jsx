import React, { useState } from 'react';
import { X, Twitter, Download, Copy, Check, ExternalLink, Sparkles, AlertCircle, Trophy, ShieldCheck } from 'lucide-react';
import { sounds } from '../utils/audioEffects';
import confetti from 'canvas-confetti';

export default function ShareModal({ isOpen, onClose, badgeData, format }) {
  const [copiedText, setCopiedText] = useState(false);

  if (!isOpen) return null;

  const tweetCaption = `Just generated my official HH Goa 2026 Builder Graphic! 🌴⚡ Excited to build & hack with 10,000+ devs at @HackerHouseGoa 🌊🚀\n\nGenerate yours now & see you in Goa! 👇\n\n#FrameInGoa`;

  const tweetIntentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetCaption)}`;

  const handlePostToX = () => {
    sounds.playSuccess();
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
    window.open(tweetIntentUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyCaption = () => {
    sounds.playClick();
    navigator.clipboard.writeText(tweetCaption);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 max-w-lg w-full shadow-2xl relative overflow-hidden">
        
        {/* Soft Glow orb */}
        <div className="absolute -top-20 -right-20 w-56 h-56 bg-cyan-400/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-cyan-100 border border-cyan-200 text-cyan-700 flex items-center justify-center font-bold text-xl">
            🚀
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">Post on X to Get Shortlisted</h3>
            <p className="text-xs text-cyan-700 font-mono font-semibold">Mandatory hashtag: #FrameInGoa</p>
          </div>
        </div>

        {/* Main CTA: Post on X */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-5">
          <label className="text-xs font-semibold text-slate-700 mb-2 block">Pre-filled Tweet Caption:</label>
          <div className="bg-white p-3 rounded-xl border border-slate-200 font-mono text-xs text-slate-800 mb-3 whitespace-pre-wrap leading-relaxed shadow-sm">
            {tweetCaption}
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handlePostToX}
              className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 bg-cyan-600 hover:bg-cyan-700 text-white font-black rounded-xl text-sm transition-all shadow-md shadow-cyan-500/25"
            >
              <Twitter className="w-4 h-4 fill-current" />
              <span>Tweet Now on X</span>
            </button>

            <button
              onClick={handleCopyCaption}
              className="py-3 px-3 bg-white hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold transition-all border border-slate-200 shadow-sm"
              title="Copy Caption"
            >
              {copiedText ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Shortlisting Submission Rules Alert Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-5">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 leading-relaxed">
              <strong className="text-amber-950 font-bold block mb-1">Final Submission Step:</strong>
              1. Download your generated image & post on X with <span className="font-bold underline text-slate-900">#FrameInGoa</span>.<br />
              2. Submit your live working link & X post link in the official registration form before <strong>11:59 PM, 13th August 2026</strong>.
            </div>
          </div>
        </div>

        {/* Official Google Form Submission Button */}
        <a
          href="https://forms.gle/jM5hTaGvsrfEfixPA"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs border border-slate-800 transition-all text-center shadow-sm"
        >
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>Open Official Form (forms.gle/jM5hTaGvsrfEfixPA)</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

      </div>
    </div>
  );
}
