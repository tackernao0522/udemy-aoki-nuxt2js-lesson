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
