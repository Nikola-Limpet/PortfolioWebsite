import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import {
  Component,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";
import astronautAsset from "../assets/3d/spaceman.glb";

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorld;
  void main() {
    vUv = uv;
    vNormal = normalize(mat3(modelMatrix) * normal);
    vPosition = position;
    vWorld = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const planetFragment = `
  varying vec3 vNormal; varying vec3 vPosition; varying vec3 vWorld;
  varying vec2 vUv;
  uniform sampler2D uSurface;
  uniform vec3 uTint;
  void main() {
    vec3 n = normalize(vNormal);
    vec3 view = normalize(cameraPosition-vWorld);
    vec3 light = normalize(vec3(-3.5,5.0,4.0));
    vec3 surface = texture2D(uSurface, vUv).rgb * uTint;
    float diffuse = max(dot(n,light),0.0);
    vec3 color = surface * (0.035+pow(diffuse,0.85)*1.35);
    float rim = pow(1.0-max(dot(n,view),0.0),3.8);
    color += vec3(0.36,0.64,0.76)*rim*pow(diffuse,0.5)*0.7;
    float visibility = 1.0-smoothstep(14.0,36.0,length(cameraPosition-vWorld));
    if(visibility < 0.01) discard;
    gl_FragColor = vec4(color,visibility);
  }
`;
const ringFragment = `
  varying vec3 vPosition; varying vec3 vWorld; varying vec3 vNormal;
  uniform vec3 uCenter;
  uniform float uRadius;
  void main() {
    float r = length(vPosition.xy);
    float bands = sin(r*155.0)*0.16 + sin(r*390.0)*0.08 + sin(r*48.0)*0.12;
    float alpha = (0.47+bands)*smoothstep(2.35,2.48,r)*(1.0-smoothstep(3.92,4.12,r));
    alpha *= 1.0-smoothstep(0.018,0.04,0.04-abs(r-3.26))*0.92;
    vec3 light = normalize(vec3(-3.5,5.0,4.0));
    float projection = dot(vWorld-uCenter,light);
    float distanceToRay = length(vWorld-uCenter-light*projection);
    float shadow = projection < 0.0 ? smoothstep(uRadius-0.05,uRadius+0.05,distanceToRay) : 1.0;
    vec3 color = mix(vec3(0.30,0.37,0.39),vec3(0.73,0.74,0.66),0.5+bands);
    color *= mix(0.08,1.0,shadow);
    float visibility = 1.0-smoothstep(14.0,36.0,length(cameraPosition-vWorld));
    gl_FragColor = vec4(color,alpha*visibility);
  }
`;

const STOP_IDS = [
  "hero",
  "projects",
  "work-0",
  "work-1",
  "work-2",
  "work-3",
  "about",
  "experience",
  "contact",
];
const FLIGHT_PATH = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 0, 11),
  new THREE.Vector3(0.5, 0.2, 1),
  new THREE.Vector3(0.6, -0.3, -10),
  new THREE.Vector3(-0.8, 0.4, -20),
  new THREE.Vector3(0, -0.3, -29),
  new THREE.Vector3(1, 0.2, -38),
  new THREE.Vector3(0.4, 0, -47),
  new THREE.Vector3(0, 0, -56),
  new THREE.Vector3(0, 0, -68),
]);

function FlightRig({ paused }) {
  const { camera } = useThree();
  const stops = useRef([]);
  const smoothProgress = useRef(null);
  const point = useMemo(() => new THREE.Vector3(), []);
  useEffect(() => {
    let frame;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        stops.current = STOP_IDS.map((id) => {
          const element = document.getElementById(id);
          return Math.max(
            0,
            element.getBoundingClientRect().top +
              window.scrollY -
              (id === "hero" ? 0 : window.innerHeight * 0.12),
          );
        });
      });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    window.addEventListener("resize", measure);
    measure();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(frame);
    };
  }, []);
  useFrame((state, delta) => {
    if (paused || stops.current.length !== STOP_IDS.length) return;
    const scroll = window.scrollY;
    let index = 0;
    while (
      index < stops.current.length - 2 &&
      scroll >= stops.current[index + 1]
    )
      index++;
    const local = THREE.MathUtils.clamp(
      (scroll - stops.current[index]) /
        Math.max(1, stops.current[index + 1] - stops.current[index]),
      0,
      1,
    );
    const target = (index + local) / (STOP_IDS.length - 1);
    smoothProgress.current =
      smoothProgress.current === null
        ? target
        : THREE.MathUtils.damp(
            smoothProgress.current,
            target,
            5,
            Math.min(delta, 0.08),
          );
    FLIGHT_PATH.getPoint(smoothProgress.current, point);
    camera.position.copy(point);
    camera.lookAt(
      point.x + state.pointer.x * 0.2,
      point.y + state.pointer.y * 0.12,
      point.z - 12,
    );
  });
  return null;
}

function RingedPlanet({ position, scale = 1, tint = "#ffffff", paused }) {
  const surface = useLoader(THREE.TextureLoader, "/space/planet-surface.webp");
  const planet = useRef();
  const ringUniforms = useMemo(
    () => ({
      uCenter: { value: new THREE.Vector3(...position) },
      uRadius: { value: 1.85 * scale },
    }),
    [position, scale],
  );
  const surfaceUniforms = useMemo(
    () => ({
      uSurface: { value: surface },
      uTint: { value: new THREE.Color(tint) },
    }),
    [surface, tint],
  );
  useFrame((_, delta) => {
    if (!paused && planet.current)
      planet.current.rotation.y += Math.min(delta, 0.08) * 0.035;
  });
  return (
    <group position={position} scale={scale} rotation={[0.12, 0, -0.32]}>
      <mesh ref={planet} rotation={[0, 0, 0.15]}>
        <sphereGeometry args={[1.85, 72, 48]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={planetFragment}
          transparent
          uniforms={surfaceUniforms}
        />
      </mesh>
      <mesh rotation={[-1.12, 0, 0]}>
        <ringGeometry args={[2.36, 4.12, 192, 1]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={ringFragment}
          uniforms={ringUniforms}
          transparent
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function StarCorridor() {
  const positions = useMemo(() => {
    let seed = 73;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    const array = new Float32Array(1800 * 3);
    for (let i = 0; i < 1800; i++) {
      const angle = random() * Math.PI * 2;
      const radius = 5 + random() * 35;
      array.set(
        [
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          20 - random() * 155,
        ],
        i * 3,
      );
    }
    return array;
  }, []);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.027}
        color="#c8d6dc"
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function Asteroids() {
  const mesh = useRef();
  useEffect(() => {
    const object = new THREE.Object3D();
    for (let i = 0; i < 48; i++) {
      const angle = i * 2.39996;
      const radius = 6 + (i % 7) * 0.9;
      object.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        -24 - i * 0.5,
      );
      object.rotation.set(i * 0.34, i * 0.71, i * 0.12);
      object.scale.setScalar(0.18 + (i % 5) * 0.09);
      object.updateMatrix();
      mesh.current.setMatrixAt(i, object.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  }, []);
  return (
    <instancedMesh ref={mesh} args={[null, null, 48]}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial color="#35414a" roughness={0.95} />
    </instancedMesh>
  );
}

function Satellite({ position, paused }) {
  const group = useRef();
  useFrame((_, delta) => {
    if (!paused) group.current.rotation.y += Math.min(delta, 0.08) * 0.065;
  });
  return (
    <group ref={group} position={position} rotation={[0.25, -0.4, -0.25]}>
      <mesh>
        <cylinderGeometry args={[0.65, 0.65, 1.9, 16]} />
        <meshStandardMaterial
          color="#b79d61"
          metalness={0.75}
          roughness={0.35}
        />
      </mesh>
      <mesh position={[0, 1.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <sphereGeometry
          args={[0.75, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.38]}
        />
        <meshStandardMaterial
          color="#c4cdcf"
          metalness={0.7}
          roughness={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.055, 0.055, 6.8, 8]} />
        <meshStandardMaterial color="#a2a9a9" metalness={0.8} roughness={0.3} />
      </mesh>
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 2.2, 0, 0]}>
          <mesh>
            <boxGeometry args={[2.8, 1.6, 0.08]} />
            <meshStandardMaterial
              color="#172c3e"
              metalness={0.6}
              roughness={0.32}
            />
          </mesh>
          {Array.from({ length: 7 }, (_, i) => (
            <mesh key={i} position={[-1.3 + i * 0.43, 0, 0.047]}>
              <boxGeometry args={[0.012, 1.58, 0.012]} />
              <meshBasicMaterial color="#8cabad" />
            </mesh>
          ))}
          {[-0.75, 0, 0.75].map((y) => (
            <mesh key={y} position={[0, y, 0.047]}>
              <boxGeometry args={[2.8, 0.012, 0.012]} />
              <meshBasicMaterial color="#8cabad" />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function OrbitGate() {
  return (
    <group position={[1.8, 0.4, -65]} rotation={[0.2, -0.25, 0.35]}>
      <mesh>
        <torusGeometry args={[3.7, 0.065, 8, 128]} />
        <meshStandardMaterial
          color="#b6bfba"
          metalness={0.75}
          roughness={0.3}
        />
      </mesh>
      <mesh>
        <torusGeometry args={[3.88, 0.025, 8, 128]} />
        <meshBasicMaterial color="#65796d" />
      </mesh>
      {Array.from({ length: 8 }, (_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI) / 4) * 3.7,
            Math.sin((i * Math.PI) / 4) * 3.7,
            0,
          ]}
          rotation={[0, 0, (i * Math.PI) / 4]}
        >
          <boxGeometry args={[0.3, 0.15, 0.15]} />
          <meshStandardMaterial
            color="#b1a483"
            metalness={0.8}
            roughness={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

function Astronaut({ paused, narrow }) {
  const gltf = useLoader(GLTFLoader, astronautAsset);
  const group = useRef();
  const { model, center, scale, mixer } = useMemo(() => {
    const model = clone(gltf.scene);
    model.traverse((object) => {
      if (!object.isMesh) return;
      const material = new THREE.MeshStandardMaterial({
        map: object.material.map,
        color: "#b9c7c5",
        roughness: 0.65,
        metalness: 0.25,
      });
      material.onBeforeCompile = (shader) => {
        shader.fragmentShader = shader.fragmentShader.replace(
          "#include <map_fragment>",
          `#include <map_fragment>
          float suitTone = dot(diffuseColor.rgb, vec3(0.2126, 0.7152, 0.0722));
          diffuseColor.rgb = mix(vec3(suitTone), diffuseColor.rgb, 0.08);`,
        );
      };
      object.material = material;
    });
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const scale = 4.5 / Math.max(size.x, size.y, size.z);
    return {
      model,
      center: box.getCenter(new THREE.Vector3()).multiplyScalar(-scale),
      scale,
      mixer: new THREE.AnimationMixer(model),
    };
  }, [gltf]);
  useEffect(() => {
    if (gltf.animations[0]) mixer.clipAction(gltf.animations[0]).play();
    return () => {
      mixer.stopAllAction();
      mixer.uncacheRoot(model);
    };
  }, [gltf, mixer, model]);
  useFrame((_, delta) => {
    if (paused) return;
    const dt = Math.min(delta, 0.08);
    mixer.update(dt);
    group.current.rotation.z += dt * 0.025;
  });
  return (
    <group
      ref={group}
      position={[narrow ? 2.4 : 4.1, -0.2, -40]}
      rotation={[0.1, -0.45, -0.2]}
    >
      <primitive object={model} position={center} scale={scale} />
    </group>
  );
}

function World({ paused }) {
  const narrow = useThree((state) => state.size.width < 900);
  const [loadCharacter, setLoadCharacter] = useState(false);
  useEffect(() => {
    const firstProject = document.getElementById("work-0");
    if (!firstProject) return;
    if (firstProject.getBoundingClientRect().top < window.innerHeight * 2) {
      setLoadCharacter(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadCharacter(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100% 0px" },
    );
    observer.observe(firstProject);
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <fog attach="fog" args={["#090e12", 14, 36]} />
      <FlightRig paused={paused} />
      <StarCorridor />
      <RingedPlanet
        position={narrow ? [1.1, -2.2, 0] : [4.2, 0, 0]}
        scale={narrow ? 0.65 : 1.05}
        paused={paused}
      />
      <RingedPlanet
        position={narrow ? [2.8, 0.8, -27] : [5, 1.1, -27]}
        scale={0.9}
        tint="#bbcbe0"
        paused={paused}
      />
      <Asteroids />
      {loadCharacter && (
        <Suspense fallback={null}>
          <Astronaut paused={paused} narrow={narrow} />
        </Suspense>
      )}
      <Satellite
        position={narrow ? [-1.4, 2, -59] : [-3.5, 0, -59]}
        paused={paused}
      />
      <OrbitGate />
      <RingedPlanet
        position={[0, -7, -86]}
        scale={3.8}
        tint="#e2b286"
        paused={paused}
      />
      <ambientLight intensity={0.22} />
      <directionalLight position={[-3, 5, 4]} intensity={2.2} />
      <directionalLight
        position={[5, -2, -30]}
        intensity={0.5}
        color="#7499b5"
      />
    </>
  );
}

class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function FrameDriver({ running }) {
  const invalidate = useThree((state) => state.invalidate);
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(invalidate, 1000 / 30);
    return () => clearInterval(timer);
  }, [running, invalidate]);
  return null;
}

function ContextGuard({ onFailure }) {
  const gl = useThree((state) => state.gl);
  useEffect(() => {
    gl.domElement.addEventListener("webglcontextlost", onFailure);
    return () =>
      gl.domElement.removeEventListener("webglcontextlost", onFailure);
  }, [gl, onFailure]);
  return null;
}

export default function SpaceJourney({ paused }) {
  const [visible, setVisible] = useState(!document.hidden);
  const [webgl, setWebgl] = useState(false);
  const [ready, setReady] = useState(false);
  const onFailure = useCallback(() => {
    setReady(false);
    setWebgl(false);
  }, []);
  useEffect(() => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl2") || canvas.getContext("webgl");
    setWebgl(Boolean(context));
    context?.getExtension("WEBGL_lose_context")?.loseContext();
    const visibility = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", visibility);
    return () => document.removeEventListener("visibilitychange", visibility);
  }, []);
  return (
    <div
      className={`space-scene${ready ? " scene-ready" : ""}`}
      aria-hidden="true"
    >
      <div className="planet-fallback" />
      {webgl && (
        <SceneBoundary onFailure={onFailure}>
          <Canvas
            dpr={[1, 1.25]}
            frameloop="demand"
            camera={{ position: [0, 0, 11], fov: 45, near: 0.1, far: 180 }}
            gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
            onCreated={({ gl }) => {
              gl.setClearColor(0x000000, 0);
              setReady(true);
            }}
          >
            <FrameDriver running={!paused && visible} />
            <World paused={paused || !visible} />
            <ContextGuard onFailure={onFailure} />
          </Canvas>
        </SceneBoundary>
      )}
    </div>
  );
}
