import Link from "next/link"
export default function Page() {
  return (
    <main className="min-h-screen bg-[#f6cfcf] flex flex-col items-center justify-between text-gray-900">
      {/* HERO SECTION */}
      <section className="w-full max-w-5xl px-6 py-16 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Manage Your Tasks, 
          Master Your Time.
        </h1>

        <p className="text-sm text-gray-700 max-w-xl mx-auto mb-6">
          Stay organized, meet deadlines, and boost productivity all in one
          simple task manager.
        </p>

        <div className="flex justify-center">
          <Link href="/Login">
  <button className="px-6 py-2 bg-white border rounded-md shadow-sm hover:bg-gray-100 transition">
    Get Started Free
  </button>
</Link>
        </div>
      </section>

      {/* WELCOME SECTION */}
      <section className="w-full max-w-6xl px-6 py-10 flex flex-col md:flex-row items-center gap-10">
        {/* Left Illustration Placeholder */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative">

            <img src="/welcome.png" alt="" />
          </div>
        </div>

        {/* Right Text */}
        <div className="flex-1 text-left">
          <h2 className="text-lg font-semibold mb-2">Why Our BloomPlan?</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Our platform helps you organize daily tasks, set priorities,
            track progress, and stay motivated. Whether you’re a student or
            professional, everything you need is in one place.
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="w-full max-w-6xl px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <Feature
            title="Smart Task Control"
            desc="Create, edit, and complete tasks easily."
          />
          <Feature
            title="Deadlines & Reminders"
            desc="Never miss important work with notifications."
          />
          <Feature
            title="Dashboard Overview"
            desc="Track progress visually and stay focused."
          />
          <Feature
            title="Categories & Priority"
            desc="Organize tasks by project and importance."
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-white text-xs text-gray-600 py-4 text-center">
        <div className="mb-1">
          <a href="#" className="mx-2 hover:underline">
            Privacy Policy
          </a>
          |
          <a href="#" className="mx-2 hover:underline">
            Terms of Service
          </a>
        </div>
        <p>© 2026 Task Manager – BloomPlan. All rights reserved.</p>
      </footer>
    </main>
  )
}

/* Feature Card Component */
function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-[#dfeef2] rounded-xl p-4 shadow-sm">
      <h3 className="font-semibold text-sm mb-2">{title}</h3>
      <p className="text-xs text-gray-700">{desc}</p>
    </div>
  )
}