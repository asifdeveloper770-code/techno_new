import { createFileRoute } from "@tanstack/react-router";
import { Compass, Globe2, Rocket, Users } from "lucide-react";

import { MagneticButton } from "@/components/site/MagneticButton";
import { Reveal, RevealWords } from "@/components/site/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Technogate — Global Technology Leadership" },
      {
        name: "description",
        content:
          "Technogate is a Karachi-based, globally minded technology studio engineering enterprise software, digital products and growth systems.",
      },
      { property: "og:title", content: "About Technogate — Global Technology Leadership" },
      {
        property: "og:description",
        content:
          "Meet the engineering and design team turning ambitious ideas into durable digital infrastructure.",
      },
    ],
  }),
  component: About,
});

const pillars = [
  {
    icon: Compass,
    title: "Clarity before code",
    copy: "Every engagement opens with a discovery phase that converts vague ambition into a technical plan with measurable outcomes.",
  },
  {
    icon: Rocket,
    title: "Velocity with discipline",
    copy: "Weekly shipping cadence, automated pipelines and reviewable increments — speed that never trades away reliability.",
  },
  {
    icon: Globe2,
    title: "Globally deployed",
    copy: "Headquartered in Karachi and operating across time zones for founders, enterprises and public-sector programmes.",
  },
  {
    icon: Users,
    title: "Partner, not vendor",
    copy: "We embed with your team, transfer knowledge and leave you owning a codebase your engineers can extend.",
  },
];

const timeline = [
  { year: "Phase 01", title: "Discover", copy: "Stakeholder mapping, technical audit, opportunity sizing." },
  { year: "Phase 02", title: "Design", copy: "Interface systems, prototypes and architecture blueprints." },
  { year: "Phase 03", title: "Build", copy: "Cloud-native delivery with continuous integration and QA." },
  { year: "Phase 04", title: "Scale", copy: "Observability, growth experiments and performance tuning." },
];

function About() {
  return (
    <>
      <section className="relative overflow-hidden pt-40 pb-20">
        <div className="absolute inset-0 grid-lines opacity-30" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 45% at 20% 10%, color-mix(in oklab, var(--primary) 26%, transparent), transparent 70%)",
          }}
        />
        <div className="relative mx-auto w-[min(1200px,92vw)]">
          <Reveal>
            <span className="text-xs tracking-[0.35em] text-accent uppercase">About us</span>
          </Reveal>
          <h1 className="mt-6 max-w-4xl text-4xl leading-[1.05] font-semibold sm:text-6xl">
            <RevealWords text="A technology partner built for organisations that refuse to be average." />
          </h1>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Technogate exists to close the distance between an ambitious business strategy
              and the software required to execute it. We assemble senior engineers, product
              designers and growth specialists into one accountable unit — then hold that unit
              to enterprise standards of security, performance and craft.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto w-[min(1200px,92vw)] py-16">
        <div className="grid gap-5 md:grid-cols-2">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="h-full rounded-3xl surface-glass metal-border glow-hover p-8">
                <p.icon className="size-6 text-accent" />
                <h2 className="mt-6 text-xl font-semibold">{p.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto w-[min(1200px,92vw)] py-20">
        <Reveal>
          <h2 className="max-w-2xl text-3xl font-semibold sm:text-4xl">
            How an engagement runs
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-border md:grid-cols-4">
          {timeline.map((t, i) => (
            <Reveal key={t.year} delay={i * 0.08} className="bg-card/50 p-8">
              <span className="text-[0.65rem] tracking-[0.3em] text-accent uppercase">
                {t.year}
              </span>
              <h3 className="mt-4 text-lg font-medium">{t.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.copy}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto w-[min(1200px,92vw)] py-16">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-8 rounded-3xl surface-glass p-10 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-semibold sm:text-3xl">
                Ready for a serious technical partner?
              </h2>
              <p className="mt-3 max-w-lg text-sm text-muted-foreground">
                Share the brief — we'll respond with a considered plan, not a sales deck.
              </p>
            </div>
            <MagneticButton to="/contact">Book a consultation</MagneticButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
