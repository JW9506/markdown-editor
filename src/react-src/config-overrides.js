const { override } = require('customize-cra')

function addRendererTarget(config) {
  // config.target = "electron-renderer"
  // console.log(config.module.rules[1])
  // config.module.rules = config.module.rules.filter((rule) => {
  //   return !rule.enforce || rule.enforce !== 'pre'
  // })
  // console.log(config.module.rules)
  // const EXCLUDED_PLUGINS = ['ForkTsCheckerWebpackPlugin']
  // config.plugins = config.plugins.filter(
  //   (plugin) => !EXCLUDED_PLUGINS.includes(plugin.constructor.name)
  // )
  // console.log(config.plugins)
  return config
}

module.exports = override(addRendererTarget)
