// import { playwrightLauncher } from '@web/test-runner-playwright';
import rollupReplace from '@rollup/plugin-replace'
import { fromRollup } from '@web/dev-server-rollup'

const replace = fromRollup(rollupReplace)

const filteredLogs = ['Running in dev mode', 'Lit is in dev mode'];

export default /** @type {import("@web/test-runner").TestRunnerConfig} */ ({
  testRunnerHtml: testFramework =>
    `<html>
      <body>
          <script src="/src/app.js" type="module"></script>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>`,

  /** Test files to run */
  files: 'test/**/*.test.js',

  /** Resolve bare module imports */
  nodeResolve: {
    exportConditions: ['browser', 'development'],
  },

  /** Filter out lit dev mode logs */
  filterBrowserLogs(log) {
    for (const arg of log.args) {
      if (typeof arg === 'string' && filteredLogs.some(l => arg.includes(l))) {
        return false
      }
    }
    // return true;
    return false
  },
  plugins: [
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.SHOELACE_BASE': JSON.stringify('/node_modules/@shoelace-style/shoelace/dist'),
    }),
  ],

  /** Amount of browsers to run concurrently */
  // concurrentBrowsers: 2,

  /** Amount of test files per browser to test concurrently */
  // concurrency: 1,

  /** Browsers to run tests on */
  // browsers: [
  //   playwrightLauncher({ product: 'chromium' }),
  //   playwrightLauncher({ product: 'firefox' }),
  //   playwrightLauncher({ product: 'webkit' }),
  // ],

  // See documentation for all available options
});
