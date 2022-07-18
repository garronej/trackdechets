"use strict";(self.webpackChunktd_doc=self.webpackChunktd_doc||[]).push([[3213],{3905:function(e,t,n){n.d(t,{Zo:function(){return l},kt:function(){return m}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var i=r.createContext({}),u=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},l=function(e){var t=u(e.components);return r.createElement(i.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,c=e.originalType,i=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),d=u(n),m=o,f=d["".concat(i,".").concat(m)]||d[m]||p[m]||c;return n?r.createElement(f,a(a({ref:t},l),{},{components:n})):r.createElement(f,a({ref:t},l))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var c=n.length,a=new Array(c);a[0]=d;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s.mdxType="string"==typeof e?e:o,a[1]=s;for(var u=2;u<c;u++)a[u]=n[u];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},8630:function(e,t,n){n.r(t),n.d(t,{assets:function(){return l},contentTitle:function(){return i},default:function(){return m},frontMatter:function(){return s},metadata:function(){return u},toc:function(){return p}});var r=n(7462),o=n(3366),c=(n(7294),n(3905)),a=["components"],s={title:"Obtenir un jeton d'acc\xe8s personnel"},i=void 0,u={unversionedId:"tutoriels/quickstart/access-token",id:"tutoriels/quickstart/access-token",title:"Obtenir un jeton d'acc\xe8s personnel",description:"Une fois votre compte cr\xe9e et votre premier \xe9tablissement rattach\xe9 en sandbox rendez-vous dans Mon Compte > Int\xe9gration API > Jeton d'acc\xe8s API puis G\xe9n\xe9rer un nouveau jeton d'acc\xe8s",source:"@site/docs/tutoriels/quickstart/access-token.md",sourceDirName:"tutoriels/quickstart",slug:"/tutoriels/quickstart/access-token",permalink:"/tutoriels/quickstart/access-token",editUrl:"https://github.com/MTES-MCT/trackdechets/edit/dev/doc/docs/tutoriels/quickstart/access-token.md",tags:[],version:"current",frontMatter:{title:"Obtenir un jeton d'acc\xe8s personnel"},sidebar:"docs",previous:{title:"Cr\xe9er un compte",permalink:"/tutoriels/quickstart/create-account"},next:{title:"Effectuer votre premi\xe8re requ\xeate",permalink:"/tutoriels/quickstart/first-query"}},l={},p=[],d={toc:p};function m(e){var t=e.components,s=(0,o.Z)(e,a);return(0,c.kt)("wrapper",(0,r.Z)({},d,s,{components:t,mdxType:"MDXLayout"}),(0,c.kt)("p",null,"Une fois votre compte cr\xe9e et votre premier \xe9tablissement rattach\xe9 en ",(0,c.kt)("em",{parentName:"p"},"sandbox")," rendez-vous dans ",(0,c.kt)("em",{parentName:"p"},"Mon Compte")," > ",(0,c.kt)("em",{parentName:"p"},"Int\xe9gration API")," > ",(0,c.kt)("em",{parentName:"p"},"Jeton d'acc\xe8s API")," puis ",(0,c.kt)("em",{parentName:"p"},"G\xe9n\xe9rer un nouveau jeton d'acc\xe8s")),(0,c.kt)("p",null,(0,c.kt)("img",{loading:"lazy",alt:"access-token-generate.png",src:n(9396).Z,width:"1905",height:"890"})),(0,c.kt)("hr",null),(0,c.kt)("p",null,"Pensez \xe0 donner une description \xe0 votre jeton d'acc\xe8s pour vous souvenir de son utilit\xe9."),(0,c.kt)("p",null,(0,c.kt)("img",{loading:"lazy",alt:"access-token-description.png",src:n(142).Z,width:"1912",height:"896"})),(0,c.kt)("hr",null),(0,c.kt)("p",null,"Une fois le jeton d'acc\xe8s g\xe9n\xe9r\xe9, pensez \xe0 le copier quelque part, vous ne serez plus en mesure de le consulter ult\xe9rieurement."),(0,c.kt)("p",null,(0,c.kt)("img",{loading:"lazy",alt:"access-token-copy.png",src:n(2689).Z,width:"1902",height:"893"})),(0,c.kt)("hr",null),(0,c.kt)("p",null,"Vous pouvez r\xe9voquer vos tokens \xe0 tout moment depuis le m\xeame espace."),(0,c.kt)("p",null,(0,c.kt)("img",{loading:"lazy",alt:"access-token-list.png",src:n(1162).Z,width:"1902",height:"894"})))}m.isMDXComponent=!0},2689:function(e,t,n){t.Z=n.p+"assets/images/access-token-copy-9edb013adb1161a0ff9c22731dc799b5.png"},142:function(e,t,n){t.Z=n.p+"assets/images/access-token-description-a7ffa222d522cdbca32b5a0dfd5ecb99.png"},9396:function(e,t,n){t.Z=n.p+"assets/images/access-token-generate-296ae458572894c4198492083a4b00f8.png"},1162:function(e,t,n){t.Z=n.p+"assets/images/access-token-list-694826099d3ce69d7b022a856b194550.png"}}]);