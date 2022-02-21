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
