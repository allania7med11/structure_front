import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _065a83d0 = () => interopDefault(import('../pages/contact.vue' /* webpackChunkName: "pages/contact" */))
const _31b9f206 = () => interopDefault(import('../pages/projects/index.vue' /* webpackChunkName: "pages/projects/index" */))
const _91010fdc = () => interopDefault(import('../pages/test.vue' /* webpackChunkName: "pages/test" */))
const _e80ee22e = () => interopDefault(import('../pages/Tutorials/Beam.vue' /* webpackChunkName: "pages/Tutorials/Beam" */))
const _fb4e2982 = () => interopDefault(import('../pages/Tutorials/BeamsInternalHinges.vue' /* webpackChunkName: "pages/Tutorials/BeamsInternalHinges" */))
const _13663880 = () => interopDefault(import('../pages/Tutorials/FrameStructure.vue' /* webpackChunkName: "pages/Tutorials/FrameStructure" */))
const _6a1bc9d4 = () => interopDefault(import('../pages/Tutorials/TrussStructure.vue' /* webpackChunkName: "pages/Tutorials/TrussStructure" */))
const _15349bc4 = () => interopDefault(import('../pages/Full_Project/_name.vue' /* webpackChunkName: "pages/Full_Project/_name" */))
const _ae5eb6b6 = () => interopDefault(import('../pages/projects/_id.vue' /* webpackChunkName: "pages/projects/_id" */))
const _51454582 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _065a83d0,
    name: "contact"
  }, {
    path: "/projects",
    component: _31b9f206,
    name: "projects"
  }, {
    path: "/test",
    component: _91010fdc,
    name: "test"
  }, {
    path: "/Tutorials/Beam",
    component: _e80ee22e,
    name: "Tutorials-Beam"
  }, {
    path: "/Tutorials/BeamsInternalHinges",
    component: _fb4e2982,
    name: "Tutorials-BeamsInternalHinges"
  }, {
    path: "/Tutorials/FrameStructure",
    component: _13663880,
    name: "Tutorials-FrameStructure"
  }, {
    path: "/Tutorials/TrussStructure",
    component: _6a1bc9d4,
    name: "Tutorials-TrussStructure"
  }, {
    path: "/Full_Project/:name?",
    component: _15349bc4,
    name: "Full_Project-name"
  }, {
    path: "/projects/:id",
    component: _ae5eb6b6,
    name: "projects-id"
  }, {
    path: "/",
    component: _51454582,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
