<template>
  <!-- eslint-disable vue/html-self-closing  -->
  <v-flex xs12 md6>
    <v-card
      v-if="dialog"
      flat
      class="fixed"
      :style="
        $vuetify.breakpoint.mdAndUp ? { width: '45%' } : { width: '100%' }
      "
    >
      <v-card-text class="pa-0">
        <v-container class="pa-1">
          <v-form ref="form" lazy-validation>
            <v-layout>
              <template v-if="md.action == 'define'">
                <v-flex ma-1>
                  <v-btn x-small text @click="close">
                    <Fas i="times" />
                  </v-btn>
                  <br />
                  <v-btn x-small :color="ac.color" data-cy="save" @click="save">
                    <Fas :i="ac.name" />
                  </v-btn>
                </v-flex>
              </template>
              <template v-else-if="md.action == 'apply'">
                <v-flex ma-1>
                  <v-btn x-small text @click="close">
                    <Fas i="times" />
                  </v-btn>
                  <br />
                  <span style="white-space: nowrap;">
                    <v-btn
                      x-small
                      color="error"
                      data-cy="remove"
                      @click="apply('remove')"
                    >
                      <Fas i="minus-circle" />
                    </v-btn>
                    <v-btn
                      x-small
                      color="success"
                      data-cy="apply"
                      @click="apply('apply')"
                    >
                      <Fas i="plus-circle" />
                    </v-btn>
                  </span>
                </v-flex>
              </template>
              <template v-if="action === 'delete'">
                <v-flex class="mt-2">
                  <br />
                  <p class="title text-md-center">
                    Are you sure you want to delete {{ dlt }} ?
                  </p>
                </v-flex>
              </template>
              <template v-else>
                <v-flex>
                  <v-container class="ma-0 pa-0">
                    <v-layout
                      v-for="fmh in inf.fmhs"
                      :key="fmh.id"
                      justify-space-around
                    >
                      <v-flex v-for="headers in fmh" :key="headers.id">
                        <v-layout column>
                          <v-flex
                            v-for="header in headers"
                            :key="header.id"
                            ma-1
                          >
                            <v-checkbox
                              v-if="header.type == 'checkbox'"
                              v-model="$v.editedItem[header.value].$model"
                              v-bind="bd[header.type](header)"
                              :data-cy="header.value"
                            />
                            <v-select
                              v-else-if="header.type == 'select'"
                              v-model="$v.editedItem[header.value].$model"
                              v-bind="bd[header.type](header)"
                              :data-cy="header.value"
                            >
                              <template slot="item" slot-scope="data">
                                <span :data-cy="rplc(data.item.name)">{{
                                  data.item.name
                                }}</span>
                              </template>
                            </v-select>
                            <v-text-field
                              v-else-if="header.type == 'number'"
                              v-model.number="
                                $v.editedItem[header.value].$model
                              "
                              v-bind="bd[header.type](header)"
                              :data-cy="header.value"
                            />
                            <v-text-field
                              v-else-if="header.type == 'text'"
                              v-model.trim="$v.editedItem[header.value].$model"
                              v-bind="bd[header.type](header)"
                              :data-cy="header.value"
                            />
                            <img
                              v-else-if="header.type == 'image'"
                              v-bind="bd[header.type](header)"
                            />
                          </v-flex>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-flex>
              </template>
            </v-layout>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex"
import { help } from "@/constants/app1/help"
import { Vlds } from "@/constants/app1/Vlds"
import { Errs } from "@/constants/app1/Errs"
import { mStore } from "@/constants/static"
export default {
  data: () => ({
    editedItem: { name: null, X: null, Z: null }
  }),
  validations() {
    return {
      editedItem: Vlds[this.slg](this)
    }
  },

  computed: {
    ...mapState(
      mStore.state("project", [
        "project",
        "dialog",
        "slg",
        "action",
        "editedIndex"
      ])
    ),
    ...mapGetters(mStore.getter("project", ["ac", "md", "inf", "modelField"])),
    bd() {
      return {
        checkbox: header => {
          return {
            label: header.text,
            ["error-messages"]: this.Errors[header.value]()
          }
        },
        select: header => {
          return {
            label: header.text,
            ["error-messages"]: this.Errors[header.value](),
            ["item-text"]: "name",
            ["item-value"]: "id",
            items: header.chs
              ? header.chs
              : [...this.project[header["from"]]].sort(
                  (a, b) => a.name - b.name
                )
          }
        },
        number: header => {
          return {
            label: header.text,
            type: header.type,
            ["error-messages"]: this.Errors[header.value]()
          }
        },
        text: header => {
          return {
            label: header.text,
            ["error-messages"]: this.Errors[header.value]()
          }
        },
        image: header => {
          return {
            src: require(`@/assets/images/${header.src}.png`),
            height: header.height
          }
        }
      }
    },
    dlt() {
      0
      return help.test(this.md, "text", "") + '"' + this.editedItem.name + '"'
    },
    Errors() {
      return Errs[this.slg](this)
    }
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
    slg: {
      handler() {
        this.projectChange({ state: "dialog", value: false })
        this.$v.$reset()
        this.editedItem = Object.assign({}, this.inf.defaultItem)
      }
    },
    editedIndex: {
      handler(val) {
        this.$v.$reset()
        if (val > 0) {
          let item
          item = this.project[this.md.model].find(cv => cv.id == val)
          let editedItem
          editedItem = this.inf.fe(item)
          for (const [key, value] of Object.entries(item)) {
            if (value.id) {
              editedItem[key] = value.id
            }
          }
          this.editedItem = Object.assign({}, editedItem)
        } else {
          this.editedItem = Object.assign({}, this.inf.defaultItem)
        }
      }
    }
  },

  methods: {
    rplc(vl) {
      return typeof vl === "string" ? vl.replace(/\s/g, "_") : vl
    },
    ...mapActions(["login"]),
    ...mapActions(mStore.getter("project", ["projectChange", "aProject"])),
    close() {
      this.projectChange({ state: "dialog", value: false })
      this.$v.$reset()
    },
    async save() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.projectChange({ state: "error", value: false })
        try {
          if (this.editedIndex > -1) {
            if (this.action === "delete") {
              await this.$axios.$delete(
                `/api/${this.md.model}/${this.editedIndex}/`
              )
            } else {
              await this.$axios.$put(
                `/api/${this.md.model}/${this.editedIndex}/`,
                { project: this.project.id, ...this.inf.fm(this.editedItem) }
              )
            }
          } else {
            await this.$axios.$post(`/api/${this.md.model}/`, {
              project: this.project.id,
              ...this.inf.fm(this.editedItem)
            })
          }
        } catch (e) {
          console.log(e)
          this.login()
          this.projectChange({ state: "error", value: true })
          this.close()
        }
        this.aProject({ id: this.$route.params.id })
        if (this.editedIndex > -1) {
          this.close()
        } else {
          this.$v.$reset()
        }
      }
    },
    async apply(action) {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        try {
          await this.$axios.$post(
            `/api/${this.md.model}/${this.editedItem.name}/apply/`,
            {
              action: action,
              lst: this.editedItem[this.inf.Static.from],
              project: this.project.id
            }
          )
        } catch (e) {
          console.log(e)
          this.login()
          this.projectChange({ state: "error", value: true })
          this.close()
        }
        this.aProject({ id: this.$route.params.id })
        this.$v.$reset()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.modal-backdrop {
  opacity: 0.1 !important;
}
.fixed {
  border-style: solid;
  border-width: 1px;
  border-color: #757575;
  position: fixed;
  bottom: 1%;
  right: 1%;
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
