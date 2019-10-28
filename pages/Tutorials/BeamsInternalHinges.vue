<template>
  <div class="pa-5 ma-0">
    <h2 class="green--text">1.Introduction</h2>
    <p>So do you want to learn how to calculate any structure with Internal Hinges ?</p>
    <p>
      In this tutorial , we will explain this structure and we walk you through creation of this project step by step
      with the help of this powerful Beams calculator.
    </p>
    <p>
      In the end of this tutorial , you will be able to design and calculate any structure with Internal Hinges and get all the analysis
      you need easily.
    </p>
    <p>
      You can check out the full project in this
      <n-link to="/Full_Project/BeamsInternalHinges">link</n-link>.So let's start it
    </p>
    <h2 class="green--text">2.Design Structure</h2>
    <h3>Nodes</h3>
    <p>Define nodes with these coordinates</p>
    <v-img :src="require('@/assets/images/BeamsInternalHinges/Nodes.png' )"></v-img>
    <h3>Bars</h3>
    <p>Define bars with these start and end nodes</p>
    <v-img :src="require('@/assets/images/BeamsInternalHinges/Bars.png' )"></v-img>
    <h3>Supports</h3>
    <p>Apply support pinned to node 1 and 5</p>
    <v-img :src="require('@/assets/images/BeamsInternalHinges/Supports.png' )"></v-img>
    <h3>Rleases</h3>
    <p>the structure has internal hinge between the end of bar 2 and the start of bar 3</p>
    <p>So,apply release F-P to bar 2 and P-F to bar 3</p>
    <v-img :src="require('@/assets/images/BeamsInternalHinges/Rleases.png' )"></v-img>
    <h3>Sections</h3>
    <p>Define I section s1 with steel material and these dimensions.</p>
    <v-img :src="require('@/assets/images/BeamsInternalHinges/Define_Sections.png' )"></v-img>
    <p>apply section s1 to all beams using the shortcut: *</p>
    <v-img :src="require('@/assets/images/BeamsInternalHinges/Apply_Sections.png' )"></v-img>
    <h2 class="green--text">3.Apply Loads</h2>
    <h3>Point Loads</h3>
    <p>Define Point Loads P with magnitude of 40 kilonewton in direction of X.</p>
    <v-img :src="require('@/assets/images/BeamsInternalHinges/Define_PointLoads.png' )"></v-img>
    <p>Apply Point Load P to node 2</p>
    <v-img :src="require('@/assets/images/BeamsInternalHinges/Apply_PointLoads.png' )"></v-img>
    <h3>Distributed Loads</h3>
    <p>Define Uniform Loads :</p>
    <ul>
      <li>q1 with magnitude of 10 Kilo-newton per meter in direction of X in global system</li>
      <li>q2 with magnitude of -50 Kilo-newton per meter in direction of Z in global system.</li>
    </ul>
    <v-img :src="require('@/assets/images/BeamsInternalHinges/Define_DistributedLoads.png' )"></v-img>
    <p>Apply Uniform Load q1 to bar 1 and Uniform Load q2 to bars 2 and 3</p>
    <v-img :src="require('@/assets/images/BeamsInternalHinges/Apply_DistributedLoads.png' )"></v-img>

    <h2 class="green--text">4.Calculate And Get Results</h2>
    <h3>Calculate</h3>
    <p>Verify your structure and click solve to start calculate</p>
    <v-img
      :src="require('@/assets/images/BeamsInternalHinges/Calculate.png' )"
      class="v-img-fluid"
      style="width: 70%;height: auto;"
      alt="Responsive image"
    ></v-img>
    <h3>Reactions</h3>
    <p>the reactions of the structure equal to :</p>
    <ul>
      <li>-12.5 kilonewton in direction of X and 95.8 kilonewton in direction of Z in node 1</li>
      <li>-77.5 kilonewton in direction of X and 204.2 kilonewton in direction of Z in node 5</li>
    </ul>
    <v-img :src="require('@/assets/images/BeamsInternalHinges/Reactions.png' )"></v-img>
    <h3>Displacements</h3>
    <p>The maximum displacement of the structure equal to :</p>
    <ul>
      <li>8.1 millimetre in direction of X in node 2</li>
      <li>-5.6 millimetre in direction of Z in node 3</li>
      <li>-0.16 degrees in direct rotation in node 5</li>
    </ul>
    <v-img :src="require('@/assets/images/BeamsInternalHinges/Displacements.png' )"></v-img>
    <h3>Detailed Analysis</h3>
    <p>the length of beam 4 equal to 5 m and its section s1 has Area equal to 220 cm2 and Inertia(Iy) equal to 136846 cm4</p>
    <p>The maximum bending moment is 387.5 kilonewton meter at the start of bar 4 (x=0 [m])</p>
    <v-img :src="require('@/assets/images/BeamsInternalHinges/Detailed_Analysis.png' )"></v-img>
    <h2 class="green--text">5.Conclusion:</h2>
    <p>Now you become able to design and calculate any structure with Internal Hinges and get all the results you need.</p>
    <p>If you have any questions or comments don't hesitate to contact us.</p>
    <p>Thank you for following this tutorial until next time.</p>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>