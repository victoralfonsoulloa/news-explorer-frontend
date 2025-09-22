import { createContext } from 'react';

export interface SavedArticle {
  id?: number;
  _id?: string; // For backend compatibility
  keyword?: string;
  title: string;
  description: string;
  publishedAt?: string;
  date?: string;
  urlToImage?: string;
  image?: string;
  source: string | { name: string };
  reporter?: string;
  url: string;
}

export interface SavedArticlesContextType {
  savedNews: SavedArticle[]; // Match your friend's naming
  setSavedNews: (articles: SavedArticle[]) => void;
  setNewsLength: (length: number) => void;
  saveArticle: (article: SavedArticle) => Promise<void>;
  removeArticle: (articleId: string) => Promise<void>;
}

export const SavedArticlesContext = createContext<SavedArticlesContextType | undefined>(undefined);