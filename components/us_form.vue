<template>
  <v-flex xs12 md6>
    <v-card
      v-if="dialog"
      flat
      class="fixed"
    >
      <v-card-text class="pa-0">
        <v-container class="pa-1">
          <v-form
            ref="form"
            lazy-validation
          >
            <v-layout>
              <template v-if="action === 'delete'">
                <v-flex class="mt-2">
                  <br>
                  <p class="title text-md-center">
                    Are you sure you want to delete this project ?
                  </p>
                </v-flex>
              </template>
              <template v-else>
                <v-flex>
                  <v-container >
                    <v-layout justify-space-around row>
                      <v-flex class="pa-1" >
                        <v-text-field v-model="$v.editedItem.name.$model" label="Name" :error-messages="Errors.name()">
                        </v-text-field>
                      </v-flex>
                      <v-flex class="pa-1">
                       <v-select
                          v-if="action == 'copy'"
                          label="Project"
                          :items="this.projects"
                          item-text="name"
                          item-value="id"
                          v-model="$v.editedItem.id.$model"
                          :error-messages="Errors.id()"
                        />
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-flex>
              </template>
                <v-flex ma-1>
                    <v-icon
                    small
                    @click="close"
                    >
                    close
                    </v-icon>
                    <br>
                    <v-icon
                    :class="ac.class"
                    color="white"
                    @click="save"
                    >
                    {{
                        ac.name
                    }}
                    </v-icon>
                </v-flex>
            </v-layout>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
import { required } from "vuelidate/lib/validators"
import {  Acs  } from "../constants/app1/static";
import { mapState,mapActions } from 'vuex'
const axios = require('axios');
export default {
  data: () => ({
    editedItem: { name: null }
  }),
  validations() {
    return {
      editedItem: this.vld[this.action]
    };
  },
  computed: {
    ...mapState(['projects','dialog','action','editedIndex','csrf']),
    ac() {
      return Acs[this.action];
    },
    defaultItem() {
      return{
        "create":{name: null},
        "copy":{name: null,id:null},
        "delete":{}
      }
    },
    items() {
      return this.projects;
    },
    vld() {
      return{
        "create":{name: { required }},
        "copy":{name: { required },id: { required }},
        "delete":{}
      }
    },
    Errors() {
      return {
          name:() => {
            const errors = []
            if (!this.$v.editedItem.name.$dirty) return errors
            !this.$v.editedItem.name.required && errors.push('Name is required.')
            return errors
          },
          id:() => {
            const errors = []
            if (!this.$v.editedItem.id.$dirty) return errors
            !this.$v.editedItem.id.required && errors.push('Project is required.')
            return errors
          }
      };
    }

  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    action: {
      handler(val) {
        this.$v.$reset();
        this.editedItem = Object.assign({}, this.defaultItem[val]);
      }
    }
  },

  methods: {
    ...mapActions(['stateChange']),
    console(val) {
      console.log(val);
    },
    close() {
      this.stateChange({ state: "dialog", value: false })
      this.$v.$reset();
    },
    async save() {
      let response = {};
      let projects = [];
      let rtn = [];
      this.$v.$touch();
      if (!this.$v.$invalid) {
        console.log({"X-CSRFToken": this.csrf})
        if (this.action === "delete") {
          response = await axios.delete(
            `/api/projects/${ this.editedIndex }`,
            {
              headers:{["X-CSRFToken"]: this.csrf}
            }
          );
        }  
        else if (this.action === "create") {
          response = await axios.post(
            "/api/projects/",
            { name: this.editedItem.name },
            {
              headers:{["X-CSRFToken"]: this.csrf}
            }
          );
        }
        else {
           response = await this.$apollo.mutate(
            mutateServer(
              "copyProject",
              "CopyProjectInput!",
              { name: this.editedItem.name,id: this.editedItem.id },
              this.query
            )
          );
        }
        projects= await axios.get("/api/projects/");
        this.stateChange({ state: "projects", value: projects.data })
        this.close();
      }
    } 
  }
};
</script>
<style  scoped>
.modal-backdrop {
  opacity: 0.1 !important;
}
.fixed {
  border-style: solid;
  border-width: 1px;
  border-color: #757575;
  position: fixed;
  bottom: 1%;
  left: 50%;
  transform: translateX(-50%);
  -webkit-box-shadow: none !important;
  -moz-box-shadow: none !important;
  box-shadow: none !important;
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

</style>
