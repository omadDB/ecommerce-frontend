import Image from 'next/image';

export default function ProductImage() {
  return (
    <div className="w-[100%] relative aspect-square">
      <Image
        src="/example-product.webp"
        fill
        className="object-cover rounded-md"
        alt="Product image"
      />
    </div>
  );
}
