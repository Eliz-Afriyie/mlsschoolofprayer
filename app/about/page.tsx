import { BookOpen, Church, ImageIcon, Mic } from "lucide-react";

const highlights = [
  {
    icon: Church,
    title: "Associate Pastor",
    text: "Serving at Fountain Gate Chapel International, Desert Pastures.",
  },
  {
    icon: Mic,
    title: "Prophetic Voice",
    text: "Teaching prayer, spiritual discipline, and biblical direction.",
  },
  {
    icon: BookOpen,
    title: "Author & Teacher",
    text: "Creating devotionals and resources for the growth of believers.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F7F8F5]">
      <section className="bg-green-900 py-16 text-white sm:py-24">
        <div className="site-container">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[3px] text-amber-300">
            About the Founder
          </p>
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
            Prophet Lingston
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-gray-200 sm:text-lg sm:leading-8">
            Associate pastor at Fountain Gate Chapel International, Desert
            Pastures, and the voice behind the School of Prayer.
          </p>
        </div>
      </section>

      <section className="site-container grid gap-10 py-14 sm:py-20 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
        <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl bg-green-950 text-white shadow-sm lg:mx-0">
          <div className="flex aspect-[4/5] min-h-[340px] items-center justify-center p-6">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
                <ImageIcon size={28} />
              </div>
              <p className="text-sm font-semibold uppercase tracking-[3px] text-amber-300">
                Photo Coming Soon
              </p>
              <p className="mt-3 text-white/70">
                Add Prophet Lingston&apos;s image here when ready.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-950 sm:text-3xl">
            About Prophet Lingston
          </h2>
          <p className="mt-5 text-base leading-7 text-gray-700 sm:text-lg sm:leading-8">
            Prophet Lingston is an associate pastor at Fountain Gate Chapel
            International, Desert Pastures. His ministry is centered on helping
            believers grow in prayer, receive biblical direction, and walk with
            spiritual discipline and confidence.
          </p>
          <p className="mt-5 text-base leading-7 text-gray-700 sm:text-lg sm:leading-8">
            Through the School of Prayer, he provides strategic prayer
            education, devotionals, teachings, and faith-building resources for
            the body of Christ.
          </p>

          <div className="mt-8 grid gap-4">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-800">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-950">{item.title}</h3>
                    <p className="mt-1 leading-7 text-gray-600">{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
