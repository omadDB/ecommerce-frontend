import { getServerAuth } from '@/app/_lib/serverAuth';
import { redirect } from 'next/navigation';
import OrdersTab from '@/features/profile/OrdersTab';

export default async function Page() {
  const { userId } = await getServerAuth();
  if (!userId) {
    redirect('/login');
  }

  return <OrdersTab userId={userId} />;
}
