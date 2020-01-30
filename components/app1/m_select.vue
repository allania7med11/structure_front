<template>
  <v-flex xs12 md12>
    <v-layout row wrap justify-space-between>
      <v-flex xs5 md5>
        <v-btn block color="info" data-cy="sc" @click="sc = !sc">
          <Fas i="list" />
          {{ fslg.text }}
        </v-btn>
      </v-flex>
      <v-flex xs4 md3>
        <span>
          <v-text-field
            v-if="!testDetail"
            v-model="search"
            label="Search"
            single-line
            hide-details
            @change="searchChange"
          >
            <template v-slot:append>
              <Fas i="search" />
            </template>
          </v-text-field>
        </span>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <v-card v-show="sc" :key="componentKey">
          <v-card-title>
            <v-flex :-dynamic-flex-="true">
              <v-layout row>
                <v-flex mx-1 xs4>
                  <v-select
                    v-model="sl1"
                    :label="label[0]"
                    :items="tbs"
                    item-text="label"
                    item-value="id"
                    data-cy="sl1"
                  />
                </v-flex>
                <v-flex mx-1 :xs2="its3" :xs4="!its3">
                  <v-select
                    v-if="its2"
                    v-model="sl2"
                    :label="label[1]"
                    :items="its2"
                    item-text="label"
                    item-value="id"
                    data-cy="sl2"
                  />
                </v-flex>
                <v-flex mx-1 xs5>
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
import { mapState, mapActions } from "vuex"
import { mStore } from "@/constants/static"
import { mds } from "@/constants/app1/static"
import { help } from "@/constants/app1/help"
import { Orders } from "@/constants/app1/order"
export default {
  data: () => {
    return {
      componentKey: 0,
      tbs: Orders.tbs,
      sl1: 0,
      sl2: 0,
      sl3: 0,
      sc: false,
      dialog: false,
      search: ""
    }
  },
  computed: {
    ...mapState(mStore.state("project", ["project", "slg", "page", "pages"])),
    label: function() {
      return help.labels[mds[this.slg]["action"]]
    },
    testDetail() {
      return mds[this.slg].action == "details"
    },
    dynamicFlex: function() {
      return this.its3 ? "xs12" : this.its2 ? "xs10" : "xs6"
    },
    its2: function() {
      return this.tbs[this.sl1].children ? this.tbs[this.sl1].children : null
    },
    its3: function() {
      if (this.its2) {
        return this.its2[this.sl2].children
          ? this.its2[this.sl2].children
          : null
      } else {
        return null
      }
    },
    fslg: function() {
      let rtn
      rtn = this.its3
        ? this.its3[this.sl3]
        : this.its2
        ? this.its2[this.sl2]
        : this.tbs[this.sl1]
      this.projectChange({ state: "slg", value: rtn.name })
      if (!rtn.text) {
        rtn.text = rtn.label
      }
      if (rtn.text == "Detailed Analysis") {
        this.projectChange({
          state: "detailIndex",
          value: this.its2[this.sl2].name
        })
      }
      return rtn
    }
  },
  watch: {
    its2: {
      handler() {
        this.sl2 = 0
        this.sl3 = 0
      }
    },
    page: {
      immediate: true,
      handler(val) {
        this.sl1 = 0
        this.sl2 = 0
        this.sl3 = 0
        if (!this.pages) {
          this.tbs = Orders.tbsT(this.project)
        } else if (val === "results") {
          this.tbs = Orders.tbsR(this.project)
        } else {
          this.tbs = Orders.tbs
        }
        this.componentKey += 1
      }
    }
  },
  methods: {
    ...mapActions(mStore.getter("project", ["projectChange"])),
    searchChange() {
      this.projectChange({ state: "search", value: this.search })
    }
  }
}
</script>

<style lang="scss" scoped></style>
