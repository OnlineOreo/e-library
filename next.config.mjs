// next.config.mjs
import withPWAInit from "@ducanh2912/next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

const withPWA = withPWAInit({
  dest: "public", // required
  register: true,
  skipWaiting: true,
});

export default withPWA(nextConfig);
