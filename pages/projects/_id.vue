<template>
  <div>
    <client-only placeholder="Loading...">
      <app1 v-if="show"  /> 
    </client-only>
  </div>
</template>
<script>
import { mapState,mapActions } from 'vuex'
import app1 from "@/components/app1";

export default {
  components: {
    app1
  },
  data:() => ({
    show:true
  }),
  computed:{
    ...mapState(["project"]),
  },
  methods:{
      ...mapActions(['aProject']),
  }, 
  mounted(){
    console.log({id:"this.$route.params.id"})
    this.aProject({id:this.$route.params.id})
  } 
}
</script>


<style>

</style>