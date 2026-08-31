import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BadgeCheck,
  Cpu,
  Gauge,
  Layers,
  Quote,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import heroVisual from "@/assets/hero-visual.jpg";
import office from "@/assets/office.jpg";
import team from "@/assets/team.jpg";
import { HeroCanvas } from "@/components/site/HeroCanvas";
import { MagneticButton } from "@/components/site/MagneticButton";
import { Reveal, RevealWords } from "@/components/site/Reveal";
import { ServiceCard } from "@/components/site/ServiceCard";
import { services } from "@/components/site/services-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Technogate — Technology, Innovation, Solutions" },
      {
        name: "description",
        content:
          "Technogate engineers custom software, prototypes, interfaces and Meta ad systems for companies that intend to lead their category.",
      },
      { property: "og:title", content: "Technogate — Technology, Innovation, Solutions" },
      {
        property: "og:description",
        content:
          "An enterprise technology studio in Karachi building scalable software, product prototypes and performance marketing engines.",
      },
    ],
  }),
  component: Home,
});

const stats = [
  { value: "120+", label: "Products shipped" },
  { value: "14", label: "Markets served" },
  { value: "98%", label: "Client retention" },
  { value: "24/7", label: "Engineering cover" },
];

const capabilities = [
  { icon: Cpu, title: "Systems thinking", copy: "Every build starts with architecture, not a template." },
  { icon: Gauge, title: "Performance obsessed", copy: "Sub-second interfaces measured, not assumed." },
  { icon: Layers, title: "Design engineering", copy: "One team owns pixels, motion and production code." },
  { icon: ShieldCheck, title: "Enterprise grade", copy: "Security, observability and compliance by default." },
];

const process = [
  { step: "01", title: "Discovery", copy: "Audit, constraints and a written technical plan." },
  { step: "02", title: "Architecture", copy: "System design, data model and delivery roadmap." },
  { step: "03", title: "Build", copy: "Weekly increments with automated pipelines." },
  { step: "04", title: "Scale", copy: "Observability, iteration and growth systems." },
];

const industries = [
  "Fintech",
  "Healthcare",
  "Logistics",
  "E-commerce",
  "Education",
  "Real estate",
  "SaaS",
  "Public sector",
];

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40">
        <div className="absolute inset-0 grid-lines opacity-60" />
        <div className="absolute inset-0 opacity-70">
          <HeroCanvas />
        </div>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 80% 10%, color-mix(in oklab, var(--primary) 14%, transparent), transparent 70%)",
          }}
        />

        <div className="relative mx-auto grid w-[min(1200px,92vw)] items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <h1 className="mt-6 text-4xl leading-[1.02] font-semibold sm:text-6xl lg:text-7xl">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                Digital dominance,
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.85, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="block text-chrome"
              >
                engineered end to end.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.05, duration: 1 }}
              className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Technogate designs and builds the software, interfaces and growth systems that
              move ambitious companies from contender to category leader.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.2, duration: 0.9 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <MagneticButton to="/contact">
                Start a project <ArrowUpRight className="size-4" />
              </MagneticButton>
              <MagneticButton to="/services" variant="ghost">
                Explore capabilities
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.4, duration: 0.9 }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-muted-foreground"
            >
              {["ISO-grade delivery process", "Senior-only engineers", "Karachi + global"].map((t) => (
                <span key={t} className="inline-flex items-center gap-2">
                  <BadgeCheck className="size-4 text-accent" /> {t}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 2.75, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div
              className="absolute -inset-6 rounded-[3rem] opacity-60 blur-2xl"
              style={{
                background:
                  "radial-gradient(60% 60% at 60% 40%, color-mix(in oklab, var(--primary) 30%, transparent), transparent 70%)",
              }}
            />
            <div className="relative overflow-hidden rounded-[2rem] card-soft">
              <img
                src={heroVisual}
                alt="Technogate analytics platform interface"
                width={1408}
                height={1104}
                className="w-full object-cover"
              />
            </div>

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-4 rounded-2xl card-soft px-5 py-4 sm:-left-10"
            >
              <div className="text-2xl font-semibold text-chrome">+38%</div>
              <div className="text-[0.65rem] tracking-[0.25em] text-muted-foreground uppercase">
                Avg. conversion lift
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative mx-auto w-[min(1200px,92vw)] py-14">
        <div className="grid overflow-hidden rounded-3xl card-soft sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.08}
              className="border-border p-8 not-last:border-b sm:not-last:border-b-0 lg:border-r lg:last:border-r-0"
            >
              <div className="text-4xl font-semibold text-chrome">{s.value}</div>
              <div className="mt-2 text-xs tracking-[0.25em] text-muted-foreground uppercase">
                {s.label}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto w-[min(1200px,92vw)] py-20">
        <Reveal>
          <span className="text-xs font-semibold tracking-[0.35em] text-accent uppercase">
            What we do
          </span>
        </Reveal>
        <h2 className="mt-6 max-w-3xl text-3xl leading-tight font-semibold sm:text-5xl">
          <RevealWords text="A single studio for product engineering, interface craft and demand generation." />
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.08} className="h-full">
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex justify-center">
            <MagneticButton to="/services" variant="ghost">
              See all capabilities <ArrowUpRight className="size-4" />
            </MagneticButton>
          </div>
        </Reveal>
      </section>

      {/* Team split */}
      <section className="mx-auto w-[min(1200px,92vw)] py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] card-soft">
              <img
                src={team}
                alt="Technogate engineering and design team collaborating"
                loading="lazy"
                width={1408}
                height={1008}
                className="w-full object-cover"
              />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <span className="text-xs font-semibold tracking-[0.35em] text-accent uppercase">
                Why Technogate
              </span>
            </Reveal>
            <h2 className="mt-6 text-3xl leading-tight font-semibold sm:text-4xl">
              <RevealWords text="One accountable team from architecture to ad spend." />
            </h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {capabilities.map((c, i) => (
                <Reveal key={c.title} delay={i * 0.07}>
                  <div className="h-full rounded-2xl card-soft glow-hover p-6">
                    <c.icon className="size-6 text-accent" />
                    <h3 className="mt-5 text-base font-semibold">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.copy}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 grid-lines opacity-40" />
        <div className="relative mx-auto w-[min(1200px,92vw)]">
          <Reveal>
            <span className="text-xs font-semibold tracking-[0.35em] text-accent uppercase">
              How we work
            </span>
          </Reveal>
          <h2 className="mt-6 max-w-2xl text-3xl font-semibold sm:text-4xl">
            <RevealWords text="A delivery process you can plan a business around." />
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.07}>
                <div className="h-full rounded-2xl card-soft glow-hover p-7">
                  <div
                    className="inline-flex size-10 items-center justify-center rounded-xl text-sm font-semibold text-primary-foreground"
                    style={{ background: "var(--gradient-metal)" }}
                  >
                    {p.step}
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industries + testimonial */}
      <section className="mx-auto w-[min(1200px,92vw)] py-16">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <div className="h-full rounded-3xl card-soft p-9">
              <span className="text-xs font-semibold tracking-[0.35em] text-accent uppercase">
                Industries
              </span>
              <h3 className="mt-5 text-2xl font-semibold sm:text-3xl">
                Regulated, high-volume and consumer-facing alike.
              </h3>
              <ul className="mt-7 flex flex-wrap gap-2">
                {industries.map((n) => (
                  <li
                    key={n}
                    className="rounded-full border border-border px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                  >
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <figure className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-9 text-primary-foreground">
              <img
                src={office}
                alt="Technogate office"
                loading="lazy"
                width={1400}
                height={900}
                className="absolute inset-0 size-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(140deg, color-mix(in oklab, var(--navy) 92%, transparent), color-mix(in oklab, var(--primary) 70%, transparent))",
                }}
              />
              <Quote className="relative size-8 opacity-80" />
              <blockquote className="relative mt-6 text-lg leading-relaxed font-medium">
                “They replaced three vendors with one team and shipped our platform a quarter
                early. The architecture still holds two years on.”
              </blockquote>
              <figcaption className="relative mt-6 text-xs tracking-[0.25em] uppercase opacity-80">
                Head of Product · Enterprise logistics client
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-[min(1200px,92vw)] pt-10 pb-16">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-[2.5rem] p-12 text-center text-primary-foreground sm:p-20"
            style={{ background: "var(--gradient-metal)" }}
          >
            <div className="absolute inset-0 grid-lines opacity-20" />
            <h2 className="relative text-3xl leading-tight font-semibold sm:text-5xl">
              Let's build the thing your competitors will benchmark against.
            </h2>
            <p className="relative mx-auto mt-5 max-w-xl text-sm text-primary-foreground/85 sm:text-base">
              Tell us what you're building. We'll come back with an architecture, a timeline
              and a number.
            </p>
            <div className="relative mt-10 flex justify-center">
              <MagneticButton to="/contact" variant="ghost">
                Talk to Technogate <ArrowUpRight className="size-4" />
              </MagneticButton>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}


