<template>
  <div class="pt-3">
    <client-only placeholder="Loading...">
      <app1 />
    </client-only>
  </div>
</template>

<script>
import app1 from "@/components/app1"
export default {
  middleware: "Full_Project",
  components: {
    app1
  },
  data: () => ({
    show: false
  }),
  mounted() {
    this.show = true
  }
}
</script>

<style></style>
