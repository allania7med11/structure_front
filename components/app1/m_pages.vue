<template>
  <v-layout>
    <v-flex ml-4 mt-2>
      <v-btn-toggle
        :key="componentKey"
        v-model="choice"
        @change="fpage"
      > 
        <v-btn
          text
          class="text-none"
          value="define"
        >
          {{ project["name"] }}
        </v-btn>
        <v-btn
          text
          class="text-none"
          value="results"
        >
          {{ results }}&nbsp;&nbsp;&nbsp;
          <v-progress-circular
            v-if="progress"
            :size="25"
            indeterminate
            color="primary"
          />
        </v-btn>
      </v-btn-toggle>
      <v-alert
        style="background-color: white"
        :value="error"
        color="error"
        icon="warning"
        outlined
      >
        {{ errorM }}
      </v-alert>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState,mapActions } from 'vuex'
export default {
  data() {
    return {
      componentKey: 0,
      error: false,
      errorM: "",
      results: "Solve",
      progress: false,
      choice: "define",
    };
  },
  methods: {
    ...mapActions(['stateChange','aProject']),
    console(val) {
      console.log(val);
    },
    fpage() {
      if (this.choice == "results") {
        let isolates = this.project.nodes.filter(
          cv => cv.N1.length == 0 && cv.N2.length == 0
        );
        if (isolates.length > 0) {
          this.errorM =
            "Isolated nodes have been found: " +
            isolates
              .sort((a, b) => a.name - b.name)
              .map(cv => String(cv.name))
              .join(",");
          this.error = true;
          this.choice = "define";
          this.componentKey += 1;
        } else {
          this.errorM = "";
          this.error = false;
          this.run();
        }
      } else if (this.choice == "define") {
        this.stateChange({ state: "page", value: "define" })
        this.results = "Solve";
      }
    },
    async run() {
      this.progress = true;
      // var results= await this.$axios.$get(`/api/projects/${this.project.id}/run/`)
      var results= true
      if (results) {
        console.log(results)
        this.aProject({id:this.$route.params.id})
        this.results = "Results";
        this.stateChange({ state: "page", value: this.choice });
      } else {
        this.errorM = "Unstable structure";
        this.error = true;
        this.stateChange({ state: "page", value: "define" });
        this.componentKey += 1;
      }
      this.progress = false;
    }
  },
  computed: {
    ...mapState(['project','page']),
  }
};
</script>
