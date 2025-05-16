'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import useLogin from '@/hooks/useLogin';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/zod/schema';
import { IUserLogin } from '@/types/userModel';
import clsx from 'clsx';
import SpinnerMini from '@/components/SpinnnerMini';
import { useRouter } from 'next/navigation';

const classnames = {
  label:
    'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  input:
    'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
};

interface LoginFormProps extends React.ComponentPropsWithoutRef<'div'> {
  setIsRegistering?: (open: boolean) => void;
  setIsAuthModalOpen?: (open: boolean) => void;
}

export function LoginForm({
  setIsRegistering,
  setIsAuthModalOpen,
  className,
  ...props
}: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isUsingEmail, setIsUsingEmail] = useState(true);
  const { login, isPending } = useLogin();
  const router = useRouter();

  const { register, formState, handleSubmit, reset, clearErrors } =
    useForm<IUserLogin>({
      resolver: zodResolver(loginSchema),
    });
  const { errors } = formState;

  const onSubmit: SubmitHandler<IUserLogin> = (data) => {
    if (!email && !phone) return;
    if (!password) return;
    login(
      { email, phone: data.phone?.replace(/[\s\-\(\)]/g, ''), password },
      {
        onSuccess: () => {
          reset();
          setEmail('');
          setPhone('');
          setPassword('');
          setIsAuthModalOpen?.(false);
          router.push('/');
          router.refresh();
        },
      }
    );
  };

  const handleSwitchLoginType = (value: boolean) => {
    reset();
    clearErrors();
    setIsUsingEmail(value);
    setEmail('');
    setPhone('');
    setPassword('');
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="p-6 border-none">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your account info below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex justify-around w-full pb-4 border-b">
                <Button
                  type="reset"
                  variant="outline"
                  className={clsx(
                    'border border-gray-300 hover:bg-[#1c284b] duration-200 py-2 px-4 rounded-lg hover:text-white',
                    isUsingEmail ? 'bg-[#1c284b] text-white' : ''
                  )}
                  onClick={() => handleSwitchLoginType(true)}
                >
                  Login with Email
                </Button>
                <Button
                  type="reset"
                  variant="outline"
                  className={clsx(
                    'border border-gray-300 hover:bg-[#1c284b] duration-200 py-2 px-4 rounded-lg hover:text-white',
                    !isUsingEmail ? 'bg-[#1c284b] text-white' : ''
                  )}
                  onClick={() => handleSwitchLoginType(false)}
                >
                  Login with Phone
                </Button>
              </div>
              <div className="grid gap-2">
                {isUsingEmail && (
                  <>
                    <label className={classnames.label} htmlFor="email">
                      Email
                    </label>
                    <input
                      {...register('email')}
                      className={classnames.input}
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="omad@example.com"
                    />
                    {errors?.email && (
                      <p className="text-sm text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </>
                )}
                {!isUsingEmail && (
                  <>
                    <label className={classnames.label} htmlFor="phone">
                      Phone
                    </label>
                    <input
                      {...register('phone')}
                      className={classnames.input}
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+998-97-123-45-67"
                    />
                    {errors?.phone && (
                      <p className="text-sm text-red-500">
                        {errors.phone.message}
                      </p>
                    )}
                  </>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <label className={classnames.label} htmlFor="password">
                    Password
                  </label>
                  <a
                    href="#"
                    className="inline-block ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <input
                  {...register('password')}
                  className={classnames.input}
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors?.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* <input type="submit" /> */}
              <div className="flex flex-col gap-2">
                <Button type="submit" className="w-full">
                  {isPending ? <SpinnerMini /> : 'Login'}
                </Button>
                <Button variant="outline" type="button" className="w-full ">
                  Sign in with Google
                  <Image
                    src="https://authjs.dev/img/providers/google.svg"
                    alt="Google logo"
                    height="16"
                    width="16"
                  />
                </Button>
              </div>
            </div>
            <div className="mt-4 text-sm text-center">
              Don&apos;t have an account?{' '}
              <button
                type="reset"
                onClick={() => setIsRegistering?.(true)}
                className="underline underline-offset-4"
              >
                Create account
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
