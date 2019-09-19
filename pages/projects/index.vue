<template>
  <client-only placeholder="Loading...">
    
    <div>
      <v-alert dismissible v-if="error" type="error">
          An error occurred
      </v-alert>
      <us_table />  
      <us_form /> 
    </div>
  </client-only>  
</template>
<script>
import us_table from "@/components/us_table.vue";
import us_form from "@/components/us_form.vue";
import { mapState,mapActions } from 'vuex'
export default {
  components: {
    us_table,
    us_form
  },
  computed: {
    ...mapState(['projects','error']),
  }
}
</script>

