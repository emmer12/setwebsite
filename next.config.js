/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: ["pub-3626123a908346a7a8be8d9295f44e26.r2.dev"],
  },
};

module.exports = nextConfig;
