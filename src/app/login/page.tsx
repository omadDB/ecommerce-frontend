import { redirect } from 'next/navigation';
import { getServerAuth } from '@/app/_lib/serverAuth';
import { LoginForm } from '@/features/authentication/LoginForm';

export default async function Page() {
  const { userId } = await getServerAuth();

  if (userId) {
    redirect('/');
  }

  return (
    // <div className="flex items-center justify-center w-full p-6 min-h-svh md:p-10">
    <div className="flex items-center justify-center">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
    // </div>
  );
}
