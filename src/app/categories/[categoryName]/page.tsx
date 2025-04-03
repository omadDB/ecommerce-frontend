import { getServerAuth } from '@/app/_lib/serverAuth';
import ProductsClient from '@/components/ProductsClient';

export default async function Page({
  params,
}: {
  params: Promise<{ categoryName: string }>;
}) {
  const { userId } = await getServerAuth();
  const { categoryName } = await params;
  //   const category = params.categoryName || "All"

  return <ProductsClient userId={userId} categoryName={categoryName} />;
}
