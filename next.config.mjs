import withPWAInit from "@ducanh2912/next-pwa";

/** @type {import('next').NextConfig} */
const baseConfig = {
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
  async rewrites() {
    return [
      {
        source: "/lti/launch",
        destination: "/api/lti/launch",
      },
    ];
  },

  // 👇 Add this field for development
  allowedDevOrigins: [
    "http://192.168.1.47:3000",
    "http://192.168.1.60:3000",
    "http://localhost:3000",
    "http://moodle.local",
  ],
};

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
});

export default withPWA(baseConfig);
