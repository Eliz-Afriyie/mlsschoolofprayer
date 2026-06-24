"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { HeroSlide } from "@/app/lib/site-content";

export default function Hero({ slides }: { slides: HeroSlide[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrent((previous) =>
        previous === slides.length - 1 ? 0 : previous + 1
      );
    }, 5000);

    return () => window.clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="w-full">
      <div className="relative h-[560px] overflow-hidden sm:h-[620px] lg:h-[650px]">
        {slides.map((slide, index) => (
          <div
            key={`${slide.scripture}-${index}`}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              current === index ? "z-10 opacity-100" : "z-0 opacity-0"
            }`}
          >
            <div
              className="absolute inset-0 scale-105 bg-cover bg-center animate-[zoom_8s_linear_infinite]"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 bg-black/50" />

            <div className="site-container relative z-20 flex h-full items-center">
              <div className="max-w-2xl pt-12 text-white">
                <h1 className="mb-5 text-3xl font-bold leading-tight animate-fadeInUp sm:text-4xl md:mb-6 md:text-6xl">
                  {slide.verse}
                </h1>
                <p className="mb-5 text-sm uppercase tracking-[3px] text-amber-400 animate-fadeInUp delay-100 md:mb-6 md:text-base">
                  {slide.scripture}
                </p>
                <p className="mb-7 text-base leading-7 text-gray-200 animate-fadeInUp delay-200 md:mb-8 md:text-xl md:leading-8">
                  {slide.description}
                </p>
                <div className="flex flex-col gap-3 animate-fadeInUp delay-300 sm:flex-row sm:flex-wrap sm:gap-4">
                  <Link
                    href="/devotional"
                    className="rounded-xl bg-green-700 px-6 py-3 text-center font-semibold transition hover:bg-green-800 sm:rounded-2xl sm:px-8 sm:py-4"
                  >
                    Start Reading
                  </Link>
                  <Link
                    href="/books"
                    className="rounded-xl border border-white/40 px-6 py-3 text-center font-semibold transition hover:bg-white hover:text-black sm:rounded-2xl sm:px-8 sm:py-4"
                  >
                    Explore Books
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-3">
          {slides.map((slide, index) => (
            <button
              key={`${slide.scripture}-dot`}
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={`Show slide ${index + 1}`}
              className={`h-3 rounded-full transition-all duration-300 ${
                current === index ? "w-8 bg-white" : "w-3 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
