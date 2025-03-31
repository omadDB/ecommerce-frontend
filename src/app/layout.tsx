import Navbar from '@/components/Navbar';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from '@/components/Footer';
import QueryProvider from './QueryClientProvider';
import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { getServerAuth } from './_lib/serverAuth';
import { AuthProvider } from '@/lib/AuthContext';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await getServerAuth();

  return (
    <html lang="en">
      <QueryProvider>
        <body
          className={`${inter.className} antialiased min-h-screen  grid grid-rows-[90px_1fr] `}
        >
          <AuthProvider initialUserId={userId}>
            <Suspense fallback={<div>Loading...</div>}>
              <Toaster
                position="top-center"
                gutter={12}
                containerStyle={{ margin: '8px' }}
                toastOptions={{
                  success: {
                    duration: 2000,
                  },
                  error: {
                    duration: 3000,
                  },
                  style: {
                    fontSize: '16px',
                    maxWidth: '500px',
                    margin: '8px',
                    padding: '16px 24px',
                    backgroundColor: 'white',
                    color: 'black',
                  },
                }}
              />
              <Navbar />
              {/* <div className="container-box w-full !py-8 !pb-10 relative"> */}
              {children}
              {/* </div> */}

              <Footer />
            </Suspense>
          </AuthProvider>
        </body>
      </QueryProvider>
    </html>
  );
}
