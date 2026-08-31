import { lazy, Suspense, useEffect, useState } from "react";

const ParticleField = lazy(() => import("./ParticleField"));

export function HeroCanvas() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <Suspense fallback={null}>
      <ParticleField />
    </Suspense>
  );
}
