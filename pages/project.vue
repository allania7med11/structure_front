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
import { mapState } from "vuex"
import app1 from "@/components/app1"
import { mStore } from "@/constants/static"

export default {
  middleware: ["authenticated", "project"],
  components: {
    app1
  },
  computed: {
    ...mapState(["username"]),
    ...mapState(mStore.state("project", ["project", "error"]))
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
  }
}
</script>

<style></style>
