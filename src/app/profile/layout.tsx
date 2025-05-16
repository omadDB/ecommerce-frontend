import { redirect } from 'next/navigation';
import { getServerAuth } from '@/app/_lib/serverAuth';
import ProfileContent from '@/features/profile/ProfileContent';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await getServerAuth();

  if (!userId) {
    redirect('/login');
  }

  return <ProfileContent>{children}</ProfileContent>;
}
