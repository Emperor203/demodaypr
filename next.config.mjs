/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Разрешаем Next.js загружать картинки с сервера API
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
      },
    ],
  },
};

export default nextConfig;