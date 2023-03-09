<template>
  <div class="px-5 ma-0 text-center">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h1 class="font-weight-bold my-2">
            Free Online Structure Analysis Software
          </h1>
          <p>
            EffectiveWebApp offers an effective structure analysis software for
            engineers.
          </p>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" md="5">
          <h2 class="green--text">
            Easy to use:
          </h2>
          <p>
            Design truss and frame 2D structure very easy with unlimited
            supports, sections,beams and loads to define
          </p>
          <h2 class="green--text">
            Effective:
          </h2>
          <p>
            Calculate and get all diagrams and equations of efforts,stress and
            displacements for each beam in the structure and a lot more...
          </p>
          <h2 class="green--text">
            Free:
          </h2>
          <p>
            Save all your work online to your free account so no download
            required and you can access to all your projects anytime from any
            devices
          </p>
          <v-btn
            href="/accounts/signup/"
            class="mb-5"
            rounded
            color="primary"
            dark
          >
            Sign up for Free
          </v-btn>
        </v-col>
        <v-col cols="12" md="7">
          <iframe
            v-if="!cypress"
            title="Effective Web App | Free Online Structure Analysis Software"
            width="100%"
            height="343"
            src="https://www.youtube.com/embed/videoseries?list=PLDFGldFvahMtwgBPyknkKHGuu0pB1VMD4&amp;index=0"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <h2 class="green--text">
            Resourceful:
          </h2>
          <p>
            In the tutorial section ,you can find all the resources that you
            need like Beam Calculator,Roof and Truss Calculator,Frame Calculator
            and Beams with Internal Hinges Calculator.... where we walk you
            through the creation of each type of those structure step by step so
            you become able to design and calculate any type of structure and
            get all the results you need easily for free with no limitation
          </p>
          <p>
            you can check out also our
            <strong>android application</strong>:
            <v-btn
              href="https://play.google.com/store/apps/details?id=com.effectivewebapp"
              small
            >
              Link
            </v-btn>
          </p>
          <p>Enjoy!!!</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { test } from "@/mixins/test.js"
export default {
  layout: "index",
  mixins: [test],
  head: {
    titleTemplate:
      "Free Online Structure Analysis Software (Beams,Truss,Frame..)",
    meta: [
      {
        hid: "description",
        name: "description",
        content:
          "Calculate any type of structure (Beams,Truss,Frame..) and get all the results you need for free with no limitation"
      }
    ]
  }
}
</script>
