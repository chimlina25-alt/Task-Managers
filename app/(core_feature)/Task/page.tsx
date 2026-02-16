"use client"

import { useEffect, useState } from "react"
import {
  LayoutDashboard,
  ClipboardList,
  Calendar,
  Bell,
  Search,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { supabase } from "@/lib/supabase" // ✅ ADDED

export default function Page() {

  /* =======================
     STATE
  ======================== */
  const [tasks, setTasks] = useState<any[]>([]) // ✅ UPDATED
  const [form, setForm] = useState({
    id: null as string | null,
    title: "",
    note: "",
    due: "",
  })

  /* =======================
     READ (FETCH TASKS)
  ======================== */
  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Fetch error:", error)
    } else {
      setTasks(data)
    }
  }

  /* =======================
     CREATE + UPDATE
  ======================== */
  const handleSave = async () => {
    if (!form.title) {
      alert("Task title is required")
      return
    }

    // UPDATE
    if (form.id) {
      const { error } = await supabase
        .from("tasks")
        .update({
          title: form.title,
          note: form.note,
          due: form.due,
        })
        .eq("id", form.id)

      if (error) console.error("Update error:", error)
    }
    // CREATE
    else {
      const { error } = await supabase.from("tasks").insert([
        {
          title: form.title,
          note: form.note,
          due: form.due,
          priority: "High",
          status: "To-Do",
        },
      ])

      if (error) console.error("Insert error:", error)
    }

    setForm({ id: null, title: "", note: "", due: "" })
    fetchTasks()
  }

  /* =======================
     UPDATE (LOAD INTO FORM)
  ======================== */
  const handleUpdate = (task: any) => {
    setForm({
      id: task.id,
      title: task.title,
      note: task.note ?? "",
      due: task.due ?? "",
    })
  }

  /* =======================
     DELETE
  ======================== */
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this task?")
    if (!confirmDelete) return

    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id)

    if (error) {
      console.error("Delete error:", error)
    } else {
      fetchTasks()
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
            width={60}
            height={60}
            alt="user"
            className="rounded-full"
          />
          <span className="text-sm">User Name</span>
        </div>
      </header>

      <div className="flex flex-1">

        {/* SIDEBAR */}
        <div className="w-[260px] px-4 py-6 bg-[#fdeaea] border-l">
          <div className="flex items-center bg-white rounded-full px-3 py-2 mb-4">
            <Search size={16} />
            <input
              className="ml-2 outline-none text-sm w-full"
              placeholder="Search"
            />
          </div>

          <nav className="space-y-2 text-sm">
            <Link href="/dashboard">
              <MenuItem icon={<LayoutDashboard size={16} />} text="Dashboard" />
            </Link>

            <MenuItem
              icon={<ClipboardList size={16} />}
              text="Task"
              active
            />

            <Link href="/schedule">
              <MenuItem icon={<Calendar size={16} />} text="Schedule" />
            </Link>

          
                        <Link href="/Deadline">
                            <MenuItem icon={<Calendar size={16} />} text="Due Date" />
                        </Link>

            <Link href="/notification">
              <MenuItem icon={<Bell size={16} />} text="Notification" />
            </Link>
          </nav>
        </div>

        {/* MAIN */}
        <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ASSIGN TASK */}
          <div className="bg-white rounded-xl p-5 shadow">
            <h2 className="font-semibold mb-3">Assign Task</h2>

            <input
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              placeholder="Task title"
              className="w-full border rounded-md px-3 py-2 text-sm mb-3"
            />

            <textarea
              value={form.note}
              onChange={(e) =>
                setForm({ ...form, note: e.target.value })
              }
              placeholder="Note"
              className="w-full border rounded-md px-3 py-2 text-sm mb-3"
              rows={4}
            />

            <input
              type="date"
              value={form.due}
              onChange={(e) =>
                setForm({ ...form, due: e.target.value })
              }
              className="w-full border rounded-md px-3 py-2 text-sm mb-4"
            />

            <button
              onClick={handleSave}
              className="bg-[#e1a9a9] text-white text-sm px-4 py-2 rounded-md w-full"
            >
              {form.id ? "Update Task" : "Save Task"}
            </button>
          </div>

          {/* TASK LIST */}
          <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow">
            <h2 className="font-semibold mb-4">Your Tasks</h2>

            <div className="space-y-4">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}

/* =======================
   COMPONENTS
======================== */

function MenuItem({ icon, text, active }: any) {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-md ${
        active ? "bg-[#e1a9a9]" : "hover:bg-[#e9bebe]"
      }`}
    >
      {icon}
      {text}
    </div>
  )
}

function TaskCard({ task, onUpdate, onDelete }: any) {
  return (
    <div className="p-4 rounded-md bg-[#e1a9a9] text-sm">
      <h3 className="font-semibold">{task.title}</h3>
      <p>{task.note}</p>
      <p>Priority: {task.priority}</p>
      <p>Due: {task.due}</p>

      <div className="flex justify-end gap-2 mt-3">
        <button
          onClick={() => onUpdate(task)}
          className="bg-white px-3 py-1 rounded text-xs"
        >
          Update
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-500 text-white px-3 py-1 rounded text-xs"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
