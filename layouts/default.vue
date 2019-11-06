<template>
  <v-app>
    <Header />
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from "vuex"
import Header from "~/components/Header.vue"
export default {
  components: {
    Header
  },
  mounted() {
    this.login()
  },
  methods: {
    ...mapActions(["login"])
  }
}
</script>
