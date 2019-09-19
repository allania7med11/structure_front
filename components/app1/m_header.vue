<template>
  <span>
    <v-navigation-drawer v-model="sidebar" app>
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
            <router-link v-if="item.int==true" :to="item.path">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>{{ item.title }}</v-list-tile-content>
            </router-link>
            <a v-else :href="item.path">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>{{ item.title }}</v-list-tile-content>
            </a>

        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app>
      <span class="hidden-sm-and-up">
        <v-toolbar-side-icon @click="sidebar = !sidebar">
        </v-toolbar-side-icon>
      </span>
      <v-toolbar-title>
        <router-link to="/projects" tag="span" style="cursor: pointer">
          {{ appTitle }}
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </span>
</template>

<script>
//import HelloWorld from "./components/HelloWorld";

export default {
  data(){
    return {
      appTitle: 'EffectiveWepApp',
      sidebar: false,
      menuItems: [
          { title: 'Home', path: '/', icon: 'home',int:true },
          { title: 'Login', path: '/login', icon: 'face',int:true },
          { title: 'Sign In', path: '/signin', icon: 'lock_open',int:true }
     ]
    }
  },
};
</script>

<style>

</style>
