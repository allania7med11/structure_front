<template>
  <div>
    <h1>Hello World</h1>
    {{ project }}
  </div>
</template>

<script>
  import { mapState,mapActions } from 'vuex'
  export default {

    computed: {
      ...mapState(['project','error']),
    },
    methods:{
      ...mapActions(['aProject']),
    },
    mounted(){
      this.aProject({id:this.$route.params.id})
    }
  }
</script>

<style>

</style>