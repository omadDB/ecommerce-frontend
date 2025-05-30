import { getQueryClient } from '@/app/get-query-client';
import Container from '@/components/Container';
import { getServerAuth } from '@/app/_lib/serverAuth';
// import { getCart } from '@/services/apiCart';
// import { getProduct } from '@/services/apiProducts';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import ProductPage from '@/components/ProductPage';

export const dynamic = 'force-dynamic';

type tParams = Promise<{ productId: number }>;

export default async function Page({ params }: { params: tParams }) {
  const queryClient = getQueryClient();
  const { productId: id } = await params;
  const { userId } = await getServerAuth();

  // if (userId) {
  //   await queryClient.prefetchQuery({
  //     queryKey: ['cart', userId],
  //     queryFn: () => getCart(userId),
  //   });
  // }

  // await queryClient.prefetchQuery({
  //   queryKey: ['product', Number(id)],
  //   queryFn: () => getProduct(Number(id)),
  // });

  const dehydratedState = dehydrate(queryClient);

  return (
    <Container>
      <HydrationBoundary state={dehydratedState}>
        {/* <ProductClient id={id} userId={userId} /> */}
        <ProductPage id={id} userId={userId} />
      </HydrationBoundary>
    </Container>
  );
}
