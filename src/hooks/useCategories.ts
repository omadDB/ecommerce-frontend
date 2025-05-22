import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axios/axios';
import { Category } from '@/types/categoryModel';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await axiosInstance.get<Category[]>('/categories');
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
  });
}
