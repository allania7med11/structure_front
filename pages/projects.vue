<template>
  <div>
    <client-only>
      <div class="pt-6">
        <v-alert v-if="error" dismissible type="error">
          An error occurred
        </v-alert>
        <us_table />
        <us_form />
      </div>
    </client-only>
  </div>
</template>
<script>
import us_table from "@/components/us_table.vue"
import us_form from "@/components/us_form.vue"
import { mapState, mapActions } from "vuex"
import { mStore } from "@/constants/static"
export default {
  middleware: "authenticated",
  components: {
    us_table,
    us_form
  },
  computed: {
    ...mapState(["username"]),
    ...mapState(mStore.state("projects", ["error"]))
  },
  mounted() {
    this.aProjects()
  },
  head() {
    return {
      titleTemplate: "List of projects(" + this.username + ")",
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
  methods: {
    ...mapActions(mStore.getter("projects", ["aProjects"]))
  }
}
</script>
