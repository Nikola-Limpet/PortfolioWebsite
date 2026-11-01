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
  camera.position.set(3.0, 3.0, 8.4);
  camera.lookAt(0, 1.75, 0);
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
  // A real product screen is the centerpiece, rather than unrelated sculpture.
  const display = new THREE.Group();
  display.position.set(0, 2.05, 0);
  assembly.add(display);
  const shell = mesh(
    new THREE.BoxGeometry(4.25, 2.55, 0.15),
    charcoal,
    [0, 0, 0],
    display,
  );
  shell.castShadow = true;
  const screenMaterial = new THREE.MeshBasicMaterial({
    color: "#ffffff",
    toneMapped: false,
  });
  mesh(
    new THREE.PlaneGeometry(4.03, 2.267),
    screenMaterial,
    [0, 0.025, 0.081],
    display,
  );
  mesh(new THREE.CylinderGeometry(0.12, 0.16, 0.7, 32), orange, [0, 0.66, 0]);
  mesh(new THREE.BoxGeometry(1.4, 0.1, 0.75), charcoal, [0, 0.32, 0.05]);
  const textures = new Map();
  const pendingTextures = new Map();
  let currentImage;
  function setProject(image) {
    currentImage = image;
    function apply(texture) {
      if (!texture || disposed || image !== currentImage) return false;
      screenMaterial.map = texture;
      screenMaterial.needsUpdate = true;
      render();
      return true;
    }
    if (textures.has(image)) return Promise.resolve(apply(textures.get(image)));
    if (!pendingTextures.has(image)) {
      const request = new THREE.TextureLoader()
        .loadAsync(image)
        .then((texture) => {
          pendingTextures.delete(image);
          if (disposed) {
            texture.dispose();
            return null;
          }
          texture.encoding = THREE.sRGBEncoding;
          texture.anisotropy = Math.min(
            4,
            renderer.capabilities.getMaxAnisotropy(),
          );
          textures.set(image, texture);
          return texture;
        })
        .catch(() => {
          pendingTextures.delete(image);
          if (!disposed && image === currentImage) onContextLost();
          return null;
        });
      pendingTextures.set(image, request);
    }
    return pendingTextures.get(image).then(apply);
  }

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
      assembly.rotation.y = THREE.MathUtils.lerp(
        assembly.rotation.y,
        targetRotation +
          (pointer === null ? Math.sin(elapsed * 0.5) * 0.035 : 0),
        0.14,
      );
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
    camera.fov = width < height * 0.9 ? 38 : 30;
    camera.updateProjectionMatrix();
    render();
  }
  function rotate(amount) {
    targetRotation = THREE.MathUtils.clamp(targetRotation + amount, -0.7, 0.7);
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
    setProject,
    reset() {
      targetRotation = -0.2;
      assembly.rotation.y = targetRotation;
      render();
    },
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
      textures.forEach((texture) => texture.dispose());
      environment.dispose();
      light.shadow.dispose();
      renderer.dispose();
    },
  };
}
