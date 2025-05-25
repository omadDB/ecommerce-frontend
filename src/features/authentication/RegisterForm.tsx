import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IUserRegister } from '@/types/userModel';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/lib/zod/schema';
import useRegister from '@/hooks/useRegister';
import clsx from 'clsx';
import SpinnerMini from '@/components/SpinnnerMini';

const classnames = {
  label:
    'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  input:
    'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
};

interface RegisterFormProps extends React.ComponentPropsWithoutRef<'div'> {
  setIsRegistering: (open: boolean) => void;
  setIsAuthModalOpen: (open: boolean) => void;
}

export default function RegisterForm({
  setIsRegistering,
  setIsAuthModalOpen,
  className,
  ...props
}: RegisterFormProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isUsingEmail, setIsUsingEmail] = useState(true);
  const { register: registerAPI, isPending } = useRegister();

  const { register, formState, handleSubmit, reset, clearErrors } =
    useForm<IUserRegister>({
      resolver: zodResolver(registerSchema),
    });
  const { errors } = formState;

  const onSubmit: SubmitHandler<IUserRegister> = (data) => {
    if (!fullName) return;
    if (!email && !phone) return;
    if (!password || !passwordConfirm) return;
    registerAPI(
      {
        fullName,
        email,
        phone: data.phone?.replace(/[\s\-\(\)]/g, ''),
        password,
        confirmPassword: passwordConfirm,
      },
      {
        onSuccess: () => {
          reset();
          setFullName('');
          setEmail('');
          setPhone('');
          setPassword('');
          setPasswordConfirm('');
          setIsAuthModalOpen(false);
        },
      }
    );
  };

  const handleSwitchRegisterType = (value: boolean) => {
    reset();
    clearErrors();
    setIsUsingEmail(value);
    setFullName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setPasswordConfirm('');
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="p-6 border-none">
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Enter your info below to register a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <div className="flex justify-around w-full pb-4 border-b">
                <Button
                  type="reset"
                  variant="outline"
                  className={clsx(
                    'border border-gray-300 hover:bg-blue-800 duration-200 py-2 px-4 rounded-lg hover:text-white',
                    isUsingEmail ? 'bg-blue-800 text-white' : ''
                  )}
                  onClick={() => handleSwitchRegisterType(true)}
                >
                  Register with Email
                </Button>
                <Button
                  type="reset"
                  variant="outline"
                  className={clsx(
                    'border border-gray-300 hover:bg-blue-800 duration-200 py-2 px-4 rounded-lg hover:text-white',
                    !isUsingEmail ? 'bg-blue-800 text-white' : ''
                  )}
                  onClick={() => handleSwitchRegisterType(false)}
                >
                  Register with Phone
                </Button>
              </div>
              <div className="grid gap-2">
                <label className={classnames.label} htmlFor="email">
                  Full Name
                </label>
                <input
                  {...register('fullName')}
                  className={classnames.input}
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Omadbek Dilshodbekov"
                />
                {errors?.fullName && (
                  <p className="text-sm text-red-500">
                    {errors.fullName.message}
                  </p>
                )}
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
              <div className="grid gap-2">
                <label className={classnames.label} htmlFor="password">
                  Confirm Password
                </label>
                <input
                  {...register('confirmPassword')}
                  className={classnames.input}
                  id="confirmPassword"
                  type="password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
                {errors?.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <Button type="submit" className="w-full">
                  {isPending ? <SpinnerMini /> : 'Register'}
                </Button>
                {/* <Button variant="outline" className="w-full">
                  Sign in with Google
                  <Image
                    src="https://authjs.dev/img/providers/google.svg"
                    alt="Google logo"
                    height="16"
                    width="16"
                  />
                </Button> */}
              </div>
            </div>
            <div className="mt-4 text-sm text-center">
              Already have an account?{' '}
              <button
                onClick={() => setIsRegistering(false)}
                className="underline underline-offset-4"
              >
                Sign in to existing account
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
