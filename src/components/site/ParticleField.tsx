import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Particles({ count = 2600 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const { viewport } = useThree();
  const pointer = useRef(new THREE.Vector2(0, 0));

  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      positions[i * 3 + 2] = r * Math.cos(phi);
      seeds[i] = Math.random();
    }
    return { positions, seeds };
  }, [count]);

  useFrame((state, delta) => {
    const points = ref.current;
    if (!points) return;
    pointer.current.lerp(state.pointer, 0.06);
    points.rotation.y += delta * 0.045;
    points.rotation.x = THREE.MathUtils.lerp(
      points.rotation.x,
      pointer.current.y * 0.35,
      0.05,
    );
    points.rotation.z = THREE.MathUtils.lerp(
      points.rotation.z,
      -pointer.current.x * 0.25,
      0.05,
    );
    points.position.x = pointer.current.x * viewport.width * 0.035;
    points.position.y = pointer.current.y * viewport.height * 0.035;

    const attr = points.geometry.getAttribute("position") as THREE.BufferAttribute;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i += 3) {
      const base = positions[i * 3 + 1] ?? 0;
      const seed = seeds[i] ?? 0;
      attr.setY(i, base + Math.sin(t * 0.7 + seed * 10) * 0.25);
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.038}
        sizeAttenuation
        color={new THREE.Color("#2f6bdc")}
        transparent
        opacity={0.55}
        depthWrite={false}
      />

    </points>
  );
}

export default function ParticleField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 11], fov: 55 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
    >
      <Particles />
    </Canvas>
  );
}
