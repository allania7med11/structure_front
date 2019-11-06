<template>
  <client-only placeholder="Loading...">
    <div>
      <v-alert v-if="error" dismissible type="error">
        An error occurred
      </v-alert>
      <us_table />
      <us_form />
    </div>
  </client-only>
</template>
<script>
import us_table from "@/components/us_table.vue"
import us_form from "@/components/us_form.vue"
import { mapActions } from "vuex"
import { mStore } from "@/constants/static"
export default {
  components: {
    us_table,
    us_form
  },
  mounted() {
    this.aProjects()
  },
  methods: {
    ...mapActions(mStore.getter("projects", ["aProjects"]))
  }
}
</script>
