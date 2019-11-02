<template>
  <v-toolbar-items>
    <v-btn
      v-if="item.type === 'btn'"
      :key="item.id"
      v-bind="item.bind"
      text
      exact
    >
      <v-icon class="d-flex d-md-none  mx-1" small>
        {{ item.icon }}
      </v-icon>
      <span class="d-none d-md-flex mx-1">{{ item.title }}</span>
    </v-btn>
    <v-menu v-else :key="item.id" open-on-hover offset-y>
      <template v-slot:activator="{ on }">
        <v-btn text exact v-on="on">
          <v-icon
            v-if="!!item.icon & (item.type === 'username')"
            class="d-flex d-sm-none  mx-1"
            small
          >
            {{ item.icon }}
          </v-icon>
          <v-icon v-else-if="!!item.icon" class="d-flex d-md-none  mx-1" small>
            {{ item.icon }}
          </v-icon>
          <span v-if="item.type === 'username'" class="d-none d-sm-flex mx-1">{{
            item.title
          }}</span>
          <span v-else class="d-none d-md-flex mx-1">{{ item.title }}</span>
          <v-icon>arrow_drop_down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="it in item.its" :key="it.id" v-bind="it.bind" exact>
          <v-list-item-title>{{ it.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-toolbar-items>
</template>

<script>
export default {
  name: "Hdr",
  props: ["item"]
}
</script>

<style></style>
