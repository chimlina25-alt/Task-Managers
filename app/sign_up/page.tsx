"use client"

import { Field, FieldGroup, FieldLabel, FieldContent } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
    return (
        <div className="min-h-screen grid grid-cols-2">

            {/* LEFT SIDE */}
            <div className="bg-pink-100 flex flex-col justify-center px-20">

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
            <div className="flex items-center justify-center">

                <div className="w-full max-w-sm space-y-5">

                    <h2 className="text-xl font-semibold text-center">BloomPlan</h2>

                    <FieldGroup>

                        <Field>
                            <FieldLabel>User Name</FieldLabel>
                            <FieldContent>
                                <Input />
                            </FieldContent>
                        </Field>

                        <Field>
                            <FieldLabel>Email</FieldLabel>
                            <FieldContent>
                                <Input />
                            </FieldContent>
                            <p className="text-sm">
                                We'll use this to contact you. We will not share your email with anyone else.</p>
                        </Field>

                        <Field>
                            <FieldLabel>Password</FieldLabel>
                            <FieldContent>
                                <Input type="password" />
                            </FieldContent>
                            <p className="text-sm">
                                Must be at least 8 characters long.
                            </p>
                        </Field>


                        <Field>
                            <FieldLabel>Confirm Password</FieldLabel>
                            <FieldContent>
                                <Input type="password" />
                            </FieldContent>
                            <p className="text-sm">
                                Please confirm your password.
                            </p>
                        </Field>


                        <Button className="w-full bg-pink-200 text-black hover:bg-pink-300">
                            Create Account
                        </Button>

                        <Button className="w-full bg-pink-200 text-black hover:bg-pink-300">
                            Sign up with Google
                        </Button>

                    </FieldGroup>
                </div>
            </div>

        </div>
    )
}
