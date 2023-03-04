<template>
  <v-app>
    <Header />
    <v-content class="ma-0 pa-0">
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
import { mapActions } from "vuex"
export default {
  middleware: "login",
  components: {
    Header
  },
  head() {
    return {
      script: [
        {
          async: true,
          src:
            "//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US&adInstanceId=35e7c8fa-351a-4339-9416-34b0df07fce2"
        }
      ]
    }
  },
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
  mounted() {
    if (process.client) {
      window._mNHandle = window._mNHandle || {}
      window._mNHandle.queue = window._mNHandle.queue || []
      // eslint-disable-next-line no-unused-vars
      let medianet_versionId = "3121199"
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
