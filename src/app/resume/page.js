"use client";
import Header from "@/components/Header";
import { LinkedInLogoIcon, GitHubLogoIcon, EnvelopeClosedIcon } from "@radix-ui/react-icons";

export default function Resume() {
  return (
    <>
      <Header />
      <section className="min-h-screen w-full flex flex-col items-center justify-center px-4 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-24 md:px-10">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-editorial italic p-4 sm:p-6 md:p-10 text-center">
          Résumé
        </h1>
        <p className="text-sm sm:text-base md:text-lg font-extralight tracking-tighter text-center max-w-lg pb-6 md:pb-10">
          If you&apos;re interested in my resume, please reach out.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <a
            href="mailto:sagbho@umich.edu"
            className="flex items-center transition-all duration-300 ease-out hover:bg-neutral-700/50 hover:shadow-md bg-neutral-800/30 backdrop-blur-sm rounded-full border border-neutral-700/50 px-6 py-3 text-neutral-300 hover:text-white font-editorial"
          >
            <EnvelopeClosedIcon width="20" height="20" />
            <span className="ml-2 text-lg">email</span>
          </a>
          <a
            href="https://www.linkedin.com/in/sagar-bhola/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center transition-all duration-300 ease-out hover:bg-neutral-700/50 hover:shadow-md bg-neutral-800/30 backdrop-blur-sm rounded-full border border-neutral-700/50 px-6 py-3 text-neutral-300 hover:text-white font-editorial"
          >
            <LinkedInLogoIcon width="20" height="20" />
            <span className="ml-2 text-lg">linkedin</span>
          </a>
          <a
            href="https://www.github.com/sagbho/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center transition-all duration-300 ease-out hover:bg-neutral-700/50 hover:shadow-md bg-neutral-800/30 backdrop-blur-sm rounded-full border border-neutral-700/50 px-6 py-3 text-neutral-300 hover:text-white font-editorial"
          >
            <GitHubLogoIcon width="20" height="20" />
            <span className="ml-2 text-lg">github</span>
          </a>
        </div>
      </section>
    </>
  );
}
