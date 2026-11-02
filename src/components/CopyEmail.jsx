import { useEffect, useRef, useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";

export default function CopyEmail() {
  const [status, setStatus] = useState("idle");
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText("al9725755@gmail.com");
      setStatus("copied");
      timer.current = setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="copy-email">
      <button
        className="copy-button"
        type="button"
        onClick={copy}
        aria-label={status === "copied" ? "Email copied" : "Copy email address"}
      >
        {status === "copied" ? (
          <FiCheck aria-hidden="true" />
        ) : (
          <FiCopy aria-hidden="true" />
        )}
        <span>{status === "copied" ? "Copied!" : "Copy email"}</span>
      </button>
      <span className="copy-feedback" aria-live="polite">
        {status === "error"
          ? "Couldn't copy. Select the email address above to copy it manually."
          : status === "copied"
            ? "Email address copied."
            : ""}
      </span>
    </div>
  );
}
