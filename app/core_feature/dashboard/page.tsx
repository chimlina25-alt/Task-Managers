"use client"

import * as React from "react"
import Image from "next/image"
import {
    LayoutDashboard,
    ClipboardList,
    Clock,
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
                    <Image
                        src="/pf.png"
                        width={80}
                        height={80}
                        alt="user"
                        className="rounded-full"
                    />
                    <span className="text-sm">User Name</span>
                </div>

            </header>

            {/* BODY */}
            <div className="flex flex-1">

                {/* SIDEBAR */}
                <div className="w-[260px] px-4 py-6">

                    {/* SEARCH */}
                    <div className="relative mb-6">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <input
                            placeholder="Search"
                            className="w-full rounded-full pl-9 py-2 text-sm outline-none"
                        />
                    </div>

                    {/* MENU */}
                    <div className="space-y-2 text-sm">

                        <div className="flex items-center gap-3 bg-[#e8a1a1] px-4 py-2 rounded">
                            <LayoutDashboard size={18} />
                            Dashboard
                        </div>

                        <SidebarItem icon={<ClipboardList size={18} />} label="Task" />
                        <SidebarItem icon={<Clock size={18} />} label="Due Date" />
                        <SidebarItem icon={<Bell size={18} />} label="Notification" />

                    </div>
                </div>

                {/* MAIN CONTENT */}
                <main className="flex-1 p-6">

                    <div className="grid grid-cols-2 gap-6">

                        {/* CHART */}
                        <div className="bg-white rounded-xl shadow p-4">
                            <h2 className="text-center font-semibold mb-3">Total Task: 6</h2>

                            <ChartContainer config={chartConfig} className="h-[220px]">
                                <BarChart data={chartData}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Bar dataKey="value" fill="#e8a1a1" radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ChartContainer>
                        </div>

                        {/* CALENDAR */}
                        <div className="bg-white rounded-xl shadow p-4">
                            <h2 className="font-semibold mb-2">Your Caring Calendar</h2>
                            <UiCalendar mode="single" selected={date} onSelect={setDate} />
                        </div>

                        {/* TABLE */}
                        <div className="bg-white rounded-xl shadow p-4">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Activities</TableHead>
                                        <TableHead>Task</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {tasks.map((task) => (
                                        <TableRow key={task.id}>
                                            <TableCell>{task.title}</TableCell>
                                            <TableCell>{task.status}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        {/* PRIORITY */}
                        <div className="bg-white rounded-xl shadow p-4">
                            <h2 className="font-semibold mb-4">Priority Task</h2>

                            <div className="space-y-3">
                                {priority.map((p) => (
                                    <div
                                        key={p}
                                        className="bg-[#e8a1a1] text-white px-4 py-2 rounded-md w-[80%]"
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

function SidebarItem({
    icon,
    label,
}: {
    icon: React.ReactNode
    label: string
}) {
    return (
        <div className="flex items-center gap-3 px-4 py-2 border-t cursor-pointer hover:bg-[#f3caca]">
            {icon}
            {label}
        </div>
    )
}
