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
