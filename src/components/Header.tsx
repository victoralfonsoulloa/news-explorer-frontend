import "@/styles/header.css";
import { robotoSlab } from "@/vendor/fonts";
import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <section className="header flex flex-col h-[576px]">
      <div className="header__main flex flex-col w-[608px]">
        <h1
          className={`header__title mb-[32px] font-normal ${robotoSlab.className}`}
        >
          ¿Qué está pasando en el mundo?
        </h1>
        <p className="header__description mb-[64px] font-normal">
          Encuentra las últimas noticias sobre cualquier tema y guárdalas en tu
          cuenta personal.
        </p>
        <SearchBar />
      </div>
    </section>
  );
}