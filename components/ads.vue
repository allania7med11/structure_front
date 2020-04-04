<template>
  <v-container class="pa-0">
    <v-row justify="center">
      <v-col class="py-1" md="10">
        <v-card
          :dark="$nuxt.$route.name === 'index'"
          flat
          class="mx-auto"
          outlined
          href="https://amzn.to/34e8vOD"
          target="_blank"
        >
          <v-container class="py-1">
            <v-row no-gutters>
              <v-col class="py-0 px-1" cols="2">
                <div>
                  <v-img
                    style="width: 75px;float:left"
                    src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=0133942848&Format=_SL110_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=effectivewe02-20&language=en_US"
                  />
                </div>
              </v-col>
              <v-col cols="10" class="px-1">
                <div class="body-1 font-weight-bold">
                  Structural Analysis (9th Edition)
                </div>
                <div class="body-2">
                  Great Book For Structural Analysis
                </div>
                <div class="caption">
                  This book is written in a format that is easy to follow and
                  understand, examples are plenty and explained well. Includes
                  plenty of problems to work through.
                  <a style="white-space: nowrap;" class="font-weight-bold"
                    >see more</a
                  >
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    link: "https://amzn.to/2V4rXcq",
    img: "https://m.media-amazon.com/images/I/61wAI1gOS1L._SL160_.jpg"
  })
}
</script>
<style scoped>
body {
  background-color: coral;
}
</style>
