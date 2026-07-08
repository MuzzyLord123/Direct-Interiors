import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { RootLayout } from "@/components/RootLayout";
import { solutions } from "@/data/solutions";
import { projects } from "@/data/projects";

// Route-level code splitting: only the shared shell + the current page's chunk
// load up front. Named exports are adapted to default for React.lazy.
const Home = lazy(() => import("@/pages/Home").then((m) => ({ default: m.Home })));
const Solutions = lazy(() => import("@/pages/Solutions").then((m) => ({ default: m.Solutions })));
const SolutionDetail = lazy(() => import("@/pages/SolutionDetail").then((m) => ({ default: m.SolutionDetail })));
const AllTrades = lazy(() => import("@/pages/AllTrades").then((m) => ({ default: m.AllTrades })));
const Projects = lazy(() => import("@/pages/Projects").then((m) => ({ default: m.Projects })));
const ProjectDetail = lazy(() => import("@/pages/ProjectDetail").then((m) => ({ default: m.ProjectDetail })));
const WhyDirect = lazy(() => import("@/pages/WhyDirect").then((m) => ({ default: m.WhyDirect })));
const Process = lazy(() => import("@/pages/Process").then((m) => ({ default: m.Process })));
const Areas = lazy(() => import("@/pages/Areas").then((m) => ({ default: m.Areas })));
const AreaDetail = lazy(() => import("@/pages/AreaDetail").then((m) => ({ default: m.AreaDetail })));
const Contact = lazy(() => import("@/pages/Contact").then((m) => ({ default: m.Contact })));
const Privacy = lazy(() => import("@/pages/legal/Privacy").then((m) => ({ default: m.Privacy })));
const Terms = lazy(() => import("@/pages/legal/Terms").then((m) => ({ default: m.Terms })));
const Cookies = lazy(() => import("@/pages/legal/Cookies").then((m) => ({ default: m.Cookies })));
const NotFound = lazy(() => import("@/pages/NotFound").then((m) => ({ default: m.NotFound })));

const R = ({ to }: { to: string }) => <Navigate to={to} replace />;

// Minimal fallback — keeps the ink background so there is no flash. Prerender
// waits for the real <h1>, so this is only ever seen briefly on SPA navigation.
const Loading = () => <div className="min-h-screen bg-ink" aria-hidden="true" />;

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route
          path="*"
          element={
            <Suspense fallback={<Loading />}>
              <InnerRoutes />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

function InnerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/solutions" element={<Solutions />} />
      <Route path="/all-trades" element={<AllTrades />} />
      {solutions.map((s) => (
        <Route key={s.slug} path={`/${s.slug}`} element={<SolutionDetail slug={s.slug} />} />
      ))}
      {solutions.map((s) => (
        <Route key={`sol-${s.slug}`} path={`/solutions/${s.slug}`} element={<R to={`/${s.slug}`} />} />
      ))}
      <Route path="/solutions/interior-fit-outs" element={<R to="/interior-fit-outs-and-refurbishments" />} />

      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:slug" element={<ProjectDetail />} />
      {projects.map((p) => (
        <Route key={`old-${p.slug}`} path={`/${p.slug}`} element={<R to={`/projects/${p.slug}`} />} />
      ))}

      <Route path="/why-direct" element={<WhyDirect />} />
      <Route path="/about-us" element={<R to="/why-direct" />} />
      <Route path="/process" element={<Process />} />
      <Route path="/areas" element={<Areas />} />
      <Route path="/areas/:slug" element={<AreaDetail />} />

      <Route path="/contact" element={<Contact />} />
      <Route path="/get-a-quote" element={<R to="/contact?enquiry=quote" />} />
      <Route path="/no-obligation-consultation" element={<R to="/contact?enquiry=consultation" />} />
      <Route path="/tenders" element={<R to="/contact?enquiry=tender" />} />
      <Route path="/how-can-we-help" element={<R to="/contact" />} />
      <Route path="/sub-services" element={<R to="/all-trades" />} />

      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/cookies" element={<Cookies />} />
      <Route path="/gdpr" element={<R to="/privacy" />} />
      <Route path="/gdpr---level-1" element={<R to="/privacy" />} />
      <Route path="/gdpr---level-2" element={<R to="/privacy" />} />
      <Route path="/privacy-policy" element={<R to="/privacy" />} />
      <Route path="/terms-and-conditions" element={<R to="/terms" />} />
      <Route path="/cookies-policy" element={<R to="/cookies" />} />

      <Route path="/example-case-study-for-copying" element={<R to="/projects" />} />
      <Route path="/servicesbbeea1bd" element={<R to="/solutions" />} />
      <Route path="/our-work" element={<R to="/projects" />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
