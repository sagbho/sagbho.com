"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const SITE_TITLE = "Sagar Bhola";

const BUBBLE_TRANSITION = {
  type: "spring",
  stiffness: 350,
  damping: 30,
};

export default function Header() {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState("home");
  const [hoverLink, setHoverLink] = useState(null);

  const links = [
    { id: "home", label: "home", href: "/" },
    { id: "projects", label: "projects", href: "/#projects" },
    { id: "resume", label: "résumé", href: "/resume" },
    { id: "contact", label: "contact", href: "/#contact" },
  ];

  const activeOrHover = hoverLink ?? activeLink;

  // Sync active link with current route
  useEffect(() => {
    if (pathname === "/resume") {
      setActiveLink("resume");
      return;
    }
    if (pathname === "/") {
      const hash =
        typeof window !== "undefined"
          ? window.location.hash.replace("#", "") || "home"
          : "home";
      setActiveLink(hash);
      return;
    }
    setActiveLink("home");
  }, [pathname]);

  // On home page: sync active link with hash and scroll
  useEffect(() => {
    if (pathname !== "/") return;

    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "") || "home";
      setActiveLink(hash);
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;

    const scrollContainer = document.querySelector(".snap-y.snap-mandatory");
    if (!scrollContainer) return;

    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const containerRect = scrollContainer.getBoundingClientRect();
      const centerY = containerRect.top + containerRect.height / 2;

      for (const section of sections) {
        const sectionRect = section.getBoundingClientRect();
        if (
          sectionRect.top <= centerY &&
          sectionRect.bottom >= centerY
        ) {
          const sectionId = section.id;
          if (activeLink !== sectionId) {
            setActiveLink(sectionId);
            if (window.location.hash !== `#${sectionId}`) {
              window.history.replaceState(null, null, `#${sectionId}`);
            }
          }
          break;
        }
      }
    };

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    scrollContainer.addEventListener("scroll", throttledScroll);
    handleScroll();
    return () => scrollContainer.removeEventListener("scroll", throttledScroll);
  }, [pathname, activeLink]);

  // Dynamic document title
  useEffect(() => {
    const titles = {
      home: SITE_TITLE,
      projects: `Projects | ${SITE_TITLE}`,
      contact: `Contact | ${SITE_TITLE}`,
      resume: `Résumé | ${SITE_TITLE}`,
    };
    document.title = titles[activeLink] ?? SITE_TITLE;
  }, [activeLink]);

  const handleLinkClick = () => {
    // Active link updates via navigation / hash / scroll
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 px-4 sm:px-6 z-[9999]"
    >
      <nav className="relative inline-flex justify-center items-center sm:space-x-3 gap-2 sm:gap-0 px-6 sm:px-8 py-3 sm:py-4 font-editorial font-extralight text-lg sm:text-xl md:text-2xl bg-neutral-800/30 backdrop-blur-sm rounded-full border border-neutral-700/50">
        {links.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            className="relative cursor-pointer flex items-center py-2 px-4 text-center rounded-full z-10 text-neutral-300 hover:text-white transition-colors duration-200"
            onClick={handleLinkClick}
            onMouseEnter={() => setHoverLink(link.id)}
            onMouseLeave={() => setHoverLink(null)}
          >
            {(activeLink === link.id || hoverLink === link.id) && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 rounded-full bg-neutral-700/50 -z-[1]"
                transition={BUBBLE_TRANSITION}
                style={{ zIndex: 0 }}
              />
            )}
            <span
              className={`relative z-10 ${
                activeLink === link.id || hoverLink === link.id
                  ? "text-white"
                  : ""
              }`}
            >
              {link.label}
            </span>
          </Link>
        ))}
      </nav>
    </motion.div>
  );
}
