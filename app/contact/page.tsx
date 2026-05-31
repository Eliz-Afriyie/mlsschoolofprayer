export default function ContactPage() {
  return (
    <>
      <main className="bg-[#F7F8F5] min-h-screen">
        {/* Hero */}
        <section className="bg-green-900 text-white py-24">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h1 className="text-5xl font-bold mb-6">Contact Us</h1>

            <p className="text-lg text-gray-200 leading-8">
              We&apos;d love to hear from you. Reach out for questions, prayer
              requests, or collaborations.
            </p>
          </div>
        </section>

        {/* Contact Form */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <div className="bg-white rounded-3xl p-10 shadow-sm">
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
