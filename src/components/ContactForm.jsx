import { useRef, useState } from "react";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";

export default function ContactForm() {
  const form = useRef(null);
  const busy = useRef(false);
  const [status, setStatus] = useState("idle");
  async function submit(event) {
    event.preventDefault();
    if (busy.current) return;
    const values = Object.fromEntries(new FormData(form.current));
    busy.current = true;
    setStatus("sending");
    try {
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.send(
        "service_y05449t",
        "template_pnydubb",
        values,
        "uXZDSOg9k6lvVXtO0",
      );
      form.current.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    } finally {
      busy.current = false;
    }
  }
  return (
    <form
      className="contact-form"
      ref={form}
      onSubmit={submit}
      aria-busy={status === "sending"}
    >
      <div className="form-row">
        <label htmlFor="contact-name">
          Your name
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            placeholder="How should I call you?"
            required
            maxLength={120}
            disabled={status === "sending"}
          />
        </label>
        <label htmlFor="contact-email">
          Email address
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            required
            maxLength={254}
            disabled={status === "sending"}
          />
        </label>
      </div>
      <label htmlFor="contact-message">
        Your project
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          placeholder="Tell me a little about what you have in mind…"
          required
          maxLength={5000}
          disabled={status === "sending"}
        />
      </label>
      <div className={`form-status ${status}`} role="status">
        {status === "sent" && (
          <p>
            <FiCheck /> Message sent. I’ll be in touch soon.
          </p>
        )}
        {status === "error" && (
          <p>
            Your message could not be sent. Try again or{" "}
            <a href="mailto:al9725755@gmail.com">email me directly</a>.
          </p>
        )}
      </div>
      <button
        className="button button-dark"
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending…" : "Send message"}
        <FiArrowUpRight />
      </button>
    </form>
  );
}
