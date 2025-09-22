import "@/styles/news.css";
import { robotoSlab } from "@/vendor/fonts";
import Navigation from "./Navigation";
import { SavedArticle } from "@/contexts/SavedArticlesContext";

interface NewsHeaderProps {
  newsCount: number;
  savedArticles?: SavedArticle[];
}

export default function NewsHeader({
  newsCount,
  savedArticles,
}: NewsHeaderProps) {
  // Extract unique keywords from saved articles
  const getKeywordsText = () => {
    if (!savedArticles || savedArticles.length === 0) {
      return "No hay palabras clave disponibles.";
    }

    // Get unique keywords, filter out empty/undefined ones
    const uniqueKeywords = [
      ...new Set(
        savedArticles
          .map((article) => article.keyword)
          .filter((keyword) => keyword && keyword.trim() !== "")
      ),
    ];

    if (uniqueKeywords.length === 0) {
      return "No hay palabras clave disponibles.";
    }

    if (uniqueKeywords.length === 1) {
      return `${uniqueKeywords[0]}.`;
    } else if (uniqueKeywords.length === 2) {
      return `${uniqueKeywords.join(", ")}.`;
    } else {
      // Always show first 2 keywords and count of remaining
      const remaining = uniqueKeywords.length - 2;
      return `${uniqueKeywords.slice(0, 2).join(", ")}, y ${remaining} más.`;
    }
  };

  return (
    <header className="news flex flex-col pt-[80px] px-[104px]">
      <Navigation />
      <div className="news__main flex flex-col w-[530px]">
        <span className="news__subtitle">Artículos guardados</span>
        <h2 className={`news__title ${robotoSlab.className}`}>
          Victor,{" "}
          {newsCount
            ? `tienes ${newsCount} artículo(s) guardado(s).`
            : "no tienes ningún artículo guardado."}
        </h2>
        {newsCount > 0 && (
          <p className="news__text">
            Por palabra(s) clave(s):{" "}
            <span className="font-bold">{getKeywordsText()}</span>
          </p>
        )}
      </div>
    </header>
  );
}
