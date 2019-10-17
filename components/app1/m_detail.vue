<template>
  <div class="wrapper">
    <chart v-if="rcht != null" :height="250" :chartdata="rcht.data" :options="rcht.options"/>

    <v-flex xs12 ma-1>
      <p class="font-weight-black" v-html="fonction"/>
    </v-flex>
    <v-layout>
      <v-flex ma-1>
        <v-text-field v-model.number="X" label="X[m]" @change="change"/>
      </v-flex>
      <v-flex ma-1>
        <span v-html="result" />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState,mapGetters,mapActions } from 'vuex'
import chart from "./cps/chart";
import { chdt, Plfn } from "@/constants/app1/chart";
import { mds, query, Units } from "@/constants/app1/static";
const math = require("mathjs");
export default {
  components: {
    chart
  },
  
  data: () => ({
    X: 0,
    Xn: 0,
  }),
  computed: {
    ...mapState(['project','slg','detailIndex']),
    fonction() {
      return this.slg + this.dt.unite.lb + "=" + this.exp;
    },
    result() {
      return (
        this.slg +
        this.dt.unite.lb +
        "<br>" +
        String(math.round(this.fct(this.Xn), this.dt.unite.rd))
      );
    },
    dt() {
      return mds[this.slg];
    },
    bar() {
      this.X = 0;
      this.Xn = 0;
      return this.project.bars.find(cv => cv.id == this.detailIndex);
    },
    arr() {
      if (this.project) {
        return JSON.parse(this.bar[this.dt.from])
          [this.slg].split(",")
          .map(cv =>
            math.round(this.dt.unite.vl * Number(cv), this.dt.unite.rd * 2)
          );
      }
      return [0];
    },
    exp() {
      let r = this.arr
        .reduce((ac, cv, i) => {
          if (cv != 0) {
            this.arr.length - 1 - i > 1
              ? ac.push(String(cv) + "*x^" + String(this.arr.length - 1 - i))
              : this.arr.length - 1 - i == 1
              ? ac.push(String(cv) + "*x")
              : ac.push(String(cv));
          }
          return ac;
        }, [])
        .join("+");
      if (r == "") {
        return "0";
      }
      return r;
    },
    xm() {
      if (this.project) {
        return JSON.parse(this.bar[this.dt.max])
          [this.slg].split(";")[0]
          .split(",")
          .map(cv => math.round(Number(cv), Units["m"].rd * 2));
      }
      return [0];
    },
    rcht() {
      let dtj = chdt(this.bar, this.dt, this.fct, this.xm);
      let ch;
      ch = Plfn(dtj);
      return ch;
    }
  },
  methods: {
    console(val) {
      console.log(val);
    },
    fct(t) {
      return math.evaluate(this.exp, { x: t });
    },
    change(cv) {
      if (cv == 0) {
        this.X = 0;
        this.Xn = 0;
      }
      if (cv >= 0 && cv <= this.bar.L) {
        this.Xn = this.X;
      } else {
        this.X = this.Xn;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  background-color: white;
  position: relative;
}
</style>
