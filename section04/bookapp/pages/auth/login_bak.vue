<template>
  <div>
    ログイン<br />
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

<style>
</style>
