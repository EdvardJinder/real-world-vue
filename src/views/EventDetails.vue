<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'EventDetails',
  props: ['id'],
  created() {
    this.$store.dispatch('fetchEvent', this.id).catch((error) => {
      this.$router.push({
        name: 'ErrorDisplay',
        params: { error: error },
      })
    })
  },
  computed: {
    // event() {
    //   return this.$store.state.event
    // },
    ...mapGetters(['event']),
  },
}
</script>

<style></style>
