import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BookOpen,
  Globe2,
  HeartHandshake,
  Laptop,
  MapPin,
  TrendingUp,
  Loader2,
} from "lucide-react";

import careersImg from "@/assets/careers.jpg";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, RevealWords } from "@/components/site/Reveal";
import { ApplyModal } from "@/components/site/ApplyModal";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers at Technogate — Build Things That Ship" },
      {
        name: "description",
        content:
          "Open engineering, design and growth roles at Technogate in Karachi and remote. Senior-led teams, real ownership, products used at scale.",
      },
      { property: "og:title", content: "Careers at Technogate" },
      {
        property: "og:description",
        content:
          "Join a senior-led studio building software, interfaces and growth systems for clients across 14 markets.",
      },
    ],
  }),
  component: Careers,
});

const perks = [
  { icon: Laptop, title: "Hybrid by default", copy: "Karachi studio, remote-friendly weeks and hardware of your choice." },
  { icon: TrendingUp, title: "Real progression", copy: "Levelled career paths reviewed twice a year, not vibes-based promotions." },
  { icon: BookOpen, title: "Learning budget", copy: "An annual allowance for courses, conferences and certifications." },
  { icon: HeartHandshake, title: "Health cover", copy: "Medical cover for you and your immediate family." },
  { icon: Globe2, title: "Global exposure", copy: "Work with clients across 14 markets and time zones." },
  { icon: MapPin, title: "Paid time that counts", copy: "Generous leave, plus a genuine no-meeting Friday afternoon." },
];

const steps = [
  { step: "01", title: "Application review", copy: "A real person reads it. You hear back within a week." },
  { step: "02", title: "Craft conversation", copy: "45 minutes on your past work and how you make decisions." },
  { step: "03", title: "Paid exercise", copy: "A short, scoped task that mirrors real work — we pay for your time." },
  { step: "04", title: "Offer", copy: "Team fit call, then a written offer with levelling explained." },
];

interface JobRole {
  id: string;
  title: string;
  type: string;
  location: string;
  team: string;
  copy: string;
  skills: string[];
}

function Careers() {
  const [roles, setRoles] = useState<JobRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState<{ id: string; title: string } | null>(null);

  useEffect(() => {
    async function fetchRoles() {
      try {
        const { data, error } = await supabase.from("job_roles").select("*").order("created_at", { ascending: false });
        if (error) throw error;
        setRoles(data || []);
      } catch (err) {
        console.error("Error loading job roles:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchRoles();
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Join a team that ships work it can put its name on."
        copy="We hire people who care about the craft and want their decisions to matter. Small senior teams, direct client contact and products that stay in production for years."
        image={careersImg}
        imageAlt="The Technogate team in the Karachi studio"
      />

      <section className="mx-auto w-[min(1200px,92vw)] py-16">
        <Reveal>
          <span className="text-xs font-semibold tracking-[0.35em] text-accent uppercase">
            Life at Technogate
          </span>
        </Reveal>
        <h2 className="mt-6 max-w-3xl text-3xl leading-tight font-semibold sm:text-4xl">
          <RevealWords text="Senior-led teams, honest feedback and room to grow." />
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {perks.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.07}>
              <div className="h-full rounded-2xl card-soft glow-hover p-7">
                <p.icon className="size-6 text-accent" />
                <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
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
              Open positions
            </span>
          </Reveal>
          <h2 className="mt-6 text-3xl font-semibold sm:text-4xl">
            {roles.length} roles open right now
          </h2>

          <div className="mt-10 space-y-4">
            {loading ? (
              <div className="flex items-center justify-center py-12 text-muted-foreground">
                <Loader2 className="size-6 animate-spin mr-2" /> Loading roles...
              </div>
            ) : roles.length === 0 ? (
              <p className="text-muted-foreground">No open roles available at the moment.</p>
            ) : (
              roles.map((r, i) => (
                <Reveal key={r.id} delay={i * 0.06}>
                  <article className="group grid gap-6 rounded-2xl card-soft glow-hover p-7 lg:grid-cols-[1.5fr_1fr_auto] lg:items-center">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 text-[0.65rem] tracking-[0.2em] text-accent uppercase">
                        <span>{r.team}</span>
                        <span className="text-muted-foreground">{r.type}</span>
                      </div>
                      <h3 className="mt-3 text-xl font-semibold">{r.title}</h3>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                        {r.copy}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="size-4 text-accent" /> {r.location}
                      </div>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {r.skills.map((s) => (
                          <li
                            key={s}
                            className="rounded-full bg-secondary px-3 py-1 text-[0.7rem] font-medium text-secondary-foreground"
                          >
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      onClick={() => setSelectedRole({ id: r.id, title: r.title })}
                      className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-105"
                      style={{ background: "var(--gradient-metal)" }}
                    >
                      Apply <ArrowUpRight className="size-4" />
                    </button>
                  </article>
                </Reveal>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto w-[min(1200px,92vw)] py-16">
        <Reveal>
          <span className="text-xs font-semibold tracking-[0.35em] text-accent uppercase">
            Hiring process
          </span>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.step} delay={i * 0.07}>
              <div className="h-full rounded-2xl card-soft p-7">
                <div
                  className="inline-flex size-10 items-center justify-center rounded-xl text-sm font-semibold text-primary-foreground"
                  style={{ background: "var(--gradient-metal)" }}
                >
                  {s.step}
                </div>
                <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <ApplyModal
        role={selectedRole}
        onClose={() => setSelectedRole(null)}
      />
    </>
  );
}