/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
      connectionString: "mongodb://localhost/next-js-registration-login-example",
      secret: 'THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING'
  },
  publicRuntimeConfig: {
      apiUrl: process.env.NODE_ENV === 'development'
          ? 'http://localhost:5000/api' // development api
          : 'http://localhost:5000/api' // production api
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


// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig
