(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{111:function(e,t,a){"use strict";a.d(t,"b",(function(){return c})),a.d(t,"c",(function(){return i})),a.d(t,"a",(function(){return l}));const n=new(a(124).a)("nimus-cards-decks");function c(){return n.decks.toArray().catch(e=>{console.log(e)})}function i(e){n.decks.put(e).catch(e=>{console.log(e)})}function l(e){n.decks.delete(e).catch(e=>{console.log(e)})}n.version(1).stores({decks:"++_id"})},118:function(e,t,a){"use strict";a.d(t,"b",(function(){return n})),a.d(t,"a",(function(){return c}));a(135),a(104);function n(e){const t=[].concat(e);let a=t.length;for(;a;){const e=Math.floor(Math.random()*a);a-=1,[t[a],t[e]]=[t[e],t[a]]}return t}function c(){return Math.random().toString(32).slice(2,10)}},125:function(e,t,a){"use strict";var n=a(56),c=a(15),i=a(2),l=a(9),s=a(13),r=a(20).f,o=a(64),u=i.Symbol;if(c&&"function"==typeof u&&(!("description"in u.prototype)||void 0!==u().description)){var m={},d=function(){var e=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),t=this instanceof d?new u(e):void 0===e?u():u(e);return""===e&&(m[t]=!0),t};o(d,u);var p=d.prototype=u.prototype;p.constructor=d;var E=p.toString,f="Symbol(test)"==String(u("test")),h=/^Symbol\((.*)\)[^)]+$/;r(p,"description",{configurable:!0,get:function(){var e=s(this)?this.valueOf():this,t=E.call(e);if(l(m,e))return"";var a=f?t.slice(7,-1):t.replace(h,"$1");return""===a?void 0:a}}),n({global:!0,forced:!0},{Symbol:d})}},130:function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));a(104),a(131);var n=a(0),c=a.n(n);function i({file:e,type:t}){const a="string"==typeof e?e:URL.createObjectURL(e);return"image"===t?c.a.createElement("img",{src:a,alt:"",className:"side-image"}):"audio"===t?c.a.createElement("audio",{src:a,className:"side-audio",controls:!0}):null}},143:function(e,t,a){"use strict";var n=a(126),c=a(136),i=a(11),l=a(57),s=a(74),r=a(127),o=a(34),u=a(129),m=a(117),d=a(12),p=[].push,E=Math.min,f=!d((function(){return!RegExp(4294967295,"y")}));n("split",2,(function(e,t,a){var n;return n="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(e,a){var n=String(l(this)),i=void 0===a?4294967295:a>>>0;if(0===i)return[];if(void 0===e)return[n];if(!c(e))return t.call(n,e,i);for(var s,r,o,u=[],d=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),E=0,f=new RegExp(e.source,d+"g");(s=m.call(f,n))&&!((r=f.lastIndex)>E&&(u.push(n.slice(E,s.index)),s.length>1&&s.index<n.length&&p.apply(u,s.slice(1)),o=s[0].length,E=r,u.length>=i));)f.lastIndex===s.index&&f.lastIndex++;return E===n.length?!o&&f.test("")||u.push(""):u.push(n.slice(E)),u.length>i?u.slice(0,i):u}:"0".split(void 0,0).length?function(e,a){return void 0===e&&0===a?[]:t.call(this,e,a)}:t,[function(t,a){var c=l(this),i=null==t?void 0:t[e];return void 0!==i?i.call(t,c,a):n.call(String(c),t,a)},function(e,c){var l=a(n,e,this,c,n!==t);if(l.done)return l.value;var m=i(e),d=String(this),p=s(m,RegExp),h=m.unicode,b=(m.ignoreCase?"i":"")+(m.multiline?"m":"")+(m.unicode?"u":"")+(f?"y":"g"),v=new p(f?m:"^(?:"+m.source+")",b),g=void 0===c?4294967295:c>>>0;if(0===g)return[];if(0===d.length)return null===u(v,d)?[d]:[];for(var x=0,N=0,k=[];N<d.length;){v.lastIndex=f?N:0;var y,C=u(v,f?d:d.slice(N));if(null===C||(y=E(o(v.lastIndex+(f?0:N)),d.length))===x)N=r(d,N,h);else{if(k.push(d.slice(x,N)),k.length===g)return k;for(var O=1;O<=C.length-1;O++)if(k.push(C[O]),k.length===g)return k;N=x=y}}return k.push(d.slice(x)),k}]}),!f)},156:function(e,t,a){"use strict";a.r(t);a(125),a(106),a(133),a(104);var n=a(0),c=a.n(n),i=a(118);const l=Object(n.createContext)(null);function s({children:e}){const[t,a]=Object(n.useReducer)(o,{title:"",description:"",cards:[]}),i=Object(n.useMemo)(()=>({state:t,dispatch:a}),[t]);return c.a.createElement(l.Provider,{value:i},e)}function r(){return Object(n.useContext)(l)}function o(e,t){const a=e.cards[t.index];switch(t.type){case"RESET_DECK":return Object.assign({},t.deck);case"UPDATE_DECK":return Object.assign({},e,{[t.name]:t.value});case"ADD_CARD":return Object.assign({},e,{cards:[...e.cards,t.card]});case"REMOVE_CARD":return e.cards.splice(t.index,1),Object.assign({},e);case"UPDATE_CARD_VALUE":return a[t.name][t.key]=t.value,Object.assign({},e);case"ADD_ATTACHMENT":return a.front.attachment=t.attachment,Object.assign({},e);case"REMOVE_ATTACHMENT":return delete a.front.attachment,Object.assign({},e);case"CHANGE_ANSWER_TYPE":return a.back.type=t.answerType,Object.assign({},e);case"ADD_OPTION":return a.back.options.push({id:Object(i.a)()}),Object.assign({},e);case"REMOVE_OPTION":return a.back.correct=0,a.back.options.splice(t.optionIndex,1),Object.assign({},e);case"CHANGE_CORRECT_ANSWER":return a.back.correct=t.optionIndex,Object.assign({},e);case"TOGGLE_USE_GRID":return a.back.useGrid=!a.back.useGrid,Object.assign({},e);case"UPDATE_OPTION_TEXT":return a.back.options[t.optionIndex].text=t.value,Object.assign({},e);case"UPDATE_EXACT_ANSWER":return a.back[t.name]=t.value,Object.assign({},e);default:return e}}var u=a(111),m=a(14);function d({textSize:e,handleChange:t}){return c.a.createElement("select",{className:"input create-side-select",title:"Text size",defaultValue:e,onChange:t},c.a.createElement("option",{value:"16"},"16px"),c.a.createElement("option",{value:"24"},"24px"),c.a.createElement("option",{value:"36"},"36px"),c.a.createElement("option",{value:"48"},"48px"))}a(143);function p(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}class E extends c.a.Component{constructor(e){super(e),p(this,"hide",()=>{this.props.hide()}),p(this,"handleFileUpload",({target:e})=>{const{type:t}=this.props,[a]=e.files;e.value="",a.type.split("/")[0]!==t?this.showMessage(`File is not an ${t}`):this.props.addAttachment(a,t)}),p(this,"handleFileUploadFormURL",e=>{const t=e.target.elements.url.value.trim(),{type:a}=this.props;if(e.preventDefault(),t){if("image"===a){const e=new Image;e.onload=()=>{this.props.addAttachment(t,a)},e.onerror=e=>{this.showMessage(`URL doesn't contain ${a} file`),console.log(e)},e.src=t}else if("audio"===a){const e=new Audio(t);e.onloadedmetadata=()=>{this.props.addAttachment(t,a)},e.onerror=e=>{this.showMessage(`URL doesn't contain ${a} file`),console.log(e)}}}else this.showMessage("Please specify valid url")}),this.state={message:""}}showMessage(e){this.setState({message:e}),setTimeout(()=>{this.setState({message:""})},3200)}render(){const{type:e}=this.props,{message:t}=this.state;return c.a.createElement("div",{className:"mask"},c.a.createElement("div",{className:"modal upload-panel"},c.a.createElement("div",{className:"upload-panel-device-target"},c.a.createElement("div",{className:"upload-panel-device-target-title"},"Select ",e," file from device"),c.a.createElement("label",{className:"btn",tabIndex:"0"},c.a.createElement("span",null,"Select"),c.a.createElement("input",{type:"file",className:"file-input",onChange:this.handleFileUpload}))),c.a.createElement("div",{className:"upload-panel-item-separator"},"Or"),c.a.createElement("div",{className:"upload-panel-url-target"},c.a.createElement("div",{className:"upload-panel-url-target-title"},"Upload ",e," from url"),c.a.createElement("form",{onSubmit:this.handleFileUploadFormURL},c.a.createElement("input",{type:"text",name:"url",className:"input upload-panel-url-target-input"}),c.a.createElement("button",{className:"btn"},"Upload"))),c.a.createElement("div",{className:"upload-panel-footer"},t&&c.a.createElement("div",{className:"upload-panel-message"},t),c.a.createElement("button",{type:"button",className:"btn btn-text",onClick:this.hide},"Cancel"))))}}var f=a(130);function h({index:e,side:t,handleChange:a}){const{dispatch:i}=r(),[l,s]=Object(n.useState)({type:"",visible:!1}),{text:o,textSize:u,attachment:p}=t;function h(){i({type:"REMOVE_ATTACHMENT",index:e})}function b(){s({visible:!1,type:""})}return c.a.createElement(n.Fragment,null,c.a.createElement("div",null,c.a.createElement("div",{className:"deck-form-field-title"},"FRONT"),c.a.createElement("div",{className:"create-side-toolbar"},["image","audio"].map((e,t)=>c.a.createElement("button",{key:t,className:"btn btn-icon toolbar-btn",title:`Upload ${e}`,onClick:()=>function(e){s({visible:!0,type:e})}(e)},c.a.createElement(m.a,{name:e}))),c.a.createElement(d,{textSize:u,handleChange:e=>a(e,"front","textSize")})),c.a.createElement("div",{className:"create-side-content"},p&&c.a.createElement("div",{className:"create-side-panel"},c.a.createElement("button",{type:"button",className:"btn btn-icon create-side-panel-btn",onClick:h,title:"Remove attachment"},c.a.createElement(m.a,{name:"remove"})),c.a.createElement(f.a,p)),c.a.createElement("textarea",{className:"input create-side-text-input",value:o,style:{fontSize:`${u}px`},onChange:e=>a(e,"front","text")}))),l.visible&&c.a.createElement(E,{type:l.type,hide:b,addAttachment:function(t,a){i({type:"ADD_ATTACHMENT",index:e,attachment:{file:t,type:a}}),b()}}))}function b({index:e,handleChange:t}){const{state:a,dispatch:i}=r(),{back:l,id:s}=a.cards[e],{type:o,text:u,textSize:p,options:E,correct:f}=l;function h(t,a){i({type:"REMOVE_OPTION",index:e,optionIndex:t,id:a})}function b(t){i({type:"CHANGE_CORRECT_ANSWER",index:e,optionIndex:t})}function v(){i({type:"TOGGLE_USE_GRID",index:e})}function g({target:t}){const{name:a,value:n}=t;n!==l.options[a].text&&i({type:"UPDATE_OPTION_TEXT",optionIndex:parseInt(a,10),index:e,value:n})}function x({target:t}){const{name:a,value:n,checked:c}=t;i({type:"UPDATE_EXACT_ANSWER",name:a,value:"caseSensitive"===a?c:n,index:e})}return c.a.createElement("div",null,c.a.createElement("div",{className:"deck-form-field-title"},"BACK"),c.a.createElement("div",{className:"create-side-toolbar"},c.a.createElement("ul",{className:"create-side-types",onChange:function({target:t}){i({type:"CHANGE_ANSWER_TYPE",answerType:t.value,index:e})}},c.a.createElement("li",{className:"create-side-type"},c.a.createElement("label",null,c.a.createElement("input",{type:"radio",className:"radio-input",value:"text",name:`type-${s}`,defaultChecked:"text"===o}),c.a.createElement(m.a,{name:"text",title:"Text",className:"create-option-type-icon"}))),c.a.createElement("li",{className:"create-side-type"},c.a.createElement("label",null,c.a.createElement("input",{type:"radio",className:"radio-input",value:"multi",name:`type-${s}`,defaultChecked:"multi"===o}),c.a.createElement(m.a,{name:"list",title:"Multiple choice",className:"create-option-type-icon"}))),c.a.createElement("li",{className:"create-side-type"},c.a.createElement("label",null,c.a.createElement("input",{type:"radio",className:"radio-input",value:"exact",name:`type-${s}`,defaultChecked:"exact"===o}),c.a.createElement(m.a,{name:"text-short",title:"Exact answer",className:"create-option-type-icon"})))),"text"===o&&c.a.createElement(d,{textSize:p,handleChange:e=>t(e,"back","textSize")}),"multi"===o&&c.a.createElement("button",{className:"btn btn-icon",onClick:function(){i({type:"ADD_OPTION",index:e})},title:"Add option"},c.a.createElement(m.a,{name:"add-list-item"}))),c.a.createElement("div",{className:"create-side-content"},function(e){return"text"===e?c.a.createElement("textarea",{className:"input create-side-text-input",value:u,style:{fontSize:`${p}px`},onChange:e=>t(e,"back","text")}):"multi"===e?c.a.createElement(n.Fragment,null,c.a.createElement("label",{onInput:v,className:"creact-multi-checkbox-container"},c.a.createElement("input",{type:"checkbox",className:"checkbox-input",name:"caseSensitive",defaultChecked:l.useGrid}),c.a.createElement("div",{className:"checkbox creact-multi-checkbox"},c.a.createElement("div",{className:"checkbox-tick"})),c.a.createElement("span",null,"Use grid to display choices")),c.a.createElement("ul",null,E.map(({text:e,id:t},a)=>c.a.createElement("li",{className:"create-option",key:t},c.a.createElement("label",null,c.a.createElement("input",{type:"radio",className:"radio-input",name:s,checked:f===a,onChange:()=>b(a)}),c.a.createElement("div",{className:"radio create-option-radio",title:"Mark answer as correct"})),c.a.createElement("input",{type:"text",className:"input create-option-input",name:a,defaultValue:e,autoComplete:"off",onChange:g}),c.a.createElement("button",{className:"btn btn-icon",title:"Remove answer",onClick:()=>h(a,t)},c.a.createElement(m.a,{name:"remove"})))))):"exact"===e?c.a.createElement("div",{onChange:x},c.a.createElement("label",{className:"creact-exact-input-container"},c.a.createElement("div",{className:"creact-exact-input-title"},"Provide answer:"),c.a.createElement("input",{type:"text",className:"input creact-exact-input",name:"input",autoComplete:"off",defaultValue:l.input})),c.a.createElement("label",{className:"creact-exact-checkbox-container"},c.a.createElement("input",{type:"checkbox",className:"checkbox-input",name:"caseSensitive",defaultChecked:l.caseSensitive}),c.a.createElement("div",{className:"checkbox creact-exact-checkbox"},c.a.createElement("div",{className:"checkbox-tick"})),c.a.createElement("span",null,"Case sensitive"))):null}(o)))}function v({value:e,handleChange:t}){return c.a.createElement("div",{className:"deck-form-card-notes-container"},c.a.createElement("div",{className:"deck-form-field-title"},"NOTES"),c.a.createElement("textarea",{className:"input deck-form-card-notes-input",value:e,onChange:e=>t(e,"notes","value")}))}function g({index:e,card:t,removeCard:a}){const{state:i,dispatch:l}=r(),[s,o]=Object(n.useState)(t.notes&&!!t.notes.value);function u({target:a},n,c){const{value:i}=a;i!==t[n][c]&&l({type:"UPDATE_CARD_VALUE",index:e,name:n,key:c,value:i})}return c.a.createElement("li",{className:"create-list-item"},c.a.createElement("div",{className:"create-card-index"},e+1,"."),c.a.createElement("div",{className:"deck-form-field-group create-card"},c.a.createElement(h,{index:e,side:t.front,handleChange:u}),c.a.createElement(b,{index:e,handleChange:u}),s&&c.a.createElement(v,{value:t.notes.value,handleChange:u})),c.a.createElement("div",{className:"create-card-btns"},c.a.createElement("button",{className:"btn btn-icon",title:"Toggle notes",onClick:function(){o(!s)}},c.a.createElement(m.a,{name:"notes"})),i.cards.length>1&&c.a.createElement("button",{className:"btn btn-icon",title:"Remove card",onClick:()=>a(e)},c.a.createElement(m.a,{name:"remove"}))))}function x(e){const{state:t,dispatch:a}=r(),[l,s]=Object(n.useState)(""),[o,m]=Object(n.useState)([]),d=Object(n.useRef)();let p=0,E=0;function f(){return{id:Object(i.a)(),front:{text:"",textSize:16},back:{type:"text",text:"",textSize:16,input:"",correct:0,options:[{id:Object(i.a)()},{id:Object(i.a)()}]},notes:{value:""}}}function h(e){const n=t.cards[e];(b(n.front)||v(n.back)||n.notes.value)&&m([...o,n]),a({type:"REMOVE_CARD",index:e})}function b(e){return e.text||e.attachment}function v(e){if("text"===e.type)return e.text.length>0;if("exact"===e.type)return e.input.length>0;return e.options.reduce((e,{text:t})=>(t&&(e+=1),e),0)>1}function x({target:e}){const{name:t,value:n}=e;a({type:"UPDATE_DECK",name:t,value:n})}return Object(n.useEffect)(()=>{const{id:t}=e.match.params;if(t&&!e.location.state)Object(u.b)().then(e=>{const n=function(e,t){return e.find(({id:e})=>e===t)}(e,t);n&&(n.cards=n.cards.map(e=>Object.assign({},f(),{},e)),a({type:"RESET_DECK",deck:n}))});else{const t=function(e={}){return Object.assign({id:Object(i.a)(),title:"",description:"",cards:[f()]},e)}(e.location.state);t.cards=t.cards.map(e=>Object.assign({},f(),{},e)),a({type:"RESET_DECK",deck:t})}},[]),Object(n.useEffect)(()=>(clearTimeout(p),p=setTimeout(()=>{s("")},3200),()=>{clearTimeout(p)}),[l]),Object(n.useEffect)(()=>(clearTimeout(E),o.length>0&&(E=setTimeout(()=>{m([])},8e3)),()=>{clearTimeout(E)}),[o.length]),c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"deck-form-field-group"},c.a.createElement("label",null,c.a.createElement("div",{className:"deck-form-field-title"},"TITLE"),c.a.createElement("input",{className:"input create-title-input",name:"title",value:t.title,onChange:x})),c.a.createElement("label",null,c.a.createElement("div",{className:"deck-form-field-title"},"DESCRIPTION (OPTIONAL)"),c.a.createElement("textarea",{className:"input create-description-input",name:"description",value:t.description,onChange:x}))),c.a.createElement("ul",null,t.cards.map((e,t)=>c.a.createElement(g,{key:e.id,index:t,card:e,removeCard:h}))),o.length>0&&c.a.createElement("div",{className:"deck-form-dialog"},c.a.createElement("span",null,"Removed ",o.length," card",o.length>1?"s":""),c.a.createElement("button",{className:"btn btn-text",onClick:function(){clearTimeout(E),m([]),a({type:"RESET_DECK",deck:Object.assign({},t,{cards:t.cards.concat(o)})})}},"UNDO")),c.a.createElement("div",{className:"container-footer create-footer"},c.a.createElement("button",{className:"btn",onClick:function(){const e=t.cards[t.cards.length-1],n=f();e&&(n.front.textSize=e.front.textSize,n.back.textSize=e.back.textSize,n.back.type=e.back.type),a({type:"ADD_CARD",card:n}),requestAnimationFrame(()=>{d.current.scrollIntoView()})},ref:d},"New Card"),l&&c.a.createElement("span",{className:"create-message"},l),c.a.createElement("button",{className:"btn",onClick:function(){if(!t.title)return void s("Title is required");(function(e){let t=0;for(const{front:a,back:n}of e)b(a)&&v(n)&&(t+=1);if(t!==e.length)s("Please fill in both card sides");else{if(!(t<2))return!0;s("Please fill in at least two cards")}})(t.cards)&&(t.cards=t.cards.map(e=>"multi"===e.back.type?(e.back.text="",e.back.input="",e.back.caseSensitive=!1,e.back.options=e.back.options.filter(({text:e})=>e),e):(e.back.correct=0,e.back.options=e.back.options.slice(0,2).map(e=>(e.text="",e)),"text"===e.back.type?(e.back.input="",e.back.caseSensitive=!1):"exact"===e.back.type&&(e.back.input=e.back.input.trim(),e.back.text=""),e)),e.history.push({pathname:"/decks",state:t}))}},"Create")))}function N(e){return c.a.createElement(s,null,c.a.createElement(x,e))}a.d(t,"default",(function(){return N}))}}]);