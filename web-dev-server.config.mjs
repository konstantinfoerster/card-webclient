import rollupReplace from '@rollup/plugin-replace'
import { fromRollup } from '@web/dev-server-rollup'

const replace = fromRollup(rollupReplace)

export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
  debug: false,
  open: '/',
  watch: true,
  appIndex: 'src/index.html',
  plugins: [
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) || JSON.stringify('development'),
      'process.env.SHOELACE_BASE': JSON.stringify('/node_modules/@shoelace-style/shoelace/dist'),
    })
  ],
  nodeResolve: {
    exportConditions: ['browser', 'development'],
  },
  middleware: [
    function rewriteIndex(context, next) {
      if (context.app.env === 'production') {
        return next()
      }

      if (context.url === '/' || context.url === '/index.html') {
        context.url = '/src/index.html'
      }
      return next()
    },
  ],
})
