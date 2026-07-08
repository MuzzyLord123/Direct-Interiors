import { useParams, Navigate } from "react-router-dom";
import { Stub } from "./_stub";
import { getArea } from "@/data/areas";
export function AreaDetail() {
  const { slug } = useParams();
  const a = slug ? getArea(slug) : undefined;
  if (!a) return <Navigate to="/areas" replace />;
  return <Stub title={a.name} path={`/areas/${a.slug}`} image="glass-partitions-hero-69cd9864" />;
}
