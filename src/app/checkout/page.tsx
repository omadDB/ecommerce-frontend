'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { formatCurrency } from '@/utils/helpers';
import Spinner from '@/components/Spinner';
import ConfirmModal from '@/components/ConfirmModal';
import useOrder from '@/hooks/useOrder';
import { useCart } from '@/hooks/useCart';
import useUser from '@/hooks/useUser';
import { CartItem } from '@/types/cartItemModel';

const checkoutSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email'),
  shippingAddress: z
    .string()
    .min(10, 'Please enter a complete shipping address'),
  additionalNotes: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useUser();
  const { cart, isLoading: isCartLoading } = useCart(user?.id || null);
  const { createNewOrder, isPending: isCreatingOrder } = useOrder();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [formData, setFormData] = useState<CheckoutFormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: user?.fullName || '',
      email: user?.email || '',
      phone: user?.phone || '',
    },
  });

  useEffect(() => {
    if (!isCartLoading && !cart?.cartItems?.length) {
      router.push('/cart');
    }
  }, [isCartLoading, cart, router]);

  if (isCartLoading) return <Spinner />;
  if (!cart?.cartItems?.length) return null;

  const onSubmit = (data: CheckoutFormData) => {
    setFormData(data);
    setShowConfirmModal(true);
  };

  const handleConfirmOrder = () => {
    if (!formData) return;

    createNewOrder(
      {
        orderInfo: {
          shippingAddress: formData.shippingAddress,
          phone: formData.phone,
          email: formData.email,
          fullName: formData.fullName,
          additionalNotes: formData.additionalNotes || '',
        },
      },
      {
        onSuccess: () => {
          router.push('/profile/orders');
        },
      }
    );
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Order Summary */}
        <div className="p-6 space-y-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <div className="space-y-2">
            {cart.cartItems.map((item: CartItem) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.product.name} × {item.count || 0}
                </span>
                <span>
                  {formatCurrency(item.product.price * (item.count || 0))}
                </span>
              </div>
            ))}
          </div>
          <div className="pt-4 mt-4 border-t">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>{formatCurrency(cart.totalPrice)}</span>
            </div>
          </div>
        </div>

        {/* Shipping Information Form */}
        <div className="p-6 space-y-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold">Shipping Information</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium">
                Full Name
              </label>
              <input
                {...register('fullName')}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">
                Phone Number
              </label>
              <input
                {...register('phone')}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <input
                {...register('email')}
                type="email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">
                Shipping Address
              </label>
              <textarea
                {...register('shippingAddress')}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your complete shipping address"
                rows={3}
              />
              {errors.shippingAddress && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.shippingAddress.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">
                Additional Notes (Optional)
              </label>
              <textarea
                {...register('additionalNotes')}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Any special instructions or notes"
                rows={2}
              />
            </div>

            <button
              type="submit"
              disabled={isCreatingOrder}
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isCreatingOrder ? <Spinner /> : 'Proceed to Confirmation'}
            </button>
          </form>
        </div>
      </div>

      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmOrder}
        title="Confirm Your Order"
        message="Please review your order details and shipping information. Once confirmed, your order will be processed."
        confirmText="Place Order"
        cancelText="Review Order"
      />
    </div>
  );
}
