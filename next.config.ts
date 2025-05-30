import { NextConfig } from 'next';

const config: NextConfig = {
  // i18n: {
  //   locales: ['en', 'es', 'fr'],
  //   defaultLocale: 'en',
  //   localeDetection: true,
  // },
  images: {
    domains: ['images.unsplash.com', 'plus.unsplash.com'],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
  env: {
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    NEXT_PUBLIC_API_BASE_URL:
      process.env.NODE_ENV === 'production'
        ? 'https://api.ipakyoliurgench.uz/api/v1'
        : 'http://localhost:7000/api/v1',
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination:
          process.env.NODE_ENV === 'production'
            ? 'https://api.ipakyoliurgench.uz/api/v1/:path*'
            : 'http://localhost:7000/api/v1/:path*',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value:
              process.env.NODE_ENV === 'production'
                ? 'https://ipakyoliurgench.uz'
                : 'http://localhost:3000',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,DELETE,PATCH,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
          },
        ],
      },
    ];
  },
};

export default config;
