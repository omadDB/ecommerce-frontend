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
import { CartItem } from '@/types/cartItemModel';
import Container from '@/components/Container';
import { getCurrentUser } from '@/services/apiUser';
import { User } from '@/types/userModel';

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

export default function CheckoutClient({ userId }: { userId: number }) {
  const router = useRouter();
  const { cart, isLoading: isCartLoading } = useCart(userId);
  const { createNewOrder, isPending: isCreatingOrder } = useOrder();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [formData, setFormData] = useState<CheckoutFormData | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          setUserData(user);
          // Pre-fill form fields with user data
          if (user.fullName) setValue('fullName', user.fullName);
          if (user.phone) setValue('phone', user.phone);
          if (user.email) setValue('email', user.email);
          if (user.address) setValue('shippingAddress', user.address);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoadingUser(false);
      }
    };

    fetchUserData();
  }, [setValue]);

  useEffect(() => {
    if (!isCartLoading && !cart?.cartItems?.length) {
      router.push('/cart');
    }
  }, [isCartLoading, cart, router]);

  if (isCartLoading || isLoadingUser) return <Spinner />;
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
    <Container>
      <div className="py-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-800">Checkout</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Order Summary */}
          <div className="p-6 space-y-6 bg-white border border-gray-100 rounded-lg shadow-lg">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                Order Summary
              </h2>
              <span className="px-3 py-1 text-sm font-medium rounded-full text-primary-700 bg-primary-50">
                {cart.cartItems.length}{' '}
                {cart.cartItems.length === 1 ? 'Item' : 'Items'}
              </span>
            </div>
            <div className="space-y-4">
              {cart.cartItems.map((item: CartItem) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 transition-colors rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 text-sm font-medium text-gray-600 bg-gray-100 rounded-full">
                      {item.count || 0}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-800">
                        {item.product.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {formatCurrency(item.product.price)} each
                      </span>
                    </div>
                  </div>
                  <span className="font-semibold text-gray-800">
                    {formatCurrency(item.product.price * (item.count || 0))}
                  </span>
                </div>
              ))}
            </div>
            <div className="pt-4 mt-4 space-y-3 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>{formatCurrency(cart.totalPrice)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex items-center justify-between pt-3 text-lg font-bold text-gray-800 border-t border-gray-100">
                <span>Total Amount</span>
                <span className="text-primary-700">
                  {formatCurrency(cart.totalPrice)}
                </span>
              </div>
            </div>
          </div>

          {/* Shipping Information Form */}
          <div className="p-4 space-y-6 bg-white rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800">
              Shipping Information
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  {...register('fullName')}
                  className="w-full px-4 py-2.5 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Enter your full name"
                  disabled={!!userData?.fullName}
                />
                {errors.fullName && (
                  <p className="mt-1.5 text-sm text-red-500">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  {...register('phone')}
                  className="w-full px-4 py-2.5 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Enter your phone number"
                  disabled={!!userData?.phone}
                />
                {errors.phone && (
                  <p className="mt-1.5 text-sm text-red-500">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full px-4 py-2.5 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Enter your email"
                  disabled={!!userData?.email}
                />
                {errors.email && (
                  <p className="mt-1.5 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Shipping Address
                </label>
                <textarea
                  {...register('shippingAddress')}
                  className="w-full px-4 py-2.5 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-colors resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Enter your complete shipping address"
                  rows={3}
                  disabled={!!userData?.address}
                />
                {errors.shippingAddress && (
                  <p className="mt-1.5 text-sm text-red-500">
                    {errors.shippingAddress.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Additional Notes (Optional)
                </label>
                <textarea
                  {...register('additionalNotes')}
                  className="w-full px-4 py-2.5 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-colors resize-none"
                  placeholder="Any special instructions or notes"
                  rows={2}
                />
              </div>

              <button
                type="submit"
                disabled={isCreatingOrder}
                className="w-full px-6 py-3 text-base font-medium text-white transition-all duration-200 bg-primary-700 rounded-lg hover:bg-primary-800 hover:shadow-lg hover:shadow-primary-700/25 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isCreatingOrder ? <Spinner /> : 'Proceed to Confirmation'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmOrder}
        title="Confirm Your Order"
        message="Please review your order details before proceeding. Once confirmed, your order will be processed."
        confirmText="Place Order"
        cancelText="Review Order"
      />
    </Container>
  );
}
