/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@tatx/ui', '@tatx/utils', '@tatx/types'],
};
module.exports = nextConfig;
