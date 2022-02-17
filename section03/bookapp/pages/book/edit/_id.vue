<template>
  <div>
    book/edit/_id<br />
    {{ $route.params.id }}
    {{ books }}
    {{ books[$route.params.id]. title }}
  </div>
</template>

<script>
export default {
  props: {
    books: {
      type: Array,
      default: () => {}
    }
  }
}
</script>

<style>
</style>
