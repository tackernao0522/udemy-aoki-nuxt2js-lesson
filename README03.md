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

## 26 modules その 2

### Modules hook の種類

nuxt.hook('ready')・・動作準備完了時<br>
nuxt.hook('error')・・フック呼出時のエラー<br>
nuxt.hook('close')・・インスタンス正常終了の手前<br>
nuxt.hook('listen')・・リッスンを始めた時<br>
nuxt.hook('modules:done')・・モジュール読込後<br>
nuxt.hook('render.before)・・レンダー前<br>
nuxt.hook('build:compile)・・コンパイラ前<br>
nuxt.hook('generate:before)・・ページ生成前<br>

参考: https://nuxtjs.org/ja/docs/directory-structure/modules <br>

- `nuxt-test/modules/example.js`を編集<br>

```js:example.js
export default function () {
  // eslint-disable-next-line no-console
  console.log('moduleのテスト')

  this.nuxt.hook('ready', async (nuxt) => {
    // eslint-disable-next-line no-console
    console.log(this)
    // eslint-disable-next-line no-console
    console.log('Nuxt is ready')
  })
}
```

- `$ npm run dev`再起動するとターミナルに出力される<br>

## 27 assets

### assets（資産）画像

assets/images<br>
&nbsp;　&nbsp;　&nbsp;　　/css<br>
&nbsp;　&nbsp;　&nbsp;　　/fonts<br>

assets/images 配下に画像配置<br>

`<img src="~assets/images/xx.jpg">`で表示<br>

### ハンズオン

- `nuxt-test/assets`ディレクトリを作成<br>

* `nuxt-test/assets/images`ディレクトリを作成して画像を配置<br>

- `nuxt-test/pages/about.vue`を編集<br>

```vue:about.vue
<template>
  <div>
    about
    <br />
    {{ now }}
    <br />
    // 追記
    <img src="~/assets/images/nuxt-course.jpg" width="300px" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      now: null,
    }
  },
  mounted() {
    this.now = this.$dayjs().format('YYYY-MM-DD HH:mm:ss')
  },
}
</script>

<style></style>
```

### assets（資産）css

`例`<br>
`assets/css/styles.css`を作成<br>

```css:styles.css
.red-b {
  border: 1px solid red;
}
```

`nuxt.config.js`内の css に追記<br>

```js:nuxt.config.js
css: ['@/assets/css/style.css']
```

コンポーネント内で `<div class="red-b">assets/cssのテスト</div>`<br>

### ハンズオン

- `nuxt-test/assets/css`ディレクトリを作成<br>

- `nuxt-test/assets/css/style.css`ファイルをを作成<br>

```css:style.css
.red-b {
  border: 1px solid red;
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
  // 追記
  css: ['@/assets/css/style.css'],

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

- `nuxt-test/pages/about.vue`を編集<br>

```vue:about.vue
<template>
  <div>
    about
    <br />
    {{ now }}
    <br />
    <img src="~/assets/images/nuxt-course.jpg" width="300px" />
    <br />
    // 追記
    <div class="red-b">asstes/cssのテスト</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      now: null,
    }
  },
  mounted() {
    this.now = this.$dayjs().format('YYYY-MM-DD HH:mm:ss')
  },
}
</script>

<style></style>
```

参考: https://nuxtjs.org/ja/docs/directory-structure/assets <br>
