import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import path from 'path';

const pathSrc = path.resolve(__dirname, 'src');

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue'],
        eslintrc: {
          enabled: false,
          filepath: './.eslintrc-auto-import.json'
        },
        dts: path.resolve(pathSrc, 'types', 'auto-imports.d.ts')
      }),
      Components({
        dts: path.resolve(pathSrc, 'types', 'components.d.ts')
      })
    ],
    resolve: {
      alias: {
        '@': pathSrc,
      }
    },
  }
});