"use strict";(self.webpackChunktd_doc=self.webpackChunktd_doc||[]).push([[8947],{3905:(e,t,r)=>{r.d(t,{Zo:()=>d,kt:()=>m});var n=r(7294);function s(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){s(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,s=function(e,t){if(null==e)return{};var r,n,s={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(s[r]=e[r]);return s}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(s[r]=e[r])}return s}var u=n.createContext({}),o=function(e){var t=n.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},d=function(e){var t=o(e.components);return n.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},c=n.forwardRef((function(e,t){var r=e.components,s=e.mdxType,a=e.originalType,u=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),c=o(r),m=s,f=c["".concat(u,".").concat(m)]||c[m]||p[m]||a;return r?n.createElement(f,l(l({ref:t},d),{},{components:r})):n.createElement(f,l({ref:t},d))}));function m(e,t){var r=arguments,s=t&&t.mdxType;if("string"==typeof e||s){var a=r.length,l=new Array(a);l[0]=c;var i={};for(var u in t)hasOwnProperty.call(t,u)&&(i[u]=t[u]);i.originalType=e,i.mdxType="string"==typeof e?e:s,l[1]=i;for(var o=2;o<a;o++)l[o]=r[o];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}c.displayName="MDXCreateElement"},6536:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>u,contentTitle:()=>l,default:()=>p,frontMatter:()=>a,metadata:()=>i,toc:()=>o});var n=r(3117),s=(r(7294),r(3905));const a={title:"Requ\xeater et filtrer les bordereaux Bsda, Bsdasri, Bsff et Bsvhu"},l=void 0,i={unversionedId:"tutoriels/courant/query-bordereaux",id:"tutoriels/courant/query-bordereaux",title:"Requ\xeater et filtrer les bordereaux Bsda, Bsdasri, Bsff et Bsvhu",description:"Les bordereaux Bsda, Bsdasri, Bsff et Bsvhu, ont b\xe9n\xe9fici\xe9 des retours utiilisateurs et proposent des filtres de requ\xeates puissants.",source:"@site/docs/tutoriels/courant/query-bordereaux.md",sourceDirName:"tutoriels/courant",slug:"/tutoriels/courant/query-bordereaux",permalink:"/tutoriels/courant/query-bordereaux",draft:!1,editUrl:"https://github.com/MTES-MCT/trackdechets/edit/dev/doc/docs/tutoriels/courant/query-bordereaux.md",tags:[],version:"current",frontMatter:{title:"Requ\xeater et filtrer les bordereaux Bsda, Bsdasri, Bsff et Bsvhu"},sidebar:"docs",previous:{title:"Cr\xe9er votre premier BSD",permalink:"/tutoriels/quickstart/first-bsd"},next:{title:"Acheminement direct du producteur de d\xe9chet \xe0 l'installation de traitement",permalink:"/tutoriels/examples/bsdd/acheminement-direct"}},u={},o=[{value:"Filtres simples",id:"filtres-simples",level:3},{value:"Sur l&#39;\xe9tat de brouillon (boolean)",id:"sur-l\xe9tat-de-brouillon-boolean",level:4},{value:"Sur un statut",id:"sur-un-statut",level:4},{value:"Egalit\xe9 stricte: Sur le siret d&#39;un producteur",id:"egalit\xe9-stricte-sur-le-siret-dun-producteur",level:4},{value:"Filtres temporels",id:"filtres-temporels",level:4},{value:"Filtre d&#39;appartenance",id:"filtre-dappartenance",level:4},{value:"Sur les statuts",id:"sur-les-statuts",level:5},{value:"Sur des identifiants",id:"sur-des-identifiants",level:4},{value:"Filtres combin\xe9s",id:"filtres-combin\xe9s",level:3},{value:"Not  (_not)",id:"not--_not",level:3},{value:"And implicite",id:"and-implicite",level:3},{value:"Or (_or)",id:"or-_or",level:3},{value:"And (_and)",id:"and-_and",level:3}],d={toc:o};function p(e){let{components:t,...r}=e;return(0,s.kt)("wrapper",(0,n.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("p",null,"Les bordereaux Bsda, Bsdasri, Bsff et Bsvhu, ont b\xe9n\xe9fici\xe9 des retours utiilisateurs et proposent des filtres de requ\xeates puissants."),(0,s.kt)("p",null,"Veuillez noter que les Bsdd (requ\xeate forms) ne disposent pas des m\xeames filtres. "),(0,s.kt)("p",null,"Pour une documentation exhaustive, veuillez consulter la r\xe9f\xe9rence des requ\xeates de chaque bordereau, par exemple ",(0,s.kt)("a",{parentName:"p",href:"../../reference/api-reference/bsdasri/queries#bsdasris"},"la requ\xeate bsdasri"),"."),(0,s.kt)("p",null,"Les exemples suivants portent sur les dasris, mais sont ais\xe9ment transposables aux autres bordereaux.\nIls ne pr\xe9tendent pas avoir un int\xe9r\xeat m\xe9tier particulier, mais simplement expliciter la syntaxe de requ\xeate."),(0,s.kt)("h3",{id:"filtres-simples"},"Filtres simples"),(0,s.kt)("h4",{id:"sur-l\xe9tat-de-brouillon-boolean"},"Sur l'\xe9tat de brouillon (boolean)"),(0,s.kt)("p",null,"Renvoie les dasris non brouillons."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-graphql"},"query {\n  bsdasris(where: { isDraft: false }) {\n    edges {\n      node {\n        id\n      }\n    }\n  }\n}\n")),(0,s.kt)("h4",{id:"sur-un-statut"},"Sur un statut"),(0,s.kt)("p",null,"Renvoie les dasris SENT."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-graphql"},"query {\n  bsdasris(where: {  status: {_eq : SENT} }) {\n    edges {\n      node {\n        id\n      }\n    }\n  }\n}\n")),(0,s.kt)("h4",{id:"egalit\xe9-stricte-sur-le-siret-dun-producteur"},"Egalit\xe9 stricte: Sur le siret d'un producteur"),(0,s.kt)("p",null,'Renvoie les dasris dont le siret de l\'\xe9metteur est "UN-SIRET".'),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-graphql"},'query {\n  bsdasris(where: { emitter : {company  : {siret :  {_eq: "UN-SIRET"}}} }) {\n    edges {\n      node {\n        id\n      }\n    }\n  }\n}\n')),(0,s.kt)("h4",{id:"filtres-temporels"},"Filtres temporels"),(0,s.kt)("p",null,"Les op\xe9rateurs et formats de date accept\xe9s sont document\xe9s dans ",(0,s.kt)("a",{parentName:"p",href:"../../reference/api-reference/bsdasri/inputObjects#datefilter"},"la r\xe9f\xe9rence de DateFilter"),"."),(0,s.kt)("p",null,"Renvoie les dasris dont la date de cr\xe9ation est \xe9gale ou post\xe9rieure au 23/11/2021."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-graphql"},'query {\n  bsdasris(where: { createdAt: { _gte: " 2021-11-23" } }) {\n    edges {\n      node {\n        id\n      }\n    }\n  }\n}\n')),(0,s.kt)("h4",{id:"filtre-dappartenance"},"Filtre d'appartenance"),(0,s.kt)("p",null,"Il est possible de filtrer certains champs sur un tableau de valeurs."),(0,s.kt)("h5",{id:"sur-les-statuts"},"Sur les statuts"),(0,s.kt)("p",null,"Renvoie les dasri en statut INITIAL ou SENT."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},"query {\n  bsdasris(where: { status: { _in: [SENT, INITIAL] } }) {\n    edges {\n      node {\n        id\n      }\n    }\n  }\n}\n")),(0,s.kt)("h4",{id:"sur-des-identifiants"},"Sur des identifiants"),(0,s.kt)("p",null,'Renvoie les dasris dont l\'identifiant vaut "DASRI-123" ou "DASRI-456".'),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},'query {\n  bsdasris(where: { id: { _in: ["DASRI-123", "DASRI-456"] } }) {\n    edges {\n      node {\n        id\n      }\n    }\n  }\n}\n')),(0,s.kt)("h3",{id:"filtres-combin\xe9s"},"Filtres combin\xe9s"),(0,s.kt)("p",null,"Il est possible de combiner des filtres avec _and, _or, _not. L'imbrication de tels op\xe9rateurs est n\xe9anmoins limit\xe9e."),(0,s.kt)("h3",{id:"not--_not"},"Not  (_not)"),(0,s.kt)("p",null,"Renvoie les dasris non SENT"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-graphql"},"query {\n  bsdasris(where: { _not: { status: { _eq: SENT } } }) {\n    edges {\n      node {\n        id\n      }\n    }\n  }\n}\n")),(0,s.kt)("h3",{id:"and-implicite"},"And implicite"),(0,s.kt)("p",null,"Renvoie les dasris INITIAL non brouillons."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-graphql"},"query {\n  bsdasris(where: { isDraft: false, status: { _eq: INITIAL } }) {\n    edges {\n      node {\n        id\n      }\n    }\n  }\n}\n\n")),(0,s.kt)("h3",{id:"or-_or"},"Or (_or)"),(0,s.kt)("p",null,"Renvoie les dasris dont la date de cr\xe9ation est \xe9gale ou post\xe9rieure au 03/05/2022 ou dont le statut est PROCESSED."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-graphql"},'query {\n  bsdasris(\n    where: {\n      _or: [\n        { createdAt: { _gte: "2022-05-03" } }\n        { status: { _eq: PROCESSED } }\n      ]\n    }\n  ) {\n    edges {\n      node {\n        id\n        updatedAt\n      }\n    }\n  }\n}\n')),(0,s.kt)("h3",{id:"and-_and"},"And (_and)"),(0,s.kt)("p",null,"Renvoie les dasris dont la date de cr\xe9ation est \xe9gale ou post\xe9rieure au 03/05/2022, dont le statut est INITIAL et non brouillon."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-graphql"},'query {\n  bsdasris(\n    where: {\n      createdAt: { _gte: "2022-05-03" }\n      _and: [{ status: { _eq: INITIAL } }, { isDraft: false }]\n    }\n  ) {\n    edges {\n      node {\n        id\n        updatedAt\n      }\n    }\n  }\n}\n')))}p.isMDXComponent=!0}}]);