(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{114:function(e,t,a){"use strict";a.d(t,"a",function(){return s}),a.d(t,"b",function(){return l});let n=JSON.parse(localStorage.getItem("nimus-cards-settings"))||{studyMode:{value:"standard"},randomize:{value:!0},cardCount:{value:""},timeoutDuration:{value:""}};function s(){return n}function l(e){n=Object.assign({},n,e),localStorage.setItem("nimus-cards-settings",JSON.stringify(n))}},152:function(e,t,a){"use strict";a.r(t),a.d(t,"default",function(){return i});var n=a(0),s=a.n(n),l=a(114);function i(){const e=Object(n.useState)(Object(l.a)()),t=e[0],a=e[1];return Object(n.useEffect)(()=>{Object(l.b)(t)},[t]),s.a.createElement("div",{onChange:function(e){let n=e.target;const s=n.getAttribute("data-name"),l=t[s];switch(n.type){case"checkbox":l.value=n.checked;break;case"text":l.value=n.validity.valid&&parseInt(n.value,10)||0;break;case"radio":l.value=n.getAttribute("data-study-mode")}a(Object.assign({},t,{[s]:l}))}},s.a.createElement("div",{className:"settings-item"},s.a.createElement("div",{className:"settings-item-title"},"Study mode"),s.a.createElement("label",{className:"settings-label settings-radio-label"},s.a.createElement("input",{type:"radio",name:"study-mode",className:"radio-input","data-name":"studyMode","data-study-mode":"standard",defaultChecked:"standard"===t.studyMode.value}),s.a.createElement("div",{className:"radio settings-radio"}),s.a.createElement("span",null,"Standard")),s.a.createElement("label",{className:"settings-label settings-radio-label"},s.a.createElement("input",{type:"radio",name:"study-mode",className:"radio-input","data-name":"studyMode","data-study-mode":"leitner",defaultChecked:"leitner"===t.studyMode.value}),s.a.createElement("div",{className:"radio settings-radio"}),s.a.createElement("span",null,"Leitner system"))),s.a.createElement("label",{className:"settings-item settings-label"},s.a.createElement("input",{type:"checkbox",className:"checkbox-input","data-name":"randomize",defaultChecked:t.randomize.value}),s.a.createElement("div",{className:"checkbox settings-checkbox"},s.a.createElement("div",{className:"checkbox-tick"})),s.a.createElement("span",null,"Randomize cards")),s.a.createElement("label",{className:"settings-item"},s.a.createElement("span",null,"Use"),s.a.createElement("input",{type:"text",className:"input settings-input","data-name":"cardCount",pattern:"^[0-9]+$",defaultValue:t.cardCount.value}),s.a.createElement("span",null,"cards per study session"),s.a.createElement("div",{className:"settings-message"},"Please provide a valid whole number.")),s.a.createElement("label",{className:"settings-item"},s.a.createElement("span",null,"Reveal answer after"),s.a.createElement("input",{type:"text",className:"input settings-input","data-name":"timeoutDuration",pattern:"^0*|0*([5-9][0-9]*|[1-9]+[0-9]+)$",defaultValue:t.timeoutDuration.value}),s.a.createElement("span",null,"seconds"),s.a.createElement("div",{className:"settings-message"},"Please provide a valid whole number.",s.a.createElement("br",null)," Minimal accepted value is 5 seconds.")))}}}]);