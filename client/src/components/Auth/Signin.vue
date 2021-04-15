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

        <!-- Error alert -->
        <v-layout
          v-if="error"
          row
          wrap
        >
          <v-flex>
            <AlertForm :message="error.message"></AlertForm>
          </v-flex>
        </v-layout>
        <!-- Signin form -->
        <v-card color="primary">
          <v-container>
            <v-form
              @submit.prevent="handleSigninUser"
              v-model="isFormValid"
              lazy-validation
              ref="form"
            >
              <v-layout>
                <v-flex>
                  <v-text-field
                    label="username"
                    prepend-icon="face"
                    type="text"
                    required
                    v-model="username"
                    :rules="usernameRules"
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
                    :rules="passwordRules"
                  >
                  </v-text-field>
                </v-flex>
              </v-layout>

              <v-layout>
                <v-flex>

                  <v-btn
                    color="accent"
                    type="submit"
                    :loading="loading"
                    :disabled="!isFormValid || loading"
                  > Signin
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
      password: '',
      usernameRules: [
        username => !!username || "Username is required",
        username => username.length >= 4 || "Username must be less than characters"
      ],
      passwordRules: [
        password => !!password || "Password is required",
        password => password.length >= 4 || "Password must be less than characters"

      ],
      isFormValid: false,
    }
  },
  computed: {
    ...mapGetters(['loading', 'error', 'user']),

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
      if (this.$refs.form.validate()) {
        this.$store.dispatch('signinUser', {
          username: this.username,
          password: this.password
        })
      }
    }
  }
}
</script>

<style lang="sass">
</style>