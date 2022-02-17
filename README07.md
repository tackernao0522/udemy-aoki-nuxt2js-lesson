## 43 search->edit への移動と表示

- `section03/bookapp/pages/book.vue`を編集<br>

```vue:book.vue
<template>
  <div>
    <NuxtChild :books="books" @add-book-list="addBook" />
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
  mounted() {
    if (localStorage.getItem(STORAGE_KEY)) {
      try {
        this.books = JSON.parse(localStorage.getItem(STORAGE_KEY))
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY)
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
    goToEditPage(id) {
      this.$router.push(`/book/edit/${id}`)
    },
  },
}
</script>

<style></style>
```

- `section03/bookapp/pages/book/edit/_id.vue`を編集<br>

```vue:_id.vue
<template>
  <div>
    book/edit/_id
    <br />
    {{ $route.params.id }}
    {{ books }}
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

## 44 mounted->created への変更

- `section03/bookapp/pages/book/edit/_id.vue`を編集<br>

```vue:_id.vue
<template>
  <div>
    book/edit/_id
    <br />
    {{ $route.params.id }}
    {{ books }}
    {{ books[$route.params.id].title }}
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

- `section03/bookapp/pages/book.vue`を編集<br>

```vue:book.vue
<template>
  <div>
    <NuxtChild :books="books" @add-book-list="addBook" />
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
  // createdに変更
  created() {
    if (localStorage.getItem(STORAGE_KEY)) {
      try {
        this.books = JSON.parse(localStorage.getItem(STORAGE_KEY))
      } catch (e) {
        // 削除
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
    goToEditPage(id) {
      this.$router.push(`/book/edit/${id}`)
    },
  },
}
</script>

<style></style>
```
