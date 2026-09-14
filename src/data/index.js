export const navLinks = [
  {
    id: "hero",
    title: "Home",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "skills",
    title: "Skills",
  },
  {
    id: "certifications",
    title: "Certs",
  },
  {
    id: "experience",
    title: "Experience",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const experiences = [
  {
    title: "Founder of JoulHub",
    company_name: "JoulHub",
    date: "2025 - Present",
    details: [
      "Founded <span style='color: white;'>JoulHub</span>, an all-in-one property management platform for Cambodian landlords, achieving <span style='color: white;'>200+ sign-ups</span> within the first months of launch.",
      "Built and scaled the platform to manage <span style='color: white;'>400+ rooms across 100+ properties</span>, featuring smart invoicing, KHQR payments, tenant portals, and real-time analytics.",
      "Designed the full product from scratch — <span style='color: white;'>Next.js, Tailwind CSS, shadcn/ui</span> — with bilingual support (Khmer/English) and Progressive Web App capabilities.",
    ],
  },
  {
    title:
      "Co-Founder at Cambodia International Mathemathics Olympiad Championship",
    company_name: "CIMOC",
    date: "2024 - Present",
    details: [
      "Organized the Cambodian Mathematical Olympiad Competition <span style='color: white;'>(CIMOC)</span>, engaging over <span style='color: white;'>1,000+ students from 100+ schools</span> across all 25 provinces.",
      "Developed and deployed a <span style='color: white;'>scalable online exam platform</span> using Next.js, NestJS, and PostgreSQL to ensure reliable test delivery.",
      "Collaborated with schools and teachers to <span style='color: white;'>design and implement innovative teaching methods</span> that enhance students' problem-solving skills and critical thinking.",
    ],
  },
  {
    title: "React Workshop Facilitator",
    company_name: "at AUPP",
    date: "February 2025",
    details: [
      "Led a <span style='color: white;'>3-hour React workshop</span> at AUPP, teaching core concepts and helping students get started with modern web development.",
      "Delivered hands-on training on <span style='color: white;'>JavaScript fundamentals and React best practices</span>, including a clear learning roadmap and curated resources.",
      "Workshop supported by the <span style='color: white;'>Dean of the School of Digital Technology</span> and attended by 20+ enthusiastic students.",
    ],
  },
];

const projects = [
  {
    name: "Smart Education School",
    tagline: "Asian Math Olympiad Learning Platform",
    description:
      "International olympiad competition platform serving 500+ participants across 15 countries with $10K prize pools. Features 50+ courses, real-time contests, and practice problems for K-12 students.",
    tech: ["Next.js", "React", "Clerk Auth", "PostgreSQL", "Tailwind CSS"],
    stats: { users: "500+", countries: "15", courses: "50+" },
    image: "/projects/smart-education.webp",
    url: "https://www.smarteducationschool.com/",
    featured: true,
  },
  {
    name: "JoulHub",
    tagline: "Property Management Platform",
    description:
      "All-in-one cloud property management for Cambodian landlords. Smart invoicing, KHQR payments, tenant portals, utility tracking, and real-time analytics. Includes Khmer/English support and PWA capabilities.",
    tech: ["Next.js", "Tailwind CSS", "shadcn/ui", "PostHog", "Vercel"],
    stats: { signups: "200+", rooms: "400+", properties: "100+" },
    image: "/projects/joulhub.webp",
    url: "https://joulhub.com",
    featured: true,
  },
  {
    name: "MLC International School",
    tagline: "Multi-Campus School CMS",
    description:
      "Unified CMS and public website for MLC International School in Cambodia. Content management, staff directory across 3 campuses, events, blog/news, job board, and admission portal.",
    tech: ["Next.js", "Tailwind CSS", "shadcn/ui", "Turbopack", "Vercel"],
    stats: { staff: "122", campuses: "3", features: "7+" },
    image: "/projects/mlcis.webp",
    url: "https://mlcis.nextzen.technology/",
    featured: true,
  },
  {
    name: "AUPP Alumni Connect",
    tagline: "University Alumni Network",
    description:
      "Full alumni networking platform for the American University of Phnom Penh. Social feed, alumni directory, job board, mentorship program, events, direct messaging, and support for 18 academic programs.",
    tech: ["Next.js", "React", "Tailwind CSS", "Turbopack", "Vercel"],
    stats: { programs: "18", features: "9+", platform: "Full" },
    image: "/projects/aupp-alumni.webp",
    url: "https://connectable.aurrasms.com/feed",
    featured: true,
  },
  {
    name: "BigFat Pizza",
    tagline: "Full-Stack Food Ordering App",
    description:
      "Complete pizza ordering system with real-time order tracking, admin dashboard, secure authentication, and mobile-first design. Containerized with Docker and CI/CD via GitHub Actions.",
    tech: ["React", "Redux", "Node.js", "MongoDB", "Docker"],
    stats: null,
    url: "https://big-fat-pizza.vercel.app",
    featured: false,
  },
];

const certs = [
  {
    name: "AWS Solutions Architect Associate",
    url: "https://www.credly.com/badges/b74b8d00-f95a-401d-8225-1ea29ae2a6a2/linked_in?t=swqtka",
  },
  {
    name: "AWS Certified Cloud Practitioner",
    url: "https://www.credly.com/badges/4d0c1415-9e2f-41ef-8f8b-50bf013d227b/linked_in",
  },
  {
    name: "Full Stack Web Development Bootcamp (University of Hensinki - Finland)",
    url: "https://studies.cs.helsinki.fi/stats/api/certificate/fullstackopen/en/0975995e1e422d99c542e3a629b4c33c",
  },
  {
    name: "(Meta) FrontEnd Developer",
    url: "https://www.coursera.org/account/accomplishments/specialization/N849S7D8TADJ",
  },
  {
    name: "CS'50 (Harvard University)",
    url: "https://certificates.cs50.io/7bffca64-1216-496f-af65-910e338f4a96.png?size=letter",
  },
  {
    name: "Complete Intro to React, v8",
    url: "https://static.frontendmasters.com/ud/c/f773b2614a/BoYXCMJijv/complete-react-v8.pdf",
  },
  {
    name: "JavaScript: The Hard Parts, v2",
    url: "https://static.frontendmasters.com/ud/c/f773b2614a/fjjCYVxYTO/javascript-hard-parts-v2.pdf",
  },
  {
    name: "Vanilla JavaScript Projects",
    url: "https://static.frontendmasters.com/ud/c/f773b2614a/kAOVCxrlvT/javascript-projects.pdf",
  },
  {
    name: "Tailwind CSS",
    url: "https://static.frontendmasters.com/ud/c/f773b2614a/hXdaKmozON/tailwind-css.pdf",
  },
];

export { experiences, projects, certs };
