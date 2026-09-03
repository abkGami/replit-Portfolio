import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { ArrowDown, ArrowUpRight, Check, ExternalLink, Github, Linkedin, Mail, Menu, Moon, Sun, X } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import { profile, projects, skillGroups, type Project, type ProjectCategory } from '@/data/portfolio';
import '@/index.css';

const queryClient = new QueryClient();

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('is-visible');
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useReveal();
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: '-18% 0px -68% 0px', threshold: [0, .2, .5] });
    ids.forEach((id) => { const element = document.getElementById(id); if (element) observer.observe(element); });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

function Header({ theme, onThemeToggle }: { theme: 'dark' | 'light'; onThemeToggle: () => void }) {
  const ids = useMemo(() => ['home', 'work', 'about', 'contact'], []);
  const active = useActiveSection(ids);
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [['work', 'Selected work'], ['about', 'Approach'], ['contact', 'Contact']];
  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };
  return (
    <header className="fixed inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <button data-testid="button-logo-home" onClick={() => go('home')} className="group flex items-center gap-3" aria-label="Back to top">
          <span className="flex h-7 w-7 items-center justify-center border border-[hsl(var(--accent))] font-mono text-xs text-[hsl(var(--accent))]">M</span>
          <span className="hidden font-mono text-[11px] tracking-[.16em] text-foreground/65 sm:block">MARA VOSS / 24</span>
        </button>
        <nav className={`absolute left-5 right-5 top-[72px] flex flex-col gap-1 border border-border bg-[hsl(var(--background)/.96)] p-3 shadow-2xl shadow-black/20 sm:static sm:flex sm:flex-row sm:items-center sm:gap-7 sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none ${menuOpen ? 'flex' : 'hidden sm:flex'}`} aria-label="Primary navigation">
          {links.map(([id, label]) => (
            <button data-testid={`button-nav-${id}`} key={id} onClick={() => go(id)} className={`group flex items-center gap-2 px-2 py-3 text-left font-mono text-[11px] uppercase tracking-[.12em] transition-colors sm:py-2 ${active === id ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
              <span className={`h-1 w-1 rounded-full bg-[hsl(var(--accent))] transition-opacity ${active === id ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'}`} />
              {label}
            </button>
          ))}
          <button data-testid="button-theme-toggle" onClick={onThemeToggle} className="mt-2 flex items-center gap-3 border-t border-border px-2 pt-4 text-muted-foreground transition-colors hover:text-foreground sm:mt-0 sm:border-0 sm:px-0 sm:pt-0" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
            {theme === 'dark' ? <Sun size={15} strokeWidth={1.5} /> : <Moon size={15} strokeWidth={1.5} />}
            <span className="font-mono text-[10px] uppercase tracking-[.12em] sm:hidden">{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
          </button>
        </nav>
        <button data-testid="button-mobile-menu" onClick={() => setMenuOpen(!menuOpen)} className="border border-border p-2 text-muted-foreground sm:hidden" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen}>
          {menuOpen ? <X size={17} /> : <Menu size={17} />}
        </button>
      </div>
    </header>
  );
}

function SectionHeading({ kicker, title, detail }: { kicker: string; title: string; detail?: string }) {
  return (
    <div className="mb-12 grid gap-5 md:grid-cols-[1fr_2fr] md:items-end">
      <p className="font-mono text-[11px] uppercase tracking-[.18em] text-[hsl(var(--accent))]">/{kicker}</p>
      <div>
        <h2 className="font-display text-4xl font-bold leading-[.98] tracking-[-.05em] text-balance sm:text-6xl">{title}</h2>
        {detail && <p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground">{detail}</p>}
      </div>
    </div>
  );
}

function Hero() {
  const scrollToWork = () => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  return (
    <section id="home" className="relative flex min-h-[720px] items-end overflow-hidden border-b border-border pt-28 sm:min-h-[820px]">
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_35%,hsl(var(--accent)/.08),transparent_26%),linear-gradient(to_bottom,transparent_65%,hsl(var(--background))_100%)]" />
      <div className="orb pointer-events-none hidden md:block" aria-hidden="true"><span className="orb-core" /><span className="orb-dot" /></div>
      <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-20 sm:px-8 sm:pb-28 lg:px-12">
        <Reveal className="mb-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[.17em] text-muted-foreground">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" /> Available for select collaborations · 2025
        </Reveal>
        <Reveal delay={90}>
          <h1 className="max-w-5xl font-display text-[clamp(4rem,12vw,10.5rem)] font-bold leading-[.82] tracking-[-.09em]">
            Ideas into<br /><span className="text-[hsl(var(--accent))]">instruments.</span>
          </h1>
        </Reveal>
        <div className="mt-12 grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
          <Reveal delay={180}>
            <p className="max-w-lg text-base leading-7 text-foreground/68 sm:text-lg">I’m {profile.name}, a {profile.role.toLowerCase()} who makes software that earns its place in people’s lives.</p>
          </Reveal>
          <Reveal delay={250} className="flex items-center gap-6">
            <button data-testid="button-view-work" onClick={scrollToWork} className="group flex items-center gap-4 bg-[hsl(var(--accent))] px-5 py-3 font-mono text-[11px] uppercase tracking-[.13em] text-[hsl(var(--accent-foreground))] transition-transform hover:-translate-y-1">
              View selected work <ArrowDown size={15} className="transition-transform group-hover:translate-y-1" />
            </button>
          </Reveal>
        </div>
        <div className="mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-5 font-mono text-[10px] uppercase tracking-[.15em] text-muted-foreground sm:mt-24">
          <span>01 — Product thinking</span><span>02 — Systems craft</span><span>03 — Human detail</span>
        </div>
      </div>
    </section>
  );
}

function ProjectVisual({ project, compact = false }: { project: Project; compact?: boolean }) {
  const index = projects.findIndex((item) => item.id === project.id);
  return (
    <div className={`relative overflow-hidden border border-border bg-[hsl(var(--muted))] ${compact ? 'aspect-[1.4]' : 'aspect-[1.42]'}`}>
      <div className={`absolute inset-0 opacity-90 ${project.category === 'mobile' ? 'bg-[radial-gradient(ellipse_at_50%_90%,hsl(var(--accent)/.2),transparent_45%)]' : project.category === 'dapp' ? 'bg-[linear-gradient(130deg,hsl(240_22%_12%),hsl(68_36%_14%))]' : 'bg-[linear-gradient(145deg,hsl(240_10%_13%),hsl(240_10%_7%))]'}`} />
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(hsl(var(--foreground)/.08) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)/.08) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      {project.category === 'mobile' ? (
        <div className="absolute left-1/2 top-1/2 aspect-[.53] w-[25%] -translate-x-1/2 -translate-y-1/2 rounded-[1.3rem] border-[5px] border-foreground/20 bg-[hsl(var(--background))] p-1.5 shadow-2xl shadow-black/50">
          <div className="h-full overflow-hidden rounded-[.85rem] border border-[hsl(var(--accent)/.4)] bg-[linear-gradient(160deg,hsl(68_22%_16%),hsl(240_12%_8%))]">
            <div className="mx-auto mt-2 h-1 w-1/3 rounded-full bg-foreground/30" />
            <div className="mt-8 px-2"><div className="h-1 w-2/3 bg-[hsl(var(--accent))]" /><div className="mt-2 h-1 w-1/2 bg-foreground/20" /><div className="mt-8 h-12 border border-foreground/15" /></div>
          </div>
        </div>
      ) : project.category === 'dapp' ? (
        <div className="absolute inset-0 flex items-center justify-center"><div className="h-32 w-32 rotate-45 border border-[hsl(var(--accent)/.7)] sm:h-44 sm:w-44"><div className="m-5 h-full w-full border border-foreground/20"><div className="m-5 h-full w-full border border-[hsl(var(--accent)/.3)]" /></div></div><div className="absolute h-2 w-2 rounded-full bg-[hsl(var(--accent))]" /></div>
      ) : (
        <div className="absolute inset-x-[12%] top-[20%] border border-foreground/20 bg-[hsl(var(--background)/.55)] p-4 shadow-2xl shadow-black/30 sm:inset-x-[18%]"><div className="mb-5 flex gap-1.5"><i className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" /><i className="h-1.5 w-1.5 rounded-full bg-foreground/20" /><i className="h-1.5 w-1.5 rounded-full bg-foreground/20" /></div><div className="grid grid-cols-[1fr_1.8fr] gap-3"><div className="h-28 border border-foreground/10" /><div><div className="h-2 w-1/2 bg-[hsl(var(--accent)/.7)]" /><div className="mt-3 h-12 border border-foreground/10" /><div className="mt-3 flex gap-2"><div className="h-3 w-1/3 bg-foreground/15" /><div className="h-3 w-1/4 bg-foreground/10" /></div></div></div></div>
      )}
      <span className="absolute bottom-4 right-5 font-mono text-[10px] text-foreground/35">0{index + 1}</span>
    </div>
  );
}

function ProjectCard({ project, onOpen, index }: { project: Project; onOpen: (project: Project) => void; index: number }) {
  return (
    <Reveal delay={(index % 2) * 100} className={project.featured ? 'md:col-span-2' : ''}>
      <button data-testid={`card-project-${project.id}`} onClick={() => onOpen(project)} className="project-card group block w-full text-left">
        <ProjectVisual project={project} />
        <div className="grid gap-3 border-x border-b border-border px-5 py-5 sm:grid-cols-[1fr_auto] sm:items-start sm:px-6">
          <div><div className="mb-2 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.15em] text-muted-foreground"><span>{project.category}</span><span className="text-foreground/20">/</span><span>{project.year}</span></div><h3 className="font-display text-2xl font-bold tracking-[-.04em]">{project.title}</h3><p className="mt-1 text-sm text-muted-foreground">{project.tagline}</p></div>
          <ArrowUpRight size={20} className="card-arrow mt-1 text-muted-foreground" />
        </div>
      </button>
    </Reveal>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'Tab') {
        const modal = closeRef.current?.closest('[role="dialog"]');
        const focusable = modal ? Array.from(modal.querySelectorAll<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])')) : [];
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', onKeyDown); };
  }, [onClose]);
  return (
    <div className="modal-backdrop fixed inset-0 z-50 overflow-y-auto p-4 sm:p-8" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="mx-auto my-8 max-w-4xl border border-border bg-[hsl(var(--card))] shadow-2xl shadow-black/40">
        <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-7"><span className="font-mono text-[10px] uppercase tracking-[.16em] text-muted-foreground">Case study / {project.year}</span><button ref={closeRef} data-testid="button-close-project-modal" onClick={onClose} className="p-1 text-muted-foreground transition-colors hover:text-foreground" aria-label="Close project details"><X size={18} /></button></div>
        <div className="p-5 sm:p-8"><ProjectVisual project={project} /><div className="mt-8 grid gap-8 md:grid-cols-[1.3fr_.7fr]"><div><h2 id="project-modal-title" className="font-display text-4xl font-bold tracking-[-.06em] sm:text-6xl">{project.title}</h2><p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">{project.description}</p><div className="mt-7 flex flex-wrap gap-2">{project.stack.map((item) => <span key={item} className="border border-border px-3 py-2 font-mono text-[10px] uppercase tracking-[.1em] text-foreground/70">{item}</span>)}</div></div><aside className="border-t border-border pt-5 md:border-l md:border-t-0 md:pl-7 md:pt-0"><p className="font-mono text-[10px] uppercase tracking-[.15em] text-muted-foreground">Contribution</p><p className="mt-2 text-sm leading-6">{project.role}</p><p className="mt-7 font-mono text-[10px] uppercase tracking-[.15em] text-muted-foreground">Outcome</p><p className="mt-2 font-display text-2xl font-bold text-[hsl(var(--accent))]">{project.metric}</p><div className="mt-8 flex flex-wrap gap-4">{project.links.live && <a data-testid={`link-live-${project.id}`} href={project.links.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border-b border-[hsl(var(--accent))] pb-1 font-mono text-[10px] uppercase tracking-[.12em]">Visit live <ExternalLink size={13} /></a>}{project.links.repo && <a data-testid={`link-repo-${project.id}`} href={project.links.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border-b border-[hsl(var(--accent))] pb-1 font-mono text-[10px] uppercase tracking-[.12em]">View code <Github size={13} /></a>}</div></aside></div></div>
      </div>
    </div>
  );
}

function Work() {
  const [filter, setFilter] = useState<'all' | ProjectCategory>('all');
  const [selected, setSelected] = useState<Project | null>(null);
  const filtered = useMemo(() => filter === 'all' ? projects : projects.filter((project) => project.category === filter), [filter]);
  const filters: Array<['all' | ProjectCategory, string]> = [['all', 'All work'], ['web', 'Web'], ['mobile', 'Mobile'], ['dapp', 'Protocols']];
  return (
    <section id="work" className="mx-auto max-w-[1400px] scroll-mt-20 px-5 py-28 sm:px-8 sm:py-40 lg:px-12">
      <SectionHeading kicker="Selected work" title="A small selection, with a lot behind it." detail="I like the hard middle: finding the shape of a problem, then making the final 10% feel inevitable." />
      <div className="mb-9 flex flex-wrap items-center gap-2 border-b border-border pb-5" role="tablist" aria-label="Filter projects">
        {filters.map(([value, label]) => <button data-testid={`button-filter-${value}`} role="tab" aria-selected={filter === value} key={value} onClick={() => setFilter(value)} className={`filter-button px-3 py-2 font-mono text-[10px] uppercase tracking-[.14em] ${filter === value ? 'bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`}>{label}</button>)}
        <span className="ml-auto hidden font-mono text-[10px] uppercase tracking-[.14em] text-muted-foreground sm:block">{filtered.length} projects</span>
      </div>
      {filtered.length ? <div className="grid gap-7 md:grid-cols-2">{filtered.map((project, index) => <ProjectCard key={project.id} project={project} index={index} onOpen={setSelected} />)}</div> : <div className="border border-dashed border-border p-14 text-center text-muted-foreground">No projects in this category yet.</div>}
      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

function About() {
  return (
    <section id="about" className="border-y border-border bg-[hsl(var(--secondary)/.35)] scroll-mt-20">
      <div className="mx-auto max-w-[1400px] px-5 py-28 sm:px-8 sm:py-40 lg:px-12">
        <SectionHeading kicker="Working range" title="Useful at both ends of the telescope." detail="The best work happens when product judgment and technical judgment share a desk." />
        <div className="grid gap-px border border-border bg-border md:grid-cols-3">
          {skillGroups.map((group, groupIndex) => <Reveal key={group.label} delay={groupIndex * 100} className="bg-background p-6 sm:p-8"><div className="mb-12 flex items-center justify-between"><span className="font-display text-2xl font-bold">{group.label}</span><span className="font-mono text-[10px] text-muted-foreground">0{groupIndex + 1}</span></div><ul className="space-y-4">{group.items.map((item) => <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground"><Check size={13} className="text-[hsl(var(--accent))]" />{item}</li>)}</ul></Reveal>)}
        </div>
        <div className="mt-20 grid gap-7 border-t border-border pt-8 md:grid-cols-[1fr_2fr]"><p className="font-mono text-[11px] uppercase tracking-[.16em] text-[hsl(var(--accent))]">/ A note on process</p><p className="max-w-2xl text-xl leading-8 tracking-[-.02em] text-foreground/75 sm:text-2xl">I ask precise questions, make the invisible visible, and keep a close eye on what the interface is asking a person to feel. Speed matters. So does leaving things better than I found them.</p></div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-[1400px] scroll-mt-20 px-5 py-28 sm:px-8 sm:py-40 lg:px-12">
      <Reveal className="relative overflow-hidden border border-border p-7 sm:p-12 lg:p-20">
        <div className="pointer-events-none absolute -right-10 -top-20 font-display text-[16rem] font-bold leading-none text-foreground/[.025]">↗</div>
        <div className="relative grid gap-12 md:grid-cols-[1fr_auto] md:items-end"><div><p className="mb-7 font-mono text-[11px] uppercase tracking-[.18em] text-[hsl(var(--accent))]">/ Start a conversation</p><h2 className="max-w-3xl font-display text-5xl font-bold leading-[.92] tracking-[-.07em] sm:text-7xl">Have a difficult<br /><span className="text-[hsl(var(--accent))]">interesting</span> problem?</h2></div><a data-testid="link-contact-email" href={`mailto:${profile.email}`} className="group flex items-center gap-3 border-b border-[hsl(var(--accent))] pb-3 font-mono text-xs uppercase tracking-[.12em]">Say hello <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a></div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return <footer className="border-t border-border"><div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12"><p className="font-mono text-[10px] uppercase tracking-[.14em] text-muted-foreground">© {new Date().getFullYear()} Mara Voss — built with attention</p><div className="flex items-center gap-5"><a data-testid="link-footer-email" href={`mailto:${profile.email}`} aria-label="Email Mara Voss" className="text-muted-foreground transition-colors hover:text-[hsl(var(--accent))]"><Mail size={16} /></a><a data-testid="link-footer-github" href={profile.socials[0].href} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-muted-foreground transition-colors hover:text-[hsl(var(--accent))]"><Github size={16} /></a><a data-testid="link-footer-linkedin" href={profile.socials[1].href} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-muted-foreground transition-colors hover:text-[hsl(var(--accent))]"><Linkedin size={16} /></a><button data-testid="button-back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="ml-3 border-l border-border pl-5 text-muted-foreground transition-colors hover:text-foreground" aria-label="Back to top"><ArrowDown size={16} className="rotate-180" /></button></div></div></footer>;
}

function Home() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const stored = localStorage.getItem('elite-portfolio-theme');
    return stored === 'light' ? 'light' : 'dark';
  });
  useEffect(() => { document.documentElement.classList.toggle('light', theme === 'light'); document.documentElement.classList.toggle('dark', theme === 'dark'); localStorage.setItem('elite-portfolio-theme', theme); }, [theme]);
  return <div className="site-shell noise"><Header theme={theme} onThemeToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')} /><main><Hero /><Work /><About /><Contact /></main><Footer /></div>;
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;