/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export", // Added for static export (required for Capacitor)
  images: {
    unoptimized: true, // keep this for remote images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    serverActions: true, // optional if you use server actions
  },
};

export default nextConfig;
