"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Hero background — a living spiral galaxy of ~16k GPU particles.
 * The per-particle galaxy math (spiral arms + gentle sphere morph + turbulence)
 * runs entirely in the vertex shader, so nothing is computed per-particle on the
 * CPU each frame. Additive blending makes the points read as glowing stars.
 */

const COUNT = 16000;

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uCount;
  uniform float uSize;
  uniform float uGalaxySize;
  uniform float uArms;
  uniform float uTwist;
  uniform float uSpin;
  uniform float uMorph;
  uniform float uChaos;
  attribute float aIndex;
  varying vec3 vColor;

  vec3 hsl2rgb(float h, float s, float l) {
    vec3 rgb = clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return l + s * (rgb - 0.5) * (1.0 - abs(2.0 * l - 1.0));
  }

  void main() {
    float idx = aIndex;
    float t = (idx + 0.5) / uCount;
    float armCount = max(1.0, uArms);
    float arm = mod(idx, armCount);

    float r = sqrt(t) * uGalaxySize;
    float baseAngle = arm * (6.2831853 / armCount);
    float swirl = r * (uTwist * 0.05);
    float angle = baseAngle + swirl + uTime * uSpin;
    float pulse = 1.0 + 0.12 * sin(uTime * 0.8 + r * 0.05);

    float n1 = sin(idx * 12.9898 + uTime * 0.7);
    float n2 = cos(idx * 78.233 + uTime * 0.5);
    float wob = uChaos * 6.0;

    float gx = cos(angle) * r * pulse + n1 * wob;
    float gy = sin(idx * 0.5 + uTime) * (uGalaxySize * 0.06) + n2 * wob * 0.5;
    float gz = sin(angle) * r * pulse + n2 * wob;

    float phi = acos(clamp(1.0 - 2.0 * t, -1.0, 1.0));
    float theta = idx * 2.3999632;
    float sr = uGalaxySize * 0.9 * pulse;
    float sx = sin(phi) * cos(theta + uTime * uSpin) * sr;
    float sy = cos(phi) * sr;
    float sz = sin(phi) * sin(theta + uTime * uSpin) * sr;

    vec3 pos = mix(vec3(gx, gy, gz), vec3(sx, sy, sz), uMorph);
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    float norm = r / (uGalaxySize + 1.0);
    float hue = mod(0.58 + norm * 0.42 + arm * 0.015, 1.0);
    float light = clamp(0.32 + (1.0 - norm) * 0.4 + abs(n1) * 0.08, 0.15, 0.85);
    vColor = hsl2rgb(hue, 0.85, light);

    gl_PointSize = uSize * (260.0 / max(1.0, -mv.z));
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = dot(c, c);
    if (d > 0.25) discard;
    float a = smoothstep(0.25, 0.0, d);
    gl_FragColor = vec4(vColor, a);
  }
`;

function Galaxy() {
  const mat = useRef<THREE.ShaderMaterial>(null);

  const { positions, indices } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3); // unused (pos is computed in shader) but required
    const indices = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) indices[i] = i;
    return { positions, indices };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uCount: { value: COUNT },
      uSize: { value: 2.4 },
      uGalaxySize: { value: 60 },
      uArms: { value: 4 },
      uTwist: { value: 5 },
      uSpin: { value: 0.12 },
      uMorph: { value: 0 },
      uChaos: { value: 0.28 },
    }),
    [],
  );

  useFrame(({ clock }) => {
    const m = mat.current;
    if (!m) return;
    const t = clock.getElapsedTime();
    m.uniforms.uTime.value = t;
    // Gentle, slow puff toward a sphere and back — keeps it alive without distracting.
    m.uniforms.uMorph.value = 0.12 + 0.12 * Math.sin(t * 0.1);
  });

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={COUNT} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-aIndex" count={COUNT} array={indices} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        ref={mat}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function GalaxyField() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 78, 92], fov: 46 }}
      gl={{ antialias: true, powerPreference: "low-power", alpha: true }}
      style={{ background: "transparent" }}
      onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
      aria-hidden
    >
      <Galaxy />
    </Canvas>
  );
}
