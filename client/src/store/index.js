import Vue from 'vue'
import Vuex from 'vuex'

import { GET_POSTS } from '../queries'
import { defaultClient as apolloClient } from '../main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    loading: false
  },
  mutations: {
    setPosts: (state, payload) => {
      state.posts = payload
    },
    setLoading: (state, payload) => {
      state.loading = payload
    }
  },
  actions: {
    getPosts: ({ commit }) => {
      commit('setLoading', true)
      // use ApolloClient to fire getPosts query
      apolloClient
        .query({
          query: GET_POSTS
        })
        .then(({ data }) => {
          // console.log(data.getPosts)
          // Get data from actions to state via mutations
          commit('setPosts', data.getPosts)
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    }
  },
  modules: {
  },
  getters: {
    posts: state => state.posts,
    loading: state => state.loading
  }
})
