<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <nav>
      <router-link :to="{ name: 'EventDetails' }">Details</router-link>
      |
      <router-link :to="{ name: 'EventRegister' }">Register</router-link>
      |
      <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
    </nav>
    <router-view :event="event" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'EventLayout',
  props: ['id'],
  created() {
    this.$store.dispatch('fetchEvent', this.id).catch((error) => {
      this.$router.push({
        name: 'NetworkError',
        params: { error: error },
      })
    })
  },
  computed: {
    ...mapGetters(['event']),
  },
}
</script>

<style></style>
