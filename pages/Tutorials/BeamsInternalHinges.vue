<template>
  <div class="pa-5 ma-0">
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <h1 class="text-center font-weight-bold my-2">
            Free Online Beams with Internal Hinges Calculator
          </h1>
          <iframe
            title="Free Online Beams with Internal Hinges Calculator"
            width="100%"
            height="343"
            src="https://www.youtube.com/embed/videoseries?list=PLDFGldFvahMtwgBPyknkKHGuu0pB1VMD4&amp;index=4"
            frameborder="0"
            allowfullscreen
          />
        </v-col>
      </v-row>
    </v-container>
    <h2 class="green--text text--darken-3">
      1.Introduction
    </h2>
    <p>
      So do you want to learn how to calculate any structure with Internal
      Hinges ?
    </p>
    <p>
      In this tutorial , we will explain this structure and we walk you through
      creation of this project step by step with the help of this powerful Beams
      calculator.
    </p>
    <p>
      In the end of this tutorial , you will be able to design and calculate any
      structure with Internal Hinges and get all the analysis you need easily.
    </p>
    <p>
      You can check out the full project in this
      <v-btn to="/Full_Project/BeamsInternalHinges">
        Link
      </v-btn>
      .So let's start it
    </p>
    <h2 class="green--text text--darken-3">
      2.Design Structure
    </h2>
    <h3>Nodes</h3>
    <p>Define nodes with these coordinates</p>
    <v-img :src="require('@/assets/images/BeamsInternalHinges/Nodes.png')" />
    <h3>Bars</h3>
    <p>Define bars with these start and end nodes</p>
    <v-img :src="require('@/assets/images/BeamsInternalHinges/Bars.png')" />
    <h3>Supports</h3>
    <p>Apply support pinned to node 1 and 5</p>
    <v-img :src="require('@/assets/images/BeamsInternalHinges/Supports.png')" />
    <h3>Rleases</h3>
    <p>
      the structure has internal hinge between the end of bar 2 and the start of
      bar 3
    </p>
    <p>So,apply release F-P to bar 2 and P-F to bar 3</p>
    <v-img :src="require('@/assets/images/BeamsInternalHinges/Rleases.png')" />
    <h3>Sections</h3>
    <p>Define I section s1 with steel material and these dimensions.</p>
    <v-img
      :src="require('@/assets/images/BeamsInternalHinges/Define_Sections.png')"
    />
    <p>apply section s1 to all beams using the shortcut: *</p>
    <v-img
      :src="require('@/assets/images/BeamsInternalHinges/Apply_Sections.png')"
    />
    <h2 class="green--text text--darken-3">
      3.Apply Loads
    </h2>
    <h3>Point Loads</h3>
    <p>
      Define Point Loads P with magnitude of 40 kilonewton in direction of X.
    </p>
    <v-img
      :src="
        require('@/assets/images/BeamsInternalHinges/Define_PointLoads.png')
      "
    />
    <p>Apply Point Load P to node 2</p>
    <v-img
      :src="require('@/assets/images/BeamsInternalHinges/Apply_PointLoads.png')"
    />
    <h3>Distributed Loads</h3>
    <p>Define Uniform Loads :</p>
    <ul>
      <li>
        q1 with magnitude of 10 Kilo-newton per meter in direction of X in
        global system
      </li>
      <li>
        q2 with magnitude of -50 Kilo-newton per meter in direction of Z in
        global system.
      </li>
    </ul>
    <v-img
      :src="
        require('@/assets/images/BeamsInternalHinges/Define_DistributedLoads.png')
      "
    />
    <p>Apply Uniform Load q1 to bar 1 and Uniform Load q2 to bars 2 and 3</p>
    <v-img
      :src="
        require('@/assets/images/BeamsInternalHinges/Apply_DistributedLoads.png')
      "
    />

    <h2 class="green--text text--darken-3">
      4.Calculate And Get Results
    </h2>
    <h3>Calculate</h3>
    <p>Verify your structure and click solve to start calculate</p>
    <v-img
      :src="require('@/assets/images/BeamsInternalHinges/Calculate.png')"
      class="v-img-fluid"
      style="width: 70%;height: auto;"
      alt="Responsive image"
    />
    <h3>Reactions</h3>
    <p>the reactions of the structure equal to :</p>
    <ul>
      <li>
        -12.5 kilonewton in direction of X and 95.8 kilonewton in direction of Z
        in node 1
      </li>
      <li>
        -77.5 kilonewton in direction of X and 204.2 kilonewton in direction of
        Z in node 5
      </li>
    </ul>
    <v-img
      :src="require('@/assets/images/BeamsInternalHinges/Reactions.png')"
    />
    <h3>Displacements</h3>
    <p>The maximum displacement of the structure equal to :</p>
    <ul>
      <li>8.1 millimetre in direction of X in node 2</li>
      <li>-5.6 millimetre in direction of Z in node 3</li>
      <li>-0.16 degrees in direct rotation in node 5</li>
    </ul>
    <v-img
      :src="require('@/assets/images/BeamsInternalHinges/Displacements.png')"
    />
    <h3>Detailed Analysis</h3>
    <p>
      the length of beam 4 equal to 5 m and its section s1 has Area equal to 220
      cm2 and Inertia(Iy) equal to 136846 cm4
    </p>
    <p>
      The maximum bending moment is 387.5 kilonewton meter at the start of bar 4
      (x=0 [m])
    </p>
    <v-img
      :src="
        require('@/assets/images/BeamsInternalHinges/Detailed_Analysis.png')
      "
    />
    <h2 class="green--text text--darken-3">
      5.Conclusion:
    </h2>
    <p>
      Now you become able to design and calculate any structure with Internal
      Hinges and get all the results you need.
    </p>
    <p>If you have any questions or comments don't hesitate to contact us.</p>
    <p>Thank you for following this tutorial until next time.</p>
  </div>
</template>

<script>
export default {
  head: {
    titleTemplate: "Free Online Beams with Internal Hinges Calculator",
    meta: [
      {
        hid: "description",
        name: "description",
        content:
          "This Beams with Internal Hinges Calculator give you (diagrams , extremes , exact equations of efforts and displacements)for each beam of your structure and a lot more"
      }
    ]
  }
}
</script>

<style></style>
