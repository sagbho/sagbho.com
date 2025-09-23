"use client";
import Card from "@/components/Card";
import Header from "@/components/Header";
import { useState, useEffect, useMemo } from "react";
import {
  ArrowDownIcon,
  DashIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";

export default function Home() {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(null);

  const projects = useMemo(
    () => [
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
        skills: [
          "Next.js",
          "SQL",
          "Custom Document Processing Pipeline",
          "AWS",
          "Tailwind",
        ],
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
        title: "GAS Flicks",
        description: "A personal photography website showcasing my work.",
        link: "https://www.gasflicks.com/",
        img: "/gf.png",
        skills: ["HTML", "CSS", "JavaScript"],
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
    ],
    []
  );

  const slugify = (title) => title.toLowerCase().replace(/\s+/g, "-");

  // Open modal if URL hash matches project
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    const index = projects.findIndex((p) => slugify(p.title) === hash);
    if (index !== -1) {
      setCurrentProjectIndex(index);
    }
  }, [projects]);

  // Optional: Support browser back/forward buttons
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      const index = projects.findIndex((p) => slugify(p.title) === hash);
      setCurrentProjectIndex(index !== -1 ? index : null);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [projects]);

  return (
    <>
      {currentProjectIndex === null && <Header />}
      <div className="snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth">
        <section
          id="home"
          className="snap-start min-h-screen flex flex-col items-center justify-center px-4"
        >
          <h1 className="flex text-center text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-editorial italic opacity-0 animate-slide-down p-4 sm:p-6 md:p-10">
            Sagar Bhola
          </h1>
          <span className="text-base sm:text-lg md:text-xl font-extralight pb-6 md:pb-10 tracking-tighter opacity-0 animate-slide-up text-center max-w-lg">
            Engineering <span className="italic">solutions</span> for the
            future.
          </span>
        </section>

        <section
          id="projects"
          className="snap-start min-h-screen flex flex-col items-center justify-center w-full px-4 py-16 sm:py-24 md:px-6 lg:px-10"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-editorial italic p-4 sm:p-6 md:p-10 text-center">
            Projects
          </h1>
          <p className="text-sm sm:text-base md:text-lg font-extralight pb-6 md:pb-10 tracking-tighter text-center max-w-2xl">
            A showcase of precise engineering.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-7xl place-items-center px-2">
            {projects.map((project, index) => (
              <Card
                key={index}
                info={project}
                index={index}
                currentIndex={currentProjectIndex}
                setIndex={(i) => {
                  setCurrentProjectIndex(i);
                  if (i !== null) {
                    window.location.hash = slugify(projects[i].title);
                  } else {
                    window.history.pushState(
                      "",
                      document.title,
                      window.location.pathname
                    );
                  }
                }}
                projects={projects}
              />
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="snap-start min-h-screen flex flex-col items-center justify-center w-full px-4 py-16 sm:py-24 md:px-10"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-editorial italic p-4 sm:p-6 md:p-10 text-center">
            Contact
          </h1>
          <p className="flex flex-row text-base md:text-lg font-extralight pb-6 md:pb-10 tracking-tighter text-center">
            <DashIcon />
            <ArrowDownIcon />
            <DashIcon />
          </p>
          <p className="text-sm sm:text-base md:text-lg font-extralight pb-6 md:pb-10 tracking-tighter text-center px-4">
            sagbho[at]umich[dot]edu
          </p>
          <p className="pb-6 text-sm sm:text-base">or</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href="https://www.linkedin.com/in/sagar-bhola/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center transition-all duration-300 ease-out hover:bg-neutral-700/50 hover:shadow-md bg-neutral-800/30 backdrop-blur-sm rounded-full border border-neutral-700/50 px-6 py-3 text-neutral-300 hover:text-white font-editorial"
            >
              <LinkedInLogoIcon width="20" height="20" />
              <span className="ml-2 text-lg">linkedin</span>
            </a>
            <a
              href="https://www.github.com/sagbho/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center transition-all duration-300 ease-out hover:bg-neutral-700/50 hover:shadow-md bg-neutral-800/30 backdrop-blur-sm rounded-full border border-neutral-700/50 px-6 py-3 text-neutral-300 hover:text-white font-editorial"
            >
              <GitHubLogoIcon width="20" height="20" />
              <span className="ml-2 text-lg">github</span>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
