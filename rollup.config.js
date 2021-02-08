import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import visualizer from 'rollup-plugin-visualizer';
import url from 'rollup-plugin-url';
import json from '@rollup/plugin-json';
import pkg from './package.json';
import typescript from 'rollup-plugin-typescript2';

process.env.BABEL_ENV = 'production';

export default {
  input: './src/external.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'esm',
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    json(),
    external(),
    postcss(),
    babel({
      plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
      ],
      exclude: 'node_modules/**',
    }),
    commonjs(),
    image(),
    visualizer(),
    url(),
    typescript({ typescript: require('typescript') })
  ],
};
