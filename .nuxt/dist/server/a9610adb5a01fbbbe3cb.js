exports.ids=[6],exports.modules={139:function(e,t,r){"use strict";r.r(t);var o=r(25),c=r(53),n={head:{titleTemplate:"Contact Us | EffectiveWebApp",meta:[{hid:"description",name:"description",content:"If you have any  questions  please feel free to contact us."}]},mixins:[o.validationMixin],validations:{from_email:{required:c.required,email:c.email},subject:{required:c.required},message:{required:c.required}},data:()=>({from_email:"",subject:"",message:"",success:!1,error:!1}),computed:{from_emailErrors(){const e=[];return this.$v.from_email.$dirty?(!this.$v.from_email.email&&e.push("Must be valid e-mail"),!this.$v.from_email.required&&e.push("From Email is required"),e):e},subjectErrors(){const e=[];return this.$v.subject.$dirty?(!this.$v.subject.required&&e.push("subject is required."),e):e},messageErrors(){const e=[];return this.$v.message.$dirty?(!this.$v.message.required&&e.push("message is required."),e):e}},methods:{async submit(){if(this.$v.$touch(),!this.$v.$invalid){this.success=!1,this.error=!1;try{await this.$axios.$post("/api/users/contact/",{from_email:this.from_email,subject:this.subject,message:this.message}),this.success=!0}catch(e){console.log(e),this.error=!0}}}}},l=r(5),component=Object(l.a)(n,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",{attrs:{fluid:""}},[r("v-row",{attrs:{justify:"center"}},[r("v-col",{attrs:{md:"8"}},[e.success?r("v-alert",{attrs:{dismissible:"",type:"success"}},[e._v("\n        Success! Email sent.\n      ")]):e._e(),e._v(" "),e.error?r("v-alert",{attrs:{dismissible:"",type:"error"}},[e._v("\n        An error occurred\n      ")]):e._e(),e._v(" "),r("v-card",{attrs:{shaped:""}},[r("v-card-title",{staticClass:"justify-center white--text info font-italic font-weight-bold display-1"},[e._v("\n          Contact Us\n        ")]),e._v(" "),r("v-card-text",[r("form",[r("v-text-field",{attrs:{"error-messages":e.from_emailErrors,label:"From Email",required:""},on:{input:function(t){return e.$v.from_email.$touch()},blur:function(t){return e.$v.from_email.$touch()}},model:{value:e.from_email,callback:function(t){e.from_email=t},expression:"from_email"}}),e._v(" "),r("v-text-field",{attrs:{"error-messages":e.subjectErrors,label:"Subject",required:""},on:{input:function(t){return e.$v.subject.$touch()},blur:function(t){return e.$v.subject.$touch()}},model:{value:e.subject,callback:function(t){e.subject=t},expression:"subject"}}),e._v(" "),r("v-textarea",{attrs:{"error-messages":e.messageErrors,label:"message",required:""},on:{input:function(t){return e.$v.message.$touch()},blur:function(t){return e.$v.message.$touch()}},model:{value:e.message,callback:function(t){e.message=t},expression:"message"}})],1)]),e._v(" "),r("v-card-actions",{staticClass:"justify-center white--text"},[r("v-btn",{staticClass:"info font-italic font-weight-bold px-4 title",attrs:{large:"",rounded:"","data-cy":"submit"},on:{click:e.submit}},[e._v("\n            Send Email\n            "),r("v-icon",{staticClass:"mx-2"},[e._v("\n              fas fa-paper-plane\n            ")])],1)],1)],1)],1)],1)],1)}),[],!1,null,null,"2a3dc3a6");t.default=component.exports}};