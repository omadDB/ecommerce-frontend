// src/app/categories/all/page.tsx
import { getServerAuth } from '@/app/_lib/serverAuth';
import AllProductsPage from '@/components/AllProductsPage';

export default async function Page() {
  const { userId } = await getServerAuth();

  return <AllProductsPage userId={userId} />;
}
