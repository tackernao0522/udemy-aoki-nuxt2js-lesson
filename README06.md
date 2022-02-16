## 39 search その 1 検索まで

- `section03/bookapp/pages/book/search.vue`を編集<br>

```vue:search.vue
<template>
  <div>
    <v-row>
      <v-col cols="6">
        <v-text-field v-model="keyword" label="本のタイトルを検索" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-btn color="primary" @click="search(keyword)">検索する</v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn color="secondary" to="/book">一覧に戻る</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: '',
      searchResults: [],
    }
  },
  methods: {
    async search(keyword) {
      this.searchResults = []
      // クエリーストリングを作成
      const baseUrl = 'https://www.googleapis.com/books/v1/volumes?'
      const params = {
        q: `intitle:${keyword}`,
        maxResults: 40,
      }
      const queryParams = new URLSearchParams(params)
      // eslint-disable-next-line no-console
      console.log(baseUrl + queryParams)
      // fetchでJSON取得
      const response = await fetch(baseUrl + queryParams).then((response) =>
        response.json(),
      )
      // eslint-disable-next-line no-console
      console.log(response.items)
      // 必要な情報を配列にpush
      for (const book of response.items) {
        const title = book.volumeInfo.title
        const img = book.volumeInfo.imageLinks
        const description = book.volumeInfo.description
        this.searchResults.push({
          title: title ? title : '', // eslint-disable-line
          img: img ? img.thumbnail : '',
          description: description ? description.slice(0, 40) : '',
        })
      }
    },
  },
}
</script>

<style></style>
```
