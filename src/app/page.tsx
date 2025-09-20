"use client";

import NotFound from "@/components/NotFound";
import Preloader from "@/components/PreLoader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../styles/globals.css";

export default function Main() {
  return (
    <main>
      <Header />
      <Preloader />
      {/* <div className="h-[374px]">
        <NotFound
          title="No se encontró nada"
          description="Lo sentimos, pero no hay nada que coincida con tus términos de búsqueda."
        />
      </div> */}
      <Footer />
    </main>
  );
}

