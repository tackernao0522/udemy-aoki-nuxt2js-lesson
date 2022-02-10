# セクション 2: Nuxtjs2 を使ってみる

## 5 NuxtJs2 のインストールその 2

### Create-nuxt-app でインストール

#### インストール設定

Project 名:<br>
Program 言語: JavaScript<br>
Package 管理: npm<br>
UI フレームワーク: None<br>
Nuxt.js モジュール: Axios<br>
Linting ツール: ESLInt, Prettier<br>
Test ツール: Jest<br>
Rendering モード: Single Page App<br>
公開先: Server<br>
開発ツール: なし<br>
CI: None<br>
バージョンコントロール: Git<br>

- `section02`ディレクトリを作成<br>

* `section02`に移動<br>

- `$ npx create-nuxt-app nuxt-test`を実行<br>

* `nuxt-test`ディレクトリに移動<br>

* `$ npm run dev`を実行して開発用サーバーが立ち上がる<br>

## 06 npm run build

### NuxtJs2 起動確認

プロダクション用(本番用)<br>

`$ npm run build`<br>
webpack で JS と CSS をミニファイ(圧縮) dist フォルダ生成<br>

`$ npm run start` Nuxt サーバー起動<br>

## 7 講座で扱っているバージョンに合わせる方法

### Nuxtjs2 講座のバージョン

講座のバージョンと合わせる方法<br>

package-lock.json ファイルを削除<br>
node_modules フォルダを削除<br>
package.json ファイルを修正<br>
npm install を実行<br>

https://github.com/aokitashipro/udemy_nuxt_test/tree/main/section2 <br>

## 8 フォルダ構成

- 参考: https://nuxtjs.org/ja/docs/get-started/directory-structure <br>

### フォルダ ・ ファイル構成

.nuxt・・ビルドフォルダ（自動生成）<br>
components・・コンポーネント用<br>
dist・・ビルド後のフォルダ<br>
node_modules・・各種ライブラリ<br>
pages・・ページ（自動ルーティング）<br>
static・・robots.txt や favicon など<br>
store・・Vuex 用<br>
nuxt.config.js・・Nuxt の設定ファイル<br>
package.json・・npm の設定ファイル<br>

### 追加可能なフォルダ群

assets・・CSS, 画像, font など<br>
layouts・・ヘッダー・フッターなど<br>
content・・@nuxt/content 使用時<br>
middleware・・ユーザー認証など<br>
plugins・・JS プラグイン<br>
modules・・ビルドの動きを拡張<br>

## 9 VSCode 拡張機能(Vetur 他)

### VSCode プラグイン

Vetur・・Vue ファイルを見やすく<br>
`<vue`と書くと最低限のコードを生成 <br>

動画と合わせるなら・・<br>
Bracket Pair Colorizer2<br>
<br>
Highlight Mathcing Tag<br>
Japanese Language Pack for VS Code<br>
Material Icon Theme<br>

## 10 Vue.js devtools (GoogleChrome 拡張機能)

Vue.js devtools 6.\* ・・ Vue.js3 対応(beta)<br>
Vue.js devtools 5.\* ・・Vue.js2 対応<br>

## 11 ルーティング Vue.js との違い

### ルーティング Vue.js の場合

Vue.js でルーティングする場合<br>
(※VueCLI でインストール想定)<br>

1. 表示したいコンポーネントを作成<br>
2. `routes/index.js`に `1`を import<br>
3. `routes/index.js`にパスの情報を追記<br>
4. リンクを貼る `<router-link to="">`<br>
5. 描画 `<router-view>`<br>

### ルーティング Nuxt の場合

Nuxt のルールに合わせて作成すると、自動でルーティングが設定される<br>

1. pages フォルダ内にコンポーネントを作成<br>
2. ルーティング情報を自動で追記<br>
3. リンクを貼る `<NuxtLink to="">`<br>
4. 描画 `<Nuxt />`<br>

## 12 ルーティング Nuxt の場合

- `section02/nuxt-test/pages/about.vue`ファイルを作成<br>

```vue:about.vue
<template>
  <div>about</div>
</template>

<script>
export default {}
</script>

<style></style>
```

- `$ npm run dev`を実行<br>
  `.nuxt/router.js`に新しく about のルーティングが追加されている<br>

* `section02/nuxt-test/pages/index.vue`を編集<br>

```vue:index.vue
<template>
  <div>
    index
    <br />
    <NuxtLink to="/about">about</NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
```

## 13 RestAPI を参考にルーティングを作成

Web システムを外部から利用するための呼び出し規約(API)の種類の一つ<br>
※添付は Laravel(PHP フレームワーク)の資料だが考え方は同じである<br>

| 動詞      | URI                  | アクション | ルート名       |
| --------- | -------------------- | ---------- | -------------- |
| GET       | /photos              | index      | photos.index   |
| GET       | /photos/create       | create     | photos.create  |
| POST      | /photos              | store      | photos.store   |
| GET       | /photos/{photo}      | show       | photos.show    |
| GET       | /photos/{photo/edit} | edit       | photos.edit    |
| PUT/PATCH | /photos/{photo}      | update     | photos.update  |
| DELETE    | /photos/{photo}      | destory    | photos.destroy |

### ルーティングを作ってみる

products/index.vue ・・一覧表示<br>
products/create.vue・・新規作成<br>
products/\_id/show.vue・・詳細表示<br>
products/\_id/edit.vue・・編集<br>

- `pages/products`ディレクトリを作成<br>

* `pages/products/index.vue`ファイルを作成<br>

```vue:index.vue
<template>
  <div>一覧表示</div>
</template>

<script>
export default {}
</script>

<style></style>
```

- `pages/products/create.vue`ファイルを作成<br>

```vue:create.vue
<template>
  <div>
    新規作成
  </div>
</template>

<script>
export default {}
</script>

<style></style>
```

- `pages/products/_id`ディレクトリを作成<br>

* `pages/products/_id/show.vue`ファイルを作成<br>

```vue:show.vue
<template>
  <div>
    詳細表示
    <br />
    {{ $route.params.id }}
  </div>
</template>

<script>
export default {}
</script>

<style></style>
```

- `pages/products/_id/edit.vue`ファイルを作成<br>

```vue:edit.vue
<template>
  <div>
    編集
    <br />
    {{ $route.params.id }}
  </div>
</template>

<script>
export default {}
</script>

<style></style>
```

- `$ npm run dev`を実行<br>

- `http://localhost:3000/products`　一覧表示<br>

* `http://localhost:3000/products/create` 新規作成<br>

- `http://localhost:3000/products/1/show` 詳細表示<br>

* `http://localhost:3000/products/1/edit` 編集<br>

## 14 テーブルをつくりリンクを貼る

`例`<br>

```vue:index.vue
<NuxtLink to="/products/create">新規作成</NuxtLink>

<table>
  <tr>
    <td>1</td>
    <td>テスト</td>
    <td><NuxtLink to="/products/1/show">詳細</NuxtLink></td>
    <td><NuxtLink to="/products/1/edit">編集</NuxtLink></td>
  </tr>
</table>
```

- 参考: https://nuxtjs.org/ja/docs/features/file-system-routing <br>

* `pages/products/index.vue`を編集<br>

```vue:index.vue
<template>
  <div>
    一覧表示
    <br />
    <NuxtLink to="/products/create">新規作成</NuxtLink>

    <table>
      <tr>
        <th>商品番号</th>
        <th>商品名</th>
        <th>詳細</th>
        <th>編集</th>
      </tr>
      <tr>
        <td>1</td>
        <td>テスト</td>
        <td><NuxtLink to="/products/1/show">詳細</NuxtLink></td>
        <td><NuxtLink to="/products/1/edit">編集</NuxtLink></td>
      </tr>
      <tr>
        <td>2</td>
        <td>テスト2</td>
        <td><NuxtLink to="/products/2/show">詳細</NuxtLink></td>
        <td><NuxtLink to="/products/2/edit">編集</NuxtLink></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
```

## 15 オートインポート機能

Nuxt v2.13 で追加<br>
nuxt.config.js 内 components: true の場合、<br>
components フォルダ内の vue ファイルが自動でインポートされる<br>

### オートインポート機能 フォルダ名有無

Nuxt v2.15（2021/2）<br>
components フォルダ内にフォルダがある場合、フォルダも記載<br>
`例`<br>
`componens/base/Header.vue`<br>

```vue:Header.vue
<BaseHeader />
```

フォルダ名を省略する場合は`nuxt.config.js`を編集<br>

```
components: {
  dirs: [
    '~/components/',
    '~/components/base'
  ]
}
<Header />
```

重複する場合は下層のファイルが優先される<br>

- `pages/index.vue`を編集<br>

```vue:index.vue
<template>
  <div>
    index
    <br />
    <NuxtLink to="/about">about</NuxtLink>
    // 追記
    <NuxtLogo />
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
```

- `components/base`ディレクトリを作成<br>

* `components/base/Header.vue`ファイルを作成<br>

```vue:Header.vue
<template>
  <div>base/Header</div>
</template>

<script>
export default {}
</script>

<style></style>
```

- `pages/index.vue`を編集<br>

```vue:index.vue
<template>
  <div>
    index
    <br />
    <NuxtLink to="/about">about</NuxtLink>
    <NuxtLogo />
    // 追記
    <BaseHeader />
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
```

## 16 フォルダ名無しでオートインポートする方法

- 参考: https://nuxtjs.org/ja/docs/directory-structure/components ネストされたディレクトリ<br>

* `nuxt.config.js`を編集<br>

```js:nuxt.confif.js
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

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
  // 編集
  // components: true,
  components: {
    dirs: ['~/components', '~/components/base'],
  },
  //

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

- `pages/index.vue`を編集<br>

```vue:index.vue
<template>
  <div>
    index
    <br />
    <NuxtLink to="/about">about</NuxtLink>
    <NuxtLogo />
    // 編集
    <Header />
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
```

- `$ npm run dev`を実行<br>
