<template>
  <div>
    <v-navigation-drawer
      v-if="!$vuetify.breakpoint.mdAndUp"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <template v-for="item in itsM()">
          <mini :key="item.id" :item="item" />
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar>
      <v-btn
        small
        fab
        text
        aria-label="Pages"
        class="d-flex d-md-none  mx-1"
        @click.stop="drawer = !drawer"
      >
        <Fas i="bars" />
      </v-btn>
      <!-- <v-app-bar-nav-icon
        aria-label="Pages"
        class="d-flex d-md-none  mx-1"
        @click.stop="drawer = !drawer"
      /> -->
      <v-toolbar-items>
        <v-btn text to="/projects/" exact>
          <v-avatar>
            <!-- eslint-disable-next-line vue/html-self-closing -->
            <img
              class="my-1"
              src="~/assets/favicon.png"
              alt="EffectiveWebApp"
            />
          </v-avatar>
          <span class="ml-2 font-weight-black font-italic">
            {{ titleDisplay }}
          </span>
        </v-btn>
      </v-toolbar-items>
      <template v-for="item in itsL()">
        <hdr :key="item.id" :item="item" />
      </template>
      <v-spacer />
      <template v-for="item in itsR()">
        <hdr :key="item.id" :item="item" />
      </template>
    </v-toolbar>
  </div>
</template>

<script>
import { mapState } from "vuex"
import hdr from "@/components/cps/hdr"
import mini from "@/components/cps/mini"
export default {
  components: {
    hdr,
    mini
  },
  data() {
    return {
      isMounted: false,
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false
    }
  },
  computed: {
    ...mapState(["urls", "username", "password"]),
    titleDisplay() {
      if (this.$vuetify.breakpoint.xsOnly) {
        return "EWA"
      }
      return "EffectiveWebApp"
    },
    usernameDisplay() {
      if (this.username.length > 24) {
        return this.username.slice(0, 19) + "..."
      }
      return this.username
    },
    userList() {
      if (this.password) {
        return [
          {
            title: "Change password",
            bind: { href: "/accounts/password/change" }
          },
          {
            title: "Log Out",
            bind: { href: "/accounts/logout" }
          }
        ]
      }
      return [
        {
          title: "Log Out",
          bind: { href: "/accounts/logout" }
        }
      ]
    },
    items() {
      return [
        {
          icon: "home",
          title: "Welcome",
          type: "btn",
          mini: true,
          bind: { to: "/" }
        },
        {
          icon: "book",
          title: "Tutorials",
          type: "list",
          mini: true,
          its: [
            { title: "Beam Calculator", bind: { to: "/Tutorials/Beam" } },
            {
              title: "Roof and Truss Calculator",
              bind: { to: "/Tutorials/TrussStructure" }
            },
            {
              title: "Frame Calculator",
              bind: { to: "/Tutorials/FrameStructure" }
            },
            {
              title: "Beams with Internal Hinges",
              bind: { to: "/Tutorials/BeamsInternalHinges" }
            }
          ]
        },
        {
          icon: "envelope",
          title: "Contact",
          mini: true,
          type: "btn",
          bind: { to: "/contact" }
        },
        {
          icon: "user",
          title: "Sign Up",
          type: "btn",
          bind: {
            href: "/accounts/signup",
            ["data-cy"]: "signup"
          },
          right: true,
          anonymous: true
        },
        {
          icon: "sign-in-alt",
          title: "Log In",
          type: "btn",
          bind: {
            href: "/accounts/login",
            ["data-cy"]: "login"
          },
          right: true,
          anonymous: true
        },
        {
          right: true,
          username: true,
          icon: "user",
          title: this.usernameDisplay,
          type: "username",
          its: this.userList
        }
      ]
    }
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    itsL() {
      const test =
        this.isMounted && this.$vuetify.breakpoint.mdAndUp
          ? this.items.filter(cv => !("right" in cv))
          : this.items.filter(cv => !("right" in cv) && !("mini" in cv))
      return test
    },
    itsR() {
      const test = this.username
        ? this.items.filter(cv => "right" in cv && !("anonymous" in cv))
        : this.items.filter(cv => "right" in cv && !("username" in cv))
      return test
    },
    itsM() {
      return this.items.filter(cv => "mini" in cv)
    }
  }
}
</script>
<style>
* {
  text-transform: none !important;
}
</style>
<style scoped>
.v-btn {
  min-width: 10px;
}
</style>
