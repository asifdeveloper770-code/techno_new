import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { Reveal, RevealWords } from "./Reveal";

export function PageHero({
  eyebrow,
  title,
  copy,
  image,
  imageAlt,
  children,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-36 pb-16">
      <div className="absolute inset-0 grid-lines opacity-50" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 45% at 15% 0%, color-mix(in oklab, var(--primary) 16%, transparent), transparent 70%)",
        }}
      />
      <div className="relative mx-auto w-[min(1200px,92vw)]">
        <Reveal>
          <span className="text-xs font-semibold tracking-[0.35em] text-accent uppercase">
            {eyebrow}
          </span>
        </Reveal>
        <h1 className="mt-6 max-w-4xl text-4xl leading-[1.05] font-semibold sm:text-6xl">
          <RevealWords text={title} />
        </h1>
        <Reveal delay={0.15}>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {copy}
          </p>
        </Reveal>
        {children}

        {image && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative mt-14 overflow-hidden rounded-[2rem] card-soft"
          >
            <img
              src={image}
              alt={imageAlt ?? ""}
              width={1400}
              height={950}
              className="h-[clamp(240px,42vw,520px)] w-full object-cover"
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, color-mix(in oklab, var(--primary) 26%, transparent), transparent 60%)",
              }}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
