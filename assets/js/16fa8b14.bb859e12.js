"use strict";(self.webpackChunktd_doc=self.webpackChunktd_doc||[]).push([[640],{3905:function(e,r,t){t.d(r,{Zo:function(){return p},kt:function(){return f}});var n=t(67294);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function i(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function o(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?i(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function c(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=n.createContext({}),s=function(e){var r=n.useContext(l),t=r;return e&&(t="function"==typeof e?e(r):o(o({},r),e)),t},p=function(e){var r=s(e.components);return n.createElement(l.Provider,{value:r},e.children)},u={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},d=n.forwardRef((function(e,r){var t=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),d=s(t),f=a,m=d["".concat(l,".").concat(f)]||d[f]||u[f]||i;return t?n.createElement(m,o(o({ref:r},p),{},{components:t})):n.createElement(m,o({ref:r},p))}));function f(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var i=t.length,o=new Array(i);o[0]=d;var c={};for(var l in r)hasOwnProperty.call(r,l)&&(c[l]=r[l]);c.originalType=e,c.mdxType="string"==typeof e?e:a,o[1]=c;for(var s=2;s<i;s++)o[s]=t[s];return n.createElement.apply(null,o)}return n.createElement.apply(null,t)}d.displayName="MDXCreateElement"},87529:function(e,r,t){t.r(r),t.d(r,{frontMatter:function(){return c},contentTitle:function(){return l},metadata:function(){return s},toc:function(){return p},default:function(){return d}});var n=t(87462),a=t(63366),i=(t(67294),t(3905)),o=["components"],c={id:"scalars",title:"Scalars",slug:"scalars",sidebar_position:8},l=void 0,s={unversionedId:"reference/api-reference/user-company/scalars",id:"reference/api-reference/user-company/scalars",isDocsHomePage:!1,title:"Scalars",description:"Boolean",source:"@site/docs/reference/api-reference/user-company/scalars.md",sourceDirName:"reference/api-reference/user-company",slug:"/reference/api-reference/user-company/scalars",permalink:"/reference/api-reference/user-company/scalars",editUrl:"https://github.com/MTES-MCT/trackdechets/edit/dev/doc/docs/reference/api-reference/user-company/scalars.md",version:"current",sidebarPosition:8,frontMatter:{id:"scalars",title:"Scalars",slug:"scalars",sidebar_position:8},sidebar:"docs",previous:{title:"Input objects",permalink:"/reference/api-reference/user-company/inputObjects"},next:{title:"Queries",permalink:"/reference/api-reference/registre/queries"}},p=[{value:"Boolean",id:"boolean",children:[]},{value:"DateTime",id:"datetime",children:[]},{value:"Float",id:"float",children:[]},{value:"ID",id:"id",children:[]},{value:"Int",id:"int",children:[]},{value:"JSON",id:"json",children:[]},{value:"String",id:"string",children:[]},{value:"URL",id:"url",children:[]}],u={toc:p};function d(e){var r=e.components,t=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,n.Z)({},u,t,{components:r,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"boolean"},"Boolean"),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"Boolean")," scalar type represents ",(0,i.kt)("inlineCode",{parentName:"p"},"true")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"false"),"."),(0,i.kt)("h2",{id:"datetime"},"DateTime"),(0,i.kt)("p",null,"Le scalaire ",(0,i.kt)("inlineCode",{parentName:"p"},"DateTime")," accepte des chaines de caract\xe8res\nformatt\xe9es selon le standard ISO 8601. Exemples:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},'"yyyy-MM-dd" (eg. 2020-11-23)'),(0,i.kt)("li",{parentName:"ul"},'"yyyy-MM-ddTHH:mm:ss" (eg. 2020-11-23T13:34:55)'),(0,i.kt)("li",{parentName:"ul"},'"yyyy-MM-ddTHH:mm:ssX" (eg. 2020-11-23T13:34:55Z)'),(0,i.kt)("li",{parentName:"ul"},"\"yyyy-MM-dd'T'HH:mm:ss.SSS\" (eg. 2020-11-23T13:34:55.987)"),(0,i.kt)("li",{parentName:"ul"},"\"yyyy-MM-dd'T'HH:mm:ss.SSSX\" (eg. 2020-11-23T13:34:55.987Z)")),(0,i.kt)("h2",{id:"float"},"Float"),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"Float")," scalar type represents signed double-precision fractional values as specified by ",(0,i.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/IEEE_floating_point"},"IEEE 754"),"."),(0,i.kt)("h2",{id:"id"},"ID"),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"ID")," scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as ",(0,i.kt)("inlineCode",{parentName:"p"},'"4"'),") or integer (such as ",(0,i.kt)("inlineCode",{parentName:"p"},"4"),") input value will be accepted as an ID."),(0,i.kt)("h2",{id:"int"},"Int"),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"Int")," scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1."),(0,i.kt)("h2",{id:"json"},"JSON"),(0,i.kt)("h2",{id:"string"},"String"),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"String")," scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text."),(0,i.kt)("h2",{id:"url"},"URL"),(0,i.kt)("p",null,"Cha\xeene de caract\xe8re au format URL, d\xe9butant par un protocole http(s)."))}d.isMDXComponent=!0}}]);