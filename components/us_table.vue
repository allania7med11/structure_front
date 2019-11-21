<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col md="10" lg="8">
        <v-btn color="primary" @click="newItem">
          <Fas i="plus" />New Project
        </v-btn>
        <v-btn class="success" @click="copyItem">
          <Fas i="copy" />Copy Project
        </v-btn>
        {{ offlineProjects }}
        <v-data-table :headers="headers" :items="items" class="elevation-1">
          <template v-slot:item.action="{ item }">
            <nuxt-link
              v-if="offlineProjects.includes(item.name)"
              :to="`/projects/${item.id}`"
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
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex"
import { mStore } from "@/constants/static"
export default {
  data: () => ({
    headers: [
      { text: "Name", value: "name" },
      { text: "Modified Date", value: "modified_date" },
      { text: "", value: "action", sortable: false, align: "right" }
    ],
    offlineProjects: []
  }),
  computed: {
    ...mapState(mStore.state("projects", ["projects", "search"])),
    ...mapGetters(mStore.getter("projects", ["projectsOffline"])),
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item"
    },
    items() {
      return this.projects
    },
    offline() {
      console.log("$nuxt.isOffline")
      // eslint-disable-next-line no-undef
      console.log(this.$nuxt.isOffline)
      // eslint-disable-next-line no-undef
      return this.$nuxt.isOffline
    }
  },
  watch: {
    offline: {
      immediate: true,
      handler: async function(val) {
        console.log("offline", val)
        if (val) {
          let list = []
          this.projects.forEach(async vl => {
            let project = await this.$axios.$get(`/api/projects/${vl.id}/`, {
              cache: "only-if-cached"
            })
            if (project) {
              list.push(project.name)
            }
          })
          this.offlineProjects = list
          /* this.offlineProjects = this.projects
            .filter(async cv => {
              try {
                const project = await this.$axios.$get(
                  `/api/projects/${cv.id}/`
                )
                console.log("s", project)
                return true
              } catch (e) {
                console.log("e", e)
                return false
              }
            })
            .map(cv2 => cv2.name) */
        } else {
          this.offlineProjects = this.projects.map(cv => cv.name)
        }
      }
    }
  },
  methods: {
    ...mapActions(mStore.getter("projects", ["projectsChange"])),
    ...mapActions(["runtimeCache"]),
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
