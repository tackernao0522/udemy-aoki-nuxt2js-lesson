## 48 一覧画面(book/index.vue)

### book/index.vue

抜粋<br>

```
<v-btn
  :to="{name: 'book-edit-id', params: { id: book.id }}"
  color="indigo"
  fab small dark
>
<v-icon>mdi-pencil</v-icon>
</v-btn>
```

参考: https://v3.router.vuejs.org/ja/guide/essentials/named-routes.html <br>

- `section03/bookapp/pages/book/index.vue`を編集<br>

```vue:index.vue
<template>
  <div>
    <v-row>
      <v-col cols="8">
        <v-btn color="primary" to="/book/search">検索する</v-btn>
      </v-col>
      <v-col v-for="book in books" :key="book.id" cols="12" md="6" class="mb-4">
        <v-card>
          <v-row>
            <v-col cols="4">
              <v-img :src="book.image"></v-img>
            </v-col>
            <v-col cols="8">
              <v-card-title>{{ book.title }}</v-card-title>
              読んだ日: {{ book.readDate }} 感想: {{ book.memo }}
              <v-spacer />
              <v-card-actions>
                <v-btn
                  :to="{ name: 'book-edit-id', params: { id: book.id } }"
                  color="indigo"
                  fab
                  small
                  dark
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    books: {
      type: Array,
      default: () => {},
    },
  },
}
</script>

<style></style>
```

## 49 book/edit/\_id.vue date の修正

```vue:_id.vue
<template>
  <div>
    <v-row class="mt-4">
      <v-col cols="12">
        <v-card class="mx-auto">
          <v-row>
            <v-col cols="4">
              <v-img :src="book.image"></v-img>
            </v-col>
            <v-col cols="8">
              <v-card-title>{{ book.title }}</v-card-title>
              読んだ日:
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  locale="jp-ja"
                  :day-format="(date) => new Date(date).getDate()"
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>
              メモ:
              <v-textarea v-model="book.memo" class="mx-2">
                {{ book.memo }}
              </v-textarea>
              <v-card-actions>
                <v-btn color="secondary" to="/book">一覧に戻る</v-btn>
                <v-btn color="info" @click="updateBookInfo">保存する</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.book = vm.books[vm.$route.params.id]
      // 追記
      if (vm.book.readDate) {
        vm.date = vm.book.readDate
      } else {
        vm.date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10)
      }
    })
  },
  props: {
    books: {
      type: Array,
      default: () => {},
    },
  },
  data() {
    return {
      book: '',
      // 修正
      date: '',
      menu: false,
    }
  },
  methods: {
    updateBookInfo() {
      this.$emit('update-book-info', {
        id: this.$route.params.id,
        readDate: this.date,
        memo: this.book.memo,
      })
    },
  },
}
</script>

<style></style>
```

## 50 LocalStorage 一括削除

### 削除ボタンの追加

```
// book.vue (親)
<NuxtChild
  @delete-local-storage="deleteLocalStorage"
/>

// book/index.vue (子)
<v-btn @click="deleteLocalStorage"></v-btn>
略
methods: {
  deleteLocalStorage() {
    this.$emit('delete-local-storage')
  }
}
```

### 削除処理

```
// book.vue (親)
methods: {
  略
  deleteLocalStorage() {
    const isDeleted = '本当に削除してよろしいですか？'
    if ( window.confirm(isDeleted)) {
      localStorage.setItem(STORAGE_KEY, '')
      localStorage.removeItem(STORAGE_KEY)
      this.books = []
      window.location.reload()
    }
  }
}
```

- `section03/bookapp/pages/book/index.vue`を編集<br>

```vue:index.vue
<template>
  <div>
    <v-row>
      <v-col cols="8">
        <v-btn color="primary" to="/book/search">検索する</v-btn>
      </v-col>
      // 追記
      <v-col cols="4">
        <v-btn color="error" @click="deletedLocalStorage">削除する</v-btn>
      </v-col>
      <v-col v-for="book in books" :key="book.id" cols="12" md="6" class="mb-4">
        <v-card>
          <v-row>
            <v-col cols="4">
              <v-img :src="book.image"></v-img>
            </v-col>
            <v-col cols="8">
              <v-card-title>{{ book.title }}</v-card-title>
              読んだ日: {{ book.readDate }} 感想: {{ book.memo }}
              <v-spacer />
              <v-card-actions>
                <v-btn
                  :to="{ name: 'book-edit-id', params: { id: book.id } }"
                  color="indigo"
                  fab
                  small
                  dark
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    books: {
      type: Array,
      default: () => {},
    },
  },
  // 追記
  methods: {
    deletedLocalStorage() {
      this.$emit('delete-local-storage')
    },
  },
}
</script>

<style></style>
```

- `section03/bookapp/pages/book.vue`を編集<br>

```vue:book.vue
<template>
  <div>
    <NuxtChild :books="books" @add-book-list="addBook"
    @update-book-info="updateBookInfo" // 追記
    @delete-local-storage="deletedLocalStorage" />
  </div>
</template>

<script>
const STORAGE_KEY = 'books'
export default {
  data() {
    return {
      books: [],
      newBook: null,
    }
  },
  created() {
    if (localStorage.getItem(STORAGE_KEY)) {
      try {
        this.books = JSON.parse(localStorage.getItem(STORAGE_KEY))
      } catch (e) {
        // localStorage.removeItem(STORAGE_KEY)
      }
    }
  },
  methods: {
    addBook(e) {
      this.books.push({
        id: this.books.length,
        title: e.title,
        image: e.image,
        description: e.description,
        readDate: '',
        memo: '',
      })
      // this.newBook = ''
      this.saveBooks()
      // 最後に追加したidの取得コード
      // console.log(this.books.slice(-1)[0].id)
      this.goToEditPage(this.books.slice(-1)[0].id)
    },
    removeBook(x) {
      this.books.splice(x, 1)
      this.saveBooks()
    },
    saveBooks() {
      const parsed = JSON.stringify(this.books)
      localStorage.setItem(STORAGE_KEY, parsed)
    },
    updateBookInfo(e) {
      const updateInfo = {
        id: e.id,
        readDate: e.readDate,
        memo: e.memo,
        title: this.books[e.id].title,
        image: this.books[e.id].image,
        description: this.books[e.id].description,
      }
      this.books.splice(e.id, 1, updateInfo)
      this.saveBooks()
      this.$router.push('/book')
    },
    goToEditPage(id) {
      this.$router.push(`/book/edit/${id}`)
    },
    // 追記
    deletedLocalStorage() {
      const isDeleted = '本当に削除してよろしいですか？'
      if (window.confirm(isDeleted)) {
        localStorage.setItem(STORAGE_KEY, '')
        localStorage.removeItem(STORAGE_KEY)
        this.books = []
        window.location.reload()
      }
    },
  },
}
</script>

<style></style>
```

## 51 リダイレクト asyncData({ redirect })

### context でリダイレクト

/ -> /book にリダイレクト<br>

```
// index.vue
asyncData({ redirect }) {
  redirect('/book')
}
```

### context(文脈)

Nuxt で使える様々な情報を内包するオブジェクト<br>
asyncData, fetch, plugins, middlewares, modules,<br>
store/nuxtServerInit,など Nuxt のライフサイクル内で使用可能<br>
(Vuex の action で使う context とは別物)<br>

```
asyncData( context ) {
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
context.redirect・・リダイレクト<br>
context.query・・クエリパラメータ<br>
context.isDev・・開発中かどうか<br>
context.req・・get/post の判定<br>
context.app・・ルートの Vue インスタンス<br>
context.\$axios・・axios<br>

プラグイン(plugins)の注入も可能<br>

- `section03/bookapp/pages/index.vue`を編集<br>

```vue:index.vue
<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <NuxtLogo />
        <VuetifyLogo />
      </v-card>
      <v-card>
        <v-card-title class="headline">
          Welcome to the Vuetify + Nuxt.js template
        </v-card-title>
        <v-card-text>
          <p>
            Vuetify is a progressive Material Design component framework for
            Vue.js. It was designed to empower developers to create amazing
            applications.
          </p>
          <p>
            For more information on Vuetify, check out the
            <a
              href="https://vuetifyjs.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              documentation
            </a>
            .
          </p>
          <p>
            If you have questions, please join the official
            <a
              href="https://chat.vuetifyjs.com/"
              target="_blank"
              rel="noopener noreferrer"
              title="chat"
            >
              discord
            </a>
            .
          </p>
          <p>
            Find a bug? Report it on the github
            <a
              href="https://github.com/vuetifyjs/vuetify/issues"
              target="_blank"
              rel="noopener noreferrer"
              title="contribute"
            >
              issue board
            </a>
            .
          </p>
          <p>
            Thank you for developing with Vuetify and I look forward to bringing
            more exciting features in the future.
          </p>
          <div class="text-xs-right">
            <em><small>&mdash; John Leider</small></em>
          </div>
          <hr class="my-3" />
          <a
            href="https://nuxtjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nuxt Documentation
          </a>
          <br />
          <a
            href="https://github.com/nuxt/nuxt.js"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nuxt GitHub
          </a>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/inspire">Continue</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  // 追記
  asyncData({ redirect }) {
    redirect('/book')
  },
  // name: 'IndexPage',
}
</script>
```

## 52 サンプルアプリの補足

改善案<br>

- 重複しないように -> Lodash の\_search など<br>

* 削除機能 -> id がずれるのでインクリメント id を別で作成しておく<br>
* 初回登録 保存->編集 を 編集->保存 に<br>

- ソート機能->ソート番号を用意<br>

* レイアウト調整<br>
