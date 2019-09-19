<template>
  <v-flex
    xs12
    md6
  >
    <v-btn color="primary" @click="newItem">
    <v-icon >add</v-icon>New Project
    </v-btn>
    <v-btn color="success" @click="copyItem">
    <v-icon >save_alt</v-icon>Copy Project
    </v-btn>
    
    <v-data-table :headers="headers" :items="items" class="elevation-1">
        <template v-slot:item.action="{ item }">
          <nuxt-link  :to="`/projects/${item.id}`">
              <v-btn class="mx-2" color="primary" >
                <v-icon >edit</v-icon>Open
              </v-btn> 
            </nuxt-link>            
          <v-btn class="mx-2" color="error"  @click="deleteItem(item)">
            <v-icon >delete</v-icon>Delete
          </v-btn>
        </template>
    </v-data-table> 
  </v-flex>
</template>
<script>
import { mapState,mapActions } from 'vuex'

export default {
  data: () => ({
    headers: [{ text: 'Name', value: 'name' },{ text: '', value: 'action', sortable: false,align: 'right' }]
  }),
  computed: {
    ...mapState(['projects','dialog','action','editedIndex','search']),
    formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    items() {
      return this.projects;
    }
  },

  methods: {
    ...mapActions(['stateChange']),
    console(val) {
      console.log(val);
    },
    open() {
      this.stateChange({ state: "dialog", value: true })
    },
    newItem() {
      this.stateChange({ state: "action", value: "create" })
      this.stateChange({ state: "editedIndex", value: -1 })
      this.open();
    }, 
    copyItem() {
      this.stateChange({ state: "action", value: "copy" })
      this.stateChange({ state: "editedIndex", value: -1 })
      this.open();
    },
    deleteItem(item) {
      this.stateChange({ state: "action", value: "delete" })
      this.stateChange({ state: "editedIndex", value: item.id })
      this.open();
    }
  }

};
</script>
<style  scoped>

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