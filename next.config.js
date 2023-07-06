/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['uploadthing.com', 'lh3.googleusercontent.com', 'scontent.flos5-1.fna.fbcdn.net', 'pbs.twimg.com', 'platform-lookaside.fbsbx.com'],
  },
  experimental: {
    appDir: true
  }
}

module.exports = nextConfig
