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
import { mStore } from "@/constants/static";

export default {
  components: {
    app1
  },
  data:() => ({
    show:true
  }),
  computed:{
    ...mapState(mStore.state("project",["project"])),
  },
  methods:{
      ...mapActions(mStore.getter("project",['reset','aProject'])),
  }, 
  mounted(){
    this.reset()
    this.aProject({id:this.$route.params.id})
  } 
}
</script>


<style>

</style>