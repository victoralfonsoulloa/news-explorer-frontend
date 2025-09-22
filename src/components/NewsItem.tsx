import Image from "next/image";
import { robotoSlab } from "@/vendor/fonts";
import Link from "next/link";
import { MouseEvent, useContext } from "react";
import { usePathname } from "next/navigation";
import { CurrentUserContext } from "@/contexts/CurrentUserContext";
import {
  SavedArticlesContext,
  SavedArticle,
} from "@/contexts/SavedArticlesContext";

interface NewsItemProps {
  id?: number;
  _id?: string; // For when backend is ready
  keyword?: string; // Search keyword that found this article
  title: string;
  description: string;
  publishedAt?: string; // API format
  date?: string; // Formatted date (fallback)
  urlToImage?: string; // API format
  image?: string; // Fallback
  source: string | { name: string }; // API format
  reporter?: string; // Fallback
  url: string;
}

export default function NewsItem(props: NewsItemProps) {
  const {
    _id,
    keyword,
    title,
    description,
    publishedAt,
    date,
    urlToImage,
    image,
    source,
    reporter,
    url,
  } = props;

  const { logged } = useContext(CurrentUserContext);
  const { setNewsLength, savedNews, setSavedNews, saveArticle, removeArticle } =
    useContext(SavedArticlesContext)!;
  const pathname = usePathname();

  // Handle date formatting
  const displayDate = publishedAt
    ? new Date(Date.parse(publishedAt)).toDateString()
    : date || new Date().toLocaleDateString("es-ES");

  // Handle image URL
  const displayImage = urlToImage || image || "/not-found_icon.png";

  // Handle source/reporter
  const displayReporter =
    reporter ||
    (typeof source === "string" ? source : source.name) ||
    "Autor desconocido";

  const handleSuccessMessage = (news: SavedArticle[]) => {
    setSavedNews(news);
    setNewsLength(news.length);
    // When backend is ready, replace with toast.success(res.message);
    console.log("Article saved/removed successfully");
  };

  const getImageIcon = (article: NewsItemProps) => {
    if (article._id) return "/trash.svg";
    const saved = savedNews.find((news) => news.url === article.url);
    return !article._id && !saved ? "/bookmark.svg" : "/bookmark_saved.svg";
  };

  const handleClick = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (_id) {
      // Remove article
      try {
        await removeArticle(_id);
        const news = savedNews.filter((article) => article._id !== _id);
        handleSuccessMessage(news);
      } catch (err) {
        // When backend is ready, replace with toast.error(err.message);
        console.error("Error removing article:", err);
      }
    } else {
      // Save article
      if (!logged) return;
      try {
        await saveArticle(props);
        // Note: savedNews will be updated by the context provider
        console.log("Article saved successfully");
      } catch (err) {
        // When backend is ready, replace with toast.error(err.message);
        console.error("Error saving article:", err);
      }
    }
  };

  return (
    <Link href={`${url || "#"}`} target="_blank">
      <div className="news-item flex flex-col rounded-[15px] h-[576px] w-full max-w-[400px]">
        <div className="news-item__image">
          {pathname === "/saved-news" && keyword && (
            <div className="news-item__keyword font-bold">{keyword}</div>
          )}
          <Image
            src={displayImage}
            alt={`Imagen de "${title}"`}
            fill={true}
            className="object-cover"
          />
          <button
            className="news-item__button flex relative group"
            onClick={handleClick}
          >
            <Image
              src={getImageIcon(props)}
              alt="Image icon"
              width={20}
              height={20}
              className="news-item__button-icon"
            />
            {(!logged || _id) && (
              <span className="news-item__tooltip font-medium opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-200 pointer-events-none">
                {!logged
                  ? "Inicia sesión para guardar artículos"
                  : "Eliminar noticia"}
              </span>
            )}
          </button>
        </div>
        <div className="news-item__info grid p-[24px] h-[304px]">
          <span className="news-item__date">{displayDate}</span>
          <h4 className={`news-item__title ${robotoSlab.className}`}>
            {title}
          </h4>
          <p className="news-item__description">{description}</p>
          <span
            className={`news-item__reporter ${robotoSlab.className} font-bold`}
          >
            {displayReporter.toLocaleUpperCase()}
          </span>
        </div>
      </div>
    </Link>
  );
}
