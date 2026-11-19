import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: { remotePatterns: [{ protocol: "images.unsplash.com", hostname: "images.unsplash.com" }, { protocol: "https", hostname: "media-rockstargames-com.akamaized.net" }] }
};
export default nextConfig;