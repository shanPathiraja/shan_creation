"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { usePathname } from "next/navigation";
import * as THREE from "three";

/**
 * Domain-matched WebGL background for Shan Creation.
 *
 * ~22k particles morph between the three things the agency sells:
 *   Design  — a sculpted trefoil-knot form (pink)
 *   Develop — a "</>" code glyph (blue)
 *   Grow    — a rising analytics line with an arrow (purple)
 *
 * The morph is driven by page scroll (knot at the top, arrow at the bottom),
 * mirroring the "Design • Develop • Grow" strip in the hero, and the particle
 * field repels away from the mouse cursor.
 */

const COUNT = 22000;

const BRAND_COLORS = ["#EC4899", "#3B82F6", "#A855F7"]; // design, develop, grow

const jitter = (amount: number) => (Math.random() - 0.5) * amount;

// Design: trefoil knot point cloud — an abstract "sculpted" 3D object
function designFormation(n: number) {
  const arr = new Float32Array(n * 3);
  const s = 0.6;
  for (let i = 0; i < n; i++) {
    const u = Math.random() * Math.PI * 2;
    arr[i * 3] = (Math.sin(u) + 2 * Math.sin(2 * u)) * s + jitter(0.3);
    arr[i * 3 + 1] = (Math.cos(u) - 2 * Math.cos(2 * u)) * s + jitter(0.3);
    arr[i * 3 + 2] = -Math.sin(3 * u) * s + jitter(0.3);
  }
  return arr;
}

type Stroke = [number, number][];

// Distribute n points uniformly along a set of 2D polyline strokes
function strokeFormation(
  strokes: Stroke[],
  n: number,
  scale: number,
  thickness = 0.16,
  depth = 0.35
) {
  const segs: { ax: number; ay: number; bx: number; by: number; len: number }[] = [];
  let total = 0;
  for (const s of strokes) {
    for (let i = 0; i < s.length - 1; i++) {
      const [ax, ay] = s[i];
      const [bx, by] = s[i + 1];
      const len = Math.hypot(bx - ax, by - ay);
      segs.push({ ax, ay, bx, by, len });
      total += len;
    }
  }
  const arr = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    let r = Math.random() * total;
    let seg = segs[segs.length - 1];
    for (const s of segs) {
      if (r <= s.len) {
        seg = s;
        break;
      }
      r -= s.len;
    }
    const t = seg.len > 0 ? r / seg.len : 0;
    arr[i * 3] = (seg.ax + (seg.bx - seg.ax) * t) * scale + jitter(thickness);
    arr[i * 3 + 1] = (seg.ay + (seg.by - seg.ay) * t) * scale + jitter(thickness);
    arr[i * 3 + 2] = jitter(depth);
  }
  return arr;
}

// Develop: "</>"
const DEV_STROKES: Stroke[] = [
  [
    [-0.55, 0.75],
    [-1.35, 0],
    [-0.55, -0.75],
  ],
  [
    [0.35, 0.95],
    [-0.35, -0.95],
  ],
  [
    [0.55, 0.75],
    [1.35, 0],
    [0.55, -0.75],
  ],
];

// Grow: rising chart line ending in an arrowhead
const GROW_STROKES: Stroke[] = [
  [
    [-1.5, -0.85],
    [-0.8, -0.1],
    [-0.25, -0.5],
    [0.45, 0.3],
    [0.9, 0.1],
    [1.5, 0.8],
  ],
  [
    [1.5, 0.8],
    [1.08, 0.64],
  ],
  [
    [1.5, 0.8],
    [1.4, 0.36],
  ],
];

// The canvas sits behind the page content, so R3F's own pointer state never
// updates — track the cursor at window level in normalized device coords.
function useWindowPointer() {
  const ndc = useRef(new THREE.Vector2(0, -100));
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      ndc.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1)
      );
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return ndc;
}

const VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uFrom;
  uniform float uTo;
  uniform float uProgress;
  uniform float uSize;
  uniform vec3 uColors[3];
  uniform vec3 uMouse;
  uniform vec3 uMouseSlow;
  uniform float uMouseRadius;
  uniform float uMouseForce;
  uniform float uScrollVel;
  attribute vec3 aDev;
  attribute vec3 aGrow;
  attribute float aSeed;
  varying vec3 vColor;
  varying float vTwinkle;

  vec3 pickPos(float idx) {
    if (idx < 0.5) return position;
    if (idx < 1.5) return aDev;
    return aGrow;
  }
  vec3 pickCol(float idx) {
    if (idx < 0.5) return uColors[0];
    if (idx < 1.5) return uColors[1];
    return uColors[2];
  }

  void main() {
    float stagger = 0.4;
    float p = clamp(uProgress * (1.0 + stagger) - stagger * aSeed, 0.0, 1.0);
    p = p * p * (3.0 - 2.0 * p);

    vec3 pos = mix(pickPos(uFrom), pickPos(uTo), p);

    // gentle per-particle drift so held formations still feel alive
    pos += 0.05 * vec3(
      sin(uTime * 1.1 + aSeed * 31.0),
      cos(uTime * 0.9 + aSeed * 47.0),
      sin(uTime * 1.3 + aSeed * 61.0)
    );
    // particles arc outward mid-morph instead of travelling in straight lines
    pos += normalize(pos + vec3(0.001)) * sin(p * 3.14159) * 0.5 * aSeed;

    vColor = mix(pickCol(uFrom), pickCol(uTo), p);
    vTwinkle = 0.5 + 0.5 * sin(uTime * 1.7 + aSeed * 91.0);

    vec4 world = modelMatrix * vec4(pos, 1.0);

    // fast scrolling drags the swarm — particles lag behind by different amounts
    world.y += uScrollVel * (0.4 + aSeed * 1.2);

    // cursor repulsion with a slight tangential swirl, so particles flow
    // around the pointer instead of just snapping away. Each particle tracks
    // a different blend of a fast- and slow-smoothed cursor position, so the
    // swarm trails the pointer fluidly instead of moving as a rigid hole.
    vec3 m = mix(uMouseSlow, uMouse, 0.25 + 0.75 * aSeed);
    vec3 diff = world.xyz - m;
    float d = max(length(diff), 0.001);
    float influence = smoothstep(uMouseRadius, 0.0, d);
    influence = influence * influence * (3.0 - 2.0 * influence);
    world.xyz += (diff / d) * influence * uMouseForce * (0.6 + 0.8 * aSeed);
    world.xyz += vec3(-diff.y, diff.x, 0.0) / d * influence * uMouseForce * 0.3;

    vec4 mv = viewMatrix * world;
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (0.5 + aSeed) * (10.0 / -mv.z);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  precision mediump float;
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vTwinkle;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.12, d);
    gl_FragColor = vec4(vColor, a * uOpacity * (0.4 + 0.6 * vTwinkle));
  }
`;

function MorphField({ isHome, reducedMotion }: { isHome: boolean; reducedMotion: boolean }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const group = useRef<THREE.Group>(null);
  const scroll = useRef({ smoothed: 0, prev: 0, vel: 0 });
  const mouseWorld = useRef(new THREE.Vector3(0, 0, 100));
  const mouseWorldSlow = useRef(new THREE.Vector3(0, 0, 100));
  const pointerNdc = useWindowPointer();
  const pixelRatio = useThree((s) => s.gl.getPixelRatio());

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(designFormation(COUNT), 3));
    geo.setAttribute(
      "aDev",
      new THREE.BufferAttribute(strokeFormation(DEV_STROKES, COUNT, 1.5), 3)
    );
    geo.setAttribute(
      "aGrow",
      new THREE.BufferAttribute(strokeFormation(GROW_STROKES, COUNT, 1.45), 3)
    );
    const seeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) seeds[i] = Math.random();
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    return geo;
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uFrom: { value: 0 },
      uTo: { value: 0 },
      uProgress: { value: 1 },
      uSize: { value: 3.4 * pixelRatio },
      uOpacity: { value: isHome ? 0.85 : 0.4 },
      uColors: { value: BRAND_COLORS.map((c) => new THREE.Color(c)) },
      uMouse: { value: new THREE.Vector3(0, 0, 100) },
      uMouseSlow: { value: new THREE.Vector3(0, 0, 100) },
      uMouseRadius: { value: 1.9 },
      uMouseForce: { value: 0.7 },
      uScrollVel: { value: 0 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useFrame((state, delta) => {
    const mat = material.current;
    if (!mat) return;
    const { clock, camera, viewport } = state;
    const pointer = pointerNdc.current;
    mat.uniforms.uTime.value = clock.elapsedTime;
    mat.uniforms.uOpacity.value = isHome ? 0.85 : 0.4;
    mat.uniforms.uSize.value = (isHome ? 3.4 : 2.8) * pixelRatio;

    if (reducedMotion) return;

    // --- scroll drives the morph: knot → </> → arrow across the page ---
    const s = scroll.current;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;
    const ease = 1 - Math.exp(-delta * 5);
    s.smoothed += (progress - s.smoothed) * ease;
    const instVel = delta > 0 ? (s.smoothed - s.prev) / delta : 0;
    s.prev = s.smoothed;
    s.vel += (instVel - s.vel) * ease;

    const f = s.smoothed * 2; // 0..2 across three formations
    const idx = Math.min(Math.floor(f), 1);
    mat.uniforms.uFrom.value = idx;
    mat.uniforms.uTo.value = idx + 1;
    mat.uniforms.uProgress.value = f - idx;
    mat.uniforms.uScrollVel.value = THREE.MathUtils.clamp(s.vel * 2.5, -1.5, 1.5);

    // --- mouse in world space at the particle group's depth ---
    const groupZ = isHome ? -1.5 : -2.5;
    const v = viewport.getCurrentViewport(camera, [0, 0, groupZ]);
    const target = new THREE.Vector3(
      (pointer.x * v.width) / 2,
      (pointer.y * v.height) / 2,
      groupZ
    );
    mouseWorld.current.lerp(target, 1 - Math.exp(-delta * 6));
    mouseWorldSlow.current.lerp(target, 1 - Math.exp(-delta * 2.2));
    (mat.uniforms.uMouse.value as THREE.Vector3).copy(mouseWorld.current);
    (mat.uniforms.uMouseSlow.value as THREE.Vector3).copy(mouseWorldSlow.current);

    if (group.current) {
      const t = clock.elapsedTime;
      group.current.rotation.y = Math.sin(t * 0.12) * 0.2 + s.smoothed * 0.45;
      group.current.rotation.x = Math.sin(t * 0.09) * 0.08;
    }
  });

  return (
    <group
      ref={group}
      position={isHome ? [0, 0.3, -1.5] : [1.9, -0.2, -2.5]}
      scale={isHome ? 1.55 : 1.15}
    >
      <points geometry={geometry}>
        <shaderMaterial
          ref={material}
          vertexShader={VERTEX_SHADER}
          fragmentShader={FRAGMENT_SHADER}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

function CameraRig({ intensity }: { intensity: number }) {
  const smoothed = useRef(new THREE.Vector2(0, 0));
  const pointerNdc = useWindowPointer();

  useFrame(({ camera, clock }) => {
    const target =
      pointerNdc.current.y < -10 ? new THREE.Vector2(0, 0) : pointerNdc.current;
    smoothed.current.lerp(target, 0.03);
    camera.position.x = smoothed.current.x * intensity;
    camera.position.y = smoothed.current.y * intensity * 0.6;
    camera.position.z = 9 - Math.sin(clock.elapsedTime * 0.05) * 0.4;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function WebGLBackground() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const reducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 9], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        frameloop={reducedMotion ? "demand" : "always"}
      >
        <MorphField isHome={isHome} reducedMotion={reducedMotion} />
        <Sparkles count={isHome ? 110 : 60} scale={13} size={2} speed={0.25} color="#ffffff" opacity={0.3} />
        {!reducedMotion && <CameraRig intensity={isHome ? 1.1 : 0.5} />}
      </Canvas>
    </div>
  );
}
