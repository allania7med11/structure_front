/* eslint-disable vue/html-self-closing */
<template>
  <div>
    <v-flex xs12 md12>
      <v-data-table
        :headers="headers"
        :hide-default-header="false"
        :items="items"
        class="elevation-1 pre-formatted"
        item-key="name"
        :search="search"
        :sort-by="sort.by"
        :sort-desc="sort.desc"
        data-cy="tab"
      >
        <template
          v-if="$nuxt.isOnline && md.action == 'define' && page == 'define'"
          v-slot:header.action="{ header }"
        >
          <v-btn x-small class="primary" data-cy="newItem" @click="newItem">
            <Fas i="plus" />
          </v-btn>
        </template>
        <template
          v-if="$nuxt.isOnline && md.action == 'apply' && page == 'define'"
          v-slot:header.name="{ header }"
        >
          <v-btn
            x-small
            fab
            class="elevation-1"
            color="info"
            data-cy="applyItem"
            @click.stop.prevent="applyItem"
          >
            <span class="headline">+</span>
          </v-btn>
          <span>name</span>
        </template>
        <template
          v-if="$nuxt.isOnline && md.action == 'define' && page == 'define'"
          v-slot:item.action="{ item }"
        >
          <span v-if="item.project.id !== '1'">
            <v-btn x-small color="warning" @click="editItem(item)">
              <Fas i="edit" />
            </v-btn>
            <v-btn x-small color="error" @click="deleteItem(item)">
              <Fas i="trash-alt" />
            </v-btn>
          </span>
        </template>
        <template
          v-for="header in Object.keys(inf.ds)"
          v-slot:[hd(header)]="{ item }"
        >
          <ul :key="header.id" style="list-style-type:none;padding-left: 0;">
            <li v-for="(hdi, index) in inf.ds[header]" :key="hdi.id">
              <Fas
                v-if="hdi.type === 'bl'"
                :i="hdi.value(item[header], index)"
              />
              <span v-else-if="hdi.type === 'list'">{{
                hdi.value(item[header])
              }}</span>
              <span v-else>{{ hdi.value(item[header], index) }}</span>
            </li>
          </ul>
        </template>
      </v-data-table>
    </v-flex>
    <img
      v-if="inf.Static.image"
      :src="require(`@/assets/images/${inf.Static.image.src}.png`)"
      height="150"
    />
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex"
import { mStore } from "@/constants/static"
export default {
  data: () => ({
    editedIndex: -1
  }),
  computed: {
    ...mapState(mStore.state("project", ["project", "page", "search"])),
    ...mapGetters(mStore.getter("project", ["ac", "md", "inf", "model"])),
    path(name) {
      return require(`@/assets/images/${name}.png`)
    },
    sort() {
      if (this.page == "results") {
        return { by: ["name"], desc: [false] }
      }
      return { by: ["name"], desc: [true] }
    },
    headers() {
      if (this.md.action == "define" && this.page == "define") {
        const rtn = [
          { text: "", value: "action", sortable: false, align: "center" },
          ...this.inf.tbhs
        ]
        // eslint-disable-next-line no-debugger
        debugger
        return rtn
      }
      return this.inf.tbhs
    },
    items() {
      if (this.page == "results" && !!this.inf.fltR) {
        if (this.inf.flt) {
          return this.inf.flt(this.inf.fltR(this.model))
        } else {
          return this.inf.fltR(this.model)
        }
      }
      if (this.page == "results" && !!this.inf.fltRM) {
        if (this.inf.flt) {
          return this.inf.flt(this.inf.fltRM(this.project, this.model))
        } else {
          return this.inf.fltRM(this.project, this.model)
        }
      }
      if (this.inf.flt) {
        return this.inf.flt(this.model)
      }
      return this.model
    }
  },

  methods: {
    ...mapActions(mStore.getter("project", ["projectChange"])),
    hd(header) {
      return "item." + header
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
      this.projectChange({ state: "dialog", value: true })
    },
    applyItem() {
      this.projectChange({ state: "action", value: "apply" })
      this.projectChange({ state: "editedIndex", value: -1 })
      this.open()
    },
    newItem() {
      this.projectChange({ state: "action", value: "create" })
      this.projectChange({ state: "editedIndex", value: -1 })
      this.open()
    },
    editItem(item) {
      this.projectChange({ state: "action", value: "update" })
      this.projectChange({ state: "editedIndex", value: item.id })
      this.open()
    },
    deleteItem(item) {
      this.projectChange({ state: "action", value: "delete" })
      this.projectChange({ state: "editedIndex", value: item.id })
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
.pre-formatted {
  white-space: pre;
}
</style>
