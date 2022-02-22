## 68 store/auth.js

```
export const state = () => ({})

export const mutations = {}

export const actions = {}

export const getters = {}
```

### store/auth.js の state

ログインしているかどうかの情報をもたせる<br>

```
export const state = () => ({
  isLoggedIn: false,
  userUid: '',
  email: '',
})
```

### store/auth.js の mutations

state を変更するためのメソッドを用意する<br>

```
export const mutations = {
  setLoginState(state, loggedIn) {
    state.isLoggedIn = loggedIn
  },
  setUserUid(state, userUid) {
    state.userUid = userUid
  },
  setEmail(state, email) {
    state.email = email
  }
}
```

### store/auth.js の getters

State を参照する時は getters を使う方が好ましい<br>
(誤って state を直接置き換えるのを防ぐため)<br>

```
export const getters = {
  getLoggedIn: state => !!state.isLoggedIn, // !!で真偽値にキャスト
  getUserUid: state => state.userUid,
  getEmail: state => state.email,
}
```

### ハンズオン

- `section04/bookapp/store/auth.js`ファイルを作成<br>

```js:auth.js
export const state = () => ({
  isLoggedIn: false,
  userUid: '',
  email: '',
})

export const mutations = {
  setLoginState(state, loggedIn) {
    state.isLoggedIn = loggedIn
  },
  setUserUid(state, userUid) {
    state.userUid = userUid
  },
  setEmail(state, email) {
    state.email = email
  },
}

export const actions = {}

export const getters = {
  // getLoggedIn(state) {
  //   return !!state.isLoggedIn
  // }
  getLoggedIn: (state) => !!state.isLoggedIn,
  getUserUid: (state) => state.userUid,
  getEmail: (state) => state.email,
}
```

## 69 ログインを Vuex で書いてみる

### store/auth.js の actions

`actions->mutations->state`の流れを忘れずに<br>

`例`<br>

```
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
// 略
export const actions = {
  // 第1引数・・context.commitか{ commit } 第2引数・・payload(オブジェクト)
  async login({ commit }, payload) {
    const auth = getAuth(this.$firebase)
    await signInWithEmailAndPassword(auth, payload.email, payload.password)
      .then((userCredential) => {
        commit('setLoginState', true) // mutationsを指定
        commit('setUserUid', userCredenstial.user.uid) // mutationsを指定
        commit('setEmail', userCredential.user.email) // mutationsを指定
        console.log('ログインok!')
        this.$router.push('/book') // bookに移動
      })
        .catch((e) => alert(e))
  }
}
```

### ハンズオン

- `section04/bookapp/store/auth.js`を編集<br>

```js:auth.js
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

export const state = () => ({
  isLoggedIn: false,
  userUid: '',
  email: '',
})

export const mutations = {
  setLoginState(state, loggedIn) {
    state.isLoggedIn = loggedIn
  },
  setUserUid(state, userUid) {
    state.userUid = userUid
  },
  setEmail(state, email) {
    state.email = email
  },
}

export const actions = {
  async login({ commit }, payload) {
    const auth = getAuth(this.$firebase)
    await signInWithEmailAndPassword(auth, payload.email, payload.password)
      .then((userCredential) => {
        commit('setLoginState', true)
        commit('setUserUid', userCredential.user.uid)
        commit('setEmail', userCredential.user.email)
        // eslint-disable-next-line no-console
        console.log('ログインok!')
        this.$router.push('/book')
      })
      .catch((e) => {
        alert(e.message)
        // eslint-disable-next-line no-console
        console.error('error:', e)
      })
  },
}

export const getters = {
  // getLoggedIn(state) {
  //   return !!state.isLoggedIn
  // }
  getLoggedIn: (state) => !!state.isLoggedIn,
  getUserUid: (state) => state.userUid,
  getEmail: (state) => state.email,
}
```

- `section04/bookapp/pages/auth/login.vue`を編集<br>

```vue:login.vue
<template>
  <div>
    ログイン
    <br />
    <v-row>
      <v-col cols="6">
        <v-text-field v-model="email" label="メールアドレス" />
        <v-text-field v-model="password" label="パスワード" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-btn color="primary" @click="login">ログイン</v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn text to="./register">ユーザー登録</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    login() {
      this.$store.dispatch('auth/login', {
        email: this.email,
        password: this.password,
      })
    },
  },
}
</script>

<style></style>
```

## 70 ログアウト処理

### store/auth.js の actions

`例`<br>

```
// signOutを追記
import { signOut } from 'firebase/auth'
// 略
async logout({ commit }) {
  const auth = getAuth(this.$firebase)
  await signOut(auth)
    .then(() => {
      commit('setLoginState', false)
      commit('setUserUid', '')
      commit('setEmail', '')
      this.$router.push('/auth/login)
    })
    .catch(e => alert(e))
}
```

### クリックでログアウト

`例`<br>

- `pages/Header.vue<br>

```vue:Header.vue
// 略 items: [ { title: 'logout', to: '/auth/logout' // 一旦ページに飛ばす } ]
```

- `pages/auth/logout.vue`<br>

```vue:logout.vue
// 略 created() { this.$store.dispatch('auth/logout') }
```

### ハンズオン

- `section04/bookapp/store/auth.js`を編集<br>

```js:auth.js
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'

export const state = () => ({
  isLoggedIn: false,
  userUid: '',
  email: '',
})

export const mutations = {
  setLoginState(state, loggedIn) {
    state.isLoggedIn = loggedIn
  },
  setUserUid(state, userUid) {
    state.userUid = userUid
  },
  setEmail(state, email) {
    state.email = email
  },
}

export const actions = {
  async login({ commit }, payload) {
    const auth = getAuth(this.$firebase)
    await signInWithEmailAndPassword(auth, payload.email, payload.password)
      .then((userCredential) => {
        commit('setLoginState', true)
        commit('setUserUid', userCredential.user.uid)
        commit('setEmail', userCredential.user.email)
        // eslint-disable-next-line no-console
        console.log('ログインok!')
        this.$router.push('/book')
      })
      .catch((e) => {
        alert(e.message)
        // eslint-disable-next-line no-console
        console.error('error:', e)
      })
  },
  async logout({ commit }) {
    const auth = getAuth(this.$firebase)
    await signOut(auth)
      .then(() => {
        commit('setLoginState', false)
        commit('setUserUid', '')
        commit('setEmail', '')
        this.$router.push('/auth/login')
      })
      .catch((e) => {
        alert(e.message)
        // eslint-disable-next-line no-console
        console.log('error:', e)
      })
  },
}

export const getters = {
  // getLoggedIn(state) {
  //   return !!state.isLoggedIn
  // }
  getLoggedIn: (state) => !!state.isLoggedIn,
  getUserUid: (state) => state.userUid,
  getEmail: (state) => state.email,
}
```

- `section04/bookapp/components/Header.vue`を編集<br>

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
        // 追記
        {
          title: 'Logout',
          to: '/auth/logout',
        },
      ],
      title: 'bookApp',
    }
  },
}
</script>

<style></style>
```

- `section04/bookapp/pages/auth/logout.vue`ファイルを作成<br>

```vue:logout.vue
<template>
  <div></div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('auth/logout')
  },
}
</script>

<style></style>
```

## 71 ログイン画面のメニュー非表示

### ログインページのメニュー非表示

`例`<br>

- `components/Header.vue`

```vue:Header.vue
// 略
<div v-show="isLoggedIn">
  <v-app-bar-bav-icon @click.stop="drawer = !drawer" />
</div>

// 略 computed: { isLoggedIn: () => this.$store.getters['auth/getLoggedIn'] }
```

### ハンズオン

`section04/bookapp/components/Header.vue`を編集<br>

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
      <div v-show="isLoggedIn">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      </div>
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    {{ books }}
  </div>
</template>

<script>
export default {
  props: {
    books: {
      type: Array,
      default: null,
    },
  },
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
        {
          title: 'Logout',
          to: '/auth/logout',
        },
      ],
      title: 'bookApp',
    }
  },
  computed: {
    // isLoggedIn: () => this.$store.getters['auth/getLoggedIn'],
    isLoggedIn() {
      return this.$store.getters['auth/getLoggedIn']
    },
  },
}
</script>

<style></style>
```
