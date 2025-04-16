"use client";
import Card from "@/components/Card";
import Header from "@/components/Header";
import { useState } from "react";
import {
  ArrowDownIcon,
  DashIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";

export default function Home() {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(null);

  const projects = [
    {
      title: "ADHD Focus & Resource Hub",
      description:
        "A Figma prototype for an ADHD-friendly app offering guided focus sessions and essential resources.",
      type: "github",
      vid: "https://www.youtube-nocookie.com/embed/U-53C4qpzOM?si=T79DpnTZOxQ52nYJ",
      skills: ["Figma"],
    },
    {
      title: "AI Invoice Processor",
      description:
        "An AI-driven solution to automate invoice processing, reducing manual effort and errors.",
      type: "video soon",
      skills: ["Next.js", "SQL", "OpenAI LLM", "AWS", "Tailwind"],
      img: "/aip.png",
    },
    {
      title: "Elite Tennis Academy",
      description:
        "Website for Elite Tennis Academy showcasing programs, coaches, and package options.",
      link: "https://www.elitetennisacademy.org/",
      type: "website",
      skills: ["HTML", "CSS", "JavaScript"],
      img: "/eta.png",
    },
    {
      title: "Forum Post Classifier",
      description:
        "​A program that uses natural language processing and machine learning to categorize Piazza forum posts by topic.",
      skills: ["C++"],
    },
    {
      title: "Healthcare Translation App",
      description:
        "An application facilitating real-time translation services for healthcare professionals.",
      vid: "https://www.youtube-nocookie.com/embed/C41ID5OVVMA?si=RlAZDcaxAb9RY5em",
      skills: ["React", "Python", "Flask", "Google Gemini 1.5", "CSS"],
    },
    {
      title: "Instagram Clone",
      description:
        "A clone of Instagram with core features like photo sharing, commenting, and liking.",
      img: "/insta.png",
      skills: ["React", "Python", "Flask", "SQL", "AWS", "CSS"],
    },
    {
      title: "Leetcode Tutor",
      description:
        "A platform offering personalized tutoring for Leetcode problems to enhance coding skills.",
      link: "https://github.com/sagbho/LeetViz",
      skills: [
        "Next.js",
        "TypeScript",
        "Google Gemini 2.0",
        "Clerk",
        "Tailwind",
      ],
      img: "/lv.png",
    },
    {
      title: "Search Engine",
      description: "A scalable search engine similar to Google or Bing.",
      skills: ["Python", "SQL", "HTML", "CSS"],
      img: "/se.png",
    },
    {
      title: "Secure Password Manager",
      description:
        "A user dashboard with password generation and storage, offering customizable security options.",
      skills: ["Next.js", "TypeScript", "Firebase", "Tailwind"],
      img: "/sk.png",
    },
  ];

  return (
    <>
      <Header />
      <div className="snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth">
        <section
          id="home"
          className="snap-start min-h-screen flex flex-col items-center justify-center"
        >
          <h1 className="flex text-center text-5xl md:text-8xl font-editorial italic opacity-0 animate-slide-down p-6 md:p-10">
            Sagar Bhola
          </h1>
          <span className="text-lg md:text-xl font-extralight pb-6 md:pb-10 tracking-tighter opacity-0 animate-slide-up">
            Engineering <span className="italic">solutions</span> for the
            future.
          </span>
        </section>

        <section
          id="projects"
          className="snap-start min-h-screen flex flex-col items-center justify-center w-full px-4 py-24 md:px-10"
        >
          <h1 className="text-4xl md:text-6xl font-editorial italic p-6 md:p-10 text-center">
            Projects
          </h1>
          <p className="text-base md:text-lg font-extralight pb-6 md:pb-10 tracking-tighter text-center">
            A showcase of precise engineering.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6 w-full place-items-center">
            {projects.map((project, index) => (
              <Card
                key={index}
                info={project}
                index={index}
                currentIndex={currentProjectIndex}
                setIndex={setCurrentProjectIndex}
                projects={projects}
              />
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="snap-start min-h-screen flex flex-col items-center justify-center w-full px-4 py-24 md:px-10"
        >
          <h1 className="text-4xl md:text-6xl font-editorial italic p-6 md:p-10 text-center">
            Contact
          </h1>
          <p className="flex flex-row text-base md:text-lg font-extralight pb-6 md:pb-10 tracking-tighter text-center">
            <DashIcon />
            <ArrowDownIcon />
            <DashIcon />
          </p>
          <p className="text-base md:text-lg font-extralight pb-6 md:pb-10 tracking-tighter text-center">
            sagbho[at]umich[dot]edu
          </p>
          <p className="pb-6">or</p>
          <div className="flex flex-row items-center justify-center">
            <a
              href="https://www.linkedin.com/in/sagar-bhola/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center transition-all hover:bg-neutral-700/50 hover:shadow-md hover:rounded-full dark:hover:text-neutral-100 p-2"
            >
              <LinkedInLogoIcon width="20" height="20" />
              <p className="ml-1 h-7 font-editorial">linkedin</p>
            </a>
            <a
              href="https://www.github.com/sagbho/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center transition-all hover:bg-neutral-700/50 hover:shadow-md hover:rounded-full dark:hover:text-neutral-100 p-2"
            >
              <GitHubLogoIcon width="20" height="20" />
              <p className="ml-1 h-7 font-editorial">github</p>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
