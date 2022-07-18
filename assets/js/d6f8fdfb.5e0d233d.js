"use strict";(self.webpackChunktd_doc=self.webpackChunktd_doc||[]).push([[5061],{3905:function(e,n,t){t.d(n,{Zo:function(){return u},kt:function(){return m}});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=r.createContext({}),d=function(e){var n=r.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},u=function(e){var n=d(e.components);return r.createElement(l.Provider,{value:n},e.children)},c={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},p=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),p=d(t),m=a,g=p["".concat(l,".").concat(m)]||p[m]||c[m]||i;return t?r.createElement(g,s(s({ref:n},u),{},{components:t})):r.createElement(g,s({ref:n},u))}));function m(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var i=t.length,s=new Array(i);s[0]=p;var o={};for(var l in n)hasOwnProperty.call(n,l)&&(o[l]=n[l]);o.originalType=e,o.mdxType="string"==typeof e?e:a,s[1]=o;for(var d=2;d<i;d++)s[d]=t[d];return r.createElement.apply(null,s)}return r.createElement.apply(null,t)}p.displayName="MDXCreateElement"},9483:function(e,n,t){t.r(n),t.d(n,{assets:function(){return u},contentTitle:function(){return l},default:function(){return m},frontMatter:function(){return o},metadata:function(){return d},toc:function(){return c}});var r=t(7462),a=t(3366),i=(t(7294),t(3905)),s=["components"],o={title:"Exporter un registre"},l=void 0,d={unversionedId:"guides/registre",id:"guides/registre",title:"Exporter un registre",description:"L'arr\xeat\xe9 du 31 mai 2021 fixe le contenu des registres d\xe9chets, terres excav\xe9es et s\xe9diments mentionn\xe9s aux articles R. 541-43 et R. 541-43-1 du code de l'environnement. Trackd\xe9chets permet d'exporter facilement les donn\xe9es des bordereaux de suivi de d\xe9chets dangereux au format registre. Cette fonctionnalit\xe9 permet \xe9galement au registre \xe9lectronique national de r\xe9cup\xe9rer les donn\xe9es relatives \xe0 la tra\xe7abilit\xe9 des d\xe9chets dangereux directement.",source:"@site/docs/guides/registre.md",sourceDirName:"guides",slug:"/guides/registre",permalink:"/guides/registre",editUrl:"https://github.com/MTES-MCT/trackdechets/edit/dev/doc/docs/guides/registre.md",tags:[],version:"current",frontMatter:{title:"Exporter un registre"},sidebar:"docs",previous:{title:"Exporter un bordereau en pdf",permalink:"/guides/pdf"},next:{title:"Rechercher un \xe9tablissement partenaire par son n\xb0 SIRET pour les entreprises fran\xe7aises ou par son n\xb0TVA intracommunautaire pour les entreprises europ\xe9ennes.",permalink:"/guides/sirene"}},u={},c=[{value:"Export JSON",id:"export-json",level:2},{value:"Export CSV ou Excel",id:"export-csv-ou-excel",level:2}],p={toc:c};function m(e){var n=e.components,t=(0,a.Z)(e,s);return(0,i.kt)("wrapper",(0,r.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"L'",(0,i.kt)("a",{parentName:"p",href:"https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000043884563"},"arr\xeat\xe9 du 31 mai 2021")," fixe le contenu des registres d\xe9chets, terres excav\xe9es et s\xe9diments mentionn\xe9s aux articles R. 541-43 et R. 541-43-1 du code de l'environnement. Trackd\xe9chets permet d'exporter facilement les donn\xe9es des bordereaux de suivi de d\xe9chets dangereux au format registre. Cette fonctionnalit\xe9 permet \xe9galement au registre \xe9lectronique national de r\xe9cup\xe9rer les donn\xe9es relatives \xe0 la tra\xe7abilit\xe9 des d\xe9chets dangereux directement."),(0,i.kt)("h2",{id:"export-json"},"Export JSON"),(0,i.kt)("p",null,"Les ",(0,i.kt)("inlineCode",{parentName:"p"},"queries")," permettant d'exporter les donn\xe9es registre sont les suivantes :"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"../reference/api-reference/registre/queries#incomingwastes"},(0,i.kt)("inlineCode",{parentName:"a"},"incomingWastes"))," : registre de d\xe9chets entrants"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"../reference/api-reference/registre/queries#outgoingwastes"},(0,i.kt)("inlineCode",{parentName:"a"},"outgoingWastes"))," : registre de d\xe9chets sortants"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"../reference/api-reference/registre/queries#transportedwastes"},(0,i.kt)("inlineCode",{parentName:"a"},"transporteWastes")),": registre de d\xe9chets transport\xe9s"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"../reference/api-reference/registre/queries#managedwastes"},(0,i.kt)("inlineCode",{parentName:"a"},"managedWastes"))," : registre de d\xe9chets g\xe9r\xe9s (courtage ou n\xe9goce)"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"../reference/api-reference/registre/queries#allwastes"},(0,i.kt)("inlineCode",{parentName:"a"},"allWastes"))," : registre permettant d'exporter toutes les donn\xe9es de bordereaux pour un ou plusieurs \xe9tablissements")),(0,i.kt)("p",null,"Des filtres avanc\xe9s peuvent \xeatre appliqu\xe9s pour restreindre les donn\xe9es export\xe9s par code d\xe9chet, quantit\xe9, date d'exp\xe9dition, etc, et son d\xe9crits dans l'objet ",(0,i.kt)("a",{parentName:"p",href:"../reference/api-reference/registre/inputObjects#wasteregisterwhere"},"RegisterWhere"),"."),(0,i.kt)("p",null,"Exemple de requ\xeate :"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-graphql"},"query {\n  outgoingWastes(sirets: [\"53070853600038\"], first: 10) {\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        # La date de l'exp\xe9dition du d\xe9chet\n        transporterTakenOverAt\n        #La d\xe9nomination usuelle du d\xe9chet\n        wasteDescription\n        #Le code du d\xe9chet sortant au regard de l'article R. 541-7 du code de l'environnement\n        wasteCode\n        #S'il s'agit, de d\xe9chets POP au sens de l'article R. 541-8 du code de l'environnement\"\n        pop\n        # Le num\xe9ro du ou des bordereaux de suivi de d\xe9chets mentionn\xe9s aux articles R. 541-45 du code de l'environnement et R. 1335-4 du code de la sant\xe9 publique\n        id\n        #La quantit\xe9 de d\xe9chet sortant en tonne\n        weight\n        #L'adresse de l'\xe9tablissement\n        emitterCompanyAddress\n        #L'adresse de prise en charge lorsqu'elle se distingue de l'adresse de l'\xe9tablissement\n        emitterPickupsiteAddress\n        #La raison sociale du producteur initial du d\xe9chet - optionnel lorsque les d\xe9chets proviennet de plusieurs producteurs\n        initialEmitterCompanyName\n        #Le num\xe9ro SIRET du producteur initial du d\xe9chet - optionnel lorsque les d\xe9chets proviennet de plusieurs producteurs\n        initialEmitterCompanySiret\n        #L'adresse du producteur initial du d\xe9chet - optionnel lorsque les d\xe9chets proviennet de plusieurs producteurs\n        initialEmitterCompanyAddress\n        #Lorsque les d\xe9chets apport\xe9s proviennent de plusieurs producteurs, le ou les codes postaux de la commune de collecte des d\xe9chets\n        initialEmitterPostalCodes\n        #la raison sociale de l'\xe9co-organisme si le d\xe9chet est pris en charge par un \xe9co-organisme mis en place dans\n        #le cadre d'une fili\xe8re \xe0 responsabilit\xe9 \xe9largie du producteur\n        ecoOrganismeName\n        #Le N\xb0SIREN l'\xe9co-organisme si le d\xe9chet est pris en charge par un \xe9co-organisme mis en place dans\n        #le cadre d'une fili\xe8re \xe0 responsabilit\xe9 \xe9largie du producteur\n        ecoOrganismeSiren\n        #La raison sociale du n\xe9gociant si le d\xe9chet est g\xe9r\xe9 par un n\xe9gociant\n        traderCompanyName\n        #Le N\xb0SIRET du n\xe9gociant si le d\xe9chet est g\xe9r\xe9 par un n\xe9gociant\n        traderCompanySiret\n        #Le num\xe9ro de r\xe9c\xe9piss\xe9 du n\xe9gociant mentionn\xe9 \xe0 l'article R. 541-56 du code de l'environnement si le d\xe9chet est g\xe9r\xe9 par un n\xe9gociant\n        traderRecepisseNumber\n        #La raison sociale du courtier si le d\xe9chet est g\xe9r\xe9 par un courtier\n        brokerCompanyName\n        #Le N\xb0SIRET du courtier si le d\xe9chet est g\xe9r\xe9 par un courtier\"\n        brokerCompanySiret\n        #Le num\xe9ro de r\xe9c\xe9piss\xe9 du courtier mentionn\xe9 \xe0 l'article R. 541-56 du code de l'environnement si le d\xe9chet est g\xe9r\xe9 par un courtier\n        brokerRecepisseNumber\n        #La raison sociale du transporteur\n        transporterCompanyName\n        #Le N\xb0SIRET du transporteur\n        transporterCompanySiret\n        #Le num\xe9ro de r\xe9c\xe9piss\xe9 du trasnporteur mentionn\xe9 \xe0 l'article R. 541-53 du code de l'environnement\n        transporterRecepisseNumber\n        #L'adresse du transporteur\"\n        transporterCompanyAddress\n        #La raison sociale de l'\xe9tablissement vers lequel le d\xe9chet est exp\xe9di\xe9\n        destinationCompanyName\n        #Le N\xb0SIRET de l'\xe9tablissement vers lequel le d\xe9chet est exp\xe9di\xe9\"\n        destinationCompanySiret\n        #L'adresse de l'\xe9tablissement vers lequel le d\xe9chet est exp\xe9di\xe9\"\n        destinationCompanyAddress\n        #Le code du traitement qui va \xeatre op\xe9r\xe9 dans l'installation vers laquelle le d\xe9chet est exp\xe9di\xe9, selon les annexes I et II de la directive 2008/98/CE relative aux d\xe9chets ;\n        destinationPlannedOperationCode\n      }\n    }\n  }\n}\n")),(0,i.kt)("p",null,"Les r\xe9sultats sont pagin\xe9s. Pour r\xe9cup\xe9rer tous les d\xe9chets :"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"obtenir une premi\xe8re page avec ",(0,i.kt)("inlineCode",{parentName:"li"},"first=50"),"."),(0,i.kt)("li",{parentName:"ul"},"si ",(0,i.kt)("inlineCode",{parentName:"li"},"pageInfo { hasNextPage }")," est ",(0,i.kt)("inlineCode",{parentName:"li"},"true"),", refaire une requ\xeate avec ",(0,i.kt)("inlineCode",{parentName:"li"},"first=50")," et ",(0,i.kt)("inlineCode",{parentName:"li"},"after=<cursor>")," o\xf9 ",(0,i.kt)("inlineCode",{parentName:"li"},"cursor")," est \xe9gal \xe0 ",(0,i.kt)("inlineCode",{parentName:"li"},"pageInfo { endCursor }")," de la requ\xeate pr\xe9c\xe9dente."),(0,i.kt)("li",{parentName:"ul"},"continuer ainsi tant que ",(0,i.kt)("inlineCode",{parentName:"li"},"pageInfo { hasNextPage }")," est ",(0,i.kt)("inlineCode",{parentName:"li"},"true"),"."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"totalCount")," vous donne le nombre total de d\xe9chets \xe0 r\xe9cup\xe9rer \xe0 tout moment.")),(0,i.kt)("h2",{id:"export-csv-ou-excel"},"Export CSV ou Excel"),(0,i.kt)("p",null,"Les donn\xe9es peuvent \xe9galement \xeatre t\xe9l\xe9charg\xe9es au format ",(0,i.kt)("inlineCode",{parentName:"p"},"CSV")," ou Excel (",(0,i.kt)("inlineCode",{parentName:"p"},"XLXS"),")"),(0,i.kt)("p",null,"Pour ce faire vous devez utiliser la query ",(0,i.kt)("a",{parentName:"p",href:"../reference/api-reference/registre/queries#wastesdownloadlink"},(0,i.kt)("inlineCode",{parentName:"a"},"wastesDownloadLink"))," de la fa\xe7on suivante"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-graphql"},'query {\n  wastesDownloadLink(\n    fileType: CSV\n    registerType: OUTGOING\n    sirets: ["53070853600038"]\n  ) {\n    downloadLink\n  }\n}\n')),(0,i.kt)("p",null,"Vous recevrez en r\xe9ponse un lien de t\xe9l\xe9chargement \xe0 utiliser pour t\xe9l\xe9charger le fichier."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "data": {\n    "wastesDownloadLink": {\n      "downloadLink": "http://api.trackdechets.beta.gouv.fr/download?token=xxxx"\n    }\n  }\n}\n')),(0,i.kt)("p",null,"Ce lien n'est valide que 10 secondes, il est donc n\xe9cessaire d'enchainer dans votre code client l'appel \xe0 la query GraphQL ",(0,i.kt)("inlineCode",{parentName:"p"},"wastesDownloadLink")," puis une requ\xeate ",(0,i.kt)("inlineCode",{parentName:"p"},"GET")," classique sur le lien de t\xe9l\xe9chargement."))}m.isMDXComponent=!0}}]);