/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, options) {
    if (!options.dev) {
      const NextMiniCssExtractPlugin = config.plugins[11];
      config.output.filename = config.output.filename.replace('-[contenthash]', '');
      config.output.chunkFilename = config.output.chunkFilename.replace('.[contenthash]', '');
      config.module.generator.asset.filename = config.module.generator.asset.filename.replace('.[hash:8]', '');

      if (NextMiniCssExtractPlugin) {
        NextMiniCssExtractPlugin.options.filename = NextMiniCssExtractPlugin.options.filename.replace('[contenthash]', '[name]');
        NextMiniCssExtractPlugin.options.chunkFilename = NextMiniCssExtractPlugin.options.chunkFilename.replace('[contenthash]', '[name]');
      }
    }
    return config;
  },
};

export default nextConfig;
