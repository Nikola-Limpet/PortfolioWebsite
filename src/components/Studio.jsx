import { useEffect, useRef, useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiMove,
  FiPause,
  FiPlay,
} from "react-icons/fi";
import useMotionPreference from "../hooks/useMotionPreference";

export default function Studio() {
  const canvas = useRef(null);
  const engine = useRef(null);
  const reduced = useMotionPreference();
  const [paused, setPaused] = useState(false);
  const [state, setState] = useState("loading");
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
          setState("ready");
        } catch {
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

  function rotate(amount) {
    engine.current?.rotate(amount);
  }
  return (
    <div className="studio" data-scene-state={state}>
      <div className="studio-corner top-left" aria-hidden="true" />
      <div className="studio-corner bottom-right" aria-hidden="true" />
      <div className="studio-caption" aria-hidden="true">
        <span>Form follows curiosity.</span>
        <span>Interactive study</span>
      </div>
      {state !== "fallback" && (
        <canvas
          ref={canvas}
          className="sculpture-canvas"
          tabIndex={state === "ready" ? 0 : -1}
          role="img"
          aria-label="Interactive red arch and chrome sculpture. Drag horizontally or use the left and right arrow keys to rotate."
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault();
              rotate(event.key === "ArrowLeft" ? -0.3 : 0.3);
            }
          }}
        />
      )}
      {state !== "ready" && (
        <div
          className="sculpture-fallback"
          role="img"
          aria-label="Red architectural arch with a chrome ring on a studio pedestal"
        >
          <div className="fallback-plinth" />
          <div className="fallback-arch" />
          <div className="fallback-ring" />
          <div className="fallback-ball" />
        </div>
      )}
      <div className="studio-controls">
        <span className="drag-hint">
          <FiMove />{" "}
          {state === "ready"
            ? "Drag to explore"
            : state === "loading"
              ? "Setting the scene"
              : "A study in form"}
        </span>
        <div className="scene-buttons">
          <button
            onClick={() => rotate(-0.35)}
            aria-label="Rotate sculpture left"
            disabled={state !== "ready"}
          >
            <FiArrowLeft />
          </button>
          <button
            onClick={() => rotate(0.35)}
            aria-label="Rotate sculpture right"
            disabled={state !== "ready"}
          >
            <FiArrowRight />
          </button>
          <span className="control-divider" />
          <button
            onClick={() => setPaused((value) => !value)}
            disabled={reduced || state !== "ready"}
            aria-pressed={stopped}
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
  );
}
