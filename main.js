!function(e){function t(t){for(var s,i,c=t[0],l=t[1],o=t[2],m=0,u=[];m<c.length;m++)i=c[m],n[i]&&u.push(n[i][0]),n[i]=0;for(s in l)Object.prototype.hasOwnProperty.call(l,s)&&(e[s]=l[s]);for(d&&d(t);u.length;)u.shift()();return r.push.apply(r,o||[]),a()}function a(){for(var e,t=0;t<r.length;t++){for(var a=r[t],s=!0,c=1;c<a.length;c++){var l=a[c];0!==n[l]&&(s=!1)}s&&(r.splice(t--,1),e=i(i.s=a[0]))}return e}var s={},n={1:0},r=[];function i(t){if(s[t])return s[t].exports;var a=s[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=e,i.c=s,i.d=function(e,t,a){i.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:a})},i.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var c=window.webpackJsonp=window.webpackJsonp||[],l=c.push.bind(c);c.push=t,c=c.slice();for(var o=0;o<c.length;o++)t(c[o]);var d=l;r.push([27,0]),a()}({27:function(e,t,a){"use strict";a.r(t),a(58),a(57);var s=a(0),n=a.n(s),r=a(26),i=a(3);function c({name:e,className:t}){return n.a.createElement("svg",{viewBox:"0 0 24 24",className:t},n.a.createElement("path",{d:function(e){switch(e){case"edit":return"M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18, 2.9 17.35,2.9 16.96,\n                    3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z";case"remove":return"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z";case"flip":return"M21,9L17,5V8H10V10H17V13M7,11L3,15L7,19V16H14V14H7V11Z";case"media":return"M21,17H7V3H21M21,1H7A2,2 0 0,0 5,3V17A2,2 0 0,0 7,19H21A2,2 0 0,0 23,\n                    17V3A2,2 0 0,0 21,1M3,5H1V21A2,2 0 0,0 3,23H19V21H3M15.96,10.29L13.21,13.83L11.25,\n                    11.47L8.5,15H19.5L15.96,10.29Z";case"responsive":return"M4,6V16H9V12A2,2 0 0,1 11,10H16A2,2 0 0,1 18,12V16H20V6H4M0,20V18H4A2,2 0 0,\n                    1 2,16V6A2,2 0 0,1 4,4H20A2,2 0 0,1 22,6V16A2,2 0 0,1 20,18H24V20H18V20C18,21.11 17.1,\n                    22 16,22H11A2,2 0 0,1 9,20H9L0,20M11.5,20A0.5,0.5 0 0,0 11,20.5A0.5,0.5 0 0,0 11.5,\n                    21A0.5,0.5 0 0,0 12,20.5A0.5,0.5 0 0,0 11.5,20M15.5,20A0.5,0.5 0 0,0 15,20.5A0.5,0.5 0 0,\n                    0 15.5,21A0.5,0.5 0 0,0 16,20.5A0.5,0.5 0 0,0 15.5,20M13,20V21H14V20H13M11,12V19H16V12H11Z";case"offline":return"M2.28,3L1,4.27L2.47,5.74C2.04,6 1.61,6.29 1.2,6.6L3,9C3.53,8.6 4.08,8.25 4.66,\n                    7.93L6.89,10.16C6.15,10.5 5.44,10.91 4.8,11.4L6.6,13.8C7.38,13.22 8.26,12.77 9.2,\n                    12.47L11.75,15C10.5,15.07 9.34,15.5 8.4,16.2L12,21L14.46,17.73L17.74,21L19,19.72M12,\n                    3C9.85,3 7.8,3.38 5.9,4.07L8.29,6.47C9.5,6.16 10.72,6 12,6C15.38,6 18.5,7.11 21,\n                    9L22.8,6.6C19.79,4.34 16.06,3 12,3M12,9C11.62,9 11.25,9 10.88,9.05L14.07,12.25C15.29,\n                    12.53 16.43,13.07 17.4,13.8L19.2,11.4C17.2,9.89 14.7,9 12,9Z";case"image":return"M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,\n                    5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z";case"audio":return"M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,\n                    2.89 4.89,2 6,2M9,16A2,2 0 0,0 7,18A2,2 0 0,0 9,20A2,2 0 0,0 11,18V13H14V11H10V16.27C9.71,\n                    16.1 9.36,16 9,16Z";case"close":return"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}}(e)}))}const l=new(a(20).a)("nimus-cards-sets");function o(){return l.sets.toArray().catch(e=>{console.log(e)})}function d({decks:e,loading:t,editDeck:a,removeDeck:s}){return!t&&(e.length?n.a.createElement(n.a.Fragment,null,n.a.createElement("ul",null,e.map(function(e,t){return n.a.createElement("li",{className:"deck",key:e.id},n.a.createElement(i.b,{to:`/decks/${e.id}`,className:"deck-title"},e.title),e.description&&n.a.createElement("p",{className:"deck-description"},e.description),n.a.createElement("div",{className:"deck-card-count"},e.cards.length," card",e.cards.length>1&&"s"),n.a.createElement("div",{className:"deck-btn-container"},n.a.createElement("button",{className:"btn-icon deck-btn",title:"Edit",onClick:()=>a(e)},n.a.createElement(c,{name:"edit"}),n.a.createElement("span",null,"Edit")),n.a.createElement("button",{className:"btn-icon deck-btn",title:"Remove",onClick:()=>s(t)},n.a.createElement(c,{name:"remove"}),n.a.createElement("span",null,"Remove"))))})),n.a.createElement("div",{className:"container-footer"},n.a.createElement(i.b,{to:"/decks/create",className:"btn"},"Create Deck"))):n.a.createElement("div",{className:"deck-list-message-container"},n.a.createElement("h2",null,"You have no decks"),n.a.createElement(i.b,{to:"/decks/create",className:"btn"},"Create New Deck")))}function m(e){const t=e.card,a=e.side,s=e.uploadType,r=e.toggleUploadPanel,i=e.handleTextSizeSelect,l=t[a].textSize;return n.a.createElement("div",{className:"create-side-toolbar"},"front"===a&&function(e,t){return["image","audio"].map((a,s)=>n.a.createElement("button",{key:s,className:`btn-icon toolbar-btn${e===a?" active":""}`,title:`Upload ${a}`,onClick:()=>t(a)},n.a.createElement(c,{name:a})))}(s,r),n.a.createElement("select",{defaultValue:l,title:"Text size",onInput:e=>i(e,a),className:"input create-side-select"},n.a.createElement("option",{value:"16"},"16px"),n.a.createElement("option",{value:"24"},"24px"),n.a.createElement("option",{value:"36"},"36px"),n.a.createElement("option",{value:"48"},"48px")))}function u({file:e,type:t}){const a="string"==typeof e?e:URL.createObjectURL(e);return"image"===t?n.a.createElement("img",{src:a,alt:"",className:"side-image"}):"audio"===t?n.a.createElement("audio",{src:a,className:"side-audio",controls:!0}):null}function h(e){const t=e.card,a=e.side,s=t[a],r=s.attachment,i=s.panelMessage,l=s.text,o=s.textSize;return n.a.createElement("div",{className:`side-container${t.visibleSide===a?" visible":""}`},n.a.createElement("div",{className:"side-name"},a),n.a.createElement("div",{className:"side"},n.a.createElement(m,e),n.a.createElement("div",{className:"side-content create-side-content"},e.isUploadPanelVisible?(d=e.uploadType,h=i,n.a.createElement("div",{className:"side-panel-container"},n.a.createElement("div",{className:"create-side-upload-item"},n.a.createElement("div",null,"Upload ",d," from device"),n.a.createElement("label",{className:"btn",tabIndex:"0"},n.a.createElement("span",null,"Upload"),n.a.createElement("input",{type:"file",className:"file-input",onChange:e.handleFileUpload}))),n.a.createElement("div",{className:"create-side-upload-item"},n.a.createElement("div",null,"Upload ",d," from url"),n.a.createElement("form",{onSubmit:e.handleFileUploadFormURL},n.a.createElement("input",{type:"text",name:"url",className:"input"}),n.a.createElement("button",{className:"btn"},"Upload"))),h&&n.a.createElement("div",{className:"create-side-upload-panel-message"},h),n.a.createElement("button",{type:"button",className:"btn-icon create-side-panel-btn",onClick:e.closeUploadPanel,title:"Close panel"},n.a.createElement(c,{name:"close"})))):function(t){return t?n.a.createElement("div",{className:"side-panel-container"},n.a.createElement("button",{type:"button",className:"btn-icon create-side-panel-btn",onClick:e.removeAttachment,title:"Remove attachment"},n.a.createElement(c,{name:"remove"})),n.a.createElement(u,t)):null}(r),n.a.createElement("textarea",{className:"input create-side-text-input side-text",defaultValue:l,style:{fontSize:`${o}px`},onInput:t=>e.handleInput(t,a)}))));var d,h}function p(){return(p=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var s in a)Object.prototype.hasOwnProperty.call(a,s)&&(e[s]=a[s])}return e}).apply(this,arguments)}l.version(1).stores({sets:"++_id"}),a(38);class v extends n.a.Component{constructor(e){super(e),this.removeAttachment=(()=>{const e=this.state,t=e.card;delete t[e.side].attachment,this.setState({card:t})}),this.handleFileUpload=(({target:e})=>{const t=this.state.uploadType,a=e.files[0];e.value="",a.type.split("/")[0]!==t?this.showUploadPanelMessage(`File is not an ${t}`):this.addAttachment(a,t)}),this.handleFileUploadFormURL=(e=>{const t=e.target.elements.url.value.trim(),a=this.state.uploadType;if(e.preventDefault(),t){if("image"===a){const e=new Image;e.onload=(()=>{this.addAttachment(t,a)}),e.onerror=(e=>{this.showUploadPanelMessage(`URL doesn't contain ${a} file`),console.log(e)}),e.src=t}else if("audio"===a){const e=new Audio(t);e.onloadedmetadata=(()=>{this.addAttachment(t,a)}),e.onerror=(e=>{this.showUploadPanelMessage(`URL doesn't contain ${a} file`),console.log(e)})}}else this.showUploadPanelMessage("Please specify valid url")}),this.toggleUploadPanel=(e=>{e!==this.state.uploadType?this.setState({isUploadPanelVisible:!0,uploadType:e}):this.closeUploadPanel()}),this.closeUploadPanel=(()=>{this.setState({isUploadPanelVisible:!1,uploadType:""})}),this.state={card:e.card,side:"front"}}showUploadPanelMessage(e){const t=this.state,a=t.card,s=t.side;a[s].panelMessage=e,this.setState({card:a}),setTimeout(()=>{a[s].panelMessage="",this.setState({card:a})},3200)}addAttachment(e,t){const a=this.state,s=a.card;s[a.side].attachment=Object.assign({},{file:e,type:t}),this.setState({card:s,isUploadPanelVisible:!1,uploadType:""})}render(){return n.a.createElement(h,p({},this.state,{handleTextSizeSelect:this.props.handleTextSizeSelect,handleInput:this.props.handleInput,removeAttachment:this.removeAttachment,toggleUploadPanel:this.toggleUploadPanel,closeUploadPanel:this.closeUploadPanel,handleFileUpload:this.handleFileUpload,handleFileUploadFormURL:this.handleFileUploadFormURL}))}}function E(e){const t=e.card,a=e.side,s=e.handleInput,r=t[a],i=r.text,c=r.textSize;return n.a.createElement("div",{className:`side-container${t.visibleSide===a?" visible":""}`},n.a.createElement("div",{className:"side-name"},a),n.a.createElement("div",{className:"side"},n.a.createElement(m,e),n.a.createElement("div",{className:"side-content create-side-content"},n.a.createElement("textarea",{className:"input create-side-text-input side-text",defaultValue:i,style:{fontSize:`${c}px`},onInput:e=>s(e,a)}))))}function g(){return(g=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var s in a)Object.prototype.hasOwnProperty.call(a,s)&&(e[s]=a[s])}return e}).apply(this,arguments)}class b extends n.a.Component{constructor(e){super(e),this.state={card:e.card,side:"back"}}render(){return n.a.createElement(E,g({},this.state,{handleTextSizeSelect:this.props.handleTextSizeSelect,handleInput:this.props.handleInput}))}}class N extends n.a.Component{constructor(e){super(e),this.flipSide=(e=>{const t=this.state.card;t.visibleSide="front"===e?"back":"front",this.setState({card:t})}),this.handleInput=(({target:{value:e}},t)=>{const a=this.state.card;e!==a[t].text&&(a[t].text=e,this.setState({card:a}))}),this.handleTextSizeSelect=(({target:{value:e}},t)=>{const a=this.state.card;a[t].textSize=e,this.setState({card:a})}),e.card.visibleSide="front",this.state={card:e.card}}render(){const e=this.props,t=e.index,a=e.removeCard,s=this.state.card.visibleSide;return n.a.createElement("li",{className:"create-list-item"},n.a.createElement("div",{className:"create-card-index"},t+1,"."),n.a.createElement("div",{className:"create-input-group create-card"},n.a.createElement(v,{card:this.state.card,handleInput:this.handleInput,handleTextSizeSelect:this.handleTextSizeSelect}),n.a.createElement(b,{card:this.state.card,handleInput:this.handleInput,handleTextSizeSelect:this.handleTextSizeSelect})),n.a.createElement("div",{className:"create-card-btns"},n.a.createElement("button",{className:"btn-icon",title:"Remove card",onClick:()=>a(t)},n.a.createElement(c,{name:"remove"})),n.a.createElement("button",{className:"btn-icon side-flip-btn",title:"Flip side",onClick:()=>this.flipSide(s)},n.a.createElement(c,{name:"flip"}))))}}function f({deck:e,message:t,handleSubmit:a,addCard:s,removeCard:r}){return n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"create-input-group"},n.a.createElement("label",{className:"create-input-label"},n.a.createElement("div",{className:"side-name"},"title"),n.a.createElement("input",{id:"js-deck-title",className:"input create-title-input",defaultValue:e.title})),n.a.createElement("label",{className:"create-input-label"},n.a.createElement("div",{className:"side-name"},"description (optional)"),n.a.createElement("textarea",{id:"js-deck-description",className:"input side-text create-description-input",defaultValue:e.description}))),e.cards.length?n.a.createElement("ul",null,e.cards.map((e,t)=>n.a.createElement(N,{key:e.id,index:t,card:e,removeCard:r}))):n.a.createElement("p",{className:"create-deck-message"},"Deck is empty"),n.a.createElement("div",{className:"container-footer create-footer"},n.a.createElement("button",{className:"btn",onClick:s},"New Card"),t&&n.a.createElement("span",{className:"create-message"},t),n.a.createElement("button",{className:"btn",onClick:a},"Create")))}function k(){const e=JSON.parse(localStorage.getItem("nimus-cards-settings"))||{};return Object.assign({studyMode:{value:"standard"},randomize:{value:!0},cardCount:{value:""},timeoutDuration:{value:""}},e)}function S({score:e,type:t,barName:a,className:s=""}){return function(e,a){if(!e.total)return n.a.createElement("div",{className:`score-bar score-${a}-bar`},e[a]);const r={[t]:`${e[a]/e.total*100}%`};return n.a.createElement("div",{className:`score-bar score-${a}-bar ${s}`,style:r},e[a])}(e,a)}function C({score:e,mode:t}){return n.a.createElement("div",{className:"study-header"},e&&("standard"===t?function(e){return n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"study-score-bar-name-container"},e.total&&!e.right?null:n.a.createElement("div",null,"Right"),e.total&&!e.wrong?null:n.a.createElement("div",null,"Wrong")),n.a.createElement("div",null,n.a.createElement(S,{score:e,type:"width",barName:"right",className:"study-score-bar-inner"}),n.a.createElement(S,{score:e,type:"width",barName:"wrong",className:"study-score-bar-inner"})))}(e):function(e){return n.a.createElement("div",{className:"study-score-table"},n.a.createElement("div",{className:"study-score-table-cell"},n.a.createElement("div",{className:"study-score-table-cell-name"},"Level"),n.a.createElement("div",null,"Card Count")),e.levels.map((t,a)=>n.a.createElement("div",{className:`study-score-table-cell${e.currentLevel===a?" active":""}`,key:a},n.a.createElement("div",{className:"study-score-table-cell-name"},4===a?"Memorized":a+1),n.a.createElement("div",null,t.length))))}(e)))}function x({card:e,visibleSide:t,textStyles:a}){const s=e.front,r=s.attachment,i=s.text;return n.a.createElement("div",{className:`side-container${"front"===t?" visible":""}`},n.a.createElement("div",{className:"side-name"},"front"),n.a.createElement("div",{className:"side"},n.a.createElement("div",{className:"study-side-content"},r&&n.a.createElement("div",{className:`side-panel-container${i?"":" full"}`},n.a.createElement(u,r)),i&&n.a.createElement("div",{className:"side-text study-side-text"},n.a.createElement("div",{style:a},i)))))}function y({card:e,visibleSide:t,textStyles:a,revealBack:s}){return n.a.createElement("div",{className:`side-container${"back"===t?" visible":""}`},n.a.createElement("div",{className:"side-name"},"back"),n.a.createElement("div",{className:"side"},n.a.createElement("div",{className:"study-side-content"},e.isBackSideRevealed?n.a.createElement("div",{className:"side-text study-side-text"},n.a.createElement("div",{style:a},e.back.text)):n.a.createElement("button",{className:"btn study-reveal-btn",onClick:s},n.a.createElement("div",null,"Reveal")))))}function L(e){if(e.textSize)return{fontSize:`${e.textSize}px`}}function M({card:e,revealBack:t,flipSide:a}){return n.a.createElement("div",{className:"study-card"},e.isBackSideRevealed&&n.a.createElement("button",{className:"btn-icon side-flip-btn study-side-flip-btn",title:"Flip side",onClick:a},n.a.createElement(c,{name:"flip"})),n.a.createElement(x,{card:e,visibleSide:e.visibleSide,textStyles:L(e.front)}),n.a.createElement(y,{card:e,visibleSide:e.visibleSide,textStyles:L(e.back),revealBack:t}))}a(29),a(28);class w extends n.a.Component{constructor(e){super(e),this.state={duration:e.duration||-1,formatedDuration:this.formatDuration(e.duration)},this.timeoutId=0}componentDidMount(){this.state.duration>0&&this.runTimer(performance.now(),0)}componentWillUnmount(){clearTimeout(this.timeoutId)}getSeconds(e){const t=e%60;return t<10?`0${t}`:t}getMinutes(e){const t=Math.floor(e/60%60);return e>=3600&&t<10?`0${t}`:t}getHours(e){return Math.floor(e/3600)}formatDuration(e){const t=this.getSeconds(e),a=this.getMinutes(e),s=this.getHours(e);return`${s?`${s}:`:""}${a}:${t}`}runTimer(e,t){const a=performance.now()-e-t;this.timeoutId=setTimeout(()=>{this.update(e,t+1e3)},1e3-a)}update(e,t){const a=this.state.duration-1;if(a<0)return this.setState({duration:a}),void this.props.callback();this.setState({duration:a,formatedDuration:this.formatDuration(a)},()=>{this.runTimer(e,t)})}render(){const e=this.state,t=e.duration,a=e.formatedDuration;return t>=0?n.a.createElement("div",{className:"study-timeout"},a):null}}function V({title:e,card:t,cardCount:a,score:s,mode:r,timeoutDuration:i,revealBack:c,flipSide:l,getNextCard:o}){return n.a.createElement(n.a.Fragment,null,n.a.createElement("h1",{className:"study-deck-title"},e),n.a.createElement("div",{className:"study-container"},n.a.createElement(C,{score:s,mode:r}),n.a.createElement(M,{card:t,revealBack:c,flipSide:l})),n.a.createElement("div",{className:"container-footer"},n.a.createElement("span",{className:"study-progress"},"Progress: ",t.index+1,"/",a),!t.isBackSideRevealed&&n.a.createElement(w,{duration:i,callback:c}),t.isBackSideRevealed?n.a.createElement(n.a.Fragment,null,n.a.createElement("button",{className:"btn-danger study-footer-btn",onClick:()=>o(0)},"I Was Wrong"),n.a.createElement("button",{className:"btn-success study-footer-btn",onClick:()=>o(1)},"I Got It Right")):n.a.createElement("button",{className:"btn",onClick:c},"Reveal")))}function A({title:e,score:t,mode:a,initNextStandardRound:s,initNextLeitnerLevel:r}){const c=t.session;return n.a.createElement(n.a.Fragment,null,n.a.createElement("h1",{className:"study-deck-title"},e),n.a.createElement("div",{className:"deck-score-container"},n.a.createElement("h3",{className:"deck-score-title"},"Session Results"),n.a.createElement("div",{className:"deck-score-in-percent"},Math.round(c.right/c.total*100),"%"),n.a.createElement("div",{className:"deck-score-bars"},n.a.createElement("div",{className:"deck-score-bar-container"},n.a.createElement("span",{className:"deck-score-bar-name"},"Right"),n.a.createElement("div",{className:"deck-score-bar"},n.a.createElement(S,{score:c,type:"maxWidth",barName:"right",className:"deck-score-bar-inner"}))),n.a.createElement("div",{className:"deck-score-bar-container"},n.a.createElement("span",{className:"deck-score-bar-name"},"Wrong"),n.a.createElement("div",{className:"deck-score-bar"},n.a.createElement(S,{score:c,type:"maxWidth",barName:"wrong",className:"deck-score-bar-inner"})))),n.a.createElement("div",{className:"deck-score-btn-container"},!t.isLast&&("standard"===a?n.a.createElement("button",{className:"btn deck-score-btn",onClick:s},"Next Round"):function(){let e=t.currentLevel+1;return t.wrong?e-=e>1?1:0:e+=1,n.a.createElement("button",{className:"btn deck-score-btn",onClick:r},"Continue to Level ",e)}()),n.a.createElement(i.b,{to:"/decks",className:"btn"},"Close"))))}function H({settings:e,handleChange:t}){return n.a.createElement("div",{onChange:t},n.a.createElement("div",{className:"settings-item"},n.a.createElement("div",{className:"settings-item-title"},"Study mode"),n.a.createElement("label",{className:"settings-label settings-radio-label"},n.a.createElement("input",{type:"radio",name:"study-mode",className:"radio-input","data-name":"studyMode","data-study-mode":"standard",defaultChecked:"standard"===e.studyMode.value}),n.a.createElement("div",{className:"radio settings-radio"}),n.a.createElement("span",null,"Standard")),n.a.createElement("label",{className:"settings-label settings-radio-label"},n.a.createElement("input",{type:"radio",name:"study-mode",className:"radio-input","data-name":"studyMode","data-study-mode":"leitner",defaultChecked:"leitner"===e.studyMode.value}),n.a.createElement("div",{className:"radio settings-radio"}),n.a.createElement("span",null,"Leitner system"))),n.a.createElement("label",{className:"settings-item settings-label"},n.a.createElement("input",{type:"checkbox",className:"checkbox-input","data-name":"randomize",defaultChecked:e.randomize.value}),n.a.createElement("div",{className:"checkbox settings-checkbox"}),n.a.createElement("span",null,"Randomize cards")),n.a.createElement("label",{className:"settings-item"},n.a.createElement("span",null,"Use"),n.a.createElement("input",{type:"text",className:"input settings-input","data-name":"cardCount",pattern:"^[0-9]+$",defaultValue:e.cardCount.value}),n.a.createElement("span",null,"cards per study session"),n.a.createElement("div",{className:"settings-message"},"Please provide a valid whole number.")),n.a.createElement("label",{className:"settings-item"},n.a.createElement("span",null,"Reveal answer after"),n.a.createElement("input",{type:"text",className:"input settings-input","data-name":"timeoutDuration",pattern:"^0*|0*([5-9][0-9]*|[1-9]+[0-9]+)$",defaultValue:e.timeoutDuration.value}),n.a.createElement("span",null,"seconds"),n.a.createElement("div",{className:"settings-message"},"Please provide a valid whole number.",n.a.createElement("br",null)," Minimal accepted value is 5 seconds.")))}Object(r.render)(n.a.createElement(i.a,null,n.a.createElement(n.a.Fragment,null,n.a.createElement(function(){return n.a.createElement("header",{className:"header"},n.a.createElement("nav",{className:"header-nav"},n.a.createElement("ul",{className:"header-nav-items"},n.a.createElement("li",{className:"header-nav-item"},n.a.createElement(i.c,{to:"/",exact:!0,className:"header-link",activeClassName:"active"},"Home")),n.a.createElement("li",{className:"header-nav-item"},n.a.createElement(i.c,{to:"/decks/create",className:"header-link",activeClassName:"active"},"Create")),n.a.createElement("li",{className:"header-nav-item"},n.a.createElement(i.c,{to:"/decks",exact:!0,className:"header-link",activeClassName:"active"},"Decks")),n.a.createElement("li",{className:"header-nav-item"},n.a.createElement(i.c,{to:"/settings",className:"header-link",activeClassName:"active"},"Settings")))))},null),n.a.createElement("main",{className:"main"},n.a.createElement(i.e,null,n.a.createElement(i.d,{path:"/",exact:!0,component:function(){return n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"home-hero"},n.a.createElement("h1",{className:"home-hero-title"},"NimusCards"),n.a.createElement("p",{className:"home-hero-desc"},"NimusCards is easy to use web based flashcard application with the goal of giving users an ability to create, edit, and practice flashcards that are organized in decks."),n.a.createElement(i.b,{to:"/decks/create",className:"btn home-hero-btn"},"Get Started")),n.a.createElement("h2",{className:"home-features-title"},"Features"),n.a.createElement("ul",{className:"home-features"},n.a.createElement("li",{className:"home-feature"},n.a.createElement(c,{name:"media",className:"home-icon"}),n.a.createElement("h3",{className:"home-feature-title"},"Media-Rich"),n.a.createElement("p",null,"Easily add images and sounds to your flashcards.")),n.a.createElement("li",{className:"home-feature"},n.a.createElement(c,{name:"responsive",className:"home-icon"}),n.a.createElement("h3",{className:"home-feature-title"},"Responsive"),n.a.createElement("p",null,"Responsive web design makes user experience consistent across multiple devices.")),n.a.createElement("li",{className:"home-feature"},n.a.createElement(c,{name:"offline",className:"home-icon"}),n.a.createElement("h3",{className:"home-feature-title"},"Works Offline"),n.a.createElement("p",null,"Even without connection, you can still use NimusCards."))))}}),n.a.createElement(i.d,{path:"/decks",exact:!0,component:class extends n.a.Component{constructor(e){var t;super(e),this.editDeck=(e=>{this.props.history.push({pathname:"/decks/create",state:e})}),this.removeDeck=(e=>{const a=[...this.state.decks],s=a[e],n=s._id,r=s.title;confirm(`Are you sure you want to remove ${r} deck?`)&&(t=n,l.sets.delete(t).catch(e=>{console.log(e)}),a.splice(e,1),this.setState({decks:a}))}),this.state={decks:[],loading:!0}}componentDidMount(){this.getDecks(this.props.location.state).then(e=>{this.setState({decks:e,loading:!1})})}async getDecks(e){const t=await o();if(e){const s=t.findIndex(({id:t})=>t===e.id);-1===s?t.push(e):t.splice(s,1,e),a=e,l.sets.put(a).catch(e=>{console.log(e)})}var a;return t}render(){return n.a.createElement(d,{decks:this.state.decks,loading:this.state.loading,editDeck:this.editDeck,removeDeck:this.removeDeck})}}}),n.a.createElement(i.d,{path:"/decks/create",component:class extends n.a.Component{constructor(e){super(e),this.handleSubmit=(()=>{const e=document.getElementById("js-deck-title").value,t=document.getElementById("js-deck-description").value;if(!e)return void this.showMessage("Please specify deck title");const a=Object.assign({},this.state.deck),s=a.cards.some(({front:e,back:t})=>{const a=this.hasSideContent(e),s=this.hasSideContent(t);return!a&&s||!s&&a});if(a.title=e,a.description=t,!s)return a.cards=a.cards.filter(({front:e,back:t})=>this.hasSideContent(e)||this.hasSideContent(t)),a.cards.length<2?void this.showMessage("Please fill in at least two cards"):void this.props.history.push({pathname:"/decks",state:a});this.showMessage("Please fill in both card sides")}),this.addCard=(({target:e})=>{const t=Object.assign({},this.state.deck),a=t.cards[t.cards.length-1],s=this.getNewCard();a&&(s.front.textSize=a.front.textSize,s.back.textSize=a.back.textSize),t.cards.push(s),this.setState({deck:t},()=>{e.scrollIntoView()})}),this.removeCard=(e=>{const t=Object.assign({},this.state.deck);t.cards.splice(e,1),this.setState({deck:t})}),this.state={deck:this.getDeck(e.location.state)},this.messageTimeout=0}getRandomString(){return Math.random().toString(32).slice(2,10)}getDeck(e={}){return Object.assign({id:this.getRandomString(),title:"",description:"",cards:[this.getNewCard()]},e)}showMessage(e){this.setState({message:e}),clearTimeout(this.messageTimeout),this.messageTimeout=setTimeout(()=>{this.setState({message:""})},3200)}hasSideContent(e){return e.text||e.attachment}getNewCard(){return{id:this.getRandomString(),front:{text:"",textSize:16},back:{text:"",textSize:16}}}render(){return n.a.createElement(f,{deck:this.state.deck,message:this.state.message,handleSubmit:this.handleSubmit,addCard:this.addCard,removeCard:this.removeCard})}}}),n.a.createElement(i.d,{path:"/decks/:id",component:class extends n.a.Component{constructor(e){super(e),this.revealBack=(()=>{this.setState({isBackSideRevealed:!0,visibleSide:"back"})}),this.flipSide=(()=>{this.setState(({visibleSide:e})=>({visibleSide:"front"===e?"back":"front"}))}),this.getNextCard=(e=>{const t=this.state.index+1;this.score=this.updateScore(e,this.mode,this.score),this.setState(t===this.cards.length?{last:!0}:this.getCard(t))}),this.initNextStandardRound=(()=>{const e=this.getNextLevelCards(this.cards,this.score.incorrectIds);this.score.currentLevel+=1,this.score.incorrectIds.length=0,this.initNextLevel(this.score,e)}),this.initNextLeitnerLevel=(()=>{const e=this.score.levels,t=e.findIndex(e=>e.length),a=this.getNextLevelCards(this.initialCards,e[t]);this.score.currentLevel=t,this.initNextLevel(this.score,a)}),this.deckTitle="",this.cards=[],this.initialCards=[],this.state={front:null,back:null},this.score=null}componentDidMount(){o().then(e=>{const t=this.props.match.params.id,a=e.find(e=>e.id===t);a?this.initDeck(a):this.props.history.replace("/decks")})}initDeck({title:e,cards:t}){const a=k();if(this.mode=a.studyMode.value,this.randomizeCards=a.randomize.value,this.timeoutDuration=parseInt(a.timeoutDuration.value||0,10),this.deckTitle=e,this.cards=this.getCards(t,a),this.score=this.resetScoreCounter({currentLevel:0,session:this.resetScoreCounter()}),"standard"===this.mode)this.score.incorrectIds=[];else{const e=this.cards.map(e=>e.id);this.initialCards=[].concat(this.cards),this.score.levels=[e,[],[],[],[]]}this.setState(this.getCard())}getCards(e,t){const a=parseInt(t.cardCount.value,10);return e=t.randomize.value?this.shuffleArray(e):e,a?e.slice(0,a):e}shuffleArray(e){const t=[].concat(e);let a=t.length;for(;a;){const e=Math.floor(Math.random()*a);a-=1;var s=[t[e],t[a]];t[a]=s[0],t[e]=s[1]}return t}getCard(e=0){const t=this.cards[e];return{index:e,id:t.id,front:t.front,back:t.back,isBackSideRevealed:!1,visibleSide:"front"}}updateStandardScore(e,t){return t||e.incorrectIds.push(this.state.id),e.isLast=e.right===e.total,e}updateLeitnerScore(e,t){let a=e.currentLevel;if(t)a+=1;else{if(!a)return e;a-=1}const s=e.levels[e.currentLevel],n=s.findIndex(e=>e===this.state.id),r=s.splice(n,1)[0];return e.levels[a].push(r),e.isLast=e.levels[4].length===this.initialCards.length,e}updateScoreCounter(e,t){e?t.right+=1:t.wrong+=1,t.total=t.right+t.wrong}updateScore(e,t,a){return this.updateScoreCounter(e,a),this.updateScoreCounter(e,a.session),"standard"===t?this.updateStandardScore(a,e):this.updateLeitnerScore(a,e)}resetScoreCounter(e={}){return Object.assign(e,{right:0,wrong:0,total:0})}getNextLevelCards(e,t){return e.filter(e=>-1!==t.indexOf(e.id))}initNextLevel(e,t){this.score=this.resetScoreCounter(e),this.cards=this.randomizeCards?this.shuffleArray(t):t,this.setState(Object.assign({last:!1},this.getCard()))}render(){return this.state.front&&this.state.back?this.state.last?n.a.createElement(A,{title:this.deckTitle,score:this.score,mode:this.mode,initNextStandardRound:this.initNextStandardRound,initNextLeitnerLevel:this.initNextLeitnerLevel}):n.a.createElement(V,{title:this.deckTitle,card:this.state,cardCount:this.cards.length,score:this.score,mode:this.mode,timeoutDuration:this.timeoutDuration,revealBack:this.revealBack,flipSide:this.flipSide,getNextCard:this.getNextCard}):null}}}),n.a.createElement(i.d,{path:"/settings",component:class extends n.a.Component{constructor(e){super(e),this.handleChange=(({target:e})=>{const t=e.getAttribute("data-name"),a=this.state[t];switch(e.type){case"checkbox":a.value=e.checked;break;case"text":a.value=e.validity.valid?e.value:"";break;case"radio":a.value=e.getAttribute("data-study-mode")}this.updateSetting(t,a)}),this.state=k()}updateSetting(e,t){var a;this.setState({[e]:t},()=>{a=this.state,localStorage.setItem("nimus-cards-settings",JSON.stringify(a))})}render(){return n.a.createElement(H,{settings:this.state,handleChange:this.handleChange})}}}),n.a.createElement(i.d,{component:function(){return n.a.createElement("p",{className:"no-match-message"},"This page isn't available")}}))))),document.getElementById("app"))},57:function(e,t,a){}});