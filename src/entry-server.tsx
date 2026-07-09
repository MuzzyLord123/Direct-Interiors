import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";

type Stringy = { toString(): string };
type HelmetState = { title: Stringy; meta: Stringy; link: Stringy; script: Stringy; htmlAttributes: Stringy };

/** Render one route to static HTML + the <head> tags Helmet produced for it. */
export function render(url: string): { html: string; head: string; htmlAttrs: string } {
  const helmetContext: { helmet?: HelmetState } = {};
  const html = renderToString(
    <HelmetProvider context={helmetContext as never}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>,
  );
  const h = helmetContext.helmet;
  const head = h
    ? [h.title.toString(), h.meta.toString(), h.link.toString(), h.script.toString()].filter(Boolean).join("\n    ")
    : "";
  const htmlAttrs = h ? h.htmlAttributes.toString() : 'lang="en-GB"';
  return { html, head, htmlAttrs };
}
