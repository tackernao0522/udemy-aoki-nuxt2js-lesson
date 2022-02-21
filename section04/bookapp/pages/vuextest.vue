<template>
  <div>
    <v-btn @click="$store.commit('increment')">+</v-btn>
    {{ $store.state.counter }}
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>
