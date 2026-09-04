import { useEffect, useRef } from "react";
import { ArrowUpRight, ExternalLink, Github, X } from "lucide-react";
import { projects, type Project } from "@/data/portfolio";
import { Reveal } from "@/components/site";

export function ProjectVisual({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  const index = projects.findIndex((item) => item.id === project.id);
  return (
    <div
      className={`relative overflow-hidden border border-border bg-[hsl(var(--muted))] ${compact ? "aspect-[1.4]" : "aspect-[1.42]"}`}
    >
      <div
        className={`absolute inset-0 opacity-90 ${project.category === "mobile" ? "bg-[radial-gradient(ellipse_at_50%_90%,hsl(var(--accent)/.2),transparent_45%)]" : project.category === "dapp" ? "bg-[linear-gradient(130deg,hsl(240_22%_12%),hsl(68_36%_14%))]" : "bg-[linear-gradient(145deg,hsl(240_10%_13%),hsl(240_10%_7%))]"}`}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)/.08) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)/.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {project.category === "mobile" ? (
        <div className="absolute left-1/2 top-1/2 aspect-[.53] w-[25%] -translate-x-1/2 -translate-y-1/2 rounded-[1.3rem] border-[5px] border-foreground/20 bg-[hsl(var(--background))] p-1.5 shadow-2xl shadow-black/50">
          <div className="h-full overflow-hidden rounded-[.85rem] border border-[hsl(var(--accent)/.4)] bg-[linear-gradient(160deg,hsl(68_22%_16%),hsl(240_12%_8%))]">
            <div className="mx-auto mt-2 h-1 w-1/3 rounded-full bg-foreground/30" />
            <div className="mt-8 px-2">
              <div className="h-1 w-2/3 bg-[hsl(var(--accent))]" />
              <div className="mt-2 h-1 w-1/2 bg-foreground/20" />
              <div className="mt-8 h-12 border border-foreground/15" />
            </div>
          </div>
        </div>
      ) : project.category === "dapp" ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-32 w-32 rotate-45 border border-[hsl(var(--accent)/.7)] sm:h-44 sm:w-44">
            <div className="m-5 h-full w-full border border-foreground/20">
              <div className="m-5 h-full w-full border border-[hsl(var(--accent)/.3)]" />
            </div>
          </div>
          <div className="absolute h-2 w-2 rounded-full bg-[hsl(var(--accent))]" />
        </div>
      ) : (
        <div className="absolute inset-x-[12%] top-[20%] border border-foreground/20 bg-[hsl(var(--background)/.55)] p-4 shadow-2xl shadow-black/30 sm:inset-x-[18%]">
          <div className="mb-5 flex gap-1.5">
            <i className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" />
            <i className="h-1.5 w-1.5 rounded-full bg-foreground/20" />
            <i className="h-1.5 w-1.5 rounded-full bg-foreground/20" />
          </div>
          <div className="grid grid-cols-[1fr_1.8fr] gap-3">
            <div className="h-28 border border-foreground/10" />
            <div>
              <div className="h-2 w-1/2 bg-[hsl(var(--accent)/.7)]" />
              <div className="mt-3 h-12 border border-foreground/10" />
              <div className="mt-3 flex gap-2">
                <div className="h-3 w-1/3 bg-foreground/15" />
                <div className="h-3 w-1/4 bg-foreground/10" />
              </div>
            </div>
          </div>
        </div>
      )}
      <span className="absolute bottom-4 right-5 font-mono text-[10px] text-foreground/35">
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

export function ProjectCard({
  project,
  onOpen,
  index,
}: {
  project: Project;
  onOpen: (project: Project) => void;
  index: number;
}) {
  return (
    <Reveal
      delay={(index % 2) * 100}
      className={project.featured ? "md:col-span-2" : ""}
    >
      <button
        data-testid={`card-project-${project.id}`}
        onClick={() => onOpen(project)}
        className="project-card group block w-full text-left"
      >
        <ProjectVisual project={project} />
        <div className="grid gap-3 border-x border-b border-border px-5 py-5 sm:grid-cols-[1fr_auto] sm:items-start sm:px-6">
          <div>
            <div className="mb-2 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.15em] text-muted-foreground">
              <span>{project.category}</span>
              <span className="text-foreground/20">/</span>
              <span>{project.year}</span>
            </div>
            <h3 className="font-display text-2xl font-bold tracking-[-.04em]">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {project.tagline}
            </p>
          </div>
          <ArrowUpRight
            size={20}
            className="card-arrow mt-1 text-muted-foreground"
          />
        </div>
      </button>
    </Reveal>
  );
}

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        const modal = closeRef.current?.closest('[role="dialog"]');
        const focusable = modal
          ? Array.from(
              modal.querySelectorAll<HTMLElement>(
                'button, a[href], [tabindex]:not([tabindex="-1"])',
              ),
            )
          : [];
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);
  return (
    <div
      className="modal-backdrop fixed inset-0 z-50 overflow-y-auto p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="mx-auto my-8 max-w-4xl border border-border bg-[hsl(var(--card))] shadow-2xl shadow-black/40">
        <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-7">
          <span className="font-mono text-[10px] uppercase tracking-[.16em] text-muted-foreground">
            Case study / {project.year}
          </span>
          <button
            ref={closeRef}
            data-testid="button-close-project-modal"
            onClick={onClose}
            className="p-1 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Close project details"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-5 sm:p-8">
          <ProjectVisual project={project} />
          <div className="mt-8 grid gap-8 md:grid-cols-[1.3fr_.7fr]">
            <div>
              <h2
                id="project-modal-title"
                className="font-display text-4xl font-bold tracking-[-.06em] sm:text-6xl"
              >
                {project.title}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
                {project.description}
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="border border-border px-3 py-2 font-mono text-[10px] uppercase tracking-[.1em] text-foreground/70"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <aside className="border-t border-border pt-5 md:border-l md:border-t-0 md:pl-7 md:pt-0">
              <p className="font-mono text-[10px] uppercase tracking-[.15em] text-muted-foreground">
                Contribution
              </p>
              <p className="mt-2 text-sm leading-6">{project.role}</p>
              <p className="mt-7 font-mono text-[10px] uppercase tracking-[.15em] text-muted-foreground">
                Outcome
              </p>
              <p className="mt-2 font-display text-2xl font-bold text-[hsl(var(--accent))]">
                {project.metric}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                {project.links.live && (
                  <a
                    data-testid={`link-live-${project.id}`}
                    href={project.links.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 border-b border-[hsl(var(--accent))] pb-1 font-mono text-[10px] uppercase tracking-[.12em]"
                  >
                    Visit live <ExternalLink size={13} />
                  </a>
                )}
                {project.links.repo && (
                  <a
                    data-testid={`link-repo-${project.id}`}
                    href={project.links.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 border-b border-[hsl(var(--accent))] pb-1 font-mono text-[10px] uppercase tracking-[.12em]"
                  >
                    View code <Github size={13} />
                  </a>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
