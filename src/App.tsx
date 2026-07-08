import { Routes, Route, Navigate } from "react-router-dom";
import { RootLayout } from "@/components/RootLayout";
import { solutions } from "@/data/solutions";
import { projects } from "@/data/projects";

import { Home } from "@/pages/Home";
import { Solutions } from "@/pages/Solutions";
import { SolutionDetail } from "@/pages/SolutionDetail";
import { AllTrades } from "@/pages/AllTrades";
import { Projects } from "@/pages/Projects";
import { ProjectDetail } from "@/pages/ProjectDetail";
import { WhyDirect } from "@/pages/WhyDirect";
import { Process } from "@/pages/Process";
import { Areas } from "@/pages/Areas";
import { AreaDetail } from "@/pages/AreaDetail";
import { Contact } from "@/pages/Contact";
import { Privacy } from "@/pages/legal/Privacy";
import { Terms } from "@/pages/legal/Terms";
import { Cookies } from "@/pages/legal/Cookies";
import { NotFound } from "@/pages/NotFound";

const R = ({ to }: { to: string }) => <Navigate to={to} replace />;

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="/solutions" element={<Solutions />} />
        <Route path="/all-trades" element={<AllTrades />} />
        {solutions.map((s) => (
          <Route key={s.slug} path={`/${s.slug}`} element={<SolutionDetail slug={s.slug} />} />
        ))}
        {/* brief-mentioned nested variant → canonical flat slug */}
        {solutions.map((s) => (
          <Route key={`sol-${s.slug}`} path={`/solutions/${s.slug}`} element={<R to={`/${s.slug}`} />} />
        ))}
        <Route path="/solutions/interior-fit-outs" element={<R to="/interior-fit-outs-and-refurbishments" />} />

        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        {/* old flat project slugs → /projects/:slug */}
        {projects.map((p) => (
          <Route key={`old-${p.slug}`} path={`/${p.slug}`} element={<R to={`/projects/${p.slug}`} />} />
        ))}

        <Route path="/why-direct" element={<WhyDirect />} />
        <Route path="/about-us" element={<R to="/why-direct" />} />
        <Route path="/process" element={<Process />} />
        <Route path="/areas" element={<Areas />} />
        <Route path="/areas/:slug" element={<AreaDetail />} />

        <Route path="/contact" element={<Contact />} />
        {/* consolidated enquiry pages */}
        <Route path="/get-a-quote" element={<R to="/contact?enquiry=quote" />} />
        <Route path="/no-obligation-consultation" element={<R to="/contact?enquiry=consultation" />} />
        <Route path="/tenders" element={<R to="/contact?enquiry=tender" />} />
        <Route path="/how-can-we-help" element={<R to="/contact" />} />
        <Route path="/sub-services" element={<R to="/all-trades" />} />

        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/cookies" element={<Cookies />} />
        {/* legacy privacy URLs → canonical */}
        <Route path="/gdpr" element={<R to="/privacy" />} />
        <Route path="/gdpr---level-1" element={<R to="/privacy" />} />
        <Route path="/gdpr---level-2" element={<R to="/privacy" />} />
        <Route path="/privacy-policy" element={<R to="/privacy" />} />
        <Route path="/terms-and-conditions" element={<R to="/terms" />} />
        <Route path="/cookies-policy" element={<R to="/cookies" />} />

        {/* leftover Duda template pages that were live + indexed */}
        <Route path="/example-case-study-for-copying" element={<R to="/projects" />} />
        <Route path="/servicesbbeea1bd" element={<R to="/solutions" />} />
        <Route path="/our-work" element={<R to="/projects" />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
