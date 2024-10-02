export interface Category {
  id: string;
  name: string;
}

export interface Language {
  code: string;
  name: string;
}

export interface TranslationData {
  original: string;
  translated: string;
  srcLang: string;
  destLang: string;
}

export interface NotificationProps {
  addNotification: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void;
}