import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

THREE.ColorManagement.legacyMode = false;

// Procedural geometry keeps the studio independent of external model/CDN requests.
export function createSculpture(canvas, onContextLost) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.95;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 60);
  camera.position.set(6.5, 4.2, 8.8);
  camera.lookAt(0, 1.35, 0);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, 0.04);
  scene.environment = environment.texture;
  room.dispose();
  pmrem.dispose();

  const assembly = new THREE.Group();
  assembly.rotation.y = -0.2;
  scene.add(assembly);
  const porcelain = new THREE.MeshStandardMaterial({
    color: "#e4dfd4",
    roughness: 0.72,
    envMapIntensity: 0.55,
  });
  const orange = new THREE.MeshPhysicalMaterial({
    color: "#e44b2a",
    roughness: 0.28,
    metalness: 0.05,
    clearcoat: 0.35,
    envMapIntensity: 0.55,
  });
  const chrome = new THREE.MeshStandardMaterial({
    color: "#ededed",
    metalness: 1,
    roughness: 0.14,
  });
  const charcoal = new THREE.MeshStandardMaterial({
    color: "#252a28",
    roughness: 0.28,
    metalness: 0.3,
    envMapIntensity: 0.7,
  });

  function mesh(geometry, material, position, parent = assembly) {
    const object = new THREE.Mesh(geometry, material);
    object.position.set(...position);
    object.castShadow = true;
    object.receiveShadow = true;
    parent.add(object);
    return object;
  }
  const plinth = mesh(
    new THREE.CylinderGeometry(2.25, 2.3, 0.25, 80),
    porcelain,
    [0, 0.125, 0],
  );
  plinth.receiveShadow = true;
  const arch = new THREE.Shape();
  arch.moveTo(-1.22, 0);
  arch.lineTo(-1.22, 1.46);
  arch.absarc(0, 1.46, 1.22, Math.PI, 0, true);
  arch.lineTo(1.22, 0);
  arch.lineTo(0.56, 0);
  arch.lineTo(0.56, 1.46);
  arch.absarc(0, 1.46, 0.56, 0, Math.PI, false);
  arch.lineTo(-0.56, 0);
  arch.closePath();
  const archGeometry = new THREE.ExtrudeGeometry(arch, {
    depth: 0.68,
    bevelEnabled: true,
    bevelSegments: 5,
    steps: 1,
    bevelSize: 0.08,
    bevelThickness: 0.08,
    curveSegments: 40,
  });
  const archMesh = mesh(archGeometry, orange, [-0.55, 0.34, -0.45]);
  archMesh.rotation.y = -0.16;
  const ring = mesh(
    new THREE.TorusGeometry(0.83, 0.225, 32, 100),
    chrome,
    [1.08, 2.4, 0.2],
  );
  ring.rotation.set(0.45, 0.45, -0.4);
  mesh(new THREE.SphereGeometry(0.48, 40, 32), charcoal, [1.13, 0.73, 0.7]);
  const pearl = mesh(
    new THREE.SphereGeometry(0.25, 32, 24),
    porcelain,
    [-0.7, 3.35, -0.1],
  );
  const smallRing = mesh(
    new THREE.TorusGeometry(0.36, 0.09, 20, 60),
    orange,
    [-1.25, 0.35, 1.0],
  );
  smallRing.rotation.x = Math.PI / 2;

  const floor = mesh(
    new THREE.PlaneGeometry(200, 200),
    new THREE.ShadowMaterial({ opacity: 0.12 }),
    [0, -0.015, 0],
    scene,
  );
  floor.rotation.x = -Math.PI / 2;
  floor.castShadow = false;
  scene.add(new THREE.HemisphereLight("#ffffff", "#d6c4ae", 0.5));
  const light = new THREE.DirectionalLight("#fff5e5", 1.7);
  light.position.set(-3, 7, 5);
  light.castShadow = true;
  light.shadow.mapSize.set(1024, 1024);
  Object.assign(light.shadow.camera, {
    left: -5,
    right: 5,
    top: 6,
    bottom: -5,
    near: 0.5,
    far: 20,
  });
  light.shadow.normalBias = 0.035;
  light.shadow.bias = -0.0002;
  light.shadow.radius = 4;
  scene.add(light);
  const fill = new THREE.DirectionalLight("#ffffff", 0.8);
  fill.position.set(5, 3, -3);
  scene.add(fill);

  let disposed = false;
  let lost = false;
  let paused = false;
  let visible = true;
  let frame = 0;
  let previousTime = 0;
  let elapsed = 0;
  let targetRotation = -0.2;
  let pointer = null;

  function render() {
    if (!disposed && !lost) renderer.render(scene, camera);
  }
  function tick(time) {
    frame = 0;
    if (disposed || lost || paused || !visible || document.hidden) return;
    const delta = previousTime
      ? Math.min((time - previousTime) / 1000, 0.05)
      : 0;
    if (delta >= 1 / 32 || !previousTime) {
      elapsed += delta;
      previousTime = time;
      if (pointer === null) targetRotation += delta * 0.035;
      assembly.rotation.y = THREE.MathUtils.lerp(
        assembly.rotation.y,
        targetRotation,
        0.14,
      );
      ring.position.y = 2.4 + Math.sin(elapsed * 0.7) * 0.075;
      pearl.position.y = 3.35 + Math.sin(elapsed * 0.8 + 1) * 0.09;
      render();
    }
    frame = requestAnimationFrame(tick);
  }
  function schedule() {
    cancelAnimationFrame(frame);
    frame = 0;
    previousTime = 0;
    if (!disposed && !lost && !paused && visible && !document.hidden)
      frame = requestAnimationFrame(tick);
  }
  function resize() {
    const { width, height } = canvas.getBoundingClientRect();
    if (!width || !height || disposed || lost) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.fov = width < height * 0.9 ? 42 : 35;
    camera.updateProjectionMatrix();
    render();
  }
  function rotate(amount) {
    targetRotation += amount;
    assembly.rotation.y = targetRotation;
    render();
  }
  function down(event) {
    if (!event.isPrimary || event.button !== 0) return;
    pointer = { id: event.pointerId, x: event.clientX };
    canvas.setPointerCapture(event.pointerId);
    canvas.classList.add("is-dragging");
  }
  function move(event) {
    if (!pointer || pointer.id !== event.pointerId) return;
    rotate((event.clientX - pointer.x) * 0.008);
    pointer.x = event.clientX;
  }
  function up(event) {
    if (!pointer || pointer.id !== event.pointerId) return;
    pointer = null;
    canvas.classList.remove("is-dragging");
    if (canvas.hasPointerCapture(event.pointerId))
      canvas.releasePointerCapture(event.pointerId);
  }
  function contextLost(event) {
    event.preventDefault();
    lost = true;
    cancelAnimationFrame(frame);
    onContextLost();
  }
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  const intersection = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      schedule();
    },
    { threshold: 0 },
  );
  intersection.observe(canvas);
  const listeners = [
    ["pointerdown", down],
    ["pointermove", move],
    ["pointerup", up],
    ["pointercancel", up],
    ["lostpointercapture", up],
    ["webglcontextlost", contextLost],
  ];
  listeners.forEach(([type, listener]) =>
    canvas.addEventListener(type, listener),
  );
  document.addEventListener("visibilitychange", schedule);
  resize();
  schedule();

  return {
    rotate,
    setPaused(value) {
      paused = value;
      schedule();
      render();
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      listeners.forEach(([type, listener]) =>
        canvas.removeEventListener(type, listener),
      );
      document.removeEventListener("visibilitychange", schedule);
      const geometries = new Set();
      const materials = new Set();
      scene.traverse((object) => {
        if (object.geometry) geometries.add(object.geometry);
        if (object.material) materials.add(object.material);
      });
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      environment.dispose();
      light.shadow.dispose();
      renderer.dispose();
    },
  };
}
