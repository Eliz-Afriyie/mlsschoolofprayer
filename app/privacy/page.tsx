import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | MLS School of Prayer",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#F7F8F5]">
      <section className="bg-green-900 py-16 text-white sm:py-20">
        <div className="site-container">
          <p className="text-sm font-semibold uppercase tracking-[3px] text-amber-300">
            Legal
          </p>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Privacy Policy</h1>
          <p className="mt-4 max-w-2xl leading-7 text-white/75">
            How MLS School of Prayer handles information shared through this
            website.
          </p>
        </div>
      </section>

      <section className="site-container py-12 sm:py-16">
        <div className="max-w-3xl space-y-8 rounded-2xl bg-white p-6 shadow-sm sm:p-10">
          <div>
            <h2 className="text-2xl font-bold">Information we receive</h2>
            <p className="mt-3 leading-7 text-gray-600">
              We may receive information you voluntarily provide through
              contact forms, email, or phone communication, such as your name,
              email address, phone number, and message.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">How information is used</h2>
            <p className="mt-3 leading-7 text-gray-600">
              Information is used to respond to enquiries, provide requested
              resources, support website operations, and improve our ministry
              services. We do not sell personal information.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">External services</h2>
            <p className="mt-3 leading-7 text-gray-600">
              This website may link to external services such as social media,
              Amazon, or document hosting. Those services operate under their
              own privacy policies.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Questions</h2>
            <p className="mt-3 leading-7 text-gray-600">
              For privacy questions or requests concerning your information,
              please use our{" "}
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
