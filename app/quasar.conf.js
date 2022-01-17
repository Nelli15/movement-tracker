/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js

/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const { configure } = require('quasar/wrappers');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

module.exports = configure(function (ctx) {
  return {
    // https://quasar.dev/quasar-cli/supporting-ts
    supportTS: {
      tsCheckerConfig: {
        // eslint: {
        //   enabled: true,
        //   files: './src/**/*.{ts,tsx,js,jsx,vue}',
        // },
      }
    },

    // https://quasar.dev/quasar-cli/prefetch-feature
    preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://quasar.dev/quasar-cli/boot-files
    boot: [
      'cypress_init'
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: [
      'app.sass'
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v5',
      // 'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
    ],

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      devtool: 'source-map',
      scopeHoisting: true,
      vueRouterMode: 'history', // available values: 'hash', 'history'

      // transpile: false,
      // publicPath: '/',

      // Add dependencies for transpiling with Babel (Array of string/regex)
      // (from node_modules, which are by default not transpiled).
      // Applies only if "transpile" is set to true.
      // transpileDependencies: [],

      // rtl: true, // https://quasar.dev/options/rtl-support
      // preloadChunks: true,
      // showProgress: false,
      gzip: true,
      // analyze: true,
      minify: true,
      // Options below are automatically set depending on the env, set them if you want to override
      extractCSS: true,

      // https://quasar.dev/quasar-cli/handling-webpack
      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
      extendWebpack (cfg) {
        // cfg.IgnorePlugin(/^\.\/locale$/, /moment$/)
        // cfg.module.rules.push({
        //   enforce: 'pre',
        //   test: /\.(js|vue)$/,
        //   loader: 'eslint-loader',
        //   exclude: '/src/store/workers/',
        //   options: {
        //     formatter: require('eslint').CLIEngine.getFormatter('stylish')
        //   }
        // })
        // cfg.plugins.push(
        // new WorkerPlugin()
        // new webpack.ProvidePlugin({
        //   Worker: 'worker-plugin'
        // })
        // )
        // cfg.plugins.push(new BundleAnalyzerPlugin())
        // cfg.plugins.push(
        //   new DeadCodePlugin({
        //     patterns: [
        //       'src/**/*.(js|jsx|css)',
        //     ],
        //     exclude: [
        //       '**/*.(stories|spec).(js|jsx)',
        //     ],
        //   })
        // )
        // cfg.plugins.push(
        //   new HtmlWebpackPlugin({
        //     filename: 'index.html',
        //     preconnect: [
        //       'https://www.googletagmanager.com',
        //       'https://www.googleapis.com',
        //     ]
        //   })
        // )
        // cfg.plugins.push(new HtmlWebpackPreconnectPlugin())
        // cfg.plugins.push(new BundleAnalyzerPlugin())
      },
      chainWebpack (chain, { /*isServer, isClient*/ }) {
        chain.output.globalObject('self')
      }
    },

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      server: {
        type: 'http'
      },
      port: 5000,
      open: true // opens browser window automatically
    },

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      config: {
        dark: 'auto',
        brand: {
          // primary: '#2f8cde',
          primary: '#093153',
          secondary: '#178399',
          tertiary: '#9c27b0',
          accent: '#b9e7f0',
          positive: '#21BA45',
          negative: '#C10015',
          // info: '#06a5c4',
          info: '#069cba',
          warning: '#f29538',
          white: '#000',
          black: '#FFF',
          dark: '#263238'
        },
        loading: {
          delay: 0 // ms
        },
        notify: {
          timeout: 1000,
          textColor: 'white',
          actions: [{ icon: 'close', color: 'white' }]
        },
        loadingBar: {}
      },

      // iconSet: 'material-icons', // Quasar icon set
      // lang: 'en-US', // Quasar language pack

      // For special cases outside of where the auto-import strategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      // components: [],
      // directives: [],
      importStrategy: 'auto',

      // Quasar plugins
      plugins: ['Notify', 'Loading', 'LocalStorage', 'LoadingBar']
    },

    // animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    animations: ['jackInTheBox', 'fadeIn', 'fadeOut'],

    // https://quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      pwa: false,

      // manualStoreHydration: true,
      // manualPostHydrationTrigger: true,

      prodPort: 3000, // The default port that the production server should use
                      // (gets superseded if process.env.PORT is specified at runtime)

      maxAge: 1000 * 60 * 60 * 24 * 30,
        // Tell browser when a file from the server should expire from cache (in ms)

      chainWebpackWebserver (/* chain */) {
        //
      },

      middlewares: [
        ctx.prod ? 'compression' : '',
        'render' // keep this as last one
      ]
    },

    // https://quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      workboxPluginMode: 'InjectManifest', // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {}, // only for GenerateSW

      // for the custom service worker ONLY (/src-pwa/custom-service-worker.[js|ts])
      // if using workbox in InjectManifest mode
      chainWebpackCustomSW (/* chain */) {
        //
      },
      workboxOptions: {
        // Do not precache images
        exclude: [/\.(?:png|jpg|jpeg|svg)$/],

        // Define runtime caching rules.
        // runtimeCaching: [
        //   {
        //     // Match any request that ends with .png, .jpg, .jpeg or .svg.
        //     urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

        //     // Apply a cache-first strategy.
        //     handler: 'CacheFirst',

        //     options: {
        //       // Use a custom cache name.
        //       cacheName: 'images',

        //       // Only cache 10 images.
        //       expiration: {
        //         maxEntries: 10
        //       }
        //     }
        //   }
        // ],
        dontCacheBustURLsMatching: /.*\.(js|css)/,
        // exclude: [/^public/],
        maximumFileSizeToCacheInBytes: 3000000
        // skipWaiting: true,
        // clientsClaim: true,
        // cleanupOutdatedCaches: true
      }, // only for GeneratedGW mode (default)

      manifest: {
        name: 'Movement Tracker',
        short_name: 'Movement Tracker',
        description:
          'Discipleship tree tracking software for Christian ministries.',
        display: 'standalone',
        orientation: 'any',
        background_color: '#093153',
        theme_color: '#c54210',
        start_url: '/home',
        icons: [
          {
            src: 'icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: 'icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      bundler: 'packager', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: 'movement-tracker'
      },

      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
      chainWebpack (/* chain */) {
        // do something with the Electron main process Webpack cfg
        // extendWebpackMain also available besides this chainWebpackMain
      },

      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
      chainWebpackPreload (/* chain */) {
        // do something with the Electron main process Webpack cfg
        // extendWebpackPreload also available besides this chainWebpackPreload
      },
    }
  }
});
