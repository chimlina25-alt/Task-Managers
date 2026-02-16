"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

type ScheduleItem = {
  id: number;
  title: string;
  type: string;
  date: string;
  time: string;
  note: string;
};

export default function ScheduleSetPage() {
  const searchParams = useSearchParams();
  const selectedTime = searchParams.get("time") || "";

  const [title, setTitle] = useState("");
  const [type, setType] = useState("Meeting");
  const [date, setDate] = useState("");
  const [time, setTime] = useState(selectedTime);
  const [note, setNote] = useState("");

  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);

  // ADD
  const handleAdd = () => {
    if (!title || !date || !time) return;

    const newItem: ScheduleItem = {
      id: Date.now(),
      title,
      type,
      date,
      time,
      note,
    };

    setSchedules([...schedules, newItem]);

    // reset
    setTitle("");
    setNote("");
  };

  // DELETE
  const handleDelete = (id: number) => {
    setSchedules(schedules.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#fdeaea] flex flex-col">

      {/* HEADER */}
      <header className="h-[90px] bg-[#f8dede] px-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo1.png" width={70} height={70} alt="logo" />
          <span className="text-xl font-semibold">BloomPlan</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <Link href="/profile">
            <Image
              src="/pf.png"
              width={60}
              height={60}
              alt="user"
              className="rounded-full"
            />
          </Link>
          <span className="text-sm">User Name</span>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main className="px-10 py-8">
        <Link href="/schedule"> <h1 className="text-2xl font-semibold mb-8"> Back </h1> </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* LEFT FORM */}
          <div className="md:col-span-2 bg-white rounded-xl p-8 shadow">
            <h2 className="font-semibold mb-6 text-lg">Add Activity</h2>

            <div className="space-y-4">

             
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border rounded-lg px-4 py-2"
              >
                <option>Meeting</option>
                <option>Study</option>
                <option>Work</option>
                <option>Personal</option>
              </select>

              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full border rounded-lg px-4 py-2"
              />

              <input
                type="time"
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full border rounded-lg px-4 py-2"
              />

              <textarea
                placeholder="Note (optional)"
                value={note}
                onChange={e => setNote(e.target.value)}
                className="w-full border rounded-lg px-4 py-2"
              />

              <button
                onClick={handleAdd}
                className="bg-[#e8a1a1] hover:bg-pink-400 text-white px-6 py-2 rounded-lg"
              >
                Save Schedule
              </button>
            </div>
          </div>

          {/* RIGHT LIST */}
          <div className="bg-white rounded-xl p-8 shadow">
            <h2 className="font-semibold mb-6 text-lg">Your Schedule</h2>

            {schedules.length === 0 && (
              <p className="text-sm text-gray-400">
                No schedules yet.
              </p>
            )}

            <ul className="space-y-4">
              {schedules.map(item => (
                <li
                  key={item.id}
                  className="border rounded-lg p-4 flex justify-between items-start"
                >
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-gray-500">
                      {item.type} • {item.date} • {item.time}
                    </p>
                    {item.note && (
                      <p className="text-sm mt-1">{item.note}</p>
                    )}
                  </div>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </main>
    </div>
  );
}
