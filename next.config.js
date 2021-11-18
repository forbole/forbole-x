// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextTranslate = require('next-translate')

module.exports = {
  ...nextTranslate({
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      })
      // eslint-disable-next-line no-param-reassign
      config.experiments = { asyncWebAssembly: true }

      return config
    },
  }),
  poweredByHeader: false,
}
