import clsx from 'clsx';
import { ReactNode } from 'react';

export default function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={clsx('max-w-[1240px] mx-auto px-5 w-full relative', className)}
    >
      {children}
    </div>
  );
}
