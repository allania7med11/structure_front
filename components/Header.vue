<template>
  <div>
    <v-toolbar>
      <v-toolbar-items >
        <v-btn text to="/projects" exact>
          <v-avatar >
            <img class="my-1" src="~/assets/favicon.png" alt="EffectiveWebApp">
          </v-avatar>
          <span class="ml-2 d-none d-sm-flex font-weight-black font-italic">
            {{ title }}
          </span>
        </v-btn>
      </v-toolbar-items>
      <template v-for="item in itsL()">
              <hdr :item="item" :key="item.id"></hdr>
      </template>
      <v-spacer  />
      <template v-for="item in itsR()">
              <hdr :item="item" :key="item.id"></hdr>
      </template>
          
    </v-toolbar>
  </div>
</template>
  

<script>
import { mapState,mapActions } from 'vuex'
import hdr from '@/components/cps/hdr'
export default {
  components: {
    hdr
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "EffectiveWebApp"
    };
  },
  computed: {
    ...mapState(['username','projects']),
    items() {
      return [
        {
          icon: "fas fa-home",
          title: "Welcome",
          type:"btn",
          bind:{to: "/"}
        },
        {
          icon:"menu_book",
          title:"Tutorials",
          type:"list",
          its: [
            { title: "Beam Calculator",bind:{to: "/Tutorials/Beam"}},
            { title: "Roof and Truss Calculator",bind:{to: "/Tutorials/TrussStructure"}},
            { title: "Frame Calculator",bind:{to: "/Tutorials/FrameStructure"}},
            { title: "Beams with Internal Hinges",bind:{to: "/Tutorials/BeamsInternalHinges"}}
            ]
        },
        {
          icon: "fas fa-info-circle",
          title: "Inspire",
          type:"btn",
          bind:{to: "/inspire"}
        },
        {
          icon: "fas fa-user",
          title: "Sign Up",
          type:"btn",
          bind:{href: "/accounts/signup"},
          right: true,
          anonymous: true
        },
        {
          icon: "fas fa-sign-in-alt",
          title: "Log In",
          type:"btn",
          bind:{href: "/accounts/login"},
          right: true,
          anonymous: true
        },
        {
          right: true,
          username: true,
          icon: "fas fa-user",
          title:this.username,
          type:"username",
          its: [{ title: "Log Out",bind:{href: "/accounts/logout"},}]
        }
      ]},
  }, 
  methods:{
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
