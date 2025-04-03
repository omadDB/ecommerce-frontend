import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="py-12">{children}</div>;
}
