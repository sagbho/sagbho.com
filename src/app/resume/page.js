"use client";
import { useState } from "react";
import {
  ArrowLeftIcon,
  EnvelopeClosedIcon,
  LinkedInLogoIcon,
  GitHubLogoIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

export default function Resume() {
  const [showEmail, setShowEmail] = useState(false);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "var(--background)" }}
    >
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Back to home link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8 text-sm"
        >
          <ArrowLeftIcon width={16} height={16} />
          Back to portfolio
        </Link>

        {/* Main content */}
        <div className="bg-neutral-800/30 backdrop-blur-sm rounded-2xl border border-neutral-700/50 p-8 md:p-12 shadow-2xl">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-editorial italic text-white mb-6 tracking-tight">
              Résumé Request
            </h1>

            <div className="w-16 h-px bg-gradient-to-r from-transparent via-neutral-500 to-transparent mx-auto"></div>

            <p className="text-lg md:text-xl text-neutral-300 font-light leading-relaxed tracking-tighter">
              If you are a recruiter or hiring manager interested in viewing my
              résumé, I'd be happy to share it with you directly.
            </p>

            <p className="text-base md:text-lg text-neutral-400 font-extralight tracking-tighter">
              Please reach out to me via email and I'll send you the most
              up-to-date version along with any additional information you might
              need.
            </p>

            {/* Contact section */}
            <div className="pt-6 space-y-4">
              <button
                onClick={() => setShowEmail(!showEmail)}
                className="inline-flex items-center gap-3 bg-neutral-700/50 hover:bg-neutral-600/50 
                          transition-all duration-300 rounded-full px-6 py-3 text-neutral-200 
                          hover:text-white border border-neutral-600/50 hover:border-neutral-500/50"
              >
                <EnvelopeClosedIcon width={18} height={18} />
                <span className="font-medium tracking-tighter">Contact me</span>
              </button>

              {showEmail && (
                <div className="animate-in fade-in duration-300">
                  <p className="text-neutral-300 font-mono text-lg tracking-tight">
                    sagbho[at]umich[dot]edu
                  </p>
                  <p className="text-sm text-neutral-500 mt-2 tracking-tighter">
                    I typically respond within 24 hours
                  </p>
                </div>
              )}
            </div>

            {/* Alternative contact methods */}
            <div className="pt-6 border-t border-neutral-700/30">
              <p className="text-sm text-neutral-500 mb-4 tracking-tighter">
                You can also find me on:
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <a
                  href="https://www.linkedin.com/in/sagar-bhola/"
                  className="flex items-center transition-all duration-300 ease-out hover:bg-neutral-700/50 hover:shadow-md bg-neutral-800/30 backdrop-blur-sm rounded-full border border-neutral-700/50 px-6 py-3 text-neutral-300 hover:text-white font-editorial"
                >
                  <LinkedInLogoIcon width="20" height="20" />
                  <span className="ml-2 text-lg">linkedin</span>
                </a>
                <a
                  href="https://www.github.com/sagbho/"
                  className="flex items-center transition-all duration-300 ease-out hover:bg-neutral-700/50 hover:shadow-md bg-neutral-800/30 backdrop-blur-sm rounded-full border border-neutral-700/50 px-6 py-3 text-neutral-300 hover:text-white font-editorial"
                >
                  <GitHubLogoIcon width="20" height="20" />
                  <span className="ml-2 text-lg">github</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
