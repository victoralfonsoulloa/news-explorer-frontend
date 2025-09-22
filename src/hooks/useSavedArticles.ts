import { useContext } from "react";
import {
  SavedArticlesContext,
  SavedArticlesContextType,
} from "@/contexts/SavedArticlesContext";

export default function useSavedArticles(): SavedArticlesContextType {
  const context = useContext(SavedArticlesContext);
  if (!context) {
    throw new Error(
      "useSavedArticles must be used within a SavedArticlesProvider"
    );
  }
  return context;
}
