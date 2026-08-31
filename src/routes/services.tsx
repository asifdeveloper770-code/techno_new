import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { MagneticButton } from "@/components/site/MagneticButton";
import { Reveal, RevealWords } from "@/components/site/Reveal";
import { services } from "@/components/site/services-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Software, Product & Growth Engineering" },
      {
        name: "description",
        content:
          "Custom software development, web and app prototyping, UI/UX design and Meta ad systems engineered by Technogate for scale.",
      },
      { property: "og:title", content: "Technogate Services — Built for Scale" },
      {
        property: "og:description",
        content:
          "Four disciplines, one studio: platform engineering, rapid prototyping, interface design and performance marketing.",
      },
    ],
  }),
  component: Services,
});

const process = [
  { step: "01", title: "Discovery", copy: "Audit, constraints, success metrics and a written technical plan." },
  { step: "02", title: "Architecture", copy: "System design, data model and delivery roadmap agreed up front." },
  { step: "03", title: "Build", copy: "Weekly increments, automated pipelines, reviewable progress." },
  { step: "04", title: "Scale", copy: "Observability, iteration and growth systems after launch." },
];

function Services() {
  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-16">
        <div className="absolute inset-0 grid-lines opacity-30" />
        <div className="relative mx-auto w-[min(1200px,92vw)]">
          <Reveal>
            <span className="text-xs tracking-[0.35em] text-accent uppercase">Capabilities</span>
          </Reveal>
          <h1 className="mt-6 max-w-4xl text-4xl leading-[1.05] font-semibold sm:text-6xl">
            <RevealWords text="Engineering, design and demand generation under one roof." />
          </h1>
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
              We take responsibility for the whole stack — from the architecture diagram to the
              ad account that fills the pipeline.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto w-[min(1200px,92vw)] pb-24">
        <div className="grid gap-5 lg:grid-cols-6">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.06} className={s.span}>
              <article className="group relative h-full overflow-hidden rounded-3xl surface-glass metal-border glow-hover p-8">
                <div className="flex items-start justify-between gap-6">
                  <h2 className="text-xl font-semibold sm:text-2xl">{s.title}</h2>
                  <ArrowUpRight className="size-5 shrink-0 text-accent transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
                  {s.blurb}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {s.points.map((p) => (
                    <li
                      key={p}
                      className="rounded-full border border-border px-3 py-1 text-[0.7rem] tracking-wide text-muted-foreground"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto w-[min(1200px,92vw)] pb-24">
        <Reveal>
          <span className="text-xs tracking-[0.35em] text-accent uppercase">How we work</span>
        </Reveal>
        <div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-border md:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.07} className="bg-card/60 p-8">
              <div className="text-sm tracking-[0.3em] text-accent">{p.step}</div>
              <h3 className="mt-4 text-lg font-medium">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto w-[min(1200px,92vw)] pb-16">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-[2.5rem] p-12 text-center sm:p-20"
            style={{ background: "var(--gradient-metal)" }}
          >
            <div className="absolute inset-0 grid-lines opacity-30" />
            <h2 className="relative text-3xl text-white leading-tight font-semibold sm:text-4xl">
              Scope your next build with our engineering team.
            </h2>
            <div className="relative mt-10 flex justify-center">
              <MagneticButton to="/contact" variant="ghost">
                Start a project <ArrowUpRight className="size-4" />
              </MagneticButton>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
