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

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState("")

  const handleSignup = () => {
    if (!username || !email || !password || !confirm) {
      setError("Please fill all fields")
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }

    if (password !== confirm) {
      setError("Passwords do not match")
      return
    }

    // Success → go dashboard
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen grid grid-cols-2">

      {/* LEFT */}
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

      {/* RIGHT */}
      <div className="flex flex-col items-center justify-center">

        <div className="flex items-center gap-3 mb-4">
          <Image src="/logo1.png" alt="BloomPlan" width={80} height={80} />
          <span className="text-2xl font-semibold italic">BloomPlan</span>
        </div>

        <div className="w-full max-w-sm space-y-5">

          <FieldGroup>

            <Field>
              <FieldLabel>User Name</FieldLabel>
              <FieldContent>
                <Input value={username} onChange={(e) => setUsername(e.target.value)} />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel>Email</FieldLabel>
              <FieldContent>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} />
              </FieldContent>
              <p className="text-sm"> We'll use this to contact you. 
                We will not share your email with anyone else.</p>
            </Field>

            <Field>
              <FieldLabel>Password</FieldLabel>
              <FieldContent>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </FieldContent>
              <p className="text-sm"> Must be at least 8 characters long. </p>
            </Field>

            <Field>
              <FieldLabel>Confirm Password</FieldLabel>
              <FieldContent>
                <Input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
              </FieldContent>
              <p className="text-sm"> Please confirm your password. </p>
            </Field>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <Button
              onClick={handleSignup}
              className="w-full bg-pink-200 text-black hover:bg-pink-300"
            >
              Create Account
            </Button>

            <Link href="/sign_w_gg">
              <Button className="w-full bg-pink-200 text-black hover:bg-pink-300">
                Sign up with Google
              </Button>
            </Link>

          </FieldGroup>

        </div>
      </div>

    </div>
  )
}
