import React from 'react';
import { FaTelegram, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaTelegram, href: "https://t.me/yuujin168", label: "Telegram" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/nikola-limpet-64a68227a/", label: "LinkedIn" },
    { icon: FaGithub, href: "https://github.com/Nikola-Limpet", label: "GitHub" },
    { icon: FaEnvelope, href: "mailto:al9725755@gmail.com", label: "Email" },
  ];

  const navLinks = [
    { href: "#hero", label: "Home" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <footer className="relative bg-[#010d18] overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

      {/* Decorative blur */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-quaternary/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 border-b border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left - CTA Section */}
            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Let's build something
                  <span className="text-quaternary"> amazing</span> together.
                </h3>
                <p className="text-white/50 text-lg mb-8 max-w-md">
                  Have a project in mind? I'm currently available for freelance work and full-time opportunities.
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-quaternary text-white font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-quaternary/30 hover:scale-105"
                >
                  <span>Start a Conversation</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </motion.div>
            </div>

            {/* Right - Links & Social */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-8">
                {/* Navigation */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <h4 className="text-white font-semibold mb-4">Navigation</h4>
                  <ul className="space-y-3">
                    {navLinks.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-white/50 hover:text-quaternary transition-colors duration-300"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Connect */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h4 className="text-white font-semibold mb-4">Connect</h4>
                  <ul className="space-y-3">
                    {socialLinks.map((social) => (
                      <li key={social.label}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/50 hover:text-quaternary transition-colors duration-300 flex items-center gap-2"
                        >
                          <social.icon size={16} />
                          <span>{social.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <span className="text-2xl font-bold text-white">N</span>
            <span className="text-white/30 text-sm">|</span>
            <span className="text-white/50 text-sm">Full Stack Developer</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-white/30 text-sm"
          >
            © {currentYear} Nikola. Crafted with passion.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            {socialLinks.slice(0, 3).map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-white/40 hover:text-quaternary transition-colors duration-300"
                aria-label={social.label}
              >
                <social.icon size={18} />
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
