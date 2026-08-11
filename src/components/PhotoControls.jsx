import React from 'react';
import { ZoomIn, RotateCcw, Move, Sliders, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audioEffects';

const FILTERS = [
  { id: 'none', label: 'Normal', color: 'bg-white' },
  { id: 'cyber', label: 'Cyber Neon', color: 'bg-cyan-100 text-cyan-800 border-cyan-400' },
  { id: 'sunset', label: 'Sunset Glow', color: 'bg-pink-100 text-pink-800 border-pink-400' },
  { id: 'matrix', label: 'Matrix Terminal', color: 'bg-emerald-100 text-emerald-800 border-emerald-400' },
  { id: 'bw', label: 'Monochrome', color: 'bg-slate-200 text-slate-800' },
  { id: 'vintage', label: 'Vintage Warm', color: 'bg-amber-100 text-amber-800 border-amber-400' }
];

export default function PhotoControls({ photoState, setPhotoState }) {
  const handleZoomChange = (e) => {
    setPhotoState(prev => ({ ...prev, zoom: parseFloat(e.target.value) }));
  };

  const handlePanXChange = (e) => {
    setPhotoState(prev => ({ ...prev, panX: parseInt(e.target.value, 10) }));
  };

  const handlePanYChange = (e) => {
    setPhotoState(prev => ({ ...prev, panY: parseInt(e.target.value, 10) }));
  };

  const handleRotateChange = (e) => {
    setPhotoState(prev => ({ ...prev, rotate: parseInt(e.target.value, 10) }));
  };

  const setFilter = (filterId) => {
    sounds.playClick();
    setPhotoState(prev => ({ ...prev, filter: filterId }));
  };

  const resetAdjustments = () => {
    sounds.playClick();
    setPhotoState({ zoom: 1, panX: 0, panY: 0, rotate: 0, filter: 'none' });
  };

  return (
    <div className="liquid-glass rounded-3xl p-5 border border-white/90 shadow-md mb-6">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <label className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center space-x-1.5">
          <Sliders className="w-4 h-4 text-cyan-600" />
          <span>Photo Fine-Tuning & Filters</span>
        </label>
        <button
          type="button"
          onClick={resetAdjustments}
          className="flex items-center space-x-1 text-[11px] font-mono text-slate-500 hover:text-cyan-600 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        
        {/* Zoom Slider */}
        <div className="bg-white/80 p-3 rounded-2xl border border-white/90 shadow-sm backdrop-blur-md">
          <div className="flex justify-between text-xs font-medium text-slate-700 mb-1.5">
            <span className="flex items-center space-x-1">
              <ZoomIn className="w-3.5 h-3.5 text-cyan-600" />
              <span>Zoom Scale</span>
            </span>
            <span className="font-mono text-cyan-700 font-bold">{photoState.zoom.toFixed(2)}x</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="2.5"
            step="0.05"
            value={photoState.zoom}
            onChange={handleZoomChange}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
          />
        </div>

        {/* Rotation Slider */}
        <div className="bg-white/80 p-3 rounded-2xl border border-white/90 shadow-sm backdrop-blur-md">
          <div className="flex justify-between text-xs font-medium text-slate-700 mb-1.5">
            <span className="flex items-center space-x-1">
              <RotateCcw className="w-3.5 h-3.5 text-blue-600" />
              <span>Rotation</span>
            </span>
            <span className="font-mono text-blue-700 font-bold">{photoState.rotate}°</span>
          </div>
          <input
            type="range"
            min="-180"
            max="180"
            step="5"
            value={photoState.rotate}
            onChange={handleRotateChange}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        {/* Pan X Slider */}
        <div className="bg-white/80 p-3 rounded-2xl border border-white/90 shadow-sm backdrop-blur-md">
          <div className="flex justify-between text-xs font-medium text-slate-700 mb-1.5">
            <span className="flex items-center space-x-1">
              <Move className="w-3.5 h-3.5 text-amber-600" />
              <span>Position Horizontal (X)</span>
            </span>
            <span className="font-mono text-amber-700 font-bold">{photoState.panX}px</span>
          </div>
          <input
            type="range"
            min="-300"
            max="300"
            step="10"
            value={photoState.panX}
            onChange={handlePanXChange}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
          />
        </div>

        {/* Pan Y Slider */}
        <div className="bg-white/80 p-3 rounded-2xl border border-white/90 shadow-sm backdrop-blur-md">
          <div className="flex justify-between text-xs font-medium text-slate-700 mb-1.5">
            <span className="flex items-center space-x-1">
              <Move className="w-3.5 h-3.5 text-pink-600" />
              <span>Position Vertical (Y)</span>
            </span>
            <span className="font-mono text-pink-700 font-bold">{photoState.panY}px</span>
          </div>
          <input
            type="range"
            min="-300"
            max="300"
            step="10"
            value={photoState.panY}
            onChange={handlePanYChange}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-pink-600"
          />
        </div>

      </div>

      {/* Filter Presets */}
      <div>
        <span className="text-[11px] font-semibold text-slate-600 mb-2 block">Photo Filter Style:</span>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {FILTERS.map((f) => {
            const isSelected = photoState.filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all text-center truncate ${
                  isSelected
                    ? 'border-cyan-500 bg-cyan-100/90 text-cyan-950 shadow-sm font-bold scale-[1.03]'
                    : 'border-slate-200 bg-white/70 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
