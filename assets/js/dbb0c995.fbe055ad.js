"use strict";(self.webpackChunktd_doc=self.webpackChunktd_doc||[]).push([[9215],{2577:(e,t,a)=>{a.d(t,{Z:()=>i});var n=a(7294),s=a(7273);s.Z.initialize({startOnLoad:!0});const i=e=>{let{chart:t}=e;return(0,n.useEffect)((()=>{s.Z.contentLoaded()}),[]),n.createElement("div",{className:"mermaid"},t)}},6002:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>u,contentTitle:()=>d,default:()=>c,frontMatter:()=>r,metadata:()=>l,toc:()=>o});var n=a(3117),s=(a(7294),a(3905)),i=a(2577);const r={title:"BSDASRI"},d=void 0,l={unversionedId:"reference/statuts/bsdasri",id:"reference/statuts/bsdasri",title:"BSDASRI",description:"Au cours de son cycle de vie, le BSDASRI peut passer par diff\xe9rents \xe9tats d\xe9crits ici.",source:"@site/docs/reference/statuts/bsdasri.mdx",sourceDirName:"reference/statuts",slug:"/reference/statuts/bsdasri",permalink:"/reference/statuts/bsdasri",draft:!1,editUrl:"https://github.com/MTES-MCT/trackdechets/edit/dev/doc/docs/reference/statuts/bsdasri.mdx",tags:[],version:"current",frontMatter:{title:"BSDASRI"},sidebar:"docs",previous:{title:"BSDA",permalink:"/reference/statuts/bsda"},next:{title:"BSDD",permalink:"/reference/statuts/bsdd"}},u={},o=[{value:"Bordereaux de synth\xe8se",id:"bordereaux-de-synth\xe8se",level:2}],p={toc:o};function c(e){let{components:t,...a}=e;return(0,s.kt)("wrapper",(0,n.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("p",null,"Au cours de son cycle de vie, le BSDASRI peut passer par diff\xe9rents \xe9tats d\xe9crits ",(0,s.kt)("a",{parentName:"p",href:"../api-reference/bsdasri/enums#bsdasristatus"},"ici"),"."),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"INITIAL")," (initial): C'est l'\xe9tat dans lequel le dasri est cr\xe9\xe9. ",(0,s.kt)("inlineCode",{parentName:"li"},"readableId")," est affect\xe9."),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"SIGNED_BY_PRODUCER")," (pr\xeat \xe0 \xeatre emport\xe9) : Dasri sign\xe9 par l'\xe9metteur"),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"SENT")," (envoy\xe9): DASRI en transit vers l'installation de destination, d'entreposage ou de reconditionnement"),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"RECEIVED")," (re\xe7u): DASRI re\xe7u sur l'installation de destination, d'entreposage ou de reconditionnement"),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"ACCEPTED")," (accept\xe9): DASRI accept\xe9 sur l'installation de destination, d'entreposage ou de reconditionnement"),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"PROCESSED")," (trait\xe9): DASRI dont l'op\xe9ration de traitement a \xe9t\xe9 effectu\xe9"),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"REFUSED")," (refus\xe9): DASRI refus\xe9, par le tranporteur ou le destinataire")),(0,s.kt)("p",null,"Le diagramme ci dessous retrace le cycle de vie d'un DASRI dans Trackd\xe9chets:"),(0,s.kt)(i.Z,{chart:'\ngraph TD\nAO(NO STATE) --\x3e|createDraftBsdasri| A\nAO(NO STATE) --\x3e|createBsdasri| B\nA --\x3e|"updateBsdasri (tous les champs)"| A\nB --\x3e|"updateBsdasri (tous les champs)"| B\nC--\x3e|"updateBsdasri (sauf champs sign\xe9s)"| C\nD--\x3e|"updateBsdasri (sauf champs sign\xe9s)"| D\nE--\x3e|"updateBsdasri (sauf champs sign\xe9s)"| E\nA["INITIAL (isDraft=true)"] --\x3e|publishBsdasri| B("INITIAL (isDraft=false)")\nB --\x3e|"signBsdasri (EMISSION / EMISSION_WITH_SECRET_CODE)"| C(SIGNED_BY_PRODUCER)\nB --\x3e|"signBsdasri (TRANSPORT) - si autoris\xe9 par \xe9metteur" | D(SENT)\nC --\x3e|"signBsdasri (TRANSPORT)"| D(SENT)\nD --\x3e|"signBsdasri (RECEPTION)"| E(RECEIVED)\nE --\x3e|"signBsdasri (OPERATION)"| F(PROCESSED)\nD --\x3e|"signBsdasri (TRANSPORT *)"| G(REFUSED)\nC --\x3e|"signBsdasri (RECEPTION *)"| G(REFUSED)\n',mdxType:"Mermaid"}),(0,s.kt)("p",null," ","*"," si champ acceptation correspondant est REFUSED"),(0,s.kt)("h2",{id:"bordereaux-de-synth\xe8se"},"Bordereaux de synth\xe8se"),(0,s.kt)("p",null,"Un dasri de synth\xe8se est cr\xe9\xe9 en statut ",(0,s.kt)("inlineCode",{parentName:"p"},"INITIAL"),", publi\xe9 (draft=false).\nLe transporteur \xe9tant consid\xe9r\xe9 comme le producteur du bsd, il n'y a pas de signature producteur,\nla signature ",(0,s.kt)("inlineCode",{parentName:"p"},"TRANSPORT")," permet de passer en statu `SENT``.\nUn dasri de synth\xe8se ne peut \xeatre refus\xe9."),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"INITIAL")," (initial): C'est l'\xe9tat dans lequel le dasri est cr\xe9\xe9. ",(0,s.kt)("inlineCode",{parentName:"li"},"readableId")," est affect\xe9."),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"SENT")," (envoy\xe9): DASRI en transit vers l'installation de destination, d'entreposage ou de reconditionnement"),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"RECEIVED")," (re\xe7u): DASRI re\xe7u sur l'installation de destination, d'entreposage ou de reconditionnement"),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"ACCEPTED")," (accept\xe9): DASRI accept\xe9 sur l'installation de destination, d'entreposage ou de reconditionnement"),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"PROCESSED")," (trait\xe9): DASRI dont l'op\xe9ration de traitement a \xe9t\xe9 effectu\xe9")),(0,s.kt)(i.Z,{chart:'\ngraph TD\nAO(NO STATE) --\x3e|createBsdasri| A\nA --\x3e|"updateBsdasri (tous les champs)"| A\nB --\x3e|"updateBsdasri (sauf champs sign\xe9s)"| B\nC--\x3e|"updateBsdasri (sauf champs sign\xe9s)"| C\nA["INITIAL (isDraft=false)"] --\x3e |"signBsdasri (TRANSPORT)" | B(SENT)\nB --\x3e|"signBsdasri (RECEPTION)"| C(RECEIVED)\nC--\x3e|"signBsdasri (OPERATION)"| D(PROCESSED)\n',mdxType:"Mermaid"}))}c.isMDXComponent=!0}}]);