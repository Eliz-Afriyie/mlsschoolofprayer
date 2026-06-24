import {
  BookOpen,
  Church,
  ImageIcon,
  Mic,
  Phone,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { getSiteContent } from "@/app/lib/site-content";
import AboutHero from "./AboutHero";

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

export default async function AboutPage() {
  const content = await getSiteContent("about");
  const activeHeroSlides = content.heroImages
    .map((image, index) => ({
      image,
      position:
        content.heroImagePositions?.[index] ??
        (index === 0 ? "center top" : "center center"),
      enabled: content.heroImagesEnabled?.[index] ?? true,
    }))
    .filter((slide) => slide.image && slide.enabled);
  const showSidebar = content.profileVisible || content.contactVisible;
  const socials = [
    {
      label: "Facebook",
      handle: content.facebookHandle,
      href: content.facebookUrl,
      icon: FaFacebookF,
      className: "bg-[#1877F2] text-white hover:bg-[#166FE5]",
    },
    {
      label: "Instagram",
      handle: content.instagramHandle,
      href: content.instagramUrl,
      icon: FaInstagram,
      className:
        "bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#FCAF45] text-white",
    },
    {
      label: "YouTube",
      handle: content.youtubeHandle,
      href: content.youtubeUrl,
      icon: FaYoutube,
      className: "bg-[#FF0000] text-white hover:bg-[#D90000]",
    },
    {
      label: "TikTok",
      handle: content.tiktokHandle,
      href: content.tiktokUrl,
      icon: FaTiktok,
      className: "bg-gray-950 text-white hover:bg-black",
    },
  ].filter((item) => item.href.trim());

  return (
    <main className="min-h-screen bg-[#F7F8F5]">
      {content.heroVisible && activeHeroSlides.length ? (
        <AboutHero
          slides={activeHeroSlides}
          eyebrow={content.heroEyebrow}
          title={content.heroTitle}
          text={content.heroText}
        />
      ) : null}

      <section
        className={`site-container grid gap-10 py-14 sm:py-20 ${
          showSidebar
            ? "lg:grid-cols-[0.7fr_1.3fr] lg:items-start"
            : "max-w-4xl"
        }`}
      >
        {showSidebar ? (
        <div className="w-full max-w-sm">
          {content.profileVisible ? (
          <div className="overflow-hidden rounded-2xl bg-green-950 text-white shadow-sm">
            {content.profileImage ? (
              <img
                src={content.profileImage}
                alt={content.founderName}
                className="aspect-[4/5] min-h-[340px] w-full object-cover"
              />
            ) : (
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
            )}
          </div>
          ) : null}

          {content.contactVisible ? (
          <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[2px] text-green-700">
              Contact
            </p>
            <h2 className="mt-2 text-xl font-bold text-gray-950">
              {content.founderName}
            </h2>
            <a
              href={`tel:${content.phone.replace(/\s/g, "")}`}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gray-700 transition hover:text-green-800"
            >
              <Phone size={17} />
              {content.phone}
            </a>

            {socials.length ? (
              <div className="mt-5 flex flex-wrap gap-3">
                {socials.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${item.label}: ${item.handle}`}
                      title={item.label}
                      className={`inline-flex h-11 w-11 items-center justify-center rounded-full shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${item.className}`}
                    >
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>
            ) : null}
          </div>
          ) : null}
        </div>
        ) : null}

        <div>
          {content.biographyVisible ? (
          <>
          <h2 className="text-2xl font-bold text-gray-950 sm:text-3xl">
            {content.sectionTitle}
          </h2>
          <p className="mt-5 text-base leading-7 text-gray-700 sm:text-lg sm:leading-8">
            {content.bioOne}
          </p>
          <p className="mt-5 text-base leading-7 text-gray-700 sm:text-lg sm:leading-8">
            {content.bioTwo}
          </p>
          </>
          ) : null}

          {content.highlightsVisible ? (
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
          ) : null}
        </div>
      </section>
    </main>
  );
}
