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
    <div className="absolute top-full left-0 w-full bg-white rounded-lg shadow-lg mt-2 max-h-96 overflow-y-auto z-50">
      {results.map((product) => (
        <Link
          key={product.id}
          href={`/categories/${product.category.name}/${product.id}`}
          onClick={onClose}
          className="flex items-center gap-4 p-4 hover:bg-gray-100 transition-colors"
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
            <p className="text-sm text-black mt-2">{product.price} so'm</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
