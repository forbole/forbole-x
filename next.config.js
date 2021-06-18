// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextTranslate = require('next-translate')

module.exports = nextTranslate({
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    config.module.rules.push({
      test: /\.(eot|gif|md)$/,
      loaders: ['style-loader', 'css-loader', 'less-loader'],
    })

    return config
  },
})
