<template>
  <v-flex
    xs12
    md12
  >
    <v-data-table
      v-if="!$apollo.loading"
      :headers="tbhs"
      :items="items"
      class="elevation-1"
      :pagination.sync="pagination"
      item-key="name"
      :search="search"
    >
      <template
        slot="headers"
        slot-scope="props"
      >
        <tr>
          <th
            v-if="md.action == 'define' && page == 'define'"
            class="text-xs-center"
          >
            <v-icon
              class="m_add"
              color="white"
              @click="newItem"
            >
              add
            </v-icon>
          </th>
          <th
            v-for="header in props.headers"
            :key="header.text"
            :class="[
              'column sortable',
              pagination.descending ? 'desc' : 'asc',
              header.value === pagination.sortBy ? 'active' : ''
            ]"
            @click="changeSort(header.value)"
          >
            <v-btn
              v-if="
                md.action == 'apply' &&
                  header.value == 'name' &&
                  page == 'define'
              "
              small
              fab
              class="elevation-1"
              color="info"
              @click.stop.prevent="applyItem"
            >
              <span class="headline">+</span>
            </v-btn>
            <span v-html="header.text" />
            <v-icon small>
              arrow_upward
            </v-icon>
          </th>
        </tr>
      </template>
      <template
        slot="items"
        slot-scope="props"
      >
        <td
          v-if="md.action == 'define' && page == 'define'"
          class="text-xs-center"
        >
          <v-icon
            class="m_delete"
            color="white"
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
          <v-icon
            class="m_edit"
            color="white"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
        </td>
        <template v-for="header in tbhs">
          <td
            :key="header.id"
            v-html="inf.ds[header.value](props.item[header.value])"
          />
        </template>
      </template>
    </v-data-table>
    <img
      v-if="inf.image"
      :src="require(`@/assets/images/${inf.image.src}.png`)"
      height="150"
    >
  </v-flex>
</template>
<script>
import { mds, query } from "@/constants/app1/static";
import { Infs } from "@/constants/app1/Infs";
export default {
  apollo: {
    id: apolloState("id"),
    project:{
      query: readServerQ("project", "ID!", query),
      variables() { return { input: this.id,}},
    },
    page: apolloState("page"),
    search: apolloState("search"),    
    slg: apolloState("slg")
  },
  data: () => ({
    id:1,
    pagination: {
      sortBy: "name",
      descending: false
    },
    project: { nodes: [] },
    editedIndex: -1,
    tbhs:["name", "X", "Z"]
  }),
  computed: {
    path(name) {
      return require(`@/assets/images/${name}.png` )
    },
    pagination2() {
      if (this.page == "results") {
        return { sortBy: "name", descending: false };
      } else {
        return { sortBy: "name", descending: true };
      }
    },
    md() {
      return mds[this.slg];
    },
    inf() {
      if (this.slg in Infs){
        if ("tbhs" in Infs[this.slg]){
          this.tbhs=Infs[this.slg].tbhs
          return Infs[this.slg];
        }
      }
      
      return {};
    },
    items() {
      if (this.page == "results" && "fltR" in this.inf) {
        if ("flt" in this.inf) {
          return this.inf.flt(this.inf.fltR(this.project[this.md.model]));
        } else {
          return this.inf.fltR(this.project[this.md.model]);
        }
      }
      if ("flt" in this.inf) {
        return this.inf.flt(this.project[this.md.model]);
      }
      return this.project[this.md.model];
    }
  },
  watch: {
    page: {
      handler(val) {
        if (val == "results") {
          this.pagination.descending = false;
        } else {
          this.pagination.descending = true;
        }
      }
    }
  },

  methods: {
    console(val) {
      console.log(val);
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = true;
      }
    },
    open() {
      this.$apollo.mutate(
        argMutate("stateChange", { state: "dialog", value: true })
      );
    },
    applyItem() {
      this.$apollo.mutate(
        argMutate("stateChange", { state: "action", value: "apply" })
      );
      this.$apollo.mutate(
        argMutate("stateChange", { state: "editedIndex", value: -1 })
      );
      this.open();
    },
    newItem() {
      this.$apollo.mutate(
        argMutate("stateChange", { state: "action", value: "create" })
      );
      this.$apollo.mutate(
        argMutate("stateChange", { state: "editedIndex", value: -1 })
      );
      this.open();
    },
    editItem(item) {
      this.$apollo.mutate(
        argMutate("stateChange", { state: "action", value: "update" })
      );
      this.$apollo.mutate(
        argMutate("stateChange", { state: "editedIndex", value: item.id })
      );
      this.open();
    },
    deleteItem(item) {
      this.$apollo.mutate(
        argMutate("stateChange", { state: "action", value: "delete" })
      );
      this.$apollo.mutate(
        argMutate("stateChange", { state: "editedIndex", value: item.id })
      );
      this.open();
    }
  }
};
</script>
<style lang="scss" scoped>
.fixed {
  position: fixed;
  bottom: 0;
  left: 0;
  -webkit-box-shadow: none !important;
  -moz-box-shadow: none !important;
  box-shadow: none !important;
}

table.v-table tbody td:not(:nth-child(1)) {
  padding: 5px;
}
table.v-table thead th:not(:nth-child(1)) {
  padding: 5px;
}

.m_add {
  margin: 1px;
  background-color: #304ffe;

  :hover {
    background-color: #3f51b5;
  }
}
.m_edit {
  margin: 1px;
  background-color: #ffc107;
  :hover {
    background-color: #ffab00;
  }
}
.m_delete {
  margin: 1px;
  background-color: #ff5722;
  :hover {
    background-color: #dd2c00;
  }
}
.m_apply {
  margin: 1px;
  background-color: #4caf50;
  :hover {
    background-color: #00c853;
  }
}

th {
  text-align: left;
  border: 1px solid #9fa8da;
  width: 1px;
}
td {
  text-align: left;
  border: 1px solid #9fa8da;
  width: 1px;
}
</style>
