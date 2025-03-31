import type { NextConfig } from "next";
// 에러창에 나오는 호스트네임 복사해서 쓰세요<
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com"
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com"
      }
    ]
  }
};

export default nextConfig;

