"use strict";(self.webpackChunktrackdechets=self.webpackChunktrackdechets||[]).push([[2043],{5743:(e,s,n)=>{n.d(s,{A:()=>a});var t=n(6540),r=n(6294),i=n(4848);r.L.initialize({startOnLoad:!0});const a=function(e){var s=e.chart;return(0,t.useEffect)((function(){r.L.contentLoaded()}),[]),(0,i.jsx)("div",{className:"mermaid",children:s})}},5:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>u,contentTitle:()=>c,default:()=>o,frontMatter:()=>a,metadata:()=>f,toc:()=>d});var t=n(4848),r=n(8453),i=n(5743);const a={title:"BSFF"},c=void 0,f={id:"reference/statuts/bsff",title:"BSFF",description:"Au cours de son cycle de vie, le BSFF passe par diff\xe9rents statuts d\xe9crits ici.",source:"@site/docs/reference/statuts/bsff.mdx",sourceDirName:"reference/statuts",slug:"/reference/statuts/bsff",permalink:"/reference/statuts/bsff",draft:!1,unlisted:!1,editUrl:"https://github.com/MTES-MCT/trackdechets/edit/dev/doc/docs/reference/statuts/bsff.mdx",tags:[],version:"current",frontMatter:{title:"BSFF"},sidebar:"docs",previous:{title:"BSDD",permalink:"/reference/statuts/bsdd"},next:{title:"BSPAOH",permalink:"/reference/statuts/bspaoh"}},u={},d=[{value:"En cas de regroupement, reconditionnement ou r\xe9expedition",id:"en-cas-de-regroupement-reconditionnement-ou-r\xe9expedition",level:3}];function E(e){const s={a:"a",code:"code",h3:"h3",p:"p",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(s.p,{children:["Au cours de son cycle de vie, le BSFF passe par diff\xe9rents statuts d\xe9crits ",(0,t.jsx)(s.a,{href:"../api-reference/bsff/enums#bsffstatus",children:"ici"}),"."]}),"\n",(0,t.jsx)(s.p,{children:"Le diagramme ci dessous retrace le cycle de vie d'un BSFF dans Trackd\xe9chets :"}),"\n",(0,t.jsx)(i.A,{chart:'\ngraph TD\nAO(NO STATE) --\x3e|createDraftBsff| A\nAO(NO STATE) --\x3e|createBsff| B\nA --\x3e|"updateBsff (tous les champs)"| A\nB --\x3e|"updateBsff (tous les champs)"| B\nC--\x3e|"updateBsff (sauf champs sign\xe9s)"| C\nD--\x3e|"updateBsff (sauf champs sign\xe9s)"| D\nE--\x3e|"updateBsffPackaging"| E\nF--\x3e|"updateBsffPackaging"| F\nL--\x3e|"updateBsffPackaging"| L\nA["INITIAL (isDraft=true)"] --\x3e|publishBsff| B("INITIAL (isDraft=false)")\nB --\x3e|"signBsff (EMISSION / EMISSION_WITH_SECRET_CODE)"| C(SIGNED_BY_PRODUCER)\nC --\x3e|"signBsff (TRANSPORT)"| D(SENT)\nD --\x3e|"signBsff (RECEPTION)"| E(RECEIVED)\nE --\x3e|"signBsff (ACCEPTATION)"| F(ACCEPTED)\nE --\x3e|"signBsff (ACCEPTATION)"| J(REFUSED)\nE --\x3e|"signBsff (ACCEPTATION)"| L(PARTIALLY_REFUSED)\nF --\x3e|"signBsff (OPERATION)"| G(PROCESSED)\nF --\x3e|"signBsff (OPERATION)"| K(INTERMEDIATELY_PROCESSED)\nL --\x3e|"signBsff (OPERATION)"| G(PROCESSED)\nL --\x3e|"signBsff (OPERATION)"| K(INTERMEDIATELY_PROCESSED)\n'}),"\n",(0,t.jsx)(s.h3,{id:"en-cas-de-regroupement-reconditionnement-ou-r\xe9expedition",children:"En cas de regroupement, reconditionnement ou r\xe9expedition"}),"\n",(0,t.jsxs)(s.p,{children:["Un BSFF reste au statut ",(0,t.jsx)(s.code,{children:"INTERMEDIATELY_PROCESSED"})," tant que le contenu de l'ensemble de ses contenants n'ont pas\nsubi un traitement final ou un refus ult\xe9rieur."]}),"\n",(0,t.jsx)(i.A,{chart:'\ngraph TD\nK(INTERMEDIATELY_PROCESSED) --\x3e|"signBsff (OPERATION) sur un BSFF ult\xe9rieur"| G(PROCESSED)\nK --\x3e|"signBsff (ACCEPTATION) sur un BSFF ult\xe9rieur"| J(REFUSED)\n'})]})}function o(e={}){const{wrapper:s}={...(0,r.R)(),...e.components};return s?(0,t.jsx)(s,{...e,children:(0,t.jsx)(E,{...e})}):E(e)}}}]);