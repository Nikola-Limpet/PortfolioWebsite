import {
  metaCert,
  project2,
  project3,
  littleLemon,
} from "../assets";

export const navLinks = [
  {
    id: "hero",
    title: "Hero",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "certifications",
    title: "Certifications",
  },
  {
    id: "experience",
    title: "Experience",
  },

  {
    id: "contact",
    title: "Contact",
  },
  {
    id: "footer",
    title: "Footer",
  }
];

const experiences = [
  {
    title: "Software Developer Student",
    company_name: "American University of Phnom Penh",
    date: "2023 - 2027",
    details: [
      "ICT's student specilizing in Software Developemnt, <span style='color: white;'>with CGPA: 3.87/4.00 </span>.",
      "<span style='color: white;'>Have a deep understanding in Current Technology</span> and how to apply them in real world.",
      "<span style='color: white;'>MERN Stack Developer</span> with a strong foundation in React, Node, Express, and MongoDB.",
    ],
  },
  {
    title: "Co-Founder Cambodia Mathemathics Olympiad", 
    company_name: "CAMO",
    date: "Present",
    details: [
      "Builting a reliable website for organization with both <span style='color: white;'>Frontend and Backend developement modern technology</span>",
      "Willing to spend time in order to develope society by <span style='color: white;'>Building a Start up Mathemathics Competition</span> to gain more soft skills.",
    ],
  },
];

const projects = [
  {
    name: "Little Lemon Shop",
    description: [
      "This project was created during Meta's Coursera Front-End Development course. ",
      "This was created with React Components to show an understanding of utilizing React for creating the website.",
    ],
    image: littleLemon,
    url : 'https://little-lemon-shop.vercel.app',
  },
  {
    name: "Culture Insigts Collective Learning Platform",
    description:
      "This project was submited as a protoype to join UNESCO HACKATON that participated nearly 50 countries around the glope. Culture Insights Collective to host their learning materials and resources. In order to help others learn about the other country culture.",
    image: project2,
    url : 'https://youth-hackaton.vercel.app/',
  },
  {
    name: "Word Guessing Game",
    description:
      "This project inspire from Tiktok that user have to quess 5 letter words. The game will give you 6 chances to guest the word. The word will be updated every day at 12:00 AM by calling 3rd party API call.",
    image: project3,
    url : 'https://nikola-limpet.github.io/word-guessing.github.io/',
  },
];

export { experiences, projects };

