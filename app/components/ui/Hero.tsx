"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    image: "/herobg.png",
    verse: "“Be still, and know that I am God.”",
    scripture: "Psalm 46:10",
    description:
      "Daily devotionals to strengthen your faith and deepen your walk with God.",
  },

  {
    image: "/herobg2.jpg",
    verse: "“The Lord is my shepherd; I shall not want.”",
    scripture: "Psalm 23:1",
    description:
      "Find peace, hope, and encouragement through the truth of Scripture.",
  },

  {
    image: "/hero3.jpg",
    verse: "“I can do all things through Christ.”",
    scripture: "Philippians 4:13",
    description:
      "Grow spiritually with Christian books, articles, and devotionals.",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goTo = (index: number) => {
    setCurrent(index);
  };

  return (
    <section className="w-full">
      <div className="relative h-[560px] overflow-hidden sm:h-[620px] lg:h-[650px]">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              current === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center scale-105 animate-[zoom_8s_linear_infinite]"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Content */}
            <div className="site-container relative z-20 flex h-full items-center">
              <div className="max-w-2xl pt-12 text-white">
                {/* Verse */}
                <h1 className="mb-5 text-3xl font-bold leading-tight animate-fadeInUp sm:text-4xl md:mb-6 md:text-6xl">
                  {slide.verse}
                </h1>

                {/* Scripture */}
                <p className="mb-5 text-sm uppercase tracking-[3px] text-amber-400 animate-fadeInUp delay-100 md:mb-6 md:text-base">
                  {slide.scripture}
                </p>

                {/* Description */}
                <p className="mb-7 text-base leading-7 text-gray-200 animate-fadeInUp delay-200 md:mb-8 md:text-xl md:leading-8">
                  {slide.description}
                </p>

                {/* Buttons */}
                <div className="flex flex-col gap-3 animate-fadeInUp delay-300 sm:flex-row sm:flex-wrap sm:gap-4">
                  <button className="rounded-xl bg-green-700 px-6 py-3 font-semibold transition hover:bg-green-800 sm:rounded-2xl sm:px-8 sm:py-4">
                    <Link href="/devotional">Start Reading</Link>
                  </button>

                  <button className="rounded-xl border border-white/40 px-6 py-3 font-semibold transition hover:bg-white hover:text-black sm:rounded-2xl sm:px-8 sm:py-4">
                    <Link href="/books">Explore Books</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                current === index ? "bg-white w-8" : "bg-white/40 w-3"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
