// import { int } from "three/examples/jsm/nodes/Nodes.js";
import {
  metaCert,
  project3,
  cs50Cert,
  introReact,
  jsHardPart,
  vanillaJs,
  tailwindCss,
  bigFat,
  cimoc,
  awsCert,
  fullStackCert
} from "../assets";

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
    title: "Co-Founder at Cambodia International Mathemathics Olympiad Championship",
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
    description: "International olympiad competition platform serving 500+ participants across 15 countries with $10K prize pools. Features 50+ courses, real-time contests, and practice problems for K-12 students.",
    tech: ["Next.js", "React", "Clerk Auth", "PostgreSQL", "Tailwind CSS"],
    stats: { users: "500+", countries: "15", courses: "50+" },
    image: "/projects/smart-education.png",
    url: "https://www.smarteducationschool.com/",
    featured: true,
  },
  {
    name: "RorHash - Voice AI Platform",
    tagline: "Bilingual Speech-to-Text Intelligence",
    description: "Voice-to-intelligence platform processing Khmer and English speech into actionable insights. Features real-time WebSocket sync, AI video generation, and workflow automation.",
    tech: ["Next.js", "Socket.io", "Node.js", "OpenAI", "Tailwind CSS"],
    stats: { languages: "2", features: "6+", realtime: "Yes" },
    image: "/projects/rorhash-voice.png",
    url: "https://small-demo-speech-to-text.vercel.app/",
    featured: true,
  },
  {
    name: "CIMOC Exam Platform",
    tagline: "National Math Olympiad System",
    description: "Scalable online exam platform supporting 1,500 concurrent users across 100+ schools in 25 provinces. Role-based management, automated grading, and real-time leaderboards.",
    tech: ["NestJS", "PostgreSQL", "Redis", "Next.js", "Docker"],
    stats: { users: "1000+", schools: "100+", provinces: "25" },
    image: cimoc,
    url: "https://www.cimoc-exam.com/",
    featured: true,
  },
  {
    name: "BigFat Pizza",
    tagline: "Full-Stack Food Ordering App",
    description: "Complete pizza ordering system with real-time order tracking, admin dashboard, secure authentication, and mobile-first design. Containerized with Docker and CI/CD via GitHub Actions.",
    tech: ["React", "Redux", "Node.js", "MongoDB", "Docker"],
    stats: null,
    image: bigFat,
    url: "https://big-fat-pizza.vercel.app",
    featured: false,
  },
];

const certs = [
  {
    name: "AWS Solutions Architect Associate",
    image: "https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png",
    url: "https://www.credly.com/badges/b74b8d00-f95a-401d-8225-1ea29ae2a6a2/linked_in?t=swqtka",
  },
  {
    name: "AWS Certified Cloud Practitioner",
    image: awsCert,
    url: "https://www.credly.com/badges/4d0c1415-9e2f-41ef-8f8b-50bf013d227b/linked_in",
  },
  {
    name: "Full Stack Web Development Bootcamp (University of Hensinki - Finland)",
    image: fullStackCert,
    url : "https://studies.cs.helsinki.fi/stats/api/certificate/fullstackopen/en/0975995e1e422d99c542e3a629b4c33c",
  },
  {
    name: "(Meta) FrontEnd Developer",
    image: metaCert,
    url : "https://www.coursera.org/account/accomplishments/specialization/N849S7D8TADJ",
  },
  {
    name: "CS'50 (Harvard University)",
    image: cs50Cert,
    url : "https://certificates.cs50.io/7bffca64-1216-496f-af65-910e338f4a96.png?size=letter",
  },
  {
    name: "Complete Intro to React, v8",
    image: introReact,
    url : "https://static.frontendmasters.com/ud/c/f773b2614a/BoYXCMJijv/complete-react-v8.pdf",
  },
  {
    name: "JavaScript: The Hard Parts, v2",
    image: jsHardPart,
    url : "https://static.frontendmasters.com/ud/c/f773b2614a/fjjCYVxYTO/javascript-hard-parts-v2.pdf",
  },
  {
    name: "Vanilla JavaScript Projects",
    image: vanillaJs,
    url : "https://static.frontendmasters.com/ud/c/f773b2614a/kAOVCxrlvT/javascript-projects.pdf",
  },
  {
    name: "Tailwind CSS",
    image: tailwindCss,
    url : "https://static.frontendmasters.com/ud/c/f773b2614a/hXdaKmozON/tailwind-css.pdf",
  },  
]

export { experiences, projects, certs };

