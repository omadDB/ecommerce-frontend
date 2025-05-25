import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { useState } from 'react';
import useLogout from '@/hooks/useLogout';
import SpinnerMini from './SpinnnerMini';
import useUser from '@/hooks/useUser';
import { LogOut } from 'lucide-react';

interface SignOutButtonProps {
  isPopover: boolean;
}

function SignOutButton({ isPopover }: SignOutButtonProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isPending, logout } = useLogout();
  const { user } = useUser();

  function handleLogout() {
    logout();
    setIsOpen(false);
  }

  return (
    <>
      {!isPopover ? (
        <>
          <button
            className="py-3 px-5 hover:bg-[#DC2626] hover:text-white rounded-lg transition-colors flex items-center gap-4 font-semibold text-gray-400 w-full group"
            onClick={() => setIsOpen(true)}
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5 text-gray-400 group-hover:text-white" />
            <span>Sign out</span>
          </button>
        </>
      ) : (
        <button
          className="w-full cursor-pointer flex items-center px-[9px] py-[5px] text-sm hover:bg-red-500 rounded-sm hover:text-white duration-200"
          onClick={() => setIsOpen(true)}
        >
          <LogOut className="w-4 h-4 mr-2" />
          <span>Log out</span>
        </button>
      )}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-2">
              Signing out of{' '}
              <span className="underline underline-offset-[5px]">
                {user?.email}
              </span>
            </DialogTitle>
            <DialogDescription className="text-lg">
              Are you sure you want to log out of your account?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-2">
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleLogout}
              type="submit"
              className="bg-red-500 hover:bg-[#B91C1C]"
            >
              {isPending ? <SpinnerMini /> : 'Log out'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SignOutButton;
