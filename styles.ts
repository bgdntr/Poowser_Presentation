
export const globalStyles = `
  :root {
    /* --- WHITE THEME (Light Side) --- */
    --bg-white: #f8f9fa;
    --bg-white-gradient: radial-gradient(circle at 0% 0%, #ffffff 0%, #eef2f6 100%);
    --bg-white-panel: rgba(255, 255, 255, 0.7);
    --fg-white-primary: #111827;
    --fg-white-secondary: #6b7280;
    --accent-white: #2563eb;
    --border-white: rgba(0,0,0, 0.06);
    --shadow-white: 0 20px 40px -10px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.02);
    --font-white: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    --radius-white: 24px;
    --glass-white: blur(20px) saturate(180%);

    /* --- BLACK THEME (Dark Side) --- */
    --bg-black: #030005;
    --bg-black-gradient: radial-gradient(circle at 80% 80%, #1e1b4b 0%, #000 70%);
    --bg-black-panel: rgba(20, 10, 30, 0.6);
    --fg-black-primary: #e0e7ff;
    --fg-black-secondary: #a5b4fc;
    --accent-black: #7c3aed; /* Violet/Indigo */
    --border-black: rgba(124, 58, 237, 0.2);
    --shadow-black: 0 0 40px rgba(124, 58, 237, 0.1);
    --font-black: 'JetBrains Mono', monospace;
    --radius-black: 12px;
    --glass-black: blur(20px);
    
    /* --- ANIMATION --- */
    --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
    --ease-fluid: cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* --- GLOBAL RESETS --- */
  * { box-sizing: border-box; outline: none; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
  body { font-size: 16px; font-family: var(--font-white); overflow-x: hidden; background: #000; }
  
  /* --- THEME CLASSES --- */
  .theme-white {
    background: var(--bg-white);
    background-image: var(--bg-white-gradient);
    color: var(--fg-white-primary);
    font-family: var(--font-white);
    --bg-panel: var(--bg-white-panel);
    --fg-primary: var(--fg-white-primary);
    --fg-secondary: var(--fg-white-secondary);
    --accent: var(--accent-white);
    --border: var(--border-white);
    --radius: var(--radius-white);
    --glass: var(--glass-white);
  }

  .theme-black {
    background: var(--bg-black);
    background-image: var(--bg-black-gradient);
    color: var(--fg-black-primary);
    font-family: var(--font-black);
    --bg-panel: var(--bg-black-panel);
    --fg-primary: var(--fg-black-primary);
    --fg-secondary: var(--fg-black-secondary);
    --accent: var(--accent-black);
    --border: var(--border-black);
    --radius: var(--radius-black);
    --glass: var(--glass-black);
  }

  /* --- UTILITIES --- */
  .panel {
    background: var(--bg-panel);
    backdrop-filter: var(--glass);
    -webkit-backdrop-filter: var(--glass);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    transition: all 0.5s var(--ease-out-expo);
    box-shadow: var(--shadow-white); /* Default shadow */
  }

  .theme-black .panel {
    box-shadow: var(--shadow-black);
  }
  
  /* --- FEATURE ROW (Zig Zag) --- */
  .feature-row {
    display: flex;
    align-items: center;
    gap: 4rem;
    margin-bottom: 8rem;
  }
  @media (max-width: 900px) {
    .feature-row { flexDirection: column !important; gap: 2rem; }
  }

  .feature-text {
    flex: 1;
    min-width: 300px;
  }
  
  .feature-image-container {
    flex: 1;
    min-width: 300px;
  }
  
  .feature-image {
    width: 100%;
    border-radius: var(--radius);
    box-shadow: var(--shadow-white);
    transition: transform 0.5s var(--ease-out-expo);
  }
  .theme-black .feature-image {
    box-shadow: var(--shadow-black);
    border: 1px solid var(--border);
  }
  .feature-row:hover .feature-image {
    transform: scale(1.02);
  }

  .btn {
    padding: 14px 28px;
    border-radius: var(--radius);
    border: none;
    cursor: pointer;
    font-family: inherit;
    font-weight: 600;
    font-size: 1rem;
    transition: all 0.3s var(--ease-out-expo);
    display: inline-flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }
  
  .btn-primary {
    background: var(--fg-primary);
    color: #fff;
  }
  .theme-white .btn-primary {
    background: #000;
    color: #fff;
    box-shadow: 0 10px 30px -10px rgba(0,0,0,0.3);
  }
  .theme-white .btn-primary:hover {
    transform: scale(1.02);
    box-shadow: 0 20px 40px -12px rgba(0,0,0,0.4);
  }

  .theme-black .btn-primary {
    background: var(--accent-black);
    color: #fff;
    border: 1px solid transparent;
    border-radius: 8px;
    text-transform: none;
    letter-spacing: 0;
  }
  .theme-black .btn-primary:hover {
    background: #6d28d9;
    box-shadow: 0 0 30px rgba(124, 58, 237, 0.5);
  }

  .btn-ghost {
    background: transparent;
    color: var(--fg-primary);
    opacity: 0.7;
  }
  .btn-ghost:hover {
    opacity: 1;
    background: rgba(125,125,125, 0.08);
  }

  /* --- GLASS TOGGLE --- */
  .glass-toggle-container {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 100px;
    padding: 4px;
    display: flex;
    position: relative;
    box-shadow: 0 8px 32px rgba(0,0,0,0.2);
    transition: all 0.3s ease;
  }
  
  .glass-toggle-btn {
    padding: 8px 16px;
    border-radius: 100px;
    border: none;
    background: transparent;
    color: rgba(255,255,255, 0.6);
    font-weight: 600;
    cursor: pointer;
    font-size: 0.9rem;
    z-index: 2;
    transition: color 0.3s;
  }
  .glass-toggle-btn.active {
    color: #fff;
  }
  
  .glass-toggle-slider {
    position: absolute;
    top: 4px; left: 4px; bottom: 4px;
    border-radius: 100px;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    transition: transform 0.3s var(--ease-out-expo);
    z-index: 1;
  }

  /* --- EFFECTS --- */
  .scanline {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1));
    background-size: 100% 4px;
    pointer-events: none;
    z-index: 9999;
    opacity: 0;
    transition: opacity 0.5s;
  }
  .theme-black .scanline { opacity: 0; } 

  /* Grid Pattern for Black Theme */
  .grid-bg {
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 60px 60px;
    opacity: 0;
    transition: opacity 1s;
    pointer-events: none;
  }
  .theme-black .grid-bg { opacity: 1; }

  .animate-in {
    animation: fadeIn 1s var(--ease-out-expo) forwards;
    opacity: 0;
    transform: translateY(30px);
  }
  @keyframes fadeIn {
    to { opacity: 1; transform: translateY(0); }
  }

  .fade-text {
    animation: textFadeIn 0.5s ease-out;
  }
  @keyframes textFadeIn {
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 0.7; transform: translateY(0); }
  }
  
  /* --- DIAGONAL SPLIT --- */
  .split-layer {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    transition: clip-path 0.8s var(--ease-out-expo);
  }

  /* --- MEME BG --- */
  .meme-item {
    position: absolute;
    font-weight: 800;
    color: rgba(0,0,0,0.1);
    font-family: sans-serif;
    user-select: none;
    white-space: nowrap;
    border: 2px solid rgba(0,0,0,0.05);
    padding: 10px 20px;
    border-radius: 8px;
    background: rgba(255,255,255,0.2);
    backdrop-filter: blur(2px); /* Removed backdrop filter in inline styles, kept here as fallback or for structure */
    transition: all 0.3s;
  }
  .meme-item:hover {
    color: rgba(0,0,0,0.4);
    z-index: 5;
    transform: scale(1.1) rotate(0deg) !important;
  }

  .soyjak-sticker {
    position: absolute;
    opacity: 0.3; 
    pointer-events: none;
    transition: transform 0.3s;
    z-index: 1;
  }
  .soyjak-sticker.floating {
    animation: float 6s ease-in-out infinite;
  }
  .soyjak-sticker:hover {
     opacity: 0.8;
     transform: scale(1.1);
  }

  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(var(--rot, 0deg)); }
    50% { transform: translateY(-20px) rotate(var(--rot, 5deg)); }
  }
`;
