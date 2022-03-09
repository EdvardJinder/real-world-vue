import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '@/views/AboutView.vue'
import EventList from '@/views/EventList.vue'
import EventDetails from '@/views/EventDetails.vue'
import EventCreate from '@/views/EventCreate.vue'
import ErrorDisplay from '@/views/ErrorDisplay.vue'
const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
  },
  {
    path: '/event/:id',
    name: 'EventDetails',
    component: EventDetails,
    props: true,
  },
  {
    path: '/event/create',
    name: 'EventCreate',
    component: EventCreate,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
  },
  {
    path: '/error/:error',
    name: 'ErrorDisplay',
    props: true,
    component: ErrorDisplay,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
