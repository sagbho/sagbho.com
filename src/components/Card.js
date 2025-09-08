"use client";
import {
  ArrowTopRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  Cross1Icon,
} from "@radix-ui/react-icons";
import React, { useEffect, useRef } from "react";

export default function Card({
  info,
  index,
  currentIndex,
  setIndex,
  projects,
}) {
  const isModalOpen = currentIndex === index;
  const modalRef = useRef(null);

  const handleProjectSlide = (direction) => {
    setIndex((prev) => {
      if (direction === "prev") {
        return prev === 0 ? projects.length - 1 : prev - 1;
      } else if (direction === "next") {
        return prev === projects.length - 1 ? 0 : prev + 1;
      }
      return prev;
    });
  };

  const closeModal = () => {
    setIndex(null);
    window.history.pushState("", document.title, window.location.pathname);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
      modalRef.current?.focus();
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isModalOpen]);

  return (
    <>
      {isModalOpen && (
        <div
          ref={modalRef}
          tabIndex={0}
          className="fixed inset-0 z-10 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeModal}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") handleProjectSlide("prev");
            if (e.key === "ArrowRight") handleProjectSlide("next");
            if (e.key === "Escape") closeModal();
          }}
        >
          <div
            className="w-full max-w-3xl max-h-[85vh] bg-neutral-800/30 backdrop-blur-sm rounded-lg border border-neutral-700/50 shadow-lg overflow-hidden flex flex-col relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Close Button */}
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-neutral-700/50">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-white">
                {info.title}
              </h2>
              <button
                className="text-neutral-300 hover:text-white cursor-pointer p-3 hover:bg-neutral-700/50 hover:shadow-md bg-neutral-800/30 backdrop-blur-sm rounded-full border border-neutral-700/50 transition-all duration-300 ease-out"
                onClick={closeModal}
              >
                <Cross1Icon width="20" height="20" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 sm:p-6 space-y-6">
                <div className="text-center">
                  <p className="text-sm sm:text-base md:text-lg font-extralight tracking-tighter text-neutral-300 max-w-2xl mx-auto">
                    {info.description}
                  </p>
                </div>

                {info.vid && (
                  <div className="w-full">
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                      <iframe
                        src={info.vid}
                        loading="lazy"
                        referrerPolicy="strict-origin"
                        allowFullScreen
                        className="absolute top-0 left-0 w-full h-full"
                      />
                    </div>
                  </div>
                )}

                {info.img && (
                  <div className="w-full">
                    <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg ring-1 ring-neutral-600/30 shadow-neutral-500/20">
                      <img
                        src={info.img}
                        loading="lazy"
                        className="absolute top-0 left-0 w-full h-full object-cover"
                      />
                      {info.link && (
                        <div className="absolute bottom-4 left-4">
                          <a
                            href={info.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center text-neutral-700 text-sm bg-neutral-200/90 transition-all gap-x-2 hover:bg-neutral-500/75 px-4 py-2 rounded-full"
                          >
                            <ArrowTopRightIcon width={16} height={16} />
                            <span className="font-bold">View Project</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="text-center">
                  <h3 className="text-lg sm:text-xl font-medium text-white mb-4">
                    Skills
                  </h3>
                  <div className="flex flex-wrap justify-center gap-3">
                    {info.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 rounded-full text-sm sm:text-base bg-neutral-800/30 backdrop-blur-sm border border-neutral-700/50 text-neutral-300 font-extralight tracking-tighter"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Footer */}
            <div className="border-t border-neutral-700/50 p-4 sm:p-6 bg-neutral-800/30 backdrop-blur-sm">
              <div className="flex justify-between items-center">
                <button
                  className="flex items-center justify-center p-3 hover:bg-neutral-700/50 hover:shadow-md bg-neutral-800/30 backdrop-blur-sm rounded-full border border-neutral-700/50 text-neutral-300 hover:text-white transition-all duration-300 ease-out"
                  onClick={() => handleProjectSlide("prev")}
                >
                  <ChevronLeftIcon width={24} height={24} />
                </button>
                <span className="text-sm sm:text-base text-neutral-300 font-editorial font-extralight tracking-tighter px-4 py-2 bg-neutral-800/30 backdrop-blur-sm rounded-full border border-neutral-700/50">
                  {currentIndex + 1} of {projects.length}
                </span>
                <button
                  className="flex items-center justify-center p-3 hover:bg-neutral-700/50 hover:shadow-md bg-neutral-800/30 backdrop-blur-sm rounded-full border border-neutral-700/50 text-neutral-300 hover:text-white transition-all duration-300 ease-out"
                  onClick={() => handleProjectSlide("next")}
                >
                  <ChevronRightIcon width={24} height={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Thumbnail card */}
      <div
        className="flex flex-row w-full max-w-sm sm:max-w-md h-56 sm:h-64 border border-neutral-700/50 hover:border-neutral-600/70 cursor-pointer transition-all duration-300 ease-out rounded-lg overflow-hidden bg-neutral-800/20 backdrop-blur-sm hover:bg-neutral-800/30"
        onClick={() => {
          setIndex(index);
        }}
      >
        <div className="flex flex-col w-full h-full">
          <div className="text-lg sm:text-xl font-medium py-3 sm:py-4 px-3 sm:px-2 uppercase tracking-tighter text-center break-words">
            {info.title}
          </div>
          <div className="flex-1 flex items-center justify-center tracking-tighter text-center px-4 py-2">
            <p className="text-sm sm:text-base leading-relaxed max-w-[90%]">
              {info.description}
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center py-3 sm:py-4 px-2 w-full tracking-tighter bg-neutral-800/30 backdrop-blur-sm border-t border-neutral-700/50 text-neutral-300 hover:text-white hover:bg-neutral-700/50 transition-all duration-300 ease-out min-h-[48px] sm:min-h-auto">
            <ChevronUpIcon width={20} height={20} />
          </div>
        </div>
      </div>
    </>
  );
}
