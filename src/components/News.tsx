"use client";

import "@/styles/news.css";
import { robotoSlab } from "@/vendor/fonts";
import { ReactNode } from "react";
import Preloader from "@/components/PreLoader";
import NewsItem from "./NewsItem";
import { SavedArticle } from "@/contexts/SavedArticlesContext";

interface NewsProps {
  title?: string;
  news?: SavedArticle[];
  children?: ReactNode;
  loader: boolean;
}

export default function News(props: NewsProps) {
  const { title, children, news, loader } = props;

  return (
    <>
      {loader ? (
        <Preloader />
      ) : (
        <section className="news-cards flex flex-col px-[104px] py-[65px] items-center">
          <h3
            className={`news-cards__title ${
              robotoSlab.className
            } mt-[15px] mb-[65px] ${title ? "" : "hidden"}`}
          >
            {title}
          </h3>
          <div className="news-cards__container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center w-full max-w-[1200px]">
            {news && news.map((item, index) => (
              <NewsItem 
                key={item.id || `news-${index}`} 
                {...item} 
              />
            ))}
          </div>

          {children}
        </section>
      )}
    </>
  );
}
