(self.webpackChunktd_doc=self.webpackChunktd_doc||[]).push([[6224],{62577:function(e,t,r){"use strict";var n=r(67294),o=r(21140),i=r.n(o);i().initialize({startOnLoad:!0});t.Z=function(e){var t=e.chart;return(0,n.useEffect)((function(){i().contentLoaded()}),[]),n.createElement("div",{className:"mermaid"},t)}},26003:function(e,t,r){"use strict";r.d(t,{Z:function(){return c}});var n=r(67294),o=r(28084),i=r(31736),a=r(62577),s=r(71446),u=function(e){return e.split("\n").map((function(e){return n.createElement(n.Fragment,null,e,n.createElement("br",null))}))};function c(e){var t=e.path,r=(0,o.usePluginData)("workflow-doc-plugin").workflows,c=(0,s.D)(t,r);return n.createElement("div",null,c.description&&n.createElement("div",null,u(c.description)),c.chart&&n.createElement(a.Z,{chart:c.chart}),n.createElement("hr",null),c.steps.map((function(e,t){return n.createElement("div",{key:t},n.createElement("div",{className:"margin-bottom--sm"},u(e.description)),n.createElement("div",{className:"margin-bottom--lg"},n.createElement(i.Z,{className:"graphql"},e.mutation),n.createElement(i.Z,{className:"json"},e.variables)))})))}},71446:function(e,t,r){"use strict";function n(e,t,r){return void 0===r&&(r="."),e.split(r).reduce((function(e,t){return e&&e[t]}),t)}r.d(t,{D:function(){return n}})},14:function(e,t,r){"use strict";r.r(t),r.d(t,{assets:function(){return d},contentTitle:function(){return c},default:function(){return f},frontMatter:function(){return u},metadata:function(){return l},toc:function(){return m}});var n=r(87462),o=r(63366),i=(r(67294),r(3905)),a=r(26003),s=["components"],u={title:"Regroupement par l'entreprise ayant transform\xe9 ou r\xe9alis\xe9 un traitement dont la provenance des d\xe9chets reste identifiable"},c=void 0,l={unversionedId:"tutoriels/examples/bsdd/regroupement",id:"tutoriels/examples/bsdd/regroupement",title:"Regroupement par l'entreprise ayant transform\xe9 ou r\xe9alis\xe9 un traitement dont la provenance des d\xe9chets reste identifiable",description:"",source:"@site/docs/tutoriels/examples/bsdd/regroupement.mdx",sourceDirName:"tutoriels/examples/bsdd",slug:"/tutoriels/examples/bsdd/regroupement",permalink:"/tutoriels/examples/bsdd/regroupement",editUrl:"https://github.com/MTES-MCT/trackdechets/edit/dev/doc/docs/tutoriels/examples/bsdd/regroupement.mdx",tags:[],version:"current",frontMatter:{title:"Regroupement par l'entreprise ayant transform\xe9 ou r\xe9alis\xe9 un traitement dont la provenance des d\xe9chets reste identifiable"},sidebar:"docs",previous:{title:"Entreposage provisoire",permalink:"/tutoriels/examples/bsdd/entreposage-provisoire"},next:{title:"Acheminement direct avec import de BSD sign\xe9 papier",permalink:"/tutoriels/examples/bsdd/import-bsd-papier"}},d={},m=[],p={toc:m};function f(e){var t=e.components,r=(0,o.Z)(e,s);return(0,i.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)(a.Z,{path:"bsdd.regroupement",mdxType:"Workflow"}))}f.isMDXComponent=!0},11748:function(e,t,r){var n={"./locale":89234,"./locale.js":89234};function o(e){var t=i(e);return r(t)}function i(e){if(!r.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}o.keys=function(){return Object.keys(n)},o.resolve=i,e.exports=o,o.id=11748}}]);