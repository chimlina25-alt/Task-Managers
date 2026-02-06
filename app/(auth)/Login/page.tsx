"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Field, FieldGroup, FieldLabel, FieldContent } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please enter email and password")
      return
    }

    // simple demo validation
    if (email === "admin@gmail.com" && password === "123456") {
      router.push("/dashboard")
    } else {
      setError("Invalid email or password")
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-2">

      {/* LEFT SIDE */}
      <div className="relative bg-pink-100 flex flex-col justify-center px-20">

        <div className="absolute top-6 left-6 flex items-center gap-3">
          <Image src="/logo1.png" alt="Logo" width={80} height={80} />
          <span className="text-2xl font-semibold italic">BloomPlan</span>
        </div>

        <h1 className="text-5xl font-Italianno mb-6">
          Welcome to BloomPlan !
        </h1>

        <p className="mb-6">
          Our platform provides a clean dashboard where you can track your
          progress, manage schedules, and stay focused.
        </p>

        <ul className="list-disc ml-5 space-y-2 text-sm">
          <li>Organize tasks in one place</li>
          <li>Manage deadlines and priorities</li>
          <li>Receive reminders</li>
          <li>Track progress easily</li>
          <li>Improve productivity</li>
        </ul>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-col items-center justify-center">

        <div className="flex items-center gap-3 mb-6">
          <Image src="/logo1.png" alt="BloomPlan" width={80} height={80} />
          <span className="text-2xl font-semibold italic">BloomPlan</span>
        </div>

        <div className="w-full max-w-sm space-y-5">

          <Button variant="outline" className="w-full bg-pink-200">
            Login with Apple
          </Button>

          <Link href="/sign_w_gg">
            <Button variant="outline" className="w-full bg-pink-200">
              Login with Google
            </Button>
          </Link>

          <div className="text-center text-sm">
            __________Or continue with__________
          </div>

          <FieldGroup>

            <Field>
              <FieldLabel>Email</FieldLabel>
              <FieldContent>
                <Input
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel>Password</FieldLabel>
              <FieldContent>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FieldContent>
            </Field>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <Button
              onClick={handleLogin}
              className="w-full bg-pink-200 text-black hover:bg-pink-300"
            >
              Login
            </Button>

          </FieldGroup>

          <p className="text-sm text-center">
            Don't have an account?
            <Link href="/sign_up">
              <span className="underline ml-1 cursor-pointer">Sign up</span>
            </Link>
          </p>

        </div>
      </div>

    </div>
  )
}
