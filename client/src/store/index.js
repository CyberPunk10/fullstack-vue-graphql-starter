import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

import { GET_POSTS, SIGNIN_USER, GET_CURRENT_USER } from '../queries'
import { defaultClient as apolloClient } from '../main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    posts: [],
    loading: false
  },
  mutations: {
    setUser: (state, payload) => {
      state.user = payload
    },
    clearUser: (state) => (state.user = null),
    setPosts: (state, payload) => {
      state.posts = payload
    },
    setLoading: (state, payload) => {
      state.loading = payload
    }
  },
  actions: {
    getCurrentUser: ({ commit }) => {
      commit('setLoading', true)
      apolloClient
        .query({
          query: GET_CURRENT_USER
        })
        .then(({ data }) => {
          // Add user data to state
          commit('setUser', data.getCurrentUser)
          console.log(data.getCurrentUser)
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          commit('setLoading', false)
        })

    },
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
    },
    signinUser: ({ commit }, payload) => {
      // clear token to prevent errors (if maltormed)
      localStorage.setItem('token', '')
      apolloClient
        .mutate({
          mutation: SIGNIN_USER,
          variables: payload
        })
        .then(({ data }) => {
          localStorage.setItem('token', data.signinUser.token)
          // to make sure created method is run in main.js (we run getCurrentUser), reload the page
          router.go()
        })
        .catch(error => {
          console.log(error)
        })
    },
    signoutUser: async ({ commit }) => {
      // clear user in state
      commit('clearUser')
      // remove token in localStorage
      localStorage.setItem('token', '') // localStorage.removeItem('token')
      // and sesion
      await apolloClient.resetStore()
      // redirect from private pages to promo page
      router.push('/')
    }
  },
  modules: {
  },
  getters: {
    user: state => state.user,
    posts: state => state.posts,
    loading: state => state.loading
  }
})
