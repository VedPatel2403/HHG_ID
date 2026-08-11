import React from 'react';
import { Palette, Check } from 'lucide-react';
import { THEMES } from '../utils/canvasRenderer';
import { sounds } from '../utils/audioEffects';

export default function ThemePicker({ activeTheme, setActiveTheme }) {
  return (
    <div className="liquid-glass rounded-3xl p-5 border border-white/90 shadow-md mb-6">
      
      <div className="flex items-center justify-between mb-3">
        <label className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center space-x-1.5">
          <Palette className="w-4 h-4 text-pink-600" />
          <span>Step 3: Choose Branding Theme</span>
        </label>
        <span className="text-[10px] text-pink-800 font-mono font-bold bg-pink-100/80 px-2 py-0.5 rounded-md border border-pink-300">5 Color Aesthetics</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {Object.values(THEMES).map((theme) => {
          const isSelected = activeTheme === theme.id;
          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => {
                sounds.playClick();
                setActiveTheme(theme.id);
              }}
              className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between h-20 ${
                isSelected
                  ? 'border-cyan-500 bg-cyan-100/60 shadow-md scale-[1.03]'
                  : 'border-white/80 bg-white/70 hover:border-slate-300 hover:bg-white/90'
              }`}
            >
              {/* Theme Color Dots */}
              <div className="flex items-center space-x-1 mb-2">
                <div className="w-3.5 h-3.5 rounded-full shadow-sm" style={{ backgroundColor: theme.primary }} />
                <div className="w-3.5 h-3.5 rounded-full shadow-sm" style={{ backgroundColor: theme.secondary }} />
                <div className="w-3.5 h-3.5 rounded-full shadow-sm" style={{ backgroundColor: theme.gold }} />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 truncate">{theme.name}</span>
                {isSelected && <Check className="w-4 h-4 text-cyan-600 shrink-0" />}
              </div>
            </button>
          );
        })}
      </div>

    </div>
  );
}
