import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { projects, type Project, type ProjectCategory } from "@/data/portfolio";
import {
  Footer,
  Header,
  Reveal,
  SectionHeading,
} from "@/components/site";
import { ProjectCard, ProjectModal } from "@/components/projects";

function PortfolioHero() {
  return (
    <section
      className="relative overflow-hidden border-b border-border pb-16 pt-36 sm:pb-20 sm:pt-44"
      aria-label="Portfolio introduction"
    >
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_35%,hsl(var(--accent)/.08),transparent_26%),linear-gradient(to_bottom,transparent_65%,hsl(var(--background))_100%)]" />
      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <Reveal delay={90}>
          <p className="font-mono text-[11px] uppercase tracking-[.18em] text-[hsl(var(--accent))]">
            / Portfolio
          </p>
          <h1 className="mt-5 max-w-5xl font-display text-5xl font-bold leading-[.92] tracking-[-.07em] sm:text-8xl">
            The complete
            <br />
            <span className="text-[hsl(var(--accent))]">collection.</span>
          </h1>
          <p className="mt-8 max-w-lg text-base leading-7 text-foreground/68 sm:text-lg">
            The full archive of projects — beyond the highlights. The
            experiments, client systems and late-night builds that shaped the
            way I work.
          </p>
        </Reveal>
        <Reveal delay={180}>
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-5 font-mono text-[10px] uppercase tracking-[.15em] text-muted-foreground">
            <span>{projects.length} total projects</span>
            <span>{new Set(projects.map((p) => p.category)).size} categories</span>
            <span>
              {Math.min(...projects.map((p) => Number(p.year)))} —{" "}
              {Math.max(...projects.map((p) => Number(p.year)))}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ProjectGrid() {
  const [filter, setFilter] = useState<"all" | ProjectCategory>("all");
  const [selected, setSelected] = useState<Project | null>(null);
  const filtered = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((project) => project.category === filter),
    [filter],
  );
  const filters: Array<["all" | ProjectCategory, string]> = [
    ["all", "All work"],
    ["web", "Web"],
    ["mobile", "Mobile"],
    ["dapp", "Protocols"],
  ];
  return (
    <section
      id="collection"
      className="mx-auto max-w-[1400px] scroll-mt-20 px-5 py-28 sm:px-8 sm:py-40 lg:px-12"
      aria-label="Complete project collection"
    >
      <SectionHeading
        kicker="The archive"
        title="Every project, in full daylight."
        detail="A complete record of how I approach problems, not just the ones that made the cut."
      />
      <div
        className="mb-9 flex flex-wrap items-center gap-2 border-b border-border pb-5"
        role="tablist"
        aria-label="Filter projects"
      >
        {filters.map(([value, label]) => (
          <button
            data-testid={`button-portfolio-filter-${value}`}
            role="tab"
            aria-selected={filter === value}
            key={value}
            onClick={() => setFilter(value)}
            className={`filter-button px-3 py-2 font-mono text-[10px] uppercase tracking-[.14em] ${filter === value ? "bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}
          >
            {label}
          </button>
        ))}
        <span className="ml-auto hidden font-mono text-[10px] uppercase tracking-[.14em] text-muted-foreground sm:block">
          {filtered.length} projects
        </span>
      </div>
      {filtered.length ? (
        <div className="grid gap-7 md:grid-cols-2">
          {filtered.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpen={setSelected}
            />
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-border p-14 text-center text-muted-foreground">
          No projects in this category yet.
        </div>
      )}
      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}

function BackToSelected() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 pb-28 sm:px-8 sm:pb-40 lg:px-12">
      <Reveal className="relative overflow-hidden border border-border bg-[hsl(var(--secondary)/.35)] p-7 sm:p-12 lg:p-20">
        <div className="relative grid gap-12 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="mb-7 font-mono text-[11px] uppercase tracking-[.18em] text-[hsl(var(--accent))]">
              / Curated view
            </p>
            <h2 className="max-w-3xl font-display text-5xl font-bold leading-[.92] tracking-[-.07em] sm:text-6xl">
              Short on time? See only the{" "}
              <span className="text-[hsl(var(--accent))]">best work.</span>
            </h2>
          </div>
          <Link
            data-testid="link-back-to-selected"
            href="/#work"
            className="group flex items-center gap-3 border-b border-[hsl(var(--accent))] pb-3 font-mono text-xs uppercase tracking-[.12em]"
          >
            Back to selected work{" "}
            <ArrowUpRight
              size={17}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

export default function Portfolio() {
  useEffect(() => {
    document.title =
      "Portfolio — Yahaya Abubakar Adebayo, Product-minded software engineer";
    return () => {
      document.title =
        "Yahaya Abubakar Adebayo — Product-minded software engineer";
    };
  }, []);
  return (
    <div className="site-shell noise">
      <Header forceActive="work" />
      <main>
        <PortfolioHero />
        <ProjectGrid />
        <BackToSelected />
      </main>
      <Footer />
    </div>
  );
}
