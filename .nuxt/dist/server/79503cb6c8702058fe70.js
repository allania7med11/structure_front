exports.ids=[5],exports.modules={102:function(t,e,n){t.exports=n.p+"img/2005789.png"},103:function(t,e,n){t.exports=n.p+"img/a8e2258.png"},104:function(t,e,n){t.exports=n.p+"img/c4130cb.png"},105:function(t,e,n){t.exports=n.p+"img/a59c10d.png"},106:function(t,e,n){t.exports=n.p+"img/7a02ab4.png"},107:function(t,e,n){t.exports=n.p+"img/a548f13.png"},108:function(t,e,n){t.exports=n.p+"img/19be346.png"},109:function(t,e,n){t.exports=n.p+"img/090166f.png"},110:function(t,e,n){t.exports=n.p+"img/8563bda.png"},111:function(t,e,n){t.exports=n.p+"img/9377d4c.png"},112:function(t,e,n){t.exports=n.p+"img/8031734.png"},113:function(t,e,n){t.exports=n.p+"img/bf42470.png"},114:function(t,e,n){t.exports=n.p+"img/f85e444.png"},144:function(t,e,n){"use strict";n.r(e);var o={mixins:[n(56).a],head:{titleTemplate:"Free Online Roof and Truss Calculator",meta:[{hid:"description",name:"description",content:"This  Beam Calculator give you diagrams , extremes , exact equations of efforts and displacements of your beam and a lot more"}]}},r=n(5);var component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"pa-5 ma-0"},[o("v-container",{attrs:{fluid:""}},[o("v-row",{attrs:{justify:"center"}},[o("v-col",{attrs:{cols:"12",md:"8"}},[o("h1",{staticClass:"text-center font-weight-bold my-2"},[t._v("\n          Free Online Roof and Truss Calculator\n        ")]),t._v(" "),t.cypress?t._e():o("iframe",{attrs:{title:"Free Online Roof and Truss Calculator",width:"100%",height:"343",src:"https://www.youtube.com/embed/videoseries?list=PLDFGldFvahMtwgBPyknkKHGuu0pB1VMD4&index=2",frameborder:"0",allowfullscreen:""}})])],1)],1),t._ssrNode(' <h2 class="green--text text--darken-3">\n    1.Introduction\n  </h2> <p>Hello and welcome to another structure analysis tutorial .</p> <p>In the last tutorial , we create our free account and first project.</p> <p>\n    In this tutorial , we will use this powerful Truss and Roof calculator to\n    create our first Truss structure.\n  </p> <p>\n    In the end of this tutorial , you will be able to design and calculate any\n    truss structure and get all the analysis\n  </p> '),t._ssrNode("<p>","</p>",[t._ssrNode("\n    You can check out the full project in this\n    "),o("v-btn",{attrs:{to:"/Full_Project/TrussStructure"}},[t._v("\n      link\n    ")]),t._ssrNode("\n    .So let's start it\n  ")],2),t._ssrNode(' <h2 class="green--text text--darken-3">\n    2.Design Structure\n  </h2> <h3>Nodes</h3> <p>Define nodes with these coordinates</p> '),o("v-img",{attrs:{src:n(102)}}),t._ssrNode(" <h3>Bars</h3> <p>Define bars with these start and end nodes</p> "),o("v-img",{attrs:{src:n(103)}}),t._ssrNode(" <h3>Supports</h3> <p>Apply support pinned to node 1 and roller x to node 4</p> "),o("v-img",{attrs:{src:n(104)}}),t._ssrNode(" <h3>Releases</h3> <p>\n    All beams are articulated in both side.So,apply release P-P to all beams\n    using the shortcut: *\n  </p> "),o("v-img",{attrs:{src:n(105)}}),t._ssrNode(" <h3>Materials</h3> <p>Define material m1 with Young Modulus equal to 210000 megapascal</p> "),o("v-img",{attrs:{src:n(106)}}),t._ssrNode(" <h3>Sections</h3> <p>\n    Define a square hollow section s1 with 7 centimeter side and half\n    centimeter thickness with m1 material you just create\n  </p> "),o("v-img",{attrs:{src:n(107)}}),t._ssrNode(" <p>apply section s1 to all beams using the shortcut: *</p> "),o("v-img",{attrs:{src:n(108)}}),t._ssrNode(' <h2 class="green--text text--darken-3">\n    3.Apply Loads\n  </h2> <h3>Point Loads</h3> <p>Define Point Loads :</p> <ul><li>P with magnitude of -36 kilonewton in direction of Z</li> <li>Q with magnitude of -18 kilonewton in direction of Z</li></ul> '),o("v-img",{attrs:{src:n(109)}}),t._ssrNode(" <p>Apply Point Load P to node 1 and Point Load Q to nodes 2 and 3</p> "),o("v-img",{attrs:{src:n(110)}}),t._ssrNode(' <h2 class="green--text text--darken-3">\n    4.Calculate And Get Results\n  </h2> <h3>Calculate</h3> <p>Verify your structure and click solve to start calculate</p> '),o("v-img",{staticClass:"img-fluid",staticStyle:{width:"70%",height:"auto"},attrs:{src:n(111),alt:"Responsive image"}}),t._ssrNode(" <h3>Reactions</h3> <p>the reactions of the structure equal to :</p> <ul><li>54 kilonewton in direction of Z in node 1</li> <li>36 kilonewton in direction of Z in node 4</li></ul> "),o("v-img",{attrs:{src:n(112)}}),t._ssrNode(" <h3>Displacements</h3> <p>The maximum displacement of the structure equal to :</p> <ul><li>-1.017 millimetre in direction of X in node 4</li> <li>-2.267 millimetre in direction of Z in node 2</li></ul> "),o("v-img",{attrs:{src:n(113)}}),t._ssrNode(" <h3>Detailed Analysis</h3> <p>\n    The maximum shear force of the structure equal to -62.776 kilonewton in\n    all beam 6\n  </p> <p>\n    the length of beam 6 equal to 2.44 m and its section s1 has Area equal to\n    13 cm2 and Inertia(Iy) equal to 92 cm4\n  </p> "),o("v-img",{attrs:{src:n(114)}}),t._ssrNode(' <h2 class="green--text text--darken-3">\n    5.Conclusion:\n  </h2> <p>\n    Now you become able to design and calculate any truss structure and get\n    all the results you need.\n  </p> <p>If you have any questions or comments don\'t hesitate to contact us.</p> <p>Thank you for following this tutorial until next time.</p>')],2)}),[],!1,(function(t){}),null,"eab64a5c");e.default=component.exports},56:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));const o={computed:{cypress:()=>!1}}}};