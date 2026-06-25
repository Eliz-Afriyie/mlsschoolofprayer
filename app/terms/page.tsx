import Link from "next/link";

export const metadata = {
  title: "Terms of Use | MLS School of Prayer",
};

export default function TermsOfUsePage() {
  return (
    <main className="min-h-screen bg-[#F7F8F5]">
      <section className="bg-green-900 py-16 text-white sm:py-20">
        <div className="site-container">
          <p className="text-sm font-semibold uppercase tracking-[3px] text-amber-300">
            Legal
          </p>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Terms of Use</h1>
          <p className="mt-4 max-w-2xl leading-7 text-white/75">
            Guidelines for using the MLS School of Prayer website and its
            resources.
          </p>
        </div>
      </section>

      <section className="site-container py-12 sm:py-16">
        <div className="max-w-3xl space-y-8 rounded-2xl bg-white p-6 shadow-sm sm:p-10">
          <div>
            <h2 className="text-2xl font-bold">Website content</h2>
            <p className="mt-3 leading-7 text-gray-600">
              The devotionals, books, images, and other resources on this
              website are provided for spiritual education and encouragement.
              They are not a substitute for professional medical, legal, or
              financial advice.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Acceptable use</h2>
            <p className="mt-3 leading-7 text-gray-600">
              You may browse and share links to our public content. You may not
              misuse the website, interfere with its operation, attempt
              unauthorized access, or reproduce protected material for
              commercial use without permission.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Third-party links</h2>
            <p className="mt-3 leading-7 text-gray-600">
              Links to external websites are provided for convenience. MLS
              School of Prayer is not responsible for the availability,
              content, or practices of those third-party services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Contact</h2>
            <p className="mt-3 leading-7 text-gray-600">
              Questions about these terms can be sent through our{" "}
              <Link href="/contact" className="font-semibold text-green-700 hover:underline">
                contact page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
