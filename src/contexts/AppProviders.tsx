"use client";

import { ReactNode } from "react";
import CurrentUserProvider from "./CurrentUserProvider";
import SavedArticlesProvider from "./SavedArticlesProvider";
import { CurrentUserContext } from "./CurrentUserContext";
import { useContext } from "react";

interface AppProvidersProps {
  children: ReactNode;
}

function SavedArticlesWrapper({ children }: { children: ReactNode }) {
  const { logged } = useContext(CurrentUserContext);
  const userId = logged ? "test-user-123" : undefined; // Test user ID
  
  return (
    <SavedArticlesProvider userId={userId}>
      {children}
    </SavedArticlesProvider>
  );
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <CurrentUserProvider>
      <SavedArticlesWrapper>
        {children}
      </SavedArticlesWrapper>
    </CurrentUserProvider>
  );
}
