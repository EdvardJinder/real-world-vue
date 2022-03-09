import { createStore } from 'vuex'
import EventService from '@/services/EventService'
export default createStore({
  state: {
    user: 'Edvard Jinder',
    page: 1,
    events: [],
    event: {},
  },
  getters: {
    events(state) {
      return state.events
    },
    event(state) {
      return state.event
    },
    page(state) {
      return state.page
    },
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENT(state, event) {
      state.event = event
    },
  },
  actions: {
    createEvent({ commit }, event) {
      EventService.postEvent(event)
        .then(() => {
          commit('ADD_EVENT', event)
        })
        .catch((error) => {
          throw error
        })
    },
    fetchEvents({ commit }, perPage, page) {
      return EventService.getEvents(perPage, page)
        .then((response) => {
          commit('SET_EVENTS', response.data)
        })
        .catch((error) => {
          throw error
        })
    },
    fetchEvent({ commit, state }, id) {
      //checking if event exists within state to avoid API call
      const existingEvent = state.events.find((event) => event.id === id)
      if (existingEvent) {
        commit('SET_EVENT', existingEvent)
      } else {
        // event did not exist in state -> make API call to get event
        return EventService.getEvent(id)
          .then((response) => {
            commit('SET_EVENT', response.data)
          })
          .catch((error) => {
            throw error
          })
      }
    },
  },
  modules: {},
})
