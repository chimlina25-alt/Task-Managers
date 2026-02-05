"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Page() {
  return (
    <div className="min-h-screen bg-pink-100 flex items-center justify-center">

      <div className="bg-white rounded-[40px] shadow-xl w-[900px] h-[400px] grid grid-cols-2 p-10">

       <div className="flex flex-col space-y-3 pt-1">


          <div className="flex items-center gap-2 mb-2">
            <Image src="/photo_gg.png" alt="logo_google" width={50} height={50} />
          </div>

          <h2 className="text-3xl font-semibold">
            Sign up
          </h2>

          <p className="text-sm text-muted-foreground">
            Use your google account
          </p>

        </div>

       
        <div className="flex flex-col justify-center space-y-4">

          <Input placeholder="Email" />
          <br />

          <Input type="password" placeholder="Password" />
<p className="text-xs text-blue-500 cursor-pointer hover:underline">
  Forget password?
</p>

          <br />
          <p className="text-sm font- ">Not your computer? Use Guest mode to sign in privately.
<span className="underline text-blue-500 cursor-pointer">Learn more about using Guest mode</span></p>

          <Button className="self-end bg-pink-300 hover:bg-pink-400">
            Next
          </Button>

        </div>

      </div>


    </div>
    
  )
}
