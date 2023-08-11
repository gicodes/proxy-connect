/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
      connectionString: "",
      // changes made here should also be made in production env
      secret: "my_ultra_secure_nextauth_secret"
  },
  publicRuntimeConfig: {
      apiUrl: process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000/api' // development api
          : 'https://rydergp.vercel.app/api' // production api
  }, 
}

module.exports = nextConfig
