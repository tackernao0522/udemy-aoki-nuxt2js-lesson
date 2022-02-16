<template>
  <div>
    book/edit/_id<br />
    {{ $route.params.id }}
    {{ books }}
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
