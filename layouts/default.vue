<template>
  <v-app>
    <Header />
    <v-content class="ma-0 pa">
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import Header from "~/components/Header.vue"
import { mapActions } from "vuex"
export default {
  components: {
    Header
  },
  mounted() {
    const log = this.login()
    console.log(log)
  },
  methods: {
    ...mapActions(["login"])
  }
}
</script>
<style>
.primary {
  background-color: #1976d2 !important;
  border-color: #1976d2 !important;
}
.warning {
  background-color: #fb8c00 !important;
  border-color: #fb8c00 !important;
}
.error {
  background-color: #ff5252 !important;
  border-color: #ff5252 !important;
}
.success {
  background-color: #4caf50 !important;
  border-color: #4caf50 !important;
}
.info {
  background-color: #2196f3 !important;
  border-color: #2196f3 !important;
}
</style>
