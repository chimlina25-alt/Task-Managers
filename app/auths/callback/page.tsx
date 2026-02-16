"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleAuth = async () => {
      const { data } = await supabase.auth.getUser()

      if (data.user) {
        await supabase.from("profiles").upsert({
          id: data.user.id,
          email: data.user.email,
          last_login: new Date().toISOString(),
        })

        router.push("/dashboard")
      }
    }

    handleAuth()
  }, [router])

  return <p className="p-10">Signing you in...</p>
}