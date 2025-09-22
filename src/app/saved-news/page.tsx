"use client";

import NewsHeader from "@/components/NewsHeader";
import News from "@/components/News";
import NotFound from "@/components/NotFound";
import { useContext } from "react";
import { SavedArticlesContext } from "@/contexts/SavedArticlesContext";

export default function SavedNews() {
  const { savedNews } = useContext(SavedArticlesContext)!;
  const loader = false;

  return (
    <>
      <NewsHeader newsCount={savedNews.length} savedArticles={savedNews} />
      <main className="flex flex-col">
        {savedNews.length > 0 ? (
          <News news={savedNews} loader={loader} />
        ) : (
          <div className="h-[374px]">
            <NotFound
              title="Ningún artículo guardado"
              description="No tienes artículos guardados por el momento."
            />
          </div>
        )}
      </main>
    </>
  );
}
