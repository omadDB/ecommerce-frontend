import Container from '@/components/Container';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '../get-query-client';
import CartClient from '@/features/cart/CartClient';
import { redirect } from 'next/navigation';
import { getServerAuth } from '@/app/_lib/serverAuth';
import { getServerCart } from '@/services/apiCart';

export default async function Page() {
  const queryClient = getQueryClient();
  const { userId } = await getServerAuth();

  if (!userId) {
    redirect('/');
  }

  await queryClient.prefetchQuery({
    queryKey: ['cart', userId],
    queryFn: () => getServerCart(userId),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <Container>
      <HydrationBoundary state={dehydratedState}>
        <CartClient />
      </HydrationBoundary>
    </Container>
  );
}
