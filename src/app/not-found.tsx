'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Card className="flex flex-col items-center w-full max-w-md gap-6 p-8 mx-auto bg-white border shadow-lg border-neutral-200 rounded-2xl">
        <div className="flex flex-col items-center gap-2">
          <Search className="w-12 h-12 mb-2 text-primary-600" />
          <h1 className="text-2xl font-bold text-neutral-800">
            Page Not Found
          </h1>
          <p className="text-center text-neutral-600">
            Sorry, the page you are looking for does not exist or has been
            moved.
          </p>
        </div>
        <Button
          className="px-6 py-2 mt-2 font-semibold text-white transition rounded-lg shadow bg-primary hover:bg-primary-700"
          onClick={() => router.back()}
        >
          Go Back
        </Button>
      </Card>
    </div>
  );
}
