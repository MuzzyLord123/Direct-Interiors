import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Cursor } from "@/components/Cursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { IntroOverlay } from "@/components/IntroOverlay";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

export function RootLayout() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[400] focus:rounded-sm focus:bg-brass focus:px-4 focus:py-2 focus:font-sans focus:text-sm focus:text-ink"
      >
        Skip to content
      </a>
      <ScrollToTop />
      <ScrollProgress />
      <Cursor />
      <IntroOverlay />
      <Nav />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
