<template>
  <v-list-item
    v-if="item.type === 'btn'"
    :key="item.id"
    v-bind="item.bind"
    router
    exact
  >
    <v-list-item-action>
      <Fas :i="item.icon" />
    </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title v-text="item.title" />
    </v-list-item-content>
  </v-list-item>
  <v-menu v-else :key="item.id" open-on-hover offset-x>
    <template v-slot:activator="{ on }">
      <v-list-item text exact v-on="on">
        <v-list-item-action>
          <Fas :i="item.icon" />
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            <span>
              {{ item.title }}
              <Fas i="caret-right" />
            </span>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
    <v-list>
      <v-list-item v-for="it in item.its" :key="it.id" v-bind="it.bind" exact>
        <v-list-item-title>{{ it.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "Hdr",
  // eslint-disable-next-line vue/require-prop-types
  props: ["item"]
}
</script>

<style></style>
