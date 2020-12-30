import TerserPlugin from 'terser-webpack-plugin';
import { BLOG_TITLE, BASE_URL } from './libs/const';

const nodeExternals = require('webpack-node-externals');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

const config = require('./.contentful.json');
const isDev = process.env.NODE_ENV === 'development';
const katexCss = [
  'accent',
  'accent-body',
  'accent-bodyspan',
  'accent-vecspan',
  'amsrm',
  'arraycolsep',
  'base',
  'baseline-fix',
  'col-align-c',
  'col-align-l',
  'col-align-r',
  'delim-size1span',
  'delim-size4span',
  'delimsizing',
  'enspace',
  'fix',
  'fontsize-ensurer',
  'frac-line',
  'frac-line:after',
  'frac-line:before',
  'inner',
  'katex',
  'katex-display',
  'katex-html',
  'katex-logo',
  'katex-mathml',
  'large-op',
  'llap',
  'mainit',
  'mathbb',
  'mathbf',
  'mathcal',
  'mathfrak',
  'mathit',
  'mathscr',
  'mathsf',
  'mathtt',
  'mbin',
  'mclose',
  'mediumspace',
  'mfrac',
  'mfracspanspan',
  'minner',
  'mop',
  'mopen',
  'mord',
  'mpunct',
  'mrel',
  'mspace',
  'msupsub',
  'mtable',
  'mult',
  'negativethinspace',
  'nulldelimiter',
  'op-limits',
  'op-symbol',
  'overline',
  'overline-line',
  'overline-line:after',
  'overline-line:before',
  'qquad',
  'quad',
  'reset-scriptscriptstyle',
  'reset-scriptstyle',
  'reset-size1',
  'reset-size10',
  'reset-size2',
  'reset-size3',
  'reset-size4',
  'reset-size5',
  'reset-size6',
  'reset-size7',
  'reset-size8',
  'reset-size9',
  'reset-textstyle',
  'rlap',
  'root',
  'rule',
  'scriptscriptstyle',
  'scriptstyle',
  'size1',
  'size10',
  'size2',
  'size3',
  'size4',
  'size5',
  'size6',
  'size7',
  'size8',
  'size9',
  'sizing',
  'small-op',
  'sqrt',
  'sqrt-line',
  'sqrt-line:after',
  'sqrt-line:before',
  'sqrt-sign',
  'strut',
  'style-wrap',
  't',
  'textstyle',
  'thickspace',
  'thinspace',
  'underline',
  'underline-line',
  'underline-line:after',
  'underline-line:before',
  'vertical-separator',
  'vlist',
  'vlistspan',
  'vlistspanspan',
];
export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'ja',
    },
    titleTemplate: '%s' + BLOG_TITLE,
    title: ' ',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'description',
        content:
          'sa2taka/t0p_lightの独断と偏見が混じった、音声作品紹介サイトです',
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:title',
        property: 'og:title',
        content: BLOG_TITLE,
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'sa2takaの音声作品ブログ',
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: BASE_URL,
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: BASE_URL + '/logo-for-facebook.png',
      },
      {
        hid: 'twitter:card',
        property: 'twitter:card',
        content: 'summary',
      },
      {
        hid: 'twitter:image',
        property: 'twitter:image',
        content: BASE_URL + '/logo-for-twitter.png',
      },
      {
        hid: 'twitter:site',
        property: 'twitter:site',
        content: '@t0p_l1ght',
      },
      { property: 'og:site_name', content: BLOG_TITLE },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['@/assets/css/layout.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/vuetify', '@/plugins/katex'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxt/typescript-build',
    '@nuxtjs/google-analytics',
  ],
  /*
   ** Nuxt.js modules
   */
  vuetify: {},
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    ['@nuxtjs/component-cache', { maxAge: 1000 * 60 * 60 * 24 * 3 }],
    ['cookie-universal-nuxt', { parseJSON: false }],
    'nuxt-purgecss',
    ['@nuxtjs/sitemap'],
  ],
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^vuetify/],
    plugins: [new VuetifyLoaderPlugin()],
    extractCSS: true,
    useForkTsChecker: true,
    loaders: {
      vueStyle: {
        manualInject: true,
      },
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: false,
        }),
      ],
    },

    extend(config: any, _ctx: any) {
      if (process.server) {
        config.externals = [
          nodeExternals({
            allowlist: [/^vuetify/],
          }),
        ];
      }
      config.node = {
        fs: 'empty',
      };
    },
  },
  env: {
    CTF_CDA_ACCESS_TOKEN: config.CTF_CDA_ACCESS_TOKEN,
    CTF_CTF_MAIN_AUTHOR_ID: config.CTF_PERSON_ID,
    CTF_SPACE_ID: config.CTF_SPACE_ID,
  },
  manifest: {
    name: "園児ニアの庭園 | sa2taka's blog",
    lang: 'ja',
    short_name: "sa2taka's blog",
    description: 'sa2taka blog',
    theme_color: '#009688',
    background_color: '#2a2a2a',
    start_url: '/',
    icons: [
      {
        src: '/icons/icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
      },
      {
        src: '/icons/icon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: '/icons/icon-128x128.png',
        sizes: '128x128',
        type: 'image/png',
      },
      {
        src: '/icons/icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        src: '/icons/icon-152x152.png',
        sizes: '152x152',
        type: 'image/png',
      },
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    display: 'standalone',
  },
  workbox: {
    swDest: 'static/sw.js',
    runtimeCaching: [
      {
        urlPattern: `^${BASE_URL}$`,
        handler: 'staleWhileRevalidate',
        method: 'GET',
      },
      {
        urlPattern: `^${BASE_URL}post/.*`,
        handler: 'staleWhileRevalidate',
        method: 'GET',
      },
      // {
      //   urlPattern:
      //     '^https?://images.ctfassets.net/xw0ljpdch9v4/.*.(gif|png|jpg|webp)$',
      //   handler: 'cacheFirst',
      //   method: 'GET',
      // },
      // {
      //   urlPattern: '^https?://i.imgur.com/.*.(gif|png|jpg|webp)',
      //   handler: 'cacheFirst',
      //   method: 'GET',
      // },
      // {
      //   urlPattern: '^https://fonts.googleapis.com/.*',
      //   handler: 'cacheFirst',
      //   method: 'GET',
      // },
      // {
      //   utlPatter: '^https://cdnjs.cloudflare.com/.*',
      //   handler: 'cacheFirst',
      //   method: 'GET',
      // },
    ],
    dev: false,
  },
  icon: false,
  typescript: {
    ignoreNotFoundWarnings: true,
    typeCheck: { memoryLimit: 4096 },
  },
  googleAnalytics: {
    id: 'UA-152417689-1',
  },
  vue: {
    config: {
      devtools: isDev,
    },
  },
  purgeCSS: {
    enabled: true,
    paths: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'plugins/**/*.ts',
      'libs/**/*.ts',
      'node_modules/vuetify/dist/vuetify.js',
    ],
    styleExtensions: ['.css'],
    whitelist: ['body', 'html', 'nuxt-progress'].concat(katexCss),
    whitelistPatternsChildren: [/^v-/, /^hljs/, /fab/, /^fa-/, /^katex-/],
    extractors: [
      {
        extractor: (content: any) => content.match(/[A-z0-9-:\\/]+/g) || [],
        extensions: ['html', 'vue', 'js'],
      },
    ],
  },
  // sitemap: {
  //   path: '/sitemap.xml',
  //   hostname: BASE_URL,
  //   exclude: ['/category'],
  //   async routes() {
  //     const posts: any = [];

  //     // const posts = await client.getEntries({
  //     //   content_type: 'blogPost',
  //     //   'fields.public': true,
  //     // });
  //     return posts.items.map((item: any) => `post/${item.fields.slug}`);
  //   },
  // },
};
