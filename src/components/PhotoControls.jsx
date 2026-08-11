import React from 'react';
import { ZoomIn, RotateCcw, Move, Sliders, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audioEffects';

const FILTERS = [
  { id: 'none', label: 'Normal', color: 'bg-slate-800' },
  { id: 'cyber', label: 'Cyber Neon', color: 'bg-cyan-900/60 text-cyan-300 border-cyan-500' },
  { id: 'sunset', label: 'Sunset Glow', color: 'bg-pink-900/60 text-pink-300 border-pink-500' },
  { id: 'matrix', label: 'Matrix', color: 'bg-emerald-900/60 text-emerald-300 border-emerald-500' },
  { id: 'bw', label: 'Monochrome', color: 'bg-slate-700 text-slate-100' },
  { id: 'vintage', label: 'Vintage', color: 'bg-amber-900/60 text-amber-300 border-amber-500' }
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
    <div className="bg-slate-900/60 rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-slate-800 mb-6">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-3.5">
        <label className="text-xs font-extrabold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
          <Sliders className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Photo Controls & Filters</span>
        </label>
        <button
          type="button"
          onClick={resetAdjustments}
          className="flex items-center space-x-1 text-[11px] font-mono text-slate-400 hover:text-cyan-400 transition-colors active:scale-95 py-1 px-2 rounded-lg bg-slate-800/50"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        
        {/* Zoom Slider */}
        <div className="bg-slate-950/50 p-3 rounded-xl sm:rounded-2xl border border-slate-800">
          <div className="flex justify-between text-xs font-medium text-slate-300 mb-1.5">
            <span className="flex items-center space-x-1">
              <ZoomIn className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Zoom Scale</span>
            </span>
            <span className="font-mono text-cyan-400 font-bold">{photoState.zoom.toFixed(2)}x</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="2.5"
            step="0.05"
            value={photoState.zoom}
            onChange={handleZoomChange}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>

        {/* Rotation Slider */}
        <div className="bg-slate-950/50 p-3 rounded-xl sm:rounded-2xl border border-slate-800">
          <div className="flex justify-between text-xs font-medium text-slate-300 mb-1.5">
            <span className="flex items-center space-x-1">
              <RotateCcw className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>Rotation</span>
            </span>
            <span className="font-mono text-blue-400 font-bold">{photoState.rotate}°</span>
          </div>
          <input
            type="range"
            min="-180"
            max="180"
            step="5"
            value={photoState.rotate}
            onChange={handleRotateChange}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-400"
          />
        </div>

        {/* Pan X Slider */}
        <div className="bg-slate-950/50 p-3 rounded-xl sm:rounded-2xl border border-slate-800">
          <div className="flex justify-between text-xs font-medium text-slate-300 mb-1.5">
            <span className="flex items-center space-x-1">
              <Move className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Horizontal (X)</span>
            </span>
            <span className="font-mono text-amber-400 font-bold">{photoState.panX}px</span>
          </div>
          <input
            type="range"
            min="-300"
            max="300"
            step="10"
            value={photoState.panX}
            onChange={handlePanXChange}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
          />
        </div>

        {/* Pan Y Slider */}
        <div className="bg-slate-950/50 p-3 rounded-xl sm:rounded-2xl border border-slate-800">
          <div className="flex justify-between text-xs font-medium text-slate-300 mb-1.5">
            <span className="flex items-center space-x-1">
              <Move className="w-3.5 h-3.5 text-pink-400 shrink-0" />
              <span>Vertical (Y)</span>
            </span>
            <span className="font-mono text-pink-400 font-bold">{photoState.panY}px</span>
          </div>
          <input
            type="range"
            min="-300"
            max="300"
            step="10"
            value={photoState.panY}
            onChange={handlePanYChange}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-400"
          />
        </div>

      </div>

      {/* Filter Presets Grid */}
      <div>
        <span className="text-[11px] font-semibold text-slate-400 mb-2 block">Photo Filter Style:</span>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {FILTERS.map((f) => {
            const isSelected = photoState.filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`py-2 px-1.5 rounded-xl text-[11px] sm:text-xs font-semibold border transition-all text-center truncate active:scale-95 min-h-[38px] ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-950/60 text-cyan-300 shadow-md shadow-cyan-500/10 font-bold scale-[1.02]'
                    : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-white hover:border-slate-700'
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
