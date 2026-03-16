import {
  FaXTwitter,
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaDiscord,
  FaInstagram,
} from "react-icons/fa6";

import projectImage1 from "../assets/project1.png";
import projectImage2 from "../assets/project2.png";
import projectImage3 from "../assets/project3.png";
import projectImage4 from "../assets/project4.png";
import projectImage5 from "../assets/project5.png";
import projectImage6 from "../assets/project6.png";
import projectImage7 from "../assets/project7.png";
import { SiLeetcode, SiTailwindcss } from "react-icons/si";
import { SiCodechef } from "react-icons/si";



import { RiReactjsLine } from "react-icons/ri";
import { SiJavascript, SiMongodb ,SiHtml5 } from "react-icons/si";
import { FaNodeJs } from "react-icons/fa";
import { BiLogoPostgresql } from "react-icons/bi";
import { hr, label } from "framer-motion/client";

export const NAVIGATION_LINKS = [
  { label: "About", href: "#bio" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Work Experience", href: "#work" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export const HERO = {
  name: "LOKESH SAI",
  wel : "Introducing... ",
  greet: "Oh hey, glad you stopped by",
  description:
    "I turn rough ideas into polished, responsive interfaces that are as functional as they are beautiful. Clean code meets thoughtful design — that's how I work. ",
};

export const PROJECTS = [
  {
    id: 1,
    name: "Personal Portfolio",
    description:
      "A personal portfolio website built with React and Tailwind CSS to showcase my skills, projects, and contact information.",
    image: projectImage1,
    githubLink: "https://github.com/LokeshSai29/portfolio",
  },
  {
    id: 2,
    name: "AI ChatBot",
    description:
      "A Google's Gemini-inspired AI application built with React.js, styled using Tailwind CSS, and powered by GeminiAPI for seamless user interaction.",
      image: projectImage2,
    githubLink: "https://github.com/LokeshSai29/AI-Chat-Bot",
  },
  {
    id: 3,
    name: "Weather App",
    description:
      "A weather application that uses the OpenWeatherMap API to fetch current weather data for various locations, built with React and styled-components.",
    image: projectImage3,
    githubLink: "https://github.com/LokeshSai29/Weather-App",
  },
  {
    id: 4,
    name: "Steganographer",
    description:
      "This project is an image steganography website that allows users to hide a message inside an image and later decode it by uploading the modified image.",
    image: projectImage4,
    githubLink: "https://github.com/LokeshSai29/Image-steganography",
  },
  {
    id: 5,
    name: "Amazon Clone(FE)",
    description:
      "An e-commerce web application for showcase my skills,designed to replicate the user interface and layout of the Amazon homepage.",
    image: projectImage5,
    githubLink: "https://github.com/LokeshSai29/amazonclone",
  },
  {
    id: 6,
    name: "Flappy-mario(game)",
    description:
      "Flappy Mario is a simple 2D arcade-style game based on the popular Flappy Bird game .The goal of the game is to avoid colliding with pipes while trying to achieve the highest score possible.",
    image: projectImage6,
    githubLink: "https://github.com/LokeshSai29/FlappyMario",
  },
  {
    id: 7,
    name: "E-Commerce site",
    description:
      "A responsive e-commerce website built using React.js. The website includes various categories such as Men, Women, and Footwear, each with images for easy selection and checkout. ",
    image: projectImage7,
    githubLink: "https://github.com/LokeshSai29/E-commerce-site",
  },
  
];

export const BIO = [
  "I am currently pursuing a degree in Computer Science at KL University, with an expected graduation in 2026. Over the course of my academic journey, I have been honing my skills and expertise in frontend development and related technologies, building a strong foundation to contribute effectively in the field of software engineering.",
  "As a multi-disciplinary frontend developer, I bring a wealth of skills and expertise to my work. With a deep understanding of HTML, CSS, and JavaScript, along with proficiency in modern frameworks like React & TailwindCSS  , I possess a versatile skill set that enables me to craft stunning and impactful web experiences for diverse audiences and clients."
  ];

export const SKILLS = [
  {
    icon: <RiReactjsLine className="text-4xl text-cyan-400 lg:text-5xl" />,
    name: "React",
    experience: "1+ years",
  },
  {
    icon: <SiMongodb className="text-4xl text-green-600 lg:text-5xl" />,
    name: "MongoDB",
    experience: "1.5+ years",
  },
  {
    icon: <SiHtml5 className="text-4xl text-orange-500 lg:text-5xl" />,
    name: "Html",
    experience: "1.5+ years",
  },
  
  {
    icon: <SiTailwindcss className="text-4xl text-blue-400 lg:text-5xl" />,
    name: "Tailwind CSS",
    experience: "1+ years",
  },
  {
    icon: <BiLogoPostgresql className="text-4xl text-sky-700 lg:text-5xl" />,
    name: "PostgreSQL",
    experience: "1+ years",
  },
  {
    icon: <SiJavascript className="text-4xl text-yellow-400 lg:text-5xl" />,
    name : "JavaScript",
    experience :"1+years",
  }
];

export const EXPERIENCES = [/*
  {
    title: "",
    company: "Innovative Tech Solutions",
    duration: "July 2020 - Present",
    description:
      "As the Lead Frontend Developer, I spearheaded the development of advanced web applications using cutting-edge technologies like React, Redux, and TypeScript. I worked closely with cross-functional teams, including designers, product managers, and backend developers, to deliver seamless and high-performance user experiences.",
  },
  {
    title: "Frontend Engineer",
    company: "Digital Creations",
    duration: "February 2016 - June 2020",
    description:
      "At Digital Creations, I focused on building highly interactive and responsive web interfaces using HTML, CSS, JavaScript, and modern libraries like React. I collaborated closely with UX/UI designers to implement design changes that enhanced user engagement and satisfaction. My role involved optimizing website performance, ensuring cross-browser compatibility, and implementing SEO best practices. ",
  },
  {
    title: "Junior Web Developer",
    company: "Bright Future Technologies",
    duration: "August 2014 - January 2016",
    description:
      "In my role as a Junior Web Developer, I assisted in the development and maintenance of various web applications. I gained hands-on experience in utilizing HTML, CSS, and JavaScript to create user-friendly interfaces. I actively participated in team meetings, contributed to project planning, and collaborated with senior developers to implement new features.",
  },*/
];

export const EDUCATION = [
  {
    degree: "Bachelor of technology in Computer Science",
    institution: "Koneru Lakshmaiah University",
    duration: "June 2022 - May 2026",
    description:
  "Currently pursuing a Bachelor's degree with a focus on web development, programming languages, and database management. Actively participating in hackathons, where I have developed several web applications using HTML, CSS, JavaScript, and React. Working on a senior project that involves developing an e-commerce platform. Maintaining a strong GPA throughout the course.",
  },
  {
    degree: "Intermediate",
    institution: "Narayana Junior College",
    duration: "June 2020 - May 2022",
    description:
  "Specialized in Mathematics, Physics, and Chemistry. Achieved a CGPA of 9.1.",
  },
  {
    degree: "Secondary education",
    institution: "S.S.High School",
    duration: "June 2007 - May 2020",
    description:
  "Completed secondary education with a CGPA of 9.8. Studied a broad range of subjects including Mathematics, Science, Social Studies, and Languages .",

  },

];

export const SOCIAL_MEDIA_LINKS = [
  {
    href: "https://www.linkedin.com/in/lokesh-sai-damarla-44458b236/",
    icon: <FaLinkedin fontSize={25} className="hover:opacity-80" />,
  },
  {
    href: "https://www.codechef.com/users/lokesh_sai",
    icon: <SiCodechef fontSize={25} className="hover:opacity-80" />,  
  },  
  {
    href: "https://leetcode.com/u/lokeshsai_damalra/",
    icon: <SiLeetcode fontSize={25} className="hover:opacity-80" />,
  },
  {
    href: "https://github.com/LokeshSai29",
    icon: <FaGithub fontSize={25} className="hover:opacity-80" />,
  },
  {
    href: "https://www.instagram.com/lokeshsai_damarla/",
    icon: <FaInstagram fontSize={25} className="hover:opacity-80" />,
  },
  {
    href: "https://x.com/",
    icon: <FaXTwitter fontSize={25} className="hover:opacity-80" />,
  },
];
