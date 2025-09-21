import Image from "next/image";
import { robotoSlab } from "@/vendor/fonts";

interface NewsItemProps {
  title: string;
  description: string;
  date: string;
  image: string;
  reporter: string;
  url: string;
}

export default function NewsItem(props: NewsItemProps) {
  const { title, description, date, image, reporter, url } = props;

  const handleCardClick = () => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div 
      className="news-item flex flex-col rounded-[15px] h-[576px] w-full max-w-[400px] cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      aria-label={`Leer artículo: ${title}`}
    >
      <div className="news-item__image">
        <Image
          src={image}
          alt={`Imagen de "${title}"`}
          fill={true}
          className="object-cover"
        />
        <button
          className="news-item__button flex relative group"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Bookmark functionality will go here
            console.log("Bookmark clicked for:", title);
          }}
        >
          <Image
            src="/bookmark.svg"
            alt="Bookmark icon"
            width={20}
            height={20}
            className="news-item__button-icon"
          />
          <span className="news-item__tooltip font-medium opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-200 pointer-events-none">
            Guardar artículo
          </span>
        </button>
      </div>
      <div className="news-item__info grid p-[24px] h-[304px]">
        <span className="news-item__date">{date}</span>
        <h4 className={`news-item__title ${robotoSlab.className}`}>{title}</h4>
        <p className="news-item__description">{description}</p>
        <span
          className={`news-item__reporter ${robotoSlab.className} font-bold`}
        >
          {reporter?.toLocaleUpperCase() || "AUTOR DESCONOCIDO"}
        </span>
      </div>
    </div>
  );
}
