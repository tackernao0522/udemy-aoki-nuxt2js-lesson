## 18 ライフサイクル(asyncData, fetch(引数ありなし))

### ライフサイクル 簡易表

| No. | 特徴                         | クライアント<br>(ブラウザ)   | サーバー                     |
| --- | ---------------------------- | ---------------------------- | ---------------------------- |
| 1   |                              |                              | ServerMiddleware             |
| 2   | Vuex ストア初期化            |                              | nuxtServerInit               |
| 3   | 認証関連<br>ルートパラメータ | RouteMiddleware              | RouteMiddleware              |
| 4   | ページのバリデーション       | validate                     | validate                     |
| 5   |                              | asyncData / featch(引数あり) | asyncData / featch(引数あり) |
| 6   | VueJs2 はここから            | beforeCreate                 | beforeCreate                 |
| 7   | ここから this が使える       | created                      | created                      |
| 8   |                              | fetch                        | fetch                        |
| 9   |                              | beforeMount                  |                              |
| 10  | DOM 生成後                   | mountd                       |                              |

### 各フックの呼び出しタイミング

- 参考: https://nuxtjs.org/ja/docs/concepts/nuxt-lifecycle <br>

`pages/index.vue`で実験<br>

```vue:index.vue
asyncData() { console.log('asyncData') }, created() { console.log('created') },
fetch() { // 引数なし console.log('fetch') }, fetch( context ) { // 引数あり
console.log( context.route ) }
```

- `pages/index.vue`ファイルを編集<br>

```vue:index.vue
<template>
  <div>
    index
    <br />
    <NuxtLink to="/about">about</NuxtLink>
    <NuxtLogo />
    <BaseHeader />
  </div>
</template>

<script>
export default {
  asyncData() {
    // eslint-disable-next-line no-console
    console.log('asyncData')
  },
  fetch(context) {
    // eslint-disable-next-line no-console
    console.log('fetch')
    // eslint-disable-next-line no-console
    console.log(context.route.name)
  },
  created() {
    // eslint-disable-next-line no-console
    console.log('created')
  },
}
</script>
```

## 19 context(文脈)

- 参考: https://nuxtjs.org/_nuxt/image/c12c33.svg <br>

Nuxt で使える様々な情報を内包するオブジェクト<br>
`asyncData`, `fetch`, `plugins`, `middlewares`, `modules`, `store/nuxtServerInit`, など Nuxt のライフサイクル内で使用可能(Vuex の action で使う context とは別物)<br>

```
asyncData(context) {
  console.log(context.route)
}
// JS ES6 分割代入
asyncData({ route, isDev }) {
  console.log(route.name)
  console.log(isDev)
}
```

### Context でよく使うキー

context.route・・ルーティング情報<br>
context.store・・Vuex store 内のデータ参照<br>
context.error・・API リクエスト失敗時の対応<br>
context.redirect・・API リクエスト失敗時の対応<br>
context.query・・クエリパラメータ<br>
context.isDev・・開発中かどうか<br>
context.req・・get/post の判定<br>
context.app・・ルートの Vue インスタンス<br>
context.\$axios・・axios<br>

プラグイン(plugins)の注入も可能<br>

- `pages/index.vue`を編集<br>

```vue:index.vue
<template>
  <div>
    index
    <br />
    <NuxtLink to="/about">about</NuxtLink>
    <NuxtLogo />
    <BaseHeader />
  </div>
</template>

<script>
export default {
  asyncData({ route, isDev, app, $axios }) {
    // eslint-disable-next-line no-console
    console.log('asyncData')
    // eslint-disable-next-line no-console
    console.log('route.name:', route.name)
    // eslint-disable-next-line no-console
    console.log('isDev:', isDev)
    // eslint-disable-next-line no-console
    console.log('app:', app)
    // eslint-disable-next-line no-console
    console.log('app.$axios:', app.$axios)
    // eslint-disable-next-line no-console
    console.log('$axios:', $axios)
    // eslint-disable-next-line no-console
    console.log('==================')
  },
  fetch(context) {
    // eslint-disable-next-line no-console
    console.log('fetch')
    // eslint-disable-next-line no-console
    console.log(context.route.name)
  },
  created() {
    // eslint-disable-next-line no-console
    console.log('created')
  },
}
</script>
```

## 20 asyncData, fetch

|                | asyncData                                                      | fetch                                               |
| -------------- | -------------------------------------------------------------- | --------------------------------------------------- |
| 実行タイミング | created の前                                                   | (引数有りの場合)<br>created の前                    |
| とれる引数     | context                                                        | context                                             |
| 用途           | 取得してデータを<br>ページコンポーネント内で<br>使う場合に使う | 取得してデータを<br>Vuex ストアに<br>入れる際に使う |

動作的にはほぼ同じ<br>
役割を分けてコードを読みやすくするため<br>

## 21 middleware(すべてのページで実行)

### Middleware

ページ表示される前に実行<br>
ex) ログイン済ユーザーかの確認<br>

`middleware/*.js`を作成<br>

- 全てのページ・・`nuxt.config.js`に middleware 追記<br>

* 一部のページ(pages, layouts)<br>
  ファイル内に`middleware: 'ミドルウェア名'を記載<br>

呼び出し順 `nuxt.config.js` -> `layouts` -> `pages`<br>

### Middleware 作り方

`例`<br>
middleware にも context が使える<br>
`middleware/middlewareCheck.js`<br>

```js:middlewareCheck.js
export default function ({ route }) {
  console.log('middleware Check')
  console.log('middleware:', route.name)
}
```

### Middleware 全てのページで実行

`例`<br>
`nuxt.config.js`<br>

```js:nuxt.config.js
router: {
  middleware: 'middlewareCheck'
}
// 複数指定する場合は配列で指定["", ""]
```

### ハンズオン

- `nuxt-test/middleware`ディレクトリを作成<br>

* `nuxt-test/middleware/middlewareCheck.js`ファイルを作成<br>

```js:middlewareCheck.js
export default function ({ route }) {
  // eslint-disable-next-line no-console
  console.log('middlewareCheck')
  // eslint-disable-next-line no-console
  console.log('middleware:', route.name)
}
```

- `nuxt.config.js`を編集<br>

```js:nuxt.config.js
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // 追記
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
  plugins: [],

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
