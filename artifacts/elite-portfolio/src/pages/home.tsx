import { useMemo, useState } from "react";
import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import { Link } from "wouter";
import {
  curatedProjects,
  profile,
  skillGroups,
  type Project,
  type ProjectCategory,
} from "@/data/portfolio";
import { Footer, Header, Reveal, SectionHeading } from "@/components/site";
import { ProjectCard, ProjectModal } from "@/components/projects";

function Hero() {
  const scrollToWork = () =>
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  return (
    <section
      id="home"
      className="relative flex min-h-[720px] items-end overflow-hidden border-b border-border pt-28 sm:min-h-[820px]"
    >
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_35%,hsl(var(--accent)/.08),transparent_26%),linear-gradient(to_bottom,transparent_65%,hsl(var(--background))_100%)]" />
      <div
        className="orb pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        <span className="orb-core" />
        <span className="orb-dot" />
      </div>
      <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-20 sm:px-8 sm:pb-28 lg:px-12">
        <Reveal delay={90}>
          <h1 className="max-w-5xl font-display text-[clamp(4rem,12vw,10.5rem)] font-bold leading-[.82] tracking-[-.09em]">
            Ideas into
            <br />
            <span className="text-[hsl(var(--accent))]">Software.</span>
          </h1>
        </Reveal>
        <div className="mt-12 grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
          <Reveal delay={180}>
            <p className="max-w-lg text-base leading-7 text-foreground/68 sm:text-lg">
              I’m{" "}
              <span className="text-[hsl(var(--accent))]">{profile.name}</span>,
              a {profile.role.toLowerCase()} who makes software that earns its
              place in people’s lives.
            </p>
          </Reveal>
          <Reveal delay={250} className="flex items-center gap-6">
            <button
              data-testid="button-view-work"
              onClick={scrollToWork}
              className="group flex items-center gap-4 bg-[hsl(var(--accent))] px-5 py-3 font-mono text-[11px] uppercase tracking-[.13em] text-[hsl(var(--accent-foreground))] transition-transform hover:-translate-y-1"
            >
              View selected work{" "}
              <ArrowDown
                size={15}
                className="transition-transform group-hover:translate-y-1"
              />
            </button>
          </Reveal>
        </div>
        <div className="mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-5 font-mono text-[10px] uppercase tracking-[.15em] text-muted-foreground sm:mt-24">
          <span>01 — Product thinking</span>
          <span>02 — Systems craft</span>
          <span>03 — Human detail</span>
        </div>
      </div>
    </section>
  );
}

function Work() {
  const [filter, setFilter] = useState<"all" | ProjectCategory>("all");
  const [selected, setSelected] = useState<Project | null>(null);
  const filtered = useMemo(
    () =>
      filter === "all"
        ? curatedProjects
        : curatedProjects.filter((project) => project.category === filter),
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
      id="work"
      className="mx-auto max-w-[1400px] scroll-mt-20 px-5 py-28 sm:px-8 sm:py-40 lg:px-12"
    >
      <SectionHeading
        kicker="Selected work"
        title="A small selection, with a lot behind it."
        detail="I like the hard middle: finding the shape of a problem, then making the final 10% feel inevitable."
      />
      <div
        className="mb-9 flex flex-wrap items-center gap-2 border-b border-border pb-5"
        role="tablist"
        aria-label="Filter projects"
      >
        {filters.map(([value, label]) => (
          <button
            data-testid={`button-filter-${value}`}
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
      <div className="mt-16 flex justify-center">
        <Link
          data-testid="link-view-all-projects"
          href="/portfolio"
          className="group inline-flex items-center gap-3 border border-border px-5 py-3 font-mono text-[11px] uppercase tracking-[.13em] text-foreground transition-colors hover:border-[hsl(var(--accent)/.6)] hover:text-[hsl(var(--accent))]"
        >
          View all projects
          <ArrowUpRight
            size={15}
            className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </Link>
      </div>
      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}

function About() {
  return (
    <section
      id="about"
      className="border-y border-border bg-[hsl(var(--secondary)/.35)] scroll-mt-20"
    >
      <div className="mx-auto max-w-[1400px] px-5 py-28 sm:px-8 sm:py-40 lg:px-12">
        <SectionHeading
          kicker="Working range"
          title="Useful at both ends of the telescope."
          detail="The best work happens when product judgment and technical judgment share a desk."
        />
        <div className="grid gap-px border border-border bg-border md:grid-cols-3">
          {skillGroups.map((group, groupIndex) => (
            <Reveal
              key={group.label}
              delay={groupIndex * 100}
              className="bg-background p-6 sm:p-8"
            >
              <div className="mb-12 flex items-center justify-between">
                <span className="font-display text-2xl font-bold">
                  {group.label}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  0{groupIndex + 1}
                </span>
              </div>
              <ul className="space-y-4">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-muted-foreground"
                  >
                    <Check size={13} className="text-[hsl(var(--accent))]" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
        <div className="mt-20 grid gap-7 border-t border-border pt-8 md:grid-cols-[1fr_2fr]">
          <p className="font-mono text-[11px] uppercase tracking-[.16em] text-[hsl(var(--accent))]">
            / A note on process
          </p>
          <p className="max-w-2xl text-xl leading-8 tracking-[-.02em] text-foreground/75 sm:text-2xl">
            I ask precise questions, make the invisible visible, and keep a
            close eye on what the interface is asking a person to feel. Speed
            matters. So does leaving things better than I found them.
          </p>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-[1400px] scroll-mt-20 px-5 py-28 sm:px-8 sm:py-40 lg:px-12"
    >
      <Reveal className="relative overflow-hidden border border-border p-7 sm:p-12 lg:p-20">
        <div className="pointer-events-none absolute -right-10 -top-20 font-display text-[16rem] font-bold leading-none text-foreground/[.025]">
          ↗
        </div>
        <div className="relative grid gap-12 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="mb-7 font-mono text-[11px] uppercase tracking-[.18em] text-[hsl(var(--accent))]">
              / Start a conversation
            </p>
            <h2 className="max-w-3xl font-display text-5xl font-bold leading-[.92] tracking-[-.07em] sm:text-7xl">
              Have a difficult
              <br />
              <span className="text-[hsl(var(--accent))]">
                interesting
              </span>{" "}
              problem?
            </h2>
          </div>
          <a
            data-testid="link-contact-email"
            href={`mailto:${profile.email}`}
            className="group flex items-center gap-3 border-b border-[hsl(var(--accent))] pb-3 font-mono text-xs uppercase tracking-[.12em]"
          >
            Say hello{" "}
            <ArrowUpRight
              size={17}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </div>
      </Reveal>
    </section>
  );
}

export default function Home() {
  return (
    <div className="site-shell noise">
      <Header />
      <main>
        <Hero />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
