'use client';

import OrdersTab from '@/features/profile/OrdersTab';
import useUser from '@/hooks/useUser';

export default function Page() {
  const { user } = useUser();

  if (!user?.id) return null;

  return <OrdersTab userId={user.id} />;
}
