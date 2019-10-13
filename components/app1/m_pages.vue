<template>
  <v-layout>
    <v-flex ml-4 mt-2>
      <v-btn-toggle
        :key="componentKey"
        v-model="page"
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
      progress: false
    };
  },
  methods: {
    ...mapActions(['stateChange']),
    console(val) {
      console.log(val);
    },
    fpage() {
      if (this.page == "results") {
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
          this.page = "define";
          this.componentKey += 1;
        } else {
          this.errorM = "";
          this.error = false;
          this.run();
        }
      } else if (this.page == "define") {
        this.stateChange({ state: "page", value: this.page })
        this.results = "Solve";
      }
    },
    async run() {
      this.progress = true;
      let response = {};
      let rtn = [];
      /* response = await this.$apollo.mutate(
        mutateServer("run", "RunInput!", { id: this.project.id }, query)
      ); */

      rtn = response.data["run"]["rtn"];
      if (rtn) {
        /* await this.$apollo.mutate(
          argMutate("stateChange", { state: "project", value: rtn })
        );
        this.$apollo.mutate(
          argMutate("stateChange", { state: "page", value: this.page })
        ); */
        this.results = "Results";
      } else {
        this.errorM = "Unstable structure";
        this.error = true;
        this.page = "define";
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
