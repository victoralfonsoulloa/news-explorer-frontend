"use client";

import NotFound from "@/components/NotFound";
import Preloader from "@/components/PreLoader";
import Header from "@/components/Header";
import "../styles/globals.css";
import Footer from "@/components/Footer";

export default function Main() {
  return (
    <>
      <Header />
      <main>
      {/* <Preloader />
      <div className="h-[374px]">
        <NotFound
          title="No se encontró nada"
          description="Lo sentimos, pero no hay nada que coincida con tus términos de búsqueda."
        />
      </div> */}
      </main>
      {/* <Footer /> */}
    </>
  );
}

