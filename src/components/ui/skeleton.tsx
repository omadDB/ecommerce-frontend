import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string;
  height?: string;
  rounded?: string;
}

export function Skeleton({
  width = 'w-full',
  height = 'h-6',
  rounded = 'rounded-md',
  className,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-neutral-200',
        width,
        height,
        rounded,
        className
      )}
      {...props}
    />
  );
}
