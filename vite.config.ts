import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
import { resolve } from 'path'
console.log(styleImport)

// https://vitejs.dev/config/
export default defineConfig({
	base: './',
	build: {
		outDir: 'dict'
	},
	/* TODO:该部分暂未生效 */
	css: {
		preprocessorOptions: {
			less: {
				javascriptEnabled: true,
				// 覆盖样式变量
				modifyVars: {
					'@grid-item-content-padding': '0px',
					'grid-item-content-background-color': 'red'
				}
			}
		}
	},
	resolve: {
		alias: {
			'@src': resolve(__dirname, './src'),
			'@assets': resolve(__dirname, './src/assets'),
			'@components': resolve(__dirname, './src/components'),
			'@uitl': resolve(__dirname, './src/uitl')
		}
	},
	plugins: [
		vue(),
		styleImport({
			libs: [
				{
					libraryName: 'vant',
					esModule: true,
					resolveStyle: (name) => `vant/es/${name}/style`
				}
			]
		})
	],
	server: {
		host: '0.0.0.0',
		// port: 8000,
		proxy: {
			'/api': {
				target: 'http://117.50.187.26:8700',
				changeOrigin: true,
				rewrite: (path: string) => path.replace(/^\/api/, '')
			}
		}
	}
})
