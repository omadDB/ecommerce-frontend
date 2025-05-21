import Link from 'next/link';

export function CartHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center sm:gap-0">
      <h2 className="text-2xl font-semibold sm:text-3xl md:text-4xl">
        Корзина
      </h2>
      <Link
        href="/categories/all"
        className="text-sm text-primary underline-offset-4 hover:underline duration-400 sm:text-base"
      >
        Продолжить покупки
      </Link>
    </div>
  );
}
