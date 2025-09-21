"use client";

import "@/styles/news.css";
import { robotoSlab } from "@/vendor/fonts";
import { ReactNode, useState } from "react";
import Preloader from "@/components/PreLoader";

interface NewsProps {
  title?: string;
  children?: ReactNode;
}

export default function News(props: NewsProps) {
  const { title, children } = props;
  const [loader] = useState(true);

  return (
    <section className="news-cards flex flex-col px-[104px] py-[65px]">
      <h3
        className={`news-cards__title ${robotoSlab.className} mt-[15px] mb-[65px]`}
      >
        {title}
      </h3>
      {loader && <Preloader />}
      {children}
    </section>
  );
}
