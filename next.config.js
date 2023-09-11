/** @type {import('next').NextConfig} */
const nextConfig = {
  // Strict mode penalizes performance by running reducers twice,
  // where we have heavy game calculation logic
  reactStrictMode: false,
}

module.exports = nextConfig
