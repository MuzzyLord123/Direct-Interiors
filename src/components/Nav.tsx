import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Phone } from "lucide-react";
import { navPrimary, navSolutions, site } from "@/data/site";
import { Button } from "@/components/primitives/Button";
import { cn } from "@/lib/cn";

function Wordmark({ onDark = true }: { onDark?: boolean }) {
  return (
    <Link to="/" className="group block leading-none" aria-label={`${site.name} — home`}>
      <span
        className={cn(
          "block font-display text-[1.35rem] font-medium tracking-wordmark transition-colors md:text-2xl",
          onDark ? "text-text-dark" : "text-text-light",
        )}
      >
        DIRECT
      </span>
      <span className="mt-0.5 block font-mono text-[0.55rem] uppercase tracking-[0.34em] text-brass">
        Interiors North West
      </span>
    </Link>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const reduce = useReducedMotion();
  const dropdownRef = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setDropdown(false);
  }, [pathname]);

  // body scroll lock for mobile menu
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Escape + outside click for dropdown
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDropdown(false);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setDropdown(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href) && href !== "/");
  const solutionsActive = navSolutions.some((s) => pathname.startsWith(s.href)) || pathname.startsWith("/solutions");

  const openDropdown = () => {
    clearTimeout(closeTimer.current);
    setDropdown(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setDropdown(false), 120);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[120] transition-all duration-300 ease-editorial",
        scrolled ? "bg-ink/92 backdrop-blur-md shadow-[0_1px_0_rgba(200,169,110,0.14)]" : "bg-transparent",
      )}
    >
      <div className="container-edge flex items-center justify-between py-4 md:py-5">
        <Wordmark />

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          <ul className="flex items-center">
            {navPrimary.map((item) =>
              item.label === "Solutions" ? (
                <li
                  key={item.href}
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={openDropdown}
                  onMouseLeave={scheduleClose}
                >
                  <Link
                    to="/solutions"
                    aria-current={solutionsActive ? "page" : undefined}
                    aria-expanded={dropdown}
                    aria-haspopup="true"
                    onClick={() => setDropdown(false)}
                    onFocus={openDropdown}
                    className={cn(
                      "relative px-4 py-2 font-sans text-sm text-text-dark/85 transition-colors hover:text-brass",
                      solutionsActive && "text-brass",
                    )}
                  >
                    Solutions
                  </Link>
                  <AnimatePresence>
                    {dropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: reduce ? 0 : 8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-1/2 top-full w-[min(40rem,90vw)] -translate-x-1/2 pt-3"
                        onMouseEnter={openDropdown}
                        onMouseLeave={scheduleClose}
                      >
                        <div className="grid grid-cols-2 gap-1 rounded-md border border-white/10 bg-ink/95 p-3 shadow-lift backdrop-blur-lg">
                          {navSolutions.map((s) => (
                            <Link
                              key={s.href}
                              to={s.href}
                              className="group rounded-sm px-4 py-3 transition-colors hover:bg-white/5"
                            >
                              <span className="block font-sans text-sm text-text-dark group-hover:text-brass">
                                {s.label}
                              </span>
                              <span className="mt-0.5 block font-sans text-xs text-graphite">{s.descriptor}</span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ) : (
                <li key={item.href}>
                  <NavLink label={item.label} href={item.href} active={isActive(item.href)} />
                </li>
              ),
            )}
          </ul>
        </nav>

        {/* Right cluster */}
        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={site.phoneHref}
            className="flex items-center gap-2 font-mono text-sm text-text-dark/90 transition-colors hover:text-brass"
          >
            <Phone className="h-3.5 w-3.5 text-brass" aria-hidden="true" />
            {site.phoneDisplay}
          </a>
          <Button to="/contact" variant="pill" size="sm">
            Get a Free Quote
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="relative z-[130] flex h-11 w-11 items-center justify-center lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((o) => !o)}
        >
          <span className="sr-only">Menu</span>
          <span className="relative block h-4 w-6">
            <motion.span
              className="absolute left-0 block h-0.5 w-6 bg-brass"
              animate={mobileOpen ? { top: 7, rotate: 45 } : { top: 0, rotate: 0 }}
              style={{ top: 0 }}
            />
            <motion.span
              className="absolute left-0 top-[7px] block h-0.5 w-6 bg-brass"
              animate={{ opacity: mobileOpen ? 0 : 1 }}
            />
            <motion.span
              className="absolute left-0 block h-0.5 w-6 bg-brass"
              animate={mobileOpen ? { top: 7, rotate: -45 } : { top: 14, rotate: 0 }}
              style={{ top: 14 }}
            />
          </span>
        </button>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} pathname={pathname} />
    </header>
  );
}

function NavLink({ label, href, active }: { label: string; href: string; active: boolean }) {
  return (
    <Link
      to={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative px-4 py-2 font-sans text-sm text-text-dark/85 transition-colors hover:text-brass",
        active && "text-brass",
      )}
    >
      {label}
      <span
        className={cn(
          "absolute inset-x-4 -bottom-0.5 h-px origin-center scale-x-0 bg-brass transition-transform duration-300 ease-editorial",
          active && "scale-x-100",
        )}
        aria-hidden="true"
      />
    </Link>
  );
}

function MobileMenu({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  const items = [...navPrimary.filter((n) => n.label !== "Solutions"), ...navSolutions.map((s) => ({ label: s.label, href: s.href }))];
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          className="fixed inset-0 z-[125] grain plaster overflow-y-auto bg-ink lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <nav aria-label="Mobile" className="container-edge relative z-[1] flex min-h-full flex-col justify-center py-28">
            <ul className="space-y-1">
              {items.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.035, duration: 0.4 }}
                >
                  <span className="mb-1 block h-px w-8 bg-brass/50" aria-hidden="true" />
                  <Link
                    to={item.href}
                    onClick={onClose}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={cn(
                      "block py-2 font-display text-3xl font-light",
                      pathname === item.href ? "text-brass" : "text-text-dark",
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-10 space-y-4">
              <a href={site.phoneHref} className="block font-mono text-xl text-brass">
                {site.phoneDisplay}
              </a>
              <Button to="/contact" variant="gold" size="lg" arrow onClick={onClose} className="w-full">
                Get a Free Quote
              </Button>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
