"use strict";(self.webpackChunktd_doc=self.webpackChunktd_doc||[]).push([[1791],{3905:function(e,t,r){r.d(t,{Zo:function(){return s},kt:function(){return f}});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function u(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=n.createContext({}),c=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},s=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,s=u(e,["components","mdxType","originalType","parentName"]),m=c(r),f=o,d=m["".concat(l,".").concat(f)]||m[f]||p[f]||a;return r?n.createElement(d,i(i({ref:t},s),{},{components:r})):n.createElement(d,i({ref:t},s))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=m;var u={};for(var l in t)hasOwnProperty.call(t,l)&&(u[l]=t[l]);u.originalType=e,u.mdxType="string"==typeof e?e:o,i[1]=u;for(var c=2;c<a;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},8663:function(e,t,r){r.r(t),r.d(t,{assets:function(){return s},contentTitle:function(){return l},default:function(){return f},frontMatter:function(){return u},metadata:function(){return c},toc:function(){return p}});var n=r(7462),o=r(3366),a=(r(7294),r(3905)),i=["components"],u={id:"mutations",title:"Mutations",slug:"mutations",sidebar_position:2},l=void 0,c={unversionedId:"reference/api-reference/user-company/mutations",id:"reference/api-reference/user-company/mutations",title:"Mutations",description:"login",source:"@site/docs/reference/api-reference/user-company/mutations.md",sourceDirName:"reference/api-reference/user-company",slug:"/reference/api-reference/user-company/mutations",permalink:"/reference/api-reference/user-company/mutations",editUrl:"https://github.com/MTES-MCT/trackdechets/edit/dev/doc/docs/reference/api-reference/user-company/mutations.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{id:"mutations",title:"Mutations",slug:"mutations",sidebar_position:2},sidebar:"docs",previous:{title:"Queries",permalink:"/reference/api-reference/user-company/queries"},next:{title:"Objects",permalink:"/reference/api-reference/user-company/objects"}},s={},p=[{value:"login",id:"login",level:2},{value:"sendMembershipRequest",id:"sendmembershiprequest",level:2}],m={toc:p};function f(e){var t=e.components,r=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,n.Z)({},m,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"login"},"login"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Type:")," ",(0,a.kt)("a",{parentName:"p",href:"/reference/api-reference/user-company/objects#authpayload"},"AuthPayload!")),(0,a.kt)("p",null,"DEPRECATED - La r\xe9cup\xe9ration de token pour le compte de tiers\ndoit s'effectuer avec le protocole OAuth2"),(0,a.kt)("p",null,"R\xe9cup\xe9re un token \xe0 partir de l'email et du mot de passe\nd'un utilisateur."),(0,a.kt)("p",{style:{marginBottom:"0.4em"}},(0,a.kt)("strong",null,"Arguments")),(0,a.kt)("table",null,(0,a.kt)("thead",null,(0,a.kt)("tr",null,(0,a.kt)("th",null,"Name"),(0,a.kt)("th",null,"Description"))),(0,a.kt)("tbody",null,(0,a.kt)("tr",null,(0,a.kt)("td",null,"email",(0,a.kt)("br",null),(0,a.kt)("a",{href:"/reference/api-reference/user-company/scalars#string"},(0,a.kt)("code",null,"String!"))),(0,a.kt)("td",null)),(0,a.kt)("tr",null,(0,a.kt)("td",null,"password",(0,a.kt)("br",null),(0,a.kt)("a",{href:"/reference/api-reference/user-company/scalars#string"},(0,a.kt)("code",null,"String!"))),(0,a.kt)("td",null)))),(0,a.kt)("h2",{id:"sendmembershiprequest"},"sendMembershipRequest"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Type:")," ",(0,a.kt)("a",{parentName:"p",href:"/reference/api-reference/user-company/objects#membershiprequest"},"MembershipRequest")),(0,a.kt)("p",null,"Envoie une demande de rattachement de l'utilisateur courant\n\xe0 rejoindre l'\xe9tablissement dont le siret est pr\xe9cis\xe9 en param\xe8tre.\nCette demande est communiqu\xe9e \xe0 l'ensemble des administrateurs de\nl'\xe9tablissement qui ont le choix de l'accepter ou de la refuser."),(0,a.kt)("p",{style:{marginBottom:"0.4em"}},(0,a.kt)("strong",null,"Arguments")),(0,a.kt)("table",null,(0,a.kt)("thead",null,(0,a.kt)("tr",null,(0,a.kt)("th",null,"Name"),(0,a.kt)("th",null,"Description"))),(0,a.kt)("tbody",null,(0,a.kt)("tr",null,(0,a.kt)("td",null,"siret",(0,a.kt)("br",null),(0,a.kt)("a",{href:"/reference/api-reference/user-company/scalars#string"},(0,a.kt)("code",null,"String!"))),(0,a.kt)("td",null)))))}f.isMDXComponent=!0}}]);