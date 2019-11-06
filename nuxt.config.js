import colors from "vuetify/es5/util/colors"

export default {
  server: {
    // port: 3000, // default: 3000
    host: "0.0.0.0" // default: localhost
  },
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: "%s - " + process.env.npm_package_name,
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
      }
    ]
  },
  /* webfontloader: {
    google: {
      families: ["Roboto:300,400,500,700|Material+Icons"] //Loads Lato font with weights 400 and 700
    }
  }, */
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "@/plugins/Vuelidate",
    "~/plugins/axios",
    { src: "~/plugins/icons.js", ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/vuetify"],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    "@nuxtjs/style-resources",
    "nuxt-fontawesome"
    // "nuxt-webfontloader"
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true // Can be also an object with default options
  },
  proxy: {
    "/api/": "http://localhost/api/"
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      primary: colors.blue.darken2,
      accent: colors.grey.darken3,
      secondary: colors.amber.darken3,
      info: colors.teal.lighten1,
      warning: colors.amber.base,
      error: colors.deepOrange.accent4,
      success: colors.green.accent3
    }
  },
  fontawesome: {
    imports: [
      {
        set: "@fortawesome/free-solid-svg-icons", // Solid icons
        icons: [
          "faCookieBite",
          "faCommentDots",
          "faEnvelope",
          "faGrinWink",
          "faHeart"
        ]
      },
      {
        set: "@fortawesome/free-brands-svg-icons", // Brand icons
        icons: [
          "faDev",
          "faFacebook",
          "faTwitter",
          "faInstagram",
          "faYoutube",
          "faGithub"
        ]
      }
    ]
  },
  /*
   ** Build configuration
   */
  pwa: {
    manifest: {
      name: "EffectiveWebApp",
      short_name: "EWA",
      description: "structure analysis software",
      start_url: "/projects/",
      scope: "/",
      display: "standalone",
      background_color: "#fff",
      theme_color: "#0A0302"
    },
    workbox: {
      importScripts: ["custom-sw.js"],
      runtimeCaching: [
        {
          urlPattern: "/Tutorials/BeamsInternalHinges/",
          handler: "cacheFirst",
          method: "GET"
        }
      ]
    }
  },
  /* optimizedImages: {
    optimizeImages: true
  }, */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        })
      }
    }
  }
}
