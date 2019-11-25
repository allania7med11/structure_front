<template>
  <v-container class="pa-0" fluid>
    <m_pages v-if="pages" />
    <v-layout align-start justify-space-around wrap>
      <m_chart />
      <v-flex xs12 md5>
        <v-layout column>
          <m_select />
          <m_table v-if="!testDetail" />
          <m_detail v-if="testDetail" />
        </v-layout>
      </v-flex>
    </v-layout>
    <m_form v-if="test" />
  </v-container>
</template>

<script>
import m_select from "@/components/app1/m_select"
import { mapState, mapGetters } from "vuex"
import { mStore } from "@/constants/static"
import m_table from "@/components/app1/m_table"
import m_form from "@/components/app1/m_form"
import m_chart from "@/components/app1/m_chart"
import m_pages from "@/components/app1/m_pages"
import m_detail from "@/components/app1/m_detail"
export default {
  name: "App",
  components: {
    m_select,
    m_table,
    m_form,
    m_chart,
    m_pages,
    m_detail
  },
  computed: {
    ...mapState(mStore.state("project", ["pages"])),
    ...mapGetters(mStore.getter("project", ["md"])),
    test() {
      return ["define", "apply"].includes(this.md.action)
    },
    testDetail() {
      return this.md.action === "details"
    }
  }
}
</script>
<style>
.m_container {
  position: absolute;
}
body {
  height: 1000px;
}
</style>
