"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingBagIcon, UserIcon } from "@heroicons/react/24/solid"
import { usePathname } from "next/navigation"
import ContainerBig from "./ContainerBig"

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="flex justify-center items-center bg-[#3b4f8b]">
      <ContainerBig className="flex w-full justify-between !py-4">
        <div className="flex items-center gap-8">
          <Image src="/favicon.ico" width={50} height={50} alt="Logo" />
          <nav>
            <ul className="flex gap-6 font-normal text-white">
              <li>
                <Link
                  className={`${
                    pathname === "/"
                      ? "text-white underline-offset-4 underline"
                      : "text-gray-300 hover:text-white underline-offset-4 hover:underline duration-400"
                  } `}
                  href="/"
                >
                  Homepage
                </Link>
              </li>
              <li>
                <Link
                  className={`${
                    pathname === "/categories/all"
                      ? "text-white underline-offset-4 underline"
                      : "text-gray-300 hover:text-white underline-offset-4 hover:underline duration-400"
                  } `}
                  href="/categories/all"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  className={`${
                    pathname === "/contacts"
                      ? "text-white underline-offset-4 underline"
                      : "text-gray-300 hover:text-white underline-offset-4 hover:underline duration-400"
                  } `}
                  href="/contacts"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-6 text-white">
          {/* <div className="rounded-lg bg-[#5575d4] hover:bg-[#3e5cb4] duration-300 cursor-pointer py-1.5 px-4 text-white">
            Dashboard 🛡️
          </div> */}
          <input
            type="text"
            className="text-primary-950 outline-none border--gray-500 border rounded-lg px-4 py-1 ring-1 focus:ring-8 focus:ring-blue-900 ring-[#3b4f8b] duration-300 sm:w-64 sm:focus:w-72"
            placeholder="Search..."
          />
          <Link href="/profile">
            <UserIcon
              className="hover:scale-110 duration-300"
              width={24}
              height={24}
              fill="none"
              stroke="white"
            />
          </Link>
          <Link href="/cart">
            <ShoppingBagIcon
              className="hover:scale-110 duration-300"
              width={24}
              height={24}
              fill="none"
              stroke="white"
            />
          </Link>
          <div className="rounded-lg bg-[#5575d4] hover:bg-[#3e5cb4] duration-300 cursor-pointer py-1.5 px-4 text-white">
            Log in
          </div>
        </div>
      </ContainerBig>
    </header>
  )
}
