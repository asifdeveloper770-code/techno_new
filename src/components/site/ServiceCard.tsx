import { ArrowUpRight } from "lucide-react";

type Service = {
  slug: string;
  title: string;
  image: string;
  blurb: string;
  points: readonly string[];
};

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl card-soft glow-hover">
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, color-mix(in oklab, var(--primary) 30%, transparent), transparent 55%)",
          }}
        />
      </div>

      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-start justify-between gap-5">
          <h3 className="text-lg font-semibold sm:text-xl">{service.title}</h3>
          <ArrowUpRight className="size-5 shrink-0 text-accent transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.blurb}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {service.points.map((p) => (
            <li
              key={p}
              className="rounded-full bg-secondary px-3 py-1 text-[0.7rem] font-medium tracking-wide text-secondary-foreground"
            >
              {p}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
