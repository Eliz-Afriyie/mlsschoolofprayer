import Hero from "./components/ui/Hero";
import FeaturedDevotionals from "./components/ui/FeaturedDevotionals";
import FeaturedBooks from "./components/ui/FeaturedBooks";
import AboutPreview from "./components/ui/AboutPreview";
import { getSiteContent } from "./lib/site-content";

export default async function Home() {
  const content = await getSiteContent("home");

  return (
    <main className="bg-[#F7F8F5] min-h-screen">
      <div className="space-y-16 pb-20">
        <Hero slides={content.slides} />
        <AboutPreview content={content} />
        <div className="bg-[#EEF6EE] py-16">
          <FeaturedDevotionals heading={content.devotionalsHeading} />
        </div>
        <FeaturedBooks heading={content.booksHeading} />
      </div>
    </main>
  );
}
