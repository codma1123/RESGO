import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
	vue(),
	vuetify({ autoImport: true }),
  ],

  server: {
	proxy: {
		'/api': {
			target: 'https://a993e630-bbb4-4e5e-87c9-6a0f187f5c15.api.kr-central-1.kakaoi.io/ai/vision/c969a42053464f7c90b0e8e5a0d00499',
			changeOrigin: true,
			rewrite: path => path.replace(/^\api/, ''),
			secure: false,
			ws: true

		}
	}
  }
})
