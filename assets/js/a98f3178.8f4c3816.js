"use strict";(self.webpackChunktd_doc=self.webpackChunktd_doc||[]).push([[1025],{3905:(e,t,r)=>{r.d(t,{Zo:()=>o,kt:()=>p});var n=r(7294);function l(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){l(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,l=function(e,t){if(null==e)return{};var r,n,l={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(l[r]=e[r]);return l}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(l[r]=e[r])}return l}var u=n.createContext({}),c=function(e){var t=n.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},o=function(e){var t=c(e.components);return n.createElement(u.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},k=n.forwardRef((function(e,t){var r=e.components,l=e.mdxType,a=e.originalType,u=e.parentName,o=i(e,["components","mdxType","originalType","parentName"]),k=c(r),p=l,f=k["".concat(u,".").concat(p)]||k[p]||d[p]||a;return r?n.createElement(f,s(s({ref:t},o),{},{components:r})):n.createElement(f,s({ref:t},o))}));function p(e,t){var r=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var a=r.length,s=new Array(a);s[0]=k;var i={};for(var u in t)hasOwnProperty.call(t,u)&&(i[u]=t[u]);i.originalType=e,i.mdxType="string"==typeof e?e:l,s[1]=i;for(var c=2;c<a;c++)s[c]=r[c];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}k.displayName="MDXCreateElement"},3827:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>u,contentTitle:()=>s,default:()=>d,frontMatter:()=>a,metadata:()=>i,toc:()=>c});var n=r(3117),l=(r(7294),r(3905));const a={id:"queries",title:"Queries",slug:"queries",sidebar_position:1},s=void 0,i={unversionedId:"reference/api-reference/registre/queries",id:"reference/api-reference/registre/queries",title:"Queries",description:"allWastes",source:"@site/docs/reference/api-reference/registre/queries.md",sourceDirName:"reference/api-reference/registre",slug:"/reference/api-reference/registre/queries",permalink:"/reference/api-reference/registre/queries",draft:!1,editUrl:"https://github.com/MTES-MCT/trackdechets/edit/dev/doc/docs/reference/api-reference/registre/queries.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{id:"queries",title:"Queries",slug:"queries",sidebar_position:1},sidebar:"docs",previous:{title:"Scalars",permalink:"/reference/api-reference/user-company/scalars"},next:{title:"Objects",permalink:"/reference/api-reference/registre/objects"}},u={},c=[{value:"allWastes",id:"allwastes",level:2},{value:"incomingWastes",id:"incomingwastes",level:2},{value:"managedWastes",id:"managedwastes",level:2},{value:"outgoingWastes",id:"outgoingwastes",level:2},{value:"transportedWastes",id:"transportedwastes",level:2},{value:"wastesRegistryCsv",id:"wastesregistrycsv",level:2},{value:"wastesRegistryXls",id:"wastesregistryxls",level:2}],o={toc:c};function d(e){let{components:t,...r}=e;return(0,l.kt)("wrapper",(0,n.Z)({},o,r,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h2",{id:"allwastes"},"allWastes"),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"Type:")," ",(0,l.kt)("a",{parentName:"p",href:"/reference/api-reference/registre/objects#allwasteconnection"},"AllWasteConnection!")),(0,l.kt)("p",null,"Registre de d\xe9chets \"exhaustif\" permettant d'exporter l'int\xe9gralit\xe9\ndes d\xe9chets sortants, entrants, collect\xe9s ou g\xe9r\xe9s, tri\xe9 par la date\nd'exp\xe9dition du d\xe9chet."),(0,l.kt)("p",{style:{marginBottom:"0.4em"}},(0,l.kt)("strong",null,"Arguments")),(0,l.kt)("table",null,(0,l.kt)("thead",null,(0,l.kt)("tr",null,(0,l.kt)("th",null,"Name"),(0,l.kt)("th",null,"Description"))),(0,l.kt)("tbody",null,(0,l.kt)("tr",null,(0,l.kt)("td",null,"sirets",(0,l.kt)("br",null),(0,l.kt)("a",{href:"/reference/api-reference/registre/scalars#string"},(0,l.kt)("code",null,"[String!]!"))),(0,l.kt)("td",null,(0,l.kt)("p",null,"Liste d'\xe9tablissements \xe0 inclure dans le registre de d\xe9chets exhaustifs"))),(0,l.kt)("tr",null,(0,l.kt)("td",null,"where",(0,l.kt)("br",null),(0,l.kt)("a",{href:"/reference/api-reference/registre/inputObjects#wasteregistrywhere"},(0,l.kt)("code",null,"WasteRegistryWhere"))),(0,l.kt)("td",null,(0,l.kt)("p",null,"Filtres additionnels sur les dates d'exp\xe9dition / r\xe9ception, le code d\xe9chet, l'op\xe9ration de traitement, etc "))),(0,l.kt)("tr",null,(0,l.kt)("td",null,"after",(0,l.kt)("br",null),(0,l.kt)("a",{href:"/reference/api-reference/registre/scalars#id"},(0,l.kt)("code",null,"ID"))),(0,l.kt)("td",null,(0,l.kt)("p",null,"Pagination croissante avec first et after"))),(0,l.kt)("tr",null,(0,l.kt)("td",null,"first",(0,l.kt)("br",null),(0,l.kt)("a",{href:"/reference/api-reference/registre/scalars#int"},(0,l.kt)("code",null,"Int"))),(0,l.kt)("td",null,(0,l.kt)("p",null,"Pagination croissante avec first et after"))),(0,l.kt)("tr",null,(0,l.kt)("td",null,"before",(0,l.kt)("br",null),(0,l.kt)("a",{href:"/reference/api-reference/registre/scalars#id"},(0,l.kt)("code",null,"ID"))),(0,l.kt)("td",null,(0,l.kt)("p",null,"Pagination d\xe9croissante avec last et before"))),(0,l.kt)("tr",null,(0,l.kt)("td",null,"last",(0,l.kt)("br",null),(0,l.kt)("a",{href:"/reference/api-reference/registre/scalars#int"},(0,l.kt)("code",null,"Int"))),(0,l.kt)("td",null,(0,l.kt)("p",null,"Pagination d\xe9croissante avec last et before"))))),(0,l.kt)("h2",{id:"incomingwastes"},"incomingWastes"),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"Type:")," ",(0,l.kt)("a",{parentName:"p",href:"/reference/api-reference/registre/objects#incomingwasteconnection"},"IncomingWasteConnection!")),(0,l.kt)("p",null,"Registre de d\xe9chets entrants, tri\xe9 par date de r\xe9ception\n",(0,l.kt)("a",{parentName:"p",href:"https://www.legifrance.gouv.fr/jorf/article_jo/JORFARTI000043884574"},"https://www.legifrance.gouv.fr/jorf/article_jo/JORFARTI000043884574")),(0,l.kt)("p",{style:{marginBottom:"0.4em"}},(0,l.kt)("strong",null,"Arguments")),(0,l.kt)("table",null,(0,l.kt)("thead",null,(0,l.kt)("tr",null,(0,l.kt)("th",null,"Name"),(0,l.kt)("th",null,"Description"))),(0,l.kt)("tbody",null,(0,l.kt)("tr",null,(0,l.kt)("td",null,"sirets",(0,l.kt)("br",null),(0,l.kt)("a",{href:"/reference/api-reference/registre/scalars#string"},(0,l.kt)("code",null,"[String!]!"))),(0,l.kt)("td",null,(0,l.kt)("p",null,"Liste d'\xe9tablissements \xe0 inclure dans le registre de d\xe9chets entrants"))),(0,l.kt)("tr",null,(0,l.kt)("td",null,"where",(0,l.kt)("br",null),(0,l.kt)("a",{href:"/reference/api-reference/registre/inputObjects#wasteregistrywhere"},(0,l.kt)("code",null,"WasteRegistryWhere"))),(0,l.kt)("td",null,(0,l.kt)("p",null,"Filtres additionnels sur les dates d'exp\xe9dition / r\xe9ception, le code d\xe9chet, l'op\xe9ration de traitement, etc "))),(0,l.kt)("tr",null,(0,l.kt)("td",null,"first",(0,l.kt)("br",null),(0,l.kt)("a",{href:"/reference/api-reference/registre/scalars#int"},(0,l.kt)("code",null,"Int"))),(0,l.kt)("td",null,(0,l.kt)("p",null,"Pagination croissante avec first et after"))),(0,l.kt)("tr",null,(0,l.kt)("td",null,"after",(0,l.kt)("br",null),(0,l.kt)("a",{href:"/reference/api-reference/registre/scalars#id"},(0,l.kt)("code",null,"ID"))),(0,l.kt)("td",null,(0,l.kt)("p",null,"Pagination croissante avec first et after"))),(0,l.kt)("tr",null,(0,l.kt)("td",null,"last",(0,l.kt)("br",null),(0,l.kt)("a",{href:"/reference/api-reference/registre/scalars#int"},(0,l.kt)("code",null,"Int"))),(0,l.kt)("td",null,(0,l.kt)("p",null,"Pagination d\xe9croissante avec last et before"))),(0,l.kt)("tr",null,(0,l.kt)("td",null,"before",(0,l.kt)("br",null),(0,l.kt)("a",{href:"/reference/api-reference/registre/scalars#id"},(0,l.kt)("code",null,"ID"))),(0,l.kt)("td",null,(0,l.kt)("p",null,"Pagination d\xe9croissante avec last et before"))))),(0,l.kt)("h2",{id:"managedwastes"},"managedWastes"),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"Type:")," ",(0,l.kt)("a",{parentName:"p",href:"/reference/api-reference/registre/objects#managedwasteconnection"},"ManagedWasteConnection!")),(0,l.kt)("p",null,"Registre de d\xe9chets g\xe9r\xe9s, tri\xe9 par date d'exp\xe9dition du d\xe9chet\n(la date d'acquisition ou de d\xe9but de gestion du d\xe9chet n'apparaissant pas\nsur les bordereaux de suivi de d\xe9chet, il n'est pas possible de trier\nle registre suivant cette date)\n",(0,l.kt)("a",{parentName:"p",href:"https://www.legifrance.gouv.fr/jorf/article_jo/JORFARTI000043884599"},"https://www.legifrance.gouv.fr/jorf/article_jo/JORFARTI000043884599")),(0,l.kt)("p",{style:{marginBottom:"0.4em"}},(0,l.kt)("strong",null,"Arguments")),(0,l.kt)("table",null,(0,l.kt)("thead",null,(0,l.kt)("tr",null,(0,l.kt)("th",null,"Name"),(0,l.kt)("th",null,"Description"))),(0,l.kt)("tbody",null,(0,l.kt)("tr",null,(0,l.kt)("td",null,"sirets",(0,l.kt)("br",null),(0,l.kt)("a",{href:"/reference/api-reference/registre/scalars#string"},(0,l.kt)("code",null,"[String!]!"))),(0,l.kt)("td",null,(0,l.kt)("p",null,"Liste d'\xe9tablissements \xe0 inclure dans le registre de d\xe9chets g\xe9r\xe9s"))),(0,l.kt)("tr",null,(0,l.kt)("td",null,"where",(0,l.kt)("br",null),(0,l.kt)("a",{href:"/reference/api-reference/registre/inputObjects#wasteregistrywhere"},(0,l.kt)("code",null,"WasteRegistryWhere"))),(0,l.kt)("td",null,(0,l.kt)("p",null,"Filtres additionnels sur les dates d'exp\xe9dition / r\xe9ception, le code d\xe9chet, l'op\xe9ration de traitement, etc "))),(0,l.kt)("tr",null,(0,l.kt)("td",null,"after",(0,l.kt)("br",null),(0,l.kt)("a",{href:"/reference/api-reference/registre/scalars#id"},(0,l.kt)("code",null,"ID"))),(0,l.kt)("td",null,(0,l.kt)("p",null,"Pagination croissante avec first et after"))),(0,l.kt)("tr",null,(0,l.kt)("td",null,"first",(0,l.kt)("br",null),(0,l.kt)("a",{href:"/reference/api-reference/registre/scalars#int"},(0,l.kt)("code",null,"Int"))),(0,l.kt)("td",null,(0,l.kt)("p",null,"Pagination croissante avec first et after"))),(0,l.kt)("tr",null,(0,l.kt)("td",null,"before",(0,l.kt)("br",null),(0,l.kt)("a",{href:"/reference/api-reference/registre/scalars#id"},(0,l.kt)("code",null,"ID"))),(0,l.kt)("td",null,(0,l.kt)("p",null,"Pagination d\xe9croissante avec last et before"))),(0,l.kt)("tr",null,(0,l.kt)("td",null,"last",(0,l.kt)("br",null),(0,l.kt)("a",{href:"/reference/api-reference/registre/scalars#int"},(0,l.kt)("code",null,"Int"))),(0,l.kt)("td",null,(0,l.kt)("p",null,"Pagination d\xe9croissante avec last et before"))))),(0,l.kt)("h2",{id:"outgoingwastes"},"outgoingWastes"),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"Type:")," ",(0,l.kt)("a",{parentName:"p",href:"/reference/api-reference/registre/objects#outgoingwasteconnection"},"OutgoingWasteConnection!")),(0,l.kt)("p",null,"Registre de d\xe9chets sortants, tri\xe9 par date d'exp\xe9dition du d\xe9chet\n",(0,l.kt)("a",{parentName:"p",href:"https://www.legifrance.gouv.fr/jorf/article_jo/JORFARTI000043884583"},"https://www.legifrance.gouv.fr/jorf/article_jo/JORFARTI000043884583")),(0,l.kt)("p",{style:{marginBottom:"0.4em"}},(0,l.kt)("strong",null,"Arguments")),(0,l.kt)("table",null,(0,l.kt)("thead",null,(0,l.kt)("tr",null,(0,l.kt)("th",null,"Name"),(0,l.kt)("th",null,"Description"))),(0,l.kt)("tbody",null,(0,l.kt)("tr",null,(0,l.kt)("td",null,"sirets",(0,l.kt)("br",null),(0,l.kt)("a",{href:"/reference/api-reference/registre/scalars#string"},(0,l.kt)("code",null,"[String!]!"))),(0,l.kt)("td",null,(0,l.kt)("p",null,"Liste d'\xe9tablissements \xe0 inclure dans le registre de d\xe9chets entrants"))),(0,l.kt)("tr",null,(0,l.kt)("td",null,"where",(0,l.kt)("br",null),(0,l.kt)("a",{href:"/reference/api-reference/registre/inputObjects#wasteregistrywhere"},(0,l.kt)("code",null,"WasteRegistryWhere"))),(0,l.kt)("td",null,(0,l.kt)("p",null,"Filtres additionnels sur les dates d'exp\xe9dition / r\xe9ception, le code d\xe9chet, l'op\xe9ration de traitement, etc "))),(0,l.kt)("tr",null,(0,l.kt)("td",null,"after",(0,l.kt)("br",null),(0,l.kt)("a",{href:"/reference/api-reference/registre/scalars#id"},(0,l.kt)("code",null,"ID"))),(0,l.kt)("td",null,(0,l.kt)("p",null,"Pagination croissante avec first et after"))),(0,l.kt)("tr",null,(0,l.kt)("td",null,"first",(0,l.kt)("br",null),(0,l.kt)("a",{href:"/reference/api-reference/registre/scalars#int"},(0,l.kt)("code",null,"Int"))),(0,l.kt)("td",null,(0,l.kt)("p",null,"Pagination croissante avec first et after"))),(0,l.kt)("tr",null,(0,l.kt)("td",null,"before",(0,l.kt)("br",null),(0,l.kt)("a",{href:"/reference/api-reference/registre/scalars#id"},(0,l.kt)("code",null,"ID"))),(0,l.kt)("td",null,(0,l.kt)("p",null,"Pagination d\xe9croissante avec last et before"))),(0,l.kt)("tr",null,(0,l.kt)("td",null,"last",(0,l.kt)("br",null),(0,l.kt)("a",{href:"/reference/api-reference/registre/scalars#int"},(0,l.kt)("code",null,"Int"))),(0,l.kt)("td",null,(0,l.kt)("p",null,"Pagination d\xe9croissante avec last et before"))))),(0,l.kt)("h2",{id:"transportedwastes"},"transportedWastes"),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"Type:")," ",(0,l.kt)("a",{parentName:"p",href:"/reference/api-reference/registre/objects#transportedwasteconnection"},"TransportedWasteConnection!")),(0,l.kt)("p",null,"Registre de d\xe9chets collect\xe9s, tri\xe9 par date de prise en charge du d\xe9chet\n",(0,l.kt)("a",{parentName:"p",href:"https://www.legifrance.gouv.fr/jorf/article_jo/JORFARTI000043884592"},"https://www.legifrance.gouv.fr/jorf/article_jo/JORFARTI000043884592")),(0,l.kt)("p",{style:{marginBottom:"0.4em"}},(0,l.kt)("strong",null,"Arguments")),(0,l.kt)("table",null,(0,l.kt)("thead",null,(0,l.kt)("tr",null,(0,l.kt)("th",null,"Name"),(0,l.kt)("th",null,"Description"))),(0,l.kt)("tbody",null,(0,l.kt)("tr",null,(0,l.kt)("td",null,"sirets",(0,l.kt)("br",null),(0,l.kt)("a",{href:"/reference/api-reference/registre/scalars#string"},(0,l.kt)("code",null,"[String!]!"))),(0,l.kt)("td",null,(0,l.kt)("p",null,"Liste d'\xe9tablissements \xe0 inclure dans le registre de d\xe9chets collect\xe9s"))),(0,l.kt)("tr",null,(0,l.kt)("td",null,"where",(0,l.kt)("br",null),(0,l.kt)("a",{href:"/reference/api-reference/registre/inputObjects#wasteregistrywhere"},(0,l.kt)("code",null,"WasteRegistryWhere"))),(0,l.kt)("td",null,(0,l.kt)("p",null,"Filtres additionnels sur les dates d'exp\xe9dition / r\xe9ception, le code d\xe9chet, l'op\xe9ration de traitement, etc "))),(0,l.kt)("tr",null,(0,l.kt)("td",null,"after",(0,l.kt)("br",null),(0,l.kt)("a",{href:"/reference/api-reference/registre/scalars#id"},(0,l.kt)("code",null,"ID"))),(0,l.kt)("td",null,(0,l.kt)("p",null,"Pagination croissante avec first et after"))),(0,l.kt)("tr",null,(0,l.kt)("td",null,"first",(0,l.kt)("br",null),(0,l.kt)("a",{href:"/reference/api-reference/registre/scalars#int"},(0,l.kt)("code",null,"Int"))),(0,l.kt)("td",null,(0,l.kt)("p",null,"Pagination croissante avec first et after"))),(0,l.kt)("tr",null,(0,l.kt)("td",null,"before",(0,l.kt)("br",null),(0,l.kt)("a",{href:"/reference/api-reference/registre/scalars#id"},(0,l.kt)("code",null,"ID"))),(0,l.kt)("td",null,(0,l.kt)("p",null,"Pagination d\xe9croissante avec last et before"))),(0,l.kt)("tr",null,(0,l.kt)("td",null,"last",(0,l.kt)("br",null),(0,l.kt)("a",{href:"/reference/api-reference/registre/scalars#int"},(0,l.kt)("code",null,"Int"))),(0,l.kt)("td",null,(0,l.kt)("p",null,"Pagination d\xe9croissante avec last et before"))))),(0,l.kt)("h2",{id:"wastesregistrycsv"},"wastesRegistryCsv"),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"Type:")," ",(0,l.kt)("a",{parentName:"p",href:"/reference/api-reference/registre/objects#filedownload"},"FileDownload!")),(0,l.kt)("p",null,"Renvoie un lien permettant de t\xe9l\xe9charger un registre au format CSV"),(0,l.kt)("p",{style:{marginBottom:"0.4em"}},(0,l.kt)("strong",null,"Arguments")),(0,l.kt)("table",null,(0,l.kt)("thead",null,(0,l.kt)("tr",null,(0,l.kt)("th",null,"Name"),(0,l.kt)("th",null,"Description"))),(0,l.kt)("tbody",null,(0,l.kt)("tr",null,(0,l.kt)("td",null,"registryType",(0,l.kt)("br",null),(0,l.kt)("a",{href:"/reference/api-reference/registre/enums#wasteregistrytype"},(0,l.kt)("code",null,"WasteRegistryType!"))),(0,l.kt)("td",null,(0,l.kt)("p",null,"Type de registre de d\xe9chets"))),(0,l.kt)("tr",null,(0,l.kt)("td",null,"sirets",(0,l.kt)("br",null),(0,l.kt)("a",{href:"/reference/api-reference/registre/scalars#string"},(0,l.kt)("code",null,"[String!]!"))),(0,l.kt)("td",null,(0,l.kt)("p",null,"Liste d'\xe9tablissements \xe0 inclure dans le registre de d\xe9chets"))),(0,l.kt)("tr",null,(0,l.kt)("td",null,"where",(0,l.kt)("br",null),(0,l.kt)("a",{href:"/reference/api-reference/registre/inputObjects#wasteregistrywhere"},(0,l.kt)("code",null,"WasteRegistryWhere"))),(0,l.kt)("td",null,(0,l.kt)("p",null,"Filtres additionnels sur les dates d'exp\xe9dition / r\xe9ception, le code d\xe9chet, l'op\xe9ration de traitement, etc "))))),(0,l.kt)("h2",{id:"wastesregistryxls"},"wastesRegistryXls"),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"Type:")," ",(0,l.kt)("a",{parentName:"p",href:"/reference/api-reference/registre/objects#filedownload"},"FileDownload!")),(0,l.kt)("p",null,"Renvoie un lien permettant de t\xe9l\xe9charger un registre au format Excel"),(0,l.kt)("p",{style:{marginBottom:"0.4em"}},(0,l.kt)("strong",null,"Arguments")),(0,l.kt)("table",null,(0,l.kt)("thead",null,(0,l.kt)("tr",null,(0,l.kt)("th",null,"Name"),(0,l.kt)("th",null,"Description"))),(0,l.kt)("tbody",null,(0,l.kt)("tr",null,(0,l.kt)("td",null,"registryType",(0,l.kt)("br",null),(0,l.kt)("a",{href:"/reference/api-reference/registre/enums#wasteregistrytype"},(0,l.kt)("code",null,"WasteRegistryType!"))),(0,l.kt)("td",null,(0,l.kt)("p",null,"Type de registre de d\xe9chets"))),(0,l.kt)("tr",null,(0,l.kt)("td",null,"sirets",(0,l.kt)("br",null),(0,l.kt)("a",{href:"/reference/api-reference/registre/scalars#string"},(0,l.kt)("code",null,"[String!]!"))),(0,l.kt)("td",null,(0,l.kt)("p",null,"Liste d'\xe9tablissements \xe0 inclure dans le registre de d\xe9chets"))),(0,l.kt)("tr",null,(0,l.kt)("td",null,"where",(0,l.kt)("br",null),(0,l.kt)("a",{href:"/reference/api-reference/registre/inputObjects#wasteregistrywhere"},(0,l.kt)("code",null,"WasteRegistryWhere"))),(0,l.kt)("td",null,(0,l.kt)("p",null,"Filtres additionnels sur les dates d'exp\xe9dition / r\xe9ception, le code d\xe9chet, l'op\xe9ration de traitement, etc "))))))}d.isMDXComponent=!0}}]);