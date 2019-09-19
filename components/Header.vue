<template>
  <div>
    <v-toolbar>
      <v-toolbar-items>
        <v-btn text to="/projects">
          <v-avatar >
            <img class="my-1" src="~/assets/favicon.png" alt="EffectiveWebApp">
          </v-avatar>
          <span class="ml-2 d-none d-sm-flex font-weight-black font-italic">
            {{ title }}
          </span>
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="d-flex d-sm-none">
          <v-btn text v-for="item in itsL()" :key="item.id" :to="item.to" >
              <v-icon>fas fa-{{ item.icon }}</v-icon>
          </v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="d-none d-sm-flex">
          <v-btn text v-for="item in itsL()" :key="item.id" :to="item.to" >
              {{ item.title }}           
          </v-btn>
      </v-toolbar-items>
      <v-spacer  />
      <v-toolbar-items class="d-flex d-sm-none">
          <template v-for="item in itsR()">
              <v-btn v-if="'to' in item" :key="item.id" :to="item.to" text>
                  <v-icon>fas fa-{{ item.icon }}</v-icon>
              </v-btn>
              <v-btn v-else-if="'href' in item" :key="item.id" :href="item.href" text>
                <v-icon small>fas fa-{{ item.icon }}</v-icon>
              </v-btn>
              <v-menu  v-else :key="item.id" offset-y >
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on" text>
                      <v-icon small>fas fa-user</v-icon>
                      <span class="mx-1">{{ username }}</span>
                      <v-icon>mdi-anchor</v-icon>
                    </v-btn>
                </template>
                <v-list>
                  <v-list-tile  :href="item.its[0].href">
                    <v-list-tile-title >{{ item.its[0].title }}</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
          </template>
      </v-toolbar-items>
      <v-toolbar-items class="d-none d-sm-flex">
          <template v-for="item in itsR()">
              <v-btn v-if="'to' in item" :key="item.id" :to="item.to" text>
                <v-icon small>fas fa-{{ item.icon }}</v-icon>
                <span class="mx-1">{{ item.title }}</span>
              </v-btn>
              <v-btn v-else-if="'href' in item" :key="item.id" :href="item.href" text>
                <v-icon small>fas fa-{{ item.icon }}</v-icon>
                <span class="mx-1">{{ item.title }}</span>
              </v-btn>
              <v-menu  v-else :key="item.id" offset-y >
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on" text>
                      <v-icon small>fas fa-user</v-icon>
                      <span class="mx-1">{{ username }}</span>
                      <v-icon small>fas fa-caret-down</v-icon>
                    </v-btn>
                </template>
                <v-list>
                  <v-list-item  :href="item.its[0].href">
                    <v-list-tile-title >{{ item.its[0].title }}</v-list-tile-title>
                  </v-list-item>
                </v-list>
              </v-menu>
          </template>
      </v-toolbar-items>     
    </v-toolbar>
  </div>
</template>
  

<script>
import { mapState,mapActions } from 'vuex'
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "home",
          title: "Welcome",
          to: "/"
        },
        {
          icon: "info-circle",
          title: "Inspire",
          to: "/inspire"
        },
        {
          icon: "user",
          title: "Sign Up",
          href: "/accounts/signup",
          right: true,
          anonymous: true
        },
        {
          icon: "sign-in-alt",
          title: "Log In",
          href: "/accounts/login",
          right: true,
          anonymous: true
        },
        {
          right: true,
          username: true,
          its: [{ title: "Log Out", href: "/accounts/logout" }]
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "EffectiveWebApp"
    };
  },
  computed: {
    ...mapState(['username','projects']),
  }, 
  methods:{
    ...mapActions(['login']),
    itsL() {
      return this.items.filter(cv => !("right" in cv));
    },
    itsR() {
      const test=this.username
        ? this.items.filter(cv => "right" in cv && !("anonymous" in cv))
        : this.items.filter(cv => "right" in cv && !("username" in cv));
      return test
    }
  },
  mounted(){
    this.login()
  }
  
  
};
</script>
<style >
* {
  text-transform: none !important;
}
</style>
<style scoped>
.v-btn {
  min-width: 10px;
}
</style>
