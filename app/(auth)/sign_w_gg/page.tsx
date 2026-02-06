"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Page() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const isValid =
    email.includes("@") &&
    password.length >= 6

  const handleNext = () => {
    if (!isValid) return
    router.push("/verify")
  }

  return (
    <div className="min-h-screen bg-pink-100 flex items-center justify-center">

      <div className="bg-white rounded-[40px] shadow-xl w-[900px] h-[400px] grid grid-cols-2 p-10">

        {/* LEFT */}
        <div className="flex flex-col space-y-3 pt-1">

          <Image src="/photo_gg.png" alt="logo_google" width={50} height={50} />

          <h2 className="text-3xl font-semibold">
            Sign up
          </h2>

          <p className="text-sm text-muted-foreground">
            Use your google account
          </p>

        </div>

        {/* RIGHT */}
        <div className="flex flex-col justify-center space-y-4">

          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <p className="text-xs text-blue-500 cursor-pointer hover:underline">
            Forget password?
          </p>

          <p className="text-sm">
            Not your computer? Use Guest mode to sign in privately.
            <span className="underline text-blue-500 cursor-pointer">
              Learn more
            </span>
          </p>

          <Button
            onClick={handleNext}
            disabled={!isValid}
            className="self-end bg-pink-300 hover:bg-pink-400 disabled:opacity-50"
          >
            Next
          </Button>

        </div>

      </div>

    </div>
  )
}
