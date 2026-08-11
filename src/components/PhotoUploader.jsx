import React, { useRef, useState } from 'react';
import { UploadCloud, Camera, Image as ImageIcon, Sparkles, RefreshCw, CheckCircle } from 'lucide-react';
import { sounds } from '../utils/audioEffects';
import WebcamModal from './WebcamModal';

// High quality sample avatar presets
const SAMPLE_AVATARS = [
  { id: 'dev1', name: 'Cyber Hacker', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80' },
  { id: 'dev2', name: 'Solana Dev', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80' },
  { id: 'dev3', name: 'AI Engineer', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80' },
  { id: 'dev4', name: 'Goa Builder', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80' }
];

export default function PhotoUploader({ photoUrl, onPhotoLoaded }) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isWebcamOpen, setIsWebcamOpen] = useState(false);

  const processFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    sounds.playSuccess();

    const reader = new FileReader();
    reader.onload = (e) => {
      const srcUrl = e.target.result;
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        onPhotoLoaded(img, srcUrl);
      };
      img.src = srcUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleSampleSelect = (sample) => {
    sounds.playClick();
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      onPhotoLoaded(img, sample.url);
    };
    img.src = sample.url;
  };

  return (
    <div className="bg-slate-900/60 rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-slate-800 mb-6">
      <div className="flex items-center justify-between mb-3">
        <label className="text-xs font-extrabold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
          <ImageIcon className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Step 1: Upload Photo</span>
        </label>
        {photoUrl && (
          <span className="text-[10px] sm:text-[11px] text-emerald-400 font-semibold flex items-center space-x-1 shrink-0">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Photo Ready</span>
          </span>
        )}
      </div>

      {/* Main Drag and Drop Dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => {
          sounds.playClick();
          fileInputRef.current?.click();
        }}
        className={`relative border-2 border-dashed rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center cursor-pointer transition-all duration-200 active:scale-98 ${
          isDragging
            ? 'border-cyan-400 bg-cyan-950/30'
            : photoUrl
            ? 'border-slate-700 bg-slate-950/40 hover:border-cyan-500/50'
            : 'border-cyan-500/40 bg-slate-950/60 hover:border-cyan-400 hover:bg-slate-900/80'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {photoUrl ? (
          <div className="flex items-center justify-center space-x-3 sm:space-x-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-cyan-400 shadow-md shrink-0">
              <img src={photoUrl} alt="Uploaded avatar" className="w-full h-full object-cover" />
            </div>
            <div className="text-left">
              <p className="text-xs sm:text-sm font-bold text-white">Custom Photo Uploaded</p>
              <p className="text-[11px] text-slate-400 mb-1">Tap to replace or drop new image</p>
              <span className="inline-flex items-center text-[10px] text-cyan-400 font-mono">
                <RefreshCw className="w-3 h-3 mr-1" /> Tap to Change
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-1.5 sm:space-y-2 py-1 sm:py-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/20">
              <UploadCloud className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-white">
                Tap to <span className="text-cyan-400 underline">Upload Photo</span> or Drag & Drop
              </p>
              <p className="text-[10px] sm:text-xs text-slate-400 mt-1">
                JPG, PNG, WEBP & HEIC • Auto centers portrait & landscape
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Alternative Options: Camera Snapshot & Sample Avatars */}
      <div className="mt-3.5 pt-3.5 border-t border-slate-800/80 flex flex-col xs:flex-row items-center justify-between gap-3">
        
        {/* Webcam Capture Trigger */}
        <button
          type="button"
          onClick={() => {
            sounds.playClick();
            setIsWebcamOpen(true);
          }}
          className="w-full xs:w-auto flex items-center justify-center space-x-2 py-2.5 px-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-semibold border border-slate-700/60 transition-all active:scale-95 min-h-[40px]"
        >
          <Camera className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Take Live Selfie</span>
        </button>

        {/* Sample Avatars Quick Picker */}
        <div className="flex items-center justify-between w-full xs:w-auto space-x-2">
          <span className="text-[11px] text-slate-400 font-medium">Demo:</span>
          <div className="flex items-center space-x-2">
            {SAMPLE_AVATARS.map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => handleSampleSelect(sample)}
                className="w-8 h-8 rounded-full overflow-hidden border border-slate-700 hover:border-cyan-400 transition-transform active:scale-110 shrink-0"
                title={`Use ${sample.name}`}
              >
                <img src={sample.url} alt={sample.name} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Webcam Modal */}
      <WebcamModal
        isOpen={isWebcamOpen}
        onClose={() => setIsWebcamOpen(false)}
        onCapture={(img, srcUrl) => onPhotoLoaded(img, srcUrl)}
      />
    </div>
  );
}
