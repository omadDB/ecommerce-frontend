import clsx from "clsx"
import { ReactNode } from "react"

export default function ContainerBig({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={clsx("w-full lg:max-w-[1340px] mx-auto px-8 lg:px-5 w-full relative", className)}
    >
      {children}
    </div>
  )
}
