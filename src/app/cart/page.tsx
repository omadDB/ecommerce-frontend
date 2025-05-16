import Container from '@/components/Container';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '../get-query-client';
import CartClient from '@/features/cart/CartClient';
import { redirect } from 'next/navigation';
import { getServerAuth } from '@/app/_lib/serverAuth';
import { getCart } from '@/services/apiCart';

export default async function Page() {
  const queryClient = getQueryClient();
  const { userId } = await getServerAuth();

  if (!userId) {
    redirect('/login');
  }

  // Only prefetch if we have a userId

  await queryClient.prefetchQuery({
    queryKey: ['cart', userId],
    queryFn: () => getCart(userId),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <Container>
      <HydrationBoundary state={dehydratedState}>
        <CartClient userId={userId} />
      </HydrationBoundary>
    </Container>
  );
}
