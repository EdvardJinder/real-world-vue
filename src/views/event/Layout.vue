<template>
  <div v-if="GStore.event">
    <h1>{{ GStore.title }}</h1>
    <nav>
      <router-link :to="{ name: 'EventDetails' }">Details</router-link>
      |
      <router-link :to="{ name: 'EventRegister' }">Register</router-link>
      |
      <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
    </nav>
    <router-view :event="GStore.event" />
  </div>
</template>

<script>
export default {
  name: 'EventLayout',
  inject: ['GStore'],
}
</script>

<style></style>
