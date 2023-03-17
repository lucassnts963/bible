module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        require.resolve('babel-plugin-module-resolver'),
        {
          alias: {
            '@/components': './src/components',
            '@/routes': './src/routes',
            '@/screens': './src/screens',
            '@/services': './src/services',
            '@/assets': './src/assets',
            '@/hooks': './src/hooks',
            '@/contexts': './src/contexts',
          },
        },
      ],
      'inline-dotenv',
    ],
  }
}
