"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { ArrowUpIcon, ArrowTopRightIcon, PlusIcon, MinusIcon } from "@radix-ui/react-icons";
const slugify = (title) => title.toLowerCase().replace(/\s+/g, "-");

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

  const featured = projects.slice(0, 4);
  const remaining = projects.slice(4);

  const projectRow = (project) => {
    const projectIndex = projects.indexOf(project);
    const isOpen = currentProjectIndex === projectIndex;
    const id = slugify(project.title);
    return (
      <article className={`project-row ${isOpen ? "is-open" : ""}`} id={id} key={project.title}>
        <button className="project-toggle" type="button" aria-expanded={isOpen} onClick={() => {
          setCurrentProjectIndex(isOpen ? null : projectIndex);
          window.history.replaceState(null, "", isOpen ? window.location.pathname : `#${id}`);
        }}>
          <span className="project-name">{project.title}<span className="project-description">{project.description}</span></span>
          <span className="project-plus" aria-hidden="true">{isOpen ? <MinusIcon /> : <PlusIcon />}</span>
        </button>
        {isOpen && <div className="project-detail">
          {project.image && <div className="project-image"><img src={project.image} alt={`${project.title} screenshot`} /></div>}
          <div className="project-detail-copy"><span className="eyebrow">Built with</span><div className="project-skills">{project.skills.map(skill => <span key={skill}>{skill}</span>)}</div>{project.link && <a className="text-link" href={project.link} target="_blank" rel="noopener noreferrer">Explore project <ArrowTopRightIcon aria-hidden="true" /></a>}</div>
        </div>}
      </article>
    );
  };

  return (
    <main className="portfolio">
      <div className="portfolio-shell">
        <header className="site-header">
          <nav aria-label="Main navigation"><a href="#work">Work</a><a href="#about">About</a><a href="mailto:sagbho@umich.edu" className="nav-contact">Let’s talk</a></nav>
        </header>

        <section className="hero" aria-labelledby="hero-title">
          
          <h1 id="hero-title">SAGAR<br /><span>BHOLA</span></h1>
          <div className="hero-bottom"><p>Building technology that<br />people can trust.</p><a href="#work" className="hero-scroll">Explore my work</a></div>
        </section>

        <section className="work-section" id="work" aria-labelledby="work-title">
          <div className="section-heading"><div><h2 id="work-title">Projects</h2></div></div>
          <div className="project-list">{featured.map(projectRow)}</div>
          <details className="more-projects" open={currentProjectIndex !== null && currentProjectIndex >= 4 ? true : undefined}>
            <summary>More projects</summary>
            <div className="project-list">{remaining.map(projectRow)}</div>
          </details>
        </section>

        <section className="about-section" id="about" aria-labelledby="about-title">
          <div className="about-intro"><h2 id="about-title">Making technology<br /><span>safer to use.</span></h2><Image src="/files/IMG_0988%202.jpg" alt="Sagar Bhola" width={88} height={88} className="about-portrait" unoptimized /><p>I’m Sagar, a University of Michigan computer science graduate interested in computer security, cybersecurity, and networks. I want to help make technology safer and more trustworthy for the people who use it.</p><a href="mailto:sagbho@umich.edu" className="contact-button">Get in touch</a></div>
          <div className="experience"><div className="experience-heading"><span className="eyebrow">Experience</span></div>{work.map(job => <a className="experience-row" key={job.company} href={job.link} target="_blank" rel="noopener noreferrer"><span><strong>{job.company}</strong><small>{job.role}</small></span><span className="experience-date">{job.startDate} — {job.endDate} <ArrowTopRightIcon aria-hidden="true" /></span></a>)}</div>
        </section>
        <footer className="portfolio-footer"><span>© {new Date().getFullYear()} Sagar Bhola</span><div><a href="https://github.com/sagbho" target="_blank" rel="noopener noreferrer">GitHub <ArrowTopRightIcon aria-hidden="true" /></a><a href="https://www.linkedin.com/in/sagar-bhola/" target="_blank" rel="noopener noreferrer">LinkedIn <ArrowTopRightIcon aria-hidden="true" /></a><Link href="/resume">Résumé <ArrowTopRightIcon aria-hidden="true" /></Link></div><a className="back-to-top" href="#top" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Back to top <ArrowUpIcon aria-hidden="true" /></a></footer>
      </div>
    </main>
  );
}
