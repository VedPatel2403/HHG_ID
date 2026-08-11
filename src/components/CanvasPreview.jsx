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

  // 3D Holographic Card Mouse Move Tilt Effect
  const handleMouseMove = (e) => {
    if (!cardContainerRef.current) return;
    const rect = cardContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rx = ((y - centerY) / centerY) * -14; // rotateX max 14 deg
    const ry = ((x - centerX) / centerX) * 14;  // rotateY max 14 deg

    setTilt({ rx, ry });
  };

  const handleMouseLeave = () => {
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
    <div className="sticky top-24">
      
      {/* Container Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Eye className="w-4 h-4 text-cyan-600" />
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
            Live HD Preview ({format === 'pfp' ? 'PFP Frame 1:1' : 'Builder Card 4:5'})
          </h3>
        </div>
        <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-full border border-emerald-300 flex items-center space-x-1 font-bold shadow-sm">
          <Sparkles className="w-3 h-3 text-emerald-600" />
          <span>Instant Real-Time Render</span>
        </span>
      </div>

      {/* 3D Holographic Tilt Wrapper */}
      <div
        ref={cardContainerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="card-3d-wrap relative group mb-5 cursor-pointer"
      >
        <div
          className="card-3d relative rounded-3xl overflow-hidden shadow-2xl border border-white transition-transform duration-100 ease-out bg-white/90 backdrop-blur-md"
          style={{
            transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
            boxShadow: tilt.rx !== 0 ? '0 25px 50px -10px rgba(0, 180, 216, 0.3)' : '0 15px 35px -5px rgba(0, 0, 0, 0.08)'
          }}
        >
          {/* Canvas Element */}
          <canvas
            ref={canvasRef}
            className="w-full h-auto max-h-[620px] object-contain rounded-3xl bg-slate-100 block"
          />

          {/* Holographic Sheen Overlay */}
          <div className="card-3d-shine" />

          {/* Live Hashtag Overlay Pill */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-cyan-400 text-[10px] font-mono font-bold text-cyan-800 shadow-md">
            #FrameInGoa
          </div>
        </div>
      </div>

      {/* Main Download & Share Action Buttons */}
      <div className="space-y-2.5">
        
        {/* Share to X Primary CTA */}
        <button
          onClick={() => {
            sounds.playSuccess();
            confetti({ particleCount: 100, spread: 90, origin: { y: 0.6 } });
            onOpenShare();
          }}
          className="liquid-button w-full flex items-center justify-center space-x-2.5 py-4 px-6 text-white font-black text-sm lg:text-base rounded-2xl shadow-xl transition-all transform border border-cyan-300"
        >
          <Share2 className="w-5 h-5" />
          <span>DOWNLOAD & POST ON X (#FrameInGoa)</span>
        </button>

        {/* Secondary Action Grid */}
        <div className="grid grid-cols-2 gap-2">
          
          {/* Direct HD PNG Download */}
          <button
            onClick={() => handleDownload('png')}
            className="flex items-center justify-center space-x-2 py-3 px-4 bg-white/90 hover:bg-white text-slate-800 rounded-xl text-xs font-bold border border-slate-200 transition-all shadow-sm backdrop-blur-md"
          >
            <Download className="w-4 h-4 text-cyan-600" />
            <span>Download PNG</span>
          </button>

          {/* Copy to Clipboard */}
          <button
            onClick={handleCopyClipboard}
            className="flex items-center justify-center space-x-2 py-3 px-4 bg-white/90 hover:bg-white text-slate-800 rounded-xl text-xs font-bold border border-slate-200 transition-all shadow-sm backdrop-blur-md"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-600">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-amber-600" />
                <span>Copy Image</span>
              </>
            )}
          </button>

        </div>

        <p className="text-[11px] text-center text-slate-500 font-medium pt-1">
          💡 <span className="text-slate-700">Requirement:</span> Post your downloaded graphic on X with <strong className="text-cyan-700 font-bold">#FrameInGoa</strong> to get shortlisted!
        </p>

      </div>

    </div>
  );
}
