import { Link } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

type Props = {
  to: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
};

export function MagneticButton({ to, children, variant = "solid", className = "" }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    const el = wrap.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set(((e.clientX - r.left) / r.width - 0.5) * 26);
    y.set(((e.clientY - r.top) / r.height - 0.5) * 18);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-medium tracking-wide transition-colors";
  const styles =
    variant === "solid"
      ? "text-primary-foreground"
      : "surface-glass metal-border text-foreground hover:bg-secondary/60";

  return (
    <motion.div
      ref={wrap}
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`inline-block ${className}`}
    >
      <Link
        to={to}
        className={`${base} ${styles} overflow-hidden`}
        style={variant === "solid" ? { background: "var(--gradient-metal)" } : undefined}
      >
        {variant === "solid" && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0"
            style={{ background: "var(--gradient-chrome)" }}
            whileHover={{ opacity: 0.22 }}
            transition={{ duration: 0.4 }}
          />
        )}
        <span className="relative z-10">{children}</span>
      </Link>
    </motion.div>
  );
}
