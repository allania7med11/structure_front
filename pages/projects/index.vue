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
import { mapState } from "vuex"
export default {
  components: {
    us_table,
    us_form
  },
  computed: {
    ...mapState(["projects", "error"])
  }
}
</script>
