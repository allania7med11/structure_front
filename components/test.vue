<template>
  <v-flex xs12 md12>
    <v-data-table
      :headers="headers"
      :items="items"
      class="elevation-1"
      :sort-by="sort.by"
      :sort-desc="sort.desc"
      item-key="name"
      :search="search"
    >
      <v-for :list="tbh in inf.tbhs.slice(1)">
        <template v-slot:[tbh.name]="{ header }">
          <span v-html="header.text" />
          <v-icon small>
            arrow_upward
          </v-icon>
        </template>
      </v-for>
      <template v-slot:header.name="{ header }">
        <template v-if="md.action == 'apply' && page == 'define'">
          <v-btn small fab class="elevation-1" color="info" @click.stop.prevent="applyItem">
            <span class="headline">+</span>
          </v-btn>
          <span v-html="header.text" />
          <v-icon small>
            arrow_upward
          </v-icon>
        </template>
        <template v-else>
          <span v-html="header.text" />
          <v-icon small>
            arrow_upward
          </v-icon>
        </template>
      </template>
      <template
        v-if="md.action == 'define' && page == 'define'"
        v-slot:header.action="{ header }"
        <v-icon class="m_add" color="white" @click="newItem"
      >
        add
        </v-icon>
      </template>
      <template
        v-if="md.action == 'define' && page == 'define'"
        v-slot:item.action="{ item }"
        <v-icon
        class="m_delete"
        color="white"
        @click="deleteItem(item)"
      >
        delete
        </v-icon>
        <v-icon
          class="m_edit"
          color="white"
          @click="editItem(item)"
        >
          edit
        </v-icon>
        <!-- <template v-for="header in tbhs">
          <td
            :key="header.id"
            v-html="inf.ds[header.value](props.item[header.value])"
          />
        </template> -->
      </template>
    </v-data-table>
    <img
      v-if="inf.image"
      :src="require(`@/static/images/${inf.image.src}.png`)"
      height="150"
    >
  </v-flex>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex"
import { mds } from "@/constants/app1/static"
import { Infs } from "@/constants/app1/Infs"
export default {
  data: () => ({
    slot: "header.action",
    sort: { by: ["name"], desc: [true] },
    editedIndex: -1
  }),
  computed: {
    ...mapState(["project", "page", "search"]),
    ...mapGetters(["ac", "md", "inf"]),
    path(name) {
      return require(`@/static/images/${name}.png`)
    },
    headers() {
      if (this.md.action == "define" && this.page == "define") {
        return [
          { text: "", value: "action", sortable: false, align: "center" },
          ...this.inf.tbhs
        ]
      }
      return this.inf.tbhs
    },
    items() {
      if (this.page == "results" && "fltR" in this.inf) {
        if ("flt" in this.inf) {
          return this.inf.flt(this.inf.fltR(this.project[this.md.model]))
        } else {
          return this.inf.fltR(this.project[this.md.model])
        }
      }
      if ("flt" in this.inf) {
        return this.inf.flt(this.project[this.md.model])
      }
      return this.project[this.md.model]
    }
  },
  watch: {
    page: {
      handler(val) {
        if (val == "results") {
          this.sort.desc = [false]
        } else {
          this.sort.desc = [true]
        }
      }
    },
    search: {
      handler(val) {
        console.log(val)
      }
    }
  },

  methods: {
    ...mapActions(["stateChange"]),
    console(val) {
      console.log(val)
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = true
      }
    },
    open() {
      this.stateChange({ state: "dialog", value: true })
    },
    applyItem() {
      this.stateChange({ state: "action", value: "apply" })
      this.stateChange({ state: "editedIndex", value: -1 })
      this.open()
    },
    newItem() {
      this.stateChange({ state: "action", value: "create" })
      this.stateChange({ state: "editedIndex", value: -1 })
      this.open()
    },
    editItem(item) {
      this.stateChange({ state: "action", value: "update" })
      this.stateChange({ state: "editedIndex", value: item.id })
      this.open()
    },
    deleteItem(item) {
      this.stateChange({ state: "action", value: "delete" })
      this.stateChange({ state: "editedIndex", value: item.id })
      this.open()
    }
  }
}
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
