import { Product } from '@/types/productModel';
import Link from 'next/link';
import Image from 'next/image';

interface SearchResultsProps {
  results: Product[];
  onClose: () => void;
}

export default function SearchResults({
  results,
  onClose,
}: SearchResultsProps) {
  if (results.length === 0) return null;

  return (
    <div className="absolute left-0 z-50 w-full mt-2 overflow-y-auto bg-white rounded-lg shadow-lg top-full max-h-96">
      {results.map((product) => (
        <Link
          key={product.id}
          href={`/categories/${product.category.name}/${product.id}`}
          onClick={onClose}
          className="flex items-center gap-4 p-4 transition-colors hover:bg-gray-100"
        >
          <div className="relative w-16 h-16">
            <Image
              src="/example-product.webp"
              alt={product.name}
              fill
              className="object-cover rounded-md"
            />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-[#1c284b]">{product.name}</h4>
            <p className="mt-2 text-sm text-black">{product.price} so&apos;m</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
