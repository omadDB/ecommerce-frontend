import { getQueryClient } from '@/app/get-query-client';
import Container from '@/components/Container';
import ProductClient from '@/features/products/ProductClient';
import { getServerAuth } from '@/app/_lib/serverAuth';
import { getServerCart } from '@/services/apiCart';
import { getProduct } from '@/services/apiProducts';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

type tParams = Promise<{ productId: number }>;

export default async function Page({ params }: { params: tParams }) {
  const queryClient = getQueryClient();
  const { productId: id } = await params;
  const { userId } = await getServerAuth();

  if (userId) {
    await queryClient.prefetchQuery({
      queryKey: ['cart', userId],
      queryFn: () => getServerCart(userId),
    });
  }
  await queryClient.prefetchQuery({
    queryKey: ['product', Number(id)],
    queryFn: () => getProduct(Number(id)),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <Container>
      <HydrationBoundary state={dehydratedState}>
        <ProductClient id={id} />
      </HydrationBoundary>
    </Container>
  );
}
