"use strict";(self.webpackChunktd_doc=self.webpackChunktd_doc||[]).push([[6558],{3905:(e,n,t)=>{t.d(n,{Zo:()=>l,kt:()=>f});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function s(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?s(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},s=Object.keys(e);for(r=0;r<s.length;r++)t=s[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)t=s[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var u=r.createContext({}),p=function(e){var n=r.useContext(u),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},l=function(e){var n=p(e.components);return r.createElement(u.Provider,{value:n},e.children)},c="mdxType",m={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,s=e.originalType,u=e.parentName,l=o(e,["components","mdxType","originalType","parentName"]),c=p(t),d=a,f=c["".concat(u,".").concat(d)]||c[d]||m[d]||s;return t?r.createElement(f,i(i({ref:n},l),{},{components:t})):r.createElement(f,i({ref:n},l))}));function f(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var s=t.length,i=new Array(s);i[0]=d;var o={};for(var u in n)hasOwnProperty.call(n,u)&&(o[u]=n[u]);o.originalType=e,o[c]="string"==typeof e?e:a,i[1]=o;for(var p=2;p<s;p++)i[p]=t[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},1026:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>i,default:()=>m,frontMatter:()=>s,metadata:()=>o,toc:()=>p});var r=t(7462),a=(t(7294),t(3905));const s={title:"Rechercher un \xe9tablissement partenaire sur l'API Trackd\xe9chets"},i="Par son nom, ou par n\xb0 SIRET ou par son n\xb0TVA intracommunautaire pour les entreprises europ\xe9ennes.",o={unversionedId:"guides/sirene",id:"guides/sirene",title:"Rechercher un \xe9tablissement partenaire sur l'API Trackd\xe9chets",description:"Nous exposons une query searchCompanies qui interroge la base SIRENE (via les donn\xe9es ouvertes de l'INSEE), ou la base VIES (via le service la commission europ\xe9enne) la base des installations class\xe9es pour la protection de l'environnement (ICPE) et la base Trackd\xe9chets pour obtenir des informations sur un \xe9tablissement \xe0 partir de son num\xe9ro SIRET, sa raison sociale, ou son num\xe9ro de TVA intra-communautaire.",source:"@site/docs/guides/sirene.md",sourceDirName:"guides",slug:"/guides/sirene",permalink:"/guides/sirene",draft:!1,editUrl:"https://github.com/MTES-MCT/trackdechets/edit/dev/doc/docs/guides/sirene.md",tags:[],version:"current",frontMatter:{title:"Rechercher un \xe9tablissement partenaire sur l'API Trackd\xe9chets"},sidebar:"docs",previous:{title:"Exporter un registre",permalink:"/guides/registre"},next:{title:"Cr\xe9er une application OAuth2",permalink:"/guides/oauth2"}},u={},p=[],l={toc:p},c="wrapper";function m(e){let{components:n,...t}=e;return(0,a.kt)(c,(0,r.Z)({},l,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"par-son-nom-ou-par-n-siret-ou-par-son-ntva-intracommunautaire-pour-les-entreprises-europ\xe9ennes"},"Par son nom, ou par n\xb0 SIRET ou par son n\xb0TVA intracommunautaire pour les entreprises europ\xe9ennes."),(0,a.kt)("p",null,"Nous exposons une query ",(0,a.kt)("a",{parentName:"p",href:"../reference/api-reference/user-company/queries#searchcompanies"},(0,a.kt)("inlineCode",{parentName:"a"},"searchCompanies"))," qui interroge la base SIRENE (via ",(0,a.kt)("a",{parentName:"p",href:"https://files.data.gouv.fr/insee-sirene/"},"les donn\xe9es ouvertes de l'INSEE"),"), ou la base VIES (via ",(0,a.kt)("a",{parentName:"p",href:"https://ec.europa.eu/taxation_customs/vies/"},"le service la commission europ\xe9enne"),") la base des installations class\xe9es pour la protection de l'environnement (ICPE) et la base Trackd\xe9chets pour obtenir des informations sur un \xe9tablissement \xe0 partir de son num\xe9ro SIRET, sa raison sociale, ou son num\xe9ro de TVA intra-communautaire."),(0,a.kt)("p",null,"Elle requiert un token d'API Trackd\xe9chets et permets d'acc\xe9der \xe0 toutes les informations d'un \xe9tablissement sur Trackd\xe9chet et \xe0 jour des bases de l'INSEE ou de VIES (via ",(0,a.kt)("a",{parentName:"p",href:"https://ec.europa.eu/taxation_customs/vies/"},"le service la commission europ\xe9enne"),")."),(0,a.kt)("p",null,"La query renvoie un objet de type ",(0,a.kt)("a",{parentName:"p",href:"../reference/api-reference/user-company/objects#companysearchresult"},(0,a.kt)("inlineCode",{parentName:"a"},"CompanySearchResult"))," et permet notamment de savoir si un \xe9tablissement est inscrit sur Trackd\xe9chets gr\xe2ce au champ ",(0,a.kt)("inlineCode",{parentName:"p"},"isRegistered"),", mais aussi les coordonn\xe9es de l'\xe9tablissement, comme le type d'\xe9tablissement sur Trackd\xe9chets. "),(0,a.kt)("p",null,"Pour retourner les \xe9tablissement \xe9trangers quand on cherche par ",(0,a.kt)("inlineCode",{parentName:"p"},'clue : "NUMERODETVA"'),", il faut activer \xe0 ",(0,a.kt)("inlineCode",{parentName:"p"},"true")," le param\xe8tre ",(0,a.kt)("inlineCode",{parentName:"p"},"allowForeignCompanies")),(0,a.kt)("p",null,"Pour rechercher par raison sociale un \xe9tablissement fran\xe7ais, en filtrant par d\xe9partement, il faut utiliser le param\xe8tre ",(0,a.kt)("inlineCode",{parentName:"p"},"department")),(0,a.kt)("p",null,"M\xeame si l'\xe9tablissement a demand\xe9 \xe0 l'INSEE que ses informations (par exemple coordonn\xe9es, raison sociale) soient \"non-diffusibles\" (c'est-\xe0-dire prot\xe9g\xe9es si ",(0,a.kt)("inlineCode",{parentName:"p"},"statutDiffusionEtablissement"),' ne renvoie pas "O"), nous les renverrons dans cette requ\xeate ',(0,a.kt)("inlineCode",{parentName:"p"},"searchCompanies")," car elle est prot\xe9g\xe9e par un token d'API Trackdechets et que ces informations sont renseign\xe9es dans la base Trackd\xe9chets."),(0,a.kt)("p",null,"Exemple d'utilisation avec ",(0,a.kt)("inlineCode",{parentName:"p"},"clue")," comme recherfche plein-texte dans le nom d'\xe9tablissement ou d'unit\xe9 l\xe9gale:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-graphql"},'query {\n  searchCompanies(clue: "DIRECTION REGIONALE DE L\'ETABLISSEMENT") {\n    name\n    naf\n    address\n    isRegistered\n    contactEmail\n  }\n}\n')),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'{\n  "data": {\n    "searchCompanies": [{\n      "name": "DIRECTION REGIONALE DE L\'ETABLISSEMENT",\n      "naf": "84.13Z",\n      "address": "51 Rue Arthur Ranc 86000 Poitiers",\n      "isRegistered": true,\n      "contactEmail": "test@test.com"\n    }]\n  }\n}\n')),(0,a.kt)("h1",{id:"par-son-n-siret-pour-les-entreprises-fran\xe7aises-ou-par-son-ntva-intracommunautaire-pour-les-entreprises-europ\xe9ennes"},"Par son n\xb0 SIRET pour les entreprises fran\xe7aises ou par son n\xb0TVA intracommunautaire pour les entreprises europ\xe9ennes."),(0,a.kt)("p",null,"Nous exposons une query ",(0,a.kt)("a",{parentName:"p",href:"../reference/api-reference/user-company/queries#companyinfos"},(0,a.kt)("inlineCode",{parentName:"a"},"companyInfos"))," qui interroge la base SIRENE (via ",(0,a.kt)("a",{parentName:"p",href:"https://files.data.gouv.fr/insee-sirene/"},"les donn\xe9es ouvertes de l'INSEE"),"), ou la base VIES (via ",(0,a.kt)("a",{parentName:"p",href:"https://ec.europa.eu/taxation_customs/vies/"},"le service la commission europ\xe9enne"),") la base des installations class\xe9es pour la protection de l'environnement (ICPE) et la base Trackd\xe9chets pour obtenir des informations sur un \xe9tablissement \xe0 partir de son num\xe9ro SIRET."),(0,a.kt)("p",null,"La query renvoie un objet de type ",(0,a.kt)("a",{parentName:"p",href:"../reference/api-reference/user-company/objects#companypublic"},(0,a.kt)("inlineCode",{parentName:"a"},"CompanyPublic"))," et permet notamment de savoir si un \xe9tablissement est inscrit sur Trackd\xe9chets gr\xe2ce au champ ",(0,a.kt)("inlineCode",{parentName:"p"},"isRegistered"),". Si l'\xe9tablissement a demand\xe9 \xe0 l'INSEE que ses informations soient \"non-diffusibles\" (c'est-\xe0-dire prot\xe9g\xe9es si ",(0,a.kt)("inlineCode",{parentName:"p"},"statutDiffusionEtablissement"),' ne renvoie pas "O"), nous ne les r\xe9v\xe8lerons pas dans cette requ\xeate ',(0,a.kt)("inlineCode",{parentName:"p"},"companyInfos"),". Il faudra utiliser la requ\xeate authentifi\xe9e priv\xe9e document\xe9e sur cette page."),(0,a.kt)("p",null,"Exemple d'utilisation:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-graphql"},'query {\n  companyInfos(siret: "13001045700013") {\n    name\n    naf\n    address\n    isRegistered\n    allowBsdasriTakeOverWithoutSignature\n  }\n}\n')),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'{\n  "data": {\n    "companyInfos": {\n      "name": "DIRECTION REGIONALE DE L\'ETABLISSEMENT",\n      "naf": "84.13Z",\n      "address": "51 Rue Arthur Ranc 86000 Poitiers",\n      "isRegistered": true,\n      allowBsdasriTakeOverWithoutSignature: false\n    }\n  }\n}\n')),(0,a.kt)("admonition",{type:"note"},(0,a.kt)("p",{parentName:"admonition"},"Nous avons cr\xe9e une ",(0,a.kt)("strong",{parentName:"p"},"fiche entreprise publique")," pour chaque \xe9tablissement sur l'interface graphique Trackd\xe9chets qui illustre l'utilisation de cette query. Exemple avec la DREAL Nouvelle Aquitaine: ",(0,a.kt)("a",{parentName:"p",href:"https://app.trackdechets.beta.gouv.fr/company/13001045700013"},"https://app.trackdechets.beta.gouv.fr/company/13001045700013"))))}m.isMDXComponent=!0}}]);