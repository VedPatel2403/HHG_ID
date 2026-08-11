import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import FormatSelector from './components/FormatSelector';
import PhotoUploader from './components/PhotoUploader';
import PhotoControls from './components/PhotoControls';
import BadgeForm from './components/BadgeForm';
import ThemePicker from './components/ThemePicker';
import CanvasPreview from './components/CanvasPreview';
import ShareModal from './components/ShareModal';
import PresetGallery from './components/PresetGallery';
import Footer from './components/Footer';
import { generateRandomIdNumber, getRandomTitle } from './utils/titleGenerator';
import { Share2, Download, Sparkles } from 'lucide-react';
import { sounds } from './utils/audioEffects';

export default function App() {
  // Main State Management
  const [activeFormat, setActiveFormat] = useState('card'); // 'card' | 'pfp'
  const [photoUrl, setPhotoUrl] = useState(null);
  const [imageObj, setImageObj] = useState(null);

  const [photoState, setPhotoState] = useState({
    zoom: 1,
    panX: 0,
    panY: 0,
    rotate: 0,
    filter: 'none'
  });

  const [badgeData, setBadgeData] = useState({
    name: 'Hacker Alex',
    role: 'Fullstack',
    title: '10x Vibe Coder',
    stack: ['solana', 'ai', 'react'],
    badgePill: '⚡ Hacker',
    tagline: 'Ready to build the future at Hacker House Goa!',
    idNumber: 'HH26-GOA-8842'
  });

  const [activeTheme, setActiveTheme] = useState('sunburst');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isShareOpen, setIsShareOpen] = useState(false);

  // Initialize random ID on first mount
  useEffect(() => {
    setBadgeData(prev => ({
      ...prev,
      idNumber: generateRandomIdNumber()
    }));
  }, []);

  const handlePhotoLoaded = (img, url) => {
    setImageObj(img);
    setPhotoUrl(url);
    setPhotoState({ zoom: 1, panX: 0, panY: 0, rotate: 0, filter: 'none' });
  };

  const handleLoadSample = (sample) => {
    setBadgeData(prev => ({
      ...prev,
      name: sample.name,
      title: sample.title,
      role: sample.role
    }));
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      setImageObj(img);
      setPhotoUrl(sample.avatar);
    };
    img.src = sample.avatar;
  };

  return (
    <div className="min-h-screen flex flex-col justify-between relative overflow-hidden pb-16 lg:pb-0">
      
      {/* Background Ambient Glow Orbs */}
      <div className="liquid-orb-1" />
      <div className="liquid-orb-2" />
      <div className="liquid-orb-3" />

      <div className="relative z-10">
        {/* Navigation Bar */}
        <Header
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
          onOpenShare={() => setIsShareOpen(true)}
        />

        {/* Main Content Body */}
        <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
          
          {/* Top Hero Banner */}
          <HeroBanner />

          {/* Format Switcher Tabs (Format A: PFP vs Format B: ID Card) */}
          <FormatSelector
            activeFormat={activeFormat}
            setActiveFormat={setActiveFormat}
          />

          {/* Main 2-Column Responsive Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            
            {/* Left Column: Generator Controls & Inputs (7 cols) */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              
              {/* Step 1: Photo Uploader */}
              <PhotoUploader
                photoUrl={photoUrl}
                onPhotoLoaded={handlePhotoLoaded}
              />

              {/* Step 2: Photo Fine-Tuning & Filters */}
              <PhotoControls
                photoState={photoState}
                setPhotoState={setPhotoState}
              />

              {/* Step 3: Builder Details Form (Role, Stack, Title, Tagline) */}
              <BadgeForm
                badgeData={badgeData}
                setBadgeData={setBadgeData}
              />

              {/* Step 4: Theme Picker */}
              <ThemePicker
                activeTheme={activeTheme}
                setActiveTheme={setActiveTheme}
              />

            </div>

            {/* Right Column: Real-Time Preview & Export Actions (5 cols) */}
            <div className="lg:col-span-5">
              <CanvasPreview
                format={activeFormat}
                image={imageObj}
                photoState={photoState}
                badgeData={badgeData}
                themeId={activeTheme}
                onOpenShare={() => setIsShareOpen(true)}
              />
            </div>

          </div>

          {/* Community Inspiration Showcase */}
          <div className="mt-12 sm:mt-16">
            <PresetGallery onLoadSample={handleLoadSample} />
          </div>

        </main>
      </div>

      {/* Sticky Mobile Floating Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/90 backdrop-blur-xl border-t border-cyan-500/30 p-2.5 px-4 flex items-center justify-between lg:hidden shadow-2xl">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-xs font-mono font-bold text-cyan-300">#FrameInGoa</span>
        </div>

        <button
          onClick={() => {
            sounds.playSuccess();
            setIsShareOpen(true);
          }}
          className="flex items-center space-x-2 py-2.5 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 active:scale-95 text-slate-950 font-black rounded-xl text-xs shadow-lg shadow-cyan-500/30"
        >
          <Share2 className="w-4 h-4 shrink-0" />
          <span>EXPORT & POST ON X</span>
        </button>
      </div>

      {/* Footer */}
      <Footer />

      {/* Share / Post on X Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        badgeData={badgeData}
        format={activeFormat}
      />
    </div>
  );
}
