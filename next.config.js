
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

   /** @type {import('next').NextConfig} */
   const nextConfig = {
     reactStrictMode: true,
     webpack(config) {
       config.plugins.push(new MiniCssExtractPlugin());
       return config;
     },
   };

   module.exports = nextConfig;
