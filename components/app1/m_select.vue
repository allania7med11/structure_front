<template>
  <v-flex xs12 md12>
    <v-layout row wrap justify-space-between>
      <v-flex xs3 md2 >
        <v-btn color="info" @click="sc = !sc">
          <v-icon>list</v-icon>
          {{ fslg.text }}
        </v-btn>
      </v-flex>
      <v-flex xs4 md3>
        <v-text-field
          v-if="!testDetail" v-model="search" append-icon="search" label="Search"
          single-line hide-details @change="searchChange"/>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card v-show="sc" :key="componentKey">
          <v-card-title>
            <v-flex :-dynamic-flex-="true">
              <v-layout row>
                <v-flex mx-1>
                  <v-select
                    v-model="sl1"
                    :label="label[0]"
                    :items="tbs"
                    item-text="label"
                    item-value="id"
                  />
                </v-flex>
                <v-flex mx-1>
                  <v-select
                    v-if="its2"
                    v-model="sl2"
                    :label="label[1]"
                    :items="its2"
                    item-text="label"
                    item-value="id"
                  />
                </v-flex>
                <v-flex mx-1>
                  <v-select
                    v-if="its3"
                    v-model="sl3"
                    :label="label[2]"
                    :items="its3"
                    item-text="label"
                    item-value="id"
                  />
                </v-flex>
              </v-layout>
            </v-flex>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-flex>
</template>
<script>
import { mapState,mapActions } from 'vuex'
import { tbs, tbsR,  labels, mds } from "@/constants/app1/static";
import app1 from "@/components/app1";
export default {
  data: () => {
    return {
      componentKey: 0,
      tbs: tbs,
      sl1: 0,
      sl2: 0,
      sl3: 0,
      sc: false,
      dialog: false,
      search:""
    };
  },
  computed: {
    ...mapState(['project','slg','page']),
    label: function() {
      return labels[mds[this.slg]["action"]];
    },
    testDetail() {
      return mds[this.slg].action == "details";
    },
    dynamicFlex: function() {
      return this.its3 ? "xs12" : this.its2 ? "xs10" : "xs6";
    },
    its2: function() {
      this.sl2 = 0;
      this.sl3 = 0;
      return this.tbs[this.sl1].children ? this.tbs[this.sl1].children : null;
    },
    its3: function() {
      if (this.its2) {
        return this.its2[this.sl2].children
          ? this.its2[this.sl2].children
          : null;
      } else {
        return null;
      }
    },
    fslg: function() {
      let rtn;
      rtn = this.its3
        ? this.its3[this.sl3]
        : this.its2
        ? this.its2[this.sl2]
        : this.tbs[this.sl1];
      this.stateChange({ state: "slg", value: rtn.name })
      if (!rtn.text) {
        rtn.text = rtn.label;
      }
      if (rtn.text == "Detailed Analysis") {
        this.stateChange({ state: "detailIndex", value: this.its2[this.sl2].name })
      }
      return rtn;
    }
  },
  watch: {
    page: {
      handler(val) {
        this.sl1 = 0;
        this.sl2 = 0;
        this.sl3 = 0;
        if (val == "results") {
          this.tbs = tbsR(this.project);
        } else {
          this.tbs = tbs;
        }
        this.componentKey += 1;
      }
    },
    search: {
      handler(val) {
        console.log(val)
      }
    }
  },
  methods: {
    ...mapActions(['stateChange']),
    searchChange() {
      this.stateChange({ state: "search", value: this.search })
      console.log("searchChange")
      console.log(this.search)
    }
  }
};
</script>

<style lang="scss" scoped></style>
