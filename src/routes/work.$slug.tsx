import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { MagneticButton } from "@/components/site/MagneticButton";
import { Reveal, RevealWords } from "@/components/site/Reveal";
import { projectBySlug, projects } from "@/components/site/work-data";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = projectBySlug(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Case study not found — Technogate" }, { name: "robots", content: "noindex" }],
      };
    }
    const { project } = loaderData;
    return {
      meta: [
        { title: `${project.client} — ${project.sector} Case Study | Technogate` },
        { name: "description", content: project.summary },
        { property: "og:title", content: `${project.client} — Technogate case study` },
        { property: "og:description", content: project.summary },
      ],
    };
  },
  component: CaseStudy,
});

function CaseStudy() {
  const { project } = Route.useLoaderData();
  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 2);

  const sections = [
    { label: "The challenge", copy: project.challenge },
    { label: "Our approach", copy: project.approach },
    { label: "The outcome", copy: project.outcome },
  ];

  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-12">
        <div className="absolute inset-0 grid-lines opacity-50" />
        <div className="relative mx-auto w-[min(1100px,92vw)]">
          <Reveal>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-xs tracking-[0.2em] text-muted-foreground uppercase transition-colors hover:text-accent"
            >
              <ArrowLeft className="size-4" /> All work
            </Link>
          </Reveal>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="rounded-full bg-secondary px-3 py-1 font-semibold tracking-[0.2em] text-accent uppercase">
              {project.sector}
            </span>
            <span>{project.client}</span>
            <span>·</span>
            <span>{project.year}</span>
          </div>
          <h1 className="mt-6 text-3xl leading-[1.08] font-semibold sm:text-5xl">
            <RevealWords text={project.title} />
          </h1>
          <Reveal delay={0.15}>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {project.summary}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto w-[min(1100px,92vw)]">
        <Reveal>
          <div className="overflow-hidden rounded-4xl card-soft">
            <img
              src={project.image}
              alt={project.title}
              width={1200}
              height={900}
              className="h-[clamp(240px,40vw,520px)] w-full object-cover"
            />
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {project.metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.08}>
              <div className="rounded-2xl card-soft p-7">
                <div className="text-3xl font-semibold text-chrome">{m.value}</div>
                <div className="mt-2 text-[0.65rem] tracking-[0.25em] text-muted-foreground uppercase">
                  {m.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-[min(1100px,92vw)] gap-12 py-20 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-10">
          {sections.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div>
                <span className="text-xs font-semibold tracking-[0.35em] text-accent uppercase">
                  {s.label}
                </span>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">{s.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <aside className="space-y-8 rounded-3xl card-soft p-8">
            <div>
              <h2 className="text-xs font-semibold tracking-[0.3em] text-muted-foreground uppercase">
                Services
              </h2>
              <ul className="mt-4 space-y-2 text-sm">
                {project.services.map((s) => (
                  <li key={s} className="text-foreground">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xs font-semibold tracking-[0.3em] text-muted-foreground uppercase">
                Stack
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <li
                    key={s}
                    className="rounded-full bg-secondary px-3 py-1 text-[0.7rem] font-medium text-secondary-foreground"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <MagneticButton to="/contact">
              Discuss a similar build <ArrowUpRight className="size-4" />
            </MagneticButton>
          </aside>
        </Reveal>
      </section>

      <section className="mx-auto w-[min(1100px,92vw)] pb-20">
        <h2 className="text-2xl font-semibold sm:text-3xl">More work</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {others.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <Link
                to="/work/$slug"
                params={{ slug: p.slug }}
                className="group flex gap-5 overflow-hidden rounded-3xl card-soft glow-hover p-5"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="size-24 shrink-0 rounded-2xl object-cover"
                />
                <div>
                  <div className="text-[0.65rem] tracking-[0.2em] text-accent uppercase">
                    {p.sector}
                  </div>
                  <h3 className="mt-2 text-base leading-snug font-semibold">{p.title}</h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
