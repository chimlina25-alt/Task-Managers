"use client"

import { useEffect, useState } from "react"
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
import { supabase } from "@/lib/supabase"

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
  const [tasks, setTasks] = useState<any[]>([])
  const [currentTime, setCurrentTime] = useState("")

  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth)

  const monthName = new Date(
    currentYear,
    currentMonth
  ).toLocaleString("default", { month: "long" })

  /* ---------- REAL CURRENT TIME ---------- */
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const h = String(now.getHours()).padStart(2, "0")
      const m = String(now.getMinutes()).padStart(2, "0")
      setCurrentTime(`${h}:${m}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  /* ---------- MONTH NAV ---------- */
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

  /* ---------- FETCH TASK NOTES BY DATE ---------- */
  useEffect(() => {
    fetchTasks()
  }, [selectedDay, currentMonth, currentYear])

  const fetchTasks = async () => {
    const selectedDate = `${currentYear}-${String(
      currentMonth + 1
    ).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`

    const { data, error } = await supabase
      .from("tasks")
      .select("id, note, time")
      .eq("due", selectedDate)
      .order("time", { ascending: true })

    if (!error && data) {
      setTasks(data)
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
          <Image
            src="/pf.png"
            width={70}
            height={70}
            alt="user"
            className="rounded-full"
          />
          <span className="text-sm">User Name</span>
        </div>
      </header>

      {/* BODY */}
      <div className="flex flex-1">

        {/* SIDEBAR */}
        <aside className="w-[260px] px-4 py-6 bg-[#fdeaea] border-r">
          <div className="flex items-center bg-white rounded-full px-3 py-2 mb-4">
            <Search size={16} />
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
            <MenuItem icon={<Calendar size={16} />} text="Schedule" active />
            <Link href="/Deadline">
              <MenuItem icon={<Calendar size={16} />} text="Due Date" />
            </Link>
            <Link href="/Notification">
              <MenuItem icon={<Bell size={16} />} text="Notification" />
            </Link>
          </nav>
        </aside>

        {/* MAIN */}
        <main className="flex-1 p-6">

          {/* CALENDAR + REAL TIME */}
          <div className="bg-white rounded-xl p-6 shadow flex gap-6">

            {/* CALENDAR */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-4">
                <ChevronLeft onClick={prevMonth} className="cursor-pointer" />
                <h2 className="font-semibold">
                  {monthName} {currentYear}
                </h2>
                <ChevronRight onClick={nextMonth} className="cursor-pointer" />
              </div>

              <div className="grid grid-cols-7 text-center text-xs text-gray-500 mb-2">
                {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d) => (
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

            {/* REAL-TIME CLOCK */}
            <div className="w-40 flex flex-col items-center justify-center bg-[#fdeaea] rounded-xl shadow-inner">
              <p className="text-sm text-gray-600 mb-1">Current Time</p>
              <p className="text-4xl font-bold text-[#b85c5c]">
                {currentTime}
              </p>
            </div>
          </div>

          {/* TASK NOTES */}
          <div className="mt-6 bg-white rounded-xl p-5 shadow">
            <h3 className="font-semibold mb-3">Task Notes</h3>

            {tasks.length === 0 && (
              <p className="text-sm text-gray-500">
                No tasks scheduled for this date.
              </p>
            )}

            {tasks.map((task) => (
              <div
                key={task.id}
                className="border rounded-md p-3 mb-2 text-sm"
              >
                <p className="font-medium">{task.time}</p>
                <p className="text-gray-700">{task.note}</p>
              </div>
            ))}
          </div>

        </main>
      </div>
    </div>
  )
}

/* ---------- MENU ITEM ---------- */
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
