module.exports = {
  reactStrictMode: true,
   webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
    return config;
  },
  images: {
    dangerouslyAllowSVG: true,
    domains: ['s3.us-west-2.amazonaws.com', 'www.notion.so']
  }
}
