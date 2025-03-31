import { useQuery } from '@tanstack/react-query';
import { getProduct } from '@/services/apiProducts';

export function useProduct(id: number | null) {
  const fetchProduct = async () => {
    return await getProduct(id);
  };

  const {
    data: product,
    isSuccess,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: fetchProduct,
    enabled: id !== undefined || typeof window !== 'undefined',
  });

  return { product, isSuccess, isLoading, error };
}
