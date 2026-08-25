"use client";

import Link from "next/link";
import Image from "next/image";

const images = [
  {
    src: "/vbd.png",
    label: "driver view",
    width: 1832,
    height: 1034,
  },
];

const stats = [
  ["Input", "temporal image stack + speed"],
  ["Steering", "continuous regression"],
  ["Throttle", "brake / coast / accelerate"],
  ["Split", "session-level train / validation"],
];

const stack = [
  "Python",
  "PyTorch",
  "OpenCV",
  "DXcam",
  "Computer Vision",
  "Model Evaluation",
];

const timeline = [
  {
    phase: "Record",
    title: "Capture driving sessions",
    body: "Collect screen frames, controller input, speed, and motion data.",
  },
  {
    phase: "Validate",
    title: "Reject bad sessions",
    body: "Check frame quality, timestamps, and controller ranges.",
  },
  {
    phase: "Playback",
    title: "Generate annotated review",
    body: "Review sessions visually before training.",
  },
  {
    phase: "Build",
    title: "Clean and split data",
    body: "Remove noisy segments and create train/validation data.",
  },
  {
    phase: "Train",
    title: "Fit two task-specific models",
    body: "Train steering regression and throttle/brake classification.",
  },
  {
    phase: "Evaluate",
    title: "Compare model versions",
    body: "Measure the best models on held-out driving samples.",
  },
  {
    phase: "Drive",
    title: "Run live inference",
    body: "Use the trained models for simulator control.",
  },
];

export default function Page() {
  return (
    <main className="font-mono">
      <div className="mx-auto min-h-screen w-full max-w-6xl px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end">
          <div className="max-w-3xl opacity-0 animate-slide-down">
            <Link
              href="/"
              className="text-xs uppercase tracking-[0.16em] text-neutral-400 duration-200 hover:text-blue-300"
            >
              Sagar Bhola
            </Link>
            {/* <p className="pt-10 text-xs uppercase tracking-[0.16em] text-neutral-400">
              Vision-based driver
            </p> */}
            <h1 className="pt-4 font-editorial text-5xl italic leading-[0.96] tracking-tight sm:text-7xl lg:text-8xl">
              Vision-Based Autonomous Driving Agent
            </h1>
            <p className="max-w-2xl pt-6 text-base leading-relaxed text-neutral-300 sm:text-lg">
              A PyTorch driving pipeline that learns simulator control from
              screen recordings and speed, using separate models for steering and
              throttle/brake behavior.
            </p>
          </div>

          <div className="border-l border-neutral-700 pl-5 opacity-0 animate-slide-up">
            <p className="text-xs uppercase tracking-[0.16em] text-neutral-400">
              Summary
            </p>
            <p className="pt-4 text-sm leading-relaxed text-neutral-300">
              The project moves from recorded gameplay to cleaned training data,
              then into evaluated models that can drive in real time.
            </p>
            <div className="mt-6 grid gap-3">
              {stats.map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-start justify-between gap-4 border-t border-neutral-800 pt-3 text-xs"
                >
                  <span className="uppercase text-neutral-500">{label}</span>
                  <span className="max-w-[13rem] text-right text-neutral-200">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pt-14 opacity-0 animate-slide-up">
          {images.map((image) => (
            <figure key={image.src} className="min-w-0">
              <div className="aspect-video overflow-hidden border border-neutral-800 bg-neutral-950/50">
                <Image
                  src={image.src}
                  alt={`Vision-based driver ${image.label}`}
                  width={image.width}
                  height={image.height}
                  unoptimized
                  className="h-full w-full object-contain"
                />
              </div>
              <figcaption className="pt-2 text-[10px] uppercase tracking-[0.14em] text-neutral-500">
                {image.label}
              </figcaption>
            </figure>
          ))}
        </section>

        <section className="grid gap-10 pt-16 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="opacity-0 animate-slide-up">
            <h2 className="text-xs uppercase tracking-[0.16em] text-neutral-400">
              Stack
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {stack.map((item) => (
                <span
                  key={item}
                  className="border border-neutral-700 px-2 py-1 text-[10px] lowercase text-neutral-300"
                >
                  {item}
                </span>
              ))}
            </div>
            {/* <Link
              href="https://github.com/sagbho/vision-based-driver"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block text-xs underline decoration-neutral-600 underline-offset-4 duration-200 hover:text-blue-300"
            >
              open repository
            </Link> */}
          </aside>

          <div className="opacity-0 animate-slide-up">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-neutral-400">
                  Timeline
                </p>
                <h2 className="pt-3 font-editorial text-3xl italic tracking-tight sm:text-4xl">
                  From capture to control
                </h2>
              </div>
              
            </div>

            <ol className="relative mt-8 space-y-6 border-l border-neutral-700 pl-6">
              {timeline.map((item, index) => (
                <li key={item.phase} className="relative">
                  <span className="absolute -left-[31px] flex h-3 w-3 items-center justify-center rounded-full border border-neutral-500 bg-[#111111]" />
                  <div className="grid gap-3 border-b border-neutral-800 pb-6 sm:grid-cols-[8rem_minmax(0,1fr)]">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.16em] text-blue-300">
                        {String(index + 1).padStart(2, "0")} / {item.phase}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-md font-semibold tracking-tight text-neutral-100">
                        {item.title}
                      </h3>
                      <p className="max-w-2xl pt-2 text-xs leading-relaxed text-neutral-400">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>
    </main>
  );
}
