"use strict";(self.webpackChunktd_doc=self.webpackChunktd_doc||[]).push([[2978],{2577:function(e,t,n){var r=n(7294),s=n(7273);s.Z.initialize({startOnLoad:!0});t.Z=function(e){var t=e.chart;return(0,r.useEffect)((function(){s.Z.contentLoaded()}),[]),r.createElement("div",{className:"mermaid"},t)}},6003:function(e,t,n){n.d(t,{Z:function(){return c}});var r=n(7294),s=n(8084),i=n(1736),a=n(2577),o=n(1446),u=function(e){return e.split("\n").map((function(e){return r.createElement(r.Fragment,null,e,r.createElement("br",null))}))};function c(e){var t=e.path,n=(0,s.usePluginData)("workflow-doc-plugin").workflows,c=(0,o.D)(t,n);return r.createElement("div",null,c.description&&r.createElement("div",null,u(c.description)),c.chart&&r.createElement(a.Z,{chart:c.chart}),r.createElement("hr",null),c.steps.map((function(e,t){return r.createElement("div",{key:t},r.createElement("div",{className:"margin-bottom--sm"},u(e.description)),r.createElement("div",{className:"margin-bottom--lg"},r.createElement(i.Z,{className:"graphql"},e.mutation),r.createElement(i.Z,{className:"json"},e.variables)))})))}},1446:function(e,t,n){function r(e,t,n){return void 0===n&&(n="."),e.split(n).reduce((function(e,t){return e&&e[t]}),t)}n.d(t,{D:function(){return r}})},5503:function(e,t,n){n.r(t),n.d(t,{assets:function(){return d},contentTitle:function(){return c},default:function(){return f},frontMatter:function(){return u},metadata:function(){return l},toc:function(){return m}});var r=n(7462),s=n(3366),i=(n(7294),n(3905)),a=n(6003),o=["components"],u={title:"Bordereau dasri de synth\xe8se"},c=void 0,l={unversionedId:"tutoriels/examples/bsdasri/synthese",id:"tutoriels/examples/bsdasri/synthese",title:"Bordereau dasri de synth\xe8se",description:"",source:"@site/docs/tutoriels/examples/bsdasri/synthese.mdx",sourceDirName:"tutoriels/examples/bsdasri",slug:"/tutoriels/examples/bsdasri/synthese",permalink:"/tutoriels/examples/bsdasri/synthese",editUrl:"https://github.com/MTES-MCT/trackdechets/edit/dev/doc/docs/tutoriels/examples/bsdasri/synthese.mdx",tags:[],version:"current",frontMatter:{title:"Bordereau dasri de synth\xe8se"},sidebar:"docs",previous:{title:"Acheminement direct du PRED \xe0 l'installation de traitement, signature par code secret \xe9co-organisme",permalink:"/tutoriels/examples/bsdasri/signature-code-secret-ecoorganisme"},next:{title:"Acheminement d'un centre VHU vers un broyeur",permalink:"/tutoriels/examples/bsvhu/vhu-vers-broyeur"}},d={},m=[],p={toc:m};function f(e){var t=e.components,n=(0,s.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)(a.Z,{path:"bsdasri.dasriDeSynthese",mdxType:"Workflow"}))}f.isMDXComponent=!0}}]);