
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";
import { Theme, Space, Tab, Message, SystemStats } from './types';
import * as Icons from './icons';
import { globalStyles } from './styles';

// --- DATA: CODE (Right Side - Expanded) ---
const CODE_SNIPPETS = [
  "struct PhantomProtocol {",
  "  func init(secure: Bool) -> Void {",
  "    bypass_firewall(level: 9)",
  "    inject_payload(type: .ghost)",
  "  }",
  "}",
  "// SYSTEM OVERRIDE",
  "const _0x4f2 = 'ENCRYPTED';",
  "waiting_for_handshake...",
  "proxy_chain: [104.22.1.1 -> 98.11.2.5 -> NULL]",
  "user_agent = 'Mozilla/5.0 (Unknown; Linux x86_64)'",
  "trace_route: BLOCKING HOP 3",
  "kernel_panic: false",
  "memory_leak_check: PASSED",
  "root_access: GRANTED",
  "echo 'WE ARE WATCHING';",
  "rm -rf /logs/history",
  "mount --bind /dev/null /var/log/syslog",
  "establishing_tor_circuit...",
  "circuit_built: guard -> middle -> exit",
  "obfuscation_level: MAX",
  "01010100 01010010 01010101 01010100 01001000",
];

// --- DATA: QUOTES ---
const QUOTE_SETS = {
  white: [
    "One does not simply close a tab.",
    "It's not a bug, it's a feature.",
    "Have you tried turning it off and on again?",
    "Press F to pay respects.",
    "This is fine. 🔥",
    "I used to be an adventurer like you.",
    "Shut up and take my money!",
    "POV: You found a browser that works."
  ],
  black: [
    "I find your lack of privacy disturbing.",
    "Power! Unlimited power!",
    "I am the one who knocks.",
    "Privacy is a myth? Not here.",
    "We have such sights to show you.",
    "Resistance is futile.",
    "The Dark Side has cookies (encrypted ones).",
    "Execute Order 66 (Delete Cookies)."
  ]
};

// --- CONFIG: PRESENTATION IMAGES (REAL IMAGES) ---
const PRESENTATION_IMAGES = {
  light: {
    // Картинка для "Идеальный UI/UX": Абстрактные белые волны
    ui: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80",
    // Картинка для "Локальный Перевод": Чистая эстетика, книги или текст
    translation: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1000&q=80",
    // Картинка для "Глубокая Настройка": Абстрактная бумага/слои
    settings: "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?auto=format&fit=crop&w=1000&q=80"
  },
  dark: {
    // Картинка для "Mullvad & Tor": Темные серверные огни
    tor: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&w=1000&q=80",
    // Картинка для "User-Agent": Глич-эффект / Анонимность
    spoof: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1000&q=80",
    // Картинка для "Proxy Chains": Сетевые узлы / Киберпанк
    proxy: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80"
  }
};

// --- TRANSLATIONS & TEXT CONFIG ---
const TEXT = {
  en: {
    chooseSide: "Choose your side",
    zenTitle: "Light Side",
    zenBtn: "Choose Light",
    hackerTitle: "Phantom Side",
    hackerBtn: "Enter Shadow",
    heroWhiteTitle: "The Browser That\nThinks With You",
    heroWhiteDesc: "Experience a clutter-free interface powered by Neural AI. Organize your life with Spaces and stay in the flow.",
    heroBlackTitle: "BROWSE UNSEEN\nLEAVE NO TRACE",
    heroBlackDesc: "Advanced encryption. Zero-knowledge architecture. The browser for those who value true invisibility.",
    ctaWhite: "Download Beta",
    ctaBlack: "INITIATE_PHANTOM",
    features: {
      light: [
        {
          title: "Fluid Design & UX",
          desc: "A stunning glassmorphic interface that breathes. We prioritize visual clarity to reduce cognitive load, ensuring your browsing is safe from UI dark patterns.",
          img: PRESENTATION_IMAGES.light.ui
        },
        {
          title: "Local Processing",
          desc: "Instantly translate any page with context-aware AI. All processing happens locally or via encrypted channels, ensuring your reading habits remain secure.",
          img: PRESENTATION_IMAGES.light.translation
        },
        {
          title: "Deep Customization",
          desc: "From strict privacy shields to aesthetic tweaks. Every extension runs in a sandbox, guaranteeing that your personalized setup never compromises system security.",
          img: PRESENTATION_IMAGES.light.settings
        }
      ],
      dark: [
        {
          title: "Mullvad & Tor Integration",
          desc: "Route traffic through the Tor network or Mullvad VPN nodes directly from the omnibox. Security is built-in: your IP is masked behind military-grade encryption layers.",
          img: PRESENTATION_IMAGES.dark.tor
        },
        {
          title: "User-Agent Spoofing",
          desc: "Automatically shuffle your digital fingerprint. We randomize User-Agents and canvas data every session, providing security against cross-site tracking.",
          img: PRESENTATION_IMAGES.dark.spoof
        },
        {
          title: "Multi-Hop Proxy Chains",
          desc: "Route requests through multiple jagged proxies. Your connection is obfuscated, ensuring maximum security and anonymity even in hostile network environments.",
          img: PRESENTATION_IMAGES.dark.proxy
        }
      ]
    }
  },
  ru: {
    chooseSide: "Выберите сторону",
    zenTitle: "Светлая Сторона",
    zenBtn: "Выбрать Свет",
    hackerTitle: "Темная Сторона",
    hackerBtn: "Войти в тень",
    heroWhiteTitle: "Браузер, который\nдумает вместе с вами",
    heroWhiteDesc: "Испытайте интерфейс без лишнего шума. Организуйте свою жизнь с помощью Пространств.",
    heroBlackTitle: "БРАУЗИНГ БЕЗ СЛЕДОВ\nПОЛНАЯ ТИШИНА",
    heroBlackDesc: "Продвинутое шифрование. Архитектура нулевого разглашения. Браузер для тех, кто ценит истинную невидимость.",
    ctaWhite: "Скачать Бету",
    ctaBlack: "АКТИВИРОВАТЬ_ФАНТОМ",
    features: {
      light: [
        {
          title: "Идеальный UI/UX",
          desc: "Невесомый интерфейс с эффектом стекла. Мы убрали визуальный шум, чтобы вы фокусировались на главном. Безопасность через ясность — никаких скрытых кнопок и ловушек.",
          img: PRESENTATION_IMAGES.light.ui
        },
        {
          title: "Локальный Перевод",
          desc: "Мгновенный AI-перевод страниц с сохранением верстки. Все данные обрабатываются в изолированных контейнерах — полная безопасность вашего контента.",
          img: PRESENTATION_IMAGES.light.translation
        },
        {
          title: "Глубокая Настройка",
          desc: "Полный контроль над браузером. Расширенные настройки приватности и тем. Каждая настройка изолирована для предотвращения утечек данных и сбоев.",
          img: PRESENTATION_IMAGES.light.settings
        }
      ],
      dark: [
        {
          title: "Mullvad и Tor Внутри",
          desc: "Прямой туннель в сеть Tor и узлы Mullvad. Никаких плагинов. Ваша безопасность гарантирована тремя слоями шифрования. IP-адрес скрыт надежнее, чем когда-либо.",
          img: PRESENTATION_IMAGES.dark.tor
        },
        {
          title: "Тасовка User-Agent",
          desc: "Хамелеон-режим: браузер меняет цифровой отпечаток каждые 60 секунд. Сайты видят разные устройства, обеспечивая абсолютную защиту от трекинга.",
          img: PRESENTATION_IMAGES.dark.spoof
        },
        {
          title: "Цепочки Прокси",
          desc: "Каскадное перенаправление трафика через рандомные узлы. Ваш след в сети размывается до неузнаваемости. Максимальная безопасность даже в открытых Wi-Fi сетях.",
          img: PRESENTATION_IMAGES.dark.proxy
        }
      ]
    }
  }
};

// --- BROWSER APP COMPONENTS ---
const INITIAL_SPACES: Space[] = [
  {
    id: 'space-1', name: 'Productivity', icon: 'LayoutGrid',
    tabs: [
      { id: 't1', title: 'Dashboard', url: 'poowser://dashboard', category: 'work', content: 'SYSTEM OPTIMAL' },
      { id: 't2', title: 'Mail', url: 'poowser://mail', category: 'work', content: 'Inbox Zero' },
    ]
  },
  {
    id: 'space-2', name: 'Dev', icon: 'Code',
    tabs: [
      { id: 't3', title: 'Localhost:3000', url: 'http://localhost:3000', category: 'dev', content: 'Compiling...' },
    ]
  }
];

const BrowserApp = ({ theme, onBack, lang, dashboardImage }: { theme: Theme, onBack: () => void, lang: 'en'|'ru', dashboardImage?: string }) => {
  const [spaces] = useState<Space[]>(INITIAL_SPACES);
  const [activeSpaceId, setActiveSpaceId] = useState(INITIAL_SPACES[0].id);
  const [activeTabId, setActiveTabId] = useState(INITIAL_SPACES[0].tabs[0].id);
  const [stats, setStats] = useState({ cpu: 12, ram: 45, network: 120 });
  const activeSpace = spaces.find(s => s.id === activeSpaceId)!;
  const activeTab = activeSpace.tabs.find(t => t.id === activeTabId) || activeSpace.tabs[0];

  useEffect(() => {
    const i = setInterval(() => {
       setStats(s => ({
         cpu: Math.min(100, Math.max(0, s.cpu + (Math.random() - 0.5) * 10)),
         ram: s.ram,
         network: Math.max(0, s.network + (Math.random() - 0.5) * 50)
       }));
    }, 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className={`app-container ${theme === 'white' ? 'theme-white' : 'theme-black'}`} style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', overflow: 'hidden' }}>
      <div className="grid-bg"></div>
      <div className="scanline"></div>
      
      {/* Sidebar */}
      <nav className="panel" style={{ width: '80px', margin: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 50, padding: '1rem 0', backdropFilter: 'blur(20px)' }}>
         <div style={{ marginBottom: '2rem', transition: 'transform 0.2s' }} onClick={onBack} className="cursor-pointer hover:scale-110">
           <div style={{width: 24, height: 24, background: 'var(--accent)', borderRadius: '50%'}}></div>
         </div>
         {spaces.map(s => (
           <button key={s.id} onClick={() => setActiveSpaceId(s.id)} className="btn-ghost" style={{ marginBottom: '1rem', padding: '12px', color: activeSpaceId === s.id ? 'var(--accent)' : 'inherit' }}>
             {s.id === 'space-1' ? <Icons.LayoutGrid /> : <Icons.Code />}
           </button>
         ))}
      </nav>

      {/* Main */}
      <main style={{ flex: 1, padding: '1rem 1rem 1rem 0', display: 'flex', flexDirection: 'column' }}>
        <div className="panel" style={{ padding: '0.8rem 1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Icons.Search size={16} style={{opacity: 0.5}} />
          <div style={{ flex: 1, opacity: 0.8, fontFamily: theme === 'black' ? 'monospace' : 'inherit' }}>{activeTab.url}</div>
          <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>CPU: {Math.round(stats.cpu)}%</div>
        </div>
        <div className="panel" style={{ flex: 1, padding: 0, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
           {activeTab.id === 't1' && dashboardImage ? (
             <img src={dashboardImage} alt="Dashboard" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
           ) : (
             <>
                <div style={{ padding: '3rem' }}>
                   <h1 style={{fontSize: '3rem', fontWeight: 800, marginBottom: '1rem'}}>{activeTab.title}</h1>
                   <p style={{fontSize: '1.2rem', opacity: 0.7, maxWidth: '600px', lineHeight: 1.6}}>
                     {lang === 'en' ? `Running Poowser ${theme === 'white' ? 'Zen' : 'Phantom'} Protocol.` : `Запущен протокол Poowser ${theme === 'white' ? 'Свет' : 'Фантом'}.`}
                   </p>
                </div>
             </>
           )}
        </div>
      </main>
    </div>
  );
};

// --- LANDING PAGE COMPONENTS ---

const FeatureRow = ({ title, desc, img, index }: { title: string, desc: string, img: string, index: number }) => (
  <div className="feature-row" style={{ flexDirection: index % 2 === 0 ? 'row' : 'row-reverse' }}>
    <div className="feature-text">
      <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.2 }}>{title}</h3>
      <p style={{ opacity: 0.8, lineHeight: 1.7, fontSize: '1.1rem' }}>{desc}</p>
    </div>
    <div className="feature-image-container">
      <img src={img} alt={title} className="feature-image" />
    </div>
  </div>
);

const GlassToggle = ({ lang, setLang }: { lang: 'en' | 'ru', setLang: (l: 'en' | 'ru') => void }) => {
  const isRu = lang === 'ru';
  return (
    <div className="glass-toggle-container">
      <div 
        className="glass-toggle-slider" 
        style={{ 
          width: 'calc(50% - 6px)', 
          transform: isRu ? 'translateX(100%)' : 'translateX(0%)'
        }} 
      />
      <button 
        className={`glass-toggle-btn ${!isRu ? 'active' : ''}`} 
        onClick={(e) => { e.stopPropagation(); setLang('en'); }}
        style={{ width: '50px' }}
      >
        EN
      </button>
      <button 
        className={`glass-toggle-btn ${isRu ? 'active' : ''}`} 
        onClick={(e) => { e.stopPropagation(); setLang('ru'); }}
        style={{ width: '50px' }}
      >
        RU
      </button>
    </div>
  );
};

// --- BACKGROUNDS ---

const MemeBackground = () => {
  // Constrain random items to the left side strictly
  const items = [
    { type: 'text', content: "🤌 🤌 🤌", top: '10%', left: '5%', rot: -15, scale: 1.5 },
    { type: 'text', content: "умный человек скачать", top: '20%', left: '20%', rot: 5, scale: 0.8 }, 
    { type: 'icon', Component: Icons.SoyjakPointing, top: '50%', left: '10%', rot: 20, scale: 1.5 },
    { type: 'text', content: "MAMA MIA", top: '70%', left: '15%', rot: -5, scale: 1.4 }, 
    { type: 'icon', Component: Icons.SoyjakShocked, top: '15%', left: '15%', rot: 10, scale: 1.2 }, 
    { type: 'text', content: "brainrot_levels: CRITICAL", top: '80%', left: '5%', rot: -25, scale: 0.9 },
    { type: 'text', content: "SKIBIDI??", top: '60%', left: '2%', rot: 5, scale: 1.2 },
    { type: 'text', content: "Literally Me", top: '40%', left: '25%', rot: 15, scale: 1.1 }, 
    { type: 'icon', Component: Icons.SoyjakPointing, top: '30%', left: '28%', rot: -10, scale: 1.3, flip: true }, 
    { type: 'text', content: "download_ram.exe", top: '30%', left: '5%', rot: 5, scale: 0.8 },
    { type: 'text', content: "🤡", top: '5%', left: '25%', rot: 30, scale: 2 }, 
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {items.map((item, i) => (
        <div key={i} className="meme-item" style={{
          top: item.top,
          left: item.left,
          // Limit max left to ensure they don't leak into the dark side visually when clipped
          maxWidth: '300px',
          transform: `rotate(${item.rot}deg) scale(${item.scale}) ${item.flip ? 'scaleX(-1)' : ''}`,
          background: item.type === 'icon' ? 'transparent' : undefined,
          border: item.type === 'icon' ? 'none' : undefined,
        }}>
          {item.type === 'text' ? item.content : <item.Component size={80} color="#111827" />}
        </div>
      ))}
    </div>
  );
};

const FullCodeBackground = () => {
  const [lines, setLines] = useState<string[]>([]);
  
  useEffect(() => {
    const fullPageContent = [];
    for(let i=0; i<40; i++) {
      fullPageContent.push(...CODE_SNIPPETS);
    }
    setLines(fullPageContent);
  }, []);

  return (
    <div style={{ 
      position: 'absolute', 
      inset: 0, 
      overflow: 'hidden', 
      pointerEvents: 'none', 
      zIndex: 0,
      opacity: 0.15,
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      alignContent: 'flex-start',
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: '12px',
      color: '#7c3aed',
      lineHeight: '1.2',
      padding: '20px'
    }}>
      {lines.map((line, i) => (
         <span key={i} style={{ marginRight: '40px', whiteSpace: 'nowrap' }}>{line}</span>
      ))}
    </div>
  );
};

const QuoteDisplay = ({ quote }: { quote: string }) => {
  return (
    <div className="fade-text" style={{ fontStyle: 'italic', opacity: 0.7, marginTop: '1rem', minHeight: '1.5em' }}>
      "{quote}"
    </div>
  );
};

const TiltContainer = ({ children }: { children: React.ReactNode }) => {
  const [transform, setTransform] = useState('');
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    
    // RotateX is based on Y position (tilt up/down)
    // RotateY is based on X position (tilt left/right)
    setTransform(`perspective(1000px) rotateX(${y * -10}deg) rotateY(${x * 10}deg) scale(1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');
  };

  return (
    <div 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
      style={{ 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        transition: 'transform 0.1s ease-out' 
      }}
    >
      <div style={{ 
        width: '100%', 
        height: '100%', 
        transform: transform || 'perspective(1000px) rotateX(4deg)', // Default slight tilt
        transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }}>
        {children}
      </div>
    </div>
  );
};

const LandingPage = () => {
  const [viewState, setViewState] = useState<'intro' | 'landing' | 'app'>('intro');
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [hoveredSide, setHoveredSide] = useState<Theme | null>(null);
  const [lang, setLang] = useState<'en' | 'ru'>('ru'); 
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  // REPLACE THIS URL WITH YOUR CUSTOM DASHBOARD IMAGE (Real Dashboard Image)
  const YOUR_DASHBOARD_IMAGE_HERE = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80";

  const t = TEXT[lang];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex(prev => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSelect = (theme: Theme) => {
    setSelectedTheme(theme);
    setViewState('landing');
  };
  
  const handleDownload = () => {
    window.location.href = "https://github.com/bgdntr/Poowser-White";
  };

  const whiteQuote = QUOTE_SETS.white[currentQuoteIndex % QUOTE_SETS.white.length];
  const blackQuote = QUOTE_SETS.black[currentQuoteIndex % QUOTE_SETS.black.length];

  if (viewState === 'app' && selectedTheme) {
    return <BrowserApp theme={selectedTheme} onBack={() => setViewState('landing')} lang={lang} dashboardImage={YOUR_DASHBOARD_IMAGE_HERE} />;
  }

  // --- INTRO SCREEN (DIAGONAL SPLIT) ---
  if (viewState === 'intro') {
    const isHoverWhite = hoveredSide === 'white';
    const isHoverBlack = hoveredSide === 'black';

    return (
      <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', background: '#000' }}>
        <style>{globalStyles}</style>
        
        {/* Language Toggle Overlay */}
        <div style={{ position: 'absolute', top: '30px', left: '50%', transform: 'translateX(-50%)', zIndex: 999 }}>
          <GlassToggle lang={lang} setLang={setLang} />
        </div>

        {/* Text Prompt */}
         <div style={{ position: 'absolute', top: '100px', left: '50%', transform: 'translateX(-50%)', zIndex: 999, color: '#fff', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '0.8rem', opacity: 0.6, fontWeight: 500, pointerEvents: 'none', mixBlendMode: 'difference' }}>
          {t.chooseSide}
        </div>

        {/* --- LAYER 1: BLACK (BOTTOM/RIGHT) --- */}
        <div 
          className="split-layer theme-black"
          onMouseEnter={() => setHoveredSide('black')}
          onClick={() => handleSelect('black')}
          style={{ 
            display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', 
            paddingRight: '12vw', 
            cursor: 'pointer',
            overflow: 'hidden'
          }}
        >
          <div className="grid-bg"></div>
          <FullCodeBackground />
          
          {/* Content Container */}
          <div style={{ 
            textAlign: 'right', 
            maxWidth: '30vw',
            opacity: isHoverWhite ? 0 : 1, 
            transform: isHoverWhite ? 'translateX(150px) scale(0.95)' : 'translateX(0) scale(1)',
            pointerEvents: isHoverWhite ? 'none' : 'auto',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)', 
            zIndex: 10,
            background: 'rgba(0,0,0,0.4)',
            padding: '2rem',
            borderRadius: '24px',
            backdropFilter: 'blur(5px)'
          }}>
            <div style={{ marginBottom: '2.5rem', padding: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: '24px', display: 'inline-flex', boxShadow: '0 0 40px rgba(124, 58, 237, 0.2)' }}>
              <Icons.Ghost size={64} color="#7c3aed" />
            </div>
            <h1 style={{ fontSize: '4rem', fontWeight: 700, marginBottom: '0.8rem', color: '#fff' }}>
              {t.hackerTitle}
            </h1>
            <p style={{ color: '#a5b4fc', marginBottom: '2rem', fontSize: '1.2rem' }}>
               {lang === 'ru' ? 'Слежка отключена. Шифрование активно.' : 'Tracking disabled. Encryption active.'}
            </p>
            <QuoteDisplay key={blackQuote} quote={blackQuote} />
             <div className="btn btn-primary" style={{ marginTop: '2rem' }}>
              {t.hackerBtn}
            </div>
          </div>
        </div>

        {/* --- LAYER 2: WHITE (TOP/LEFT, CLIPPED) --- */}
        <div 
          className="split-layer theme-white"
          onMouseEnter={() => setHoveredSide('white')}
          onClick={() => handleSelect('white')}
          style={{ 
            // SMOOTH TRANSITIONS: Increased duration and smoother easing
            transition: 'clip-path 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
            clipPath: isHoverWhite
              ? 'polygon(0 0, 80% 0, 60% 100%, 0% 100%)' // Expand
              : isHoverBlack
                ? 'polygon(0 0, 30% 0, 15% 100%, 0% 100%)' // Retreat Hard
                : 'polygon(0 0, 60% 0, 40% 100%, 0% 100%)', // Neutral
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', 
            paddingLeft: '12vw',
            cursor: 'pointer',
            filter: 'none', 
            overflow: 'hidden'
          }}
        >
           <MemeBackground />

           {/* Content Container */}
          <div style={{ 
            textAlign: 'left', 
            maxWidth: '30vw',
            opacity: isHoverBlack ? 0 : 1, 
            transform: isHoverBlack ? 'translateX(-150px) scale(0.95)' : 'translateX(0) scale(1)',
            pointerEvents: isHoverBlack ? 'none' : 'auto',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            zIndex: 10,
            background: 'rgba(255,255,255,0.4)',
            padding: '2rem',
            borderRadius: '24px',
            backdropFilter: 'blur(5px)'
          }}>
            <div style={{ marginBottom: '2.5rem', padding: '24px', background: '#fff', borderRadius: '50%', boxShadow: '0 20px 60px -10px rgba(59,130,246,0.3)', display: 'inline-flex' }}>
              <Icons.Sparkles size={64} color="#2563eb" />
            </div>
            <h1 style={{ fontSize: '4rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.8rem', color: '#111827' }}>
              {t.zenTitle}
            </h1>
            <p style={{ color: '#4b5563', marginBottom: '2rem', fontSize: '1.2rem' }}>
               {lang === 'ru' ? 'Высокая культура потребления контента.' : 'High culture content consumption.'}
            </p>
             <QuoteDisplay key={whiteQuote} quote={whiteQuote} />
            <div className="btn btn-primary" style={{ marginTop: '2rem' }}>
              {t.zenBtn}
            </div>
          </div>
        </div>

      </div>
    );
  }

  // --- LANDING CONTENT (SCROLLABLE) ---
  const currentFeatures = selectedTheme === 'white' ? t.features.light : t.features.dark;
  
  return (
    <div className={`app-container ${selectedTheme === 'white' ? 'theme-white' : 'theme-black'}`} style={{ position: 'fixed', inset: 0, overflowY: 'auto', overflowX: 'hidden', zIndex: 1 }}>
      <style>{globalStyles}</style>
      <div className="grid-bg"></div>
      <div className="scanline"></div>
      
      {/* Decorative Soyjaks for White Theme Presentation */}
      {selectedTheme === 'white' && (
        <>
          <div className="soyjak-sticker floating" style={{ top: '10%', left: '5%', transform: 'rotate(-15deg)' }}>
             <Icons.SoyjakPointing size={150} color="#111827" />
          </div>
          <div className="soyjak-sticker floating" style={{ top: '15%', right: '10%', transform: 'rotate(10deg) scaleX(-1)', animationDelay: '1s' }}>
             <Icons.SoyjakShocked size={120} color="#111827" />
          </div>
           <div className="soyjak-sticker floating" style={{ top: '40%', left: '2%', transform: 'rotate(5deg)', animationDelay: '2s' }}>
             <Icons.SoyjakShocked size={180} color="#111827" />
          </div>
          <div className="soyjak-sticker floating" style={{ top: '55%', right: '5%', transform: 'rotate(-5deg) scaleX(-1)', animationDelay: '0.5s' }}>
             <Icons.SoyjakPointing size={140} color="#111827" />
          </div>
          <div className="soyjak-sticker floating" style={{ top: '80%', left: '15%', transform: 'rotate(12deg)', animationDelay: '1.5s' }}>
             <Icons.SoyjakPointing size={100} color="#111827" />
          </div>
        </>
      )}

      {/* Hero Section */}
      <header style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center', position: 'relative', zIndex: 10 }}>
        
        <div style={{ position: 'absolute', top: '2rem', left: '2rem', fontWeight: 900, fontSize: '1.5rem', display: 'flex', gap: '10px', alignItems: 'center', zIndex: 100 }}>
          <div style={{width: 20, height: 20, background: 'var(--accent)', borderRadius: '50%'}}></div>
          Poowser.
        </div>
        
        <div style={{ position: 'absolute', top: '2rem', right: '2rem', zIndex: 100 }}>
          <button onClick={() => setViewState('intro')} className="btn btn-ghost" style={{ marginRight: '1rem' }}>
             {lang === 'en' ? 'Back' : 'Назад'}
          </button>
        </div>

        <div className="animate-in" style={{ maxWidth: '800px', zIndex: 10 }}>
          <div style={{ marginBottom: '2rem', display: 'inline-flex', padding: '8px 20px', borderRadius: '100px', background: 'var(--bg-panel)', border: '1px solid var(--border)', fontSize: '0.9rem', fontWeight: 600, backdropFilter: 'blur(10px)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
             {selectedTheme === 'white' ? '✨ Reimagined for Focus & Safety' : '>> SECURE PROTOCOL INITIATED'}
          </div>
          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '2rem', whiteSpace: 'pre-line' }}>
            {selectedTheme === 'white' ? t.heroWhiteTitle : t.heroBlackTitle}
          </h1>
          <p style={{ fontSize: '1.4rem', opacity: 0.8, maxWidth: '650px', margin: '0 auto 3rem auto', lineHeight: 1.6 }}>
             {selectedTheme === 'white' ? t.heroWhiteDesc : t.heroBlackDesc}
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button 
              className="btn btn-primary" 
              style={{ padding: '18px 42px', fontSize: '1.15rem' }}
              onClick={handleDownload}
            >
               {selectedTheme === 'white' ? t.ctaWhite : t.ctaBlack}
            </button>
          </div>
        </div>

        {/* Mock Browser Preview with Interactive Tilt */}
        <div className="animate-in" style={{ marginTop: '5rem', width: '100%', maxWidth: '1000px', height: '550px', animationDelay: '0.2s', zIndex: 5 }}>
          <TiltContainer>
            <div className="panel" style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', boxShadow: selectedTheme === 'white' ? '0 50px 100px -20px rgba(50,50,93,0.3)' : '0 0 60px rgba(124, 58, 237, 0.2)' }}>
               <BrowserApp theme={selectedTheme!} onBack={() => {}} lang={lang} dashboardImage={YOUR_DASHBOARD_IMAGE_HERE} />
               {/* Cover transparent overlay to capture mouse events on container for tilt but prevent clicks inside */}
               <div style={{ position: 'absolute', inset: 0, zIndex: 100, cursor: 'default' }}></div>
            </div>
          </TiltContainer>
        </div>
      </header>

      {/* Features Section (Zig Zag) */}
      <section style={{ padding: '8rem 2rem', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {currentFeatures.map((f, i) => (
          <FeatureRow 
            key={i}
            index={i}
            title={f.title} 
            desc={f.desc} 
            img={f.img}
          />
        ))}
      </section>

      {/* Footer */}
      <footer style={{ padding: '4rem 2rem', textAlign: 'center', opacity: 0.5, borderTop: '1px solid var(--border)' }}>
        <p>Poowser Browser &copy; 2025-2026. Security First.</p>
      </footer>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<LandingPage />);
