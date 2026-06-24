"use client";

import { useEffect, useState } from "react";

export default function AboutHero({
  slides,
  eyebrow,
  title,
  text,
}: {
  slides: { image: string; position: string }[];
  eyebrow: string;
  title: string;
  text: string;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (slides.length < 2) {
      return;
    }

    const interval = window.setInterval(() => {
      setCurrent((previous) =>
        previous === slides.length - 1 ? 0 : previous + 1
      );
    }, 5000);

    return () => window.clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative min-h-[360px] overflow-hidden py-16 text-white sm:min-h-[430px] sm:py-24">
      {slides.map((slide, index) => (
        <div
          key={`${slide.image}-${index}`}
          className={`absolute inset-0 bg-cover transition-opacity duration-1000 ${
            current === index ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url('${slide.image}')`,
            backgroundPosition: slide.position,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B2D16]/95 via-[#0B2D16]/80 to-[#0B2D16]/35" />

      <div className="site-container relative z-10">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[3px] text-amber-300">
          {eyebrow}
        </p>
        <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-base leading-7 text-gray-200 sm:text-lg sm:leading-8">
          {text}
        </p>
      </div>

      {slides.length > 1 ? (
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {slides.map((slide, index) => (
            <button
              key={`${slide.image}-dot`}
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={`Show About hero image ${index + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                current === index ? "w-8 bg-white" : "w-2.5 bg-white/45"
              }`}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
