import { useEffect, useRef, useState } from "react";
import { FiPause, FiPlay } from "react-icons/fi";
import useMotionPreference from "../hooks/useMotionPreference";
import { loadUnicorn, portfolioScene } from "../lib/unicorn";

// The owner chose the free still artwork. Live embeds remain an explicit opt-in.
const animationEnabled = import.meta.env.VITE_UNICORN_ANIMATION === "true";

export default function HeroScene() {
  const reduced = useMotionPreference();
  const host = useRef(null);
  const scene = useRef(null);
  const pauseRequested = useRef(false);
  const [paused, setPaused] = useState(false);
  const [state, setState] = useState("loading");

  useEffect(() => {
    if (!animationEnabled || reduced) return;
    let disposed = false;
    let instance;
    const element = document.createElement("div");
    element.className = "unicorn-mount";
    host.current.append(element);
    setState("loading");
    function fail() {
      if (disposed) return;
      disposed = true;
      clearTimeout(timeout);
      scene.current = null;
      instance?.destroy();
      element.remove();
      setState("fallback");
    }
    const timeout = window.setTimeout(fail, 25_000);
    const contextLost = (event) => {
      event.preventDefault();
      fail();
    };
    element.addEventListener("webglcontextlost", contextLost, true);
    loadUnicorn()
      .then((runtime) => {
        if (disposed) return null;
        return runtime.addScene({ ...portfolioScene, element });
      })
      .then((created) => {
        if (!created) return;
        if (disposed) {
          created.destroy();
          return;
        }
        clearTimeout(timeout);
        instance = created;
        scene.current = created;
        created.paused = pauseRequested.current;
        setState("ready");
      })
      .catch(fail);
    return () => {
      disposed = true;
      clearTimeout(timeout);
      element.removeEventListener("webglcontextlost", contextLost, true);
      instance?.destroy();
      scene.current = null;
      element.remove();
    };
  }, [reduced]);

  function toggleMotion() {
    const next = !paused;
    pauseRequested.current = next;
    setPaused(next);
    if (scene.current) scene.current.paused = next;
  }

  const sceneState = !animationEnabled || reduced ? "static" : state;
  const label = reduced
    ? "Reduced motion enabled"
    : state === "fallback"
      ? "Still background"
      : paused
        ? "Resume animation"
        : "Pause animation";

  return (
    <>
      <div className="hero-art" data-scene-state={sceneState}>
        <img
          className="hero-poster"
          src="/artwork/hero.webp"
          srcSet="/artwork/hero-small.webp 768w, /artwork/hero.webp 1536w"
          sizes="(max-width: 760px) 100vw, 50vw"
          alt=""
          width="1536"
          height="1024"
          fetchPriority="high"
        />
        <div
          className={`hero-canvas ${sceneState === "ready" ? "is-ready" : ""}`}
          ref={host}
          aria-hidden="true"
          inert=""
        />
      </div>
      {animationEnabled && (
        <button
          className="motion-control"
          type="button"
          onClick={toggleMotion}
          disabled={reduced || state === "fallback"}
          aria-label={label}
          aria-pressed={paused || reduced}
        >
          {paused || reduced ? (
            <FiPlay aria-hidden="true" />
          ) : (
            <FiPause aria-hidden="true" />
          )}
          <span>
            {reduced || state === "fallback"
              ? "Still mode"
              : paused
                ? "Motion off"
                : "Motion on"}
          </span>
        </button>
      )}
    </>
  );
}
