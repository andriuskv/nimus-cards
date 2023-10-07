"use strict";(globalThis.webpackChunknimus_cards=globalThis.webpackChunknimus_cards||[]).push([[818],{818:(e,t,a)=>{a.r(t),a.d(t,{default:()=>x});var s=a(294),n=a(250),c=a(620),i=a(446),l=a(461),r=a(291),o=a(893);const d=function({addAttachment:e,errorMessage:t}){const[a,n]=(0,s.useState)(""),[c,i]=(0,s.useState)("image");function r(e){n(e),setTimeout((()=>{n("")}),3200)}function d(){r(`URL does not contain valid ${c} file.`)}return(0,o.jsxs)("div",{className:"upload-panel",children:[(0,o.jsx)("div",{className:"upload-type-selection",children:["image","audio","video"].map(((e,t)=>(0,o.jsxs)("button",{className:"btn btn-icon-text upload-type-selection-btn"+(c===e?" active":""),onClick:()=>i(e),children:[(0,o.jsx)(l.Z,{name:`${e}-file`}),(0,o.jsx)("span",{children:e})]},t)))}),(0,o.jsxs)("div",{className:"upload-panel-content",children:[(0,o.jsxs)("label",{className:"btn upload-panel-import-input-container",children:[(0,o.jsx)("span",{children:"Select File"}),(0,o.jsx)("input",{type:"file",className:"sr-only",onChange:function({target:t}){const[a]=t.files;t.value="",a.type.split("/")[0]!==c?r(`Selected file is not ${"v"===c[0]?"a":"an"} ${c} file.`):e({blob:a,type:c})}})]}),(0,o.jsx)("div",{className:"upload-panel-item-separator",children:"OR"}),a&&(0,o.jsx)("div",{className:"upload-panel-message",children:a}),(0,o.jsxs)("form",{onSubmit:function(t){const a=t.target.elements.url.value.trim();if(t.preventDefault(),a){if("image"===c){const t=new Image;t.onload=()=>{e({url:a,type:c})},t.onerror=e=>{d(),console.log(e)},t.src=a}else if("audio"===c){const t=new Audio(a);t.onloadedmetadata=()=>{e({url:a,type:c})},t.onerror=e=>{d(),console.log(e)}}else if("video"===c){const t=document.createElement("video");t.crossOrigin="anonymous",t.onloadedmetadata=()=>{e({url:a,type:c})},t.onerror=e=>{d(),console.log(e)},t.src=a}}else r("Please specify valid url.")},className:"upload-panel-form",children:[(0,o.jsx)("input",{type:"text",name:"url",className:"input upload-panel-form-input",placeholder:"Enter URL..."}),(0,o.jsx)("button",{className:"btn upload-panel-form-btn",children:"Upload"})]})]}),t&&(0,o.jsx)("div",{className:"create-side-message",children:t})]})},u=(0,s.memo)((({attachment:e})=>{const{blob:t,url:a,type:s}=e,n=t?URL.createObjectURL(t):a;return"image"===s?(0,o.jsx)("img",{src:n,alt:"",className:"create-side-image"}):"audio"===s?(0,o.jsx)("audio",{src:n,className:"create-side-audio",controls:!0}):"video"===s?(0,o.jsx)("video",{src:n,className:"create-side-video",crossOrigin:"anonymous",controls:!0}):null}));const m=function({side:e,addAttachment:t,removeAttachment:a,updateAttachmentDescription:n,handleChange:c}){const{text:i,attachment:r}=e,[m,p]=(0,s.useState)(!i&&r?"attachment":"text");function x({target:e}){p(e.value)}return(0,o.jsxs)("div",{className:"create-card-side",children:[(0,o.jsx)("div",{className:"create-side-toolbar",children:(0,o.jsxs)("ul",{className:"create-side-types",children:[(0,o.jsx)("li",{className:"create-side-type",children:(0,o.jsxs)("label",{children:[(0,o.jsx)("input",{type:"radio",className:"sr-only create-type-radio",value:"text",checked:"text"===m,onChange:x}),(0,o.jsx)(l.Z,{name:"text",title:"Text",className:"create-option-type-icon"})]})}),(0,o.jsx)("li",{className:"create-side-type",children:(0,o.jsxs)("label",{children:[(0,o.jsx)("input",{type:"radio",className:"sr-only create-type-radio",value:"attachment",checked:"attachment"===m,onChange:x}),(0,o.jsx)(l.Z,{name:"attachment",title:"Attachment",className:"create-option-type-icon"})]})})]})}),"text"===m?(0,o.jsxs)("div",{className:"create-side-content create-front-side-content",children:[(0,o.jsx)("textarea",{className:"input create-side-text-input",value:i,onChange:c}),function(){const{error:t}=e;return t?.attachmentMessage?(0,o.jsx)("div",{className:"create-side-message",children:t.attachmentMessage}):t?.textMessage?(0,o.jsx)("div",{className:"create-side-message",children:t.textMessage}):null}()]}):(0,o.jsx)("div",{className:"create-side-content create-front-side-content",children:r?(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)("div",{className:"create-side-panel",children:[(0,o.jsx)("button",{type:"button",className:"btn btn-icon create-side-panel-btn",onClick:a,title:"Remove attachment",children:(0,o.jsx)(l.Z,{name:"remove"})}),(0,o.jsx)(u,{attachment:r}),e.error?.attachmentMessage&&(0,o.jsx)("div",{className:"create-side-attachment-message",children:e.error.attachmentMessage})]}),(0,o.jsx)("input",{type:"text",className:"input create-side-attachment-input",placeholder:"Describe attachment",defaultValue:r.description,onChange:n})]}):(0,o.jsx)(d,{addAttachment:t,errorMessage:e.error?.textMessage})})]})};const p=function({side:e,updateCardBack:t}){const{type:a,textOptions:s,multiOptions:n,exactOptions:i}=e;function r({target:e}){n.layout=e.value,t({multiOptions:n})}function d({target:e}){const{name:a,value:s}=e,c=n.options[a];s!==c.value&&(c.value=s,t({multiOptions:n}))}function u({target:e}){const{name:a,value:s,checked:n}=e;"caseSensitive"===a?i.caseSensitive=n:i.value=s,t({exactOptions:i})}function m(){return(0,o.jsx)("textarea",{className:"input create-side-text-input",value:s.value,onChange:a=>function({target:a}){const{value:n}=a;n!==e.value&&(s.value=n,t({textOptions:s}))}(a)})}function p(){return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)("div",{className:"create-multi-layout",children:[(0,o.jsx)("div",{className:"create-multi-layout-title",children:"Layout"}),(0,o.jsxs)("div",{onInput:r,className:"create-multi-layout-items",children:[(0,o.jsxs)("label",{className:"create-multi-layout-item",children:[(0,o.jsx)("input",{type:"radio",className:"sr-only create-type-radio",name:"multi-select",value:"short",defaultChecked:"short"===n.layout}),(0,o.jsx)(l.Z,{name:"grid",className:"create-option-type-icon"})]}),(0,o.jsxs)("label",{className:"create-multi-layout-item",children:[(0,o.jsx)("input",{type:"radio",className:"sr-only create-type-radio",name:"multi-select",value:"medium",defaultChecked:"medium"===n.layout}),(0,o.jsx)(l.Z,{name:"list-2-col",className:"create-option-type-icon"})]}),(0,o.jsxs)("label",{className:"create-multi-layout-item",children:[(0,o.jsx)("input",{type:"radio",className:"sr-only create-type-radio",name:"multi-select",value:"long",defaultChecked:"long"===n.layout}),(0,o.jsx)(l.Z,{name:"menu",className:"create-option-type-icon"})]})]})]}),(0,o.jsx)("ul",{children:n.options.map((({id:e,value:a},s)=>(0,o.jsxs)("li",{className:"create-option",children:[(0,o.jsxs)("label",{children:[(0,o.jsx)("input",{type:"radio",className:"sr-only radio-input",name:"multi-option",checked:n.correctId===e,onChange:()=>function(e){n.correctId=e,t({multiOptions:n})}(e)}),(0,o.jsx)("div",{className:"radio",title:"Mark answer as correct"})]}),(0,o.jsx)("input",{type:"text",className:"input create-option-input",name:s,defaultValue:a,autoComplete:"off",onChange:d}),(0,o.jsx)("button",{className:"btn btn-icon",title:"Remove answer",onClick:()=>{return e=s,n.options.splice(e,1),void t({multiOptions:n});var e},children:(0,o.jsx)(l.Z,{name:"remove"})})]},e)))})]})}return(0,o.jsxs)("div",{className:"create-card-side",children:[(0,o.jsxs)("div",{className:"create-side-toolbar",children:[(0,o.jsxs)("ul",{className:"create-side-types",onChange:function({target:e}){t({type:e.value})},children:[(0,o.jsx)("li",{className:"create-side-type",children:(0,o.jsxs)("label",{children:[(0,o.jsx)("input",{type:"radio",className:"sr-only create-type-radio",name:"type-select",value:"text",defaultChecked:"text"===a}),(0,o.jsx)(l.Z,{name:"text",title:"Text",className:"create-option-type-icon"})]})}),(0,o.jsx)("li",{className:"create-side-type",children:(0,o.jsxs)("label",{children:[(0,o.jsx)("input",{type:"radio",className:"sr-only create-type-radio",name:"type-select",value:"multi",defaultChecked:"multi"===a}),(0,o.jsx)(l.Z,{name:"list-checkbox",title:"Multiple choice",className:"create-option-type-icon"})]})}),(0,o.jsx)("li",{className:"create-side-type",children:(0,o.jsxs)("label",{children:[(0,o.jsx)("input",{type:"radio",className:"sr-only create-type-radio",name:"type-select",value:"exact",defaultChecked:"exact"===a}),(0,o.jsx)(l.Z,{name:"text-short",title:"Exact answer",className:"create-option-type-icon"})]})})]}),"multi"===a&&(0,o.jsx)("button",{className:"btn btn-icon",onClick:function(){n.options.length<8&&(n.options.push({id:(0,c.zO)()}),t({multiOptions:n}))},title:"Add option",disabled:n.options.length>=8,children:(0,o.jsx)(l.Z,{name:"add-list-item"})})]}),(0,o.jsxs)("div",{className:"create-side-content",children:[function(e){return"text"===e?m():"multi"===e?p():"exact"===e?(0,o.jsxs)("div",{onChange:u,children:[(0,o.jsxs)("label",{className:"create-exact-input-container",children:[(0,o.jsx)("div",{className:"create-exact-input-title",children:"Provide an answer:"}),(0,o.jsx)("input",{type:"text",className:"input create-exact-input",name:"input",autoComplete:"off",defaultValue:i.value})]}),(0,o.jsxs)("label",{className:"checkbox-container create-exact-checkbox-container",children:[(0,o.jsx)("input",{type:"checkbox",className:"sr-only checkbox-input",name:"caseSensitive",defaultChecked:i.caseSensitive}),(0,o.jsx)("div",{className:"checkbox",children:(0,o.jsx)("div",{className:"checkbox-tick"})}),(0,o.jsx)("span",{className:"checkbox-label",children:"Case sensitive"})]})]}):null}(a),e.error?.message&&(0,o.jsx)("div",{className:"create-side-message",children:e.error.message})]})]})};const x=function(){const e=(0,n.TH)(),t=(0,n.s0)(),a=(0,n.UO)(),[d,u]=(0,s.useState)(null),[x,h]=(0,s.useState)([]);let f=0;function v(){return{id:(0,c.zO)(),front:{text:""},back:{type:"text",textOptions:{value:""},multiOptions:{correctId:"",layout:"short",options:[{id:(0,c.zO)()},{id:(0,c.zO)()}]},exactOptions:{caseSensitive:!1,value:""}},notes:{value:""},score:{streak:0,right:0,wrong:0,total:0}}}function j(e){return e.map((e=>{const{back:t}=v();return e.back={...t,...e.back,[`${e.back.type}Options`]:e.back.typeOptions},delete e.back.typeOptions,e}))}function b(e,t){const a=e+t,s=d.cards;[s[e],s[a]]=[s[a],s[e]],u({...d})}function g({target:e}){const{name:t,value:a}=e;d[t]=a,"title"===t&&d.missingTitle&&delete d.missingTitle,u({...d})}function N(e){return e.attachment?!!e.attachment.description:!!e.text}function y(e){return{validOptionCount:e.options.reduce(((e,{value:t})=>(t&&(e+=1),e)),0),correctId:e.correctId}}function k(e){if("text"===e.type)return e.textOptions.value.length>0;if("exact"===e.type)return e.exactOptions.value.length>0;const{validOptionCount:t,correctId:a}=y(e.multiOptions);return t>1&&a}function C(e){d.title||(d.missingTitle=!0);const a=function(e){let t=0;for(const a of e){let e=0;if(a.valid=!1,a.invalid=!1,N(a.front))e+=1,delete a.front.error;else{a.front.error=a.front.error||{};const{text:e,attachment:t,error:s}=a.front;t&&!t.description?s.attachmentMessage="Please provide attachment description.":e||(s.textMessage="Please fill in the text field or provide an attachment.")}if(k(a.back))e+=1,delete a.back.error;else{a.back.error=a.back.error||{};const{type:e,textOptions:t,exactOptions:s,multiOptions:n,error:c}=a.back;if("text"!==e||t.value)if("exact"!==e||s.value){if("multi"===e){const{validOptionCount:e,correctId:t}=y(n);e<2?c.message="Please fill in at least 2 options.":t||(c.message="Please select correct option.")}}else c.message="Please provide an answer.";else c.message="Please fill in the text field."}2===e?(t+=1,a.valid=!0):a.invalid=!0}return d.globalMessage=t<2?"Please fill in at least 2 cards.":"",t===e.length}(d.cards);if(d.title&&a)if(d.cards=d.cards.map((e=>{const t={type:e.back.type,typeOptions:e.back[`${e.back.type}Options`]};return e.modified&&(delete e.score,delete e.level,delete e.nextReview),delete e.modified,delete e.invalid,delete e.valid,e.front.text&&(e.front.text=e.front.text.trim()),"multi"===t.type&&(t.typeOptions.options=e.back.multiOptions.options.filter((({value:e})=>e))),e.back=t,e})),"preview"===e)t(`/decks/${d.id}/preview`,{state:d});else{const e=Date.now();delete d.type,delete d.selectedCardIndex,d.createdAt?d.modifiedAt=e:d.createdAt=e,t("/decks"),(0,i.C2)(d)}else{const e=d.cards.findIndex((e=>!e.valid));e>=0&&(d.selectedCardIndex=e),u({...d})}}if((0,s.useEffect)((()=>{if(e.state){const t=e.state;t.cards=j(t.cards),u(t),(0,c.Dk)("edit"===t.type?`Editing ${t.title}`:"Create a new deck")}else"/decks/create"===e.pathname?(u({id:(0,c.zO)(),type:"create",title:"",description:"",selectedCardIndex:0,cards:[v(),v()]}),(0,c.Dk)("Create a new deck")):a.id&&(0,i.VC)(a.id).then((e=>{e?(e.type="edit",e.makingEdit=!0,e.selectedCardIndex=0,e.cards=j(e.cards),u(e),(0,c.Dk)(`Editing ${e.title}`)):u({error:!0})}))}),[]),(0,s.useEffect)((()=>(clearTimeout(f),x.length>0&&(f=setTimeout((()=>{h([])}),8e3)),()=>{clearTimeout(f)})),[x.length]),!d)return null;if(d.error)return(0,o.jsx)(r.Z,{});const O=d.selectedCardIndex,I=d.cards.length,w=d.cards[O];return(0,o.jsxs)("div",{className:"container max-width-limit",children:[(0,o.jsxs)("label",{className:"create-field",children:[(0,o.jsx)("div",{className:"create-field-title",children:"Title"}),(0,o.jsx)("input",{className:"input create-field-input",name:"title",value:d.title,onChange:g}),d.missingTitle&&(0,o.jsx)("div",{className:"create-field-input-message",children:"Please provide title for your deck."})]}),(0,o.jsxs)("label",{className:"create-field",children:[(0,o.jsx)("div",{className:"create-field-title",children:"Description"}),(0,o.jsx)("input",{className:"input create-field-input",name:"description",value:d.description,onChange:g})]}),(0,o.jsxs)("ul",{className:"create-card-select",children:[d.cards.map(((e,t)=>(0,o.jsx)("li",{className:"create-card-select-item",children:(0,o.jsx)("button",{className:`btn btn-text create-card-select-btn${t===d.selectedCardIndex?" active":""}${e.invalid?" invalid":""}${e.valid?" valid":""}`,onClick:()=>function(e){e!==d.selectedCardIndex&&u({...d,selectedCardIndex:e})}(t),children:t+1})},t))),(0,o.jsx)("li",{className:"create-card-select-item",children:(0,o.jsx)("button",{onClick:function(){const e=d.cards[d.cards.length-1],t=v();t.back.type=e.back.type,"multi"===t.back.type?t.back.multiOptions.layout=e.back.multiOptions.layout:"exact"===t.back.type&&(t.back.exactOptions.caseSensitive=e.back.exactOptions.caseSensitive),u({...d,cards:[...d.cards,t]})},className:"btn btn-icon create-card-select-btn",title:"Add Card",children:(0,o.jsx)(l.Z,{name:"plus"})})})]}),(0,o.jsxs)("div",{className:"create-card",children:[(0,o.jsxs)("div",{className:"create-card-header",children:[(0,o.jsxs)("div",{className:"create-card-index-container",children:[(0,o.jsx)("button",{className:"btn btn-icon create-card-header-item",onClick:()=>b(O,-1),title:"Swap with the left card",disabled:0===O,children:(0,o.jsx)(l.Z,{name:"chevron-left"})}),(0,o.jsx)("div",{className:"create-card-index",children:O+1}),(0,o.jsx)("button",{className:"btn btn-icon create-card-header-item",onClick:()=>b(O,1),title:"Swap with the right card",disabled:O===I-1,children:(0,o.jsx)(l.Z,{name:"chevron-right"})})]}),(0,o.jsx)("button",{className:"btn btn-icon",title:"Clone card",onClick:()=>function(e){const t=structuredClone(d.cards[e]);t.id=(0,c.zO)(),d.selectedCardIndex=e,d.cards.splice(e,0,t),u({...d})}(O),children:(0,o.jsx)(l.Z,{name:"clone"})}),I>1&&(0,o.jsx)("button",{className:"btn btn-icon create-card-remove-card-btn",title:"Remove card",onClick:()=>function(e){const t=d.cards[e];(N(t.front)||k(t.back)||t.notes.value)&&h([...x,t]),d.selectedCardIndex=e>0?e-1:0,d.cards.splice(e,1),u({...d})}(O),children:(0,o.jsx)(l.Z,{name:"remove"})})]}),(0,o.jsxs)("div",{className:"create-card-main",children:[(0,o.jsx)(m,{side:w.front,addAttachment:function(e){const t=d.cards[d.selectedCardIndex];t.modified=!0,t.front.attachment=e,delete t.front.error,u({...d})},removeAttachment:function(){const e=d.cards[d.selectedCardIndex];e.modified=!0,delete e.front.attachment,delete e.front.error,u({...d})},updateAttachmentDescription:function({target:e}){const t=d.cards[d.selectedCardIndex];t.modified=!0,t.front.attachment.description=e.value,t.front.error?.attachmentMessage&&delete t.front.error,u({...d})},handleChange:function({target:e}){const{value:t}=e,a=d.cards[d.selectedCardIndex];t!==a.front.text&&(a.front.text=t,a.modified=!0,a.front.error?.textMessage&&delete a.front.error.textMessage,u({...d}))}}),(0,o.jsx)(p,{side:w.back,updateCardBack:function(e){const t=d.cards[d.selectedCardIndex];t.modified=!0,t.back={...t.back,...e},delete t.back.error,u({...d})}})]},w.id),(0,o.jsx)("div",{className:"create-card-notes-container",children:(0,o.jsx)("textarea",{className:"input create-card-notes-input",placeholder:"Notes...",value:w.notes.value,onChange:function({target:e}){const{value:t}=e,a=d.cards[d.selectedCardIndex];t!==a.notes.value&&(a.notes.value=t,u({...d}))}})})]}),x.length>0&&(0,o.jsxs)("div",{className:"create-undo-dialog",children:[(0,o.jsxs)("span",{children:["Removed ",x.length," card",x.length>1?"s":""]}),(0,o.jsx)("button",{className:"btn btn-text create-dialog-undo-btn",onClick:function(){h([]),u({...d,cards:d.cards.concat(x)})},children:"UNDO"})]}),(0,o.jsxs)("div",{className:"create-footer",children:[d.globalMessage&&(0,o.jsx)("span",{className:"create-message",children:d.globalMessage}),(0,o.jsx)("button",{className:"btn create-footer-btn",onClick:function(){C("preview")},children:"Preview"}),(0,o.jsx)("button",{className:"btn create-footer-btn",onClick:C,children:d.makingEdit?"Update":"Create"})]})]})}},446:(e,t,a)=>{a.d(t,{$P:()=>l,C2:()=>i,GT:()=>n,VC:()=>c});const s=new(a(520).ZP)("nimus-cards");function n(){return s.decks.toArray().then(r).catch((e=>{console.log(e)}))}function c(e){return s.decks.get(e)}function i(e){s.decks.put(e).catch((e=>{console.log(e)}))}function l(e){s.decks.delete(e).catch((e=>{console.log(e)}))}function r(e){return e.sort(((e,t)=>e.createdAt<t.createdAt?1:e.createdAt>t.createdAt?-1:0))}s.version(1).stores({decks:"id"})}}]);