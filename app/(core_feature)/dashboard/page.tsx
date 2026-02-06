"use client"

import * as React from "react"
import Image from "next/image"
import {
    LayoutDashboard,
    ClipboardList,
    Calendar,
    Bell,
    Search,
} from "lucide-react"

import { Calendar as UiCalendar } from "@/components/ui/calendar"

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table"

import { BarChart, Bar, XAxis, YAxis } from "recharts"
import Link from "next/link"

// ---------------- DATA ----------------

const chartData = [
    { name: "To do", value: 3 },
    { name: "In progress", value: 3 },
    { name: "Done", value: 4 },
]

const chartConfig = {
    value: {
        label: "Tasks",
        color: "#e8a1a1",
    },
}

const tasks = [
    { id: 1, title: "Create Task", status: "Company" },
    { id: 2, title: "Done Task", status: "School" },
    { id: 3, title: "Edit Task", status: "New Project" },
]

const priority = ["Task1", "Task2", "Task3", "Task4", "Task5", "Task6"]

// ---------------- PAGE ----------------

export default function Page() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())

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

            {/* BODY */}
            <div className="flex flex-1">

                {/* SIDEBAR */}
                <div className="w-[260px] px-4 py-6 bg-[#fdeaea] border-l">

                    {/* SEARCH */}
                    <div className="flex items-center bg-white rounded-full px-3 py-2 mb-4">
                        <Search size={16} className="text-gray-400" />
                        <input
                            placeholder="Search"
                            className="ml-2 outline-none text-sm w-full"
                        />
                    </div>

                    {/* MENU */}
                    <nav className="space-y-2 text-sm">

                        <MenuItem
                            icon={<LayoutDashboard size={16} />}
                            text="Dashboard"
                            active
                        />

                        <Link href="/Task">
                            <MenuItem icon={<ClipboardList size={16} />} text="Task" />
                        </Link>
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

                {/* MAIN CONTENT */}
                <main className="flex-1 p-6">

                    <div className="grid grid-cols-2 gap-6">

                        {/* CHART */}
                        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
                            <h2 className="font-semibold mb-4">Total Task: 6</h2>

                            <ChartContainer config={chartConfig} className="h-[200px] w-full">
                                <BarChart data={chartData}>
                                    <XAxis dataKey="name" />
                                    <YAxis hide />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Bar dataKey="value" fill="#e8a1a1" radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ChartContainer>

                            <div className="flex justify-between w-full mt-2 text-sm">
                                <span>To do</span>
                                <span>In progress</span>
                                <span>Done</span>
                            </div>
                        </div>

                        {/* CALENDAR */}
                        <div className="bg-white rounded-xl shadow p-4">
                            <h2 className="text-center font-semibold mb-3">Your Caring Calendar</h2>

                            <div className="flex gap-4">

                                {/* LEFT FILTER */}
                                <div className="text-sm space-y-2">
                                    <p>Today</p>
                                    <p>Yesterday</p>
                                    <p>This Week</p>
                                    <p>Last 7 Days</p>
                                    <p>Last 28 Days</p>
                                    <p>This Month</p>
                                    <p>Last Month</p>
                                    <p>This Year</p>
                                </div>

                                <UiCalendar mode="single" selected={date} onSelect={setDate} />
                            </div>
                        </div>

                        {/* TABLE */}
                        <div className="bg-white rounded-xl shadow p-4">

                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Activities</TableHead>
                                        <TableHead>Task</TableHead>
                                        <TableHead>Due Date</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {tasks.map((task) => (
                                        <TableRow key={task.id}>
                                            <TableCell>{task.title}</TableCell>
                                            <TableCell>{task.status}</TableCell>
                                            <TableCell>20/01/2026</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                        </div>

                        {/* PRIORITY */}
                        <div className="bg-white rounded-xl shadow p-4">
                            <h2 className="font-semibold mb-4">Priority Task</h2>

                            <div className="space-y-3">

                                {priority.map((p, i) => (
                                    <div
                                        key={p}
                                        style={{ width: `${60 + i * 5}%` }}
                                        className="bg-[#e8a1a1] text-white px-4 py-2 rounded-md"
                                    >
                                        {p}
                                    </div>
                                ))}

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

