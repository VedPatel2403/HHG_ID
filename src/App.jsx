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
import { generateRandomIdNumber } from './utils/titleGenerator';
import { Share2, Sparkles, Image as ImageIcon, User, Palette, Eye, Download, ShieldCheck } from 'lucide-react';
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

  // Mobile Tab Navigation State ('preview' | 'photo' | 'details' | 'theme')
  const [mobileActiveTab, setMobileActiveTab] = useState('photo');

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
    <div className="min-h-screen flex flex-col justify-between relative overflow-x-hidden bg-[#060911] text-slate-100 pb-20 lg:pb-0">
      
      {/* Background Ambient Glow Orbs */}
      <div className="liquid-orb-1" />
      <div className="liquid-orb-2" />
      <div className="liquid-orb-3" />

      <div className="relative z-10">
        
        {/* Universal Sticky Header */}
        <Header
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
          onOpenShare={() => setIsShareOpen(true)}
        />

        {/* ========================================================================= */}
        {/* MOBILE VIEW (< 1024px) — DEDICATED MOBILE APP UX                          */}
        {/* ========================================================================= */}
        <div className="block lg:hidden px-3 py-3 max-w-md mx-auto space-y-4">
          
          {/* Mobile Hero Banner */}
          <HeroBanner />

          {/* Format Selector: Format A (PFP) vs Format B (ID Card) */}
          <FormatSelector
            activeFormat={activeFormat}
            setActiveFormat={setActiveFormat}
          />

          {/* Sticky Mobile Live Preview Card Area */}
          <div className="bg-slate-900/90 rounded-2xl p-3 border border-cyan-500/30 shadow-2xl">
            <CanvasPreview
              format={activeFormat}
              image={imageObj}
              photoState={photoState}
              badgeData={badgeData}
              themeId={activeTheme}
              onOpenShare={() => setIsShareOpen(true)}
            />
          </div>

          {/* Mobile Step Segment Tabs Navigator */}
          <div className="sticky top-14 z-40 bg-[#090E1A]/95 backdrop-blur-md p-1.5 rounded-2xl border border-slate-800 grid grid-cols-3 gap-1 shadow-lg">
            
            <button
              onClick={() => {
                sounds.playClick();
                setMobileActiveTab('photo');
              }}
              className={`flex items-center justify-center space-x-1 py-2.5 px-2 rounded-xl text-xs font-bold transition-all min-h-[42px] ${
                mobileActiveTab === 'photo'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>1. Photo</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                setMobileActiveTab('details');
              }}
              className={`flex items-center justify-center space-x-1 py-2.5 px-2 rounded-xl text-xs font-bold transition-all min-h-[42px] ${
                mobileActiveTab === 'details'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>2. Details</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                setMobileActiveTab('theme');
              }}
              className={`flex items-center justify-center space-x-1 py-2.5 px-2 rounded-xl text-xs font-bold transition-all min-h-[42px] ${
                mobileActiveTab === 'theme'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>3. Theme</span>
            </button>

          </div>

          {/* Active Mobile Step Content */}
          <div className="space-y-4 pt-1">
            {mobileActiveTab === 'photo' && (
              <>
                <PhotoUploader
                  photoUrl={photoUrl}
                  onPhotoLoaded={handlePhotoLoaded}
                />
                <PhotoControls
                  photoState={photoState}
                  setPhotoState={setPhotoState}
                />
              </>
            )}

            {mobileActiveTab === 'details' && (
              <BadgeForm
                badgeData={badgeData}
                setBadgeData={setBadgeData}
              />
            )}

            {mobileActiveTab === 'theme' && (
              <ThemePicker
                activeTheme={activeTheme}
                setActiveTheme={setActiveTheme}
              />
            )}
          </div>

          {/* Preset Gallery */}
          <div className="pt-4">
            <PresetGallery onLoadSample={handleLoadSample} />
          </div>

        </div>

        {/* ========================================================================= */}
        {/* DESKTOP VIEW (>= 1024px) — ORIGINAL 2-COLUMN GRID (UNTOUCHED)            */}
        {/* ========================================================================= */}
        <main className="hidden lg:block max-w-7xl mx-auto px-6 lg:px-8 py-8">
          
          {/* Top Hero Banner */}
          <HeroBanner />

          {/* Format Switcher Tabs (Format A: PFP vs Format B: ID Card) */}
          <FormatSelector
            activeFormat={activeFormat}
            setActiveFormat={setActiveFormat}
          />

          {/* 2-Column Responsive Grid */}
          <div className="grid grid-cols-12 gap-8">
            
            {/* Left Column: Generator Controls & Inputs (7 cols) */}
            <div className="col-span-7 space-y-6">
              
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
            <div className="col-span-5">
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

      {/* Dedicated Mobile Floating Bottom Bar (< 1024px) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-xl border-t border-cyan-500/40 p-3 px-4 flex items-center justify-between lg:hidden shadow-2xl">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-xs font-mono font-bold text-cyan-300">#FrameInGoa</span>
        </div>

        <button
          onClick={() => {
            sounds.playSuccess();
            setIsShareOpen(true);
          }}
          className="flex items-center space-x-2 py-3 px-5 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 active:scale-95 text-slate-950 font-black rounded-xl text-xs sm:text-sm shadow-xl shadow-cyan-500/30 min-h-[46px]"
        >
          <Share2 className="w-4 h-4 shrink-0" />
          <span>POST ON X</span>
        </button>
      </div>

      {/* Universal Footer */}
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
