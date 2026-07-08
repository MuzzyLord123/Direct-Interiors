import { Link } from "react-router-dom";

export interface Crumb {
  name: string;
  path?: string;
}

export function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-text-dark/60">
        {crumbs.map((c, i) => (
          <li key={i} className="flex items-center gap-2">
            {c.path && i < crumbs.length - 1 ? (
              <Link to={c.path} className="transition-colors hover:text-brass">
                {c.name}
              </Link>
            ) : (
              <span className="text-brass" aria-current="page">
                {c.name}
              </span>
            )}
            {i < crumbs.length - 1 && <span aria-hidden="true" className="text-text-dark/30">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
