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

export default function SignUpPage() {
  const router = useRouter()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // 🔐 EMAIL SIGN UP
  const handleSignup = async () => {
  setError("")
  setLoading(true)
  
  if ([username, email, password, confirm].some(field => !field)) {
    setError("Please fill all fields")
    setLoading(false)
    return
  }

    if (password.length < 8) {
      setError("Password must be at least 8 characters")
      setLoading(false)
      return
    }

    if (password !== confirm) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    // 1️⃣ Create auth user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    const user = data.user

    // 2️⃣ Save extra data
    if (user) {
      await supabase.from("sign_up").insert({
        id: user.id,
        username: username,
        email: email,
      })
    }

    setLoading(false)
    router.push("/dashboard")
  }

  // 🔐 GOOGLE SIGN UP
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

      {/* LEFT */}
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
            </Field>

            <Field>
              <FieldLabel>Password</FieldLabel>
              <FieldContent>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel>Confirm Password</FieldLabel>
              <FieldContent>
                <Input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
              </FieldContent>
            </Field>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <Button
              onClick={handleSignup}
              disabled={loading}
              className="w-full bg-pink-200 text-black hover:bg-pink-300"
            >
              {loading ? "Creating..." : "Create Account"}
            </Button>

            <Button
              onClick={handleSignup}
              className="w-full bg-pink-200 text-black hover:bg-pink-300"
            >
              Sign up with Google
            </Button>

            <p className="text-sm text-center">
              Already have an account?
              <Link href="/Login">
                <span className="underline ml-1">Login</span>
              </Link>
            </p>

          </FieldGroup>
        </div>
      </div>
    </div>
  )
}