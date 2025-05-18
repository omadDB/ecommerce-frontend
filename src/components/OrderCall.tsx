"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export function OrderCall() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission (e.g., send data to an API)
    alert("Thank you! We will call you shortly.")
  }

  return (
    <div className="bg-[#1E3A8A] rounded-lg shadow-lg w-full mx-auto px-8 py-14">
      <div className="flex flex-col items-center gap-y-12">
        {/* Illustration Section */}
        
          <div className="relative p-16 lg:p-28">
              <Image
                src="/illustration.svg" // Replace with your illustration path
                alt="Call Illustration"
                fill
                className="object-contain"
              />
          </div>

        {/* Form Section */}
        <div className="w-full lg:w-[50%] px-4 lg:px-16">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6">
              <div className="flex flex-col gap-1">
                <Label htmlFor="name" className="text-white">
                  Name
                </Label>
                <input
                  type="text"
                  className="text-primary-950 outline-none border--gray-500 border rounded-lg px-4 py-2 mt-2 ring-1 focus:ring-8 focus:ring-primary-600 ring-primary-700 duration-300 w-full"
                  placeholder="Enter your name"
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <input
                  type="email"
                  className="text-primary-950 outline-none border--gray-500 border rounded-lg px-4 py-2 mt-2 ring-1 focus:ring-8 focus:ring-primary-600 ring-primary-700 duration-300 w-full"
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="phone" className="text-white">
                  Phone Number
                </Label>
                <input
                  type="tel"
                  className="text-primary-950 outline-none border--gray-500 border rounded-lg px-4 py-2 mt-2 ring-1 focus:ring-8 focus:ring-primary-600 ring-primary-700 duration-300 w-full"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
            <Button
              size="lg"
              type="submit"
              className="w-full bg-[#5575d4] hover:bg-[#3e5cb4] text-white font-semibold rounded-lg 
              transition-colors duration-300"
            >
              Request a Call
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
