const styles = {
  sectionText:
    "text-white font-bold md:text-[80px] sm:text-[50px] text-[40px]",

  // Hover utilities
  hoverCard:
    "transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl hover:shadow-quaternary/10",
  hoverButton:
    "transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-quaternary/30",

  // Glassmorphism
  glassCard:
    "bg-black/30 backdrop-blur-sm border border-tertiary/30 hover:border-quaternary/50 transition-all duration-300",

  // Form inputs
  inputBase:
    "bg-black/30 backdrop-blur-sm p-4 text-white border border-tertiary/50 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:border-quaternary focus:ring-2 focus:ring-quaternary/30 placeholder:text-white/40",

  // Focus states
  focusRing:
    "focus:outline-none focus:ring-2 focus:ring-quaternary/30 focus:border-quaternary",
};

export { styles };
