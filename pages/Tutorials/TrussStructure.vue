<template>
  <div class="white pa-5 ma-0 text-center">
    <h2 class="green--text">1.Introduction</h2>
    <p>Hello and welcome to another structure analysis tutorial .</p>
    <p>In the last tutorial , we create our free account and first project.</p>
    <p>In this tutorial , we will use this powerful Truss and Roof calculator to create our first Truss structure.</p>
    <p>In the end of this tutorial , you will be able to design and calculate any truss structure and get all the analysis</p>
    <p>
      You can check out the full project in this
      <a
        href="{% url 'Full_Project'  'TrussStructure')"
      >link</a>.So let's start it
    </p>
    <h2 class="green--text">2.Design Structure</h2>
    <h3>Nodes</h3>
    <p>Define nodes with these coordinates</p>
    <v-img :src="require('@/assets/images/TrussStructure/Nodes.png')"></v-img>
    <h3>Bars</h3>
    <p>Define bars with these start and end nodes</p>
    <v-img :src="require('@/assets/images/TrussStructure/Bars.png')"></v-img>
    <h3>Supports</h3>
    <p>Apply support pinned to node 1 and roller x to node 4</p>
    <v-img :src="require('@/assets/images/TrussStructure/Supports.png')"></v-img>
    <h3>Releases</h3>
    <p>All beams are articulated in both side.So,apply release P-P to all beams using the shortcut: *</p>
    <v-img :src="require('@/assets/images/TrussStructure/Releases.png')"></v-img>
    <h3>Materials</h3>
    <p>Define material m1 with Young Modulus equal to 210000 megapascal</p>
    <v-img :src="require('@/assets/images/TrussStructure/Materials.png')"></v-img>
    <h3>Sections</h3>
    <p>Define a square hollow section s1 with 7 centimeter side and half centimeter thickness with m1 material you just create</p>
    <v-img :src="require('@/assets/images/TrussStructure/Define_Sections.png')"></v-img>
    <p>apply section s1 to all beams using the shortcut: *</p>
    <v-img :src="require('@/assets/images/TrussStructure/Apply_Sections.png')"></v-img>
    <h2 class="green--text">3.Apply Loads</h2>
    <h3>Point Loads</h3>
    <p>Define Point Loads :</p>
    <ul>
      <li>P with magnitude of -36 kilonewton in direction of Z</li>
      <li>Q with magnitude of -18 kilonewton in direction of Z</li>
    </ul>
    <v-img :src="require('@/assets/images/TrussStructure/Define_PointLoads.png')"></v-img>
    <p>Apply Point Load P to node 1 and Point Load Q to nodes 2 and 3</p>
    <v-img :src="require('@/assets/images/TrussStructure/Apply_PointLoads.png')"></v-img>
    <h2 class="green--text">4.Calculate And Get Results</h2>
    <h3>Calculate</h3>
    <p>Verify your structure and click solve to start calculate</p>
    <v-img
      :src="require('@/assets/images/TrussStructure/Calculate.png')"
      class="img-fluid"
      style="width: 70%;height: auto;"
      alt="Responsive image"
    ></v-img>
    <h3>Reactions</h3>
    <p>the reactions of the structure equal to :</p>
    <ul>
      <li>54 kilonewton in direction of Z in node 1</li>
      <li>36 kilonewton in direction of Z in node 4</li>
    </ul>
    <v-img :src="require('@/assets/images/TrussStructure/Reactions.png')"></v-img>
    <h3>Displacements</h3>
    <p>The maximum displacement of the structure equal to :</p>
    <ul>
      <li>-1.017 millimetre in direction of X in node 4</li>
      <li>-2.267 millimetre in direction of Z in node 2</li>
    </ul>
    <v-img :src="require('@/assets/images/TrussStructure/Displacements.png')"></v-img>
    <h3>Detailed Analysis</h3>
    <p>The maximum shear force of the structure equal to -62.776 kilonewton in all beam 6</p>
    <p>the length of beam 6 equal to 2.44 m and its section s1 has Area equal to 13 cm2 and Inertia(Iy) equal to 92 cm4</p>

    <v-img :src="require('@/assets/images/TrussStructure/Detailed_Analysis.png')"></v-img>
    <h2 class="green--text">5.Conclusion:</h2>
    <p>Now you become able to design and calculate any truss structure and get all the results you need.</p>
    <p>If you have any questions or comments don't hesitate to contact us.</p>
    <p>Thank you for following this tutorial until next time.</p>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>