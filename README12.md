## 72 middleware の作成

### 未ログインならリダイレクト

`例`<br>

- `middleware/authenticated.js`を作成する<br>

* `nuxt.config.js`の`router`に追加<br>

```js:nuxt.config.js
// 略
router: {
  middleware: 'authenticated'
}
```

これで全ページで実行される<br>

### ハンズオン

- `section04/bookapp/middleware`ディレクトリを作成<br>

- `section04/bookapp/middleware/authenticated.js`ファイルを作成<br>

```js:authenticated.js
export default function () {
  // eslint-disable-next-line no-console
  console.log('ミドルウェア')
}
```

- `section04/bookapp/nuxt.config.js`を編集<br>

```js:nuxt.config.js
import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // 追記
  router: {
    middleware: 'authenticated',
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - bookapp',
    title: 'bookapp',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['assets/style.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/firebase.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
```

## 73 redirect の設定

### middleware/authenticated.js

- `例`<br>

```js:authenticated.js
// middlewareはNuxtの機能なのでcontectが使える
// plubinは$をつけて取得できる
export default function ({ $firebase, store, route, redirect }) {
  const isAuthenticated = store.getters['auth/getLoggedIn']
  // string.match(/文字列/)の文字列を含むかのチェック
  if (!isAuthenticated && !route.path.match(/\/auth\//)) {
    redirect('/auth/login')
  }
}
```

### ハンズオン

- `section04/bookapp/middleware/authenticated.js`を編集<br>

```js:authenticated.js
export default function ({ $firebase, store, route, redirect }) {
  const isAuthenticated = store.getters['auth/getLoggedIn']
  if (!isAuthenticated && !route.path.match(/\/auth\//)) {
    redirect('/auth/login')
  }
}
```
