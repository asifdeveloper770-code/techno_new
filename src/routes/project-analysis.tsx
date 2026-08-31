import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  ClipboardList,
  FileSearch,
  GitBranch,
  LineChart,
  ShieldAlert,
  Timer,
} from "lucide-react";

import analysis from "@/assets/analysis.jpg";
import { MagneticButton } from "@/components/site/MagneticButton";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, RevealWords } from "@/components/site/Reveal";

export const Route = createFileRoute("/project-analysis")({
  head: () => ({
    meta: [
      { title: "Project Analysis — Scope, Risk & Cost Before You Build" },
      {
        name: "description",
        content:
          "Technogate's project analysis turns a rough brief into a costed architecture, risk register and delivery plan in two to three weeks.",
      },
      { property: "og:title", content: "Project Analysis — Technogate" },
      {
        property: "og:description",
        content:
          "A fixed-scope discovery engagement that produces an architecture, timeline, risk register and a number you can budget against.",
      },
    ],
  }),
  component: ProjectAnalysis,
});

const deliverables = [
  {
    icon: FileSearch,
    title: "Technical audit",
    copy: "Codebase, infrastructure and data review with a prioritised remediation list.",
  },
  {
    icon: GitBranch,
    title: "Architecture blueprint",
    copy: "Target system design, integration map and data model, documented for your team.",
  },
  {
    icon: ClipboardList,
    title: "Scoped backlog",
    copy: "Epics broken into estimable slices with assumptions and exclusions written down.",
  },
  {
    icon: ShieldAlert,
    title: "Risk register",
    copy: "Technical, compliance and delivery risks scored with mitigations attached.",
  },
  {
    icon: Timer,
    title: "Delivery roadmap",
    copy: "Phased plan with team shape, milestones and a realistic critical path.",
  },
  {
    icon: LineChart,
    title: "Business case",
    copy: "Cost model, ROI framing and the metrics we will hold the build to.",
  },
];

const phases = [
  { step: "Week 1", title: "Immersion", copy: "Stakeholder interviews, system access, data and traffic review." },
  { step: "Week 2", title: "Modelling", copy: "Architecture options, trade-off analysis and estimation workshops." },
  { step: "Week 3", title: "Readout", copy: "Written report, live walkthrough and a signed-off delivery plan." },
];

const checks = [
  "Is the current architecture the real constraint?",
  "What breaks first at 10x load?",
  "Which integrations carry the most delivery risk?",
  "What is the smallest release that proves value?",
  "Where is compliance exposure hiding?",
  "What does the honest timeline look like?",
];

function ProjectAnalysis() {
  return (
    <>
      <PageHero
        eyebrow="Project analysis"
        title="Know the architecture, the risks and the number before you build."
        copy="Our analysis engagement is a fixed-scope, two-to-three week study that replaces guesswork with a documented plan. You keep everything we produce, whether or not we build it."
        image={analysis}
        imageAlt="Technogate consultants mapping a delivery roadmap"
      />

      <section className="mx-auto w-[min(1200px,92vw)] py-16">
        <Reveal>
          <span className="text-xs font-semibold tracking-[0.35em] text-accent uppercase">
            What you receive
          </span>
        </Reveal>
        <h2 className="mt-6 max-w-3xl text-3xl leading-tight font-semibold sm:text-4xl">
          <RevealWords text="Six artefacts your board, your CTO and your delivery team can all use." />
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {deliverables.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.07}>
              <div className="h-full rounded-2xl card-soft glow-hover p-7">
                <div
                  className="inline-flex size-11 items-center justify-center rounded-xl text-primary-foreground"
                  style={{ background: "var(--gradient-metal)" }}
                >
                  <d.icon className="size-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 grid-lines opacity-40" />
        <div className="relative mx-auto w-[min(1200px,92vw)]">
          <Reveal>
            <span className="text-xs font-semibold tracking-[0.35em] text-accent uppercase">
              How it runs
            </span>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {phases.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.08}>
                <div className="h-full rounded-2xl card-soft p-8">
                  <span className="text-[0.65rem] font-semibold tracking-[0.3em] text-accent uppercase">
                    {p.step}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-[min(1200px,92vw)] py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl card-soft p-9">
              <h2 className="text-2xl font-semibold sm:text-3xl">
                Questions we answer in writing
              </h2>
              <ul className="mt-7 space-y-4">
                {checks.map((c) => (
                  <li key={c} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div
              className="flex h-full flex-col justify-between rounded-3xl p-9 text-primary-foreground"
              style={{ background: "var(--gradient-metal)" }}
            >
              <div>
                <h2 className="text-2xl font-semibold sm:text-3xl">
                  Fixed fee, credited against delivery.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-primary-foreground/85">
                  If you appoint us to build, the full analysis fee is credited to the first
                  delivery phase. If you don't, you still leave with a plan any capable team can
                  execute.
                </p>
              </div>
              <div className="mt-10">
                <MagneticButton to="/contact" variant="ghost">
                  Book an analysis <ArrowUpRight className="size-4" />
                </MagneticButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
