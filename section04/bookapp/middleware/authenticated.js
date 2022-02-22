export default function ({
  $firebase,
  store,
  route,
  redirect }) {
  const isAuthenticated = store.getters['auth/getLoggedIn']
  if (!isAuthenticated && !route.path.match(/\/auth\//)) {
    redirect('/auth/login')
  }
}
