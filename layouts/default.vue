<template>
  <v-app >
    <Header/>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState,mapActions } from 'vuex'
import Header from '~/components/Header.vue'
export default {
  // middleware: 'auth',
  
  components: {
    Header
  },
  methods:{
    ...mapActions(['login'])
  },
  mounted(){
    this.login()
  }
}
</script>
