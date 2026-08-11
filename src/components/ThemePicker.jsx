import React from 'react';
import { Palette, Check } from 'lucide-react';
import { THEMES } from '../utils/canvasRenderer';
import { sounds } from '../utils/audioEffects';

export default function ThemePicker({ activeTheme, setActiveTheme }) {
  return (
    <div className="bg-slate-900/60 rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-slate-800 mb-6">
      
      <div className="flex items-center justify-between mb-3">
        <label className="text-xs font-extrabold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
          <Palette className="w-4 h-4 text-pink-400 shrink-0" />
          <span>Step 3: Branding Theme</span>
        </label>
        <span className="text-[10px] text-pink-400 font-mono font-semibold">5 Aesthetics</span>
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
              className={`p-3 rounded-xl sm:rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between h-20 active:scale-95 ${
                isSelected
                  ? 'border-cyan-400 bg-slate-800 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                  : 'border-slate-800 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              {/* Theme Color Dots */}
              <div className="flex items-center space-x-1 mb-2">
                <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: theme.primary }} />
                <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: theme.accent }} />
                <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: theme.gold }} />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white truncate">{theme.name}</span>
                {isSelected && <Check className="w-4 h-4 text-cyan-400 shrink-0" />}
              </div>
            </button>
          );
        })}
      </div>

    </div>
  );
}
