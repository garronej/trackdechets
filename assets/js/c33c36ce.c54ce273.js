"use strict";(self.webpackChunktd_doc=self.webpackChunktd_doc||[]).push([[4958],{2577:function(e,t,n){var r=n(7294),i=n(7273);i.Z.initialize({startOnLoad:!0});t.Z=function(e){var t=e.chart;return(0,r.useEffect)((function(){i.Z.contentLoaded()}),[]),r.createElement("div",{className:"mermaid"},t)}},6003:function(e,t,n){n.d(t,{Z:function(){return s}});var r=n(7294),i=n(8084),a=n(1736),c=n(2577),d=n(1446),o=function(e){return e.split("\n").map((function(e){return r.createElement(r.Fragment,null,e,r.createElement("br",null))}))};function s(e){var t=e.path,n=(0,i.usePluginData)("workflow-doc-plugin").workflows,s=(0,d.D)(t,n);return r.createElement("div",null,s.description&&r.createElement("div",null,o(s.description)),s.chart&&r.createElement(c.Z,{chart:s.chart}),r.createElement("hr",null),s.steps.map((function(e,t){return r.createElement("div",{key:t},r.createElement("div",{className:"margin-bottom--sm"},o(e.description)),r.createElement("div",{className:"margin-bottom--lg"},r.createElement(a.Z,{className:"graphql"},e.mutation),r.createElement(a.Z,{className:"json"},e.variables)))})))}},1446:function(e,t,n){function r(e,t,n){return void 0===n&&(n="."),e.split(n).reduce((function(e,t){return e&&e[t]}),t)}n.d(t,{D:function(){return r}})},1897:function(e,t,n){n.r(t),n.d(t,{assets:function(){return l},contentTitle:function(){return s},default:function(){return f},frontMatter:function(){return o},metadata:function(){return u},toc:function(){return m}});var r=n(7462),i=n(3366),a=(n(7294),n(3905)),c=n(6003),d=["components"],o={title:"Acheminement direct du producteur de d\xe9chet \xe0 l'installation de traitement"},s=void 0,u={unversionedId:"tutoriels/examples/bsdd/acheminement-direct",id:"tutoriels/examples/bsdd/acheminement-direct",title:"Acheminement direct du producteur de d\xe9chet \xe0 l'installation de traitement",description:"",source:"@site/docs/tutoriels/examples/bsdd/acheminement-direct.mdx",sourceDirName:"tutoriels/examples/bsdd",slug:"/tutoriels/examples/bsdd/acheminement-direct",permalink:"/tutoriels/examples/bsdd/acheminement-direct",editUrl:"https://github.com/MTES-MCT/trackdechets/edit/dev/doc/docs/tutoriels/examples/bsdd/acheminement-direct.mdx",tags:[],version:"current",frontMatter:{title:"Acheminement direct du producteur de d\xe9chet \xe0 l'installation de traitement"},sidebar:"docs",previous:{title:"Requ\xeater et filtrer les bordereaux Bsda, Bsdasri, Bsff et Bsvhu",permalink:"/tutoriels/courant/query-bordereaux"},next:{title:"Transport multi-modal",permalink:"/tutoriels/examples/bsdd/multi-modal"}},l={},m=[],p={toc:m};function f(e){var t=e.components,n=(0,i.Z)(e,d);return(0,a.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)(c.Z,{path:"bsdd.acheminementDirect",mdxType:"Workflow"}))}f.isMDXComponent=!0}}]);