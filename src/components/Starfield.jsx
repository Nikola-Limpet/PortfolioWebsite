import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

// Generates star positions in a hollow sphere shell so stars surround the
// camera without clustering in front of it.
const generatePositions = (count, innerRadius, outerRadius) => {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = innerRadius + Math.random() * (outerRadius - innerRadius);
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
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

const StarLayer = ({ count, innerRadius, outerRadius, size, color, opacity, spinSpeed, velocityRef, map }) => {
  const pointsRef = useRef();
  const positions = useMemo(
    () => generatePositions(count, innerRadius, outerRadius),
    [count, innerRadius, outerRadius]
  );

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    // Base drift + extra spin proportional to scroll velocity
    const boost = velocityRef.current * 0.00004;
    pointsRef.current.rotation.y += delta * spinSpeed + boost;
    pointsRef.current.rotation.x += boost * 0.4;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
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
      />
    </points>
  );
};

const Scene = () => {
  const groupRef = useRef();
  const velocityRef = useRef(0);
  const lastScroll = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });
  const circleMap = useMemo(() => createCircleTexture(), []);

  useFrame(() => {
    // Smoothed scroll velocity (px/frame) shared by all layers
    const y = window.scrollY;
    velocityRef.current = THREE.MathUtils.lerp(velocityRef.current, y - lastScroll.current, 0.08);
    lastScroll.current = y;

    // Gentle mouse parallax on the whole field
    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouse.current.y * 0.06,
        0.03
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        mouse.current.x * 0.04,
        0.03
      );
    }
  });

  // Track mouse via ref so pointer movement never re-renders React
  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <group ref={groupRef}>
      {/* Far layer — small white dust */}
      <StarLayer
        count={900}
        innerRadius={60}
        outerRadius={120}
        size={0.35}
        color="#ffffff"
        opacity={0.5}
        spinSpeed={0.004}
        velocityRef={velocityRef}
        map={circleMap}
      />
      {/* Mid layer — brand blue */}
      <StarLayer
        count={400}
        innerRadius={35}
        outerRadius={70}
        size={0.5}
        color="#1689C8"
        opacity={0.55}
        spinSpeed={0.008}
        velocityRef={velocityRef}
        map={circleMap}
      />
      {/* Near layer — sparse cyan accents */}
      <StarLayer
        count={120}
        innerRadius={20}
        outerRadius={45}
        size={0.8}
        color="#67e8f9"
        opacity={0.45}
        spinSpeed={0.012}
        velocityRef={velocityRef}
        map={circleMap}
      />
    </group>
  );
};

// Fixed full-viewport starfield behind all sections. Sections use
// semi-transparent backgrounds so the stars subtly show through.
const Starfield = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default Starfield;
