/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "agentic-f8a581c4.vercel.app"]
    }
  }
};

export default nextConfig;
