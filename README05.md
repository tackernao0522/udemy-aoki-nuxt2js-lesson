## 34 NuxtJs のインストール(Vuetify)

### create-nuxt-app でインストール

Project 名: bookapp<br>
Program 言語: JavaScript<br>
Package 管理: npm<br>
UI フレームワーク: Vuetify.js<br>
Nuxt.js モジュール: Axios, PWA<br>
Linting ツール: ESLint, Prettier<br>
Test ツール: Jest<br>
Rendering モード: Single Page App<br>
公開先: Server<br>
開発ツール: なし<br>
CI: None<br>
バージョンコントロール: Git<br>

- `section03`ディレクトリに移動<br>

* `$ npx create-nuxt-app bookapp`を実行<br>

* `section03/bookapp`ディレクトリに移動<br>

- `$ npm run dev`でサーバー起動<br>

## 35 ファイル・フォルダの確認

- lesson のバージョンに package.json の中身を書き換えて npm install する<br>

## 36 layouts/default.vue の調整

- `bookapp/nuxt.config.js`を編集(ダークモードの解除)<br>

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
  css: [],

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
      // 編集
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

- `bookapp/layouts/default.vue`を編集<br>

```vue:default.vue
<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'bookApp',
    }
  },
}
</script>
```

## 37 Header, Footer の切り離し

- `bookapp/components/Footer.vue`ファイルを作成<br>

```vue:Footer.vue
<template>
  <div>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fixed: false,
    }
  },
}
</script>

<style></style>
```

- `bookapp/layouts/default.vue`を編集<br>

```vue:default.vue
<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    // 追記
    <Footer />
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      // fixed: false, 削除してFooter.vueへ記述
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'bookApp',
    }
  },
}
</script>
```

- `bookapp/components/Header.vue`ファイルを作成<br>

```vue:Header.vue
<template>
  <div>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      title: 'bookApp',
    }
  },
}
</script>

<style></style>
```

- `bookapp/layouts/default.vue`を編集<br>

```vue:default.vue
<template>
  <v-app>
    <Header />
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {}
  },
}
</script>
```

## 38 NuxtChild

Nuxt は自動でルーティング作成する<br>
親子関係を作るために Nuxt-Child を使う<br>

親のファイル名と同じフォルダを作成しフォルダ内にファイルを作る<br>
`親`<br>
`pages/book.vue`<br>
`子`<br>
`pages/book/index.vue`<br>
`pages/book/search.vue`<br>
`pages/book/edit/\_id.vue<br>

- `bookapp/pages/book.vue`ファイルを作成<br>

```vue:book.vue
<template>
  <div>
    book
  </div>
</template>

<script>
export default {}
</script>

<style></style>
```

- `bookapp/pages/book`ディレクトリを作成<br>

* `bookapp/pages/book/index.vue`ファイルを作成<br>

```vue:index.vue
<template>
  <div>
    book/index
  </div>
</template>

<script>
export default {}
</script>

<style></style>
```

- `bookapp/pages/book/search.vue`ファイルを作成<br>

```vue:search.vue
<template>
  <div>
    book/search
  </div>
</template>

<script>
export default {}
</script>

<style></style>
```

- `bookapp/pages/book/edit`ディレクトリを作成<br>

* `bookapp/pages/book/edit/_id.vue`ファイルを作成<br>

```vue:_id.vue
<template>
  <div>
    book/edit/_id
    <br />
    {{ $route.params.id }}
  </div>
</template>

<script>
export default {}
</script>

<style></style>
```

- `bookapp/pages/book.vue`を編集(親)<br>

```vue:book.vue
<template>
  <div>
    <NuxtChild />
  </div>
</template>

<script>
export default {}
</script>

<style></style>
```

- `.nuxt/router.js`の中にルーティングが設定されている<br>

* 参考: https://nuxtjs.org/ja/docs/features/nuxt-components#the-nuxtlink-component NuxtChild コンポーネント<br>
