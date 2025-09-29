import NextBundleAnalyzer from '@next/bundle-analyzer'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  images: {
    remotePatterns: [
      new URL('https://rickandmortyapi.com/api/**'),
      // new URL('https://via.placeholder.com/**'),
      new URL('http://localhost:3001/**'),
    ],
  },
  async headers() {
    return [
      {
        source: '/api/ws',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ]
  },
}
const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

// module.exports = withBundleAnalyzer(nextConfig)

export default withBundleAnalyzer(nextConfig, { devBundleServerPackages: false })
