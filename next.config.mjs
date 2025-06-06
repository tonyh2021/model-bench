/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Static export
  images: {
    unoptimized: true, // Disable image optimization for next export
  },
  trailingSlash: true, // All paths end with /, suitable for static hosting
  env: {
    // Optional: Build information (recommended to use scripts or external injection for more accuracy)
    NEXT_PUBLIC_BUILD_DATE: new Date().toISOString().split("T")[0],
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString().split("T")[1].substring(0, 8),
    NEXT_PUBLIC_BUILD_TIMESTAMP: new Date().toISOString().replace("T", " ").substring(0, 19),
  },
};

export default nextConfig;
