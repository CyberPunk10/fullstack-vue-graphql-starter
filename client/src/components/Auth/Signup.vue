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
        <h1>Sign up</h1>

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

        <!-- Signup form -->
        <v-card color="accent">
          <v-container>
            <v-form
              @submit.prevent="handleSignupUser"
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
                    label="Email"
                    prepend-icon="email"
                    type="email"
                    required
                    v-model="email"
                    :rules="emailRules"
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
                  <v-text-field
                    label="Confirm Password"
                    prepend-icon="gavel"
                    type="password"
                    required
                    v-model="passwordConfirmation"
                    :rules="passwordRules"
                  >
                  </v-text-field>
                </v-flex>
              </v-layout>

              <v-layout>
                <v-flex>

                  <v-btn
                    color="info"
                    type="submit"
                    :loading="loading"
                    :disabled="!isFormValid || loading"
                  > Signup
                  </v-btn>

                  <h3>Already have an account?
                    <router-link to="signin">Signin</router-link>
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
  name: 'Signup',
  data() {
    return {
      isFormValid: true,
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      usernameRules: [
        username => !!username || 'Username is required',
        username => username.length >= 4 || "Username must be at least 3 characters"
      ],
      emailRules: [
        email => !!email || 'Email is required',
        email => /.@+./.test(email) || "Email must be valid"
      ],
      passwordRules: [
        password => !!password || 'Password is required',
        password => password.length >= 5 || "Password must be at least 4 characters",
        confirmation => confirmation === this.password || 'Passwords must match'
      ]
    }
  },
  watch: {
    user(value) {
      // if user value changes, redirect to home page
      if (value !== null) {
        this.$router.push('/')
      }
    }
  },
  computed: {
    ...mapGetters(['loading', 'error', 'user'])
  },
  methods: {
    handleSignupUser() {
      if (this.$refs.form.validate()) {
        // signup user action
        this.$store.dispatch('signupUser', {
          username: this.username,
          email: this.email,
          password: this.password
        })

      }
    }
  }

}
</script>

<style lang="sass">
</style>