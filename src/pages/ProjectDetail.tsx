import { useParams, Navigate } from "react-router-dom";
import { Stub } from "./_stub";
import { getProject } from "@/data/projects";
export function ProjectDetail() {
  const { slug } = useParams();
  const p = slug ? getProject(slug) : undefined;
  if (!p) return <Navigate to="/projects" replace />;
  return <Stub title={p.title} path={`/projects/${p.slug}`} image={p.hero} />;
}
