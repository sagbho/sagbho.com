"use client";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import {
  EnvelopeClosedIcon,
  FileTextIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";


const slugify = (title) => title.toLowerCase().replace(/\s+/g, "-");

const SOCIAL_LINKS = [
  {
    label: "View my projects",
    href: "https://github.com/sagbho",
    Icon: GitHubLogoIcon,
  },
  {
    label: "Connect with me",
    href: "https://www.linkedin.com/in/sagar-bhola/",
    Icon: LinkedInLogoIcon,
  },
  {
    label: "Send me an email",
    href: "mailto:sagbho@umich.edu",
    Icon: EnvelopeClosedIcon,
  },
  {
    label: "View my résumé",
    href: "/resume",
    Icon: FileTextIcon,
  },
];


export default function Home() {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(null);

  const work = useMemo(
    () => [
      {
        company: "Ciena Healthcare",
        role: "Data Engineer",
        description:
          "Built ETL pipelines to automate Medicaid cost reporting.",
        link: "https://www.cienahealthcare.com",
        startDate: "May 2025",
        endDate: "Present",
      },
      {
        company: "Networthy",
        role: "Founder",
        description: "All your revenue. One place. Across all platforms.",
        link: "https://www.linkedin.com/company/gonetworthy/",
        startDate: "Aug 2026",
        endDate: "Present",
      },

      {
        company: "Headstarter",
        role: "Software Engineering Fellow",
        description: "Developed AI-powered tools to enhance user experiences.",
        link: "https://www.headstarter.co/",
        startDate: "Jul",
        endDate: "Sep 2024",
      },
      {
        company: "GAS Flicks",
        role: "Founder",
        description: "A personal photography website showcasing my work.",
        link: "https://sagbho.com/gasflicks",
        startDate: "Jan 2023",
        endDate: "Present",
      },
    ],
    [],
  );

  const projects = useMemo(
    () => [
      {
        title: "Vision-Based Autonomous Driving Agent",
        description:
          "A reinforcement learning agent trained to navigate a simulated driving environment using visual input.",
        link: "",
        date: "2026",
        image: "/vbd.png",
        skills: ["Python", "PyTorch", "Reinforcement Learning", "Computer Vision", "DXcam", "OpenCV"],
      },
      
      {
        title: "AI Invoice Processor",
        description:
          "An AI-driven solution to automate invoice processing, reducing manual effort and errors.",
        link: "",
        date: "2026",
        image: "/aip.png",
        skills: ["Next.js", "OCR", "LLMs", "SQL"],
      },
      {
        title: "YesNoFingers",
        description:
          "A medical translation app for Michigan free clinics—speech-to-text and translation to support patient-provider communication.",
        link: "",
        date: "2026",
        image: "",
        skills: ["React", "OpenAI Whisper", "Figma", "Javascript", "AWS"],
      },
      {
        title: "TCG Portfolio Evaluator",
        description:
          "A web application that evaluates the value of a Pokemon card collection using camera image input and AI-powered card recognition.",
        link: "",
        date: "2026",
        image: "/tcg.png",
        skills: ["React", "Javascript", "Express", "OCR"],
      },
      {
        title: "Instagram Clone",
        description:
          "A clone of Instagram with core features like photo sharing, commenting, and liking.",
        link: "",
        date: "2025",
        image: "/insta.png",
        skills: ["React", "Python", "Flask", "SQL", "AWS"],
      },
      {
        title: "ADHD Focus & Resource Hub",
        description:
          "A Figma prototype for an ADHD-friendly app offering guided focus sessions and essential resources.",
        link: "https://www.youtube.com/watch?v=U-53C4qpzOM",
        date: "2025",
        image: "",
        skills: ["Figma", "UX Research", "Prototyping"],
      },
      {
        title: "Elite Tennis Academy",
        description:
          "Website for Elite Tennis Academy showcasing programs, coaches, and package options.",
        link: "https://www.elitetennisacademy.org/",
        date: "2025",
        image: "/eta.png",
        skills: ["Next.js", "Tailwind CSS"],
      },
      {
        title: "Forum Post Classifier",
        description:
          "​A program that uses natural language processing and machine learning to categorize Piazza forum posts by topic.",
        link: "",
        date: "2023",
        image: "",
        skills: ["C++", "NLP", "Machine Learning"],
      },

      {
        title: "Healthcare Translation App",
        description:
          "An application facilitating real-time translation services for healthcare professionals.",
        link: "https://www.youtube.com/watch?v=C41ID5OVVMA",
        date: "2025",
        image: "",
        skills: ["React", "Google Gemini", "SQL", "AWS"],
      },
      {
        title: "Leetcode Tutor",
        description:
          "A platform offering personalized tutoring for Leetcode problems to enhance coding skills.",
        link: "https://github.com/sagbho/LeetViz",
        date: "2024",
        image: "/lv.png",
        skills: ["Next.js", "Data Visualization", "Firebase"],
      },
      {
        title: "Search Engine",
        description: "A scalable search engine similar to Google or Bing.",
        link: "",
        date: "2025",
        image: "/se.png",
        skills: ["React", "Python", "Flask", "SQL", "AWS"]
      },
      {
        title: "Secure Password Manager",
        description:
          "A user dashboard with password generation and storage, offering customizable security options.",
        link: "",
        date: "2025",
        image: "/sk.png",
        skills: ["Next.js", "Tailwind CSS", "SQL"],
      },
    ].sort((a, b) => Number(b.date) - Number(a.date)),
    [],
  );

  // Keep resume hash links focused on the matching project row.
  useEffect(() => {
    const focusProjectFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) {
        setCurrentProjectIndex(null);
        return;
      }

      const index = projects.findIndex((p) => slugify(p.title) === hash);
      setCurrentProjectIndex(index !== -1 ? index : null);

      if (index !== -1) {
        requestAnimationFrame(() => {
          document.getElementById(hash)?.scrollIntoView({
            block: "center",
          });
        });
      }
    };

    focusProjectFromHash();
    window.addEventListener("hashchange", focusProjectFromHash);
    return () => window.removeEventListener("hashchange", focusProjectFromHash);
  }, [projects]);

  return (
    <>
      <main className="font-mono">
        <div className="mx-auto min-h-screen w-full max-w-5xl px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          <div className="w-full max-w-2xl">
          <section>
            <div className="flex flex-row items-start justify-between gap-4 sm:items-center">
              <div className="opacity-0 animate-slide-down">
                <Link href="/" className="min-w-0 text-5xl italic tracking-tight opacity-0 animate-slide-down font-editorial sm:text-7xl lg:text-8xl">Sagar Bhola</Link>
                <p className="text-lg font-lausanne text-neutral-400 pt-4">Engineer of the future.</p>
              </div>
              <div className="ml-auto flex shrink-0 flex-col items-end justify-between gap-2 text-right">
                {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="group relative flex h-5 w-5 self-end items-center justify-end"
                  >
                    <span className="pointer-events-none absolute right-7 top-1/2 hidden -translate-y-1/2 translate-x-2 whitespace-nowrap text-xs lowercase tracking-[0.12em] opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 sm:block">
                      {label}
                    </span>
                    <Icon width="20" height="20" />
                  </Link>
                ))}
              </div>
            </div>
            
          </section>
          <section className="flex w-full flex-col gap-10 pt-12 opacity-0 animate-slide-up">
            <div>
            <h1 className="uppercase text-xs pb-3 text-neutral-400">Bio</h1>
            <p className="max-w-xl text-sm leading-relaxed">
              University of Michigan Computer Science graduate, currently pursuing an M.S. in Computer Science with a specialization in Artificial Intelligence at Georgia Tech.
            </p>
            </div>
            <div>
              <h1 className="uppercase text-xs pb-3 text-neutral-400">Work</h1>
              {work.map((job, index) => (
                <div key={index}>
                  <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-3">
                    <div className="min-w-0">
                      <Link href={job.link} target="_blank" className="text-lg tracking-tighter font-lausanne hover:text-blue-300 duration-200">{job.company}</Link>
                      <p className="max-w-md text-xs leading-relaxed text-neutral-400">
                        <span className="text-white/60 font-semibold">{job.role}</span> -  {job.description}
                      </p>
                    </div>
                    <p className="shrink-0 text-xs sm:text-right">{job.startDate} to {job.endDate}</p>
                  </div>
                  {index < work.length - 1 && <hr className="my-4 border-neutral-700" />}
                </div>
              ))}
            </div>
            <div>
              <h1 className="uppercase text-xs pb-3 text-neutral-400">Projects</h1>
              {projects.map((project, index) => (
                <div
                  id={slugify(project.title)}
                  key={project.title}
                  className="relative scroll-mt-20"
                >
                  <button
                    type="button"
                    className={`w-full cursor-pointer py-1 text-left transition-colors ${
                      currentProjectIndex === index ? "bg-neutral-800/40" : ""
                    }`}
                    onClick={() => {
                      const hash = slugify(project.title);
                      setCurrentProjectIndex(index);
                      window.history.pushState(null, "", `#${hash}`);
                    }}
                  >
                    <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-3">
                      <div className="min-w-0">
                        <span className="text-lg font-lausanne hover:text-blue-300 duration-200">{project.title}</span>
                        <p className="max-w-md text-xs leading-relaxed text-neutral-400">
                          {project.description}
                        </p>
                      </div>
                      <p className="shrink-0 text-xs sm:text-right">{project.date}</p>
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-out xl:absolute xl:left-[calc(100%+2rem)] xl:top-0 xl:w-80 ${
                      currentProjectIndex === index
                        ? "mt-4 max-h-[560px] translate-x-0 opacity-100 xl:mt-0"
                        : "max-h-0 translate-x-4 opacity-0"
                    }`}
                  >
                    <div className="border-l border-neutral-700 pl-4">
                      <div className="relative aspect-video w-full overflow-hidden bg-neutral-900/60 sm:aspect-[4/3]">
                        {project.image ? (
                          <img
                            src={project.image}
                            alt={`${project.title} screenshot`}
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center px-6 text-center text-xs text-neutral-400">
                            {project.title}
                          </div>
                        )}
                      </div>
                      <div className="pt-3">
                        <p className="pb-2 text-[10px] uppercase tracking-[0.12em] text-neutral-400">
                          Skills
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.skills.map((skill) => (
                            <span
                              key={skill}
                              className="border border-neutral-700 px-2 py-1 text-[10px] lowercase"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      {project.link && (
                        <Link
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-block text-xs underline decoration-neutral-600 underline-offset-4 hover:text-blue-300 duration-200"
                        >
                          open project
                        </Link>
                      )}
                    </div>
                  </div>
                  {index < projects.length - 1 && <hr className="my-4 border-neutral-700" />}
                </div>
              ))}
            </div>
          </section>
          <section className="py-12 text-xs font-mono uppercase opacity-0 animate-slide-up">
                  <Link href="/" >^ Back to top ^</Link>

          </section>
          </div>
        </div>
      </main>
    </>
  );
}


