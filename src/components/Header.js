import React from "react";

export default function Header() {
  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 animate-slide-down p-6">
      <div className="inline-flex justify-evenly space-x-4 p-4 font-editorial font-extralight text-[24px] hover:transition-all hover:duration-500 hover:ease-in-out hover:bg-neutral-700/50 hover:shadow-md hover:rounded-full">
        <a
          className="cursor-pointer transition-all hover:text-neutral-500 flex align-middle relative py-1 px-2"
          href="#home"
        >
          home
        </a>
        <a
          className="cursor-pointer transition-all hover:text-neutral-500 flex align-middle relative py-1 px-2"
          href="#projects"
        >
          projects
        </a>
        <a
          className="cursor-pointer transition-all hover:text-neutral-500 flex align-middle relative py-1 px-2"
          href="/files/sagar_bhola_resume.pdf"
          alt="alt text"
          target="_blank"
          rel="noopener noreferrer"
        >
          résumé
        </a>
        <a
          className="cursor-pointer transition-all hover:text-neutral-500 flex align-middle relative py-1 px-2"
          href="contact"
        >
          contact
        </a>
      </div>
    </div>
  );
}
