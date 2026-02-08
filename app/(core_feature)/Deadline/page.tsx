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
import React from "react"

export default function Page() {

  // FAKE FRONTEND DATA
  const todoTasks = [
    { id: 1, title: "UI Design" },
    { id: 2, title: "Login Page" },
    { id: 3, title: "Database Setup" },
  ]

  const missingTasks: any[] = []

  return (
    <div className="min-h-screen bg-[#fdeaea] flex flex-col">

      {/* HEADER */}
      <header className="h-[90px] bg-[#f8dede] px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo1.png" width={80} height={80} alt="logo" />
          <span className="text-xl font-semibold">BloomPlan</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <Link href="/profile">
            <Image src="/pf.png" width={80} height={80} alt="user" className="rounded-full" />
          </Link>
          <span className="text-sm">User Name</span>
        </div>
      </header>

      <div className="flex flex-1">

        {/* SIDEBAR */}
        <div className="w-[260px] px-4 py-6 bg-[#fdeaea] border-r">

          <div className="flex items-center bg-white rounded-full px-3 py-2 mb-4">
            <Search size={16} className="text-gray-400" />
            <input placeholder="Search" className="ml-2 outline-none text-sm w-full" />
          </div>

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

            <MenuItem icon={<Calendar size={16} />} text="Due Date" active />

            <Link href="/Notification">
              <MenuItem icon={<Bell size={16} />} text="Notification" />
            </Link>
          </nav>
        </div>

        {/* MAIN */}
        <main className="flex-1 p-6">

          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold text-lg">Due Date Alerts</h2>

            <Link href="/Task">
              <button className="flex items-center gap-1 bg-[#e1a9a9] text-white text-sm px-3 py-1 rounded-md">
                <Plus size={14} /> Add Due Date
              </button>
            </Link>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* ALERT LIST */}
            <div className="lg:col-span-2 space-y-4">
              {[1,2,3,4,5,6].map(i => (
                <AlertCard key={i} />
              ))}
            </div>

            {/* CHART */}
            <div className="bg-white rounded-xl p-6 shadow">

              <h3 className="font-semibold mb-4">To-Do Tasks</h3>

              <div className="relative w-40 h-40 mx-auto rounded-full bg-[#e1a9a9] mb-4 flex items-center justify-center">
                <span className="text-white text-lg font-semibold">
                  {todoTasks.length}
                </span>
              </div>

              <div className="text-xs text-center space-y-1 mb-6">
                {todoTasks.map(task => (
                  <p key={task.id}>{task.title}</p>
                ))}
              </div>

              <h3 className="font-semibold mb-4">Missing Tasks</h3>

              {missingTasks.length === 0 ? (
                <p className="text-center text-sm text-gray-400">
                  No missing tasks
                </p>
              ) : (
                <div className="relative w-40 h-40 mx-auto rounded-full bg-[#cfe6ee] flex items-center justify-center">
                  {missingTasks.length}
                </div>
              )}

            </div>

          </div>

          {/* DECOR LINE */}
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

/* COMPONENTS */

function MenuItem({ icon, text, active }: any) {
  return (
    <div className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer ${
      active ? "bg-[#e1a9a9]" : "hover:bg-[#e9bebe]"
    }`}>
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
