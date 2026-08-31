import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "@/assets/logo1.png";

export function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 2600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-100 flex items-center justify-center bg-background"
          exit={{ opacity: 0, filter: "blur(14px)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="absolute inset-0 grid-lines opacity-40" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 50%, color-mix(in oklab, var(--accent) 22%, transparent), transparent 70%)",
            }}
          />
<motion.div
  className="relative flex flex-col items-center justify-center"
  style={{ perspective: 1200 }}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
  <motion.img
    src={logo}
    alt="Technogate logo"
    className="h-24 w-64 object-contain"
    initial={{ opacity: 0, scale: 0.8, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{
      duration: 1.2,
      delay: 0.5,
      ease: [0.16, 1, 0.3, 1],
    }}
  />

  <motion.div
    className="mt-5 h-px w-52 origin-center"
    style={{ background: "var(--gradient-chrome)" }}
    initial={{ scaleX: 0, opacity: 0 }}
    animate={{ scaleX: 1, opacity: 1 }}
    transition={{
      duration: 1.8,
      delay: 1.1,
      ease: "easeInOut",
    }}
  />
</motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}