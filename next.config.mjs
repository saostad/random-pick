// next.config.mjs
import Icons from "unplugin-icons/webpack";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.plugins.push(
      Icons({
        compiler: "jsx",
        jsx: "react",
        autoInstall: true,
      })
    );

    return config;
  },
};

export default nextConfig;
