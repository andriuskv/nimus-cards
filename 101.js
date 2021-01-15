(globalThis.webpackChunknimus_cards=globalThis.webpackChunknimus_cards||[]).push([[101],{8997:(e,t,s)=>{"use strict";s.d(t,{Z:()=>n});var a=s(7294);const n=function({className:e,hide:t,children:s}){const n=(0,a.useCallback)((function({key:e}){"Escape"===e&&t()}),[]);return(0,a.useEffect)((()=>(window.addEventListener("keydown",n),()=>{window.removeEventListener("keydown",n)})),[]),a.createElement("div",{className:"modal-mask",onClick:function({target:e,currentTarget:s}){e===s&&t()}},a.createElement("div",{className:"modal"+(e?` ${e}`:"")},s))}},9101:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>f});s(285);var a=s(7294),n=s(5977),c=s(5620),r=s(446),l=s(3255),i=s(1461),o=s(8997),d=s(2291);function m({score:e,name:t,className:s}){const n={"--width":(e.total?e[t]/e.total*100:50)+"%"};return a.createElement("div",{className:`score-bar score-${t}-bar${s?` ${s}`:""}`,style:n},e[t])}function u({score:e}){return a.createElement("div",{className:"study-score"},a.createElement("div",{className:"study-score-bar-name-container"},a.createElement("span",null,"Wrong"),a.createElement("span",null,"Right")),a.createElement("div",{className:"study-score-bar-container"},a.createElement(m,{score:e,name:"wrong"}),a.createElement(m,{score:e,name:"right"})))}var y=s(3727);function v({score:e,deck:t,startTime:s,ids:n}){const r=!!(0,c.OZ)(t.cards).length,l=!!(0,c.Vb)(t.cards).length,o=t.cards.filter((e=>n.some((t=>e.id===t))));return a.createElement("div",{className:"container max-width-limit"},a.createElement("div",{className:"study-score-container"},a.createElement("h3",{className:"study-score-title"},"Session Results"),a.createElement("div",{className:"study-score-stats"},a.createElement("span",{className:"study-score-accuracy-name"},"Accuracy"),a.createElement("span",{className:"study-score-accuracy-value"},Math.round(e.right/e.total*100),"%"),a.createElement("div",{className:"study-score-time"},a.createElement(i.Z,{name:"clock"}),a.createElement("span",{className:"study-score-time-value"},(0,c.mr)(Math.floor((Date.now()-s)/1e3))))),a.createElement("div",{className:"study-score-bars"},a.createElement(m,{score:e,name:"wrong"}),a.createElement(m,{score:e,name:"right"})),a.createElement("div",{className:"study-score-btn-container"},r?a.createElement(y.rU,{to:{pathname:`/decks/${t.id}/learn`,search:"?reload=1"},className:"btn btn-text study-score-btn"},"Learn"):a.createElement("span",{className:"btn btn-text study-score-btn disabled"},"Learn"),l?a.createElement(y.rU,{to:{pathname:`/decks/${t.id}/review`,search:"?reload=1"},className:"btn btn-text study-score-btn"},"Review"):a.createElement("span",{className:"btn btn-text study-score-btn disabled"},"Review"),a.createElement(y.rU,{to:{pathname:`/decks/${t.id}/practice`,search:"?reload=1"},className:"btn btn-text study-score-btn"},"Practice"),a.createElement(y.rU,{to:"/decks",className:"btn btn-text study-score-btn"},"Close"))),a.createElement("ul",{className:"study-session-stats"},a.createElement("li",{className:"study-session-stats-item"},a.createElement("div",{className:"study-session-stats-column study-session-stats-header-item"},"Front"),a.createElement("div",{className:"study-session-stats-column study-session-stats-header-item study-session-stats-back-column"},"Back"),a.createElement("div",{className:"study-session-stats-column study-session-stats-header-item study-session-stats-accuracy-column"},"Accuracy"),a.createElement("div",{className:"study-session-stats-column study-session-stats-header-item study-session-stats-streak-column"},"Streak")),o.map(((e,t)=>{return a.createElement("li",{className:"study-session-stats-item",key:t},a.createElement("div",{className:"study-session-stats-column"},e.front.attachment?.description||e.front.text),a.createElement("div",{className:"study-session-stats-column study-session-stats-back-column"},"text"===(s=e.back).type||"exact"===s.type?s.typeOptions.value:"multi"===s.type?s.typeOptions.options.find((({id:e})=>s.typeOptions.correctId===e)).value:void 0),a.createElement("div",{className:"study-session-stats-column study-session-stats-accuracy-column"},a.createElement(m,{score:e.score,className:"small",name:"wrong"}),a.createElement(m,{score:e.score,className:"small",name:"right"})),a.createElement("div",{className:"study-session-stats-column study-session-stats-streak-column"},e.score.streak));var s}))))}function b({notes:e}){const[t,s]=(0,a.useState)(!1);return a.createElement("div",null,a.createElement("div",{className:"study-notes-toggle-btn-container"},a.createElement("button",{className:"btn btn-text",onClick:function(){s(!t)}},"Notes")),t&&a.createElement("div",{className:"study-notes"},e.value))}const p=function({id:e,attachmentId:t,side:s}){const[n,c]=(0,a.useState)(null),[r,l]=(0,a.useState)(!1),o=(0,a.useRef)(null),d=(0,a.useRef)(null);function m(){o.current.currentTime=0,o.current.play()}function u(){d.current.currentTime=0,d.current.play()}function y(){const{mediaType:e,src:t,attachmentId:s}=n;return"image"===e?a.createElement("button",{className:"btn btn-icon study-attachment-btn study-image-btn",onClick:v},a.createElement("img",{src:t,alt:"",className:"study-image"})):"audio"===e?a.createElement("button",{className:"btn study-attachment-btn study-audio-btn",onClick:m},a.createElement(i.Z,{name:"volume",className:"study-audio-btn-icon"}),a.createElement("audio",{src:t,ref:o,key:s,autoPlay:!0})):"video"===e?a.createElement("button",{className:"btn btn-icon study-attachment-btn study-video-btn",onClick:u},a.createElement("video",{src:t,className:"study-video",crossOrigin:"anonymous",ref:d,key:s,autoPlay:!0})):null}function v(){l(!r)}function b(){return a.createElement("div",{className:"study-front-text"},s.text)}return(0,a.useEffect)((()=>{let e="",a="";if(s.attachment){const{blob:n,url:r,type:l}=s.attachment;a=n?"blob":"url",e=n?URL.createObjectURL(n):r,c({src:e,attachmentId:t,mediaType:l})}else c(null);return()=>{"blob"===a&&URL.revokeObjectURL(e)}}),[e,t]),a.createElement(a.Fragment,null,a.createElement("div",{className:"study-front-content"},s.text&&n?a.createElement(a.Fragment,null,y(),b()):s.text?b():n?y():null),r&&a.createElement("div",{className:"study-expanded-image-mask",onClick:function(){l(!1)}},a.createElement("img",{src:n.src,className:"study-expanded-image",alt:""})))};const E=function({card:e,selectOption:t,handleSubmit:s}){const{back:n,revealed:r}=e,{type:l,typeOptions:o}=n;return"text"===l?a.createElement("div",{className:"study-card-text-content"},o.value):"exact"===l?function(){let t="input study-exact-input";return r&&(t+=e.isCorrect?" right":" wrong"),a.createElement("form",{onSubmit:s,className:"study-exact"},a.createElement("label",null,a.createElement("div",{className:"study-exact-top"},a.createElement("div",{className:"study-exact-title"},"Your Answer:"),n.typeOptions.caseSensitive?a.createElement("div",{className:"study-exact-notice"},a.createElement(i.Z,{name:"info",className:"study-exact-notice-icon"}),a.createElement("span",null,"Answer is case sensitive")):""),a.createElement("input",{type:"input",className:t,name:"answer",disabled:r})),a.createElement("button",{className:"btn study-exact-btn",disabled:r},"Check Answer"))}():"multi"===l?a.createElement("ul",{className:(0,c.AK)("study-multi",`study-multi-${n.typeOptions.layout}-type`,r?"revealed":"")},o.options.map((({id:e,value:s},l)=>a.createElement("li",{key:e+l},a.createElement("button",{onClick:()=>t(e),className:(0,c.AK)("btn study-multi-item",`study-multi-${n.typeOptions.layout}-type-item`,r&&o.correctId===e?"correct":"")},s))))):null};const h=function({card:e,settings:t,selectOption:s,revealAnswer:n,nextStep:c,skipNextStepTimeout:r}){return a.createElement("div",{className:"study-card",style:{"--text-base-size":`${t.textSize.value}rem`}},a.createElement(p,{id:e.id,attachmentId:e.attachmentId,side:e.front}),"text"!==e.back.type||e.revealed?a.createElement(a.Fragment,null,a.createElement(E,{card:e,selectOption:s,handleSubmit:function(t){if(t.preventDefault(),t.persist(),e.revealed)return;const s=t.target.elements.answer.value;let a=!1;a=e.back.typeOptions.caseSensitive?s===e.back.typeOptions.value:s.toLowerCase()===e.back.typeOptions.value.toLowerCase(),c(a),setTimeout((()=>{t.target.reset()}),1600)}}),"text"===e.back.type&&e.revealed&&(e.finished||e.timerReveal?a.createElement("button",{className:"btn btn-invert study-card-text-btn",onClick:r},"Next"):a.createElement("div",null,a.createElement("button",{className:"btn btn-negative study-card-text-btn",disabled:e.finished,onClick:()=>c(!1)},"I Was Wrong"),a.createElement("button",{className:"btn btn-positive study-card-text-btn",disabled:e.finished,onClick:()=>c(!0)},"I Got It Right")))):a.createElement("button",{className:"btn btn-invert study-card-text-btn",onClick:n},"Check"))};const k=function({revealed:e,initDuration:t,callback:s}){const[n,r]=(0,a.useState)(t),l=(0,a.useRef)(0);function i(e){e<1?s():l.current=setTimeout((()=>{const t=e-1;r(t),i(t)}),1e3)}return(0,a.useEffect)((()=>(i(n),()=>{clearTimeout(l.current)})),[]),(0,a.useEffect)((()=>{e&&clearTimeout(l.current)}),[e]),a.createElement("div",{className:"timer"},(0,c.mr)(n))};const f=function(){const e=(0,n.k6)(),t=(0,n.$B)(),[s,m]=(0,a.useState)(null),y=(0,a.useRef)(0),{location:p}=e;function E(){"preview"!==t.url.split("/")[3]?(0,r.VC)(t.params.id).then((e=>{e?f(e):m({error:!0})})):p.state?.title?f(p.state,"preview"):m({error:!0})}function f(e,s=t.url.split("/")[3]){let{cards:a}=e;if("learn"===s){if(a=(0,c.OZ)(a),!a.length)return void m({message:"You learned all available cards, come back later for a review."})}else if("review"===s&&(a=(0,c.Vb)(a),!a.length))return void m({message:"You have nothing to review at this moment, come back later."});const n=function(e,t){const s=(0,l.T)();return"preview"===t?{...s,randomize:{value:!1},cardCount:{value:0}}:!e.settings||e.settings.useGlobalSettings.value?s:{...e.settings,textSize:s.textSize}}(e,s);a=n.randomize.value?(0,c.Sy)(a):a;const r=a.slice(0,n.cardCount.value||a.length).map((e=>(e.score=e.score||{streak:0,right:0,wrong:0,total:0},e))),i="preview"===s?a[e.selectedCardIndex]:g(r);m({mode:s,deck:e,settings:n,sessionStartedAt:Date.now(),cardCount:r.length,cards:r,card:i,score:{right:0,wrong:0,total:0}}),(0,c.Dk)(e.title)}function g(e){const[t]=e;return"multi"===t.back.type&&(t.back.typeOptions.options=(0,c.Sy)(t.back.typeOptions.options)),{...t}}function N(e){const{score:t}=s;return e?t.right+=1:t.wrong+=1,t.total=t.right+t.wrong,t}function w(){C(!1,{timerReveal:!0})}function x(e,t){const a=s.deck.cards.find((t=>t.id===e));a.frozen||(function(e,t){const s=e.level||0;let a=s;t?a=s<8?s+1:8:(e.frozen=!0,a=1);const n=6*Math.pow(2,a-1)*a;e.level=a,e.nextReview=Date.now()+60*n*60*1e3}(a,t),function(e,t){t?(e.score.streak+=1,e.score.right+=1):(e.frozen=!0,e.score.streak=0,e.score.wrong+=1),e.score.total=e.score.right+e.score.wrong}(a,t))}function C(e,t={}){const a="preview"===s.mode?s.cards[s.deck.selectedCardIndex]:s.cards.shift(),n={...a,...t,isCorrect:e,revealed:!0,finished:!0};"learn"!==s.mode&&"review"!==s.mode||x(a.id,e),e?s.sessionCardIds=[...s.sessionCardIds||[],a.id]:"preview"!==s.mode&&(a.attachmentId=(0,c.zO)(),s.cards.push(a),s.cards=s.settings.randomize.value?(0,c.Sy)(s.cards):s.cards),m({...s,card:n,score:N(e)}),y.current=setTimeout("preview"===s.mode?S:O,1600)}function S(){const e=(s.deck.selectedCardIndex+1)%s.cards.length;s.deck.selectedCardIndex=e,m({...s,card:s.cards[e]})}function O(){const{cards:e,mode:t}=s,a=!e.length;!a||"learn"!==t&&"review"!==t||(s.deck.cards=s.deck.cards.map((e=>(delete e.frozen,e))),(0,r.C2)(s.deck)),m({...s,wasLastCard:a,card:a?null:g(e)})}function I(){"learn"===s.mode||"review"===s.mode?m({...s,exitModalVisible:!0}):"preview"===s.mode?e.push({pathname:"edit"===s.deck.type?`/decks/${s.deck.id}/${s.deck.type}`:"/decks/create",state:s.deck}):e.push("/decks")}function T(t){t&&(0,r.C2)(s.deck),e.push("/decks")}return(0,a.useEffect)((()=>{"1"===new URLSearchParams(p.search).get("reload")?(e.replace({pathname:p.pathname,search:"",state:{reloaded:!0}}),E()):p.state?.reloaded||E()}),[p.pathname+p.search]),s?s.error||s.message?a.createElement(d.Z,{message:s.message}):a.createElement(a.Fragment,null,s.wasLastCard?a.createElement("div",{className:"study-header"},a.createElement("h1",{className:"study-header-title"},s.deck.title)):a.createElement("div",{className:"study-header"+(s.settings.timeoutDuration.value>0?" has-timer":"")},a.createElement("button",{className:"btn btn-icon study-exit-btn",onClick:I,title:"Exit"},a.createElement(i.Z,{name:"close"})),a.createElement("h1",{className:"study-header-title"},s.deck.title),"preview"===s.mode&&a.createElement(i.Z,{name:"preview",className:"study-preview-icon",title:"In preview mode"}),!s.card.finished&&s.settings.timeoutDuration.value>0&&a.createElement(k,{revealed:s.card.revealed,initDuration:s.settings.timeoutDuration.value,callback:w})),s.wasLastCard?a.createElement(v,{score:s.score,deck:s.deck,startTime:s.sessionStartedAt,ids:s.sessionCardIds}):a.createElement("div",{className:"container max-width-limit"},a.createElement(u,{score:s.score}),"preview"===s.mode&&a.createElement("ul",{className:"study-card-select"},s.cards.map(((e,t)=>a.createElement("li",{className:"study-card-select-item",key:t},a.createElement("button",{className:"btn btn-text study-card-select-btn"+(t===s.deck.selectedCardIndex?" active":""),onClick:()=>function(e){const t=s.cards[e];s.deck.selectedCardIndex=e,m({...s,card:t})}(t)},t+1))))),a.createElement(h,{card:s.card,settings:s.settings,selectOption:function(e){s.card.revealed||C(e===s.card.back.typeOptions.correctId)},revealAnswer:function(){const e={...s.card};e.revealed=!0,m({...s,card:e})},skipNextStepTimeout:function(){clearTimeout(y.current),"preview"===s.mode?S():O()},nextStep:C}),s.card.notes?.value&&a.createElement(b,{notes:s.card.notes})),a.createElement("div",{className:"study-progress",style:{transform:`scaleX(${(s.cardCount-s.cards.length)/s.cardCount})`}}),s.exitModalVisible&&a.createElement(o.Z,{hide:function(){m({...s,exitModalVisible:!1})}},a.createElement("h3",{className:"modal-title"},"Do you want to save your progress?"),a.createElement("div",{className:"study-exit-modal-btns"},a.createElement("button",{className:"btn btn-text study-exit-modal-btn",onClick:()=>T(!0)},"Save and Exit"),a.createElement("button",{className:"btn btn-text study-exit-modal-btn",onClick:()=>T(!1)},"Exit Without Saving")))):null}},446:(e,t,s)=>{"use strict";s.d(t,{GT:()=>n,VC:()=>c,C2:()=>r,$P:()=>l});const a=new(s(9642).Z)("nimus-cards");function n(){return a.decks.toArray().then(i).catch((e=>{console.log(e)}))}function c(e){return a.decks.get(e)}function r(e){a.decks.put(e).catch((e=>{console.log(e)}))}function l(e){a.decks.delete(e).catch((e=>{console.log(e)}))}function i(e){return e.sort(((e,t)=>e.createdAt<t.createdAt?1:e.createdAt>t.createdAt?-1:0))}a.version(1).stores({decks:"id"})},3255:(e,t,s)=>{"use strict";s.d(t,{T:()=>r,z:()=>l});var a=s(3465),n=s.n(a);let c={textSize:{value:1},randomize:{value:!0},cardCount:{value:10},timeoutDuration:{value:""},...JSON.parse(localStorage.getItem("nimus-cards-settings"))};function r(){return n()(c)}function l(e){c={...c,...e},localStorage.setItem("nimus-cards-settings",JSON.stringify(c))}}}]);