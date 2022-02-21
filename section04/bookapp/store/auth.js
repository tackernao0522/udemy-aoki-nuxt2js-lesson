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

}

export const getters = {
  // getLoggedIn(state) {
  //   return !!state.isLoggedIn
  // }
  getLoggedIn: state => !!state.isLoggedIn,
  getUserUid: state => state.userUid,
  getEmail: state => state.email,
}
