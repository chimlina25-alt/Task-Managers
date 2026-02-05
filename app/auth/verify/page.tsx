"use client"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp"

import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Page() {
  return (
    <div className="min-h-screen bg-pink-100 flex items-center justify-center relative">


      <div className="absolute top-6 left-6 flex items-center gap-2">
        <Image src="/logo1.png" alt="BloomPlan" width={40} height={40} />
        <span className="font-semibold italic text-lg">BloomPlan</span>
      </div>


      <div className="bg-white rounded-[30px] shadow-xl w-[420px] p-10 text-center space-y-4">

        <h2 className="text-xl font-semibold">
          Email Verification
        </h2>

        <p className="text-sm text-gray-500">
          Please enter the 6 digit code sent to your email.
          <br />
          Don’t forget to check your email.
        </p>

        <p className="text-xs">
          Didn’t receive the code?
          <span className="text-red-400 cursor-pointer ml-1 hover:underline">
            Click to resend
          </span>
        </p>

        <div className="flex justify-center py-2">
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>

            <InputOTPSeparator />

            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button className="w-full bg-red-400 hover:bg-red-500">
          Verify
        </Button>

      </div>
    </div>
  )
}
