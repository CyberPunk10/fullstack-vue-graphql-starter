<template>
  <v-app style="background: #1a1a1c; color: #bbb">
    <v-navigation-drawer
      app
      temporary
      v-model="sideNav"
    >
      <v-toolbar
        color="accent"
        flat
      >
        <v-app-bar-nav-icon @click="sideNav = !sideNav"></v-app-bar-nav-icon>
        <router-link
          to="/"
          style="cursor: pointer"
        >
          <h1 class="title pl-3">VueShare</h1>
        </router-link>
      </v-toolbar>

      <v-divider></v-divider>

      <!-- Side navbar links -->
      <v-list>
        <v-list-item
          v-for="item in sideNavLinks"
          :key="item.title"
          :to="item.link"
          flat
          depressed
          color="primary"
        >
          <v-list-item-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            {{item.title}}
          </v-list-item-content>
        </v-list-item>

        <!-- Signout button -->
        <v-list-item
          v-if="user"
          @click="handleSignoutUser"
          to="/signin"
        >
          <v-list-item-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            Signout
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Horizontal navbar -->
    <v-app-bar
      app
      color="primary"
      flat
      class="text--text"
    >
      <!-- app title -->
      <v-app-bar-nav-icon
        @click="sideNav = !sideNav"
        color="text"
      ></v-app-bar-nav-icon>
      <v-app-bar-title class="hidden-xs-only">
        <router-link
          to="/"
          style="cursor: pointer"
        >
          <span>VueShare</span>
        </router-link>
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <!-- Search input -->
      <v-text-field
        height="100%"
        flex
        prepend-icon="search"
        placeholder="Search posts"
        class="text--text"
        color="primary"
        single-line-hide-details
      ></v-text-field>

      <v-spacer></v-spacer>

      <!-- Horizontal navbar links -->
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          v-for="item in horizontalNavItems"
          :key="item.title"
          :to="item.link"
          depressed
          color="primary"
          class="text--text"
        >
          <v-icon
            left
            class="hidden-sm-only"
          >{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>

        <!-- Profile button -->
        <v-btn
          v-if="user"
          depressed
          color="primary"
          class="text--text"
          to="/profile"
        >
          <v-icon
            class="hidden-sm-only"
            left
          >account_box</v-icon>
          <v-badge
            right
            color="accent"
          >
            <span slot="badge">1</span>
            Profile
          </v-badge>
        </v-btn>
        <!-- Signout button -->
        <v-btn
          v-if="user"
          @click="handleSignoutUser"
          depressed
          color="primary"
          class="text--text"
          to="/signin"
        >
          <v-icon
            class="hidden-sm-only"
            left
          >exit_to_app</v-icon>
          Signout
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>

      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <transition name="fade">
          <!-- If using vue-router -->
          <router-view></router-view>
        </transition>

        <!-- Auth snackbar -->
        <v-snackbar
          v-model="authSnackbar"
          :timeout="5000"
          left
        >
          <v-icon>check_circle</v-icon>
          <span>You are now signed in!</span>

          <template v-slot:action="{ attrs }">
            <v-btn
              color="pink"
              text
              v-bind="attrs"
              @click="authSnackbar = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>

        <!-- Auth error snackbar -->
        <v-snackbar
          v-if="authError"
          v-model="authErrorSnackbar"
          :timeout="5000"
          left
          color="info"
        >
          <v-icon>cancel</v-icon>
          <span>{{authError.message}}</span>

          <template v-slot:action="{ attrs }">
            <v-btn
              color="pink"
              text
              v-bind="attrs"
              to="/signin"
              @click="authSnackbar = false"
            >
              Signin
            </v-btn>
          </template>
        </v-snackbar>

      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "App",
  data() {
    return {
      sideNav: false,
      authSnackbar: false,
      authErrorSnackbar: false,
    }
  },
  watch: {
    user(newValue, oldValue) {
      // if we had no value for user before, show shackbar
      // console.log('new value', newValue)
      // console.log('old value', oldValue)
      if (oldValue === null) this.authSnackbar = true
    },
    authError(value) {
      // if auth error is not null, show auth error snackbar
      if (value !== null) {
        this.authErrorSnackbar = true
      }
    }
  },
  computed: {
    ...mapGetters(['authError', 'user']),
    horizontalNavItems() {
      let items = [
        { icon: 'chat', title: 'Posts', link: '/posts' },
        { icon: 'lock_open', title: 'Sign In', link: '/signin' },
        { icon: 'create', title: 'Sign Up', link: '/signup' },
      ]
      if (this.user) {
        items = [
          { icon: 'chat', title: 'Posts', link: '/posts' }
        ]
      }
      return items
    },
    sideNavLinks() {
      let items = [
        { icon: 'chat', title: 'Posts', link: '/posts' },
        { icon: 'lock_open', title: 'Sign In', link: '/signin' },
        { icon: 'create', title: 'Sign Up', link: '/signup' },
      ]
      if (this.user) {
        items = [
          { icon: 'chat', title: 'Posts', link: '/posts' },
          { icon: 'stars', title: 'Create post', link: '/post/add' },
          { icon: 'account_box', title: 'Profile', link: '/profile' }
        ]
      }
      return items
    }
  },
  methods: {
    handleSignoutUser() {
      this.$store.dispatch('signoutUser')
    }
  }
}
</script>

<style lang="sass">
.fade-enter-active,
.fade-leave-active
  transition-property: all
  transition-duration: .25s
.fade-enter-active
  transition-delay: .25s
.fade-enter,
.fade-leave-active
  opacity: 0
  transform: translateX(-25px)
</style>