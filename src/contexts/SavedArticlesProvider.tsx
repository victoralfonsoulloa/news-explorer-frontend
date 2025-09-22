"use client";

import { ReactNode, useState, useEffect, useCallback } from "react";
import {
  SavedArticlesContext,
  SavedArticle,
  SavedArticlesContextType,
} from "./SavedArticlesContext";

interface SavedArticlesProviderProps {
  children: ReactNode;
  userId?: string; // Pass userId as prop instead of using context
}

export default function SavedArticlesProvider({
  children,
  userId,
}: SavedArticlesProviderProps) {
  const [savedNews, setSavedNews] = useState<SavedArticle[]>([]);

  // Get user-specific localStorage key
  const getUserStorageKey = useCallback(() => {
    return userId ? `savedArticles_${userId}` : null;
  }, [userId]);

  // Load saved articles from localStorage on mount or when user changes
  useEffect(() => {
    const storageKey = getUserStorageKey();
    if (storageKey) {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        try {
          setSavedNews(JSON.parse(saved));
        } catch (error) {
          console.error("Error loading saved articles:", error);
        }
      }
    } else {
      // User not logged in, clear saved news
      setSavedNews([]);
    }
  }, [userId, getUserStorageKey]);

  // Save to localStorage whenever savedNews changes
  useEffect(() => {
    const storageKey = getUserStorageKey();
    if (storageKey && userId) {
      localStorage.setItem(storageKey, JSON.stringify(savedNews));
    }
  }, [savedNews, userId, getUserStorageKey]);

  const setNewsLength = (length: number) => {
    // This will be useful when backend is ready for updating UI counters
    console.log("News length updated:", length);
  };

  const saveArticle = async (article: SavedArticle): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate API delay
        try {
          // Generate a temporary _id for localStorage simulation
          const articleWithId = {
            ...article,
            _id: `temp_${Date.now()}_${Math.random()}`,
            keyword: article.keyword || "tecnología", // Ensure keyword is saved
          };

          setSavedNews((prev) => {
            // Don't add if already saved (check by URL since we don't have real IDs)
            if (prev.some((saved) => saved.url === article.url)) {
              return prev;
            }
            return [articleWithId, ...prev];
          });

          resolve();
        } catch (error) {
          reject(error);
        }
      }, 300);
    });
  };

  const removeArticle = async (articleId: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate API delay
        try {
          setSavedNews((prev) =>
            prev.filter((article) => article._id !== articleId)
          );
          resolve();
        } catch (error) {
          reject(error);
        }
      }, 300);
    });
  };

  const contextValue: SavedArticlesContextType = {
    savedNews,
    setSavedNews,
    setNewsLength,
    saveArticle,
    removeArticle,
  };

  return (
    <SavedArticlesContext.Provider value={contextValue}>
      {children}
    </SavedArticlesContext.Provider>
  );
}
