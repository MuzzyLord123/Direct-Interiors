import { Stub } from "./_stub";
import { getSolution } from "@/data/solutions";
export function SolutionDetail({ slug }: { slug: string }) {
  const s = getSolution(slug)!;
  return <Stub title={s.name} path={`/${s.slug}`} image={s.heroImage} />;
}
