import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { Button } from "./ui/button"
import { useState } from "react"
// import { signOutAction } from "../_lib/actions";

function SignOutButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <button
        className="py-3 px-5 hover:bg-[#DC2626] hover:text-white rounded-lg transition-colors flex items-center gap-4 font-semibold text-gray-400 w-full group"
        onClick={() => setIsOpen(true)}
      >
        <ArrowRightOnRectangleIcon className="h-5 w-5 text-gray-400 group-hover:text-white" />
        <span>Sign out</span>
      </button>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-2">
                Signing out of{" "}
                <span className="underline underline-offset-[5px]">
                  odilshodvekov13@gmail.com
                </span>
              </DialogTitle>
              <DialogDescription className="text-lg">
                Are you sure you want to log out of your account?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-2">
              <Button onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button type="submit" className="bg-[#DC2626] hover:bg-[#B91C1C]">
                Log out
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

export default SignOutButton
