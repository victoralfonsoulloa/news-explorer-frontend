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
      <Image
        src={image}
        alt={`Imagen de "${title}"`}
        width={400}
        height={272}
        className="news-item__image"
      />
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
