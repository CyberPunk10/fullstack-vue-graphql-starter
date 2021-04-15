import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import '@babel/polyfill'

import ApolloClient from "apollo-boost"
import VueApollo from "vue-apollo"

import AlertForm from "./components/Shared/AlertForm.vue"

// Register global component
Vue.component('AlertForm', AlertForm)

Vue.use(VueApollo)

// Setup ApolloClient
export const defaultClient = new ApolloClient({ // exoprt for vuex
  uri: "http://localhost:4000/graphql",

  request: operations => {
    // if no token wich key of 'token' in localStorage, add it
    if (!localStorage.token) {
      localStorage.setItem('token', '')
    }

    // operarion adds the token to an authorization header, which is sent to backend
    operations.setContext({
      // include auth token with request made to backend
      fetchOption: {
        credentials: 'include'
      },
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
  },

  onError: ({ graphQLErrors, networkError }) => {
    if (networkError) {
      console.log('[networkError]', networkError)
    }
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        console.dir(err)
        if (err.name === 'AuthenticationError') {
          // set auth error in state (to show in snackbar)
          store.commit('setAuthError', err)
          // signout uset (to clear token)
          store.dispatch('signoutUser')
        }
      }
    }
  }
})

const apolloProvider = new VueApollo({ defaultClient })

Vue.config.productionTip = false

new Vue({
  // provide: apolloProvider.provide(),
  apolloProvider,
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    // execute getCurrentUser query
    this.$store.dispatch('getCurrentUser')
  }
}).$mount('#app')
