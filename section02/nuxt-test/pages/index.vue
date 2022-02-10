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
  asyncData() {
    // eslint-disable-next-line no-console
    console.log('asyncData')
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
