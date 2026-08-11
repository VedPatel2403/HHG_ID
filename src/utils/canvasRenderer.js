// Canvas Rendering Engine for HH Goa 2026 PFP Frame & Builder ID Badge

export const THEMES = {
  sunburst: {
    id: 'sunburst',
    name: 'Goa Light Sunburst',
    primary: '#0077B6',
    secondary: '#00B4D8',
    accent: '#D97706',
    gold: '#F59E0B',
    bg1: '#F8FAFC',
    bg2: '#E0F2FE',
    cardBg: '#FFFFFF',
    textMain: '#0F172A',
    textSub: '#475569'
  },
  sunset: {
    id: 'sunset',
    name: 'Neon Sunset Light',
    primary: '#E11D48',
    secondary: '#F43F5E',
    accent: '#D97706',
    gold: '#F59E0B',
    bg1: '#FFF1F2',
    bg2: '#FFE4E6',
    cardBg: '#FFFFFF',
    textMain: '#881337',
    textSub: '#9F1239'
  },
  solana: {
    id: 'solana',
    name: 'Solana Mint Light',
    primary: '#059669',
    secondary: '#10B981',
    accent: '#7C3AED',
    gold: '#10B981',
    bg1: '#ECFDF5',
    bg2: '#D1FAE5',
    cardBg: '#FFFFFF',
    textMain: '#064E3B',
    textSub: '#047857'
  },
  gold: {
    id: 'gold',
    name: 'VIP Champagne Gold',
    primary: '#B45309',
    secondary: '#D97706',
    accent: '#0284C7',
    gold: '#D97706',
    bg1: '#FFFBEB',
    bg2: '#FEF3C7',
    cardBg: '#FFFFFF',
    textMain: '#451A03',
    textSub: '#78350F'
  },
  cyberDark: {
    id: 'cyberDark',
    name: 'Cyber Dark Contrast',
    primary: '#00F2FE',
    secondary: '#4FACFE',
    accent: '#FF0844',
    gold: '#FFD700',
    bg1: '#070C18',
    bg2: '#0F172A',
    cardBg: '#090E1B',
    textMain: '#FFFFFF',
    textSub: '#94A3B8'
  }
};

/**
 * Main draw function to render on target canvas
 */
export function renderCanvas({
  canvas,
  format = 'card', // 'pfp' | 'card'
  image,
  photoState = { zoom: 1, panX: 0, panY: 0, rotate: 0, filter: 'none' },
  badgeData = {
    name: 'Hacker Alex',
    role: 'Fullstack',
    title: '10x Vibe Coder',
    stack: ['solana', 'ai', 'react'],
    badgePill: '⚡ Hacker',
    tagline: 'Ready to build the future at Hacker House Goa!',
    idNumber: 'HH26-GOA-8842'
  },
  themeId = 'sunburst'
}) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const theme = THEMES[themeId] || THEMES.sunburst;

  if (format === 'pfp') {
    renderPFPFrame(ctx, canvas, image, photoState, badgeData, theme);
  } else {
    renderBuilderCard(ctx, canvas, image, photoState, badgeData, theme);
  }
}

/**
 * Format A: PFP Frame / Overlay Renderer (2000 x 2000 HD)
 */
function renderPFPFrame(ctx, canvas, image, photoState, badgeData, theme) {
  const width = 2000;
  const height = 2000;
  canvas.width = width;
  canvas.height = height;

  // Background gradient fill
  const bgGrad = ctx.createRadialGradient(width/2, height/2, 200, width/2, height/2, 1200);
  bgGrad.addColorStop(0, theme.bg2);
  bgGrad.addColorStop(1, theme.bg1);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Background Grid overlay
  drawGridPattern(ctx, width, height, theme);

  // Photo Area - Center Circular Mask
  const centerX = width / 2;
  const centerY = height / 2 - 40;
  const radius = 720;

  ctx.save();
  // Create circular clip path
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();

  // Draw user uploaded image with adjustments
  if (image) {
    drawAdjustedPhoto(ctx, image, centerX, centerY, radius * 2, radius * 2, photoState);
  } else {
    // Fallback placeholder gradient avatar
    const placeholderGrad = ctx.createLinearGradient(centerX - radius, centerY - radius, centerX + radius, centerY + radius);
    placeholderGrad.addColorStop(0, '#E2E8F0');
    placeholderGrad.addColorStop(1, '#CBD5E1');
    ctx.fillStyle = placeholderGrad;
    ctx.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2);

    ctx.fillStyle = theme.primary;
    ctx.font = '900 160px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText((badgeData.name || 'HH').slice(0, 2).toUpperCase(), centerX, centerY);
  }
  ctx.restore();

  // Outer Glowing Ring 1
  ctx.save();
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius + 15, 0, Math.PI * 2);
  ctx.lineWidth = 24;
  const ringGrad = ctx.createLinearGradient(0, 0, width, height);
  ringGrad.addColorStop(0, theme.primary);
  ringGrad.addColorStop(0.5, theme.secondary);
  ringGrad.addColorStop(1, theme.accent);
  ctx.strokeStyle = ringGrad;
  ctx.shadowColor = theme.primary;
  ctx.shadowBlur = 30;
  ctx.stroke();
  ctx.restore();

  // Outer Decorative Secondary Ring
  ctx.save();
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius + 40, -Math.PI/4, Math.PI * 1.25);
  ctx.lineWidth = 8;
  ctx.strokeStyle = theme.gold;
  ctx.stroke();
  ctx.restore();

  // Tropical Cyber Palm Leaves Graphics
  drawTropicalPalms(ctx, width, height, theme);

  // Top Banner Branding
  ctx.save();
  // Glass Pill Header
  drawRoundedRect(ctx, width/2 - 450, 90, 900, 110, 55, theme.cardBg, theme.primary, 3);
  ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
  ctx.shadowBlur = 20;

  ctx.fillStyle = theme.primary;
  ctx.font = '900 48px Outfit, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('HACKER HOUSE GOA 2026', width/2, 145);
  ctx.restore();

  // Bottom Badge Pill - #FrameInGoa Hashtag & Name
  ctx.save();
  // Main Bottom Container
  const bottomBoxY = height - 280;
  drawRoundedRect(ctx, width/2 - 650, bottomBoxY, 1300, 180, 40, theme.cardBg, theme.primary, 4);
  
  // Hashtag Badge Tag (Top of bottom box)
  drawRoundedRect(ctx, width/2 - 250, bottomBoxY - 35, 500, 70, 35, theme.primary, '#FFFFFF', 0);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 38px Space Mono, monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('#FrameInGoa', width/2, bottomBoxY);

  // User Name
  ctx.fillStyle = theme.textMain;
  ctx.font = '800 56px Outfit, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText((badgeData.name || 'GOA BUILDER').toUpperCase(), width/2, bottomBoxY + 80);

  // Title / Subtext
  ctx.fillStyle = theme.accent;
  ctx.font = '700 34px Space Mono, monospace';
  ctx.fillText(badgeData.title || 'Official Hackathon Builder', width/2, bottomBoxY + 130);
  ctx.restore();

  // Corner Micro-Badges
  drawCornerDecorations(ctx, width, height, theme);
}

/**
 * Format B: Builder ID Badge Renderer (1200 x 1500 HD 4:5 ratio)
 */
function renderBuilderCard(ctx, canvas, image, photoState, badgeData, theme) {
  const width = 1200;
  const height = 1500;
  canvas.width = width;
  canvas.height = height;

  // 1. Background Fill
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, theme.bg1);
  bgGrad.addColorStop(0.5, theme.bg2);
  bgGrad.addColorStop(1, theme.bg1);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Grid pattern
  drawGridPattern(ctx, width, height, theme);

  // Ambient glow
  const glowRad = ctx.createRadialGradient(width/2, 400, 50, width/2, 400, 600);
  glowRad.addColorStop(0, hexToRgba(theme.primary, 0.15));
  glowRad.addColorStop(1, 'transparent');
  ctx.fillStyle = glowRad;
  ctx.fillRect(0, 0, width, height);

  // Outer Card Frame
  drawRoundedRect(ctx, 40, 40, width - 80, height - 80, 36, theme.cardBg, theme.primary, 3);
  drawRoundedRect(ctx, 48, 48, width - 96, height - 96, 28, 'transparent', hexToRgba(theme.secondary, 0.3), 1.5);

  // 2. Top Header Bar (Hacker House Goa 2026)
  ctx.save();
  const headerGrad = ctx.createLinearGradient(60, 60, width - 120, 160);
  headerGrad.addColorStop(0, hexToRgba(theme.primary, 0.1));
  headerGrad.addColorStop(1, hexToRgba(theme.secondary, 0.1));
  drawRoundedRect(ctx, 60, 60, width - 120, 120, 20, headerGrad, theme.primary, 1.5);

  // Logo / Event Icon
  ctx.fillStyle = theme.accent;
  ctx.font = '700 42px Outfit, sans-serif';
  ctx.fillText('🌴', 90, 135);

  ctx.fillStyle = theme.textMain;
  ctx.font = '900 38px Outfit, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('HH GOA 2026', 150, 115);

  ctx.fillStyle = theme.primary;
  ctx.font = '700 20px Space Mono, monospace';
  ctx.fillText('OFFICIAL BUILDER PASS', 150, 145);

  // ID Ticket Number (Top Right)
  ctx.fillStyle = theme.accent;
  ctx.font = '700 22px Space Mono, monospace';
  ctx.textAlign = 'right';
  ctx.fillText(badgeData.idNumber || 'HH26-GOA-8842', width - 90, 115);

  ctx.fillStyle = theme.textSub;
  ctx.font = '600 16px Space Mono, monospace';
  ctx.fillText('STATUS: CONFIRMED', width - 90, 142);
  ctx.restore();

  // 3. User Avatar Frame Box (Center Top)
  const avatarX = width / 2;
  const avatarY = 460;
  const avatarSize = 420;

  ctx.save();
  // Outer Border
  ctx.beginPath();
  ctx.arc(avatarX, avatarY, avatarSize / 2 + 12, 0, Math.PI * 2);
  const avatarBorderGrad = ctx.createLinearGradient(avatarX - 200, avatarY - 200, avatarX + 200, avatarY + 200);
  avatarBorderGrad.addColorStop(0, theme.primary);
  avatarBorderGrad.addColorStop(0.5, theme.gold);
  avatarBorderGrad.addColorStop(1, theme.accent);
  ctx.strokeStyle = avatarBorderGrad;
  ctx.lineWidth = 10;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
  ctx.shadowBlur = 20;
  ctx.stroke();

  // Avatar Clip
  ctx.beginPath();
  ctx.arc(avatarX, avatarY, avatarSize / 2, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();

  if (image) {
    drawAdjustedPhoto(ctx, image, avatarX, avatarY, avatarSize, avatarSize, photoState);
  } else {
    // Placeholder
    ctx.fillStyle = '#E2E8F0';
    ctx.fillRect(avatarX - avatarSize/2, avatarY - avatarSize/2, avatarSize, avatarSize);
    ctx.fillStyle = theme.primary;
    ctx.font = '900 120px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText((badgeData.name || 'GOA').slice(0, 2).toUpperCase(), avatarX, avatarY);
  }
  ctx.restore();

  // Badge Pill Tag directly under Avatar
  ctx.save();
  const badgePillText = badgeData.badgePill || '⚡ Hacker';
  drawRoundedRect(ctx, avatarX - 140, avatarY + avatarSize/2 - 25, 280, 50, 25, theme.primary, '#FFFFFF', 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 22px Outfit, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(badgePillText, avatarX, avatarY + avatarSize/2);
  ctx.restore();

  // 4. Builder Details Section
  const detailsY = 740;

  // Builder Name
  ctx.save();
  ctx.fillStyle = theme.textMain;
  ctx.font = '900 64px Outfit, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText(badgeData.name || 'HACKER NAME', width / 2, detailsY);

  // Generated Builder Title
  ctx.fillStyle = theme.accent;
  ctx.font = '700 32px Space Mono, monospace';
  ctx.fillText(`[ ${badgeData.title || '10x Vibe Coder'} ]`, width / 2, detailsY + 75);

  // Tagline / Goal
  if (badgeData.tagline) {
    ctx.fillStyle = theme.textSub;
    ctx.font = '500 22px Inter, sans-serif';
    ctx.fillText(`"${badgeData.tagline}"`, width / 2, detailsY + 125);
  }
  ctx.restore();

  // 5. Tech Stack Pills Section
  ctx.save();
  const stackList = badgeData.stack || ['solana', 'ai', 'react'];
  const pillY = detailsY + 180;
  const pillHeight = 44;
  
  let pillX = width / 2 - (stackList.length * 110) / 2;
  stackList.forEach((tech) => {
    drawRoundedRect(ctx, pillX, pillY, 100, pillHeight, 22, hexToRgba(theme.primary, 0.1), theme.primary, 1.5);
    ctx.fillStyle = theme.primary;
    ctx.font = '700 18px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(tech.toUpperCase(), pillX + 50, pillY + pillHeight / 2);
    pillX += 110;
  });
  ctx.restore();

  // 6. Bottom Banner & QR Code
  ctx.save();
  const bottomY = height - 280;
  // Footer Box
  drawRoundedRect(ctx, 70, bottomY, width - 140, 200, 28, theme.cardBg, theme.primary, 2);

  // Hashtag Callout Box
  drawRoundedRect(ctx, 95, bottomY + 30, 480, 70, 18, theme.primary, 'transparent', 0);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 36px Space Mono, monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('#FrameInGoa', 335, bottomY + 65);

  // Subtext under hashtag
  ctx.fillStyle = theme.textMain;
  ctx.font = '600 20px Inter, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('Shared on X • Hacker House Goa 2026', 100, bottomY + 145);

  // QR Code Rendering at Bottom Right
  drawQRCode(ctx, width - 240, bottomY + 25, 140, theme);
  ctx.fillStyle = theme.textSub;
  ctx.font = '600 14px Space Mono, monospace';
  ctx.textAlign = 'center';
  ctx.fillText('SCAN TO VERIFY', width - 170, bottomY + 180);

  ctx.restore();
}

/**
 * Draw photo canvas transform with zoom, pan, rotate, filter
 */
function drawAdjustedPhoto(ctx, img, centerX, centerY, targetW, targetH, photoState) {
  ctx.save();
  ctx.translate(centerX, centerY);

  if (photoState.rotate) {
    ctx.rotate((photoState.rotate * Math.PI) / 180);
  }

  if (photoState.filter && photoState.filter !== 'none') {
    switch (photoState.filter) {
      case 'cyber':
        ctx.filter = 'contrast(1.25) saturate(1.4) hue-rotate(180deg)';
        break;
      case 'sunset':
        ctx.filter = 'contrast(1.1) saturate(1.5) sepia(0.3) hue-rotate(-20deg)';
        break;
      case 'matrix':
        ctx.filter = 'contrast(1.4) saturate(2) hue-rotate(90deg)';
        break;
      case 'bw':
        ctx.filter = 'grayscale(1) contrast(1.3)';
        break;
      case 'vintage':
        ctx.filter = 'sepia(0.4) contrast(1.1) brightness(0.95)';
        break;
      default:
        ctx.filter = 'none';
    }
  }

  const scale = Math.max(targetW / img.width, targetH / img.height) * (photoState.zoom || 1);
  const drawW = img.width * scale;
  const drawH = img.height * scale;

  const panX = photoState.panX || 0;
  const panY = photoState.panY || 0;

  ctx.drawImage(img, -drawW / 2 + panX, -drawH / 2 + panY, drawW, drawH);
  ctx.restore();
}

function drawTropicalPalms(ctx, width, height, theme) {
  ctx.save();
  ctx.fillStyle = hexToRgba(theme.primary, 0.12);

  ctx.beginPath();
  ctx.ellipse(120, 200, 180, 60, Math.PI / 4, 0, Math.PI * 2);
  ctx.ellipse(220, 120, 160, 50, Math.PI / 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = hexToRgba(theme.accent, 0.12);
  ctx.beginPath();
  ctx.ellipse(width - 120, 200, 180, 60, -Math.PI / 4, 0, Math.PI * 2);
  ctx.ellipse(width - 220, 120, 160, 50, -Math.PI / 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawGridPattern(ctx, width, height, theme) {
  ctx.save();
  ctx.strokeStyle = hexToRgba(theme.primary, 0.08);
  ctx.lineWidth = 1.5;
  const step = 80;

  for (let x = 0; x < width; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  for (let y = 0; y < height; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  ctx.restore();
}

function drawCornerDecorations(ctx, width, height, theme) {
  ctx.save();
  ctx.strokeStyle = theme.primary;
  ctx.lineWidth = 4;

  const len = 40;
  const margin = 60;

  ctx.beginPath();
  ctx.moveTo(margin, margin + len);
  ctx.lineTo(margin, margin);
  ctx.lineTo(margin + len, margin);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(width - margin - len, margin);
  ctx.lineTo(width - margin, margin);
  ctx.lineTo(width - margin, margin + len);
  ctx.stroke();
  ctx.restore();
}

function drawQRCode(ctx, x, y, size, theme) {
  ctx.save();
  ctx.fillStyle = theme.textMain;
  ctx.fillRect(x, y, size, size);

  ctx.fillStyle = theme.cardBg;
  const cellSize = size / 7;

  drawQRSquare(ctx, x + cellSize * 0.5, y + cellSize * 0.5, cellSize * 2, theme);
  drawQRSquare(ctx, x + size - cellSize * 2.5, y + cellSize * 0.5, cellSize * 2, theme);
  drawQRSquare(ctx, x + cellSize * 0.5, y + size - cellSize * 2.5, cellSize * 2, theme);

  ctx.fillStyle = theme.primary;
  for (let r = 0; r < 7; r++) {
    for (let c = 0; c < 7; c++) {
      if ((r < 3 && c < 3) || (r < 3 && c > 3) || (r > 3 && c < 3)) continue;
      if ((r + c) % 2 === 0 || (r * c) % 3 === 0) {
        ctx.fillRect(x + c * cellSize + cellSize * 0.2, y + r * cellSize + cellSize * 0.2, cellSize * 0.6, cellSize * 0.6);
      }
    }
  }
  ctx.restore();
}

function drawQRSquare(ctx, x, y, size, theme) {
  ctx.fillRect(x, y, size, size);
  ctx.fillStyle = theme.textMain;
  ctx.fillRect(x + size * 0.25, y + size * 0.25, size * 0.5, size * 0.5);
  ctx.fillStyle = theme.cardBg;
  ctx.fillRect(x + size * 0.35, y + size * 0.35, size * 0.3, size * 0.3);
}

function drawRoundedRect(ctx, x, y, width, height, radius, fill, stroke, strokeWidth) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();

  if (fill && fill !== 'transparent') {
    ctx.fillStyle = fill;
    ctx.fill();
  }

  if (stroke && stroke !== 'transparent' && strokeWidth > 0) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = strokeWidth;
    ctx.stroke();
  }
  ctx.restore();
}

function hexToRgba(hex, alpha = 1) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
}
