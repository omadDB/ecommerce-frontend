'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { zPhoneNumber } from '@/lib/zod/schema';
import Spinner from '@/components/Spinner';
import useUser from '@/hooks/useUser';
import useUpdateUser from '@/hooks/useUpdateUser';
import { useState, useEffect } from 'react';

const profileSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format').optional(),
  phone: zPhoneNumber,
  address: z.string().optional(),
  // avatar: z.instanceof(File).optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

export default function Page() {
  const { user: userData, isPending: isLoading } = useUser();
  const { updateUser, isPending: isUpdating, error } = useUpdateUser();
  // const [avatar, setAvatar] = useState<string | null>(userData?.avatar || null);
  const [email, setEmail] = useState(userData?.email);
  const [phone, setPhone] = useState(userData?.phone);
  // const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: userData?.fullName || '',
      email: userData?.email || '',
      phone: userData?.phone || '',
      address: userData?.address || '',
    },
  });

  // Update form values when userData changes
  useEffect(() => {
    if (userData) {
      setValue('fullName', userData.fullName || '');
      setValue('email', userData.email || '');
      setValue('phone', userData.phone || '');
      setValue('address', userData.address || '');
    }
  }, [userData, setValue]);

  const onSubmit = async (data: ProfileFormData) => {
    console.log(data);
    updateUser(data);
  };

  if (isLoading || isUpdating) return <Spinner />;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="flex justify-center w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8">
      <div className="w-full max-w-4xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full min-h-full space-y-4 sm:space-y-6"
        >
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <Avatar className="w-24 h-24 shadow-lg sm:w-32 sm:h-32 ring-4 ring-white">
                <AvatarImage
                  src={
                    // avatarPreview || avatar ||
                    'https://github.com/shadcn.png'
                  }
                />
                <AvatarFallback className="text-3xl">
                  {userData?.fullName?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0">
                <Label
                  htmlFor="avatar"
                  className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-md cursor-pointer hover:bg-gray-50"
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
                </Label>
                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  // {...register('avatar')}
                />
              </div>
            </div>
            {/* {errors.avatar && (
              <p className="mt-2 text-sm text-red-500">
                {errors.avatar.message}
              </p>
            )} */}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="grid gap-2">
              <Label
                htmlFor="fullName"
                className="text-sm font-medium sm:text-base"
              >
                Full Name
              </Label>
              <Input
                id="fullName"
                {...register('fullName')}
                placeholder="Enter your full name"
                value={userData?.fullName}
                disabled={userData?.fullName !== ''}
                className="w-full text-sm h-11 bg-gray-50/50 sm:text-base"
              />
              {errors.fullName && (
                <p className="text-sm text-red-500">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium sm:text-base"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isUpdating || isLoading}
                className="w-full text-sm h-11 bg-gray-50/50 sm:text-base"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="phone"
                className="text-sm font-medium sm:text-base"
              >
                Phone Number
              </Label>
              <Input
                id="phone"
                {...register('phone')}
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={isUpdating || isLoading}
                className="w-full text-sm h-11 bg-gray-50/50 sm:text-base"
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>

            {/* <div className="grid gap-2">
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
            </div> */}
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="px-4 py-3 text-base font-medium sm:px-8 sm:py-4"
              disabled={isUpdating || isLoading}
            >
              {isUpdating ? 'Updating...' : 'Update Profile'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
