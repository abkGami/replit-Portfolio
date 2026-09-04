import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  ArrowDown,
  Github,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { useLocation } from "wouter";
import { profile } from "@/data/portfolio";

type Theme = "dark" | "light";

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
} | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("elite-portfolio-theme");
    return stored === "light" ? "light" : "dark";
  });
  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("elite-portfolio-theme", theme);
  }, [theme]);
  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark"),
    }),
    [theme],
  );
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return ref;
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-18% 0px -68% 0px", threshold: [0, 0.2, 0.5] },
    );
    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

export function SectionHeading({
  kicker,
  title,
  detail,
}: {
  kicker: string;
  title: string;
  detail?: string;
}) {
  return (
    <div className="mb-12 grid gap-5 md:grid-cols-[1fr_2fr] md:items-end">
      <p className="font-mono text-[11px] uppercase tracking-[.18em] text-[hsl(var(--accent))]">
        /{kicker}
      </p>
      <div>
        <h2 className="font-display text-4xl font-bold leading-[.98] tracking-[-.05em] text-balance sm:text-6xl">
          {title}
        </h2>
        {detail && (
          <p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground">
            {detail}
          </p>
        )}
      </div>
    </div>
  );
}

export function Header({ forceActive }: { forceActive?: string }) {
  const ids = useMemo(() => ["home", "work", "about", "contact"], []);
  const sectionActive = useActiveSection(ids);
  const active = forceActive ?? sectionActive;
  const [menuOpen, setMenuOpen] = useState(false);
  const [pathname, navigate] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const links = [
    ["work", "Selected work"],
    ["about", "Approach"],
    ["contact", "Contact"],
  ];
  const go = (id: string) => {
    setMenuOpen(false);
    if (pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/#${id}`);
    }
  };
  return (
    <header className="fixed inset-x-0 top-0 z-30">
      <div className="mx-auto max-w-[1400px] px-5 pt-4 sm:px-8 lg:px-12">
        <div className="liquid-glass relative flex items-center justify-between rounded-2xl px-4 py-3 sm:px-5">
          <button
            data-testid="button-logo-home"
            onClick={() => go("home")}
            className="group flex items-center gap-3"
            aria-label="Back to top"
          >
            <span className="flex h-7 w-7 items-center justify-center border border-[hsl(var(--accent))] font-mono text-xs text-[hsl(var(--accent))]">
              abk
            </span>
            <span className="hidden font-mono text-[11px] tracking-[.16em] text-foreground/65 sm:block">
              Yahaya Abubakar / abkGami
            </span>
          </button>
          <nav
            className={`absolute left-2 right-2 top-[calc(100%_+_8px)] flex flex-col gap-1 rounded-xl border border-foreground/10 bg-[hsl(var(--background)/.55)] p-3 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:static sm:flex sm:flex-row sm:items-center sm:gap-7 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none ${menuOpen ? "flex" : "hidden sm:flex"}`}
            aria-label="Primary navigation"
          >
            {links.map(([id, label]) => (
              <button
                data-testid={`button-nav-${id}`}
                key={id}
                onClick={() => go(id)}
                className={`group flex items-center gap-2 px-2 py-3 text-left font-mono text-[11px] uppercase tracking-[.12em] transition-colors sm:py-2 ${active === id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                <span
                  className={`h-1 w-1 rounded-full bg-[hsl(var(--accent))] transition-opacity ${active === id ? "opacity-100" : "opacity-0 group-hover:opacity-70"}`}
                />
                {label}
              </button>
            ))}
            <button
              data-testid="button-theme-toggle"
              onClick={toggleTheme}
              className="mt-2 flex items-center gap-3 border-t border-border px-2 pt-4 text-muted-foreground transition-colors hover:text-foreground sm:mt-0 sm:border-0 sm:px-0 sm:pt-0"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              {theme === "dark" ? (
                <Sun size={15} strokeWidth={1.5} />
              ) : (
                <Moon size={15} strokeWidth={1.5} />
              )}
              <span className="font-mono text-[10px] uppercase tracking-[.12em] sm:hidden">
                {theme === "dark" ? "Light mode" : "Dark mode"}
              </span>
            </button>
          </nav>
          <button
            data-testid="button-mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="border border-border p-2 text-muted-foreground sm:hidden"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <p className="font-mono text-[10px] uppercase tracking-[.14em] text-muted-foreground">
          © {new Date().getFullYear()} abkGami — built with attention
        </p>
        <div className="flex items-center gap-5">
          <a
            data-testid="link-footer-email"
            href={`mailto:${profile.email}`}
            aria-label="Email Yahaya Abubakar Adebayo"
            className="text-muted-foreground transition-colors hover:text-[hsl(var(--accent))]"
          >
            <Mail size={16} />
          </a>
          <a
            data-testid="link-footer-github"
            href={profile.socials[0].href}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground transition-colors hover:text-[hsl(var(--accent))]"
          >
            <Github size={16} />
          </a>
          <a
            data-testid="link-footer-linkedin"
            href={profile.socials[1].href}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground transition-colors hover:text-[hsl(var(--accent))]"
          >
            <Linkedin size={16} />
          </a>
          <button
            data-testid="button-back-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="ml-3 border-l border-border pl-5 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Back to top"
          >
            <ArrowDown size={16} className="rotate-180" />
          </button>
        </div>
      </div>
    </footer>
  );
}
