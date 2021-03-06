import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import '@babel/polyfill'

import ApolloClient from "apollo-boost"
import VueApollo from "vue-apollo"

Vue.use(VueApollo)

// Setup ApolloClient
export const defaultClient = new ApolloClient({ // exoprt for vuex
  uri: "http://localhost:4000/graphql",

  // include auth token with request made to backend
  fetchOption: {
    credentials: 'include'
  },
  request: operations => {
    // if no token wich key of 'token' in localStorage, add it
    if (!localStorage.token) {
      localStorage.setItem('token', '')
    }

    // operarion adds the token to an authorization header, which is sent to backend
    operations.setContext({
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
      }
    }
  }
})

const apolloProvider = new VueApollo({ defaultClient })

Vue.config.productionTip = false

new Vue({
  provide: apolloProvider.provide(),
  // apolloProvider,
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    // execute getCurrentUser query
    this.$store.dispatch('getCurrentUser')
  }
}).$mount('#app')
