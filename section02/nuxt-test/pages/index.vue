<template>
  <div>
    index<br />
    <NuxtLink to="/about">about</NuxtLink>
    <NuxtLogo />
    <BaseHeader />
  </div>
</template>

<script>
export default {
  asyncData({ route, isDev, app, $axios }) {
    // eslint-disable-next-line no-console
    console.log('asyncData')
    // eslint-disable-next-line no-console
    console.log('route.name:', route.name)
    // eslint-disable-next-line no-console
    console.log('isDev:', isDev)
    // eslint-disable-next-line no-console
    console.log('app:', app)
    // eslint-disable-next-line no-console
    console.log('app.$axios:', app.$axios)
    // eslint-disable-next-line no-console
    console.log('$axios:', $axios)
    // eslint-disable-next-line no-console
    console.log('==================')
  },
  fetch(context) {
    // eslint-disable-next-line no-console
    console.log('fetch')
    // eslint-disable-next-line no-console
    console.log(context.route.name)
  },
  created() {
    // eslint-disable-next-line no-console
    console.log('created')
  },
}
</script>
