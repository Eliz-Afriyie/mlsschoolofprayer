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
    image: "/herobg3.jpg",
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
      <div className="relative h-150 overflow-hidden">
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
            <div className="relative z-20 h-full flex items-center">
              <div className="max-w-2xl px-10 md:px-16 text-white">
                {/* Verse */}
                <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 animate-fadeInUp">
                  {slide.verse}
                </h1>

                {/* Scripture */}
                <p className="text-amber-400 uppercase tracking-[3px] text-sm md:text-base mb-6 animate-fadeInUp delay-100">
                  {slide.scripture}
                </p>

                {/* Description */}
                <p className="text-lg md:text-xl text-gray-200 leading-8 mb-8 animate-fadeInUp delay-200">
                  {slide.description}
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4 animate-fadeInUp delay-300">
                  <button className="bg-green-700 hover:bg-green-800 px-8 py-4 rounded-2xl font-semibold transition">
                    <Link href="/devotional">Start Reading</Link>
                  </button>

                  <button className="border border-white/40 hover:bg-white hover:text-black px-8 py-4 rounded-2xl font-semibold transition">
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
