'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

export function OrderCall() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to an API)
    alert('Thank you! We will call you shortly.');
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto px-4 py-10 sm:px-8 sm:py-14 rounded-3xl shadow-2xl bg-gradient-to-br from-[#22304A] to-[#1a2746] border border-white/10 overflow-hidden">
      {/* Glassy Card Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-white/10 backdrop-blur-md rounded-3xl" />
      {/* Decorative SVGs */}
      <svg
        className="absolute w-48 h-48 -top-10 -left-10 opacity-30"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="100" cy="100" r="100" fill="url(#blue1)" />
        <defs>
          <linearGradient
            id="blue1"
            x1="0"
            y1="0"
            x2="200"
            y2="200"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#3b82f6" />
            <stop offset="1" stopColor="#22304A" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        className="absolute bottom-0 right-0 w-64 h-64 opacity-20"
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="150" cy="150" rx="150" ry="100" fill="url(#blue2)" />
        <defs>
          <linearGradient
            id="blue2"
            x1="0"
            y1="0"
            x2="300"
            y2="300"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#60a5fa" />
            <stop offset="1" stopColor="#22304A" />
          </linearGradient>
        </defs>
      </svg>
      <div className="relative z-10 flex flex-col items-center gap-y-10">
        {/* Illustration Section */}
        <div className="relative w-32 h-32 mb-2 sm:w-44 sm:h-44">
          <Image
            src="/illustration.svg"
            alt="Call Illustration"
            fill
            className="object-contain drop-shadow-xl"
          />
        </div>
        {/* Headline */}
        <h3 className="mb-2 text-2xl font-bold text-center text-white sm:text-3xl drop-shadow-lg">
          Order a Call
        </h3>
        {/* Form Section */}
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          <div className="space-y-5">
            <div className="flex flex-col gap-1">
              <Label htmlFor="name" className="font-semibold text-blue-200">
                Name
              </Label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 transition-all border border-blue-400 shadow-sm bg-white/80 rounded-xl text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
                placeholder="Enter your name"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="email" className="font-semibold text-blue-200">
                Email
              </Label>
              <input
                type="email"
                className="w-full px-4 py-2 mt-2 transition-all border border-blue-400 shadow-sm bg-white/80 rounded-xl text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="phone" className="font-semibold text-blue-200">
                Phone Number
              </Label>
              <input
                type="tel"
                className="w-full px-4 py-2 mt-2 transition-all border border-blue-400 shadow-sm bg-white/80 rounded-xl text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
                placeholder="Enter your phone number"
              />
            </div>
          </div>
          <Button
            size="lg"
            type="submit"
            className="w-full py-3 text-lg font-bold tracking-wide text-white transition-all shadow-lg bg-gradient-to-r from-blue-600 to-blue-900 rounded-xl hover:from-blue-700 hover:to-blue-950"
          >
            Request a Call
          </Button>
        </form>
      </div>
    </div>
  );
}
