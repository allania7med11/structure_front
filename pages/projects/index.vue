<template>
  <no-ssr placeholder="Loading...">
    <div>
      <us_table />  
    </div>
  </no-ssr>  
</template>
<script>
import us_table from "@/components/us_table.vue";
import { mapState,mapActions } from 'vuex'
export default {
  components: {
    us_table
  },
  computed: {
    ...mapState(['projects']),
  }
}
</script>

