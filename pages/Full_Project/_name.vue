<template>
  <div>
    <client-only placeholder="Loading...">
      <app1 v-if="show" />
    </client-only>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import app1 from "@/components/app1"
import { mStore } from "@/constants/static"
export default {
  components: {
    app1
  },
  data: () => ({
    show: false
  }),
  computed: {
    ...mapState(["tutorials"]),
    ...mapState(mStore.state("project", ["project"]))
  },
  async mounted() {
    const name = this.$route.params.name
    const test = await this.aTutorial(name)
    if (test) {
      this.reset()
      this.projectChange({ state: "pages", value: false })
      this.projectChange({ state: "project", value: this.tutorials[name] })
      this.projectChange({ state: "page", value: "results" })
    }
    this.show = true
  },
  methods: {
    ...mapActions(["aTutorial"]),
    ...mapActions(mStore.getter("project", ["reset", "projectChange"]))
  }
}
</script>

<style></style>
