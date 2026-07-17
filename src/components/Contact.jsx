import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { gsap, ScrollTrigger } from "../utils/gsapUtils";
import emailjs from 'emailjs-com';
import { FaTelegram, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  const form = useRef();
  const sectionRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal on scroll
      gsap.fromTo('.contact-title',
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          }
        }
      );

      // Left panel slide in
      gsap.fromTo('.contact-left',
        { opacity: 0, x: -60 },
        {
          opacity: 1, x: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 35%',
            scrub: 1,
          }
        }
      );

      // Right panel slide in
      gsap.fromTo('.contact-right',
        { opacity: 0, x: 60 },
        {
          opacity: 1, x: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 35%',
            scrub: 1,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.sendForm('service_y05449t', 'template_pnydubb', form.current, 'uXZDSOg9k6lvVXtO0')
      .then((result) => {
        setSent(true);
        setLoading(false);
        form.current.reset();
        setTimeout(() => setSent(false), 5000);
      }, (error) => {
        alert('Failed to send message, please try again later.');
        setLoading(false);
      });
  };

  const socialLinks = [
    { icon: FaTelegram, href: "https://t.me/yuujin168", label: "Telegram", color: "#0088cc" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/nikola-limpet-64a68227a/", label: "LinkedIn", color: "#0077b5" },
    { icon: FaGithub, href: "https://github.com/Nikola-Limpet", label: "GitHub", color: "#ffffff" },
    { icon: FaEnvelope, href: "mailto:al9725755@gmail.com", label: "Email", color: "#ea4335" },
  ];

  return (
    <div ref={sectionRef} className="relative min-h-screen py-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-[#0a1628]/60 to-primary/80 z-0" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-quaternary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />

      <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="contact-title text-center mb-16">
            <h2 className={`${styles.sectionText} mb-4`}>
              <span className="streaky-glow">Let's Connect</span>
            </h2>
            <p className="text-white/50 text-lg max-w-md mx-auto">
              Have a project in mind or want to chat? I'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left side - Social & Quick Info */}
            <div className="contact-left lg:col-span-2 space-y-8">
              {/* Quick connect card */}
              <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-quaternary/20 transition-all duration-500">
                <h3 className="text-xl font-bold text-white mb-6">Quick Connect</h3>
                <div className="space-y-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-3 rounded-xl transition-all duration-300 hover:bg-white/5 group"
                      >
                        <div
                          className="p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-all duration-300"
                          style={{ color: social.color }}
                        >
                          <Icon size={20} />
                        </div>
                        <span className="text-white/70 group-hover:text-white transition-colors">
                          {social.label}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Availability badge */}
              <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-green-500/20 transition-all duration-500">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-green-400 font-medium">Available for work</span>
                </div>
                <p className="text-white/50 text-sm">
                  Currently open to freelance projects and full-time opportunities.
                </p>
              </div>

              {/* Location */}
              <div className="text-white/40 text-sm">
                <span className="block">Based in Cambodia</span>
                <span className="block">UTC+7 Timezone</span>
              </div>
            </div>

            {/* Right side - Contact Form */}
            <div className="contact-right lg:col-span-3">
              <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-quaternary/20 transition-all duration-500">
                {sent ? (
                  <motion.div
                    className="text-center py-16"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-white/60">I'll get back to you as soon as possible.</p>
                  </motion.div>
                ) : (
                  <form ref={form} onSubmit={sendEmail} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white/70 text-sm font-medium mb-2">Name</label>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="Your name"
                          className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-quaternary focus:ring-1 focus:ring-quaternary/50 transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-white/70 text-sm font-medium mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="you@example.com"
                          className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-quaternary focus:ring-1 focus:ring-quaternary/50 transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/70 text-sm font-medium mb-2">Message</label>
                      <textarea
                        name="message"
                        required
                        rows={6}
                        placeholder="Tell me about your project..."
                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-quaternary focus:ring-1 focus:ring-quaternary/50 transition-all duration-300 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="group w-full sm:w-auto px-8 py-4 bg-quaternary text-white font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-quaternary/30 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
