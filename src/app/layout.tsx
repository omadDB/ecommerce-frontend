import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import '../styles/base.css';
import '../styles/embla.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Navbar from '@/components/Navbar';
import QueryProvider from './QueryClientProvider';
import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import FooterWrapper from '@/components/FooterWrapper';
import LayoutWrapper from '@/components/LayoutWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'E-commerce',
  description: 'E-commerce website',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased min-h-screen`}>
        <QueryProvider>
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
            <LayoutWrapper>
              <Navbar />
              <main className="">{children}</main>
              <FooterWrapper />
            </LayoutWrapper>
          </Suspense>
        </QueryProvider>
      </body>
    </html>
  );
}
