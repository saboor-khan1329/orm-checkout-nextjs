/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "orm.test",
        port: "8000",
        pathname: "/storage/**",
      },
    ],

    dangerouslyAllowLocalIP: true,
  },
};

export default nextConfig;
