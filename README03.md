## 25 modules その 1

### モジュールとプラグインの違い

Modules<br>
Nuxt 起動時に呼び出される<br>
ビルド時に読み込んだり<br>
ビルドの動きを変えたい場合<br>

Plugins<br>
\$root や context から呼び出して使う<br>

### 用語集

全部 部品<br>

プラグイン・・ソフトウェアに機能を追加する小さなプログラム(アドインともいう)<br>

モジュール・・機能単位、交換可能な構成部分(axios, pwa ・・・)<br>

ライブラリ・・ある特定の機能をもったプログラムを、他のプログラムから利用できるように部品化し、1 つのファイルにまとめたもの。<br>

コンポーネント・・何らかの機能を持ったプログラムの部品<br>

### Nuxt 用のモジュール

https://modules.nuxtjs.org <br>

https://github.com/nuxt-community/awesome-nuxt Official など<br>

### Modules ファイルを作成

`例`<br>
`modules/example.js`を作成<br>

```js:example.js
export default function () {
  console.log('moduleのテスト')

  // Hookでどのタイミングで実施するか指定もできる
  // このthisはModuleContainerと呼ばれるオブジェクト
  this.nuxt.hook('ready', async (nuxt) => {
    console.log('Nuxt is ready')
  })
}
```

### Modules コンフィグファイルに追記

`例`<br>
`nuxt.config.js`に追記<br>

```js:nuxt.config.js
// 開発限定の拡張機能
buildModules: [
  '@/modules/example'
],

// 本番環境でも実行
modules: []
```

`$ npm run dev`実行時ターミナル画面で確認できる<br>

### ハンズオン

- `nuxt-test/modules`ディテクトリを作成<br>

* `nuxt-test/modules/example.js`ファイルを作成<br>

```js:example.js
export default function () {
  // eslint-disable-next-line no-console
  console.log('moduleのテスト')

  this.nuxt.hook('ready', async (nuxt) => {
    // eslint-disable-next-line no-console
    console.log('Nuxt is ready')
  })
}
```

- `nuxt-test/nuxt.config.js`を編集<br>

```js:nuxt.config.js
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  router: {
    middleware: 'middlewareCheck',
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-test',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/dayjs'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  // components: {
  //   dirs: [
  //     '~/components',
  //     '~/components/base',
  //   ]
  // },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // 追記
    '@/modules/example',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
```

- `$ npm run dev`で再起動<br>

```:result
groovy@groovy-no-MacBook-Pro nuxt-test % npm run dev

> nuxt-test@1.0.0 dev /Users/groovy/Desktop/udemy_aoki_nuxt_js/nuxt2-js-lesson/section02/nuxt-test
> nuxt

moduleのテスト                                                                                                                                                           16:10:15
Nuxt is ready                                                                                                                                                            16:10:16

   ╭───────────────────────────────────────╮
   │                                       │
   │   Nuxt @ v2.15.8                      │
   │                                       │
   │   ▸ Environment: development          │
   │   ▸ Rendering:   client-side          │
   │   ▸ Target:      server               │
   │                                       │
   │   Listening: http://localhost:3000/   │
   │                                       │
   ╰───────────────────────────────────────╯
```