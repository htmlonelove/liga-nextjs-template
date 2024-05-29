/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'standalone',
  reactStrictMode: true,
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    )

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: [{ loader: '@svgr/webpack', options: { icon: true } }]
      },
    )
    fileLoaderRule.exclude = /\.svg$/i

    return config
  },
  images: {
    unoptimized: false,
  }
};

export default nextConfig;
