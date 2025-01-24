import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid"
// import { signOutAction } from "../_lib/actions";

function SignOutButton() {
  return (
    <form>
      <button className="py-3 px-5 hover:bg-primary-900 hover:text-primary-100 rounded-lg transition-colors flex items-center gap-4 font-semibold text-gray-400 w-full group">
        <ArrowRightOnRectangleIcon className="h-5 w-5 text-gray-400 group-hover:text-primary-600" />
        <span>Sign out</span>
      </button>
    </form>
  )
}

export default SignOutButton
