import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

const Shape = ({ geometry, position, scale, speed, color }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    meshRef.current.rotation.x = t * 0.4;
    meshRef.current.rotation.y = t * 0.6;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.3;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {geometry}
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.15}
        wireframe
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  );
};

const FloatingShapes = ({ variant = "default", className = "" }) => {
  const shapes = useMemo(() => {
    const configs = {
      default: [
        { geo: <octahedronGeometry args={[1, 0]} />, pos: [-3, 0, -2], scale: 0.8, speed: 0.3, color: "#1689C8" },
        { geo: <torusGeometry args={[0.8, 0.2, 16, 32]} />, pos: [3, 1, -3], scale: 0.6, speed: 0.4, color: "#0D3056" },
        { geo: <icosahedronGeometry args={[0.7, 0]} />, pos: [0, -1, -4], scale: 0.5, speed: 0.25, color: "#1689C8" },
      ],
      sparse: [
        { geo: <octahedronGeometry args={[1, 0]} />, pos: [-4, 0, -3], scale: 0.6, speed: 0.2, color: "#1689C8" },
        { geo: <dodecahedronGeometry args={[0.6, 0]} />, pos: [4, 1, -4], scale: 0.5, speed: 0.3, color: "#0D3056" },
      ],
      dense: [
        { geo: <octahedronGeometry args={[1, 0]} />, pos: [-3, 1, -2], scale: 0.7, speed: 0.3, color: "#1689C8" },
        { geo: <torusGeometry args={[0.6, 0.15, 16, 32]} />, pos: [2.5, -0.5, -3], scale: 0.5, speed: 0.4, color: "#0D3056" },
        { geo: <icosahedronGeometry args={[0.5, 0]} />, pos: [-1, -1.5, -4], scale: 0.4, speed: 0.25, color: "#1689C8" },
        { geo: <tetrahedronGeometry args={[0.6, 0]} />, pos: [4, 0.5, -2], scale: 0.5, speed: 0.35, color: "#06B6D4" },
        { geo: <torusKnotGeometry args={[0.4, 0.1, 64, 8, 2, 3]} />, pos: [-4, 1.5, -5], scale: 0.3, speed: 0.2, color: "#1689C8" },
      ],
    };
    return configs[variant] || configs.default;
  }, [variant]);

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={0.5} color="#1689C8" />
          <pointLight position={[-5, -5, 3]} intensity={0.3} color="#0D3056" />

          {shapes.map((shape, i) => (
            <Shape
              key={i}
              geometry={shape.geo}
              position={shape.pos}
              scale={shape.scale}
              speed={shape.speed}
              color={shape.color}
            />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default FloatingShapes;
