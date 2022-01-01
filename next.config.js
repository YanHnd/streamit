module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["localhost:3000"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
