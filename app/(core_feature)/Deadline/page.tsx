"use client"

import {
  LayoutDashboard,
  ClipboardList,
  Calendar,
  Bell,
  Plus,
  Search,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function Page() {
  const [dueTasks, setDueTasks] = useState<any[]>([])
  const [todoTasks, setTodoTasks] = useState<any[]>([])
  const [missingTasks, setMissingTasks] = useState<any[]>([])

  const today = new Date()
  const todayStr = today.toISOString().slice(0, 10) // YYYY-MM-DD

  /* ---------- FETCH TASKS FROM SUPABASE ---------- */
  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("due", { ascending: true })

    if (error) {
      console.error(error)
      return
    }

    if (data) {
      const due: any[] = []
      const todo: any[] = []
      const missing: any[] = []

      data.forEach((task) => {
        if (!task.due) {
          // Task with no due date → treat as future to-do
          todo.push(task)
        } else if (task.due < todayStr) {
          // Past due → Missing
          missing.push(task)
        } else {
          // Due today or future → To-Do + Due Alerts
          due.push(task)
          todo.push(task)
        }
      })

      setDueTasks(due)
      setTodoTasks(todo)
      setMissingTasks(missing)
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
              {dueTasks.length === 0 && (
                <p className="text-sm text-gray-500">No due tasks today or upcoming.</p>
              )}

              {dueTasks.map(task => (
                <AlertCard
                  key={task.id}
                  title={task.title}
                  note={task.note}
                  due={task.due}
                />
              ))}
            </div>

            {/* TO-DO + MISSING */}
            <div className="bg-white rounded-xl p-6 shadow">

              <h3 className="font-semibold mb-4">To-Do Tasks</h3>
              {todoTasks.length === 0 ? (
                <p className="text-sm text-gray-400 text-center">No to-do tasks</p>
              ) : (
                <div className="space-y-2 text-xs text-center mb-6">
                  {todoTasks.map(task => (
                    <p key={task.id}>{task.title}</p>
                  ))}
                </div>
              )}

              <h3 className="font-semibold mb-4">Missing Tasks</h3>
              {missingTasks.length === 0 ? (
                <p className="text-center text-sm text-gray-400">No missing tasks</p>
              ) : (
                <div className="space-y-2 text-xs text-center mb-6">
                  {missingTasks.map(task => (
                    <p key={task.id}>{task.title}</p>
                  ))}
                </div>
              )}

            </div>

          </div>

        </main>
      </div>
    </div>
  )
}

/* ---------- MENU ITEM ---------- */
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

/* ---------- ALERT CARD ---------- */
function AlertCard({ title, note, due }: { title: string; note?: string; due: string }) {
  return (
    <div className="bg-white p-4 rounded-md shadow-sm flex items-start gap-3">
      <div className="w-4 h-4 rounded-full border mt-1" />
      <div>
        <h4 className="font-medium text-sm">{title}</h4>
        <p className="text-xs text-gray-500">{note}</p>
        <p className="text-xs text-gray-400">Due: {due}</p>
      </div>
    </div>
  )
}
