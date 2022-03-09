<template>
  <h1>Events For Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="pagination">
      <!-- <router-link
        id="page-prev"
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        >&#60; Previous</router-link
      >
      <router-link
        id="page-next"
        :to="{ name: 'EventList', query: { setPage: -1 } }"
        rel="next"
        >Next &#62;</router-link
      > -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue'
import { mapGetters } from 'vuex'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'EventList',
  components: {
    EventCard,
  },
  created() {
    this.$store.dispatch('fetchEvents', 4, this.page).catch((error) => {
      this.$router.push({
        name: 'NetworkError',
        params: { error: error },
      })
    })
  },
  computed: {
    ...mapGetters(['page', 'events']),
  },
  //  beforeRouteEnter(routeTo, routeFrom, next) {
  //   EventService.getEvents(2, parseInt(routeTo.query.page) || 1)
  //     .then((response) => {
  //       next((vm) => {
  //         vm.events = response.data
  //         vm.totalEvents = response.headers['x-total-count']
  //       })
  //     })
  //     .catch(() => {
  //       next({ name: 'NetworkError' })
  //     })
  // },
  // beforeRouteUpdate(routeTo) {
  //   return EventService.getEvents(2, parseInt(routeTo.query.page) || 1)
  //     .then((response) => {
  //       this.events = response.data
  //       this.totalEvents = response.headers['x-total-count']
  //     })
  //     .catch(() => {
  //       return { name: 'NetworkError' }
  //     })
  // },
  // computed: {
  //   hasNextPage() {
  //     var totalPages = Math.ceil(this.totalEvents / 2)

  //     return this.page < totalPages
  //   },
  // },
}
</script>
<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
#page-prev {
  text-align: left;
}
#page-next {
  text-align: right;
}
</style>
