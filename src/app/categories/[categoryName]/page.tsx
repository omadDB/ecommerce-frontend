import { getServerAuth } from '@/app/_lib/serverAuth';
import ProductsClient from '@/components/ProductsClient';

export const dynamic = 'force-dynamic';

export default async function Page({
  params,
}: {
  params: Promise<{ categoryName: string }>;
}) {
  const { userId } = await getServerAuth();
  const { categoryName } = await params;
  //   const category = params.categoryName || "All"

  console.log('GetServerAuth: ', userId);

  return <ProductsClient userId={userId} categoryName={categoryName} />;
}
