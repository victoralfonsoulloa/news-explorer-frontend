"use client";

import Header from "@/components/Header";
import News from "@/components/News";
import NotFound from "@/components/NotFound";
import About from "@/components/About";
import Preloader from "@/components/PreLoader";
import { newsApi } from "@/utils/NewsApi";
import { useEffect, useState } from "react";

interface NewsItemData {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  reporter: string;
}

export default function Main() {
  const [news, setNews] = useState<NewsItemData[]>([]);
  const [search, setSearch] = useState(false);
  const [loader, setLoader] = useState(false);
  const [query, setQuery] = useState("");

  // Fetch initial news on component mount
  useEffect(() => {
    console.log("Fetching initial news...");
    setLoader(true);
    newsApi
      .searchNews("tecnología") // Default search term
      .then((res: any) => {
        console.log("API Response:", res);
        const articles = res.articles || [];
        // Transform API data to match our interface
        const transformedNews = articles.map((article: any, index: number) => ({
          id: index + 1, // Generate unique ID
          title: article.title || "Sin título",
          description: article.description || "Sin descripción",
          date: new Date(article.publishedAt).toLocaleDateString('es-ES') || new Date().toLocaleDateString('es-ES'),
          image: article.urlToImage || "/news_01.png", // Fallback image
          reporter: article.author || article.source?.name || "Autor desconocido"
        }));
        setNews(transformedNews);
      })
      .catch((err) => {
        console.error("Error fetching initial news:", err);
        setNews([]);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  // Fetch news when search is triggered
  useEffect(() => {
    if (search && query.trim()) {
      console.log("Searching for:", query);
      setLoader(true);
      newsApi
        .searchNews(query)
        .then((res: any) => {
          console.log("Search Response:", res);
          const articles = res.articles || [];
          // Transform API data to match our interface
          const transformedNews = articles.map((article: any, index: number) => ({
            id: index + 1, // Generate unique ID
            title: article.title || "Sin título",
            description: article.description || "Sin descripción",
            date: new Date(article.publishedAt).toLocaleDateString('es-ES') || new Date().toLocaleDateString('es-ES'),
            image: article.urlToImage || "/news_01.png", // Fallback image
            reporter: article.author || article.source?.name || "Autor desconocido"
          }));
          setNews(transformedNews);
        })
        .catch((err) => {
          console.error("Error searching news:", err);
          setNews([]);
        })
        .finally(() => {
          setLoader(false);
          setSearch(false);
        });
    }
  }, [search, query]);

  return (
    <>
      <Header setSearch={setSearch} query={query} setQuery={setQuery} />
      <main className="flex flex-col">
        {loader ? (
          <div className="w-full h-[282px]">
            <Preloader />
          </div>
        ) : (
          <>
            {news.length > 0 ? (
              <News title="Resultados de la búsqueda" news={news} loader={loader}>
                <button className="news-cards__button rounded-full w-[288px] h-[64px] mt-[65px] mb-[15px] font-medium">
                  Ver más
                </button>
              </News>
            ) : (
              <div className="h-[374px]">
                <NotFound
                  title="No se encontró nada"
                  description="Lo sentimos, pero no hay nada que coincida con tus términos de búsqueda."
                />
              </div>
            )}
          </>
        )}

        <About />
      </main>
    </>
  );
}