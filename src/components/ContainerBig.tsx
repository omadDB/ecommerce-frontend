import clsx from 'clsx';
import { ReactNode } from 'react';

export default function ContainerBig({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={clsx(
        'w-full lg:max-w-[1340px] mx-auto px-2 sm:px-4 lg:px-5 sm:py-2 md:px-4 py-2 md:py-4 relative',
        className
      )}
    >
      {children}
    </div>
  );
}
