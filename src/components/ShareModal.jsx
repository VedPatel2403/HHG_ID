import React, { useState } from 'react';
import { X, Twitter, Download, Copy, Check, ExternalLink, Sparkles, AlertCircle, Trophy, ShieldCheck, Share2 } from 'lucide-react';
import { sounds } from '../utils/audioEffects';
import confetti from 'canvas-confetti';

export default function ShareModal({ isOpen, onClose, badgeData, format }) {
  const [copiedText, setCopiedText] = useState(false);

  if (!isOpen) return null;

  const tweetCaption = `Just generated my official HH Goa 2026 Builder Graphic! 🌴⚡ Excited to build & hack with 10,000+ devs at @HackerHouseGoa 🌊🚀\n\nGenerate yours now & see you in Goa! 👇\n\n#FrameInGoa`;

  const tweetIntentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetCaption)}`;

  // Share Image + Tweet Text via Web Share API or Tweet Intent
  const handleShareAndPost = async () => {
    sounds.playSuccess();
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });

    // Copy caption to clipboard automatically
    try {
      await navigator.clipboard.writeText(tweetCaption);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2500);
    } catch (e) {}

    // Trigger Web Share API if supported
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'HH Goa 2026 Graphic',
          text: tweetCaption,
          url: 'https://vedpatel2403.github.io/HHG_ID/'
        });
        return;
      } catch (err) {
        // Fallback to direct X tweet intent if user cancels native sheet
      }
    }

    // Open pre-filled X tweet intent in new window
    window.open(tweetIntentUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyCaption = () => {
    sounds.playClick();
    navigator.clipboard.writeText(tweetCaption);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-cyan-500/40 rounded-3xl p-5 sm:p-7 max-w-lg w-full shadow-2xl relative overflow-hidden text-slate-100">
        
        {/* Ambient Glow */}
        <div className="absolute -top-20 -right-20 w-56 h-56 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-400 flex items-center justify-center font-bold text-xl shrink-0">
            🌴
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-white">Post on X with Pre-Filled Caption</h3>
            <p className="text-xs text-cyan-300 font-mono font-bold">Mandatory hashtag: #FrameInGoa</p>
          </div>
        </div>

        {/* Pre-filled Caption Box */}
        <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-semibold text-slate-300">Pre-filled Tweet Caption:</label>
            <button
              onClick={handleCopyCaption}
              className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
            >
              {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedText ? 'Copied!' : 'Copy Caption'}</span>
            </button>
          </div>
          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-xs text-cyan-200 mb-3 whitespace-pre-wrap leading-relaxed">
            {tweetCaption}
          </div>

          <button
            onClick={handleShareAndPost}
            className="w-full flex items-center justify-center space-x-2 py-3.5 px-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-black rounded-xl text-sm transition-all shadow-lg shadow-cyan-500/25 active:scale-95 min-h-[46px]"
          >
            <Twitter className="w-4 h-4 fill-current shrink-0" />
            <span>SHARE TO X (#FrameInGoa)</span>
          </button>
        </div>

        {/* Shortlisting Instructions Alert Box */}
        <div className="bg-cyan-950/40 border border-cyan-500/30 rounded-2xl p-3.5 mb-4 text-xs text-cyan-200 leading-relaxed">
          <div className="flex items-start space-x-2.5">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white font-bold block mb-1">Final Submission Checklist:</strong>
              1. Download your HD PNG image.<br />
              2. Share your image on X with <span className="font-bold underline text-white">#FrameInGoa</span>.<br />
              3. Submit your post link in the official Google form.
            </div>
          </div>
        </div>

        {/* Official Google Form Submission Button */}
        <a
          href="https://forms.gle/jM5hTaGvsrfEfixPA"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs border border-slate-700 transition-all text-center min-h-[42px]"
        >
          <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="truncate">Open Official Application Form (forms.gle/jM5hTaGvsrfEfixPA)</span>
          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
        </a>

      </div>
    </div>
  );
}
