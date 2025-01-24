"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function Page() {
  const [name, setName] = useState<string>("Omadbek")
  const [surname, setSurname] = useState<string>("Dilshodbekov")

  return (
    <div className="flex flex-col items-center rounded-lg p-6 border border-gray-200">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className="flex justify-between w-full">
        <div className="grid w-full max-w-sm items-center gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-2">
          <Label htmlFor="surname">Surname</Label>
          <Input
            type="text"
            id="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
