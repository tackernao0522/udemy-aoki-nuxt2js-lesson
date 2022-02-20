# セクション 4: Firebase & SPA

### Firebase の概要

Baas や mBass よ呼ばれる<br>
(mobile Backend as a service)<br>

サーバー側で必要な仕組みを用意<br>
サーバーを用意しないで開発ができるのでサーバーレスとも呼ばれる<br>

### Firebase の歴史

2011 年 Firebase Inc. が開発<br>
2013 年 Zapier を統合(複数のアプリ間通信)<br>
2014 年 Google が買収<br>
2017 年 10 月 Cloud Firestore 提供開始<br>
2021 年 8 月 Firebase JS SDK v9.0.0<br>

(他に iOS, Android, C++, Unity なども対応)<br>

### Firebase の機能

Hosting・・HTML/CSS/JS が動く<br>
レンタルサーバー CLI も用意<br>
Cloud Firestore・・データベース(NoSQL)<br>
Cloud Storage・・画像保存など<br>
認証(Authentication)・・Firebase 上でプログラムを動かす仕組み<br>
パフォーマンス監視<br>
グーグルアナリティクス<br>
エクステンション・・画像リサイズ、翻訳 etc・・・<br>

### Firebase 無料プラン

Spark プラン<br>
Authentication 1 万/月<br>
Cloud Firestore 保存済みデータ合計 1GiB<br>
書き込み 2 万件/日<br>
読み取り 5 万件/日<br>
Hosting ストレージ 10GB<br>
Cloud Storage GB 保存済み 5GB<br>
https://firebase.google.com/pricing?hl=ja<br>

## 54 プロジェクト作成

- Firebase へログインする<br>

* コンソールをクリック<br>

- プロジェクトを作成をクリック<br>

* プロジェクト名を入力して`続行`をクリック<br>

- 今回はアナリティクスを有効にしないに設定して`プロジェクトを作成`をクリック<br>

* `続行をクリック`<br>

- `</>`のボタンを選択してクリック<br>

* アプリのニックネームを`nuxt-spa`と入力してみる<br>

- このアプリの Firebase Hosting も設定します。にチェックを入れて`アプリを登録`をクリック<br>

* そのまま`次へ`をクリック<br>

- そのまま`次へ`を再度クリック<br>

* `コンソールへ進む`をクリック<br>

## 55 セクション 04 フォルダの準備

### フォルダコピー

今後、<br>
SPA、SSR、SSG、PWA など<br>
それぞれフォルダを分けて設定したい。<br>
section03 をベースに Section04 フォルダを作り、必要なファイルをコピーしておく。<br>

### 隠しファイルの表示方法

`Mac`<br>
`Cmd+Shift+.`<br>

- `section04`ディレクトリを作成し、`section03`ディレクトリの`bookapp`の`.nuxt`と`node_modules`を抜いてコピーする<br>

### コピー&インストール

.nuxt フォルダと node_modules フォルダはサイズが大きく、npm install やビルドで生成できるのでコピー不要<br>

npm ci でインストール<br>
package-lock.json を参照し依存パッケージをダウンロードする<br>

- `section04/bookapp`ディレクトリに移動<br>

* `$ npm ci`を実行<br>

- `$ npm run dev`を実行<br>

## 56 firebase SDK のインストール

### firebase SDK のインストール

`npm install firebase@"9.\*"<br>

ver8 と ver9 で大きく変更<br>
ver9 は必要な機能を import する形式(軽量化&高速化)<br>
公式も ver9 利用を推奨<br>
※ @nuxtjs/firebase は将来対応?<br>

### plugins/firebase.js

```
// 初期化用関数をインポート
import { initializeApp } from 'firebase/app'

// コンフィグ設定
const firebaseConfig = { 略 }

// 初期化（インスタンス化）
const firebaseApp = initializeApp(firebaseConfig)

// 他ファイルで使えるようexport (this.$firebaseで使えるようになる)
export default (context, inject) => {
  inject('firebase', firebaseApp)
}
```

- firebase コンソールの`一個のアプリ`をクリック<br>

* `歯車ロゴ`をクリック<br>

- `section04/bookapp`ディレクトリでターミナル`$npm install firebase@"9.*"`実行<br>

* `section04/bookapp/plugins`ディレクトリを作成<br>

- `section04/bookapp/plugins/firebase.js`ファイルを作成<br>

* firebase のコンソールの SDK の設定と構成で初期化コードをコピーして`firebase.js`に貼り付ける<br>

```js:firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAdJno4iBTLTvftl2OXa6mhvqa-X19YC5A',
  authDomain: 'nuxt-spa-book-app-d5e90.firebaseapp.com',
  projectId: 'nuxt-spa-book-app-d5e90',
  storageBucket: 'nuxt-spa-book-app-d5e90.appspot.com',
  messagingSenderId: '99841662313',
  appId: '1:99841662313:web:06b655cec48b35dd8831f8',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
```

## 57 plugin の inject と nuxt.config.js への追加

- `section04/bookapp/plugins/firebase.js`を編集<br>

```js:firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAdJno4iBTLTvftl2OXa6mhvqa-X19YC5A',
  authDomain: 'nuxt-spa-book-app-d5e90.firebaseapp.com',
  projectId: 'nuxt-spa-book-app-d5e90',
  storageBucket: 'nuxt-spa-book-app-d5e90.appspot.com',
  messagingSenderId: '99841662313',
  appId: '1:99841662313:web:06b655cec48b35dd8831f8',
}

// Initialize Firebase
// 編集
const firebaseApp = initializeApp(firebaseConfig)

// 追記
export default (context, inject) => {
  inject('firebase', firebaseApp)
}
```

- `section04/bookapp/nuxt.config.js`を編集<br>

```js:nuxt.config.js
import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

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
  // 編集
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

## 58 Firestore の設定

### Cloud Firestore

管理画面で有効化<br>
テストモード<br>
ロケーション（後で変更できない）<br>
asia-northeast1 東京<br>
asia-northeast2 大阪<br>

## Cloud Firestore の用語

コレクション・・フォルダ<br>
ドキュメント・・資料<br>
データ・・1 つ 1 つのデータ<br>

サブコレクションなどもある<br>

### firestore の接続

`getFirestore`の引数に Firebase インスタンスを渡せば使うことができる<br>

```
import { get Firestore } from 'firebase/firestore'

const db = getFirestore(this.$firebase) // 接続
```

- firebase 管理画面で`Cloud Firesote`のカードをクリック<br>

* `データベースを作成`をクリック<br>

- `テストモードで開発する`を選択する<br>

* `次へ`をクリック<br>

- ロケーションを`asia-northeast1`を選択<br>

* `有効にする`をクリック<br>

## 59 Firestore データの追加

### データの追加 1

`例`<br>

```
// pages/firebasetest/addData.vue
<template>
  <div>
    <v-btn @click="addData">追加</v-btn>
  </div>
</template>

<script>
// 必要な機能(関数)をインポート
import { getFirestore, collection, addDoc } from 'firebase/firestore'

data() { return { id: '001', title: 'テスト' }}

methods: { addData(){} }
</script>
```

### データの追加 2

`例`<br>

```
// pages/firebasetest/addData.vue
// クラウド上にあり通信が必要なため
// 非同期関数(async/await) & try-catch構文
methods: {
  async addData() {
    try {
      const db = getFirestore(this.$firestore) // 接続
      const docRef = await addDoc(collection(db, 'tasks'), {
        id: this.id,
        title: this.title
      })
      console.log('追加したデータのid:', docRef.id)
    } catch(e) { console.error('error:', e)}
  }
}
```

### ハンズオン

- `section04/bookapp/pages/firebasetest`ディレクトリを作成<br>

* `seticon04/bookapp/pages/firestoretest/addData.vue`ファイルを作成<br>

```vue:addData.vue
<template>
  <div>
    <v-btn @click="addData">追加</v-btn>
  </div>
</template>

<script>
import { getFirestore, collection, addDoc } from 'firebase/firestore'

export default {
  data() {
    return {
      id: '001',
      title: 'テスト',
    }
  },
  methods: {
    async addData() {
      try {
        const db = getFirestore(this.$firebase)
        const docRef = await addDoc(collection(db, 'tasks'), {
          id: this.id,
          title: this.title,
        })
        // eslint-disable-next-line no-console
        console.log('追加したデータのid:', docRef.id)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('error:', e)
      }
    },
  },
}
</script>

<style></style>
```

- `$ npm run dev`を実行<br>

* localhost:3000/firebase/addData にアクセスしてみる<br>

- ブラウザで追加ボタンをクリックするとブラウザコンソールに以下の結果が出る<br>

```browser:console
追加したデータのid: NR4n6tRdh5UTqMKcvZnV
```

- firestore の管理画面の Cloud Firestore にも登録されている<br>
