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

## 40 search その 2 検索 0 件時の対応

- `sction03/bookapp/assets/style.css`ファイルを作成<br>

```css:style.css
.mt-4 {
  margin-top: 4px;
}
```

- `section03/bookapp/nuxt.config.js`を編集<br>

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
  plugins: [],

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
    <div v-show="!isFound" class="mt-4">検索結果は0件でした。</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: '',
      searchResults: [],
      isFound: true,
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

      if (response.items === undefined) {
        this.isFound = false
      } else {
        this.isFound = true
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
      }
    },
  },
}
</script>

<style></style>
```
