'use client';
import { useCart } from '@/hooks/useCart';
import Spinner from '@/components/Spinner';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Trash2 } from 'lucide-react';
import Image from 'next/image';
import UpdateCartItemQuantity from '@/components/UpdateCartItemQuantity';
import useCartActions from '@/hooks/useCartActions';
import { formatCurrency } from '@/utils/helpers';
import { useRouter } from 'next/navigation';

export default function CartClient({ userId }: { userId: number }) {
  const { cart, isLoading, error } = useCart(userId);
  const { cartItems, totalPrice } = cart;

  const { removeMutation } = useCartActions();
  const router = useRouter();

  function handleRemove(productId: number) {
    removeMutation.mutate(productId);
    // dispatch(removeFromCart(product.productId));
  }

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;
  if (!cart) return null;

  return (
    <div className="container max-w-6xl px-0 py-8 sm:px-4 md:py-12">
      <div className="flex justify-between">
        <h1 className="mb-8 text-3xl font-bold">Your Cart</h1>
        <Link
          href="/categories/all"
          className="text-sm text-primary underline-offset-4 hover:underline duration-400 sm:text-base"
        >
          Продолжить покупки
        </Link>
      </div>

      {cartItems.length === 0 ? (
        <div className="py-12 text-center">
          <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-blue-900" />
          <h2 className="mb-2 text-xl font-semibold">Your cart is empty</h2>
          <p className="mb-6 text-muted-foreground">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
          {/* <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/categories/all">Continue Shopping</Link>
          </Button> */}
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-1">
              {cartItems.map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden border-0 shadow-sm"
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative w-full sm:w-32 h-52 sm:h-36 bg-muted">
                        <Image
                          src={item.product.images[0] || '/placeholder.svg'}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-between flex-1 gap-4 p-4">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium line-clamp-1">
                              {item.product.name}
                            </h3>
                            <p className="mt-1 font-semibold text-blue-600">
                              {formatCurrency(item.product.price)}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8 text-muted-foreground hover:text-destructive"
                            onClick={() => handleRemove(item.productId)}
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
                        <div className="flex items-center">
                          <UpdateCartItemQuantity cartItem={item} />
                          <div className="ml-auto font-semibold">
                            {formatCurrency(item.product.price * item.count!)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatCurrency(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-green-500">
                      {/* {shipping === 0 ? 'Free' : `${shipping}`} */}
                      Free
                    </span>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>{formatCurrency(totalPrice)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="px-6 pt-0 pb-6">
                <Button
                  onClick={() => router.push('/checkout')}
                  className="w-full text-white bg-blue-600 hover:bg-blue-700"
                >
                  Proceed to Checkout
                </Button>
              </CardFooter>
            </Card>
            <div className="mt-4 text-sm text-center text-muted-foreground">
              <p>
                Need help?{' '}
                <Link
                  href="/contacts"
                  className="text-blue-600 hover:underline"
                >
                  Contact us
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
