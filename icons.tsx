
import React, { SVGProps } from 'react';

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
}

export const LayoutGrid = ({ size = 24, color, ...props }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
);

export const Compass = ({ size = 24, color, ...props }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
);

export const Code = ({ size = 24, color, ...props }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
);

export const Layers = ({ size = 24, color, ...props }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>
);

export const Search = ({ size = 24, color, ...props }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);

export const Sparkles = ({ size = 24, color, ...props }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z"/></svg>
);

export const Activity = ({ size = 24, color, ...props }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
);

export const Cpu = ({ size = 24, color, ...props }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>
);

export const Shield = ({ size = 24, color, ...props }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
);

export const Ghost = ({ size = 24, color, ...props }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 10h.01"/><path d="M15 10h.01"/><path d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/></svg>
);

export const Send = ({ size = 24, color, ...props }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
);

export const Plus = ({ size = 24, color, ...props }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14"/><path d="M12 5v14"/></svg>
);

export const X = ({ size = 24, color, ...props }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);

export const Play = ({ size = 24, color, ...props }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={color || "currentColor"} stroke="none" {...props}><polygon points="5 3 19 12 5 21 5 3"/></svg>
);

export const Pause = ({ size = 24, color, ...props }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={color || "currentColor"} stroke="none" {...props}><rect width="4" height="16" x="6" y="4" rx="1"/><rect width="4" height="16" x="14" y="4" rx="1"/></svg>
);

export const Command = ({ size = 24, color, ...props }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
);

export const Bot = ({ size = 24, color, ...props }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
);

// --- SOYJAKS ---
export const SoyjakPointing = ({ size = 64, color, ...props }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 200 200" fill="none" {...props}>
    {/* Body/Shoulders */}
    <path d="M40 180 Q60 140 100 140 T160 180" stroke={color || "currentColor"} strokeWidth="5" fill="none"/>
    
    {/* Pointing Arm (Left) */}
    <path d="M30 160 Q10 120 40 80 L80 90" stroke={color || "currentColor"} strokeWidth="5" fill="none" />
    <path d="M80 90 L110 50" stroke={color || "currentColor"} strokeWidth="5" fill="none" /> 
    
    {/* Head Outline */}
    <path d="M70 140 C50 140 40 100 50 70 C60 30 100 20 130 30 C160 40 170 90 160 120 C150 150 100 150 70 140" stroke={color || "currentColor"} strokeWidth="5" fill="none"/>
    
    {/* Face Features (Wojak Style) */}
    <circle cx="80" cy="80" r="5" fill={color || "currentColor"}/>
    <circle cx="130" cy="80" r="5" fill={color || "currentColor"}/>
    
    {/* Open Mouth (The Soy Face) */}
    <path d="M85 100 Q105 130 125 100 Q105 85 85 100" stroke={color || "currentColor"} strokeWidth="3" fill="none"/>
    
    {/* Stubble */}
    <path d="M75 130 Q105 145 135 130" stroke={color || "currentColor"} strokeWidth="1" strokeDasharray="2 4"/>
  </svg>
);

export const SoyjakShocked = ({ size = 64, color, ...props }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 200 200" fill="none" {...props}>
      {/* Head */}
      <path d="M60 150 C40 150 30 100 40 60 C50 20 110 10 150 20 C190 30 190 100 180 140 C170 170 100 170 60 150" stroke={color || "currentColor"} strokeWidth="5" fill="none"/>
      
      {/* Eyes (Wide) */}
      <circle cx="80" cy="70" r="10" stroke={color || "currentColor"} strokeWidth="3" fill="none"/>
      <circle cx="140" cy="70" r="10" stroke={color || "currentColor"} strokeWidth="3" fill="none"/>
      <circle cx="80" cy="70" r="2" fill={color || "currentColor"}/>
      <circle cx="140" cy="70" r="2" fill={color || "currentColor"}/>

      {/* Mouth (O-Face) */}
      <ellipse cx="110" cy="110" rx="20" ry="25" stroke={color || "currentColor"} strokeWidth="4" fill="none"/>
      
      {/* Hands on cheeks */}
      <path d="M40 130 Q50 110 60 130" stroke={color || "currentColor"} strokeWidth="4"/>
      <path d="M180 130 Q170 110 160 130" stroke={color || "currentColor"} strokeWidth="4"/>
    </svg>
);
