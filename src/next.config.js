/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['placeholder.com'], // Add any image domains we'll use
    deviceSizes: [320, 640, 768, 1024, 1280],
  },
  // Configure static export
  output: 'export',
  // Disable server-side features since we're doing static export
  experimental: {
    serverActions: false,
  },
  // Handle static file copying
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: {
        loader: 'file-loader',
      },
    });
    return config;
  },
}
