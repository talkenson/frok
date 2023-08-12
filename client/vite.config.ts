import { defineConfig, Plugin, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { minify as minifyHtml } from 'html-minifier'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'
import { DateTime } from 'luxon'

const minifyHtmlPlugin = (): Plugin => ({
  name: 'frok:minify-html',
  transformIndexHtml: source => {
    return minifyHtml(source, {
      html5: true,
      collapseWhitespace: true,
      minifyJS: true,
      minifyCSS: true,
      collapseBooleanAttributes: true,
      keepClosingSlash: false,
      removeComments: true,
      removeAttributeQuotes: true,
    })
  },
})

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    plugins: [
      tsconfigPaths(),
      svgr(),
      {
        name: 'vite-current-line',
        transform(code, id) {
          const LINE_MARKER = '$line'

          return code
            .split('\n')
            .map((line, i) => {
              if (line.includes(LINE_MARKER) && !line.includes('declare')) {
                const currentLineId =
                  id.split('/').slice(-3).join('/') + ':' + (i + 1)
                return line.replace(LINE_MARKER, `'${currentLineId}'`)
              }

              return line
            })
            .join('\n')
        },
      },
      {
        name: 'vite-build-info',
        transform(code, id) {
          const BT_MARKER = '$buildTime'
          const buildTime = DateTime.now().toFormat('HH:mm:ss dd.MM.yyyy')

          const MODE_MARKER = '$buildMode'
          const buildMode = mode

          return code
            .split('\n')
            .map((line, i) => {
              if (line.includes(BT_MARKER) && !line.includes('declare')) {
                return line.replace(BT_MARKER, `'${buildTime}'`)
              }
              return line
            })
            .map((line, i) => {
              if (line.includes(MODE_MARKER) && !line.includes('declare')) {
                return line.replace(MODE_MARKER, `'${buildMode}'`)
              }
              return line
            })
            .join('\n')
        },
      },
      react(),
      command === 'build' && minifyHtmlPlugin(),
    ],
    build: {
      outDir: './dist',
      rollupOptions: {
        output: {
          manualChunks: {
            ['react-chunk.service']: ['react', 'react-router-dom', 'react-dom'],
            ['zustand-chunk.service']: ['zustand', 'zustand/middleware'],
            ['react-vendor.service']: ['luxon', '@reactuses/core', 'nanoid'],
          },
        },
      },
    },
    envPrefix: 'FROK_',
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: 'https://frok.x.talkiiing.ru',
          changeOrigin: true,
          //secure: false,
          cookieDomainRewrite: {
            '*': '',
          },
          headers: {
            Origin: 'https://frok.x.talkiiing.ru',
            'X-Dev': 'true',
          },
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
