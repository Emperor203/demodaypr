/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Разрешаем Next.js загружать картинки с сервера API
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
      },
      {
        protocol: "https",
        hostname: "i.dummyjson.com",
      },
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
      },
    ],
  },
};

export default nextConfig;
