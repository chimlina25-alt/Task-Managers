"use client"

import { useState } from "react"
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
    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: "Finish UI Design",
            note: "",
            status: "In Progress",
            priority: "High",
            due: "2026-02-05",
        },
        {
            id: 2,
            title: "Create Login System",
            note: "",
            status: "To-Do",
            priority: "Urgent",
            due: "2026-02-03",
        },
    ])

    const [form, setForm] = useState({
        id: null as number | null,
        title: "",
        note: "",
        due: "",
    })

    const handleUpdate = (task: any) => {
        setForm(task)
    }

    const handleSave = () => {
        setTasks((prev) =>
            prev.map((t) => (t.id === form.id ? { ...t, ...form } : t))
        )

        setForm({
            id: null,
            title: "",
            note: "",
            due: "",
        })
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
                    <Image src="/pf.png" width={80} height={80} alt="user" className="rounded-full" />
                    <span className="text-sm">User Name</span>
                </div>
            </header>

            <div className="flex flex-1">

                {/* SIDEBAR */}
                <div className="w-[260px] px-4 py-6 bg-[#fdeaea] border-l">

                    <div className="flex items-center bg-white rounded-full px-3 py-2 mb-4">
                        <Search size={16} />
                        <input className="ml-2 outline-none text-sm w-full" placeholder="Search" />
                    </div>
                    {/* Menu */} <nav className="space-y-2 text-sm"> <Link href="/dashboard"> <MenuItem icon={<LayoutDashboard size={16} />} text="Dashboard" /> </Link> <MenuItem icon={<ClipboardList size={16} />} text="Task" active /> <Link href="/schedule"> <MenuItem icon={<Calendar size={16} />} text="Schedule" /> </Link> <Link href="/Deadline"> <MenuItem icon={<Calendar size={16} />} text="Due Date" />
                    </Link> <Link href="/Notification"> <MenuItem icon={<Bell size={16} />} text="Notification" /> </Link> </nav>
                </div>

                {/* MAIN */}
                <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* ASSIGN TASK */}
                    <div className="bg-white rounded-xl p-5 shadow">
                        <h2 className="font-semibold mb-3">Assign Task</h2>

                        <input
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            placeholder="Task title"
                            className="w-full border rounded-md px-3 py-2 text-sm mb-3"
                        />

                        <textarea
                            value={form.note}
                            onChange={(e) => setForm({ ...form, note: e.target.value })}
                            placeholder="Note"
                            className="w-full border rounded-md px-3 py-2 text-sm mb-3"
                            rows={4}
                        />

                        <input
                            type="date"
                            value={form.due}
                            onChange={(e) => setForm({ ...form, due: e.target.value })}
                            className="w-full border rounded-md px-3 py-2 text-sm mb-4"
                        />

                        <button
                            onClick={handleSave}
                            className="bg-[#e1a9a9] text-white text-sm px-4 py-2 rounded-md w-full"
                        >
                            Save
                        </button>

                        {/* Priority */} <div className="mt-6"> <h3 className="font-medium text-sm mb-3">Priority Setting</h3> <Priority label="Time" /> <Priority label="Budget" /> <Priority label="Size" /> </div>

                    </div>

                    {/* TASK LIST */}
                    <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow">
                        <h2 className="font-semibold mb-4">Your Task</h2>

                        <div className="space-y-4">
                            {tasks.map((task) => (
                                <TaskCard key={task.id} task={task} onUpdate={handleUpdate} />
                            ))}
                        </div>
                    </div>

                </main>
            </div>
        </div>
    )
}

/* COMPONENTS */

function MenuItem({ icon, text, active }: any) {
    return (
        <div className={`flex items-center gap-3 px-3 py-2 rounded-md ${active ? "bg-[#e1a9a9]" : "hover:bg-[#e9bebe]"}`}>
            {icon}
            {text}
        </div>
    )
}

function Priority({ label }: { label: string }) { return ( <div className="mb-3"> <label className="text-xs">{label}</label> <input type="range" className="w-full accent-pink-400" /> </div> ) }

function TaskCard({ task, onUpdate }: any) {
    return (
        <div className="p-4 rounded-md bg-[#e1a9a9] text-sm">
            <h3 className="font-semibold">{task.title}</h3>
            <p>Priority: {task.priority}</p>
            <p>Due: {task.due}</p>

            <div className="text-right mt-2">
                <button
                    onClick={() => onUpdate(task)}
                    className="bg-white px-3 py-1 rounded text-xs"
                >
                    Update
                </button>
            </div>
        </div>
    )
}
