<template>
  <v-flex
    xs12
    md12
  > 
    <v-data-table
      :headers="headers"
      :hide-default-header="false"
      :items="items"
      class="elevation-1"
      item-key="name"
      :search="search"
    > 
      
      <template v-if="md.action == 'define' && page == 'define'" v-slot:header.action="{ header }">
        <v-icon class="m_add" color="white" @click="newItem">
          add
        </v-icon>
      </template>
      <template v-if="md.action == 'define' && page == 'define'" v-slot:item.action="{ item }" >
        <span  v-if="item.project !== defaultProject.url">
          <v-icon class="m_delete" color="white" @click="deleteItem(item)">
            delete
          </v-icon>
          <v-icon class="m_edit" color="white" @click="editItem(item)">
            edit
          </v-icon>
        </span>
        
      </template>
      <template v-for="header in Object.keys(inf.ds)"  v-slot:[hd(header)]="{ item }" >
        <ul :key="header.id" style="list-style-type:none;padding-left: 0;">
          <li v-for="hd in inf.ds[header]" :key="hd.id">
            <v-icon small v-if="hd.type==='bl2'">fas fa-{{ hd.value(item[header],hd.id) }}</v-icon>
            <span v-else >hd.value(item[header],hd.id)</span>
          </li>
        </ul>
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
import { mapState,mapGetters,mapActions } from 'vuex'
export default {
  data: () => ({
    editedIndex: -1,
  }),
  computed: {
    ...mapState(['project','page','search','defaultProject']),
    ...mapGetters(['ac','md','inf','model']),
    path(name) {
      return require(`@/assets/images/${name}.png` )
    },
    headers(){
      if (this.md.action == 'define' && this.page == 'define'){
      return [{ text: '', value: 'action', sortable: false,align: 'center' },...this.inf.tbhs];  
      }
      return this.inf.tbhs;
    },
    items() {
      if (this.page == "results" && "fltR" in this.inf) {
        if ("flt" in this.inf) {
          return this.inf.flt(this.inf.fltR(this.model));
        } else {
          return this.inf.fltR(this.model);
        }
      }
      if ("flt" in this.inf) {
        return this.inf.flt(this.model);
      }
      return this.model;
    }
  },

  methods: {
    ...mapActions(['stateChange']),
    hd(header){
      return "item." + header 
    },
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
      this.stateChange({ state: "dialog", value: true });
    },
    applyItem() {
      this.stateChange({ state: "action", value: "apply" });
      this.stateChange({ state: "editedIndex", value: -1 });
      this.open();
    },
    newItem() {
      this.stateChange({ state: "action", value: "create" });
      this.stateChange({ state: "editedIndex", value: -1 });
      this.open();
    },
    editItem(item) {
      this.stateChange({ state: "action", value: "update" });
      this.stateChange({ state: "editedIndex", value: item.id });
      this.open();
    },
    deleteItem(item) {
      this.stateChange({ state: "action", value: "delete" });
      this.stateChange({ state: "editedIndex", value: item.id });
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
