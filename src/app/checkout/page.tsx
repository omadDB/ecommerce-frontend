import { getServerAuth } from '@/app/_lib/serverAuth';
import { redirect } from 'next/navigation';
import CheckoutClient from '@/features/checkout/CheckoutClient';

export default async function CheckoutPage() {
  const { userId } = await getServerAuth();

  if (!userId) {
    redirect('/login');
  }

  return <CheckoutClient userId={userId} />;
}
