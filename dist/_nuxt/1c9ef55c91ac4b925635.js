(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{478:function(e,t,r){"use strict";r.r(t);r(27),r(18),r(13),r(11),r(21),r(28);var n=r(9),o=r(29),c=r(450),l=r(52);function d(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}var f={middleware:["authenticated","project"],components:{app1:c.a},computed:function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}({},Object(o.d)(["username"]),{},Object(o.d)(l.a.state("project",["project","error"]))),head:function(){return{titleTemplate:this.project.name+"("+this.username+")",meta:[{hid:"description",name:"description",content:"This  Beam Calculator give you diagrams , extremes , exact equations of efforts and displacements of your beam and a lot more"}]}}},O=r(14),component=Object(O.a)(f,(function(){var e=this.$createElement,t=this._self._c||e;return t("v-container",{attrs:{fluid:""}},[t("client-only",[this.error?t("v-alert",{attrs:{dismissible:"",type:"error"}},[this._v("\n      An error occurred\n    ")]):this._e(),this._v(" "),t("app1")],1)],1)}),[],!1,null,null,null);t.default=component.exports}}]);