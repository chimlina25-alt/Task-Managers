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
            {/* TOP HEADER */}
            <header className="h-[90px] bg-[#f8dede] px-8 flex items-center justify-between">
                {/* LEFT LOGO */}
                <div className="flex items-center gap-3">
                    <Image src="/logo1.png" width={80} height={80} alt="logo" />
                    <span className="text-xl font-semibold">BloomPlan</span>
                </div>

                {/* RIGHT PROFILE */}
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



            {/* BODY - FIXED STRUCTURE & SWAPPED ORDER */}
            <div className="flex flex-1">

                {/* SIDEBAR (NOW ON RIGHT) */}
                <div className="w-[260px] px-4 py-6 bg-[#fdeaea] border-l">
                    {/* Search */}
                    <div className="flex items-center bg-white rounded-full px-3 py-2 mb-4">
                        <Search size={16} className="text-gray-400" />
                        <input
                            placeholder="Search"
                            className="ml-2 outline-none text-sm w-full"
                        />
                    </div>

                    {/* Menu */}
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
                        <Link href="/Notification">
                            <MenuItem icon={<Bell size={16} />} text="Notification" />
                        </Link>
                    </nav>
                </div>

                {/* MAIN CONTENT (NOW ON LEFT) */}
                <main className="flex-1 p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* ASSIGN TASK */}
                        <div className="bg-white rounded-xl p-5 shadow">
                            <h2 className="font-semibold mb-3">Assign Task</h2>
                            <input
                                placeholder="Task title"
                                className="w-full border rounded-md px-3 py-2 text-sm mb-3"
                            />
                            <textarea
                                placeholder="Note / Purpose"
                                className="w-full border rounded-md px-3 py-2 text-sm mb-3"
                                rows={4}
                            />
                            <label className="text-sm font-medium">Due Date</label>
                            <input
                                type="date"
                                className="w-full border rounded-md px-3 py-2 text-sm mb-4"
                            />
                            <div className="flex items-center gap-2 mb-4">
                                <input type="checkbox" />
                                <span className="text-sm">Notification</span>
                            </div>
                            <button className="bg-[#e1a9a9] text-white text-sm px-4 py-2 rounded-md w-full">
                                Save
                            </button>
                            {/* Priority */}
                            <div className="mt-6">
                                <h3 className="font-medium text-sm mb-3">Priority Setting</h3>
                                <Priority label="Time" />
                                <Priority label="Budget" />
                                <Priority label="Size" />
                            </div>
                        </div>

                        {/* TASK LIST */}
                        <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow">
                            <h2 className="font-semibold mb-4">Your Task</h2>
                            <div className="space-y-4">
                                <TaskCard
                                    title="Finish UI Design"
                                    status="In Progress"
                                    priority="High"
                                    due="Feb 5"
                                />
                                <TaskCard
                                    title="Create Login System"
                                    status="To-Do"
                                    priority="Urgent"
                                    due="Feb 3"
                                />
                                <TaskCard
                                    title="Write Project Documentation"
                                    status="To-Do"
                                    priority="Medium"
                                    due="Feb 7"
                                />
                                <TaskCard
                                    title="Database Setup"
                                    status="To-Do"
                                    priority="Medium"
                                    highlight
                                />
                            </div>
                        </div>
                    </div>
                </main>


            </div>
        </div>
    )
}

/* COMPONENTS */
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

function Priority({ label }: { label: string }) {
    return (
        <div className="mb-3">
            <label className="text-xs">{label}</label>
            <input type="range" className="w-full accent-pink-400" />
        </div>
    )
}

function TaskCard({
    title,
    status,
    priority,
    due,
    highlight,
}: {
    title: string
    status: string
    priority: string
    due?: string
    highlight?: boolean
}) {
    return (
        <div
            className={`p-4 rounded-md bg-[#e1a9a9] text-sm ${highlight ? "border-2 border-blue-400" : ""
                }`}
        >
            <h3 className="font-semibold mb-1">{title}</h3>
            <p>Status: {status}</p>
            <p>Priority: {priority}</p>
            {due && <p>Due: {due}</p>}
            <div className="text-right mt-2">
                <button className="bg-white text-xs px-3 py-1 rounded">
                    Update
                </button>
            </div>
        </div>
    )
}