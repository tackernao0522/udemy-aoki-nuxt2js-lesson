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

## 74 ロードで state が消えるので対策

### リロードで store が消える問題

画面表示前に<br>
`onAuthStateCHanged()`を実行<br>
ログイン状態であれば state に保存<br>

### middleware/authenticated.js

`例`<br>

```js:authenticated.js
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default function ({
  // 略
}) {
  const auth = getAuth($firebase)
  if (!store.getters['auth/getLoggedIn']) {
    onAuthStateChanged(auth, user => {
      if (user) {
        store.dispatch('auth/addUserInfo', user)
      } else if (!route.path.match(/\/auth\//)) {
        redirect('/auth/login)
      }
    })
  }
}
```

### store/auth.js の actions

画面読み込み時に state に登録する用の action を作成<br>
`例`<br>

```js:auth.js
export const actions = {
  // 略
  addUserInfo({ commit }, payload) {
    commit('setLoginState', true)
    commit('setUserUid', payload.uid)
    commit('setEmail', payload.email)
  },
}
```

### ハンズオン

- `section04/bookapp/store/auth.js`を編集<br>

```js:auth.js
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'

export const state = () => ({
  isLoggedIn: false,
  userUid: '',
  email: '',
})

export const mutations = {
  setLoginState(state, loggedIn) {
    state.isLoggedIn = loggedIn
  },
  setUserUid(state, userUid) {
    state.userUid = userUid
  },
  setEmail(state, email) {
    state.email = email
  },
}

export const actions = {
  async login({ commit }, payload) {
    const auth = getAuth(this.$firebase)
    await signInWithEmailAndPassword(auth, payload.email, payload.password)
      .then((userCredential) => {
        commit('setLoginState', true)
        commit('setUserUid', userCredential.user.uid)
        commit('setEmail', userCredential.user.email)
        // eslint-disable-next-line no-console
        console.log('ログインok!')
        this.$router.push('/book')
      })
      .catch((e) => {
        alert(e.message)
        // eslint-disable-next-line no-console
        console.error('error:', e)
      })
  },
  async logout({ commit }) {
    const auth = getAuth(this.$firebase)
    await signOut(auth)
      .then(() => {
        commit('setLoginState', false)
        commit('setUserUid', '')
        commit('setEmail', '')
        this.$router.push('/auth/login')
      })
      .catch((e) => {
        alert(e.message)
        // eslint-disable-next-line no-console
        console.log('error:', e)
      })
  },
  // 追記
  addUserInfo({ commit }, payload) {
    commit('setLoginState', true)
    commit('setUserUid', payload.uid)
    commit('setEmail', payload.email)
  },
}

export const getters = {
  // getLoggedIn(state) {
  //   return !!state.isLoggedIn
  // }
  getLoggedIn: (state) => !!state.isLoggedIn,
  getUserUid: (state) => state.userUid,
  getEmail: (state) => state.email,
}
```

- `section04/bookapp/middleware/authenticated.js`を編集<br>

```js:authenticated.js
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default function ({ $firebase, store, route, redirect }) {
  const auth = getAuth($firebase)
  if (!store.getters['auth/getLoggedIn']) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        store.dispatch('auth/addUserInfo', user)
      } else if (!route.path.match(/\/auth\//)) {
        redirect('/auth/login')
      }
    })
  }
}
```

## 75 firebase CLI インストール

- firebase の管理画面の`Hosting`をクリック<br>

* `始める`をクリック<br>

- `$ npm install -g firebase-tools`を実行<br>

- `次へ`をクリック<br>

* `$ firebase login`を実行<br>

- `$ firebase init`を実行<br>

* 下記を選択して`Enter`<br>

```
 ◯ Realtime Database: Configure a security rules file for Realtime Database and (optionally) provision default instance
 ◯ Firestore: Configure security rules and indexes files for Firestore
 ◯ Functions: Configure a Cloud Functions directory and its files
❯◉ Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys
 ◯ Hosting: Set up GitHub Action deploys
 ◯ Storage: Configure a security rules file for Cloud Storage
 ◯ Emulators: Set up local emulators for Firebase products
(Move up and down to reveal more choices)
```

- `❯ Use an existing project`を選択して`Enter`<br>

* `❯ nuxt-spa-book-app-d5e90 (nuxt-spa-book-app)`を選択して`Enter`<br>

- `? What do you want to use as your public directory? (public) dist`と入力して`Enter`<br>

* `Y`を入力して`Enter`<br>

- `N`を入力して`Enter`<br>

## 76 Firebase へ Deploy

ローカルで確認<br>
Firebase serve --only hosting<br>
公開用ファイルを生成しておく必要あり<br>
npm run generate ・・dist フォルダ内に必要ファイルが生成<br>

デプロイ firebase deploy<br>

### ハンズオン

- `$ firebase serve --only hosting`を実行<br>

* http://localhost:5000 にアクセスしても X<br>

- `$ npm run generate`を実行<br>

- `$ firebase serve --only hosting`を実行<br>

* これでローカル側は完了<br>

- `$ firebase deploy`を実行<br>

- 本番環境へのデプロイはこれで完了<br>
