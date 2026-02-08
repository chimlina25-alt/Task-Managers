"use client"

import { useState } from "react"
import {
  LayoutDashboard,
  ClipboardList,
  Calendar,
  Bell,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

/* ---------- HELPERS ---------- */
function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

/* ---------- PAGE ---------- */
export default function Page() {
  const today = new Date()

  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [selectedDay, setSelectedDay] = useState(today.getDate())
  const [selectedTime, setSelectedTime] = useState("10:00")

  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth)

  const monthName = new Date(
    currentYear,
    currentMonth
  ).toLocaleString("default", { month: "long" })

  function prevMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear((y) => y - 1)
    } else {
      setCurrentMonth((m) => m - 1)
    }
  }

  function nextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear((y) => y + 1)
    } else {
      setCurrentMonth((m) => m + 1)
    }
  }

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
        {/* SIDEBAR */}
        <aside className="w-[260px] px-4 py-6 bg-[#fdeaea] border-r">
          <div className="flex items-center bg-white rounded-full px-3 py-2 mb-4">
            <Search size={16} className="text-gray-400" />
            <input
              placeholder="Search"
              className="ml-2 outline-none text-sm w-full"
            />
          </div>

          <nav className="space-y-2 text-sm">
            <Link href="/dashboard">
              <MenuItem icon={<LayoutDashboard size={16} />} text="Dashboard" />
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
        </aside>

        {/* ✅ MAIN CONTENT (THIS FIXES THE EMPTY SPACE) */}
        <main className="flex-1 p-6">
          {/* CALENDAR */}
          <div className="bg-white rounded-xl p-6 shadow flex gap-6 w-full">
            {/* CALENDAR GRID */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-4">
                <ChevronLeft className="cursor-pointer" onClick={prevMonth} />
                <h2 className="font-semibold">
                  {monthName} {currentYear}
                </h2>
                <ChevronRight className="cursor-pointer" onClick={nextMonth} />
              </div>
              <div className="grid grid-cols-7 text-center text-xs text-gray-500 mb-2">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                  <div key={d}>{d}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-3 text-sm">
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={i} />
                ))}

                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1
                  const isToday =
                    day === today.getDate() &&
                    currentMonth === today.getMonth() &&
                    currentYear === today.getFullYear()

                  return (
                    <div
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`h-14 flex items-center justify-center rounded-md cursor-pointer
                        ${
                          selectedDay === day
                            ? "bg-[#e1a9a9] text-white"
                            : isToday
                            ? "border border-[#e1a9a9]"
                            : "hover:bg-gray-100"
                        }`}
                    >
                      {day}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* TIME */}
            <div className="w-32 space-y-2">
              <Link href="/schedule_set">
              {times.map((time) => (
                <div
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`text-sm text-center border rounded-md py-1 cursor-pointer
                    ${
                      selectedTime === time
                        ? "bg-[#e1a9a9] text-white"
                        : "hover:bg-gray-100"
                    }`}
                >
                  {time}
                </div>
              ))}
             </Link>
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-600">
              Your meeting is booked for {monthName} {selectedDay},{" "}
              {currentYear} at {selectedTime}.
            </p>

            <div className="flex gap-2">
              <Link href="/Task">
              <button className="px-4 py-1 rounded-md bg-[#e1a9a9] text-white text-sm">
                + Add
              </button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

/* COMPONENT */
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

/* TIMES */
const times = [
  "09:00","09:15","09:30","09:45",
  "10:00","10:15","10:30","10:45",
  "11:00","11:15","11:30","11:45",
  "12:00","12:15",
]