"use strict";(self.webpackChunktd_doc=self.webpackChunktd_doc||[]).push([[580],{3905:function(e,t,r){r.d(t,{Zo:function(){return d},kt:function(){return f}});var n=r(7294);function l(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){l(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function u(e,t){if(null==e)return{};var r,n,l=function(e,t){if(null==e)return{};var r,n,l={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(l[r]=e[r]);return l}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(l[r]=e[r])}return l}var i=n.createContext({}),o=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},d=function(e){var t=o(e.components);return n.createElement(i.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},p=n.forwardRef((function(e,t){var r=e.components,l=e.mdxType,a=e.originalType,i=e.parentName,d=u(e,["components","mdxType","originalType","parentName"]),p=o(r),f=l,k=p["".concat(i,".").concat(f)]||p[f]||c[f]||a;return r?n.createElement(k,s(s({ref:t},d),{},{components:r})):n.createElement(k,s({ref:t},d))}));function f(e,t){var r=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var a=r.length,s=new Array(a);s[0]=p;var u={};for(var i in t)hasOwnProperty.call(t,i)&&(u[i]=t[i]);u.originalType=e,u.mdxType="string"==typeof e?e:l,s[1]=u;for(var o=2;o<a;o++)s[o]=r[o];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}p.displayName="MDXCreateElement"},2474:function(e,t,r){r.r(t),r.d(t,{assets:function(){return d},contentTitle:function(){return i},default:function(){return f},frontMatter:function(){return u},metadata:function(){return o},toc:function(){return c}});var n=r(7462),l=r(3366),a=(r(7294),r(3905)),s=["components"],u={id:"queries",title:"Queries",slug:"queries",sidebar_position:1},i=void 0,o={unversionedId:"reference/api-reference/bsda/queries",id:"reference/api-reference/bsda/queries",title:"Queries",description:"bsda",source:"@site/docs/reference/api-reference/bsda/queries.md",sourceDirName:"reference/api-reference/bsda",slug:"/reference/api-reference/bsda/queries",permalink:"/reference/api-reference/bsda/queries",editUrl:"https://github.com/MTES-MCT/trackdechets/edit/dev/doc/docs/reference/api-reference/bsda/queries.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{id:"queries",title:"Queries",slug:"queries",sidebar_position:1},sidebar:"docs",previous:{title:"Scalars",permalink:"/reference/api-reference/bsff/scalars"},next:{title:"Mutations",permalink:"/reference/api-reference/bsda/mutations"}},d={},c=[{value:"bsda",id:"bsda",level:2},{value:"bsdaPdf",id:"bsdapdf",level:2},{value:"bsdaRevisionRequests",id:"bsdarevisionrequests",level:2},{value:"bsdas",id:"bsdas",level:2}],p={toc:c};function f(e){var t=e.components,r=(0,l.Z)(e,s);return(0,a.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"bsda"},"bsda"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Type:")," ",(0,a.kt)("a",{parentName:"p",href:"/reference/api-reference/bsda/objects#bsda"},"Bsda!")),(0,a.kt)("p",{style:{marginBottom:"0.4em"}},(0,a.kt)("strong",null,"Arguments")),(0,a.kt)("table",null,(0,a.kt)("thead",null,(0,a.kt)("tr",null,(0,a.kt)("th",null,"Name"),(0,a.kt)("th",null,"Description"))),(0,a.kt)("tbody",null,(0,a.kt)("tr",null,(0,a.kt)("td",null,"id",(0,a.kt)("br",null),(0,a.kt)("a",{href:"/reference/api-reference/bsda/scalars#id"},(0,a.kt)("code",null,"ID!"))),(0,a.kt)("td",null)))),(0,a.kt)("h2",{id:"bsdapdf"},"bsdaPdf"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Type:")," ",(0,a.kt)("a",{parentName:"p",href:"/reference/api-reference/bsda/objects#filedownload"},"FileDownload!")),(0,a.kt)("p",null,"Renvoie un token pour t\xe9l\xe9charger un pdf de bordereau\nCe token doit \xeatre transmis \xe0 la route /download pour obtenir le fichier.\nIl est valable 10 secondes"),(0,a.kt)("p",{style:{marginBottom:"0.4em"}},(0,a.kt)("strong",null,"Arguments")),(0,a.kt)("table",null,(0,a.kt)("thead",null,(0,a.kt)("tr",null,(0,a.kt)("th",null,"Name"),(0,a.kt)("th",null,"Description"))),(0,a.kt)("tbody",null,(0,a.kt)("tr",null,(0,a.kt)("td",null,"id",(0,a.kt)("br",null),(0,a.kt)("a",{href:"/reference/api-reference/bsda/scalars#id"},(0,a.kt)("code",null,"ID"))),(0,a.kt)("td",null,(0,a.kt)("p",null,"ID d'un bordereau"))))),(0,a.kt)("h2",{id:"bsdarevisionrequests"},"bsdaRevisionRequests"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Type:")," ",(0,a.kt)("a",{parentName:"p",href:"/reference/api-reference/bsda/objects#bsdarevisionrequestconnection"},"BsdaRevisionRequestConnection!")),(0,a.kt)("p",null,"Renvoie les demandes de r\xe9visions Bsda associ\xe9es \xe0 un SIRET (demandes soumises et approbations requises)"),(0,a.kt)("p",{style:{marginBottom:"0.4em"}},(0,a.kt)("strong",null,"Arguments")),(0,a.kt)("table",null,(0,a.kt)("thead",null,(0,a.kt)("tr",null,(0,a.kt)("th",null,"Name"),(0,a.kt)("th",null,"Description"))),(0,a.kt)("tbody",null,(0,a.kt)("tr",null,(0,a.kt)("td",null,"siret",(0,a.kt)("br",null),(0,a.kt)("a",{href:"/reference/api-reference/bsda/scalars#string"},(0,a.kt)("code",null,"String!"))),(0,a.kt)("td",null,(0,a.kt)("p",null,"SIRET d'un \xe9tablissement dont je suis membre"))),(0,a.kt)("tr",null,(0,a.kt)("td",null,"where",(0,a.kt)("br",null),(0,a.kt)("a",{href:"/reference/api-reference/bsda/inputObjects#bsdarevisionrequestwhere"},(0,a.kt)("code",null,"BsdaRevisionRequestWhere"))),(0,a.kt)("td",null,(0,a.kt)("p",null,"(Optionnel) Filtres"))),(0,a.kt)("tr",null,(0,a.kt)("td",null,"after",(0,a.kt)("br",null),(0,a.kt)("a",{href:"/reference/api-reference/bsda/scalars#string"},(0,a.kt)("code",null,"String"))),(0,a.kt)("td",null,(0,a.kt)("p",null,"(Optionnel) PAGINATION Permet en conjonction avec ",(0,a.kt)("code",null,"first"),' de paginer "en avant" (des r\xe9visions les plus r\xe9centes aux r\xe9visions les plus ancienness) Curseur apr\xe8s lequel les r\xe9visions doivent \xeatre retourn\xe9es Attend un identifiant (propri\xe9t\xe9 ',(0,a.kt)("code",null,"id"),") de r\xe9vision D\xe9faut \xe0 vide, pour retourner les r\xe9visions les plus r\xe9centes La r\xe9vision pr\xe9cis\xe9e dans le curseur ne fait pas partie du r\xe9sultat"))),(0,a.kt)("tr",null,(0,a.kt)("td",null,"first",(0,a.kt)("br",null),(0,a.kt)("a",{href:"/reference/api-reference/bsda/scalars#int"},(0,a.kt)("code",null,"Int"))),(0,a.kt)("td",null,(0,a.kt)("p",null,"(Optionnel) PAGINATION Permet en conjonction avec ",(0,a.kt)("code",null,"after"),' de paginer "en avant" (des r\xe9visions les plus r\xe9centes aux r\xe9visions les plus anciennes) Nombre de r\xe9visions retourn\xe9es apr\xe8s le ',(0,a.kt)("code",null,"after"),"D\xe9faut \xe0 50"))))),(0,a.kt)("h2",{id:"bsdas"},"bsdas"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Type:")," ",(0,a.kt)("a",{parentName:"p",href:"/reference/api-reference/bsda/objects#bsdaconnection"},"BsdaConnection!")),(0,a.kt)("p",{style:{marginBottom:"0.4em"}},(0,a.kt)("strong",null,"Arguments")),(0,a.kt)("table",null,(0,a.kt)("thead",null,(0,a.kt)("tr",null,(0,a.kt)("th",null,"Name"),(0,a.kt)("th",null,"Description"))),(0,a.kt)("tbody",null,(0,a.kt)("tr",null,(0,a.kt)("td",null,"after",(0,a.kt)("br",null),(0,a.kt)("a",{href:"/reference/api-reference/bsda/scalars#id"},(0,a.kt)("code",null,"ID"))),(0,a.kt)("td",null,(0,a.kt)("p",null,"(Optionnel) PAGINATION Permet en conjonction avec ",(0,a.kt)("code",null,"first"),' de paginer "en avant" (des bordereaux les plus r\xe9cents aux bordereaux les plus anciens) Curseur apr\xe8s lequel les bordereaux doivent \xeatre retourn\xe9s Attend un identifiant (propri\xe9t\xe9 ',(0,a.kt)("code",null,"id"),") de BSD D\xe9faut \xe0 vide, pour retourner les bordereaux les plus r\xe9cents Le BSD pr\xe9cis\xe9 dans le curseur ne fait pas partie du r\xe9sultat"))),(0,a.kt)("tr",null,(0,a.kt)("td",null,"first",(0,a.kt)("br",null),(0,a.kt)("a",{href:"/reference/api-reference/bsda/scalars#int"},(0,a.kt)("code",null,"Int"))),(0,a.kt)("td",null,(0,a.kt)("p",null,"(Optionnel) PAGINATION Permet en conjonction avec ",(0,a.kt)("code",null,"cursorAfter"),' de paginer "en avant" (des bordereaux les plus r\xe9cents aux bordereaux les plus anciens) Nombre de bordereaux retourn\xe9s apr\xe8s le ',(0,a.kt)("code",null,"cursorAfter"),"D\xe9faut \xe0 50, maximum \xe0 500"))),(0,a.kt)("tr",null,(0,a.kt)("td",null,"before",(0,a.kt)("br",null),(0,a.kt)("a",{href:"/reference/api-reference/bsda/scalars#id"},(0,a.kt)("code",null,"ID"))),(0,a.kt)("td",null,(0,a.kt)("p",null,"(Optionnel) PAGINATION Permet en conjonction avec ",(0,a.kt)("code",null,"last"),' de paginer "en arri\xe8re" (des bordereaux les plus anciens aux bordereaux les plus r\xe9cents) Curseur avant lequel les bordereaux doivent \xeatre retourn\xe9s Attend un identifiant (propri\xe9t\xe9 ',(0,a.kt)("code",null,"id"),") de BSD D\xe9faut \xe0 vide, pour retourner les bordereaux les plus anciens Le BSD pr\xe9cis\xe9 dans le curseur ne fait pas partie du r\xe9sultat"))),(0,a.kt)("tr",null,(0,a.kt)("td",null,"last",(0,a.kt)("br",null),(0,a.kt)("a",{href:"/reference/api-reference/bsda/scalars#int"},(0,a.kt)("code",null,"Int"))),(0,a.kt)("td",null,(0,a.kt)("p",null,"(Optionnel) PAGINATION Nombre de bordereaux retourn\xe9s avant le ",(0,a.kt)("code",null,"cursorBefore"),"D\xe9faut \xe0 50, maximum \xe0 500"))),(0,a.kt)("tr",null,(0,a.kt)("td",null,"where",(0,a.kt)("br",null),(0,a.kt)("a",{href:"/reference/api-reference/bsda/inputObjects#bsdawhere"},(0,a.kt)("code",null,"BsdaWhere"))),(0,a.kt)("td",null)))))}f.isMDXComponent=!0}}]);