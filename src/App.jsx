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
    <div className="min-h-screen flex flex-col justify-between relative overflow-hidden">
      
      {/* Morphing Liquid Glass Orbs */}
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
        <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
          
          {/* Top Hero Banner */}
          <HeroBanner />

          {/* Format Switcher Tabs (Format A: PFP vs Format B: ID Card) */}
          <FormatSelector
            activeFormat={activeFormat}
            setActiveFormat={setActiveFormat}
          />

          {/* Main 2-Column Responsive Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Generator Controls & Inputs (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
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
          <div className="mt-16">
            <PresetGallery onLoadSample={handleLoadSample} />
          </div>

        </main>
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
