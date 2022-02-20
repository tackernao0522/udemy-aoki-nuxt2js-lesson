<template>
  <div>
    データの表示<br />
    <div v-for="(task, index) in tasks" :key="index">
      id: {{ task.id }} / title: {{ task.title }}
    </div>
  </div>
</template>

<script>
import { getFirestore, collection, getDocs } from 'firebase/firestore'

export default {
  data() {
    return {
      tasks: [],
    }
  },
  async created() {
    try {
      const db = getFirestore(this.$firebase)
      const querySnapshot = await getDocs(collection(db, 'tasks'))

      querySnapshot.forEach((doc) => {
        this.tasks.push(doc.data())
        // eslint-disable-next-line no-console
        console.log(doc.id, doc.data())
        // eslint-disable-next-line no-console
        console.log(doc.data().id)
        // eslint-disable-next-line no-console
        console.log(doc.data().title)
      })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('error:', e)
    }
  },
}
</script>

<style>
</style>
