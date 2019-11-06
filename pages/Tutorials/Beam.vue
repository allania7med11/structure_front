<template>
  <div class="pa-5 ma-0">
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <h1 class="text-center  font-weight-bold my-2">
            Free Online Beam Calculator
          </h1>
          {{ iframe }}
          <iframe
            title="Free Online Beam Calculator"
            width="100%"
            height="343"
            src="https://www.youtube.com/embed/videoseries?list=PLDFGldFvahMtwgBPyknkKHGuu0pB1VMD4&amp;index=1"
            frameborder="0"
            allowfullscreen
          />
        </v-col>
      </v-row>
    </v-container>
    <h2 class="green--text text--darken-3">
      1.Introduction
    </h2>
    <p>Hello and welcome to your first structure analysis tutorial.</p>
    <p>
      In this tutorials , we will create our free account and first project.
    </p>
    <p>
      In the end of this tutorial , you will be able to use this powerful tool
      and calculate any structure easily.
    </p>
    <p>
      You can check out the full project in this
      <v-btn to="/Full_Project/Beam">
        Link
      </v-btn>
      .So let's start it
    </p>
    <h2 class="green--text text--darken-3">
      2.Design Structure
    </h2>
    <h3>Nodes</h3>
    <p>Define nodes with these coordinates</p>
    <v-img :src="require('@/assets/images/Beam/Nodes.png')" />
    <h3>Bars</h3>
    <p>Define bar 1 with these start and end nodes</p>
    <v-img :src="require('@/assets/images/Beam/Bars.png')" />
    <h3>Supports</h3>
    <p>Apply support pinned to node 1 and roller x to node 2</p>
    <v-img :src="require('@/assets/images/Beam/Supports.png')" />
    <h3>Materials</h3>
    <p>Define material m1 with Young Modulus equal to 24000 megapascal</p>
    <v-img :src="require('@/assets/images/Beam/Materials.png')" />
    <h3>Sections</h3>
    <p>
      Define rectangular section s1 with m1 material you just create and these
      dimensions.
    </p>
    <v-img :src="require('@/assets/images/Beam/Define_Sections.png')" />
    <p>apply section s1 to bar 1</p>
    <v-img :src="require('@/assets/images/Beam/Apply_Sections.png')" />
    <h2 class="green--text text--darken-3">
      3.Apply Loads
    </h2>
    <h3>Distributed Loads</h3>
    <p>
      Define Uniform Load q with magnitude of -20 Kilo-newton per meter in
      direction of Z in global system
    </p>
    <v-img :src="require('@/assets/images/Beam/Define_DistributedLoads.png')" />
    <p>Apply Uniform Load q to bar 1</p>
    <v-img :src="require('@/assets/images/Beam/Apply_DistributedLoads.png')" />

    <h2 class="green--text text--darken-3">
      4.Calculate And Get Results
    </h2>
    <h3>Calculate</h3>
    <p>Verify your structure and click solve to start calculate</p>
    <v-img
      :src="require('@/assets/images/Beam/Calculate.png')"
      class="v-img-fluid"
      style="width: 70%;height: auto;"
      alt="Responsive image"
    />
    <h3>Reactions</h3>
    <p>the reactions of the structure equal to :</p>
    <ul>
      <li>40 kilonewton in direction of Z in node 1</li>
      <li>40 kilonewton in direction of Z in node 4</li>
    </ul>
    <v-img :src="require('@/assets/images/Beam/Reactions.png')" />
    <h3>Detailed Analysis</h3>
    <p>
      the length of beam 3 equal to 4 m and its section s1 has Area equal to 740
      cm2 and Moment of Inertia(Iy) equal to 84421.67 cm4
    </p>
    <p>
      The maximum bending moment is -40 kilonewton meter for x equal to 2 metre
    </p>
    <v-img :src="require('@/assets/images/Beam/Detailed_Analysis1.png')" />
    <p>
      The maximum displacement in direction of Z is -2.604 millimetre for x
      equal to 2 metre
    </p>
    <v-img :src="require('@/assets/images/Beam/Detailed_Analysis2.png')" />
    <h2 class="green--text text--darken-3">
      5.Conclusion:
    </h2>
    <p>
      Now you become able to use this powerful tool and calculate any structure
      easily.
    </p>
    <p>If you have any questions or comments don't hesitate to contact us.</p>
    <p>If you want to go further you can check out other tutorials</p>
    <p>Thank you for following this tutorial until next time.</p>
  </div>
</template>

<script>
export default {}
</script>
