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
