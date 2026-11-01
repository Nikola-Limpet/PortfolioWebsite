import { useEffect, useRef, useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
  FiPause,
  FiPlay,
  FiRotateCcw,
} from "react-icons/fi";
import useMotionPreference from "../hooks/useMotionPreference";
import { projects } from "../data";

export default function Studio({ onOpenProject }) {
  const canvas = useRef(null);
  const engine = useRef(null);
  const reduced = useMotionPreference();
  const [paused, setPaused] = useState(false);
  const [state, setState] = useState("loading");
  const [index, setIndex] = useState(0);
  const project = projects[index];
  const projectRef = useRef(project);
  projectRef.current = project;
  const stopped = reduced || paused;
  const stoppedRef = useRef(stopped);
  stoppedRef.current = stopped;

  useEffect(() => {
    let cancelled = false;
    import("../lib/sculpture")
      .then(({ createSculpture }) => {
        if (cancelled) return;
        try {
          engine.current = createSculpture(canvas.current, () => {
            engine.current?.dispose();
            engine.current = null;
            setState("fallback");
          });
          engine.current.setPaused(stoppedRef.current);
          const scene = engine.current;
          scene.setProject(projectRef.current.image).then((updated) => {
            if (updated && !cancelled && engine.current === scene)
              setState("ready");
          });
        } catch {
          engine.current?.dispose();
          engine.current = null;
          setState("fallback");
        }
      })
      .catch(() => {
        if (!cancelled) setState("fallback");
      });
    return () => {
      cancelled = true;
      engine.current?.dispose();
      engine.current = null;
    };
  }, []);
  useEffect(() => {
    engine.current?.setPaused(stopped);
  }, [stopped]);
  useEffect(() => {
    const scene = engine.current;
    if (!scene) return;
    setState("loading");
    scene.setProject(project.image).then((updated) => {
      if (updated && engine.current === scene) setState("ready");
    });
  }, [project]);

  function rotate(amount) {
    engine.current?.rotate(amount);
  }
  return (
    <section
      className="studio"
      data-scene-state={state}
      aria-label="Interactive project viewer"
    >
      <div className="studio-stage">
        <div className="studio-label">
          <span>Built by Nikola</span>
          <span>
            {index + 1} / {projects.length}
          </span>
        </div>
        {state !== "fallback" && (
          <canvas
            ref={canvas}
            className="sculpture-canvas"
            tabIndex={state === "ready" ? 0 : -1}
            role="img"
            aria-label={`Interactive 3D preview of ${project.name}. Drag or use left and right arrow keys to rotate.`}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                event.preventDefault();
                rotate(event.key === "ArrowLeft" ? -0.25 : 0.25);
              }
              if (event.key === "Home") {
                event.preventDefault();
                engine.current?.reset();
              }
            }}
          />
        )}
        {state !== "ready" && (
          <div className="studio-poster">
            <img
              src={project.image}
              alt={`${project.name} website preview`}
              width="1280"
              height="720"
            />
          </div>
        )}
        <div className="studio-controls">
          <span className="drag-hint">
            {state === "ready"
              ? "Drag to rotate"
              : state === "loading"
                ? "Loading 3D preview…"
                : "Project preview"}
          </span>
          <div className="scene-buttons">
            <button
              onClick={() => rotate(-0.25)}
              aria-label="Rotate sculpture left"
              title="Rotate left"
              disabled={state !== "ready"}
            >
              <FiArrowLeft />
            </button>
            <button
              onClick={() => rotate(0.25)}
              aria-label="Rotate sculpture right"
              title="Rotate right"
              disabled={state !== "ready"}
            >
              <FiArrowRight />
            </button>
            <button
              onClick={() => engine.current?.reset()}
              aria-label="Reset view"
              title="Reset view"
              disabled={state !== "ready"}
            >
              <FiRotateCcw />
            </button>
            <button
              onClick={() => setPaused((value) => !value)}
              disabled={reduced || state !== "ready"}
              aria-pressed={stopped}
              title={
                reduced
                  ? "Reduced motion enabled"
                  : paused
                    ? "Resume animation"
                    : "Pause animation"
              }
              aria-label={
                reduced
                  ? "Reduced motion enabled"
                  : paused
                    ? "Resume animation"
                    : "Pause animation"
              }
            >
              {stopped ? <FiPlay /> : <FiPause />}
            </button>
          </div>
        </div>
      </div>
      <div className="studio-project">
        <div className="studio-project-title" aria-live="polite">
          <h2>{project.name}</h2>
          <p>{project.tagline}</p>
        </div>
        <div className="project-pagination">
          <button
            onClick={() =>
              setIndex(
                (value) => (value - 1 + projects.length) % projects.length,
              )
            }
            aria-label="Previous project"
          >
            <FiArrowLeft />
          </button>
          <button
            onClick={() => setIndex((value) => (value + 1) % projects.length)}
            aria-label="Next project"
          >
            <FiArrowRight />
          </button>
        </div>
        <button
          className="studio-project-link"
          onClick={(event) => onOpenProject(project, event)}
        >
          View project details <FiArrowUpRight />
        </button>
      </div>
    </section>
  );
}
