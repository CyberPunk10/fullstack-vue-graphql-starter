<template>
  <v-container text-center>
    <v-layout
      row
      wrap
    >
      <v-flex xs-12>
        <h1>Add post</h1>

        <!-- Add post form -->
        <v-card color="accent">
          <v-container>
            <v-form
              @submit.prevent="handleAddPost"
              v-model="isFormValid"
              lazy-validation
              ref="form"
            >
              <!-- Title input -->
              <v-layout>
                <v-flex>
                  <v-text-field
                    label="Post title"
                    type="text"
                    required
                    v-model="title"
                    :rules="titleRules"
                  >
                  </v-text-field>
                </v-flex>
              </v-layout>

              <!-- Image url input -->
              <v-layout>
                <v-flex>
                  <v-text-field
                    label="Image url"
                    type="text"
                    required
                    v-model="imageUrl"
                    :rules="imageUrlRules"
                  >
                  </v-text-field>
                </v-flex>
              </v-layout>

              <!-- Image preview -->
              <v-layout>
                <v-flex xs12>
                  <img
                    :src="imageUrl"
                    height="300px"
                  >
                </v-flex>
              </v-layout>

              <!-- Categories Select -->
              <v-layout>
                <v-flex xs12>
                  <v-select
                    v-model="categories"
                    :items="['Art', 'Education', 'Travel', 'Photography', 'Technology']"
                    multiple
                    label="Categories"
                    :rules="categoriesRules"
                  ></v-select>
                </v-flex>
              </v-layout>

              <!-- Description Text Area -->
              <v-layout>
                <v-flex xs12>
                  <v-textarea
                    :rules="descRules"
                    v-model="description"
                    label="Description"
                    type="text"
                    required
                  >

                  </v-textarea>
                </v-flex>
              </v-layout>

              <v-layout>
                <v-flex>
                  <v-btn
                    color="info"
                    type="submit"
                    :loading="loading"
                    :disabled="!isFormValid || loading"
                  > Submit
                  </v-btn>
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
  name: 'AddPost',
  data() {
    return {
      isFormValid: true,
      title: '',
      imageUrl: '',
      categories: [],
      description: '',
      titleRules: [
        title => !!title || 'Title is required'
      ],
      imageUrlRules: [
        imageUrl => !!imageUrl || 'Image url is required',
      ],
      categoriesRules: [
        categories => categories.length >= 0 || 'At least one category is required',
      ],
      descRules: [
        desc => !!desc || 'Description is required',
        desc => desc.length < 200 || "Description must have less than 200 characters"
      ],
    }
  },
  computed: {
    ...mapGetters(['loading', 'user'])
  },
  methods: {
    handleAddPost() {
      if (this.$refs.form.validate()) {
        // add post action
        this.$store.dispatch('addPost', {
          title: this.title,
          imageUrl: this.imageUrl,
          categories: this.categories,
          description: this.description,
          creatorId: this.user._id
        })
        this.$router.push('/')
      }
    }
  }

}
</script>

<style lang="sass">
</style>