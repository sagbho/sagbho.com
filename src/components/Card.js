"use client";
import { ArrowTopRightIcon, Cross1Icon, PlayIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";

export default function Card({ info }) {
  const [runVid, setRunVid] = useState(false);
  const handleVideo = (e) => {
    e.preventDefault();
    setRunVid(!runVid);
  };

  const [openSkills, setOpenSkills] = useState(false);

  const handleSkills = (e) => {
    e.preventDefault();
    setOpenSkills(!openSkills);
  };

  return (
    <div className="flex flex-row w-full max-w-md h-64 border border-white hover:border-stone-600">
      <div className="flex flex-col items-center justify-center w-full max-w-md h-64 overflow-y-scroll">
        <div className="text-xl font-medium italic py-6 px-2 uppercase tracking-tight text-center break-words">
          {info.title}
        </div>
        <div className="w-[70%] h-[50%] flex items-center justify-center tracking-tighter text-center">
          <p>{info.description}</p>
        </div>
        {runVid && (
          <div>
            <iframe src={info.vid} loading="lazy" allowFullScreen />
          </div>
        )}
        <div className="flex flex-wrap justify-center space-x-3 py-4 px-2 w-full">
          {info.link && (
            <a
              href={info.link}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100 p-2"
            >
              <ArrowTopRightIcon width="20" height="20" />
              <p className="ml-1 h-7 font-editorial">{info.type}</p>
            </a>
          )}
          <a
            href="#"
            className="cursor-pointer flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100 p-2"
          >
            {runVid ? (
              <>
                <Cross1Icon width="20" height="20" />
                <p
                  className="ml-1 h-7 font-editorial"
                  onClick={(e) => {
                    handleVideo(e);
                  }}
                >
                  close
                </p>
              </>
            ) : (
              <>
                {info.vid && (
                  <>
                    <ArrowTopRightIcon width="20" height="20" />
                    <p
                      className="ml-1 h-7 font-editorial"
                      onClick={(e) => {
                        handleVideo(e);
                      }}
                    >
                      video
                    </p>
                  </>
                )}
              </>
            )}
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100 p-2"
            onClick={handleSkills}
          >
            <ArrowTopRightIcon width="20" height="20" />
            <p className="ml-1 h-7 font-editorial">skills</p>
          </a>
        </div>
      </div>
      {openSkills && (
        <div className="flex flex-col py-2 w-[35%] bg-black  justify-center items-center overflow-y-scroll delay-100 animate-slide-left ">
          <ol className="w-full">
            {info.skills.map((skill, index) => (
              <li
                className="bg-black tracking-tighter px-2 py-1  mb-1 text-center"
                key={index}
              >
                <a>{skill}</a>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
