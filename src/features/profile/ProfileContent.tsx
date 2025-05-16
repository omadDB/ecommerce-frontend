'use client';

import Container from '@/components/Container';
import Sidebar from '@/components/Sidebar';

export default function ProfileContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <div className="grid grid-cols-[20%_1fr] gap-8 my-8 h-[calc(100vh-160px)]">
        <div className="sticky top-24">
          <Sidebar />
        </div>
        <div className="overflow-y-auto">{children}</div>
      </div>
    </Container>
  );
}
