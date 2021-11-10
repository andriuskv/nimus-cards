"use strict";(globalThis.webpackChunknimus_cards=globalThis.webpackChunknimus_cards||[]).push([[710],{710:(e,t,s)=>{s.r(t),s.d(t,{default:()=>i});var a=s(294),c=s(974),d=s(446),n=s(291),r=s(893);const i=function(){const e=(0,c.TH)(),t=(0,c.UO)(),[s,i]=(0,a.useState)(null);function l(e){if(e.level){const t=e.nextReview-Date.now();if(t<0)return"Ready to review";const s=Math.ceil(t/1e3/60),a=Math.floor(s/60),c=Math.floor(a/24);return c?`Review in ${c} day${c>1?"s":""}`:a?`Review in ${a} hour${a>1?"s":""}`:`Review in ${s} minute${s>1?"s":""}`}return"Ready to learn"}return(0,a.useEffect)((()=>{(0,d.VC)(t.id).then((e=>{if(e){const t=e.cards.filter((e=>e.level>1));e.learnedCardCount=t.length,e.memorizedCardCount=t.filter((e=>8===e.level)).length,i(e)}else i({error:!0})}))}),[e.pathname]),s?s.error?(0,r.jsx)(n.Z,{}):(0,r.jsxs)("div",{className:"deck-status",children:[(0,r.jsxs)("div",{className:"deck-status-header",children:[(0,r.jsx)("h2",{className:"deck-status-title",children:s.title}),(0,r.jsxs)("div",{className:"deck-status-progress",children:["Learned ",s.learnedCardCount," out of ",s.cards.length," cards, ",s.memorizedCardCount," memorized"]}),(0,r.jsxs)("div",{className:"deck-status-progress-bar-container",children:[(0,r.jsx)("div",{className:"deck-status-progress-bar",style:{"--width":s.learnedCardCount/s.cards.length*100+"%"}}),(0,r.jsx)("div",{className:"deck-status-progress-half-bar",style:{"--width":s.memorizedCardCount/s.cards.length*100+"%"}})]})]}),(0,r.jsxs)("ul",{className:"deck-status-items",children:[(0,r.jsxs)("li",{className:"deck-status-item",children:[(0,r.jsx)("div",{className:"deck-status-item-column deck-status-items-header-item deck-status-item-column-1",children:"Front"}),(0,r.jsx)("div",{className:"deck-status-item-column deck-status-items-header-item deck-status-item-column-2",children:"Back"}),(0,r.jsx)("div",{className:"deck-status-item-column deck-status-items-header-item deck-status-item-column-3",children:"Status"})]}),s.cards.map(((e,t)=>{return(0,r.jsxs)("li",{className:"deck-status-item",children:[(0,r.jsx)("div",{className:"deck-status-item-column deck-status-item-column-1",children:e.front.attachment?.description||e.front.text}),(0,r.jsx)("div",{className:"deck-status-item-column deck-status-item-column-2",children:(s=e.back,"text"===s.type||"exact"===s.type?s.typeOptions.value:"multi"===s.type?s.typeOptions.options.find((({id:e})=>s.typeOptions.correctId===e)).value:void 0)}),(0,r.jsx)("div",{className:"deck-status-item-column deck-status-item-column-3",children:l(e)})]},t);var s}))]})]}):null}},446:(e,t,s)=>{s.d(t,{GT:()=>c,VC:()=>d,C2:()=>n,$P:()=>r});const a=new(s(134).Z)("nimus-cards");function c(){return a.decks.toArray().then(i).catch((e=>{console.log(e)}))}function d(e){return a.decks.get(e)}function n(e){a.decks.put(e).catch((e=>{console.log(e)}))}function r(e){a.decks.delete(e).catch((e=>{console.log(e)}))}function i(e){return e.sort(((e,t)=>e.createdAt<t.createdAt?1:e.createdAt>t.createdAt?-1:0))}a.version(1).stores({decks:"id"})}}]);