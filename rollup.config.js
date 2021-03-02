import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import visualizer from 'rollup-plugin-visualizer';
import url from 'rollup-plugin-url';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const extensions = ['.js', '.jsx'];

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
    terser(),
  ],
};
