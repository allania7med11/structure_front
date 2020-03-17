<template>
  <v-toolbar-items>
    <v-btn
      v-if="item.type === 'btn'"
      :key="item.id"
      v-bind="item.bind"
      text
      exact
    >
      <span>{{ item.title }}</span>
    </v-btn>
    <v-menu v-else :key="item.id" open-on-hover offset-y>
      <template v-slot:activator="{ on }">
        <v-btn text exact v-on="on">
          <span class="d-inline-block text-truncate" style="max-width: 30vw;">
            {{ item.title }}
          </span>
          <Fas i="caret-down" />
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
  // eslint-disable-next-line vue/require-prop-types
  props: ["item"]
}
</script>

<style></style>
