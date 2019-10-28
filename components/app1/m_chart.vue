<template>
  <v-flex xs12 md6 pa-0 ma-1>
    <div class="wrapper">
      <v-container fluid>
        <v-layout>
          <v-flex mx-1>
            <v-select v-model="cdn" :items="cdnItems" attach chips label="Node(Infs)" multiple />
          </v-flex>
          <v-flex mx-1>
            <v-select v-model="cdb" :items="cdbItems" attach chips label="Bar(Infs)" multiple/>
          </v-flex>
          <v-flex mx-1>
            <v-btn small fab class="elevation-1" color="success" @click="save">
              <v-icon color="white">
                visibility
              </v-icon>
            </v-btn>
            <!-- <v-icon class="m_show" color="white" @click="save" >visibility</v-icon> -->
          </v-flex>
        </v-layout>
      </v-container>
      <chart v-if="rcht != null" :height="250" :chartdata="rcht.data" :options="rcht.options"/>
    </div>
  </v-flex>
</template>

<script>
import { mapState,mapGetters,mapActions } from 'vuex'
import { mStore } from "@/constants/static";
import chart from "./cps/chart";
import { cht, DChfn } from "@/constants/app1/chart";
export default {
  components: {
    chart
  },
  data: () => ({
    id:1,
    cdnItems: ["Point Loads", "Support"],
    cdn: ["Point Loads", "Support"],
    cdbItems: ["Distributed Loads", "Section", "Release"],
    cdb: ["Distributed Loads", "Section", "Release"],
    dt: {
      cdn: ["Point Loads", "Support"],
      cdb: ["Distributed Loads", "Section", "Release"]
    },
  }),
  computed: {
    ...mapState(mStore.state('project',['project'])),
    rcht() {
      let ch;
      ch = DChfn(this.project, this.dt);
      return ch;
    }
  },
  methods: {
    console(val) {
      console.log(val);
    },
    save() {
      this.dt = { cdn: this.cdn, cdb: this.cdb };
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  background-color: white;
  position: relative; /* If you want text inside of it */
}
</style>
