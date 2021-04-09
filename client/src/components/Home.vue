<template>
  <div class="class">
    <v-container text-center>

      <!-- EXAMPLE 4 (from vuex) -->
      <v-dialog
        v-model="loading"
        persistent
      >
        <v-progress-circular
          indeterminate
          :size="70"
          :width="7"
          color="accent"
        ></v-progress-circular>
      </v-dialog>

      <v-carousel
        v-bind="{'cycle': true}"
        interval="3000"
        v-if="!loading && posts.length > 0"
      >
        <v-carousel-item
          v-for="post in posts"
          :key="post._id"
          :src="post.imageUrl"
        >
          <h1 id="carousel__title">{{post.title}}</h1>
        </v-carousel-item>
      </v-carousel>

      <!-- EXAMPLE 3 -->
      <!-- <v-flex
        xs12
        v-if="getPosts"
      >
        <v-carousel
          v-bind="{'cycle': true}"
          interval="3000"
        >
          <v-carousel-item
            v-for="post in getPosts"
            :key="post._id"
            :src="post.imageUrl"
          >
            <h1 id="carousel__title">{{post.title}}</h1>
          </v-carousel-item>
        </v-carousel>
      </v-flex> -->

      <!-- EXAMPLE 2 -->
      <!-- <ApolloQuery :query="getPosts">
        <template v-slot="{ result: { loading, error, data, networkStatus } }"> -->
      <!-- Loading -->
      <!-- <div
            v-if="loading"
            class="loading apollo"
          >Loading...</div> -->

      <!-- Error -->
      <!-- <div
            v-else-if="error"
            class="error apollo"
          >An error occurred. Error message: {{error.message}}</div> -->

      <!-- Result -->
      <!-- <ul
            v-else-if="data"
            class="result apollo"
          >
            <li
              v-for="post in data.getPosts"
              :key="post._id"
            >
              {{post.title}}
              {{post.description}}
              {{post._id}}
              {{post.createdBy._id}}
            </li>
          </ul> -->

      <!-- No result -->
      <!-- <div
            v-else
            class="no-result apollo"
          >No result :(</div> -->

      <!-- networkStatus -->
      <!-- networkStatus: {{ networkStatus }}
        </template>
      </ApolloQuery> -->

      <!-- EXAMPLE 1 -->
      <!-- <div v-if="$apollo.loading">Loading...</div>
      <ul v-else>
        <li
          v-for="post in getPosts"
          :key="post._id"
        >
          {{post.title}}
          {{post.description}}
          {{post._id}}
          {{post.createdBy._id}}
        </li>
      </ul> -->
    </v-container>
  </div>
</template>

<script>
import { gql } from 'apollo-boost' // for EXAMPLE 1, 2
import { mapGetters } from 'vuex'

export default {
  name: "home",
  created() {
    this.getCarouselPosts()
  },
  data() {
    return {
      // for EXAMPLE 1
      // posts: []

      // for EXAMPLE 2
      getPosts: gql`
        query {
          getPosts {
            _id
            title
            description
            imageUrl
            categories
            createdDate
            likes
            createdBy {
              _id
              username
              email
              joinDate
              password
            }
          }
        }
      `
    }
  },

  computed: {
    // from vuex for EXAMPLE 4
    ...mapGetters(['loading', 'posts'])
  },
  // <!-- EXAMPLE 1, 3 -->
  apollo: {
    getPosts: {
      query: gql`
        query {
          getPosts {
            _id
            title
            description
            imageUrl
            categories
            createdDate
            likes
            createdBy {
              _id
              username
              email
              joinDate
              password
            }
          }
        }
      `,
      result({ data, loading }) {
        if (!loading) {
          this.posts = data.getPosts
        }
      },
      error(err) {
        console.error('[error]', err)
      }
    }
  },

  methods: {
    getCarouselPosts() {
      // reach out to Vuex store, fire action that gets posts for carousel
      this.$store.dispatch('getPosts')
    }
  }
}
</script>

<style lang="sass">
#carousel__title
  position: absolute
  left: 0
  right: 0
  bottom: 50px
  background-color: rgba(0,0,0,.3)
  color: white
  border-radius: 5px 5px 0 0
  padding: 1rem .5rem .5rem
  margin: 0 auto
</style>