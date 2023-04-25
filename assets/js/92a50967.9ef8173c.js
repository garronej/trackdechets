"use strict";(self.webpackChunktd_doc=self.webpackChunktd_doc||[]).push([[6629],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>f});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},u=Object.keys(e);for(n=0;n<u.length;n++)r=u[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(e);for(n=0;n<u.length;n++)r=u[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),i=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},c=function(e){var t=i(e.components);return n.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},p=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,u=e.originalType,s=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),p=i(r),f=a,m=p["".concat(s,".").concat(f)]||p[f]||d[f]||u;return r?n.createElement(m,l(l({ref:t},c),{},{components:r})):n.createElement(m,l({ref:t},c))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var u=r.length,l=new Array(u);l[0]=p;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:a,l[1]=o;for(var i=2;i<u;i++)l[i]=r[i];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}p.displayName="MDXCreateElement"},5162:(e,t,r)=>{r.d(t,{Z:()=>l});var n=r(7294),a=r(4334);const u="tabItem_Ymn6";function l(e){let{children:t,hidden:r,className:l}=e;return n.createElement("div",{role:"tabpanel",className:(0,a.Z)(u,l),hidden:r},t)}},4866:(e,t,r)=>{r.d(t,{Z:()=>k});var n=r(3117),a=r(7294),u=r(4334),l=r(2466),o=r(6775),s=r(1980),i=r(7392),c=r(12);function d(e){return function(e){var t;return(null==(t=a.Children.map(e,(e=>{if(!e||(0,a.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})))?void 0:t.filter(Boolean))??[]}(e).map((e=>{let{props:{value:t,label:r,attributes:n,default:a}}=e;return{value:t,label:r,attributes:n,default:a}}))}function p(e){const{values:t,children:r}=e;return(0,a.useMemo)((()=>{const e=t??d(r);return function(e){const t=(0,i.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,r])}function f(e){let{value:t,tabValues:r}=e;return r.some((e=>e.value===t))}function m(e){let{queryString:t=!1,groupId:r}=e;const n=(0,o.k6)(),u=function(e){let{queryString:t=!1,groupId:r}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!r)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return r??null}({queryString:t,groupId:r});return[(0,s._X)(u),(0,a.useCallback)((e=>{if(!u)return;const t=new URLSearchParams(n.location.search);t.set(u,e),n.replace({...n.location,search:t.toString()})}),[u,n])]}function b(e){const{defaultValue:t,queryString:r=!1,groupId:n}=e,u=p(e),[l,o]=(0,a.useState)((()=>function(e){let{defaultValue:t,tabValues:r}=e;if(0===r.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!f({value:t,tabValues:r}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${r.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const n=r.find((e=>e.default))??r[0];if(!n)throw new Error("Unexpected error: 0 tabValues");return n.value}({defaultValue:t,tabValues:u}))),[s,i]=m({queryString:r,groupId:n}),[d,b]=function(e){let{groupId:t}=e;const r=function(e){return e?`docusaurus.tab.${e}`:null}(t),[n,u]=(0,c.Nk)(r);return[n,(0,a.useCallback)((e=>{r&&u.set(e)}),[r,u])]}({groupId:n}),v=(()=>{const e=s??d;return f({value:e,tabValues:u})?e:null})();(0,a.useLayoutEffect)((()=>{v&&o(v)}),[v]);return{selectedValue:l,selectValue:(0,a.useCallback)((e=>{if(!f({value:e,tabValues:u}))throw new Error(`Can't select invalid tab value=${e}`);o(e),i(e),b(e)}),[i,b,u]),tabValues:u}}var v=r(2389);const y="tabList__CuJ",h="tabItem_LNqP";function g(e){let{className:t,block:r,selectedValue:o,selectValue:s,tabValues:i}=e;const c=[],{blockElementScrollPositionUntilNextRender:d}=(0,l.o5)(),p=e=>{const t=e.currentTarget,r=c.indexOf(t),n=i[r].value;n!==o&&(d(t),s(n))},f=e=>{var t;let r=null;switch(e.key){case"Enter":p(e);break;case"ArrowRight":{const t=c.indexOf(e.currentTarget)+1;r=c[t]??c[0];break}case"ArrowLeft":{const t=c.indexOf(e.currentTarget)-1;r=c[t]??c[c.length-1];break}}null==(t=r)||t.focus()};return a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,u.Z)("tabs",{"tabs--block":r},t)},i.map((e=>{let{value:t,label:r,attributes:l}=e;return a.createElement("li",(0,n.Z)({role:"tab",tabIndex:o===t?0:-1,"aria-selected":o===t,key:t,ref:e=>c.push(e),onKeyDown:f,onClick:p},l,{className:(0,u.Z)("tabs__item",h,null==l?void 0:l.className,{"tabs__item--active":o===t})}),r??t)})))}function E(e){let{lazy:t,children:r,selectedValue:n}=e;const u=(Array.isArray(r)?r:[r]).filter(Boolean);if(t){const e=u.find((e=>e.props.value===n));return e?(0,a.cloneElement)(e,{className:"margin-top--md"}):null}return a.createElement("div",{className:"margin-top--md"},u.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==n}))))}function w(e){const t=b(e);return a.createElement("div",{className:(0,u.Z)("tabs-container",y)},a.createElement(g,(0,n.Z)({},e,t)),a.createElement(E,(0,n.Z)({},e,t)))}function k(e){const t=(0,v.Z)();return a.createElement(w,(0,n.Z)({key:String(t)},e))}},1446:(e,t,r)=>{function n(e,t,r){return void 0===r&&(r="."),e.split(r).reduce(((e,t)=>e&&e[t]),t)}r.d(t,{D:()=>n})},4200:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>b,contentTitle:()=>f,default:()=>h,frontMatter:()=>p,metadata:()=>m,toc:()=>v});var n=r(3117),a=r(7294),u=r(3905),l=r(8084),o=r(4866),s=r(5162),i=r(814),c=r(1446);const d=()=>{const{workflows:e}=(0,l.eZ)("workflow-doc-plugin"),t=(0,c.D)("bsdd.acheminementDirect",e).steps[0];return a.createElement(o.Z,{defaultValue:"bsdd",values:[{label:"D\xe9chets dangereux",value:"bsdd"}]},a.createElement(s.Z,{value:"bsdd"},a.createElement("p",null,"Requ\xeate \xe0 utiliser dans le cadre en haut \xe0 gauche du playground"),a.createElement(i.Z,{className:"graphql"},t.mutation),a.createElement("p",null,'Variables \xe0 ajouter dans l\'onglet "Query Variables" du playground en rempla\xe7ant SIRET_PRODUCTEUR, SIRET_TRAITEUR et SIRET_TRANSPORTEUR. Au moins un de ces n\xb0SIRET doit correspondre \xe0 un \xe9tablissement dont vous faites partie.'),a.createElement(i.Z,{className:"json"},t.variables)))},p={title:"Cr\xe9er votre premier BSD"},f=void 0,m={unversionedId:"tutoriels/quickstart/first-bsd",id:"tutoriels/quickstart/first-bsd",title:"Cr\xe9er votre premier BSD",description:"",source:"@site/docs/tutoriels/quickstart/first-bsd.mdx",sourceDirName:"tutoriels/quickstart",slug:"/tutoriels/quickstart/first-bsd",permalink:"/tutoriels/quickstart/first-bsd",draft:!1,editUrl:"https://github.com/MTES-MCT/trackdechets/edit/dev/doc/docs/tutoriels/quickstart/first-bsd.mdx",tags:[],version:"current",frontMatter:{title:"Cr\xe9er votre premier BSD"},sidebar:"docs",previous:{title:"Effectuer votre premi\xe8re requ\xeate",permalink:"/tutoriels/quickstart/first-query"},next:{title:"Requ\xeater et filtrer les bordereaux Bsda, Bsdasri, Bsff et Bsvhu",permalink:"/tutoriels/courant/query-bordereaux"}},b={},v=[],y={toc:v};function h(e){let{components:t,...r}=e;return(0,u.kt)("wrapper",(0,n.Z)({},y,r,{components:t,mdxType:"MDXLayout"}),(0,u.kt)(d,{mdxType:"FirstBsd"}))}h.isMDXComponent=!0}}]);