import React from 'react';
import { Sparkles, Trophy, Star, Users } from 'lucide-react';
import { sounds } from '../utils/audioEffects';

const SAMPLE_BADGES = [
  {
    name: 'Sarah Chen',
    title: 'Solana Gasless Alchemist',
    role: 'Web3 / Solana',
    stack: 'SOL • RUST • ANCHOR',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    theme: 'Goa Light Sunburst'
  },
  {
    name: 'Rohan Sharma',
    title: 'Prompt Whisperer',
    role: 'AI / ML',
    stack: 'AI • LLM • PYTHON',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    theme: 'Solana Mint Light'
  },
  {
    name: 'Elena Rostova',
    title: '10x Vibe Coder',
    role: 'Fullstack',
    stack: 'REACT • NEXT • TAILWIND',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    theme: 'Neon Sunset Light'
  }
];

export default function PresetGallery({ onLoadSample }) {
  return (
    <div className="bg-white/80 rounded-3xl p-6 border border-slate-200/90 shadow-sm mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-extrabold text-slate-900">Community Inspiration Showcase</h3>
          </div>
          <p className="text-xs text-slate-500">See what 10,000+ builders are sharing on X with #FrameInGoa</p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200 text-xs font-mono text-cyan-700 font-semibold">
          <Users className="w-3.5 h-3.5 text-cyan-600" />
          <span>10,000+ Badges Generated</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SAMPLE_BADGES.map((b, idx) => (
          <div
            key={idx}
            onClick={() => {
              sounds.playClick();
              onLoadSample(b);
            }}
            className="bg-white border border-slate-200 hover:border-cyan-400 rounded-2xl p-4 transition-all duration-200 hover:-translate-y-1 cursor-pointer group shadow-sm hover:shadow-md"
          >
            <div className="flex items-center space-x-3 mb-3">
              <img
                src={b.avatar}
                alt={b.name}
                className="w-12 h-12 rounded-xl object-cover border border-cyan-500/50 group-hover:scale-105 transition-transform"
              />
              <div>
                <h4 className="font-bold text-sm text-slate-900 group-hover:text-cyan-600 transition-colors">
                  {b.name}
                </h4>
                <p className="text-[11px] font-mono text-amber-700 font-bold">{b.title}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-100">
              <span className="bg-slate-100 px-2 py-0.5 rounded text-cyan-800 border border-slate-200">{b.role}</span>
              <span className="text-pink-600 font-bold">#FrameInGoa</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
