<template>  
  <v-toolbar-items >
    <v-btn  v-if="item.type==='btn'"  v-bind="item.bind"  :key="item.id" text exact>
      <v-icon small>{{ item.icon }}</v-icon>
      <span class="d-none d-sm-flex mx-1">{{ item.title }}</span>
    </v-btn>
    <v-menu v-else :key="item.id" open-on-hover offset-y>
        <template v-slot:activator="{ on }">
            <v-btn v-on="on" text exact>
            <v-icon v-if="!!item.icon" small>{{ item.icon }}</v-icon>
            <span v-if="item.type==='username'"  class="mx-1">{{ item.title }}</span>
            <span v-else  class="d-none d-sm-flex mx-1">{{ item.title }}</span>
            <v-icon>arrow_drop_down</v-icon>
            </v-btn>
        </template>
        <v-list>
            <v-list-item v-for="it in item.its" v-bind="it.bind" :key="it.id" exact>
              <v-list-item-title>{{ it.title }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
  </v-toolbar-items>
</template>

<script>

export default {
  name:"hdr",
  props: ["item"],
  mounted:function(){
    console.log("this.item",this.item)
  }
};
</script>

<style>
</style>