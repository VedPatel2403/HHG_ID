// Fun hacker title generator & stack definitions for HH Goa 2026

export const TITLES_BY_ROLE = {
  'AI / ML': [
    'Prompt Whisperer',
    'Neural Network Alchemist',
    'LLM Fine-Tuner',
    'Agentic AI Architect',
    'Matrix Matrixian',
    'Transformer Overlord',
    'RAG Systems Guru'
  ],
  'Web3 / Solana': [
    'Solana Gasless Alchemist',
    'Smart Contract Sorcerer',
    'Anchor Master',
    'Zero-Knowledge Ninja',
    'DeFi Liquidity Wizard',
    'On-Chain Degen Master',
    'Rust Program Specialist'
  ],
  'Fullstack': [
    '10x Vibe Coder',
    'Async Stack Warlock',
    'Pixel-to-Database Architect',
    'Production Deployment God',
    'TypeScript Titan',
    'Fullstack Phantom',
    'Vercel Speed Demon'
  ],
  'UI/UX Design': [
    'Design System Maestro',
    'Figma Shader Artist',
    'Glassmorphism Sensei',
    'Micro-Animation Wizard',
    'UX Magic Maker',
    'Cyber Aesthetics Specialist'
  ],
  'DevOps / Cyber': [
    'Kubernetes Conqueror',
    'Zero-Trust Sentinel',
    'Binary Exploiter',
    'Cloud-Native Commander',
    'DevOps Orchestrator'
  ],
  'General Hacker': [
    'Goa Sunburst Hacker',
    'Hackathon Bounty Hunter',
    'Midnight Coffee Drinker',
    'Shipper-in-Chief',
    'Chaos Engineer',
    'Idea-to-Code Converter'
  ]
};

export const STACK_OPTIONS = [
  { id: 'solana', label: 'Solana', icon: '⚡' },
  { id: 'ai', label: 'AI / LLMs', icon: '🤖' },
  { id: 'react', label: 'React / Next', icon: '⚛️' },
  { id: 'rust', label: 'Rust', icon: '🦀' },
  { id: 'python', label: 'Python', icon: '🐍' },
  { id: 'typescript', label: 'TypeScript', icon: '🔷' },
  { id: 'design', label: 'Figma UI', icon: '🎨' },
  { id: 'solidity', label: 'Solidity', icon: '📜' },
  { id: 'cyber', label: 'Security', icon: '🛡️' },
  { id: 'go', label: 'Golang', icon: '🐹' },
  { id: 'tail', label: 'Tailwind', icon: '🌊' },
  { id: 'web3', label: 'Web3 / EVM', icon: '🌐' }
];

export const BADGE_PILLS = [
  { id: 'hacker', label: '⚡ Hacker', color: 'cyan' },
  { id: 'builder', label: '🚀 Builder', color: 'pink' },
  { id: 'designer', label: '🎨 Designer', color: 'gold' },
  { id: 'vip', label: '🌴 Goa VIP', color: 'emerald' },
  { id: 'bounty', label: '💰 Bounty Hunter', color: 'purple' },
  { id: 'speaker', label: '🎙️ Mentor / Speaker', color: 'blue' }
];

export function getRandomTitle(role = 'General Hacker') {
  const titles = TITLES_BY_ROLE[role] || TITLES_BY_ROLE['General Hacker'];
  const randomIndex = Math.floor(Math.random() * titles.length);
  return titles[randomIndex];
}

export function generateRandomIdNumber() {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `HH26-GOA-${num}`;
}
