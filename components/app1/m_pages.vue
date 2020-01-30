<template>
  <v-layout>
    <v-flex ml-4 mt-2>
      <v-btn-toggle :key="componentKey" v-model="choice" @change="fpage">
        <v-btn text class="text-none" value="projects">
          projects
        </v-btn>
        <v-btn text class="text-none" value="define" data-cy="project">
          {{ project["name"] }}
        </v-btn>
        <v-btn text class="text-none" value="results">
          {{ results }}&nbsp;&nbsp;&nbsp;
          <v-progress-circular
            v-if="progress"
            :size="25"
            indeterminate
            color="blue darken-2"
          />
        </v-btn>
      </v-btn-toggle>
      <v-alert
        style="background-color: white"
        :value="error"
        color="error"
        icon="colors.amber.base white--text"
        outlined
      >
        {{ errorM }}
      </v-alert>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex"
import { mStore } from "@/constants/static"
export default {
  data() {
    return {
      componentKey: 0,
      error: false,
      errorM: "",
      progress: false,
      choice: "define"
    }
  },
  computed: {
    ...mapState(mStore.state("project", ["project", "page"])),
    ...mapGetters(mStore.getter("project", ["results"]))
  },
  watch: {
    results: {
      immediate: true,
      handler() {
        this.componentKey += 1
      }
    }
  },
  methods: {
    ...mapActions(mStore.getter("project", ["projectChange", "aProject"])),
    fpage() {
      if (this.choice == "projects") {
        // eslint-disable-next-line no-undef
        $nuxt.$router.push({ path: "/projects" })
      } else if (this.choice == "results") {
        let isolates = this.project.nodes.filter(
          cv => cv.N1.length == 0 && cv.N2.length == 0
        )
        if (isolates.length > 0) {
          this.errorM =
            "Isolated nodes have been found: " +
            isolates
              .sort((a, b) => a.name - b.name)
              .map(cv => String(cv.name))
              .join(",")
          this.error = true
          this.choice = "define"
        } else {
          this.errorM = ""
          this.error = false
          this.run()
        }
      } else if (this.choice == "define") {
        this.projectChange({ state: "page", value: "define" })
      }
    },
    async run() {
      if (this.results === "Solve") {
        this.progress = true
        var results = await this.$axios.$get(
          `/api/projects/${this.project.id}/run/`
        )
        if (results) {
          this.aProject({ id: this.$route.params.id })
          this.projectChange({ state: "page", value: this.choice })
        } else {
          this.errorM = "Unstable structure"
          this.error = true
          this.projectChange({ state: "page", value: "define" })
        }
        this.progress = false
      } else {
        this.projectChange({ state: "page", value: this.choice })
      }
    }
  }
}
</script>
