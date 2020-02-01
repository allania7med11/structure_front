<template>
  <div id="app">
    <v-app id="inspire">
      <v-card class="grey lighten-4 elevation-0">
        <v-card-text>
          <v-container fluid>
            <v-layout row wrap>
              <v-flex xs12 sm6>
                <v-subheader v-text="'Slots'" />
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  v-model="e11"
                  label="Select"
                  :items="tbs"
                  item-text="label"
                  item-value="id"
                  max-height="auto"
                  autocomplete
                >
                  <template slot="selection" scope="data">
                    {{ data.item.label }}
                  </template>
                  <!-- <template slot="item" scope="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content>
                        {{ typeof data.item }}----{{ data.item }}
                      </v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title>
                          {{ typeof data.item }}----{{ data.item.label }}
                        </v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template> -->
                </v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-app>
  </div>
</template>

<script>
import { Orders } from "@/constants/app1/order"
export default {
  data() {
    return {
      e11: [],
      people: [
        { header: "Structure" },
        { name: "Sandra Adams", group: "Group 1" },
        { name: "Ali Connors", group: "Group 1" },
        { name: "Trevor Hansen", group: "Group 1" },
        { name: "Tucker Smith", group: "Group 1" },
        { divider: true },
        { header: "Group 2" },
        { name: "Britta Holt", group: "Group 2" },
        { name: "Jane Smith ", group: "Group 2" },
        { name: "John Smith", group: "Group 2" },
        { name: "Sandra Williams", group: "Group 2" }
      ]
    }
  },
  computed: {
    tbs() {
      const rtn = Orders.tbs
      return rtn
    }
  }
}
</script>
