/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
      connectionString: "",
      // changes made here should also be made in production env
      secret: process.env.MY_SECRET
  },
  publicRuntimeConfig: {
      apiUrl: process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000/api' // development api
          : 'https://rydergp.vercel.app/api' // production api
  }, staticFolder: '/static',
}

module.exports = nextConfig
