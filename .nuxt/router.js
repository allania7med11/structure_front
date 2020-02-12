import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _17bef6e9 = () => interopDefault(import('../pages/contact.vue' /* webpackChunkName: "pages/contact" */))
const _ed36d478 = () => interopDefault(import('../pages/projects/index.vue' /* webpackChunkName: "pages/projects/index" */))
const _74b88399 = () => interopDefault(import('../pages/test.vue' /* webpackChunkName: "pages/test" */))
const _2e3a1db0 = () => interopDefault(import('../pages/Tutorials/Beam.vue' /* webpackChunkName: "pages/Tutorials/Beam" */))
const _376d1598 = () => interopDefault(import('../pages/Tutorials/BeamsInternalHinges.vue' /* webpackChunkName: "pages/Tutorials/BeamsInternalHinges" */))
const _143be5c7 = () => interopDefault(import('../pages/Tutorials/FrameStructure.vue' /* webpackChunkName: "pages/Tutorials/FrameStructure" */))
const _2e3dc5c6 = () => interopDefault(import('../pages/Tutorials/TrussStructure.vue' /* webpackChunkName: "pages/Tutorials/TrussStructure" */))
const _ea1921ea = () => interopDefault(import('../pages/Full_Project/_name.vue' /* webpackChunkName: "pages/Full_Project/_name" */))
const _3de5392c = () => interopDefault(import('../pages/projects/_id.vue' /* webpackChunkName: "pages/projects/_id" */))
const _3b2daadb = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/contact",
    component: _17bef6e9,
    name: "contact"
  }, {
    path: "/projects",
    component: _ed36d478,
    name: "projects"
  }, {
    path: "/test",
    component: _74b88399,
    name: "test"
  }, {
    path: "/Tutorials/Beam",
    component: _2e3a1db0,
    name: "Tutorials-Beam"
  }, {
    path: "/Tutorials/BeamsInternalHinges",
    component: _376d1598,
    name: "Tutorials-BeamsInternalHinges"
  }, {
    path: "/Tutorials/FrameStructure",
    component: _143be5c7,
    name: "Tutorials-FrameStructure"
  }, {
    path: "/Tutorials/TrussStructure",
    component: _2e3dc5c6,
    name: "Tutorials-TrussStructure"
  }, {
    path: "/Full_Project/:name?",
    component: _ea1921ea,
    name: "Full_Project-name"
  }, {
    path: "/projects/:id",
    component: _3de5392c,
    name: "projects-id"
  }, {
    path: "/",
    component: _3b2daadb,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
