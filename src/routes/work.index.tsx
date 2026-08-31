import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { MagneticButton } from "@/components/site/MagneticButton";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { projects } from "@/components/site/work-data";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Our Work — Technogate Case Studies" },
      {
        name: "description",
        content:
          "Selected Technogate case studies across fintech, e-commerce, logistics and healthcare — the challenge, the approach and the measured outcome.",
      },
      { property: "og:title", content: "Our Work — Technogate Case Studies" },
      {
        property: "og:description",
        content: "Platforms, storefronts and operations consoles built and measured by Technogate.",
      },
    ],
  }),
  component: Work,
});

function Work() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title="Products in production, measured in outcomes."
        copy="We publish the numbers, not just the screenshots. Every engagement below shipped to real users and is still running today."
      />

      <section className="mx-auto w-[min(1200px,92vw)] pb-20">
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08} className="h-full">
              <Link
                to="/work/$slug"
                params={{ slug: p.slug }}
                className="group flex h-full flex-col overflow-hidden rounded-3xl card-soft glow-hover"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-background/85 px-3 py-1 text-[0.65rem] font-semibold tracking-[0.2em] text-accent uppercase backdrop-blur">
                    {p.sector}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{p.client}</span>
                    <span>{p.year}</span>
                  </div>
                  <h2 className="mt-3 text-xl font-semibold">{p.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {p.summary}
                  </p>
                  <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-5">
                    {p.metrics.map((m) => (
                      <div key={m.label}>
                        <div className="text-lg font-semibold text-chrome">{m.value}</div>
                        <div className="text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent">
                    Read the case study
                    <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div
            className="mt-16 flex flex-col items-start justify-between gap-8 rounded-[2.5rem] p-12 text-primary-foreground sm:flex-row sm:items-center"
            style={{ background: "var(--gradient-metal)" }}
          >
            <div>
              <h2 className="text-2xl font-semibold sm:text-3xl">
                Want a case study written about your product?
              </h2>
              <p className="mt-3 max-w-lg text-sm text-primary-foreground/85">
                Bring us the hard part — the scale, the deadline, the legacy system.
              </p>
            </div>
            <MagneticButton to="/contact" variant="ghost">
              Start a project
            </MagneticButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
