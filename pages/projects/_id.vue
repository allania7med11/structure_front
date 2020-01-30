<template>
  <v-container fluid>
    <client-only>
      <v-alert v-if="error" dismissible type="error">
        An error occurred
      </v-alert>
      <app1 />
    </client-only>
  </v-container>
</template>
<script>
import { mapState, mapActions } from "vuex"
import app1 from "@/components/app1"
import { mStore } from "@/constants/static"

export default {
  components: {
    app1
  },
  computed: {
    ...mapState(["username"]),
    ...mapState(mStore.state("project", ["project", "error"]))
  },
  fetch({ store, route }) {
    store.dispatch("project/reset")
    return store.dispatch("project/aProject", { id: route.params.id })
  },
  head() {
    return {
      titleTemplate: this.project.name + "(" + this.username + ")",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "This  Beam Calculator give you diagrams , extremes , exact equations of efforts and displacements of your beam and a lot more"
        }
      ]
    }
  },
  /* mounted() {
    this.reset()
    this.aProject({ id: this.$route.params.id })
  }, */
  methods: {
    ...mapActions(mStore.getter("project", ["reset", "aProject"]))
  }
}
</script>

<style></style>
