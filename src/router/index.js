import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import EventService from '@/services/EventService'
import GStore from '@/store'
import EventList from '@/views/EventList.vue'
import EventLayout from '@/views/event/Layout.vue'
import EventDetails from '@/views/event/Details.vue'
import EventRegister from '@/views/event/Register.vue'
import EventEdit from '@/views/event/Edit.vue'
const AboutView = () =>
  import(/* webpackChunkName: "about" */ '@/views/AboutView.vue')
const NotFound = () =>
  import(/* webpackChunkName: "notFound" */ '@/views/NotFound.vue')
const NetworkError = () =>
  import(/* webpackChunkName: "networkError" */ '@/views/NetworkError.vue')

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: (route) => ({ page: parseInt(route.query.page) || 1 }),
  },
  {
    path: '/events/:id',
    name: 'EventLayout',
    props: true,
    component: EventLayout,
    redirect: { name: 'EventDetails' },
    beforeEnter: (to) => {
      return EventService.getEvent(to.params.id)
        .then((response) => {
          GStore.event = response.data
        })
        .catch((error) => {
          if (error.response && error.response.status == 404) {
            return {
              name: '404Resource',
              params: { resource: 'event' },
            }
          } else {
            return { name: 'NetworkError' }
          }
        })
    },
    children: [
      {
        path: '',
        name: 'EventDetails',
        component: EventDetails,
      },
      {
        path: 'register',
        name: 'EventRegister',
        component: EventRegister,
      },
      {
        path: 'edit',
        name: 'EventEdit',
        component: EventEdit,
        meta: { requireAuth: true },
      },
    ],
  },
  {
    path: '/event/:afterEvent(.*)',
    redirect: (to) => {
      return { path: '/events/' + to.params.afterEvent }
    },
  },
  {
    path: '/about-us',
    name: 'About',
    component: AboutView,
  },
  {
    path: '/about',
    redirect: { name: 'About' },
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true,
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetworkError,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

router.beforeEach((to, from) => {
  NProgress.start()
  const notAuthorized = true //just for testing
  if (to.meta.requireAuth && notAuthorized) {
    GStore.flashMessage = 'Sorry, you are not authorized to view this page'
    setTimeout(() => {
      GStore.flashMessage = ''
    }, 3000)
    if (from.href) {
      return false
    } else {
      return { path: '/' }
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})

export default router
