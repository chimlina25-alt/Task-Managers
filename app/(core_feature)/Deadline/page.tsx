"use client"

import {
  LayoutDashboard,
  ClipboardList,
  Calendar,
  Bell,
  Search,
  Plus,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

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

      {/* BODY - SIDEBAR LEFT, MAIN CONTENT RIGHT */}
      <div className="flex flex-1">
        {/* SIDEBAR - EXACT COPY FROM REFERENCE CODE (positioned LEFT) */}
        <div className="w-[260px] px-4 py-6 bg-[#fdeaea] border-r"> {/* Changed border-l to border-r for left sidebar */}
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
            <MenuItem 
              icon={<Calendar size={16} />} 
              text="Due Date" 
              active 
            />
            <Link href="/Notification">
              <MenuItem icon={<Bell size={16} />} text="Notification" />
            </Link>
          </nav>
        </div>

        {/* MAIN CONTENT - ORIGINAL DUE DATE PAGE (PROFILE REMOVED FROM TOP BAR) */}
        <main className="flex-1 p-6">
          {/* TOP BAR - PROFILE SECTION REMOVED (NOW IN HEADER) */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold text-lg">Due Date Alerts</h2>
            <button className="flex items-center gap-1 bg-[#e1a9a9] text-white text-sm px-3 py-1 rounded-md">
              <Plus size={14} /> Add Due Date
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ALERT LIST */}
            <div className="lg:col-span-2 space-y-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <AlertCard key={i} />
              ))}
            </div>

            {/* CHART SECTION */}
            <div className="bg-white rounded-xl p-6 shadow">
              <h3 className="font-semibold mb-4">To do Task</h3>

              {/* Pie Chart (Mock) */}
              <div className="w-40 h-40 mx-auto rounded-full bg-[#e1a9a9] relative mb-6">
                <div className="absolute top-6 left-10 text-xs">Task 4</div>
                <div className="absolute top-12 right-4 text-xs">Task 7</div>
                <div className="absolute bottom-6 left-12 text-xs">Task 6</div>
              </div>

              <h3 className="font-semibold mb-4">Missing Task</h3>
              <div className="w-40 h-40 mx-auto rounded-full bg-[#cfe6ee]" />
            </div>
          </div>

          {/* DECORATIVE LINE - UNCHANGED */}
          <div className="mt-10">
            <svg viewBox="0 0 1000 100" className="w-full h-16">
              <path
                d="M0 50 Q 50 10 100 50 T 200 50 T 300 50 T 400 50 T 500 50 T 600 50 T 700 50 T 800 50 T 900 50 T 1000 50"
                fill="none"
                stroke="#e1a9a9"
                strokeWidth="2"
              />
            </svg>
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
      className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer ${
        active ? "bg-[#e1a9a9]" : "hover:bg-[#e9bebe]"
      }`}
    >
      {icon}
      <span>{text}</span>
    </div>
  )
}

function AlertCard() {
  return (
    <div className="bg-white p-4 rounded-md shadow-sm flex items-start gap-3">
      <div className="w-4 h-4 rounded-full border mt-1" />
      <div>
        <h4 className="font-medium text-sm">Alert title</h4>
        <p className="text-xs text-gray-500">
          This is an alert with icon, title and description.
        </p>
      </div>
    </div>
  )
}