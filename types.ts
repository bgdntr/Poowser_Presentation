
export type Theme = 'white' | 'black';

export interface Tab {
  id: string;
  title: string;
  url: string;
  icon?: string;
  content: string; // Mock content for AI analysis
  category?: 'social' | 'dev' | 'work' | 'general';
}

export interface Space {
  id: string;
  name: string;
  icon: string;
  tabs: Tab[];
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface SystemStats {
  cpu: number;
  ram: number;
  network: number;
}
