import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, RefreshCw, Check } from 'lucide-react';
import { sounds } from '../utils/audioEffects';

export default function WebcamModal({ isOpen, onClose, onCapture }) {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [capturedUrl, setCapturedUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [isOpen]);

  const startCamera = async () => {
    setCapturedUrl(null);
    setError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 1280 }, facingMode: 'user' }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setError('Could not access camera. Please allow camera permissions or upload an image file.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const takeSnapshot = () => {
    sounds.playClick();
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 640;

    const ctx = canvas.getContext('2d');
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/png');
    setCapturedUrl(dataUrl);
  };

  const confirmPhoto = () => {
    if (capturedUrl) {
      sounds.playSuccess();
      const img = new Image();
      img.onload = () => {
        onCapture(img, capturedUrl);
        onClose();
      };
      img.src = capturedUrl;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-lg w-full shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Camera className="w-5 h-5 text-cyan-600" />
            <h3 className="text-lg font-bold text-slate-900">Live Camera Selfie Snapshot</h3>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video / Preview Container */}
        <div className="relative aspect-square w-full bg-slate-900 rounded-2xl overflow-hidden mb-5 border border-slate-300 flex items-center justify-center">
          {error ? (
            <div className="text-center p-6 text-slate-300 text-sm">{error}</div>
          ) : capturedUrl ? (
            <img src={capturedUrl} alt="Camera snapshot" className="w-full h-full object-cover" />
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover transform -scale-x-100"
            />
          )}

          {!capturedUrl && !error && (
            <div className="absolute inset-0 border-2 border-dashed border-cyan-400/60 rounded-full m-8 pointer-events-none" />
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between space-x-3">
          {capturedUrl ? (
            <>
              <button
                onClick={() => {
                  sounds.playClick();
                  setCapturedUrl(null);
                }}
                className="flex-1 flex items-center justify-center space-x-2 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-semibold text-xs border border-slate-200"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Retake</span>
              </button>

              <button
                onClick={confirmPhoto}
                className="flex-1 flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl text-xs shadow-md shadow-cyan-500/20"
              >
                <Check className="w-4 h-4" />
                <span>Use Selfie</span>
              </button>
            </>
          ) : (
            <button
              onClick={takeSnapshot}
              disabled={!!error}
              className="w-full flex items-center justify-center space-x-2 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-xl text-sm shadow-md shadow-cyan-500/25 disabled:opacity-50"
            >
              <Camera className="w-5 h-5" />
              <span>Capture Photo</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
