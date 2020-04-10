<template>
  <v-app>
    <Header />
    <v-content
      class="ma-0 pa-0"
      :class="$nuxt.$route.name === 'index' ? 'grey darken-4 white--text' : ''"
    >
      <div id="amzn-assoc-ad-2152de4d-a921-4971-b0eb-22815a32ac81"></div>
      <ads />
      <v-alert class="ma-0" prominent :value="show" dense :type="alert.type">
        <v-row align="center">
          <v-col class="grow font-weight-bold">
            {{ alert.message }}
          </v-col>
          <v-col class="shrink">
            <v-icon @click="show = !show">
              cancel
            </v-icon>
          </v-col>
        </v-row>
      </v-alert>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import Header from "~/components/Header.vue"
import ads from "~/components/ads.vue"
import { mapActions } from "vuex"
export default {
  middleware: "login",
  components: {
    Header,
    ads
  },
  /* head() {
    return {
      script: [
        {
          async: true,
          src:
            "//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US&adInstanceId=2152de4d-a921-4971-b0eb-22815a32ac81"
        }
      ]
    }
  }, */
  data: () => ({
    alert: { message: "Back online", type: "success" },
    show: false,
    first: true
  }),
  computed: {
    offline() {
      return this.$nuxt.isOffline
    }
  },
  watch: {
    offline: {
      immediate: true,
      handler: async function(val) {
        this.show = false
        if (val) {
          this.alert = { message: "You are offline", type: "warning" }
          this.show = true
        } else if (!this.first) {
          this.alert = { message: "Back online", type: "success" }
          this.show = true
        }
        this.first = false
      }
    }
  },
  methods: {
    ...mapActions(["login"])
  }
}
</script>
<style>
.primary {
  background-color: #1976d2 !important;
  border-color: #1976d2 !important;
}
.warning {
  background-color: #fb8c00 !important;
  border-color: #fb8c00 !important;
}
.error {
  background-color: #ff5252 !important;
  border-color: #ff5252 !important;
}
.success {
  background-color: #4caf50 !important;
  border-color: #4caf50 !important;
}
.info {
  background-color: #2196f3 !important;
  border-color: #2196f3 !important;
}
</style>
