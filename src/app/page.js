"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useMemo, useRef } from "react";
import { ArrowUpIcon, ArrowTopRightIcon, PlusIcon, MinusIcon, EnvelopeClosedIcon, LinkedInLogoIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import { motion, useScroll, useTransform, useSpring, useReducedMotion, useMotionValueEvent } from "framer-motion";
const MotionLink = motion.create(Link);
const slugify = (title) => title.toLowerCase().replace(/\s+/g, "-");

export default function Home() {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(null);
  const [moreProjectsOpen, setMoreProjectsOpen] = useState(false);
  const contactRef = useRef(null);
  const projectFocusRef = useRef(false);
  const [copyStatus, setCopyStatus] = useState("");
  const openContact = async () => {
    setCopyStatus("Copying email…");
    contactRef.current?.showModal();
    try {
      await navigator.clipboard.writeText("sagbho@umich.edu");
      setCopyStatus("Email copied to clipboard.");
    } catch {
      setCopyStatus("Couldn’t copy automatically. You can select the email below.");
    }
  };
  const titleRef = useRef(null);
  const [titleBounds, setTitleBounds] = useState(null);
  const { scrollY, scrollYProgress } = useScroll();
  const reducedMotion = useReducedMotion();
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const reveal = {
    initial: { opacity: 1, y: 0 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: reducedMotion ? 0 : 0.4, ease: "easeOut" },
  };
  if (!reducedMotion) reveal.initial = { opacity: 0, y: 18 };
  const travel = titleBounds ? Math.max(120, titleBounds.top - titleBounds.targetTop) : 160;
  const progress = useTransform(scrollY, [0, travel], [0, 1]);
  const smoothProgress = useSpring(progress, { stiffness: 500, damping: 45, mass: 0.15 });
  const reducedProgress = useTransform(progress, value => value > 0 ? 1 : 0);
  const displayProgress = reducedMotion ? reducedProgress : smoothProgress;
  const [wordmarkInHeader, setWordmarkInHeader] = useState(false);
  useMotionValueEvent(displayProgress, "change", value => {
    const compact = value >= 0.999;
    if (compact !== wordmarkInHeader) setWordmarkInHeader(compact);
  });
  const [introHidden, setIntroHidden] = useState(false);
  const introHiddenRef = useRef(false);
  useMotionValueEvent(displayProgress, "change", (value) => {
    const hidden = value > 0.001 || scrollY.get() > 1;
    if (hidden !== introHiddenRef.current) {
      introHiddenRef.current = hidden;
      setIntroHidden(hidden);
    }
  });
  const scale = useTransform(displayProgress, [0, 1], [1, titleBounds?.finalScale ?? 0.15]);
  const y = useTransform(displayProgress, [0, 1], [titleBounds?.top ?? 160, titleBounds?.targetTop ?? 12]);

  const heroClip = useTransform(scrollY, (scroll) => {
    if (!titleBounds) return "inset(0px 0px 0px 0px)";
    const covered = Math.max(0, scroll + titleBounds.headerHeight - titleBounds.heroTop);
    return `inset(${covered}px 0px 0px 0px)`;
  });

  const x = useTransform(displayProgress, [0, 1], [0, titleBounds?.targetX ?? 0]);

  useEffect(() => {
    let active = true;
    const measure = () => {
      if (!active || !titleRef.current) return;
      const rect = titleRef.current.getBoundingClientRect();
      const header = document.querySelector(".site-header").getBoundingClientRect();
      const hero = document.querySelector(".hero").getBoundingClientRect();
      const finalScale = Math.min(90 / rect.width, 44 / rect.height);
      setTitleBounds({ top: rect.top + window.scrollY, left: rect.left, width: rect.width, height: rect.height,
        heroTop: hero.top + window.scrollY, headerHeight: header.height,
        finalScale, targetTop: (header.height - rect.height * finalScale) / 2,
        targetX: header.left - rect.left });
    };
    measure();
    document.fonts.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => { active = false; window.removeEventListener("resize", measure); };
  }, []);
  useEffect(() => {
    let timer;
    let touchActive = false;
    let settling = false;
    let lastPosition = window.scrollY;
    let direction = 1;
    let wheelTarget = null;
    let wheelFrame;
    const animateTo = target => {
      cancelAnimationFrame(wheelFrame);
      clearTimeout(timer);
      wheelTarget = target;
      settling = true;
      const start = window.scrollY;
      const startedAt = performance.now();
      const duration = reducedMotion ? 0 : 600;
      const frame = now => {
        const progress = duration ? Math.min(1, (now - startedAt) / duration) : 1;
        // Ease into and out of each section over a consistent duration.
        const eased = progress < 0.5
          ? 4 * progress ** 3
          : 1 - (-2 * progress + 2) ** 3 / 2;
        window.scrollTo({ top: start + (target - start) * eased, behavior: "instant" });
        if (progress < 1) {
          wheelFrame = requestAnimationFrame(frame);
        } else {
          wheelTarget = null;
          settling = false;
          clearTimeout(timer);
        }
      };
      wheelFrame = requestAnimationFrame(frame);
    };
    const readingRanges = () => [...document.querySelectorAll(".work-section, .about-section")].map(section => {
      const rect = section.getBoundingClientRect();
      const headerHeight = document.querySelector(".site-header").offsetHeight;
      return {
        start: rect.top + window.scrollY - headerHeight,
        end: rect.bottom + window.scrollY - window.innerHeight,
      };
    });
    const settle = () => {
      if (projectFocusRef.current || touchActive || wheelTarget !== null || contactRef.current?.open) return;
      if (settling) { settling = false; return; }
      // Preserve the reading position in any overflowing content section.
      if (readingRanges().some(range => window.scrollY >= range.start - 2 && window.scrollY <= range.end + 2)) return;
      const headerHeight = document.querySelector(".site-header").offsetHeight;
      const sections = [...document.querySelectorAll(".hero, .work-section, .about-section")];
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const position = window.scrollY;
      const ranges = sections.map(section => {
        const rect = section.getBoundingClientRect();
        const start = Math.max(0, Math.min(maxScroll, rect.top + position - headerHeight));
        const end = Math.max(start, Math.min(maxScroll, rect.bottom + position - window.innerHeight));
        const contentHeight = section.offsetHeight - parseFloat(getComputedStyle(section).paddingTop) - parseFloat(getComputedStyle(section).paddingBottom);
        return { start, end, isTall: contentHeight > window.innerHeight - headerHeight };
      });
      // Tall sections have a bottom stop so their remaining content stays reachable.
      const boundaries = [...new Set(ranges.flatMap(({ start, end, isTall }) => isTall ? [start, end] : [start]))].sort((a, b) => a - b);
      if (boundaries.some(value => Math.abs(position - value) <= 2)) return;
      // Leave the footer reachable after the final section.
      if (position > ranges[ranges.length - 1].end) return;
      const candidates = boundaries.filter(value => direction > 0 ? value > position + 2 : value < position - 2);
      if (!candidates.length) return;
      const target = direction > 0 ? Math.min(...candidates) : Math.max(...candidates);
      animateTo(target);
    };
    const onScroll = () => {
      const position = window.scrollY;
      if (!settling && position !== lastPosition) direction = Math.sign(position - lastPosition);
      lastPosition = position;
      clearTimeout(timer);
      timer = setTimeout(settle, 160);
    };
    const interrupt = () => {
      projectFocusRef.current = false;
      settling = false;
      wheelTarget = null;
      cancelAnimationFrame(wheelFrame);
    };
    const onWheel = event => {
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY) || !event.deltaY || contactRef.current?.open) return;
      projectFocusRef.current = false;
      const position = window.scrollY;
      const canReadFurther = readingRanges().some(range => {
        const inside = position >= range.start - 2 && position <= range.end + 2;
        const hasRoom = event.deltaY > 0 ? position < range.end - 2 : position > range.start + 2;
        return inside && hasRoom;
      });
      if (wheelTarget === null && canReadFurther) return;
      event.preventDefault();
      // Finish the active glide; continued wheel input can then advance immediately.
      if (wheelTarget !== null) return;
      direction = Math.sign(event.deltaY);
      const headerHeight = document.querySelector(".site-header").offsetHeight;
      const maxScroll = document.documentElement.scrollHeight - innerHeight;
      const stops = [...document.querySelectorAll(".hero, .work-section, .about-section")].flatMap(section => {
        const rect = section.getBoundingClientRect();
        const start = Math.max(0, Math.min(maxScroll, rect.top + window.scrollY - headerHeight));
        const end = Math.max(start, Math.min(maxScroll, rect.bottom + window.scrollY - innerHeight));
        const css = getComputedStyle(section);
        const tall = section.offsetHeight - parseFloat(css.paddingTop) - parseFloat(css.paddingBottom) > innerHeight - headerHeight;
        return tall ? [start, end] : [start];
      });
      stops.push(maxScroll);
      const candidates = stops.filter(value => direction > 0 ? value > window.scrollY + 2 : value < window.scrollY - 2);
      if (!candidates.length) return;
      const target = direction > 0 ? Math.min(...candidates) : Math.max(...candidates);
      animateTo(target);
    };
    const touchStart = () => { touchActive = true; interrupt(); };
    const touchEnd = () => { touchActive = false; onScroll(); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", interrupt);
    window.addEventListener("pointerdown", interrupt);
    window.addEventListener("resize", interrupt);
    window.addEventListener("touchstart", touchStart, { passive: true });
    window.addEventListener("touchend", touchEnd, { passive: true });
    window.addEventListener("touchcancel", touchEnd, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      cancelAnimationFrame(wheelFrame);
      window.removeEventListener("keydown", interrupt);
      window.removeEventListener("pointerdown", interrupt);
      window.removeEventListener("resize", interrupt);
      window.removeEventListener("touchstart", touchStart);
      window.removeEventListener("touchend", touchEnd);
      window.removeEventListener("touchcancel", touchEnd);
    };
  }, [reducedMotion]);

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


    };

    focusProjectFromHash();
    window.addEventListener("hashchange", focusProjectFromHash);
    return () => window.removeEventListener("hashchange", focusProjectFromHash);
  }, [projects]);

  useEffect(() => {
    if (currentProjectIndex === null) return;
    projectFocusRef.current = true;
    if (currentProjectIndex >= 4) setMoreProjectsOpen(true);
    let frame;
    const row = document.getElementById(slugify(projects[currentProjectIndex].title));
    const center = () => {
      if (!projectFocusRef.current) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const headerHeight = document.querySelector(".site-header").offsetHeight;
        const rect = row.getBoundingClientRect();
        const available = window.innerHeight - headerHeight;
        // Oversized cards start below the header so their title remains accessible.
        const top = window.scrollY + rect.top - headerHeight - Math.max(0, (available - rect.height) / 2);
        window.scrollTo({ top, behavior: reducedMotion ? "instant" : "smooth" });
      });
    };
    center();
    const image = row.querySelector("img");
    image?.addEventListener("load", center);
    return () => {
      cancelAnimationFrame(frame);
      image?.removeEventListener("load", center);
    };
  }, [currentProjectIndex, projects, reducedMotion]);

  const featured = projects.slice(0, 4);
  const remaining = projects.slice(4);

  const projectRow = (project) => {
    const projectIndex = projects.indexOf(project);
    const isOpen = currentProjectIndex === projectIndex;
    const id = slugify(project.title);
    return (
      <motion.article {...reveal} transition={{ ...reveal.transition, delay: reducedMotion ? 0 : (projectIndex % 4) * 0.06 }} className={`project-row ${isOpen ? "is-open" : ""}`} id={id} key={project.title}>
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
      </motion.article>
    );
  };

  return (
    <main className="portfolio">
      <dialog ref={contactRef} className="contact-dialog" aria-labelledby="contact-title" onClick={(event) => {
        if (event.target === event.currentTarget) {
          const rect = event.currentTarget.getBoundingClientRect();
          if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) event.currentTarget.close();
        }
      }}>
        <div className="contact-dialog-heading"><h2 id="contact-title">Get in touch</h2><button type="button" autoFocus onClick={() => contactRef.current?.close()} aria-label="Close contact options">Close</button></div>
        <p>Choose how you’d like to connect.</p>
        <p className="contact-email">sagbho@umich.edu</p>
        <p className={`contact-status${copyStatus === "Email copied to clipboard." ? " is-success" : ""}`} role="status">{copyStatus === "Email copied to clipboard." && <CheckCircledIcon aria-hidden="true" />}{copyStatus}</p>
        <div className="contact-options"><a href="mailto:sagbho@umich.edu"><EnvelopeClosedIcon aria-hidden="true" />Email</a><a href="https://www.linkedin.com/in/sagar-bhola/" target="_blank" rel="noopener noreferrer"><LinkedInLogoIcon aria-hidden="true" />LinkedIn</a></div>
      </dialog>
      <motion.div className="portfolio-background" aria-hidden="true" style={{ y: reducedMotion ? 0 : backgroundY }} />
      <motion.div className="scroll-progress" aria-hidden="true" style={{ scaleX: scrollYProgress }} />
      {titleBounds && <MotionLink className="animated-wordmark" href="/" scroll={false} onClick={event => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        projectFocusRef.current = true;
        window.scrollTo({ top: 0, behavior: reducedMotion ? "instant" : "smooth" });
      }} aria-label="Sagar Bhola — home" aria-hidden={!wordmarkInHeader} tabIndex={wordmarkInHeader ? 0 : -1} style={{ left: titleBounds.left, width: titleBounds.width, x, y, scale, pointerEvents: wordmarkInHeader ? "auto" : "none" }}><span>SAGAR</span><span>BHOLA</span></MotionLink>}
      <div className="portfolio-shell">
        <motion.header className="site-header" style={{ "--header-progress": displayProgress }}>
          <nav aria-label="Main navigation"><a href="#work">Work</a><a href="#about">About</a><button type="button" onClick={openContact} className="nav-contact" aria-haspopup="dialog">Let’s talk</button></nav>
        </motion.header>

        <motion.section className="hero" aria-labelledby="hero-title" style={{ clipPath: heroClip }}>
          
          <div className="wordmark-slot"><h1 ref={titleRef} style={{ opacity: titleBounds ? 0 : 1 }} id="hero-title">SAGAR<br /><span>BHOLA</span></h1></div>
          <motion.div className="hero-bottom" animate={{ opacity: introHidden ? 0 : 1 }} transition={{ duration: reducedMotion ? 0 : 0.12, ease: "easeOut" }} style={{ pointerEvents: introHidden ? "none" : "auto" }} aria-hidden={introHidden}><p>Building technology that<br />people can trust.</p><a href="#work" className="hero-scroll" tabIndex={introHidden ? -1 : 0}>Explore my work</a></motion.div>
        </motion.section>

        <section className="work-section" id="work" aria-labelledby="work-title">
          <motion.div {...reveal} className="section-heading"><div><h2 id="work-title">Projects</h2></div></motion.div>
          <div className="project-list">{featured.map(projectRow)}</div>
          <details className="more-projects" open={moreProjectsOpen} onToggle={event => setMoreProjectsOpen(event.currentTarget.open)}>
            <summary>{moreProjectsOpen ? "Show fewer projects" : "More projects"}{moreProjectsOpen ? <MinusIcon aria-hidden="true" /> : <PlusIcon aria-hidden="true" />}</summary>
            <div className="project-list">{remaining.map(projectRow)}</div>
          </details>
        </section>

        <section className="about-section" id="about" aria-labelledby="about-title">
          <motion.div {...reveal} className="about-intro"><h2 id="about-title">Making technology<br /><span>safer to use.</span></h2><Image src="/files/IMG_0988%202.jpg" alt="Sagar Bhola" width={88} height={88} className="about-portrait" unoptimized /><p>I’m Sagar, a University of Michigan computer science graduate interested in computer security, cybersecurity, and networks. I want to help make technology safer and more trustworthy for the people who use it.</p><button type="button" onClick={openContact} className="contact-button" aria-haspopup="dialog">Get in touch</button></motion.div>
          <motion.div {...reveal} className="experience"><div className="experience-heading"><span className="eyebrow">Experience</span></div>{work.map(job => <a className="experience-row" key={job.company} href={job.link} target="_blank" rel="noopener noreferrer"><span><strong>{job.company}</strong><small>{job.role}</small></span><span className="experience-date">{job.startDate} — {job.endDate} <ArrowTopRightIcon aria-hidden="true" /></span></a>)}</motion.div>
        </section>
        <footer className="portfolio-footer"><span>© {new Date().getFullYear()} Sagar Bhola</span><div><a href="https://github.com/sagbho" target="_blank" rel="noopener noreferrer">GitHub <ArrowTopRightIcon aria-hidden="true" /></a><a href="https://www.linkedin.com/in/sagar-bhola/" target="_blank" rel="noopener noreferrer">LinkedIn <ArrowTopRightIcon aria-hidden="true" /></a><Link href="/resume">Résumé <ArrowTopRightIcon aria-hidden="true" /></Link></div><a className="back-to-top" href="#top" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Back to top <ArrowUpIcon aria-hidden="true" /></a></footer>
      </div>
    </main>
  );
}
