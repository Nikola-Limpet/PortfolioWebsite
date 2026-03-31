import { useAnimations, useGLTF, Environment, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import spacemanScene from "../assets/3d/spaceman.glb";
import CanvasLoader from "./Loader";

const Spaceman = ({ scale, position, targetRotation }) => {
  const spacemanRef = useRef();
  const { scene, animations } = useGLTF(spacemanScene);
  const { actions } = useAnimations(animations, spacemanRef);

  useEffect(() => {
    if (actions["Idle"]) actions["Idle"].play();
  }, [actions]);

  useFrame(() => {
    if (!spacemanRef.current || !targetRotation.current) return;

    spacemanRef.current.rotation.x = THREE.MathUtils.lerp(
      spacemanRef.current.rotation.x,
      targetRotation.current.x,
      0.05
    );
    spacemanRef.current.rotation.y = THREE.MathUtils.lerp(
      spacemanRef.current.rotation.y,
      targetRotation.current.y + 2.2,
      0.05
    );
  });

  return (
    <mesh ref={spacemanRef} position={position} scale={scale} rotation={[0, 2.2, 0]}>
      <primitive object={scene} />
    </mesh>
  );
};

const SpacemanCanvas = ({ scrollContainer }) => {
  const targetRotation = useRef({ x: 0, y: 0 });
  const [scale, setScale] = useState([2, 2, 2]);
  const [position, setPosition] = useState([0.2, -0.7, 0]);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainer.current) return;
      const scrollTop = scrollContainer.current.scrollTop;
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

      if (scrollContainer.current) {
        const scrollTop = scrollContainer.current.scrollTop;
        targetRotation.current = {
          x: scrollTop * -0.0006 + mouseY * 0.3,
          y: scrollTop * -0.00075 + mouseX * 0.5,
        };
      }
    };

    const container = scrollContainer.current;

    handleResize();

    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [scrollContainer]);

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
          scale={scale}
          position={position}
        />
      </Suspense>
    </Canvas>
  );
};

export default SpacemanCanvas;
