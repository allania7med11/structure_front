<template>
  <div>
    <v-container class="pl-5">
      <v-row>
        <h1>What is structure analysis?:</h1>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <p class="ml-5">
          Structure is a combination of members connected together in such a way
          to serve a useful purpose.<br />
          Structure Analysis is a method by which we find out how a structure or
          a member of a structure behaves when subjected to different loads. The
          results of the analysis are used to verify the structure’s strength
          for its uses. Structural analysis is thus a key part of structural
          engineering.
        </p>
      </v-row>
      <v-row>
        <h1>Structural Members:</h1>
      </v-row>
      <v-divider></v-divider>
      <v-row v-for="mb in members" :key="mb.id" class="pl-0" justify="start">
        <v-col class="pl-0" cols="12">
          <v-card class="pa-5">
            <v-row align="center">
              <v-col cols="12" sm="8">
                <h2>{{ mb.name }}</h2>
                <p>{{ mb.desc }}</p>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="12" sm="4">
                <v-img
                  :src="require(`@/assets/images/Blog/${mb.img}.png`)"
                  :alt="'Structural Member: ' + mb.img"
                ></v-img>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <h1>Types of structures:</h1>
      </v-row>
      <v-divider></v-divider>
      <v-row v-for="tp in types" :key="tp.id" class="pl-0" justify="start">
        <v-col class="pl-0" cols="12">
          <v-card class="pa-5">
            <v-row align="center">
              <v-col cols="12" sm="8">
                <h2>{{ tp.name }}</h2>
                <p>{{ tp.desc }}</p>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="12" sm="4">
                <v-img
                  :src="require(`@/assets/images/Blog/${tp.img}.png`)"
                  :alt="'Type of structures: ' + tp.img"
                ></v-img>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <h1>Types of loads:</h1>
      </v-row>
      <v-divider></v-divider>
      <v-row class="pl-0" justify="start">
        <v-col class="pl-0" cols="12">
          <v-card class="pa-5">
            <v-row align="center">
              <v-col cols="12" sm="8">
                <div v-for="ld in gravites" :key="ld.id">
                  <h2>{{ ld.name }}</h2>
                  <p>{{ ld.desc }}</p>
                </div>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="12" sm="4">
                <v-img
                  :src="require(`@/assets/images/Blog/Loads.png`)"
                  :alt="'Type of loads: gravites'"
                ></v-img>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="pl-0" justify="start">
        <v-col class="pl-0" cols="12">
          <v-card class="pa-5">
            <v-row align="center">
              <v-col cols="12" sm="8">
                <h2>Environmental loads:</h2>
                <p>
                  Environmental loads are loads which are due directly or
                  indirectly to environmental actions, exemples of these loads:
                </p>
                <ul v-for="ld in envs" :key="ld.id">
                  <li>
                    <span class="font-weight-bold">
                      {{ ld.name }}
                    </span>
                    {{ ld.desc }}
                  </li>
                </ul>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="12" sm="4">
                <div class="text-center mb-4">
                  <v-img
                    :src="require(`@/assets/images/Blog/Envs.png`)"
                    :alt="'Type of loads: gravites'"
                  ></v-img>
                  Wind and Snow Loads
                </div>
                <div class="text-center mt-4">
                  <v-img
                    :src="require(`@/assets/images/Blog/Earthquake.png`)"
                    :alt="'Type of loads: Earthquake'"
                  ></v-img>
                  Earthquake Loads
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <h1>Recommandation:</h1>
      </v-row>
      <v-divider></v-divider>
      <v-row class="pl-0" justify="start">
        <v-col class="pl-0" cols="12">
          <v-card class="pa-5">
            <v-row align="center">
              <v-col cols="12" sm="8">
                <span class="font-weight-bold ml-5">
                  Great Book For Structural Analysis
                </span>
                <p class="ml-5">
                  If you want to undestand and go deeper in structure analysis
                  we recommend
                  <a
                    style="white-space: nowrap;"
                    href="https://amzn.to/3ec5iUu"
                    target="_blank"
                  >
                    Structural Analysis (9th Edition)
                  </a>
                  by Russell C. Hibbeler. This book is written in a format that
                  is easy to follow and understand, examples are plenty and
                  explained well. Includes plenty of problems to work through;
                  this is one of the few books were we can't say that the
                  problems are much harder/different than the given examples
                  because the basic fundamentals and steps applied to an example
                  will solve any problem in the chapter.<br />
                  It is available now at amazon with FREE return shipping.
                </p>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="12" sm="4">
                <a
                  href="https://amzn.to/34e8vOD"
                  target="_blank"
                  style="text-decoration:none"
                >
                  <div class="text-center ">
                    <v-img
                      src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=0133942848&Format=_SL160_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=effectivewe02-20&language=en_US"
                      alt="Recommandation Book for Structure Analysis"
                    ></v-img>
                    <v-btn style="white-space: nowrap;" class="success ma-1">
                      See More
                    </v-btn>
                  </div>
                </a>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  head: {
    titleTemplate: "Structural Analysis - an overview",
    meta: [
      {
        hid: "description",
        name: "description",
        content:
          "Structure Analysis is a method by which we find out how a structure or a member of a structure behaves when subjected to different loads..."
      }
    ]
  },
  data: () => ({
    members: [
      {
        name: "Tie Rods:",
        desc: `Structural members subjected to a tensile force are often
              referred to as tie rods or bracing struts. Due to the nature of this load,
              these members are rather slender, and are often chosen from rods, bars,
              angles, or channels`,
        img: "TieRod"
      },
      {
        name: "Beams:",
        desc: `Beams are usually straight horizontal members used primarily to
              carry vertical loads.
              Beams are primarily designed to resist bending moments.
              They are often fixed
              ,or pin supported and can be in the form of a steel plate girder,
              reinforced concrete, or laminated wood.`,
        img: "Beam"
      },
      {
        name: "Columns:",
        desc: `Members that are generally vertical and resist axial compressive
              loads are referred to as columns. Tubes and wide-flange cross
              sections are often used for metal columns, and circular and square
              cross sections with reinforcing rods are used for those made of concrete.
              Occasionally, columns are subjected to both an axial load and a bending
              moment as shown in the figure. These members are referred to as
              beam columns.
              `,
        img: "Column"
      }
    ],
    types: [
      {
        name: "Truss:",
        desc: ` When the span of a structure is required to be large and its
              depth is not an important criterion for design, a truss may be selected.
              Trusses consist of slender elements, usually arranged in triangular
              fashion. 
              Due to the geometric arrangement of its members, loads that cause the
              entire truss to bend are converted into tensile or compressive forces in
              the members. Because of this, one of the primary advantages of a truss,
              compared to a beam, is that it uses less material to support a given load`,
        img: "Truss"
      },
      {
        name: "Frames:",
        desc: `Frames are often used in buildings and are composed of beams
              and columns that are either pin or fixed connected. Like trusses,
              frames extend in two or three dimensions. The loading on a frame causes
              bending of its members, and if it has rigid joint connections, this structure
              is generally “indeterminate” from a standpoint of analysis. The strength of
              such a frame is derived from the moment interactions between the beams
              and the columns at the rigid joints.`,
        img: "Frame"
      }
    ],
    gravites: [
      {
        name: "Dead loads (DL):",
        desc: `Dead loads consist of the weights of the various structural members and
              the weights of any objects that are permanently attached to the structure.
              Hence, for a building, the dead loads include the weights of the columns,
              beams, and girders, the floor slab, roofing, walls, windows, plumbing,
              electrical fixtures, and other miscellaneous Attachments.`,
        img: "Truss"
      },
      {
        name: "Live loads (LL):",
        desc: `Live loads can vary both in their magnitude and location. They may be
              caused by the weights of objects temporarily placed on a structure, moving
              vehicles, or natural forces. The minimum live loads specified in codes are
              determined from studying the history of their effects on existing
              structures. Usually, these loads include additional protection against
              excessive deflection or sudden overload.`,
        img: "Frame"
      }
    ],
    envs: [
      {
        name: "Wind: ",
        desc: `is primarily horizontal load caused by the movement of air
              relative to earth. Wind load is required to be considered in structural
              design especially when the height of the building exceeds two times the
              dimensions transverse to the exposed wind surface.`
      },
      {
        name: "Snow: ",
        desc: `constitute to the vertical loads in the building. But these
               types of loads are considered only in the snow fall places.`
      },
      {
        name: "Earthquake: ",
        desc: `constitute to both vertical and horizontal forces on the
              building. the horizontal movement of the building at the time of
              earthquake is to be considered while designing.`
      }
    ]
  })
}
</script>

<style>
h2 {
  color: green;
}
</style>
