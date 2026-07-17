import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, useAnimations, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import spacemanScene from "../assets/3d/spaceman.glb";

/* ============================================================
   THE JOURNEY
   One continuous 3D world. Scroll progress (0 → 1) flies the
   camera DEPTH units into space along a curved flight path.
   Each section of the site is a "stop" placed along that path.
   ============================================================ */

const DEPTH = 240;

// Curved flight path — sin/cos give gentle banked turns
const pathX = (p) => Math.sin(p * Math.PI * 3) * 5;
const pathY = (p) => Math.cos(p * Math.PI * 2) * 2;
const pathZ = (p) => -p * DEPTH;

// Where each section's set piece lives along the journey (fraction of scroll).
// These are fallbacks — the real values are measured from the DOM after
// layout settles, because the pinned Projects section stretches the scroll.
const DEFAULT_STOPS = {
  hero: 0.02,
  projects: 0.24,
  skills: 0.47,
  certs: 0.6,
  experience: 0.75,
  contact: 0.94,
};

const measureStops = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (max <= 0) return DEFAULT_STOPS;
  const at = (id, fallback) => {
    const el = document.getElementById(id);
    if (!el) return fallback;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const mid = top + Math.min(el.offsetHeight, window.innerHeight * 2) / 2;
    return THREE.MathUtils.clamp((mid - window.innerHeight / 2) / max, 0.02, 0.98);
  };
  return {
    hero: 0.02,
    projects: at("projects", DEFAULT_STOPS.projects),
    skills: at("skills", DEFAULT_STOPS.skills),
    certs: at("certifications", DEFAULT_STOPS.certs),
    experience: at("experience", DEFAULT_STOPS.experience),
    contact: at("contact", DEFAULT_STOPS.contact),
  };
};

// Ambient color of space shifts as you travel deeper.
// convertSRGBToLinear so the renderer's output encoding lands these hexes
// on screen as written (otherwise dark colors get gamma-lifted and wash out).
const ZONES = [
  { at: 0.0, color: new THREE.Color("#010d18").convertSRGBToLinear() },  // launch — deep navy
  { at: 0.25, color: new THREE.Color("#03182b").convertSRGBToLinear() }, // projects — blue
  { at: 0.5, color: new THREE.Color("#062028").convertSRGBToLinear() },  // skills — teal night
  { at: 0.62, color: new THREE.Color("#0a1430").convertSRGBToLinear() }, // certs — indigo
  { at: 0.78, color: new THREE.Color("#160f2e").convertSRGBToLinear() }, // experience — violet
  { at: 1.0, color: new THREE.Color("#1c1020").convertSRGBToLinear() },  // arrival — warm dusk
];

const zoneColor = (p, out) => {
  for (let i = 0; i < ZONES.length - 1; i++) {
    const a = ZONES[i];
    const b = ZONES[i + 1];
    if (p >= a.at && p <= b.at) {
      const t = (p - a.at) / (b.at - a.at);
      return out.copy(a.color).lerp(b.color, t);
    }
  }
  return out.copy(ZONES[ZONES.length - 1].color);
};

// Soft round sprite so points render as glowing dots instead of squares
const createCircleTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext("2d");
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.4, "rgba(255,255,255,0.5)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(canvas);
};

/* ------------------------------------------------------------
   Camera rig — smoothed scroll → position on the flight path,
   banking into turns, with gentle mouse drift.
   ------------------------------------------------------------ */
const CameraRig = ({ progressRef, mouseRef }) => {
  const { camera, scene } = useThree();
  const smoothP = useRef(0);
  const bgColor = useMemo(() => new THREE.Color("#010d18"), []);

  useEffect(() => {
    scene.fog = new THREE.Fog("#010d18", 25, 110);
    scene.background = bgColor;
  }, [scene, bgColor]);

  useFrame(() => {
    const p = progressRef.current;
    // Trailing ease — the ship coasts, it doesn't teleport
    smoothP.current = THREE.MathUtils.lerp(smoothP.current, p, 0.06);
    const sp = smoothP.current;

    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    camera.position.x = pathX(sp) + mx * 1.4;
    camera.position.y = pathY(sp) - my * 0.9;
    camera.position.z = pathZ(sp);

    // Bank into turns: roll opposite to the path's sideways slope
    const dx = pathX(sp + 0.01) - pathX(sp);
    camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, -dx * 0.6, 0.05);
    // Look slightly toward where the path is heading
    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, -dx * 0.35 - mx * 0.03, 0.05);
    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, my * 0.02, 0.05);

    // Space itself changes color as you go deeper
    zoneColor(sp, bgColor);
    if (scene.fog) scene.fog.color.copy(bgColor);
  });

  return null;
};

/* ------------------------------------------------------------
   Star tunnel — stars fill the whole travel corridor so
   there's always parallax streaming past.
   ------------------------------------------------------------ */
const StarTunnel = ({ map, count = 2400, color = "#ffffff", size = 0.5, opacity = 0.7 }) => {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 10 + Math.random() * 70;
      arr[i * 3] = Math.cos(angle) * radius;
      arr[i * 3 + 1] = Math.sin(angle) * radius * 0.7;
      arr[i * 3 + 2] = 30 - Math.random() * (DEPTH + 110);
    }
    return arr;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        map={map}
        transparent
        opacity={opacity}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        fog={false}
      />
    </points>
  );
};

/* ------------------------------------------------------------
   Hero stop — the astronaut floating beside the launch point.
   The camera simply flies past him as you scroll.
   ------------------------------------------------------------ */
const Astronaut = ({ mouseRef }) => {
  const ref = useRef();
  const { scene, animations } = useGLTF(spacemanScene);
  const { actions } = useAnimations(animations, ref);

  useEffect(() => {
    if (actions["Idle"]) actions["Idle"].play();
  }, [actions]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    // Perpetual slow tumble — nothing stops a spin in vacuum
    ref.current.rotation.y += delta * 0.06;
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      mouseRef.current.y * 0.2,
      0.03
    );
  });

  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={1.2}>
      <mesh ref={ref} position={[3.4, -0.6, pathZ(0.02) - 7]} scale={1.7} rotation={[0.1, 2.4, 0.05]}>
        <primitive object={scene} />
      </mesh>
    </Float>
  );
};

/* ------------------------------------------------------------
   Projects stop — a ringed planet with a moon per project.
   ------------------------------------------------------------ */
const ProjectPlanet = ({ stop, moonCount = 4 }) => {
  const moonsRef = useRef();
  const cx = pathX(stop) - 11;
  const cy = pathY(stop) + 4;
  const cz = pathZ(stop);

  const moons = useMemo(
    () =>
      Array.from({ length: moonCount }, (_, i) => ({
        radius: 9.5 + i * 1.6,
        speed: 0.25 - i * 0.04,
        phase: (i / moonCount) * Math.PI * 2,
        size: 0.5 + (i % 2) * 0.25,
        tilt: (i - moonCount / 2) * 0.12,
      })),
    [moonCount]
  );

  useFrame(({ clock }) => {
    if (!moonsRef.current) return;
    const t = clock.elapsedTime;
    moonsRef.current.children.forEach((moon, i) => {
      const m = moons[i];
      const a = m.phase + t * m.speed;
      moon.position.set(
        Math.cos(a) * m.radius,
        Math.sin(a) * m.radius * m.tilt,
        Math.sin(a) * m.radius * 0.55
      );
    });
  });

  return (
    <group position={[cx, cy, cz]}>
      {/* Planet body */}
      <mesh>
        <sphereGeometry args={[6.5, 48, 48]} />
        <meshStandardMaterial color="#0D3056" roughness={0.7} metalness={0.2} emissive="#06283f" emissiveIntensity={0.5} />
      </mesh>
      {/* Atmosphere glow */}
      <mesh scale={1.18}>
        <sphereGeometry args={[6.5, 32, 32]} />
        <meshBasicMaterial color="#1689C8" transparent opacity={0.09} side={THREE.BackSide} blending={THREE.AdditiveBlending} />
      </mesh>
      {/* Ring */}
      <mesh rotation={[Math.PI / 2.4, 0, 0.4]}>
        <torusGeometry args={[10.5, 0.09, 8, 90]} />
        <meshBasicMaterial color="#1689C8" transparent opacity={0.35} blending={THREE.AdditiveBlending} />
      </mesh>
      {/* Project moons */}
      <group ref={moonsRef}>
        {moons.map((m, i) => (
          <mesh key={i}>
            <sphereGeometry args={[m.size, 20, 20]} />
            <meshStandardMaterial color="#8fd4f7" emissive="#1689C8" emissiveIntensity={0.9} roughness={0.4} />
          </mesh>
        ))}
      </group>
      <pointLight color="#1689C8" intensity={12} distance={40} />
    </group>
  );
};

/* ------------------------------------------------------------
   Skills stop — a constellation that lights up as you arrive.
   ------------------------------------------------------------ */
const Constellation = ({ map, stop }) => {
  const lineMatRef = useRef();
  const pointsMatRef = useRef();
  const cx = pathX(stop) + 10;
  const cy = pathY(stop) + 2;
  const cz = pathZ(stop);

  const { positions, linePositions } = useMemo(() => {
    const pts = Array.from({ length: 14 }, () => [
      (Math.random() - 0.5) * 16,
      (Math.random() - 0.5) * 9,
      (Math.random() - 0.5) * 8,
    ]);
    const positions = new Float32Array(pts.flat());

    // Connect each star to its nearest neighbor + a few long links
    const pairs = [];
    pts.forEach((a, i) => {
      let best = -1;
      let bestD = Infinity;
      pts.forEach((b, j) => {
        if (i === j) return;
        const d = (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2;
        if (d < bestD) { bestD = d; best = j; }
      });
      pairs.push([i, best]);
      if (i % 4 === 0) pairs.push([i, (i + 5) % pts.length]);
    });
    const linePositions = new Float32Array(pairs.flatMap(([i, j]) => [...pts[i], ...pts[j]]));
    return { positions, linePositions };
  }, []);

  useFrame(({ camera }) => {
    // Light up as the camera approaches this stop
    const lit = THREE.MathUtils.clamp(1 - Math.abs(camera.position.z - cz) / 55, 0, 1);
    if (lineMatRef.current) lineMatRef.current.opacity = lit * 0.7;
    if (pointsMatRef.current) {
      pointsMatRef.current.opacity = 0.25 + lit * 0.75;
      pointsMatRef.current.size = 0.7 + lit * 0.9;
    }
  });

  return (
    <group position={[cx, cy, cz]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          ref={pointsMatRef}
          size={0.7}
          color="#9be7ff"
          map={map}
          transparent
          opacity={0.25}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={linePositions.length / 3} array={linePositions} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial ref={lineMatRef} color="#67e8f9" transparent opacity={0} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </group>
  );
};

/* ------------------------------------------------------------
   Certifications stop — drifting wireframe crystals.
   ------------------------------------------------------------ */
const CrystalField = ({ stop }) => {
  const groupRef = useRef();
  const cx = pathX(stop) - 9;
  const cy = pathY(stop) - 1;
  const cz = pathZ(stop);

  const crystals = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => ({
        pos: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 14],
        scale: 0.5 + Math.random() * 1.1,
        speed: 0.15 + Math.random() * 0.3,
        kind: i % 3,
      })),
    []
  );

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    groupRef.current.children.forEach((mesh, i) => {
      const c = crystals[i];
      mesh.rotation.x = t * c.speed;
      mesh.rotation.y = t * c.speed * 1.4;
      mesh.position.y = c.pos[1] + Math.sin(t * 0.5 + i) * 0.6;
    });
  });

  return (
    <group position={[cx, cy, cz]} ref={groupRef}>
      {crystals.map((c, i) => (
        <mesh key={i} position={c.pos} scale={c.scale}>
          {c.kind === 0 ? (
            <octahedronGeometry args={[1, 0]} />
          ) : c.kind === 1 ? (
            <icosahedronGeometry args={[0.8, 0]} />
          ) : (
            <tetrahedronGeometry args={[0.9, 0]} />
          )}
          <meshStandardMaterial
            color="#1689C8"
            wireframe
            transparent
            opacity={0.5}
            emissive="#1689C8"
            emissiveIntensity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
};

/* ------------------------------------------------------------
   Experience stop — glowing gates you fly straight through,
   one per era of the timeline.
   ------------------------------------------------------------ */
const RingGates = ({ stop }) => {
  const gates = [stop - 0.035, stop, stop + 0.035];
  return (
    <>
      {gates.map((p, i) => (
        <Gate key={i} p={p} index={i} />
      ))}
    </>
  );
};

const Gate = ({ p, index }) => {
  const ref = useRef();
  const z = pathZ(p);

  useFrame(({ clock, camera }) => {
    if (!ref.current) return;
    ref.current.rotation.z = clock.elapsedTime * (0.2 + index * 0.1);
    // Flash brighter just as the camera passes through
    const near = THREE.MathUtils.clamp(1 - Math.abs(camera.position.z - z) / 18, 0, 1);
    ref.current.children.forEach((m) => {
      if (m.material) m.material.opacity = 0.25 + near * 0.75;
    });
  });

  return (
    <group ref={ref} position={[pathX(p), pathY(p), z]}>
      <mesh>
        <torusGeometry args={[3.6, 0.05, 8, 80]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh>
        <torusGeometry args={[3.6, 0.16, 8, 80]} />
        <meshBasicMaterial color="#1689C8" transparent opacity={0.12} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
};

/* ------------------------------------------------------------
   Arrival — a warm destination planet looming at journey's end.
   ------------------------------------------------------------ */
const Destination = () => {
  const cz = -DEPTH - 48;
  return (
    <group position={[pathX(1) * 0.4, -8, cz]}>
      <mesh>
        <sphereGeometry args={[26, 48, 48]} />
        <meshStandardMaterial color="#7a4632" roughness={0.85} emissive="#3d1f14" emissiveIntensity={0.6} />
      </mesh>
      <mesh scale={1.12}>
        <sphereGeometry args={[26, 32, 32]} />
        <meshBasicMaterial color="#ff9a5a" transparent opacity={0.08} side={THREE.BackSide} blending={THREE.AdditiveBlending} />
      </mesh>
      <pointLight color="#ff9a5a" intensity={30} distance={90} position={[0, 20, 30]} />
    </group>
  );
};

/* ------------------------------------------------------------
   Root — fixed full-screen canvas behind all DOM content.
   ------------------------------------------------------------ */
const SpaceJourney = () => {
  const progressRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const circleMap = useMemo(() => createCircleTexture(), []);
  const [stops, setStops] = useState(DEFAULT_STOPS);

  // Measure real section positions once layout (incl. pin spacers) settles
  useEffect(() => {
    const measure = () => setStops(measureStops());
    const t1 = setTimeout(measure, 600);
    const t2 = setTimeout(measure, 2500);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    let raf;
    const tick = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progressRef.current = max > 0 ? THREE.MathUtils.clamp(window.scrollY / max, 0, 1) : 0;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 0], fov: 62, near: 0.1, far: 400 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <CameraRig progressRef={progressRef} mouseRef={mouseRef} />

        <ambientLight intensity={0.5} />
        <directionalLight position={[6, 10, 4]} intensity={1.4} />
        <hemisphereLight skyColor="#b1e1ff" groundColor="#011825" intensity={0.5} />

        <StarTunnel map={circleMap} count={2200} color="#ffffff" size={0.45} opacity={0.65} />
        <StarTunnel map={circleMap} count={700} color="#1689C8" size={0.7} opacity={0.5} />
        <StarTunnel map={circleMap} count={250} color="#67e8f9" size={1.0} opacity={0.4} />

        <Suspense fallback={null}>
          <Astronaut mouseRef={mouseRef} />
        </Suspense>

        <ProjectPlanet stop={stops.projects} />
        <Constellation map={circleMap} stop={stops.skills} />
        <CrystalField stop={stops.certs} />
        <RingGates stop={stops.experience} />
        <Destination />
      </Canvas>
    </div>
  );
};

export default SpaceJourney;
