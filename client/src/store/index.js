import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

import { GET_POSTS, SIGNIN_USER, SIGNUP_USER, GET_CURRENT_USER, ADD_POST } from '../queries'
import { defaultClient as apolloClient } from '../main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    posts: [],
    loading: false,
    error: null,
    authSnackbar: null,
    authError: null,
    authErrorSnackbar: false
  },
  mutations: {
    setUser: (state, payload) => {
      state.user = payload
    },
    setPosts: (state, payload) => {
      state.posts = payload
    },
    setLoading: (state, payload) => {
      state.loading = payload
    },
    setError: (state, payload) => {
      state.error = payload
    },
    setAuthError: (state, payload) => {
      state.authError = payload
    },
    clearUser: (state) => (state.user = null),
    clearError: (state) => (state.error = null),
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
    signupUser: ({ commit }, payload) => {
      commit('clearError')
      commit('setLoading', true)
      apolloClient
        .mutate({
          mutation: SIGNUP_USER,
          variables: payload
        })
        .then(({ data }) => {
          localStorage.setItem('token', data.signupUser.token)
          // to make sure created method is run in main.js (we run getCurrentUser), reload the page
          router.go()
        })
        .catch(error => {
          commit('setError', error)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    signinUser: ({ commit }, payload) => {
      commit('clearError')
      commit('setLoading', true)
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
          // console.log(error)
          commit('setError', error)
        })
        .finally(() => {
          commit('setLoading', false)
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
    },
    addPost: ({ commit }, payload) => {
      console.log('payload', payload)
      commit('setLoading', true)
      apolloClient
        .mutate({
          mutation: ADD_POST,
          variables: payload
        })
        .then(({ data }) => {
          // localStorage.setItem('token', data.signinUser.token)
          // to make sure created method is run in main.js (we run getCurrentUser), reload the page
          // router.go()
          console.log(data.addPost)
        })
        .catch(error => {
          commit('setError', error)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    }
  },
  modules: {
  },
  getters: {
    user: state => state.user,
    posts: state => state.posts,
    loading: state => state.loading,
    error: state => state.error,
    authSnackbar: state => state.authSnackbar,
    authError: state => state.authError,
    authErrorSnackbar: state => state.authErrorSnackbar,
  }
})
