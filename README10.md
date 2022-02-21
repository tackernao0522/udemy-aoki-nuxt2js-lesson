## 62 Authentication の設定

管理画面で有効化<br>
メール<br>
追加のプロバイダ(Google, Twitter, Facebook 等)<br>

### 認証・・できる事

|               機能               |            メソッド            |
| :------------------------------: | :----------------------------: |
|          認証機能の利用          |            getAuth             |
| ユーザー登録（メール&パスワード) | createUserWithEmailAndPassword |
|            サインイン            |   signInWithEmailAndPassword   |
|          認証状態の変更          |       onAuthStateChanged       |
|         認証状態の永続性         |         setPersistence         |

- firebase 管理画面の`Authentication`のカードをクリック<br>

* `始める`ボタンをクリック<br>

- `メール / パスワード`をクリック<br>

* `メール / パスワード`を有効にする<br>

- `保存`をクリック<br>

## 63 ユーザー登録

### ユーザー登録 1

`例`<br>

```
// pages/auth/register.vue
<template>
  <div>
    <v-text-field v-model="email">メールアドレス</v-text-field>
    <v-text-field v-model="password">パスワード</v-text-field>
    <v-btn @click="signUp">ユーザー登録</v-btn>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        email: '',
        password: '',
      }
    }
    methods: {
      signUp() {

      }
    }
  }
</script>
```

### ユーザー登録 2

`例`<br>

```
// pages/auth/register.vue
<script>
  import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
  // 略
  signUp() {
    const auth = getAuth(this.$firebase)
    createUserWithEmailAndPassword(auth, this.email, this.password)
      .then(userCredential => {
        console.log(userCredential.user)
        console.log('ユーザー登録ok!')
      })
        .catch((e) => {
          alert(e.message)
          console.error('error:', e)
        })
  }
</script>
```

### ハンズオン

- `section04/bookapp/pages/auth`ディレクトリを作成<br>

* `section04/bookapp/pages/auth/register.vue`ファイルを作成<br>

```vue:register.vue
<template>
  <div>
    ユーザー登録
    <br />
    <v-row>
      <v-col cols="6">
        <v-text-field v-model="email" label="メールアドレス" />
        <v-text-field v-model="password" label="パスワード" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-btn color="primary" @click="signUp">ユーザー登録する</v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn color="secondary" to="./login">ログインページ</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    signUp() {
      const auth = getAuth(this.$firebase)
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredencial) => {
          // eslint-disable-next-line no-console
          console.log(userCredencial.user)
          // eslint-disable-next-line no-console
          console.log('ユーザー登録ok!')
        })
        .catch((e) => {
          alert(e.message)
          // eslint-disable-next-line no-console
          console.error('error:', e)
        })
    },
  },
}
</script>

<style></style>
```

- localhost:3000/auth/register にアクセスしてみる<br>

* ユーザー登録してみる<br>

```browser:console
UserImpl {providerId: 'firebase', proactiveRefresh: ProactiveRefresh, reloadUserInfo: {…}, reloadListener: null, uid: 'cUegwBtHahS7jL1ndVs61TTIA4s1', …}accessToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjI3ZGRlMTAyMDAyMGI3OGZiODc2ZDdiMjVlZDhmMGE5Y2UwNmRiNGQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbnV4dC1zcGEtYm9vay1hcHAtZDVlOTAiLCJhdWQiOiJudXh0LXNwYS1ib29rLWFwcC1kNWU5MCIsImF1dGhfdGltZSI6MTY0NTM0ODYyMCwidXNlcl9pZCI6ImNVZWd3QnRIYWhTN2pMMW5kVnM2MVRUSUE0czEiLCJzdWIiOiJjVWVnd0J0SGFoUzdqTDFuZFZzNjFUVElBNHMxIiwiaWF0IjoxNjQ1MzQ4NjIwLCJleHAiOjE2NDUzNTIyMjAsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0QHRlc3QuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.vUfYzJKRODGUlZ85AF4k6zTlLTvjTJ7ZG1CT2tkHdTkirPI1VKdzYeQtnTe9Zf16xxl7WukJ6-KhZchAdE_vmEroXbpUfsrcq5fo4UbxCVREuN7u5a2AhuPZovvIAMKsE7abUIyZCoyhwdfRUCsdYPWRkxxhqsCGNDhPj78sXwCYVrEE0leVafsib0behPkcbEHAjBLiyG6b4_gsX03wZXfXBDzfu36OOTGm9GvCrv3NTCcIIxpYVaPqlUWHJgikkxPy6XiRftqIt0oQtSe1_CGjcjaa7H02Rl3xSvyO_4bMq1Kq5R6nFnNUxbCqlex3sJ6xD72VCbk7vHhVV2h6nw"auth: AuthImpl {app: FirebaseAppImpl, config: {…}, currentUser: UserImpl, emulatorConfig: null, operations: Promise, …}displayName: nullemail: "test@test.com"emailVerified: falseisAnonymous: falsemetadata: UserMetadata {createdAt: '1645348620643', lastLoginAt: '1645348620643', lastSignInTime: 'Sun, 20 Feb 2022 09:17:00 GMT', creationTime: 'Sun, 20 Feb 2022 09:17:00 GMT'}phoneNumber: nullphotoURL: nullproactiveRefresh: ProactiveRefresh {user: UserImpl, isRunning: false, timerId: null, errorBackoff: 30000}providerData: [{…}]providerId: "firebase"reloadListener: nullreloadUserInfo: {localId: 'cUegwBtHahS7jL1ndVs61TTIA4s1', email: 'test@test.com', passwordHash: 'UkVEQUNURUQ=', emailVerified: false, passwordUpdatedAt: 1645348620643, …}stsTokenManager: StsTokenManager {refreshToken: 'AIwUaOlT3B1vOCflVztigf_JjOXhCtUIy-r5YLW8RVVJjiSKf7…FW0GHC40DmGKnw5sMnqjp8XI37PnwuhbDZhrdVYfdUQq6SbAw', accessToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjI3ZGRlMTAyMDAyMGI3OG…vyO_4bMq1Kq5R6nFnNUxbCqlex3sJ6xD72VCbk7vHhVV2h6nw', expirationTime: 1645352221083}tenantId: nulluid: "cUegwBtHahS7jL1ndVs61TTIA4s1"refreshToken: (...)[[Prototype]]: Object
register.vue?2d22:39 ユーザー登録ok!
```

## 64 ログイン

### ログイン 1

`例`<br>

```
// pages/auth/login.vue
<template>
  <div>
    <v-text-field v-model="email">メールアドレス</v-text-field>
    <v-text-field v-model="password">パスワード</v-text-field>
    <v-btn @click="login">ログイン</v-btn>
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

      }
    }
  }
</script>
```

### ログイン 2

`例`<br>

```
// pages/auth/login.vue
<script>
  import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
  // 略
  login() {
    const auth = getAuth(this.$firebase)
    signInWithEmailAndPassword(auth, this.email, this.password)
      .then(userCredencial => {
        console.log(userCredencial)
        console.log('ログインok!')
      })
        .catch((e) => {
          alert(e.message)
          console.error('error:', e)
        })
  }
</script>
```

### ハンズオン

- `section04/bookapp/pages/auth/login.vue`ファイルを作成<br>

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
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    login() {
      const auth = getAuth(this.$firebase)
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredencial) => {
          // eslint-disable-next-line no-console
          console.log(userCredencial)
          // eslint-disable-next-line no-console
          console.log('ログインok!')
        })
        .catch((e) => {
          alert(e.message)
          // eslint-disable-next-line no-console
          console.error('error:', e)
        })
    },
  },
}
</script>

<style></style>
```
