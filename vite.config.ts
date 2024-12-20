import { type ConfigEnv, type UserConfig, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import path from 'path';

const pathSrc = path.resolve(__dirname, 'src');

// https://vite.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  return {
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue'],
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({})
        ],
        eslintrc: {
          enabled: false,
          filepath: './.eslintrc-auto-import.json'
        },
        vueTemplate: true,
        dts: path.resolve(pathSrc, 'types', 'auto-imports.d.ts')
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            enabledCollections: ['ep']
          })
        ],
        dts: path.resolve(pathSrc, 'types', 'components.d.ts')
      }),
      Icons({
        autoInstall: true
      })
    ],
    resolve: {
      alias: {
        '@': pathSrc,
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/variables.scss" as *;`
        }
      }
    }
  }
});