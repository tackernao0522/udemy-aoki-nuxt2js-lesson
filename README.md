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
