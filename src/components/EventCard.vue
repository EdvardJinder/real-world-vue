<template>
  <div class="card">
    <span>{{ event.time }} on {{ event.date }}</span>
    <h4>{{ event.title }}</h4>
  </div>
</template>

<script>
export default {
  name: 'EventCard',
  props: {
    event: Object,
  },
}
</script>

<style scoped>
.card {
  padding: 20px 30px 20px 30px;
  border: 2px solid #2c3e50;
  margin-bottom: 10px;
}
</style>
