import Link from "next/link";
import { ArrowRight, Church, ImageIcon } from "lucide-react";

export default function AboutPreview() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
        <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl bg-green-950 text-white shadow-sm">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.18),transparent_35%)]" />
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
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[3px] text-green-700">
            About Prophet Lingston
          </p>
          <h2 className="text-2xl font-bold leading-tight text-gray-950 sm:text-3xl md:text-4xl">
            A voice of prayer, biblical direction, and spiritual growth.
          </h2>
          <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
            Prophet Lingston is an associate pastor at Fountain Gate Chapel
            International, Desert Pastures. Through the School of Prayer, he
            equips believers with strategic prayer education, biblical
            devotionals, and practical direction for a stronger walk with God.
          </p>

          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-800">
              <Church size={22} />
            </div>
            <div>
              <h3 className="font-bold text-gray-950">
                Fountain Gate Chapel International
              </h3>
              <p className="mt-1 text-gray-600">Desert Pastures</p>
            </div>
          </div>

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
