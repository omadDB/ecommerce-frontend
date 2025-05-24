import { getServerAuth } from '@/app/_lib/serverAuth';
import CategoryPage from '@/components/CategoryPage';

export const dynamic = 'force-dynamic';

export default async function Page({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { userId } = await getServerAuth();
  const { categoryId } = await params;
  //   const category = params.categoryName || "All"

  console.log('GetServerAuth: ', userId);

  return <CategoryPage userId={userId} categoryId={categoryId} />;
}
