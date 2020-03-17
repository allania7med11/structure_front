<template>
  <v-flex xs12 md6 pa-0 ma-1>
    <div class="wrapper">
      <v-container fluid>
        <v-layout>
          <v-flex mx-1>
            <v-select
              v-model="cdn"
              :items="cdnItems"
              item-text="label"
              item-value="name"
              attach
              chips
              label="Node(Infs)"
              multiple
            />
          </v-flex>
          <v-flex mx-1>
            <v-select
              v-model="cdb"
              :items="cdbItems"
              item-text="label"
              item-value="name"
              attach
              chips
              label="Bar(Infs)"
              multiple
            />
          </v-flex>
          <v-flex mx-1>
            <v-btn small fab class="elevation-1" color="success" @click="save">
              <Fas i="eye" />
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
      <chart
        v-if="rcht != null"
        :height="250"
        :chartdata="rcht.data"
        :options="rcht.options"
        data-cy="chart"
      />
    </div>
  </v-flex>
</template>

<script>
import { mapState } from "vuex"
import { mStore } from "@/constants/static"
import chart from "./cps/chart"
import { DChfn } from "@/constants/app1/chart"
export default {
  components: {
    chart
  },
  data: () => ({
    id: 1,
    cdnItems: [
      { name: "Point Loads", label: "Loads" },
      { name: "Support", label: "Support" }
    ],
    cdn: ["Point Loads", "Support"],
    cdbItems: [
      { name: "Distributed Loads", label: "Loads" },
      { name: "Section", label: "Section" },
      { name: "Release", label: "Release" }
    ],
    cdb: ["Distributed Loads", "Section", "Release"],
    dt: {
      cdn: ["Point Loads", "Support"],
      cdb: ["Distributed Loads", "Section", "Release"]
    }
  }),
  computed: {
    ...mapState(mStore.state("project", ["project"])),
    rcht() {
      let ch
      ch = DChfn(this.project, this.dt)
      return ch
    }
  },
  methods: {
    save() {
      this.dt = { cdn: this.cdn, cdb: this.cdb }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  background-color: white;
  position: relative; /* If you want text inside of it */
}
</style>
