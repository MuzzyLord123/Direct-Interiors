import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";

// The prerendered HTML gives crawlers and no-JS visitors real content; on the
// client we render fresh (framer-motion's post-effect markup can't be cleanly
// hydrated from a browser-captured prerender, so we don't attempt it).
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
