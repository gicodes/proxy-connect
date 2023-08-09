/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
      connectionString: "",
      secret: "my_ultra_secure_nextauth_secret"
  },
  publicRuntimeConfig: {
      apiUrl: process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000/api' // development api
          : 'https://rydergp.vercel.app/api' // production api
  }, 

  // // added from mongoose official documentation for webpack error
  // experimental: {
  //   esmExternals: "loose", // <-- add this
  //   serverComponentsExternalPackages: ["mongoose"] // <-- and this
  // },
  // // and the following to enable top-level await support for Webpack
  // webpack: (config) => {
  //   config.experiments = {
  //     topLevelAwait: true
  //   };
  //   return config;
  // }
}

module.exports = nextConfig
