import Link from 'next/link';

export function CartHeader() {
  return (
    <div className="flex justify-between ">
      <h2 className="text-4xl font-semibold mb-7">Корзина</h2>
      <Link
        href="/categories/all"
        className="text-primary underline-offset-4 hover:underline duration-400"
      >
        Продолжить покупки
      </Link>
    </div>
  );
}
