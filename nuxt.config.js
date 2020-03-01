import colors from "vuetify/es5/util/colors"
export default {
  buildDir: "build/.nuxt",
  axios: {
    baseURL: "http://effectivewebapp.com/"
  },
  server: {
    // port: 3000, // default: 3000
    host: "0.0.0.0" // default: localhost
  },
  mode: "universal",
  /*
   ** Headers of the page
   */
  serverMiddleware: ["~/apiCl/index.js"],
  head: {
    titleTemplate: "EffectiveWebApp",
    title: "EffectiveWebApp2",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "@/plugins/global",
    "@/plugins/Vuelidate",
    "@/plugins/axios",
    { src: "@/plugins/cypress", mode: "client" }
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
    "nuxt-fontawesome",
    "nuxt-webfontloader",
    "cookie-universal-nuxt"
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  vuetify: {
    defaultAssets: {
      font: true,
      icons: "md"
    },
    icons: {
      iconfont: "md"
    },
    treeShake: false,
    customVariables: ["~/assets/variables.scss"],
    theme: {
      light: {
        primary: colors.blue.darken2,
        accent: colors.grey.darken3,
        secondary: colors.amber.darken3,
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.deepOrange.accent4,
        success: colors.green.accent3
      }
    }
  },
  fontawesome: {
    imports: [
      {
        set: "@fortawesome/free-solid-svg-icons", // Solid icons
        icons: [
          "faHome",
          "faEnvelope",
          "faUser",
          "faSignInAlt",
          "faPaperPlane",
          "faCheck",
          "faTimes",
          "faCaretDown",
          "faCaretRight",
          "faFolderOpen",
          "faEdit",
          "faTrashAlt",
          "faPlus",
          "faCopy",
          "faSave",
          "faBook",
          "faList",
          "faPlusCircle",
          "faMinusCircle",
          "faSearch",
          "faEye",
          "faBars"
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
      workboxExtensions: "@/plugins/custom-sw.js",
      preCaching: [
        "/",
        "/contact",
        "/favicon.ico",
        ...[
          "Beam",
          "BeamsInternalHinges",
          "FrameStructure",
          "TrussStructure"
        ].map(cv => "Tutorials/" + cv)
      ],
      cacheNames: {
        prefix: "app",
        suffix: "v1",
        precache: "precache",
        runtime: "runtime"
      }
    }
  },
  build: {
    /*
     ** You can extend webpack config here
     */
    extractCSS: true,
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        })
      }
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? "source-map" : "inline-source-map"
      }
    }
  }
}
