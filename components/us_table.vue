<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col md="10" lg="8">
        <v-btn color="primary" data-cy="newItem" @click="newItem">
          <Fas i="plus" />New Project
        </v-btn>
        <v-btn class="success" data-cy="copyItem" @click="copyItem">
          <Fas i="copy" />Copy Project
        </v-btn>
        <v-data-table
          :headers="headers"
          :items="items"
          class="elevation-1"
          :sort-by="sort.by"
          :sort-desc="sort.desc"
        >
          <template v-slot:item.action="{ item }">
            <nuxt-link
              v-if="testOfflineProjects(item)"
              :to="`/projects/${item.id}`"
              data-cy="open"
            >
              <v-btn class="mx-2" color="primary">
                <Fas i="folder-open" />
              </v-btn>
            </nuxt-link>
            <v-btn
              v-if="$nuxt.isOnline"
              class="mx-2"
              color="warning"
              @click="editItem(item)"
            >
              <Fas i="edit" />
            </v-btn>
            <v-btn
              v-if="$nuxt.isOnline"
              class="mx-2"
              color="error"
              @click="deleteItem(item)"
            >
              <Fas i="trash-alt" />
            </v-btn>
          </template>
          <template v-slot:item.date="{ item }">
            {{ item["last_modified"] }}
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
      { text: "Last Modified", value: "date" },
      { text: "", value: "action", sortable: false, align: "right" }
    ]
  }),
  computed: {
    ...mapState(
      mStore.state("projects", ["projects", "search", "offlineProjects"])
    ),
    sort() {
      return { by: ["date"], desc: [true] }
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item"
    },
    items() {
      return this.projects
    },
    offline() {
      return this.$nuxt.isOffline
    }
  },
  watch: {
    offline: {
      immediate: true,
      handler: async function(val) {
        if (val) {
          this.aOfflineProjects()
        }
      }
    }
  },
  methods: {
    ...mapActions(
      mStore.getter("projects", ["projectsChange", "aOfflineProjects"])
    ),
    ...mapActions(["runtimeCache"]),
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
    },
    testOfflineProjects(item) {
      if (this.offline) {
        return this.offlineProjects.find(cv =>
          cv.includes(`/api/projects/${item.id}/`)
        )
      }
      return true
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
