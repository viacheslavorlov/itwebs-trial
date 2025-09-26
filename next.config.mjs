import NextBundleAnalyzer from '@next/bundle-analyzer'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  images: {
    remotePatterns: [
      new URL('https://fakeapi.net/images/**'),
      new URL('https://via.placeholder.com/**'),
      new URL('http://localhost:3001/**'),
    ],
  },
}
const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

// module.exports = withBundleAnalyzer(nextConfig)

export default withBundleAnalyzer(nextConfig, { devBundleServerPackages: false })
