"use client";
import {
  ArrowTopRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  Cross1Icon,
} from "@radix-ui/react-icons";
import React, { useEffect } from "react";

export default function Card({
  info,
  index,
  currentIndex,
  setIndex,
  projects,
}) {
  const isModalOpen = currentIndex === index;

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
          className="fixed top-0 left-0 w-full h-full z-10 bg-black/50 flex items-center justify-center"
          onClick={closeModal}
        >
          <div
            className="w-[90%] h-[90%] md:w-[70%] md:h-[70%] z-50 bg-neutral-800 rounded-lg shadow-lg p-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end">
              <button
                className="text-white cursor-pointer"
                onClick={closeModal}
              >
                <Cross1Icon width="20" height="20" />
              </button>
            </div>

            <div className="grid grid-cols-5 gap-4 items-center h-full">
              <div
                className="flex justify-center cursor-pointer"
                onClick={() => handleProjectSlide("prev")}
              >
                <ChevronLeftIcon width={40} height={40} />
              </div>

              <div className="flex flex-col items-center justify-center col-span-3 overflow-y-auto h-full space-y-6 px-4">
                <div className="text-xl font-medium italic py-6 uppercase tracking-tight text-center break-words">
                  {info.title}
                </div>

                <div className="text-center tracking-tighter">
                  <p>{info.description}</p>
                </div>

                {info.vid && (
                  <div className="flex justify-center md:w-[560px] md:h-full">
                    <iframe
                      src={info.vid}
                      loading="lazy"
                      referrerPolicy="strict-origin"
                      allowFullScreen
                      className="w-full"
                    />
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
                <div className="cursor-pointer p-4">
                  <a
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex
                    items-center justify-center 
                   text-white transition-all gap-x-2 hover:bg-neutral-500 p-3 rounded-full"
                  >
                    <ArrowTopRightIcon width={20} height={20} />
                    <p>View Project</p>
                  </a>
                </div>
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
      )}

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
