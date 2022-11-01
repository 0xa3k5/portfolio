module.exports = {
  env: {
    pagePassword: process.env.PAGE_PASSWORD,
  },
  reactStrictMode: true,
  poweredByHeader: true,
  output: "standalone",
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    return config;
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imagedelivery.net",
      },
      {
        protocol: "https",
        hostname: "cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "dropbox.com",
      },
      {
        protocol: "https",
        hostname: "www.dropbox.com",
      },
    ],
  },
};
