import React from 'react';
import { User, Dices, Layers, Tag, ShieldAlert, Sparkles, Code, RefreshCw } from 'lucide-react';
import { getRandomTitle, STACK_OPTIONS, BADGE_PILLS, generateRandomIdNumber } from '../utils/titleGenerator';
import { sounds } from '../utils/audioEffects';

export default function BadgeForm({ badgeData, setBadgeData }) {
  
  const handleNameChange = (e) => {
    setBadgeData(prev => ({ ...prev, name: e.target.value }));
  };

  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    const newTitle = getRandomTitle(newRole);
    setBadgeData(prev => ({ ...prev, role: newRole, title: newTitle }));
  };

  const randomizeTitle = () => {
    sounds.playRandomize();
    const newTitle = getRandomTitle(badgeData.role);
    setBadgeData(prev => ({ ...prev, title: newTitle }));
  };

  const randomizeId = () => {
    sounds.playClick();
    setBadgeData(prev => ({ ...prev, idNumber: generateRandomIdNumber() }));
  };

  const toggleStack = (stackId) => {
    sounds.playClick();
    setBadgeData(prev => {
      const current = prev.stack || [];
      if (current.includes(stackId)) {
        return { ...prev, stack: current.filter(s => s !== stackId) };
      } else {
        if (current.length >= 4) return prev;
        return { ...prev, stack: [...current, stackId] };
      }
    });
  };

  const setBadgePill = (pillLabel) => {
    sounds.playClick();
    setBadgeData(prev => ({ ...prev, badgePill: pillLabel }));
  };

  return (
    <div className="bg-slate-900/60 rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-slate-800 mb-6">
      
      <div className="flex items-center justify-between mb-3.5">
        <label className="text-xs font-extrabold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
          <User className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Step 2: Builder Info</span>
        </label>
        <span className="text-[10px] text-amber-400 font-mono font-semibold bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
          Format B
        </span>
      </div>

      <div className="space-y-4">
        
        {/* Name Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Builder / Hacker Name:
          </label>
          <input
            type="text"
            value={badgeData.name}
            onChange={handleNameChange}
            placeholder="e.g. Satoshi Nakamoto"
            maxLength={24}
            className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-400 rounded-xl px-3.5 py-3 text-sm text-white font-medium focus:outline-none transition-all placeholder:text-slate-600 min-h-[44px]"
          />
        </div>

        {/* Primary Role & Auto Title Generator */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Primary Role:
            </label>
            <select
              value={badgeData.role}
              onChange={handleRoleChange}
              className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-400 rounded-xl px-3.5 py-3 text-xs text-white font-medium focus:outline-none transition-all min-h-[44px]"
            >
              <option value="General Hacker">🌴 General Hacker</option>
              <option value="AI / ML">🤖 AI / ML Engineer</option>
              <option value="Web3 / Solana">⚡ Web3 / Solana</option>
              <option value="Fullstack">💻 Fullstack Dev</option>
              <option value="UI/UX Design">🎨 UI/UX Designer</option>
              <option value="DevOps / Cyber">🛡️ DevOps / Cyber</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-semibold text-slate-300">
                Generated Builder Title:
              </label>
              <button
                type="button"
                onClick={randomizeTitle}
                className="text-[10px] text-cyan-400 hover:text-cyan-300 font-mono font-bold flex items-center space-x-1 py-0.5 px-1.5 bg-slate-800/60 rounded"
              >
                <Dices className="w-3 h-3" />
                <span>Randomize</span>
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                value={badgeData.title}
                onChange={(e) => setBadgeData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g. Solana Gasless Alchemist"
                maxLength={30}
                className="w-full bg-slate-950/80 border border-slate-800 focus:border-amber-400 rounded-xl px-3.5 py-3 text-xs text-amber-300 font-mono font-bold focus:outline-none min-h-[44px]"
              />
            </div>
          </div>

        </div>

        {/* Tech Stack Pills (Pick up to 4) */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-semibold text-slate-300">Tech Stack Pills (Select max 4):</span>
            <span className="text-[10px] font-mono text-cyan-400">{(badgeData.stack || []).length}/4 selected</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {STACK_OPTIONS.map((stack) => {
              const isSelected = (badgeData.stack || []).includes(stack.id);
              return (
                <button
                  key={stack.id}
                  type="button"
                  onClick={() => toggleStack(stack.id)}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all border flex items-center space-x-1 active:scale-95 min-h-[38px] ${
                    isSelected
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-sm shadow-cyan-500/20 font-bold scale-[1.02]'
                      : 'bg-slate-950/40 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <span>{stack.icon}</span>
                  <span>{stack.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Badge Category Tag */}
        <div>
          <span className="text-xs font-semibold text-slate-300 mb-1.5 block">Event Badge Status Pill:</span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {BADGE_PILLS.map((pill) => {
              const isSelected = badgeData.badgePill === pill.label;
              return (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => setBadgePill(pill.label)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all text-center active:scale-95 min-h-[40px] ${
                    isSelected
                      ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-300 border-pink-400 shadow-md shadow-pink-500/10'
                      : 'bg-slate-950/40 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {pill.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tagline / Goal Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Hackathon Tagline or Goal:
          </label>
          <input
            type="text"
            value={badgeData.tagline}
            onChange={(e) => setBadgeData(prev => ({ ...prev, tagline: e.target.value }))}
            placeholder="e.g. Building gasless dApps under the Goa sun!"
            maxLength={60}
            className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-400 rounded-xl px-3.5 py-3 text-xs text-slate-200 focus:outline-none min-h-[44px]"
          />
        </div>

        {/* ID Number Generator */}
        <div className="flex flex-row items-center justify-between pt-2 border-t border-slate-800/80">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-slate-400">ID Ticket:</span>
            <span className="font-mono font-bold text-xs text-amber-400 bg-amber-400/10 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg border border-amber-400/30">
              {badgeData.idNumber}
            </span>
          </div>
          <button
            type="button"
            onClick={randomizeId}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-mono font-semibold flex items-center space-x-1 py-1 px-2 bg-slate-800/60 rounded-lg active:scale-95"
          >
            <RefreshCw className="w-3.5 h-3.5 shrink-0" />
            <span>New ID</span>
          </button>
        </div>

      </div>

    </div>
  );
}
