"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldContent,
} from "@/components/ui/field"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // 🔐 EMAIL LOGIN
  const handleLogin = async () => {
    setError("")
    setLoading(true)

    if (!email || !password) {
      setError("Please enter email and password")
      setLoading(false)
      return
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    // ✅ Update last login
    await supabase
      .from("profiles")
      .update({ last_login: new Date().toISOString() })
      .eq("id", data.user.id)

    setLoading(false)
    router.push("/dashboard")
  }

  // 🔐 GOOGLE LOGIN
  const handleGoogleLogin = async () => {
  // ✅ Fix 1 & 2: Single object + proper destructuring
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${location.origin}/auth/callback`,
    },
  });

  if (error) {
    // ✅ Fix 2: `error` is now in scope
    setError(error.message);
  }
};


  return (
    <div className="min-h-screen grid grid-cols-2">

      {/* LEFT SIDE */}
      <div className="relative bg-pink-100 flex flex-col justify-center px-20">
        <div className="absolute top-6 left-6 flex items-center gap-3">
          <Image src="/logo1.png" alt="Logo" width={80} height={80} />
          <span className="text-2xl font-semibold italic">BloomPlan</span>
        </div>

        <h1 className="text-5xl font-Italianno mb-6">
          Welcome to BloomPlan!
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

          <Button
            variant="outline"
            className="w-full bg-pink-200"
            onClick={handleGoogleLogin}
          >
            Login with Google
          </Button>

          <div className="text-center text-sm">
            ______ Or continue with ______
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
              disabled={loading}
              className="w-full bg-pink-200 text-black hover:bg-pink-300"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </FieldGroup>

          <p className="text-sm text-center">
            Don’t have an account?
            <Link href="/sign_up">
              <span className="underline ml-1 cursor-pointer">Sign up</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}