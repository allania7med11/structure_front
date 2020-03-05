<template>
  <div class="pa-5 ma-0">
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <h1 class="text-center  font-weight-bold my-2">
            Free Online Frame Calculator
          </h1>
          <iframe
            v-if="!cypress"
            title="Free Online Frame Calculator"
            width="100%"
            height="343"
            src="https://www.youtube.com/embed/videoseries?list=PLDFGldFvahMtwgBPyknkKHGuu0pB1VMD4&amp;index=3"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </v-col>
      </v-row>
    </v-container>
    <h2 class="green--text text--darken-3">
      1.Introduction
    </h2>
    <p>Hello and welcome to another structure analysis tutorial.</p>
    <p>
      In the last tutorials , we create our free account and our first Truss
      structure.
    </p>
    <p>
      In this tutorial , we will use this powerful Frame calculator to create
      our first Frame structure.
    </p>
    <p>
      In the end of this tutorial , you will be able to design and calculate any
      Frame structure and get all the analysis you need easily.
    </p>
    <p>
      You can check out the full project in this
      <v-btn to="/Full_Project?name=FrameStructure">
        Link
      </v-btn>
      ..So let's start it
    </p>

    <h2 class="green--text text--darken-3">
      2.Design Structure
    </h2>
    <h3>Nodes</h3>
    <p>Define nodes with these coordinates</p>
    <v-img :src="require('@/assets/images/FrameStructure/Nodes.png')" />
    <h3>Bars</h3>
    <p>Define bars with these start and end nodes</p>
    <v-img :src="require('@/assets/images/FrameStructure/Bars.png')" />
    <h3>Supports</h3>
    <p>Apply support roller x to node 1 and pinned to node 4</p>
    <v-img :src="require('@/assets/images/FrameStructure/Supports.png')" />
    <h3>Sections</h3>
    <p>Define I section s1 with steel material and these dimensions.</p>
    <v-img
      :src="require('@/assets/images/FrameStructure/Define_Sections.png')"
    />
    <p>apply section s1 to all beams using the shortcut: *</p>
    <v-img
      :src="require('@/assets/images/FrameStructure/Apply_Sections.png')"
    />
    <h2 class="green--text text--darken-3">
      3.Apply Loads
    </h2>
    <h3>Point Loads</h3>
    <p>Define Point Loads :</p>
    <ul>
      <li>P with magnitude of -20 kilonewton in direction of Z</li>
      <li>Q with magnitude of -10 kilonewton in direction of X</li>
    </ul>
    <v-img
      :src="require('@/assets/images/FrameStructure/Define_PointLoads.png')"
    />
    <p>Apply Point Load P to nodes 5 and 6 and Point Load Q to node 7</p>
    <v-img
      :src="require('@/assets/images/FrameStructure/Apply_PointLoads.png')"
    />
    <h3>Distributed Loads</h3>
    <p>
      Define Uniform Load q with magnitude of -10 Kilo-newton per meter in
      direction of Z in global system
    </p>
    <v-img
      :src="
        require('@/assets/images/FrameStructure/Define_DistributedLoads.png')
      "
    />
    <p>Apply Uniform Load q to bar 3</p>
    <v-img
      :src="
        require('@/assets/images/FrameStructure/Apply_DistributedLoads.png')
      "
    />

    <h2 class="green--text text--darken-3">
      4.Calculate And Get Results
    </h2>
    <h3>Calculate</h3>
    <p>Verify your structure and click solve to start calculate</p>
    <v-img
      :src="require('@/assets/images/FrameStructure/Calculate.png')"
      class="img-fluid"
      style="width: 70%;height: auto;"
      alt="Responsive image"
    />
    <h3>Reactions</h3>
    <p>the reactions of the structure equal to :</p>
    <ul>
      <li>46.7 kilonewton in direction of Z in node 1</li>
      <li>
        10 kilonewton in direction of X and 23.2 kilonewton in direction of Z in
        node 4
      </li>
    </ul>
    <v-img :src="require('@/assets/images/FrameStructure/Reactions.png')" />
    <h3>Displacements</h3>
    <p>The maximum displacement of nodes in the structure equal to :</p>
    <ul>
      <li>-20.74 millimetre in direction of X in node 1</li>
      <li>-13.048 millimetre in direction of Z in node 6</li>
      <li>-0.187 degrees in direct rotation in node 1</li>
    </ul>
    <v-img :src="require('@/assets/images/FrameStructure/Displacements.png')" />
    <h3>Detailed Analysis</h3>
    <p>
      the length of beam 3 equal to 3 m and its section s1 has Area equal to 220
      cm2 and Moment of Inertia(Iy) equal to 136846 cm4
    </p>
    <p>
      The maximum bending moment is -183.01657 kilonewton meter in bar 3 for x
      equal to 2.68 metre
    </p>

    <v-img
      :src="require('@/assets/images/FrameStructure/Detailed_Analysis.png')"
    />
    <h2 class="green--text text--darken-3">
      5.Conclusion:
    </h2>
    <p>
      Now you become able to design and calculate any Frame structure and get
      all the results you need.
    </p>
    <p>If you have any questions or comments don't hesitate to contact us.</p>
    <p>Thank you for following this tutorial until next time.</p>
  </div>
</template>

<script>
import { test } from "@/mixins/test.js"
export default {
  mixins: [test],
  head: {
    titleTemplate: "Free Online Frame Calculator",
    meta: [
      {
        hid: "description",
        name: "description",
        content:
          "This  Frame Calculator give you (diagrams , extremes , exact equations of efforts and displacements)for each beam of your structure and a lot more"
      }
    ]
  }
}
</script>

<style></style>
