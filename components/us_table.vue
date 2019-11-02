<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col md="10" lg="8">
        <v-btn color="primary" @click="newItem">
          <v-icon>add</v-icon>New Project
        </v-btn>
        <v-btn color="success" @click="copyItem">
          <v-icon>save_alt</v-icon>Copy Project
        </v-btn>

        <v-data-table :headers="headers" :items="items" class="elevation-1">
          <template v-slot:item.action="{ item }">
            <nuxt-link :to="`/projects/${item.id}`">
              <v-btn class="mx-2" color="primary">
                <v-icon>folder_open</v-icon>
              </v-btn>
            </nuxt-link>
            <v-btn class="mx-2" color="warning" @click="editItem(item)">
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn class="mx-2" color="error" @click="deleteItem(item)">
              <v-icon>delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapState, mapActions } from "vuex"
import { mStore } from "@/constants/static"

export default {
  data: () => ({
    headers: [
      { text: "Name", value: "name" },
      { text: "Modified Date", value: "modified_date" },
      { text: "", value: "action", sortable: false, align: "right" }
    ]
  }),
  computed: {
    ...mapState(mStore.state("projects", ["projects", "search"])),
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item"
    },
    items() {
      return this.projects
    }
  },
  methods: {
    ...mapActions(mStore.getter("projects", ["projectsChange"])),
    console(val) {
      console.log(val)
    },
    open() {
      this.projectsChange({ state: "dialog", value: true })
    },
    newItem() {
      this.projectsChange({ state: "action", value: "create" })
      this.projectsChange({ state: "editedIndex", value: -1 })
      this.open()
    },
    copyItem() {
      this.projectsChange({ state: "action", value: "copy" })
      this.projectsChange({ state: "editedIndex", value: -1 })
      this.open()
    },
    editItem(item) {
      this.projectsChange({ state: "action", value: "update" })
      this.projectsChange({ state: "editedIndex", value: item.id })
      this.open()
    },
    deleteItem(item) {
      this.projectsChange({ state: "action", value: "delete" })
      this.projectsChange({ state: "editedIndex", value: item.id })
      this.open()
    }
  }
}
</script>
<style scoped>
table.v-table tbody td:not(:nth-child(1)) {
  padding: 5px;
}
table.v-table thead th:not(:nth-child(1)) {
  padding: 5px;
}

.m_add {
  margin: 1px;
  background-color: #304ffe;
}
.m_edit {
  margin: 1px;
  background-color: #ffc107;
}
.m_delete {
  margin: 1px;
  background-color: #ff5722;
}
.m_apply {
  margin: 1px;
  background-color: #4caf50;
}

th {
  text-align: left;
  border-top: 1px solid #9fa8da;
  border-bottom: 1px solid #9fa8da;
  width: 1px;
}
td {
  text-align: left;
  border-top: 1px solid #9fa8da;
  border-bottom: 1px solid #9fa8da;
  width: 1px;
}
</style>
