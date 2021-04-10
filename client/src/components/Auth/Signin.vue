<template>
  <v-container text-center>
    <v-layout
      row
      wrap
    >
      <v-flex
        xs-12
        sm6
        offset-sm3
      >
        <h1>Sign in</h1>
        <v-card color="primary">
          <v-container>
            <v-form @submit.prevent="handleSigninUser">
              <v-layout>
                <v-flex>
                  <v-text-field
                    label="username"
                    prepend-icon="face"
                    type="text"
                    required
                    v-model="username"
                  >
                  </v-text-field>
                </v-flex>
              </v-layout>

              <v-layout>
                <v-flex>
                  <v-text-field
                    label="Password"
                    prepend-icon="extension"
                    type="password"
                    required
                    v-model="password"
                  >
                  </v-text-field>
                </v-flex>
              </v-layout>

              <v-layout>
                <v-flex>
                  <v-btn
                    color="accent"
                    type="submit"
                  >
                    Signin
                  </v-btn>
                  <h3>Don't have an account?
                    <router-link
                      to="signup"
                      style="color: gray"
                    >Signup</router-link>
                  </h3>
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Signin',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters(['user']),

  },
  watch: {
    user(value) {
      // if user value changes, redirect to home page
      if (value) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    handleSigninUser() {
      this.$store.dispatch('signinUser', {
        username: this.username,
        password: this.password
      })
    }
  }

}
</script>

<style lang="sass">
</style>