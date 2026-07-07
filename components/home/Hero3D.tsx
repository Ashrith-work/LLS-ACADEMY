"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/**
 * The ONE WebGL moment on the site — a fractured icosahedron pulling itself
 * together (breaking out / transformation) surrounded by floating course
 * tiles. Violet-lit per the palette. Simple geometry, no textures, no
 * postprocessing — this must stay cheap.
 *
 * It is ONLY mounted by HeroVisual on capable devices (see HeroVisual.tsx);
 * everyone else gets the CSS fallback. Never render this during first paint.
 */

function Shards() {
  const group = useRef<THREE.Group>(null);

  useFrame(({ pointer, clock }) => {
    const g = group.current;
    if (!g) return;
    const t = clock.getElapsedTime();
    // Slow self-rotation + gentle pointer parallax.
    g.rotation.y = t * 0.15 + pointer.x * 0.25;
    g.rotation.x = Math.sin(t * 0.2) * 0.08 + pointer.y * -0.15;
  });

  // Fractured form: a core + orbiting shards that read as pieces re-joining.
  const shards = [
    { pos: [1.5, 0.6, 0.2], scale: 0.34, speed: 1.2 },
    { pos: [-1.4, 0.9, -0.3], scale: 0.26, speed: 0.9 },
    { pos: [1.1, -1.0, 0.4], scale: 0.3, speed: 1.4 },
    { pos: [-1.2, -0.7, 0.5], scale: 0.22, speed: 1.0 },
    { pos: [0.2, 1.5, -0.4], scale: 0.24, speed: 1.1 },
  ] as const;

  return (
    <group ref={group}>
      {/* Core — the "whole" self. */}
      <mesh>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#1E1C28" metalness={0.4} roughness={0.25} flatShading />
      </mesh>
      <mesh scale={1.02}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#7C5CFF" wireframe transparent opacity={0.35} />
      </mesh>

      {/* Shards breaking away / coming home. */}
      {shards.map((s, i) => (
        <Float key={i} speed={s.speed} rotationIntensity={0.6} floatIntensity={1.2}>
          <mesh position={s.pos as unknown as THREE.Vector3} scale={s.scale}>
            <icosahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#FF4E2B" : "#7C5CFF"}
              emissive={i % 2 === 0 ? "#FF4E2B" : "#7C5CFF"}
              emissiveIntensity={0.25}
              metalness={0.3}
              roughness={0.35}
              flatShading
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.6], fov: 42 }}
      gl={{ antialias: true, powerPreference: "low-power", alpha: true }}
      style={{ background: "transparent" }}
      aria-hidden
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 4, 5]} intensity={1.1} color="#EDE9E0" />
      <pointLight position={[-4, -2, 3]} intensity={6} color="#7C5CFF" />
      <pointLight position={[3, -3, 2]} intensity={4} color="#FF4E2B" />
      <Shards />
    </Canvas>
  );
}
