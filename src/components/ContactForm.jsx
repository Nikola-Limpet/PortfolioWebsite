import { useRef, useState } from "react";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";

export default function ContactForm() {
  const form = useRef();
  const [status, setStatus] = useState("idle");
  async function submit(event) {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.sendForm(
        "service_y05449t",
        "template_pnydubb",
        form.current,
        "uXZDSOg9k6lvVXtO0",
      );
      setStatus("sent");
      form.current.reset();
    } catch {
      setStatus("error");
    }
  }
  return (
    <form
      ref={form}
      className="contact-form"
      onSubmit={submit}
      aria-busy={status === "sending"}
    >
      <h3>Tell me about your idea.</h3>
      <div className="form-row">
        <label htmlFor="contact-name">
          Your name
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            placeholder="Alex"
            required
            maxLength={120}
          />
        </label>
        <label htmlFor="contact-email">
          Email address
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="alex@company.com"
            required
            maxLength={254}
          />
        </label>
      </div>
      <label htmlFor="contact-message">
        What are you working on?
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          placeholder="A little about your project, timeline, or idea…"
          required
          maxLength={5000}
        />
      </label>
      <div aria-live="polite" className={`form-status ${status}`}>
        {status === "sent" && (
          <p>
            <FiCheck /> Message sent. Thanks for getting in touch!
          </p>
        )}
        {status === "error" && (
          <p>That didn’t send. Please try again or email me directly.</p>
        )}
      </div>
      <button
        className="button button-primary"
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending…" : "Send message"}
        <FiArrowUpRight />
      </button>
    </form>
  );
}
