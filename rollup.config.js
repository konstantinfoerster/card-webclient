import path from 'path';
import nodeResolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import replace from '@rollup/plugin-replace';
import html from '@web/rollup-plugin-html'
import { importMetaAssets } from '@web/rollup-plugin-import-meta-assets'
import { terser } from 'rollup-plugin-terser'
import copy from 'rollup-plugin-copy';
import css from "rollup-plugin-css-only";

export default {
  input: 'src/index.html',
  output: {
    entryFileNames: '[hash].js',
    chunkFileNames: '[hash].js',
    assetFileNames: '[hash][extname]',
    format: 'es',
    dir: 'dist',
  },
  preserveEntrySignatures: false,
  plugins: [
    html({
      rootDir: process.cwd(),
      minify: true
    }),
    /** Resolve bare module imports */
    nodeResolve( {
        rootDir: process.cwd(),
      }
    ),
    /** Minify JS */
    terser(),
    css({ output: "bundle.css" }),
    /** Bundle assets references via import.meta.url */
    importMetaAssets(),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify( 'production' ),
      'process.env.SHOELACE_BASE': JSON.stringify('/assets/shoelace')
    }),
    // Copy Shoelace assets to dist/shoelace
    copy({
      targets: [
        {
          src: path.resolve(__dirname, 'node_modules/@shoelace-style/shoelace/dist/assets'),
          dest: path.resolve(__dirname, 'dist/assets/shoelace')
        }
      ]
    }),
    /** Compile JS to a lower language target */
    babel({
      babelHelpers: 'bundled',
      presets: [
        [
          require.resolve('@babel/preset-env'),
          {
            targets: [
              'last 3 Chrome major versions',
              'last 3 Firefox major versions',
              'last 3 Edge major versions',
              'last 3 Safari major versions',
            ],
            modules: false,
            bugfixes: true,
          },
        ],
      ],
      plugins: [
        [
          require.resolve('babel-plugin-template-html-minifier'),
          {
            modules: { lit: ['html', { name: 'css', encapsulation: 'style' }] },
            failOnError: false,
            strictCSS: true,
            htmlMinifier: {
              collapseWhitespace: true,
              conservativeCollapse: true,
              removeComments: true,
              caseSensitive: true,
              minifyCSS: true,
            },
          },
        ],
      ],
    }),
  ],
}
