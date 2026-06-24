import Link from "next/link";
import { ArrowRight, ImageIcon } from "lucide-react";
import type { HomeContent } from "@/app/lib/site-content";

export default function AboutPreview({ content }: { content: HomeContent }) {
  return (
    <section className="site-container">
      <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
        <div className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-green-950 text-white shadow-sm">
          {content.founderImage ? (
            <img
              src={content.founderImage}
              alt="Founder"
              className="aspect-[4/5] min-h-[300px] w-full object-cover"
            />
          ) : (
            <div className="relative flex aspect-[4/5] min-h-[300px] items-center justify-center p-6">
              <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
                <ImageIcon size={28} />
              </div>
              <p className="text-sm font-semibold uppercase tracking-[3px] text-amber-300">
                Founder Photo
              </p>
              <p className="mt-3 text-white/70">
                Prophet Lingston&apos;s image can be added here later.
              </p>
            </div>
            </div>
          )}
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[3px] text-green-700">
            {content.aboutEyebrow}
          </p>
          <h2 className="text-2xl font-bold leading-tight text-gray-950 sm:text-3xl md:text-4xl">
            {content.aboutTitle}
          </h2>
          <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
            {content.aboutText}
          </p>

          <Link
            href="/about"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800"
          >
            Read More
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
