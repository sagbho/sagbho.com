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
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
      modalRef.current?.focus(); // Autofocus for keydown to work
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
          className="fixed top-0 left-0 w-full h-full z-10 bg-black/50 flex items-center justify-center"
          onClick={closeModal}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") handleProjectSlide("prev");
            if (e.key === "ArrowRight") handleProjectSlide("next");
            if (e.key === "Escape") closeModal();
          }}
        >
          <div
            className="w-[90%] md:w-[70%] h-[80%] md:h-[90vh] z-50 bg-neutral-800 rounded-none md:rounded-lg shadow-lg overflow-hidden flex flex-col relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <div className="flex justify-end p-4">
              <button
                className="text-white cursor-pointer"
                onClick={closeModal}
              >
                <Cross1Icon width="20" height="20" />
              </button>
            </div>

            {/* Modal Content Wrapper */}
            <div className="relative flex-1 flex flex-col overflow-hidden">
              {/* Scrollable Inner Content */}
              <div className="flex-1 overflow-y-auto flex flex-col gap-4 items-center px-2 pb-32">
                <div className="flex flex-col items-center justify-center space-y-6 px-2 md:px-4 w-full md:w-[70%]">
                  <div className="text-xl font-medium italic py-6 uppercase tracking-tight text-center break-words">
                    {info.title}
                  </div>

                  <div className="text-center tracking-tighter px-2">
                    <p>{info.description}</p>
                  </div>

                  {info.vid && (
                    <div className="w-full max-w-4xl px-4">
                      <div className="relative aspect-video">
                        <iframe
                          src={info.vid}
                          loading="lazy"
                          referrerPolicy="strict-origin"
                          allowFullScreen
                          className="absolute top-0 left-0 w-full h-full rounded-lg object-cover"
                        />
                      </div>
                    </div>
                  )}

                  {info.img && (
                    <div className="w-full max-w-4xl px-4">
                      <div className="relative aspect-video">
                        <img
                          src={info.img}
                          loading="lazy"
                          className="absolute top-0 left-0 w-full h-full rounded-lg object-cover"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col items-center justify-center gap-y-4 p-4 tracking-tighter">
                    <div className="text-xl p-2">Skills</div>
                    <div className="flex flex-wrap justify-center gap-2">
                      {info.skills.map((skill, i) => (
                        <div
                          key={i}
                          className="flex text-center justify-center items-center px-3 py-1 rounded-xl text-sm bg-neutral-500"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>

                  {info.link && (
                    <div className="cursor-pointer">
                      <a
                        href={info.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center text-white transition-all gap-x-2 hover:bg-neutral-500 p-3 rounded-full"
                      >
                        <ArrowTopRightIcon width={20} height={20} />
                        <p>View Project</p>
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Fixed Navigation Arrows */}
              <div className="absolute bottom-0 left-0 w-full bg-neutral-800 border-t border-neutral-700 py-4 flex justify-evenly items-center z-20">
                <div
                  className="flex justify-center cursor-pointer"
                  onClick={() => handleProjectSlide("prev")}
                >
                  <ChevronLeftIcon width={40} height={40} />
                </div>
                <div
                  className="flex justify-center cursor-pointer"
                  onClick={() => handleProjectSlide("next")}
                >
                  <ChevronRightIcon width={40} height={40} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Thumbnail card */}
      <div
        className="flex flex-row w-full max-w-md h-64 border border-white hover:border-stone-600 cursor-pointer"
        onClick={() => setIndex(index)}
      >
        <div className="flex flex-col items-center justify-center w-full max-w-md h-64 overflow-y-scroll">
          <div className="text-xl font-medium italic py-6 px-2 uppercase tracking-tight text-center break-words">
            {info.title}
          </div>
          <div className="w-[70%] h-[50%] flex items-center justify-center tracking-tighter text-center">
            <p>{info.description}</p>
          </div>
          <div className="flex flex-wrap justify-center space-x-3 py-4 px-2 w-full tracking-tighter bg-stone-600 hover:bg-stone-700 text-white">
            <ChevronUpIcon width={20} height={20} />
          </div>
        </div>
      </div>
    </>
  );
}
