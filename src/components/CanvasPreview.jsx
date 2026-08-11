import React, { useRef, useEffect, useState } from 'react';
import { Download, Share2, Sparkles, Copy, Eye, Check, ShieldCheck } from 'lucide-react';
import { renderCanvas } from '../utils/canvasRenderer';
import { sounds } from '../utils/audioEffects';
import confetti from 'canvas-confetti';

export default function CanvasPreview({
  format,
  image,
  photoState,
  badgeData,
  themeId,
  onOpenShare
}) {
  const canvasRef = useRef(null);
  const cardContainerRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [copied, setCopied] = useState(false);

  // Trigger real-time canvas render whenever state changes
  useEffect(() => {
    if (canvasRef.current) {
      renderCanvas({
        canvas: canvasRef.current,
        format,
        image,
        photoState,
        badgeData,
        themeId
      });
    }
  }, [format, image, photoState, badgeData, themeId]);

  // Mouse Move & Touch Drag 3D Card Tilt Effect for Mobile & Desktop
  const handleMove = (clientX, clientY) => {
    if (!cardContainerRef.current) return;
    const rect = cardContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rx = ((y - centerY) / centerY) * -14;
    const ry = ((x - centerX) / centerX) * 14;

    setTilt({ rx, ry });
  };

  const handleMouseMove = (e) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleResetTilt = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  // Download HD Image directly
  const handleDownload = (type = 'png') => {
    sounds.playSuccess();
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });

    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `HH_Goa_2026_${format.toUpperCase()}_${badgeData.name.replace(/\s+/g, '_')}.${type}`;
    link.href = canvasRef.current.toDataURL(`image/${type}`, 0.95);
    link.click();
  };

  // Copy Image to Clipboard
  const handleCopyClipboard = async () => {
    sounds.playClick();
    if (!canvasRef.current) return;
    try {
      canvasRef.current.toBlob(async (blob) => {
        if (blob && navigator.clipboard && window.ClipboardItem) {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          setCopied(true);
          sounds.playSuccess();
          setTimeout(() => setCopied(false), 2500);
        }
      }, 'image/png');
    } catch (err) {
      console.error('Clipboard write failed:', err);
    }
  };

  return (
    <div className="sticky top-20 lg:top-24">
      
      {/* Container Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Eye className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs sm:text-sm font-extrabold text-white uppercase tracking-wider">
            Live HD Preview ({format === 'pfp' ? 'PFP 1:1' : 'Card 4:5'})
          </h3>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center space-x-1">
          <Sparkles className="w-3 h-3" />
          <span className="hidden sm:inline">Instant Render</span>
        </span>
      </div>

      {/* 3D Holographic Tilt Wrapper (Mouse & Touch Enabled) */}
      <div
        ref={cardContainerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleResetTilt}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleResetTilt}
        className="card-3d-wrap relative group mb-5 cursor-pointer touch-none"
      >
        <div
          className="card-3d relative rounded-3xl overflow-hidden shadow-2xl border border-cyan-500/30 transition-transform duration-100 ease-out"
          style={{
            transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
            boxShadow: tilt.rx !== 0 ? '0 25px 50px -12px rgba(0, 242, 254, 0.25)' : '0 10px 30px rgba(0, 0, 0, 0.5)'
          }}
        >
          {/* Canvas Element */}
          <canvas
            ref={canvasRef}
            className="w-full h-auto max-h-[580px] object-contain rounded-3xl bg-slate-950 block"
          />

          {/* Holographic Sheen Overlay */}
          <div className="card-3d-shine" />

          {/* Live Hashtag Overlay Pill */}
          <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-cyan-400/40 text-[9px] sm:text-[10px] font-mono font-bold text-cyan-300 shadow-md">
            #FrameInGoa
          </div>
        </div>
      </div>

      {/* Main Download & Share Action Buttons (Mobile Touch Optimized) */}
      <div className="space-y-2.5">
        
        {/* Share to X Primary CTA */}
        <button
          onClick={() => {
            sounds.playSuccess();
            confetti({ particleCount: 100, spread: 90, origin: { y: 0.6 } });
            onOpenShare();
          }}
          className="w-full flex items-center justify-center space-x-2 py-4 px-5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-black text-sm sm:text-base rounded-2xl shadow-xl shadow-cyan-500/25 transition-all transform active:scale-95 border border-cyan-300/40 min-h-[52px]"
        >
          <Share2 className="w-5 h-5 shrink-0" />
          <span className="truncate">DOWNLOAD & POST ON X (#FrameInGoa)</span>
        </button>

        {/* Secondary Action Grid */}
        <div className="grid grid-cols-2 gap-2">
          
          {/* Direct HD PNG Download */}
          <button
            onClick={() => handleDownload('png')}
            className="flex items-center justify-center space-x-1.5 py-3.5 px-3 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white rounded-xl text-xs font-bold border border-slate-700/80 transition-all active:scale-95 min-h-[44px]"
          >
            <Download className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Download PNG</span>
          </button>

          {/* Copy to Clipboard */}
          <button
            onClick={handleCopyClipboard}
            className="flex items-center justify-center space-x-1.5 py-3.5 px-3 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white rounded-xl text-xs font-bold border border-slate-700/80 transition-all active:scale-95 min-h-[44px]"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Copy Image</span>
              </>
            )}
          </button>

        </div>

        <p className="text-[11px] text-center text-slate-400 font-medium pt-1 leading-normal">
          💡 <span className="text-slate-300">Requirement:</span> Post your downloaded graphic on X with <strong className="text-cyan-300">#FrameInGoa</strong> to get shortlisted!
        </p>

      </div>

    </div>
  );
}
