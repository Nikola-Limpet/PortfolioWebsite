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
    name: "BigFat Pizza – Online Pizza Ordering Web App",
    description: [
      "Built a full-stack web application with React, Redux, Node.js, Express, and MongoDB.",
      "Features include a real-time order tracking system, admin dashboard, secure authentication, and mobile responsiveness.",
      "Employed Docker and Docker Compose for containerization, with CI/CD integration using GitHub Actions.",
    ],
    image: bigFat,
    url : 'https://big-fat-pizza.vercel.app',
  },
  {
    name: "Online Mathematical Olympiad Exam System (CIMOC)",
    description: [
      "Developed a scalable and secure online exam platform supporting 1,000-1,500 concurrent users.",
      "Key features include role-based user management, automated grading, exam scheduling, and a real-time leaderboard.",
      "Tech stack: NestJS, PostgreSQL, Redis, Next.js, React, JWT, Docker"
    ],
    image: cimoc,
    url : 'https://www.cimoc-exam.com/',
  },
  {
    name: "Word Guessing Game",
    description:
      "This project inspire from Tiktok that user have to quess 5 letter words. The game will give you 6 chances to guest the word. The word will be updated every day at 12:00 AM by calling 3rd party API call.",
    image: project3,
    url : 'https://nikola-limpet.github.io/word-guessing.github.io/',
  },
];

const certs = [

  {
    name: "AWS Certified Cloud Practitioner",
    image: awsCert,
    url : "https://www.credly.com/earner/earned/badge/eaaefe59-4504-48e8-b621-4abfef55b97b",
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

