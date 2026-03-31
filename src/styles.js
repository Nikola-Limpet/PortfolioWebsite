const styles = {
  // Section headings — uses Sora display font via CSS
  sectionText:
    "text-white font-bold text-section tracking-tight",

  // Hover utilities
  hoverCard:
    "transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-xl hover:shadow-quaternary/10",
  hoverButton:
    "transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-quaternary/30",

  // Glassmorphism - refined with stronger blur
  glassCard:
    "bg-black/20 backdrop-blur-xl border border-white/[0.08] hover:border-quaternary/30 transition-all duration-500 rounded-2xl",

  // Form inputs
  inputBase:
    "bg-black/30 backdrop-blur-sm p-4 text-white border border-white/10 rounded-xl font-medium transition-all duration-300 focus:outline-none focus:border-quaternary focus:ring-2 focus:ring-quaternary/30 placeholder:text-white/30",

  // Focus states
  focusRing:
    "focus:outline-none focus:ring-2 focus:ring-quaternary/30 focus:border-quaternary",

  // Section container — consistent across all sections
  sectionContainer:
    "container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16",
};

export { styles };
