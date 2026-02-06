"use client"

import {
  LayoutDashboard,
  ClipboardList,
  Calendar,
  Bell,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Page() {
  return (
    <div className="min-h-screen bg-[#fdeaea] flex flex-col">
      {/* TOP HEADER - EXACT COPY FROM YOUR CODE */}
      <header className="h-[90px] bg-[#f8dede] px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo1.png" width={80} height={80} alt="logo" />
          <span className="text-xl font-semibold">BloomPlan</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Link href="/profile">
            <Image
              src="/pf.png"
              width={80}
              height={80}
              alt="user"
              className="rounded-full"
            />
          </Link>
          <span className="text-sm">User Name</span>
        </div>
      </header>

      {/* BODY - SIDEBAR LEFT, MAIN CONTENT RIGHT */}
      <div className="flex flex-1">
        {/* SIDEBAR - EXACT COPY FROM YOUR CODE (positioned LEFT) */}
        <div className="w-[260px] px-4 py-6 bg-[#fdeaea] border-r"> {/* Changed border-l to border-r for left sidebar */}
          {/* SEARCH */}
          <div className="flex items-center bg-white rounded-full px-3 py-2 mb-4">
            <Search size={16} className="text-gray-400" />
            <input
              placeholder="Search"
              className="ml-2 outline-none text-sm w-full"
            />
          </div>

          {/* MENU - EXACT COPY FROM YOUR CODE */}
          <nav className="space-y-2 text-sm">
            <Link href="/dashboard">
            <MenuItem 
              icon={<LayoutDashboard size={16} />}
              text="Dashboard"
            />
            </Link>
            <Link href="/Task">
              <MenuItem icon={<ClipboardList size={16} />} text="Task" />
            </Link>
            <Link href="/schedule">
              <MenuItem icon={<Calendar size={16} />} text="Schedule" active />
            </Link>
            <Link href="/Deadline">
              <MenuItem icon={<Calendar size={16} />} text="Due Date" />
            </Link>
            <Link href="/Notification">
              <MenuItem icon={<Bell size={16} />} text="Notification" />
            </Link>
          </nav>
        </div>

        {/* MAIN CONTENT - UNCHANGED FROM ORIGINAL CALENDAR PAGE */}
        <main className="flex-1 p-6">
          {/* REMOVED TOP BAR (profile) since header now contains it */}
          
          {/* CALENDAR CARD */}
          <div className="bg-white rounded-xl p-6 shadow flex gap-6">
            {/* Calendar */}
            <div className="flex-1">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <ChevronLeft className="cursor-pointer" />
                <h2 className="font-semibold">Sep 2025</h2>
                <ChevronRight className="cursor-pointer" />
              </div>

              {/* Days */}
              <div className="grid grid-cols-7 text-center text-xs text-gray-500 mb-2">
                <div>Su</div>
                <div>Mo</div>
                <div>Tu</div>
                <div>We</div>
                <div>Th</div>
                <div>Fr</div>
                <div>Sa</div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-7 gap-3 text-sm">
                {calendarDays.map((day, i) => (
                  <div
                    key={i}
                    className={`h-14 flex items-center justify-center rounded-md ${
                      day === 10
                        ? "bg-[#e1a9a9] text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>

            {/* TIME SLOTS */}
            <div className="w-32 space-y-2">
              {times.map((time) => (
                <div
                  key={time}
                  className={`text-sm text-center border rounded-md py-1 ${
                    time === "10:00"
                      ? "bg-[#e1a9a9] text-white"
                      : "bg-white"
                  }`}
                >
                  {time}
                </div>
              ))}
            </div>
          </div>

          {/* FOOTER ACTION */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-600">
              Your meeting for Task 2 is booked for Thursday, Sep 10 at 10:00.
            </p>
            <div className="flex gap-2">
              <button className="px-4 py-1 rounded-md bg-[#e1a9a9] text-white text-sm">
                Save
              </button>
              <button className="px-4 py-1 rounded-md bg-[#e1a9a9] text-white text-sm">
                + Add
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

/* COMPONENTS - EXACT COPY FROM YOUR CODE */
function MenuItem({
  icon,
  text,
  active,
}: {
  icon: React.ReactNode
  text: string
  active?: boolean
}) {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer ${
        active ? "bg-[#e1a9a9]" : "hover:bg-[#e9bebe]"
      }`}
    >
      {icon}
      <span>{text}</span>
    </div>
  )
}

/* DATA - UNCHANGED */
const calendarDays = [
  31, 1, 2, 3, 4, 5, 6,
  7, 8, 9, 10, 11, 12, 13,
  14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27,
  28, 29, 30, 1, 2, 3, 4,
]

const times = [
  "09:00",
  "09:15",
  "09:30",
  "09:45",
  "10:00",
  "10:15",
  "10:30",
  "10:45",
  "11:00",
  "11:15",
  "11:30",
  "11:45",
  "12:00",
  "12:15",
]