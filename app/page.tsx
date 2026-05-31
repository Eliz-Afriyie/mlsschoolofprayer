import Hero from "./components/ui/Hero";
import FeaturedDevotionals from "./components/ui/FeaturedDevotionals";
import FeaturedBooks from "./components/ui/FeaturedBooks";
import AboutPreview from "./components/ui/AboutPreview";

export default function Home() {
  return (
    <main className="bg-[#F7F8F5] min-h-screen">
      <div className="space-y-16 pb-20">
        <Hero />
        <AboutPreview />
        <div className="bg-[#EEF6EE] py-16">
          <FeaturedDevotionals />
        </div>
        <FeaturedBooks />
      </div>
    </main>
  );
}
