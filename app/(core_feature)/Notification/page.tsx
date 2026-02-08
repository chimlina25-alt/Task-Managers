"use client"

import {
  LayoutDashboard,
  ClipboardList,
  Calendar,
  Bell,
  Search,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Page() {
  return (
    <div className="min-h-screen bg-[#fdeaea] flex flex-col">

      {/* TOP HEADER - EXACT COPY FROM REFERENCE CODE */}
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

      {/* BODY */}
      <div className="flex flex-1">

        {/* SIDEBAR - EXACT COPY FROM REFERENCE CODE (positioned LEFT) */}
        <div className="w-[260px] px-4 py-6 bg-[#fdeaea] border-l">
          {/* SEARCH */}
          <div className="flex items-center bg-white rounded-full px-3 py-2 mb-4">
            <Search size={16} className="text-gray-400" />
            <input
              placeholder="Search"
              className="ml-2 outline-none text-sm w-full"
            />
          </div>

          {/* MENU - EXACT STRUCTURE FROM REFERENCE CODE */}
          <nav className="space-y-2 text-sm">
            <Link href="/dashboard">
              <MenuItem icon={<LayoutDashboard size={16} />} text="Dashboard" />
            </Link>
            <Link href="/Task">
              <MenuItem icon={<ClipboardList size={16} />} text="Task" />
            </Link>
            <Link href="/schedule">
              <MenuItem icon={<Calendar size={16} />} text="Schedule" />
            </Link>
            <Link href="/Deadline">
              <MenuItem icon={<Calendar size={16} />} text="Due Date" />
            </Link>
            <MenuItem
              icon={<Bell size={16} />}
              text="Notification"
              active
            />
          </nav>
        </div>

        {/* MAIN CONTENT - FIXED DUPLICATE <main> TAG */}
        <main className="flex-1 bg-white p-8">
          {/* ALERT GRID */}
          <div className="bg-white rounded-xl shadow p-6 mb-10">
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className={`border rounded-lg p-3 text-sm ${i % 2 === 0 ? "bg-yellow-50" : ""
                    }`}
                >
                  <p className="font-medium">Alert title</p>
                  <p className="text-gray-500">
                    This is an alert with icon, title and description.
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* MEETING SECTION */}
          <h2 className="text-xl font-semibold mb-5">Meeting Schedule</h2>

          <div className="flex gap-6 flex-wrap">

            <Link href="/schedule_set">
              <MeetingCard
                time="8:00 - 10:00 am"
                title="Meeting Capstone project"
                color="bg-pink-200"
              />
            </Link>

            <Link href="/schedule_set">
              <MeetingCard
                time="2:00 - 3:00 pm"
                title="Product planning"
                color="bg-pink-300"
              />
            </Link>

            <Link href="/schedule_set">
              <MeetingCard
                time="3:00 - 5:00 pm"
                title="Task review"
                color="bg-pink-200"
              />
            </Link>

          </div>

        </main>
      </div>
    </div>
  )
}

/* COMPONENTS - EXACT COPY FROM REFERENCE CODE */
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
      className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer ${active ? "bg-[#e1a9a9]" : "hover:bg-[#e9bebe]"
        }`}
    >
      {icon}
      <span>{text}</span>
    </div>
  )
}

function MeetingCard({
  time,
  title,
  color,
}: {
  time: string
  title: string
  color: string
}) {
  return (
    <div className={`${color} w-[200px] p-4 rounded-xl text-sm`}>
      <p>{time}</p>
      <p className="mt-3 font-medium">{title}</p>
      <div className="mt-4 flex items-center gap-2">
        <div className="w-6 h-6 bg-white rounded-full"></div>
        <span className="text-xs">CN +2</span>
      </div>
    </div>
  )
}