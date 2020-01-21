/* eslint-disable vue/html-self-closing */
<template>
  <v-flex xs12 md6>
    <v-card v-if="dialog" flat class="fixed">
      <v-card-text class="pa-0">
        <v-container class="pa-1">
          <v-form ref="form" lazy-validation>
            <v-layout>
              <template v-if="action === 'delete'">
                <v-flex class="mt-2">
                  <!-- eslint-disable-next-line vue/html-self-closing -->
                  <br />
                  <p class="title text-md-center">
                    Are you sure you want to delete this project ?
                  </p>
                </v-flex>
              </template>
              <template v-else>
                <v-flex>
                  <v-container>
                    <v-layout justify-space-around row>
                      <v-flex class="pa-1">
                        <v-text-field
                          v-model="$v.editedItem.name.$model"
                          label="Name"
                          :error-messages="Errors.name()"
                          data-cy="name"
                        />
                      </v-flex>
                      <v-flex class="pa-1">
                        <v-select
                          v-if="action == 'copy'"
                          v-model="$v.editedItem.id.$model"
                          label="Project"
                          :items="projects"
                          item-text="name"
                          item-value="id"
                          :error-messages="Errors.id()"
                          data-cy="id"
                        />
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-flex>
              </template>
              <v-flex ma-1>
                <v-btn x-small text @click="close">
                  <Fas i="times" />
                </v-btn>
                <!-- eslint-disable-next-line vue/html-self-closing -->
                <br />
                <v-btn x-small :color="ac.color" data-cy="save" @click="save">
                  <Fas :i="ac.name" />
                </v-btn>
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
import { help } from "../constants/app1/help"
import { mapState, mapActions } from "vuex"
import { mStore } from "@/constants/static"
export default {
  data: () => ({
    editedItem: { name: null }
  }),
  validations() {
    return {
      editedItem: this.vld[this.action]
    }
  },
  computed: {
    ...mapState(
      mStore.state("projects", ["projects", "dialog", "action", "editedIndex"])
    ),
    ac() {
      return help.Acs[this.action]
    },
    defaultItem() {
      return {
        create: { name: null },
        update: { name: null },
        copy: { name: null, id: null },
        delete: {}
      }
    },
    items() {
      return this.projects
    },
    vld() {
      return {
        create: {
          name: {
            required,
            unique: value =>
              !this.projects.find(cv =>
                cv.id != this.editedIndex ? cv.name == value : false
              )
          }
        },
        update: {
          name: {
            required,
            unique: value =>
              !this.projects.find(cv =>
                cv.id != this.editedIndex ? cv.name == value : false
              )
          }
        },
        copy: {
          name: {
            required,
            unique: value =>
              !this.projects.find(cv =>
                cv.id != this.editedIndex ? cv.name == value : false
              )
          },
          id: { required }
        },
        delete: {}
      }
    },
    Errors() {
      return {
        name: () => {
          const errors = []
          if (!this.$v.editedItem.name.$dirty) return errors
          !this.$v.editedItem.name.required && errors.push("Name is required.")
          !this.$v.editedItem.name.unique &&
            errors.push("Project with this name already exist.")
          return errors
        },
        id: () => {
          const errors = []
          if (!this.$v.editedItem.id.$dirty) return errors
          !this.$v.editedItem.id.required && errors.push("Project is required.")
          return errors
        }
      }
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    editedIndex: {
      handler(val) {
        this.$v.$reset()
        if (val > 0) {
          this.editedItem = Object.assign(
            {},
            this.projects.find(cv => cv.id == val)
          )
        } else {
          this.editedItem = Object.assign({}, this.defaultItem[this.action])
        }
      }
    }
  },

  methods: {
    ...mapActions(["login"]),
    ...mapActions(mStore.getter("projects", ["projectsChange", "aProjects"])),
    console(val) {
      console.log(val)
    },
    close() {
      this.projectsChange({ state: "dialog", value: false })
      this.editedItem = Object.assign({}, this.defaultItem["create"])
      this.$v.$reset()
    },
    async save() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.projectsChange({ state: "error", value: false })
        try {
          if (this.editedIndex > -1) {
            if (this.action === "delete") {
              await this.$axios.$delete(`/api/projects/${this.editedIndex}/`)
            } else {
              await this.$axios.$put(`/api/projects/${this.editedIndex}/`, {
                name: this.editedItem.name
              })
            }
          } else if (this.action === "create") {
            await this.$axios.$post("/api/projects/", {
              name: this.editedItem.name
            })
          } else if (this.action === "copy") {
            await this.$axios.$post(
              `/api/projects/${this.editedItem.id}/copy/`,
              { name: this.editedItem.name }
            )
          }
          await this.aProjects()
        } catch (e) {
          console.log(e)
          this.login()
          this.projectsChange({ state: "error", value: true })
        }
        this.close()
      }
    }
  }
}
</script>
<style scoped>
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
