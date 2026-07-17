import { useAnimations, useGLTF, Environment, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import spacemanScene from "../assets/3d/spaceman.glb";
import CanvasLoader from "./Loader";

const Spaceman = ({ scale, position, targetRotation, scrollProgress }) => {
  const spacemanRef = useRef();
  const { scene, animations } = useGLTF(spacemanScene);
  const { actions } = useAnimations(animations, spacemanRef);

  useEffect(() => {
    if (actions["Idle"]) actions["Idle"].play();
  }, [actions]);

  useFrame(() => {
    const m = spacemanRef.current;
    if (!m || !targetRotation.current) return;

    // 0 → 1 as the hero scrolls away: the astronaut falls into deep space
    const p = scrollProgress?.current ?? 0;

    // Slow multi-axis tumble builds as it falls (no drag in vacuum)
    m.rotation.x = THREE.MathUtils.lerp(m.rotation.x, targetRotation.current.x + p * 1.3, 0.05);
    m.rotation.y = THREE.MathUtils.lerp(m.rotation.y, targetRotation.current.y + 2.2, 0.05);
    m.rotation.z = THREE.MathUtils.lerp(m.rotation.z, p * 0.7, 0.04);

    // Drift downward and recede on Z — perspective shrinks it naturally
    m.position.x = THREE.MathUtils.lerp(m.position.x, position[0] + p * 1.2, 0.06);
    m.position.y = THREE.MathUtils.lerp(m.position.y, position[1] - p * 5, 0.06);
    m.position.z = THREE.MathUtils.lerp(m.position.z, position[2] - p * 9, 0.06);
  });

  return (
    <mesh ref={spacemanRef} position={position} scale={scale} rotation={[0, 2.2, 0]}>
      <primitive object={scene} />
    </mesh>
  );
};

const SpacemanCanvas = () => {
  const targetRotation = useRef({ x: 0, y: 0 });
  const scrollProgress = useRef(0);
  const [scale, setScale] = useState([2, 2, 2]);
  const [position, setPosition] = useState([0.2, -0.7, 0]);

  useEffect(() => {
    const updateProgress = () => {
      // Fall completes over ~1.2 viewport heights of scrolling
      scrollProgress.current = Math.min(window.scrollY / (window.innerHeight * 1.2), 1);
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      updateProgress();
      targetRotation.current = {
        x: scrollTop * -0.0006,
        y: scrollTop * -0.00075,
      };
    };

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setScale([1, 1, 1]);
        setPosition([0.2, -0.1, 0]);
      } else if (window.innerWidth < 1024) {
        setScale([1.33, 1.33, 1.33]);
        setPosition([0.2, -0.1, 0]);
      } else if (window.innerWidth < 1280) {
        setScale([1.5, 1.5, 1.5]);
        setPosition([0.2, -0.1, 0]);
      } else if (window.innerWidth < 1536) {
        setScale([1.66, 1.66, 1.66]);
        setPosition([0.2, -0.2, 0]);
      } else {
        setScale([2, 2, 2]);
        setPosition([0.2, -0.3, 0]);
      }
    };

    const handleMouseMove = (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = (event.clientY / window.innerHeight) * 2 - 1;
      const scrollTop = window.scrollY;

      targetRotation.current = {
        x: scrollTop * -0.0006 + mouseY * 0.3,
        y: scrollTop * -0.00075 + mouseX * 0.5,
      };
    };

    handleResize();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <Canvas
      className="w-full h-screen bg-transparent z-10"
      camera={{ near: 0.1, far: 1000 }}
      dpr={[1, 2]}
      performance={{ min: 0.5 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={<CanvasLoader />}>
        {/* Key light */}
        <directionalLight position={[1, 1, 1]} intensity={2} />
        {/* Fill light */}
        <ambientLight intensity={0.3} />
        {/* Rim/back light — quaternary color for edge glow */}
        <pointLight position={[-5, 3, -5]} intensity={3} color="#1689C8" />
        {/* Top accent */}
        <spotLight position={[0, 10, 5]} angle={0.3} penumbra={1} intensity={2} />
        {/* Ground bounce with theme color */}
        <hemisphereLight skyColor="#b1e1ff" groundColor="#011825" intensity={0.8} />
        {/* Subtle accent from below */}
        <pointLight position={[0, -3, 2]} intensity={1} color="#0D3056" />

        <Stars radius={100} depth={50} count={800} factor={4} saturation={0} fade speed={1} />
        <Environment preset="night" />

        <Spaceman
          targetRotation={targetRotation}
          scrollProgress={scrollProgress}
          scale={scale}
          position={position}
        />
      </Suspense>
    </Canvas>
  );
};

export default SpacemanCanvas;
