"use client";

import "@/styles/news.css";
import { robotoSlab } from "@/vendor/fonts";
import { ReactNode, useState } from "react";
import Preloader from "@/components/PreLoader";
import NewsItem from "./NewsItem";

interface NewsItemData {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  reporter: string;
}

interface NewsProps {
  title?: string;
  news?: NewsItemData[];
  children?: ReactNode;
}

export default function News(props: NewsProps) {
  const { title, children, news } = props;
  const [loader] = useState(false);

  return (
    <section className="news-cards flex flex-col px-[104px] py-[65px]">
      <h3
        className={`news-cards__title ${robotoSlab.className} mt-[15px] mb-[65px]`}
      >
        {title}
      </h3>

      <div className="news-cards__container flex">
        {/* Se pasan los props de cada item con el operador spread (...) */}
        {news && news.map((item) => <NewsItem key={item.id} {...item} />)}
      </div>
      {loader && <Preloader />}
      {children}
    </section>
  );
}
