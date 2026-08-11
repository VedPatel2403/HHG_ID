import React, { useRef, useState } from 'react';
import { UploadCloud, Camera, Image as ImageIcon, Sparkles, RefreshCw, CheckCircle } from 'lucide-react';
import { sounds } from '../utils/audioEffects';
import WebcamModal from './WebcamModal';

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
    <div className="liquid-glass rounded-3xl p-5 border border-white/90 shadow-md mb-6">
      <div className="flex items-center justify-between mb-3">
        <label className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center space-x-1.5">
          <ImageIcon className="w-4 h-4 text-cyan-600" />
          <span>Step 1: Upload Your Photo</span>
        </label>
        {photoUrl && (
          <span className="text-[11px] text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-300 font-semibold flex items-center space-x-1 shadow-sm">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
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
        className={`relative border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 ${
          isDragging
            ? 'border-cyan-500 bg-cyan-100/60 scale-[0.99]'
            : photoUrl
            ? 'border-slate-300 bg-white/70 hover:border-cyan-400'
            : 'border-cyan-400/80 bg-cyan-50/50 hover:border-cyan-500 hover:bg-cyan-50/90'
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
          <div className="flex items-center justify-center space-x-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-cyan-500 shadow-md shrink-0">
              <img src={photoUrl} alt="Uploaded avatar" className="w-full h-full object-cover" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-slate-900">Custom Photo Uploaded</p>
              <p className="text-xs text-slate-500 mb-1">Click to replace or drop a new image</p>
              <span className="inline-flex items-center text-[10px] text-cyan-700 font-mono font-bold">
                <RefreshCw className="w-3 h-3 mr-1" /> Replace Photo
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center mx-auto border border-cyan-200 shadow-sm">
              <UploadCloud className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">
                Drag & Drop your photo here, or <span className="text-cyan-600 underline">Browse</span>
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Supports JPG, PNG, WEBP & HEIC • Auto crops & fits portrait/landscape
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Alternative Options: Camera Snapshot & Sample Avatars */}
      <div className="mt-4 pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
        
        {/* Webcam Capture Trigger */}
        <button
          type="button"
          onClick={() => {
            sounds.playClick();
            setIsWebcamOpen(true);
          }}
          className="flex items-center space-x-2 py-2 px-3.5 bg-white/90 hover:bg-white text-slate-800 rounded-xl text-xs font-semibold border border-slate-200 transition-all shadow-sm"
        >
          <Camera className="w-4 h-4 text-cyan-600" />
          <span>Take Live Selfie</span>
        </button>

        {/* Sample Avatars Quick Picker */}
        <div className="flex items-center space-x-2">
          <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">Or test with demo avatar:</span>
          <div className="flex items-center space-x-1.5">
            {SAMPLE_AVATARS.map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => handleSampleSelect(sample)}
                className="w-8 h-8 rounded-full overflow-hidden border border-slate-300 hover:border-cyan-500 transition-transform hover:scale-110 shadow-sm"
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
