import NextBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
};
const withBundleAnalyzer =  NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})
 
// module.exports = withBundleAnalyzer(nextConfig)

export default withBundleAnalyzer(nextConfig, { devBundleServerPackages: false });
