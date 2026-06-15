export default function ContactPage() {
  return (
    <>
      <main className="bg-[#F7F8F5] min-h-screen">
        {/* Hero */}
        <section
          className="relative h-72 overflow-hidden pb-24 pt-24 text-white sm:h-80 sm:pb-32 sm:pt-28"
          style={{
            backgroundImage: "url('/hero3.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B2D16] via-[#0B2D16]/80 to-[#0B2D16]/20" />

          <div className="site-container relative z-10">
            <div className="max-w-2xl">
              <h1 className="mb-5 text-4xl font-bold sm:text-5xl md:text-6xl">
                Contact Us
              </h1>

              <p className="text-base leading-7 text-gray-200 sm:text-lg sm:leading-8">
                We&apos;d love to hear from you. Reach out for questions, prayer
                requests, or collaborations.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="site-container py-20">
          <div className="mx-auto max-w-4xl rounded-3xl bg-white p-10 shadow-sm">
            <form className="space-y-6">
              <div>
                <label className="block mb-2 font-medium">Full Name</label>

                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-green-700"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Email Address</label>

                <input
                  type="email"
                  placeholder="example@email.com"
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-green-700"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Message</label>

                <textarea
                  rows={6}
                  placeholder="Write your message..."
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-green-700"
                />
              </div>

              <button className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-xl transition">
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
