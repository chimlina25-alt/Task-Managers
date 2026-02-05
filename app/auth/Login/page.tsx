"use client"

import { Field, FieldGroup, FieldLabel, FieldContent } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"


export default function LoginPage() {
  return (
    <div className="min-h-screen grid grid-cols-2">

      <div className="relative bg-pink-100 flex flex-col justify-center px-20">

        <div className="absolute top-6 left-6 flex items-center gap-3">
          <Image
            src="/logo1.png"
            alt="Logo"
            width={80}
            height={80}
          />

          <span className="text-2xl font-semibold italic">
            BloomPlan
          </span>
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

      <div className="relative flex flex-col items-center justify-center">

        <div className="flex items-center gap-3">
          <Image
            src="/logo1.png"
            alt="BloomPlan"
            width={80}
            height={80}
          />

          <span className="text-2xl font-semibold italic">
            BloomPlan
          </span>
        </div>




        <div className="w-full max-w-sm space-y-5">

          <Button variant="outline" className="w-full bg-pink-200 text-black hover:bg-pink-300">
            Login with Apple
          </Button>

          <Button variant="outline" className="w-full bg-pink-200 text-black hover:bg-pink-300">
            Login with Google
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            __________Or continue with__________
          </div>

          <FieldGroup>

            <Field>
              <FieldLabel>Email</FieldLabel>
              <FieldContent>
                <Input placeholder="m@example.com" />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel>Password</FieldLabel>
              <FieldContent>
                <Input type="password" />
              </FieldContent>
            </Field>

            <Button className="w-full bg-pink-200 text-black hover:bg-pink-300">
              Login
            </Button>

          </FieldGroup>

          <p className="text-sm text-center">
            Don't have an account?{" "}
            <span className="underline cursor-pointer">Sign up</span>
          </p>
          <p className="text-sm text-center font-Geist">
            By clicking continue, you agree to our <span className="underline cursor-pointer">Terms of Servicea </span>
            and <span className="underline cursor-pointer">Privacy Policy </span>.
          </p>
        </div>
      </div>

    </div> 
  )
}
