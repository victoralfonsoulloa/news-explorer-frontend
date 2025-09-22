import type { Metadata, Viewport } from "next";
import { FC, PropsWithChildren } from "react";
import { roboto } from "@/vendor/fonts";
import "@/styles/globals.css";
import Footer from "@/components/Footer";
import AppProviders from "@/contexts/AppProviders";

export const metadata: Metadata = {
  title: "News Explorer",
  description: "Explore and bookmark the latest news articles with News Explorer - a modern news discovery platform",
  keywords: ["Next.js", "TypeScript", "News", "Articles", "React", "Explorer", "Bookmarks", "Search"],
  authors: {
    name: "Victor Ulloa",
    url: "https://www.linkedin.com/in/victor-ulloa94/",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="es">
      <body className={`${roboto.className} antialiased`}>
        <AppProviders>{children}</AppProviders>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
