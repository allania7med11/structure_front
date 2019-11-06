<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col md="8">
        <v-alert v-if="success" dismissible type="success">
          Success! Email sent.
        </v-alert>
        <v-alert v-if="error" dismissible type="error">
          An error occurred
        </v-alert>
        <v-card shaped>
          <v-card-title
            class="justify-center white--text info font-italic font-weight-bold display-1"
          >
            Contact Us
          </v-card-title>
          <v-card-text>
            <form>
              <v-text-field
                v-model="from_email"
                :error-messages="from_emailErrors"
                label="From Email"
                required
                @input="$v.from_email.$touch()"
                @blur="$v.from_email.$touch()"
              />
              <v-text-field
                v-model="subject"
                :error-messages="subjectErrors"
                label="Subject"
                required
                @input="$v.subject.$touch()"
                @blur="$v.subject.$touch()"
              />
              <v-textarea
                v-model="message"
                :error-messages="messageErrors"
                label="message"
                required
                @input="$v.message.$touch()"
                @blur="$v.message.$touch()"
              />
            </form>
          </v-card-text>
          <v-card-actions class="justify-center white--text">
            <v-btn
              class="info font-italic font-weight-bold px-4 title"
              large
              rounded
              @click="submit"
            >
              Send Email
              <v-icon class="mx-2">
                fas fa-paper-plane
              </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { validationMixin } from "vuelidate"
import { required, email } from "vuelidate/lib/validators"

export default {
  mixins: [validationMixin],

  validations: {
    from_email: { required, email },
    subject: { required },
    message: { required }
  },

  data: () => ({
    from_email: "",
    subject: "",
    message: "",
    success: false,
    error: false
  }),

  computed: {
    from_emailErrors() {
      const errors = []
      if (!this.$v.from_email.$dirty) return errors
      !this.$v.from_email.email && errors.push("Must be valid e-mail")
      !this.$v.from_email.required && errors.push("From Email is required")
      return errors
    },
    subjectErrors() {
      const errors = []
      if (!this.$v.subject.$dirty) return errors
      !this.$v.subject.required && errors.push("subject is required.")
      return errors
    },
    messageErrors() {
      const errors = []
      if (!this.$v.message.$dirty) return errors
      !this.$v.message.required && errors.push("message is required.")
      return errors
    }
  },

  methods: {
    async submit() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.success = false
        this.error = false
        try {
          await this.$axios.$post("/api/users/contact/", {
            from_email: this.from_email,
            subject: this.subject,
            message: this.message
          })
          this.success = true
        } catch (e) {
          console.log(e)
          this.error = true
        }
      }
    }
  }
}
</script>
