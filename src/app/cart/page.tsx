import Container from '@/components/Container';
import { getCart } from '@/hooks/useCartActions';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '../get-query-client';
import CartClient from '@/features/cart/CartClient';

export default async function Page() {
  const queryClient = getQueryClient();
  const userId = 2;

  await queryClient.prefetchQuery({
    queryKey: ['cart', userId],
    queryFn: () => getCart(userId),
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
