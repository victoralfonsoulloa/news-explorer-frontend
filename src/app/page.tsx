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
  url: string;
}

export default function Main() {
  const [allNews, setAllNews] = useState<NewsItemData[]>([]);
  const [displayedNews, setDisplayedNews] = useState<NewsItemData[]>([]);
  const [search, setSearch] = useState(false);
  const [loader, setLoader] = useState(false);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // Function to determine items per page based on screen size
  const getItemsPerPage = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      // 2 columns (md): show 4 items (2 rows × 2 columns)
      if (width >= 768 && width < 1024) {
        return 4;
      }
      // 3+ columns (lg+): show 3 items (1 row × 3 columns)
      return 3;
    }
    return 3;
  };

  const loadMoreNews = () => {
    const nextPage = currentPage + 1;
    const startIndex = 0;
    const endIndex = nextPage * itemsPerPage;
    
    setDisplayedNews(allNews.slice(startIndex, endIndex));
    setCurrentPage(nextPage);
  };

  // Handle window resize to adjust items per page
  useEffect(() => {
    const handleResize = () => {
      const newItemsPerPage = getItemsPerPage();
      if (newItemsPerPage !== itemsPerPage) {
        setItemsPerPage(newItemsPerPage);
        // Re-calculate displayed news with new items per page
        const newEndIndex = currentPage * newItemsPerPage;
        setDisplayedNews(allNews.slice(0, newEndIndex));
      }
    };

    // Set initial items per page
    const initialItemsPerPage = getItemsPerPage();
    setItemsPerPage(initialItemsPerPage);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [itemsPerPage, currentPage, allNews]);

  const resetPagination = () => {
    const newItemsPerPage = getItemsPerPage();
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    setDisplayedNews(allNews.slice(0, newItemsPerPage));
  };

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
          reporter: article.author || article.source?.name || "Autor desconocido",
          url: article.url || "" // Add the article URL
        }));
        setAllNews(transformedNews);
        const currentItemsPerPage = getItemsPerPage();
        setItemsPerPage(currentItemsPerPage);
        setDisplayedNews(transformedNews.slice(0, currentItemsPerPage));
        setCurrentPage(1);
      })
      .catch((err) => {
        console.error("Error fetching initial news:", err);
        setAllNews([]);
        setDisplayedNews([]);
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
            reporter: article.author || article.source?.name || "Autor desconocido",
            url: article.url || "" // Add the article URL
          }));
          setAllNews(transformedNews);
          const currentItemsPerPage = getItemsPerPage();
          setItemsPerPage(currentItemsPerPage);
          setDisplayedNews(transformedNews.slice(0, currentItemsPerPage));
          setCurrentPage(1);
        })
        .catch((err) => {
          console.error("Error searching news:", err);
          setAllNews([]);
          setDisplayedNews([]);
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
            {displayedNews.length > 0 ? (
              <News title="Resultados de la búsqueda" news={displayedNews} loader={loader}>
                {displayedNews.length < allNews.length && (
                  <button 
                    className="news-cards__button rounded-full w-[288px] h-[64px] mt-[65px] mb-[15px] font-medium"
                    onClick={loadMoreNews}
                  >
                    Ver más
                  </button>
                )}
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