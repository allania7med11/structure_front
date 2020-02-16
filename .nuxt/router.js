import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _249cb4d9 = () => interopDefault(import('../pages/contact.vue' /* webpackChunkName: "pages/contact" */))
const _5b2249d4 = () => interopDefault(import('../pages/projects/index.vue' /* webpackChunkName: "pages/projects/index" */))
const _b795e8ae = () => interopDefault(import('../pages/test.vue' /* webpackChunkName: "pages/test" */))
const _00105c80 = () => interopDefault(import('../pages/Tutorials/Beam.vue' /* webpackChunkName: "pages/Tutorials/Beam" */))
const _85a280f0 = () => interopDefault(import('../pages/Tutorials/BeamsInternalHinges.vue' /* webpackChunkName: "pages/Tutorials/BeamsInternalHinges" */))
const _8c987452 = () => interopDefault(import('../pages/Tutorials/FrameStructure.vue' /* webpackChunkName: "pages/Tutorials/FrameStructure" */))
const _e34e05a6 = () => interopDefault(import('../pages/Tutorials/TrussStructure.vue' /* webpackChunkName: "pages/Tutorials/TrussStructure" */))
const _1f989b1b = () => interopDefault(import('../pages/Full_Project/_name.vue' /* webpackChunkName: "pages/Full_Project/_name" */))
const _5ebe9d88 = () => interopDefault(import('../pages/projects/_id.vue' /* webpackChunkName: "pages/projects/_id" */))
const _097bb66a = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _249cb4d9,
    name: "contact"
  }, {
    path: "/projects",
    component: _5b2249d4,
    name: "projects"
  }, {
    path: "/test",
    component: _b795e8ae,
    name: "test"
  }, {
    path: "/Tutorials/Beam",
    component: _00105c80,
    name: "Tutorials-Beam"
  }, {
    path: "/Tutorials/BeamsInternalHinges",
    component: _85a280f0,
    name: "Tutorials-BeamsInternalHinges"
  }, {
    path: "/Tutorials/FrameStructure",
    component: _8c987452,
    name: "Tutorials-FrameStructure"
  }, {
    path: "/Tutorials/TrussStructure",
    component: _e34e05a6,
    name: "Tutorials-TrussStructure"
  }, {
    path: "/Full_Project/:name?",
    component: _1f989b1b,
    name: "Full_Project-name"
  }, {
    path: "/projects/:id",
    component: _5ebe9d88,
    name: "projects-id"
  }, {
    path: "/",
    component: _097bb66a,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
