import Hero from "./components/ui/Hero";
import FeaturedDevotionals from "./components/ui/FeaturedDevotionals";
import FeaturedBooks from "./components/ui/FeaturedBooks";
import AboutPreview from "./components/ui/AboutPreview";
import { getSiteContent } from "./lib/site-content";

export default async function Home() {
  const content = await getSiteContent("home");
  const activeSlides = content.slides.filter(
    (slide) => slide.enabled && slide.image
  );

  return (
    <main className="bg-[#F7F8F5] min-h-screen">
      <div className="space-y-16 pb-20">
        {content.heroVisible && activeSlides.length ? (
          <Hero slides={activeSlides} />
        ) : null}
        {content.aboutVisible ? <AboutPreview content={content} /> : null}
        {content.devotionalsVisible ? (
          <div className="bg-[#EEF6EE] py-16">
            <FeaturedDevotionals heading={content.devotionalsHeading} />
          </div>
        ) : null}
        {content.booksVisible ? (
          <FeaturedBooks heading={content.booksHeading} />
        ) : null}
      </div>
    </main>
  );
}
