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
