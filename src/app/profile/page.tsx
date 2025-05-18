'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { User } from '@/types/userModel';
import { zPhoneNumber } from '@/lib/zod/schema';
import Spinner from '@/components/Spinner';
import toast from 'react-hot-toast';

const profileSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format').optional(),
  phone: zPhoneNumber,
  address: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function Page() {
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    const mockUserData: User = {
      id: 1,
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+998901234567',
      address: '123 Main St',
      roles: { customer: 2708 },
      password: '',
      orders: [],
    };

    setUserData(mockUserData);
    setValue('fullName', mockUserData.fullName);
    if (mockUserData.email) setValue('email', mockUserData.email);
    if (mockUserData.phone) setValue('phone', mockUserData.phone);
    if (mockUserData.address) setValue('address', mockUserData.address);
    setIsLoading(false);
  }, [setValue]);

  const onSubmit = async (data: ProfileFormData) => {
    setIsUpdating(true);
    try {
      console.log('Form data to be sent:', data);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="w-full min-h-[calc(100vh-160px)] bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex flex-col items-center p-8">
        <div className="relative mb-6">
          <Avatar className="w-32 h-32 shadow-lg ring-4 ring-white">
            <AvatarImage
              src={userData?.avatar || 'https://github.com/shadcn.png'}
            />
            <AvatarFallback className="text-3xl">
              {userData?.fullName?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="absolute bottom-0 right-0">
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 bg-white rounded-full shadow-md hover:bg-gray-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" x2="12" y1="3" y2="15" />
              </svg>
            </Button>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-4xl min-h-full space-y-6"
        >
          <div className="grid grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="fullName" className="text-base font-medium">
                Full Name
              </Label>
              <Input
                id="fullName"
                {...register('fullName')}
                placeholder="Enter your full name"
                className="h-11 bg-gray-50/50"
              />
              {errors.fullName && (
                <p className="text-sm text-red-500">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email" className="text-base font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="Enter your email"
                className="h-11 bg-gray-50/50"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone" className="text-base font-medium">
                Phone Number
              </Label>
              <Input
                id="phone"
                {...register('phone')}
                placeholder="Enter your phone number"
                className="h-11 bg-gray-50/50"
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="address" className="text-base font-medium">
                Address
              </Label>
              <Input
                id="address"
                {...register('address')}
                placeholder="Enter your address"
                className="h-11 bg-gray-50/50"
              />
              {errors.address && (
                <p className="text-sm text-red-500">{errors.address.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="px-4 py-6 text-base font-medium"
              disabled={isUpdating}
            >
              {isUpdating ? 'Updating...' : 'Update Profile'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
