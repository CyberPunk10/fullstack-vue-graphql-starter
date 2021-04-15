<template>
  <v-alert
    type="error"
    color="error"
    icon="warning"
    :value="true"
    dismissible
  >
    <h3>{{message}}</h3>
  </v-alert>
</template>

<script>
export default {
  props: ['message']
}
</script>

<style lang="sass">
</style>