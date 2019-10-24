<template>
  <no-ssr>
   <hdr item="hello!"></hdr>
  </no-ssr>
  <!-- <hdr :item="{icon: 'home',title: 'Welcome',to: '/',type:'btn'}" /> -->
</template>

<script>
import { hdr } from '@/components/cps/hdr'
  
  export default {
    components: {
      hdr
    },
    data () {
      return {
        alignmentsAvailable: [
          'start',
          'center',
          'end',
          'baseline',
          'stretch',
        ],
        alignment: 'center',
        dense: false,
        justifyAvailable: [
          'start',
          'center',
          'end',
          'space-around',
          'space-between',
        ],
        justify: 'center',
      }
    },
  }
</script>

<style>

</style>