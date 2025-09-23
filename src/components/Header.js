import React, { useState, useEffect, useRef } from "react";

export default function Header() {
  const [activeLink, setActiveLink] = useState("home");
  const [hoverLink, setHoverLink] = useState(null);
  const [bubbleStyle, setBubbleStyle] = useState({});
  const navRef = useRef(null);
  const navigationTimeoutRef = useRef(null);

  const links = [
    { id: "home", label: "home", href: "#home" },
    { id: "projects", label: "projects", href: "#projects" },
    {
      id: "resume",
      label: "résumé",
      href: "/resume",
    },
    { id: "contact", label: "contact", href: "#contact" },
  ];

  const updateBubblePosition = (linkId) => {
    if (!navRef.current) return;

    const linkElement = navRef.current.querySelector(`[data-link="${linkId}"]`);
    if (!linkElement) return;

    const navRect = navRef.current.getBoundingClientRect();
    const linkRect = linkElement.getBoundingClientRect();

    // Calculate position relative to the nav container
    const offsetX = linkRect.left - navRect.left;
    const offsetY = linkRect.top - navRect.top;

    setBubbleStyle({
      width: linkRect.width,
      height: linkRect.height,
      left: offsetX,
      top: offsetY,
    });
  };

  useEffect(() => {
    // Set initial bubble position
    updateBubblePosition(activeLink);
  }, [activeLink]);

  useEffect(() => {
    // Handle hash changes to update active link
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "") || "home";
      setActiveLink(hash);
    };

    handleHashChange(); // Set initial state
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    // Find the scroll container
    const scrollContainer = document.querySelector(".snap-y.snap-mandatory");
    if (!scrollContainer) return;

    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const containerRect = scrollContainer.getBoundingClientRect();
      const centerY = containerRect.top + containerRect.height / 2;

      for (let section of sections) {
        const sectionRect = section.getBoundingClientRect();
        const sectionTop = sectionRect.top;
        const sectionBottom = sectionRect.bottom;

        // Check if section center is in viewport center area
        if (sectionTop <= centerY && sectionBottom >= centerY) {
          const sectionId = section.id;
          if (activeLink !== sectionId) {
            // Clear any pending navigation timeout
            if (navigationTimeoutRef.current) {
              clearTimeout(navigationTimeoutRef.current);
              navigationTimeoutRef.current = null;
            }

            setActiveLink(sectionId);
            // Update URL hash without triggering scroll
            if (window.location.hash !== `#${sectionId}`) {
              window.history.replaceState(null, null, `#${sectionId}`);
            }
          }
          break;
        }
      }
    };

    // Throttle scroll events
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
    handleScroll(); // Initial call

    return () => {
      scrollContainer.removeEventListener("scroll", throttledScroll);
    };
  }, [activeLink]);

  const handleLinkClick = (link) => {
    if (!link.external) {
      // Immediately set the active link for instant bubble movement
      setActiveLink(link.id);

      // Delay scroll detection briefly to prevent intermediate animations
      navigationTimeoutRef.current = setTimeout(() => {
        navigationTimeoutRef.current = null;
      }, 200);
    }
  };

  const handleMouseEnter = (linkId) => {
    setHoverLink(linkId);
    updateBubblePosition(linkId);
  };

  const handleMouseLeave = () => {
    setHoverLink(null);
    updateBubblePosition(activeLink);
  };

  return (
    <div className="absolute top-4 sm:top-6 left-1/2 transform -translate-x-1/2 animate-slide-down px-4 sm:px-6 z-[9999]">
      <nav
        ref={navRef}
        className="relative inline-flex justify-center items-center sm:space-x-3 gap-2 sm:gap-0 px-6 sm:px-8 py-3 sm:py-4 font-editorial font-extralight text-lg sm:text-xl md:text-2xl bg-neutral-800/30 backdrop-blur-sm rounded-full border border-neutral-700/50"
      >
        {/* Animated bubble */}
        <div
          className="absolute bg-neutral-700/50 rounded-full transition-all duration-500 ease-in-out pointer-events-none"
          style={{
            ...bubbleStyle,
            opacity: hoverLink || activeLink ? 1 : 0,
          }}
        />

        {links.map((link) => (
          <a
            key={link.id}
            data-link={link.id}
            className={`cursor-pointer transition-all duration-200 flex items-center relative py-2 px-4 text-center rounded-full z-10 ${
              activeLink === link.id && !hoverLink
                ? "text-white"
                : hoverLink === link.id
                ? "text-white"
                : "text-neutral-300 hover:text-white"
            }`}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            onClick={() => handleLinkClick(link)}
            onMouseEnter={() => handleMouseEnter(link.id)}
            onMouseLeave={handleMouseLeave}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
