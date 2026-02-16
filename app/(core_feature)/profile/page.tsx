"use client"

import Image from "next/image"
import Link from "next/link"

export default function Page() {
  return (
    <div className="min-h-screen bg-[#fdeaea]">

      {/* TOP HEADER */}
      <header className="h-[90px] bg-[#f8dede] px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo1.png" width={80} height={80} alt="logo" />
          <span className="text-xl font-semibold">BloomPlan</span>
        </div>
      </header>

      {/* SPACE BETWEEN HEADER & CONTENT */}
      <div className="h-8" />

      {/* BODY */}
      <div className="px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

          {/* LEFT PROFILE */}
          <div className="lg:col-span-1 space-y-6">

            {/* BACK TO DASHBOARD */}
            <Link
              href="/dashboard"
              className="inline-block text-sm bg-[#e8a1a1]  text-white px-4 py-2 rounded-lg"
            >
              ← Back to Dashboard
            </Link>

            {/* PROFILE CARD */}
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">

              {/* Avatar */}
              <div className="w-36 h-36 rounded-full bg-[#d7a3ad] flex items-center justify-center mb-5">
                <Image src="/pf.png" width={80} height={80} alt="user" />
              </div>

              {/* Username */}
              <div className="bg-[#e0e0e0] w-full py-3 rounded-full text-center text-lg mb-4">
                User Name
              </div>

              {/* Add account */}
              <input
                placeholder="+ Add another account"
                className="w-full border px-3 py-2 rounded-md text-sm mb-6"
              />

              {/* Options */}
              <div className="space-y-3 text-sm w-full">
                <p className="cursor-pointer">👤 Profile</p>
                <p className="cursor-pointer">✏️ Edit Profile</p>
              </div>
            </div>
          </div>

          {/* RIGHT SUPPORT BOXES */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">

            <SupportBox 
              title="Stay Organized"
              text="BloomPlan keeps all your tasks and schedules in one place."
              highlight
            />

            <SupportBox
              title="Boost Productivity"
              text="Focus on priorities and track your progress easily."
              highlight
            />

            <SupportBox
              title="Smart Planning"
              text="Plan meetings and deadlines without stress."
              highlight
            />

            <SupportBox
              title="Your Digital Companion"
              text="BloomPlan supports your daily workflow and long-term goals."
              highlight
            />
          </div>

        </div>
      </div>
    </div>
  )
}

/* SUPPORT BOX COMPONENT */
function SupportBox({
  title,
  text,
  highlight,
}: {
  title: string
  text: string
  highlight?: boolean
}) {
  return (
    <div
      className={`bg-[#e0e0e0] rounded-xl p-6 h-40 ${
        highlight ? "border-2 border-[#e8a1a1] bg-white" : ""
      }`}
    >
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  )
}
