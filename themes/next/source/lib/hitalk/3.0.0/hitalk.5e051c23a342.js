var Hitalk=(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:`Module`});
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
let t=globalThis,n=e=>e,r=t.trustedTypes,i=r?r.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,a=`$lit$`,o=`lit$${Math.random().toFixed(9).slice(2)}$`,s=`?`+o,c=`<${s}>`,l=t.document===void 0?{createTreeWalker:()=>({})}:document,u=()=>l.createComment(``),d=e=>e===null||typeof e!=`object`&&typeof e!=`function`,f=Array.isArray,p=e=>f(e)||typeof e?.[Symbol.iterator]==`function`,m=`[ 	
\f\r]`,h=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,g=/-->/g,_=/>/g,v=RegExp(`>|${m}(?:([^\\s"'>=/]+)(${m}*=${m}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),ee=/'/g,te=/"/g,ne=/^(?:script|style|textarea|title)$/i,y=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),b=Symbol.for(`lit-noChange`),x=Symbol.for(`lit-nothing`),re=/* @__PURE__ */ new WeakMap,S=l.createTreeWalker(l,129);function ie(e,t){if(!f(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return i===void 0?t:i.createHTML(t)}let ae=(e,t)=>{let n=e.length-1,r=[],i,s=t===2?`<svg>`:t===3?`<math>`:``,l=h;for(let t=0;t<n;t++){let n=e[t],u,d,f=-1,p=0;for(;p<n.length&&(l.lastIndex=p,d=l.exec(n),d!==null);)p=l.lastIndex,l===h?d[1]===`!--`?l=g:d[1]===void 0?d[2]===void 0?d[3]!==void 0&&(l=v):(ne.test(d[2])&&(i=RegExp(`</`+d[2],`g`)),l=v):l=_:l===v?d[0]===`>`?(l=i??h,f=-1):d[1]===void 0?f=-2:(f=l.lastIndex-d[2].length,u=d[1],l=d[3]===void 0?v:d[3]===`"`?te:ee):l===te||l===ee?l=v:l===g||l===_?l=h:(l=v,i=void 0);let m=l===v&&e[t+1].startsWith(`/>`)?` `:``;s+=l===h?n+c:f>=0?(r.push(u),n.slice(0,f)+a+n.slice(f)+o+m):n+o+(f===-2?t:m)}return[ie(e,s+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]};var C=class e{constructor({strings:t,_$litType$:n},i){let c;this.parts=[];let l=0,d=0,f=t.length-1,p=this.parts,[m,h]=ae(t,n);if(this.el=e.createElement(m,i),S.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(c=S.nextNode())!==null&&p.length<f;){if(c.nodeType===1){if(c.hasAttributes())for(let e of c.getAttributeNames())if(e.endsWith(a)){let t=h[d++],n=c.getAttribute(e).split(o),r=/([.?@])?(.*)/.exec(t);p.push({type:1,index:l,name:r[2],strings:n,ctor:r[1]===`.`?oe:r[1]===`?`?se:r[1]===`@`?ce:D}),c.removeAttribute(e)}else e.startsWith(o)&&(p.push({type:6,index:l}),c.removeAttribute(e));if(ne.test(c.tagName)){let e=c.textContent.split(o),t=e.length-1;if(t>0){c.textContent=r?r.emptyScript:``;for(let n=0;n<t;n++)c.append(e[n],u()),S.nextNode(),p.push({type:2,index:++l});c.append(e[t],u())}}}else if(c.nodeType===8){if(c.data===s)p.push({type:2,index:l});else{let e=-1;for(;(e=c.data.indexOf(o,e+1))!==-1;)p.push({type:7,index:l}),e+=o.length-1}}l++}}static createElement(e,t){let n=l.createElement(`template`);return n.innerHTML=e,n}};function w(e,t,n=e,r){if(t===b)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=d(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=w(e,i._$AS(e,t.values),i,r)),t}var T=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??l).importNode(t,!0);S.currentNode=r;let i=S.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new E(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new le(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=S.nextNode(),a++)}return S.currentNode=l,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},E=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=x,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=w(this,e,t),d(e)?e===x||e==null||e===``?(this._$AH!==x&&this._$AR(),this._$AH=x):e!==this._$AH&&e!==b&&this._(e):e._$litType$===void 0?e.nodeType===void 0?p(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==x&&d(this._$AH)?this._$AA.nextSibling.data=e:this.T(l.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=C.createElement(ie(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new T(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=re.get(e.strings);return t===void 0&&re.set(e.strings,t=new C(e)),t}k(t){f(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(u()),this.O(u()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=n(e).nextSibling;n(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},D=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=x,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(/* @__PURE__ */ new String),this.strings=n):this._$AH=x}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=w(this,e,t,0),a=!d(e)||e!==this._$AH&&e!==b,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=w(this,r[n+o],t,o),s===b&&(s=this._$AH[o]),a||=!d(s)||s!==this._$AH[o],s===x?e=x:e!==x&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===x?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},oe=class extends D{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===x?void 0:e}},se=class extends D{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==x)}},ce=class extends D{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=w(this,e,t,0)??x)===b)return;let n=this._$AH,r=e===x&&n!==x||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==x&&(n===x||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},le=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){w(this,e)}};let ue={M:a,P:o,A:s,C:1,L:ae,R:T,D:p,V:w,I:E,H:D,N:se,U:ce,B:oe,F:le},de=t.litHtmlPolyfillSupport;de?.(C,E),(t.litHtmlVersions??=[]).push(`3.3.3`);let O=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new E(t.insertBefore(u(),e),e,void 0,n??{})}return i._$AI(e),i},{I:fe}=ue,pe=e=>e,me=e=>e.strings===void 0,he=()=>document.createComment(``),k=(e,t,n)=>{
/**
* @license
* Copyright 2020 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
let r=e._$AA.parentNode,i=t===void 0?e._$AB:t._$AA;if(n===void 0){let t=r.insertBefore(he(),i),a=r.insertBefore(he(),i);n=new fe(t,a,e,e.options)}else{let t=n._$AB.nextSibling,a=n._$AM,o=a!==e;if(o){let t;n._$AQ?.(e),n._$AM=e,n._$AP!==void 0&&(t=e._$AU)!==a._$AU&&n._$AP(t)}if(t!==i||o){let e=n._$AA;for(;e!==t;){let t=pe(e).nextSibling;pe(r).insertBefore(e,i),e=t}}}return n},A=(e,t,n=e)=>(e._$AI(t,n),e),ge={},_e=(e,t=ge)=>e._$AH=t,ve=e=>e._$AH,j=e=>{e._$AR(),e._$AA.remove()},M={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},N=e=>(...t)=>({_$litDirective$:e,values:t})
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
;var P=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/let F=(e,t)=>{let n=e._$AN;if(n===void 0)return!1;for(let e of n)e._$AO?.(t,!1),F(e,t);return!0},I=e=>{let t,n;do{if((t=e._$AM)===void 0)break;n=t._$AN,n.delete(e),e=t}while(n?.size===0)},ye=e=>{for(let t;t=e._$AM;e=t){let n=t._$AN;if(n===void 0)t._$AN=n=/* @__PURE__ */ new Set;else if(n.has(e))break;n.add(e),Se(t)}};function be(e){this._$AN===void 0?this._$AM=e:(I(this),this._$AM=e,ye(this))}function xe(e,t=!1,n=0){let r=this._$AH,i=this._$AN;if(i!==void 0&&i.size!==0){if(t){if(Array.isArray(r))for(let e=n;e<r.length;e++)F(r[e],!1),I(r[e]);else r!=null&&(F(r,!1),I(r))}else F(this,e)}}let Se=e=>{e.type==M.CHILD&&(e._$AP??=xe,e._$AQ??=be)};var Ce=class extends P{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,n){super._$AT(e,t,n),ye(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(F(this,e),I(this))}setValue(e){if(me(this._$Ct))this._$Ct._$AI(e,this);else{let t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}};
/**
* @license
* Copyright 2020 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/let L=()=>new we;var we=class{};let R=/* @__PURE__ */ new WeakMap,z=N(class extends Ce{render(e){return x}update(e,[t]){let n=t!==this.G;return n&&this.rt(void 0),(n||this.lt!==this.ct)&&(this.G=t,this.ht=e.options?.host,this.rt(this.ct=e.element)),x}rt(e){if(this.G!==void 0){if(this.isConnected||(e=void 0),typeof this.G==`function`){let t=this.ht??globalThis,n=R.get(t);n===void 0&&(n=/* @__PURE__ */ new WeakMap,R.set(t,n)),n.get(this.G)!==void 0&&this.G.call(this.ht,void 0),n.set(this.G,e),e!==void 0&&this.G.call(this.ht,e)}else this.G.value=e}}get lt(){return typeof this.G==`function`?R.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),Te={lang:void 0,message:void 0,abortEarly:void 0,abortPipeEarly:void 0};/* @__NO_SIDE_EFFECTS__ */
function Ee(e){return e?{lang:e?.lang??void 0,message:e?.message,abortEarly:e?.abortEarly??void 0,abortPipeEarly:e?.abortPipeEarly??void 0}:Te}/* @__NO_SIDE_EFFECTS__ */
function De(e){let t=typeof e;return t===`string`?`"${e}"`:t===`number`||t===`bigint`||t===`boolean`?`${e}`:t===`object`||t===`function`?(e&&Object.getPrototypeOf(e)?.constructor?.name)??`null`:t}function B(e,t,n,r,i){let a=i&&`input`in i?i.input:n.value,o=i?.expected??e.expects??null,s=i?.received??/* @__PURE__ */ De(a),c={kind:e.kind,type:e.type,input:a,expected:o,received:s,message:`Invalid ${t}: ${o?`Expected ${o} but r`:`R`}eceived ${s}`,requirement:e.requirement,path:i?.path,issues:i?.issues,lang:r.lang,abortEarly:r.abortEarly,abortPipeEarly:r.abortPipeEarly},l=e.kind===`schema`,u=i?.message??e.message??(e.reference,c.lang,void 0)??(l?(c.lang,void 0):null)??r.message??(c.lang,void 0);u!==void 0&&(c.message=typeof u==`function`?u(c):u),l&&(n.typed=!1),n.issues?n.issues.push(c):n.issues=[c]}function V(e){return e[`~standard`]={version:1,vendor:`valibot`,validate:t=>e[`~run`]({value:t},/* @__PURE__ */ Ee())},e}let Oe=/^[\w+-]+(?:\.[\w+-]+)*@[\da-zA-Z]+(?:[.-][\da-zA-Z]+)*\.[a-zA-Z]{2,}$/u;/* @__NO_SIDE_EFFECTS__ */
function H(e,t){return{kind:`validation`,type:`check`,reference:H,async:!1,expects:null,requirement:e,message:t,"~run"(e,t){return e.typed&&!this.requirement(e.value)&&B(this,`input`,e,t),e}}}/* @__NO_SIDE_EFFECTS__ */
function ke(e){return{kind:`validation`,type:`email`,reference:ke,expects:null,async:!1,requirement:Oe,message:e,"~run"(e,t){return e.typed&&!this.requirement.test(e.value)&&B(this,`email`,e,t),e}}}/* @__NO_SIDE_EFFECTS__ */
function U(e,t){return{kind:`validation`,type:`max_length`,reference:U,async:!1,expects:`<=${e}`,requirement:e,message:t,"~run"(e,t){return e.typed&&e.value.length>this.requirement&&B(this,`length`,e,t,{received:`${e.value.length}`}),e}}}/* @__NO_SIDE_EFFECTS__ */
function Ae(e,t){return{kind:`validation`,type:`min_length`,reference:Ae,async:!1,expects:`>=${e}`,requirement:e,message:t,"~run"(e,t){return e.typed&&e.value.length<this.requirement&&B(this,`length`,e,t,{received:`${e.value.length}`}),e}}}/* @__NO_SIDE_EFFECTS__ */
function W(e){return{kind:`transformation`,type:`transform`,reference:W,async:!1,operation:e,"~run"(e){return e.value=this.operation(e.value),e}}}/* @__NO_SIDE_EFFECTS__ */
function G(){return{kind:`transformation`,type:`trim`,reference:G,async:!1,"~run"(e){return e.value=e.value.trim(),e}}}/* @__NO_SIDE_EFFECTS__ */
function je(e){return{kind:`validation`,type:`url`,reference:je,async:!1,expects:null,requirement(e){try{return URL.canParse?URL.canParse(e):(new URL(e),!0)}catch{return!1}},message:e,"~run"(e,t){return e.typed&&!this.requirement(e.value)&&B(this,`URL`,e,t),e}}}let Me={abortEarly:!0};/* @__NO_SIDE_EFFECTS__ */
function Ne(e,t,n){return typeof e.default==`function`?e.default(t,n):e.default}/* @__NO_SIDE_EFFECTS__ */
function Pe(e,t){return!e[`~run`]({value:t},Me).issues}/* @__NO_SIDE_EFFECTS__ */
function Fe(e,t){return V({kind:`schema`,type:`optional`,reference:Fe,expects:`(${e.expects} | undefined)`,async:!1,wrapped:e,default:t,"~run"(e,t){return e.value===void 0&&(this.default!==void 0&&(e.value=/* @__PURE__ */ Ne(this,e,t)),e.value===void 0)?(e.typed=!0,e):this.wrapped[`~run`](e,t)}})}/* @__NO_SIDE_EFFECTS__ */
function K(e){return V({kind:`schema`,type:`string`,reference:K,expects:`string`,async:!1,message:e,"~run"(e,t){return typeof e.value==`string`?e.typed=!0:B(this,`type`,e,t),e}})}/* @__NO_SIDE_EFFECTS__ */
function q(...e){return V({...e[0],pipe:e,"~run"(t,n){for(let r of e)if(r.kind!==`metadata`){if(t.issues&&(r.kind===`schema`||r.kind===`transformation`)){t.typed=!1;break}(!t.issues||!n.abortEarly&&!n.abortPipeEarly)&&(t=r[`~run`](t,n))}return t}})}/* @__NO_SIDE_EFFECTS__ */
function Ie(e,t,n){let r=e[`~run`]({value:t},/* @__PURE__ */ Ee(n));return{typed:r.typed,success:!r.issues,output:r.value,issues:r.issues}}let J=(e,t)=>/* @__PURE__ */ q(/* @__PURE__ */ K(`${e} 必须是字符串`),/* @__PURE__ */ G(),/* @__PURE__ */ Ae(1,`${e} 不能为空`),/* @__PURE__ */ U(t,`${e} 过长`)),Le=(e,t)=>/* @__PURE__ */ Fe(/* @__PURE__ */ q(/* @__PURE__ */ K(`${e} 必须是字符串`),/* @__PURE__ */ G(),/* @__PURE__ */ U(t,`${e} 过长`),/* @__PURE__ */ W(e=>e||void 0))),Re=/* @__PURE__ */ q(J(`path`,1024),/* @__PURE__ */ H(e=>e.startsWith(`/`)&&!e.startsWith(`//`)&&!/[\s?#\\]/u.test(e),`path 必须是以 / 开头、不含查询参数或片段的页面路径`),/* @__PURE__ */ W(e=>e.replace(/\/index\.html?$/,`/`))),ze=/* @__PURE__ */ q(J(`邮箱`,254),/* @__PURE__ */ ke(`邮箱格式不正确`)),Be=/* @__PURE__ */ q(J(`网址`,2048),/* @__PURE__ */ je(`网址格式不正确`),/* @__PURE__ */ H(e=>{try{let t=new URL(e);return[`http:`,`https:`].includes(t.protocol)&&!t.username&&!t.password}catch{return!1}},`网址只允许不含用户名和密码的 HTTP/HTTPS 地址`));J(`昵称`,80),J(`评论`,2e4),Le(`title`,200),Le(`reply_to_id`,128);let Ve=e=>/* @__PURE__ */ Ie(Re,e);function Y(e){let t=Ve(e);if(!t.success)throw Error(t.issues[0].message);return t.output}let He=e=>/* @__PURE__ */ Pe(ze,e),Ue=e=>/* @__PURE__ */ Pe(Be,e);var We=class{key;constructor(e){this.key=`hitalk:identity:${e}`}read(){try{let e=localStorage.getItem(this.key);return e&&/^ht_[A-Za-z0-9_-]{43}$/.test(e)?e:null}catch{return null}}async ensure(){return navigator.locks.request(this.key,()=>{let e=this.read();if(e)return e;let t=crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(32)),n=`ht_`+btoa(String.fromCharCode(...t)).replace(/\+/g,`-`).replace(/\//g,`_`).replace(/=+$/,``);try{if(localStorage.setItem(this.key,n),localStorage.getItem(this.key)!==n)throw Error(`storage`)}catch{throw Error(`浏览器无法保存身份，请允许站点存储后重试`)}return n})}},X=class extends Error{code;status;retryAfter;constructor(e,t,n,r=null){super(e),this.code=t,this.status=n,this.retryAfter=r}},Ge=class{baseURL;identity;controllers=/* @__PURE__ */ new Set;destroyed=!1;constructor(e){if(!e)throw Error(`Hitalk: 缺少 server 配置`);let t=new URL(e,globalThis.location?.href);if(![`https:`,`http:`].includes(t.protocol)||t.username||t.password||t.search||t.hash)throw Error(`Hitalk: API 地址无效`);if(t.protocol===`http:`&&![`localhost`,`127.0.0.1`,`[::1]`].includes(t.hostname))throw Error(`Hitalk: API 必须使用 HTTPS`);this.baseURL=t.href.replace(/\/+$/,``),this.identity=new We(this.baseURL)}async request(e,t={},n=!1){if(this.destroyed)throw Error(`Hitalk instance has been destroyed`);let r=this.identity.read();if(n)try{r=await this.identity.ensure()}catch(e){throw new X(e instanceof Error?e.message:`无法保存匿名身份`,`IDENTITY_STORAGE`,0)}if(this.destroyed)throw Error(`Hitalk instance has been destroyed`);let i=new AbortController;this.controllers.add(i);let a=setTimeout(()=>i.abort(),15e3);try{let n=new Headers(t.headers);r&&n.set(`Authorization`,`Bearer ${r}`);let a=await fetch(this.baseURL+e,{...t,signal:i.signal,headers:n}),o;try{o=await a.json()}catch{throw new X(`服务器响应无效 (${a.status})`,`INVALID_RESPONSE`,a.status)}if(!a.ok)throw new X(typeof o.message==`string`?o.message:`请求失败`,typeof o.code==`string`?o.code:`REQUEST_FAILED`,a.status,a.headers.has(`Retry-After`)?Number(a.headers.get(`Retry-After`)):null);return o}finally{clearTimeout(a),this.controllers.delete(i)}}fetchComments(e,t=null,n=10){return this.request(`/comments?path=${encodeURIComponent(e)}&limit=${n}${t?`&cursor=${encodeURIComponent(t)}`:``}`)}fetchReplies(e,t){return this.request(`/threads/${encodeURIComponent(e)}/replies?cursor=${encodeURIComponent(t)}`)}pendingComments(e){return this.request(`/me/comments?path=${encodeURIComponent(e)}&status=pending`)}context(e){return this.request(`/comments/${encodeURIComponent(e)}/context`)}createComment(e){return this.request(`/comments`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(e)},!0)}likeComment(e,t){return this.request(`/comments/${encodeURIComponent(e)}/like`,{method:t?`PUT`:`DELETE`},!0)}deleteComment(e){return this.request(`/comments/${encodeURIComponent(e)}`,{method:`DELETE`},!0)}getCommentCounts(e){return this.request(`/comments/count?${e.map(e=>`paths[]=${encodeURIComponent(e)}`).join(`&`)}`)}destroy(){this.destroyed=!0,this.controllers.forEach(e=>e.abort()),this.controllers.clear()}},Ke=class{key;comments=[];userInfo=null;replyTarget=null;listeners=/* @__PURE__ */ new Set;constructor(e){this.key=e;try{let t=JSON.parse(localStorage.getItem(e)||`null`);t&&typeof t==`object`&&`nick`in t&&typeof t.nick==`string`&&`email`in t&&typeof t.email==`string`&&`website`in t&&typeof t.website==`string`&&(this.userInfo={nick:t.nick,email:t.email,website:t.website})}catch{}}subscribe(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}setComments(e){this.comments=e.map(e=>({...e,replies:e.replies?[...e.replies].sort((e,t)=>e.sequence-t.sequence):void 0})).sort((e,t)=>Number(t.is_pinned)-Number(e.is_pinned)||t.sequence-e.sequence),this.listeners.forEach(e=>e())}getComments(){return this.comments}find(e){return this.comments.flatMap(e=>[e,...e.replies||[]]).find(t=>t.id===e)}patch(e,t){this.setComments(this.comments.map(n=>n.id===e?{...n,...t}:{...n,replies:n.replies?.map(n=>n.id===e?{...n,...t}:n)}))}markDeleted(e){let t=this.find(e),n=t=>({...t,...t.id===e?{deleted:!0,nick:`评论已删除`,content_html:``,website:void 0,avatar_hash:``,client:void 0,can_delete:!1,can_reply:!1,liked:!1,like_count:0,is_pinned:!1}:{},...t.reply_to?.id===e?{reply_to:{id:e,nick:`评论不可用`,available:!1}}:{}});this.setComments(this.comments.map(e=>{let r={...n(e),replies:e.replies?.map(n)};return t?.root_id===e.id&&!t.deleted&&t.status===`published`&&(r.reply_count=Math.max(0,(e.reply_count||0)-1)),r}).filter(e=>!e.deleted||(e.reply_count||0)>0||e.replies?.some(e=>!e.deleted&&e.status===`published`)))}upsert(e){if(!e.root_id){let t=this.comments.some(t=>t.id===e.id);this.setComments(t?this.comments.map(t=>t.id===e.id?{...t,...e}:t):[e,...this.comments]);return}this.setComments(this.comments.map(t=>t.id===e.root_id?{...t,replies:[...new Map([...t.replies||[],e].map(e=>[e.id,e])).values()]}:t))}setUserInfo(e){this.userInfo=e;try{localStorage.setItem(this.key,JSON.stringify(e))}catch{}}getUserInfo(){return this.userInfo}setReplyTarget(e){this.replyTarget=e}getReplyTarget(){return this.replyTarget}};let Z=Object.entries({泡泡:`呵呵|哈哈|吐舌|太开心|笑眼|花心|小乖|乖|捂嘴笑|滑稽|你懂的|不高兴|怒|汗|黑线|泪|真棒|喷|惊哭|阴险|鄙视|酷|啊|狂汗|what|疑问|酸爽|呀咩爹|委屈|惊讶|睡觉|笑尿|挖鼻|吐|犀利|小红脸|懒得理|勉强|爱心|心碎|玫瑰|礼物|彩虹|太阳|星星月亮|钱币|茶杯|蛋糕|大拇指|胜利|haha|OK|沙发|手纸|香蕉|便便|药丸|红领巾|蜡烛|音乐|灯泡|开心|钱|咦|呼|冷|生气|弱`,阿鲁:`高兴|小怒|脸红|内伤|装大款|赞一个|害羞|汗|吐血倒地|深思|不高兴|无语|亲亲|口水|尴尬|中指|想一想|哭泣|便便|献花|皱眉|傻笑|狂汗|吐|喷水|看不见|鼓掌|阴暗|长草|献黄瓜|邪恶|期待|得意|吐舌|喷血|无所谓|观察|暗地观察|肿包|中枪|大囧|呲牙|抠鼻|不说话|咽气|欢呼|锁眉|蜡烛|坐等|击掌|惊喜|喜极而泣|抽烟|不出所料|愤怒|无奈|黑线|投降|看热闹|扇耳光|小眼睛|中刀`}).map(([e,t],n)=>({name:e,index:n,emojis:t.split(`|`),prefix:e===`泡泡`?`@`:`#`,className:e===`泡泡`?`newpaopao`:`alu`}));function qe(e,t,n){return y`<div class="smiles-body">
    ${Z.map(t=>y`
        <ul
          class="smiles-items smiles-items-${t.className}${e===t.index?` smiles-items-show`:``}"
          data-id=${t.index}
        >
          ${t.emojis.map(e=>y`
              <li>
                <button
                  type="button"
                  class="smiles-item"
                  title=${e}
                  data-input=${`${t.prefix}(${e})`}
                  @click=${()=>n(`${t.prefix}(${e})`)}
                >
                  <img
                    class="biaoqing ${t.className}"
                    title=${e}
                    src=${`https://cdn.ihoey.com/${t.className}/${e}@2x.png`}
                    alt=${e}
                  />
                </button>
              </li>
            `)}
        </ul>
      `)}
    <div class="smiles-bar">
      <ul class="smiles-packages">
        ${Z.map(n=>y`
            <li>
              <button
                type="button"
                aria-pressed=${String(e===n.index)}
                class="smiles-name${e===n.index?` smiles-package-active`:``}"
                data-id=${n.index}
                @click=${()=>t(n.index)}
              >
                <span>${n.name}</span>
              </button>
            </li>
          `)}
      </ul>
    </div>
  </div>`}var Je=class{container;userInfo;placeholder;onSubmit;onCancel;guestFields;onProfileChange;events=new AbortController;submitting=!1;replyNick=null;emojiOpen=!1;emojiCategory=0;editingProfile=!0;constructor(e,t,n,r,i,a,o){this.container=e,this.userInfo=t,this.placeholder=n,this.onSubmit=r,this.onCancel=i,this.guestFields=a,this.onProfileChange=o,this.editingProfile=!this.validProfile(t),this.render(),e.ownerDocument.body.addEventListener(`mouseup`,e=>{this.emojiOpen&&!this.container.querySelector(`.vemoji`)?.contains(e.target)&&(this.emojiOpen=!1,this.render())},{signal:this.events.signal})}snapshot(){let e=e=>this.container.querySelector(e)?.value||``;return{nick:e(`.vnick`),email:e(`.vmail`),website:e(`.vlink`),content:e(`.veditor`),notify:this.container.querySelector(`.vnotify`)?.checked||!1}}restore(e){for(let[t,n]of Object.entries({nick:`.vnick`,email:`.vmail`,website:`.vlink`,content:`.veditor`})){let r=this.container.querySelector(n),i=e[t];r&&typeof i==`string`&&(r.value=i)}let t=this.container.querySelector(`.vnotify`);t&&(t.checked=e.notify===!0);let n=this.snapshot();this.guestFields.some(e=>n[e].trim()!==(this.userInfo?.[e]||``).trim())&&(this.editingProfile=!0,this.render())}validProfile(e){return!!(this.guestFields.includes(`nick`)&&e?.nick.trim()&&e.nick.trim().length<=80&&(!this.guestFields.includes(`email`)||!e.email.trim()||He(e.email.trim()))&&(!this.guestFields.includes(`website`)||!e.website.trim()||Ue(e.website.trim())))}saveProfile(e){this.userInfo={nick:e.nick.trim(),email:e.email.trim(),website:e.website.trim()},this.editingProfile=!this.validProfile(this.userInfo),this.render(),this.onProfileChange(this.userInfo)}finishProfile(){if(this.submitting||!this.editingProfile)return;let e=this.snapshot();this.validProfile(e)&&this.saveProfile(e)}render(){O(y`<div class="vwrap">
        <div class="vprofile" ?hidden=${this.editingProfile}>
          <span class="vprofile-nick">${this.userInfo?.nick}</span>
          <button
            class="vprofile-edit"
            type="button"
            aria-label="编辑个人信息"
            ?disabled=${this.submitting}
            @click=${()=>{this.editingProfile=!0,this.render(),this.container.querySelector(`.vnick`)?.focus()}}
          >
            编辑
          </button>
        </div>
        <div class="vheader" ?hidden=${!this.editingProfile}>
          ${this.guestFields.map(e=>y`<input name=${e} type=${e===`email`?`email`:e===`website`?`url`:`text`} class=${`vinput ${e===`nick`?`vnick`:e===`email`?`vmail`:`vlink`}`} aria-label=${e===`nick`?`昵称`:e===`email`?`邮箱`:`网址`} placeholder=${e===`nick`?`昵称`:e===`email`?`邮箱（可选）`:`网址（可选）`} .value=${this.userInfo?.[e]||``} ?disabled=${this.submitting} />`)}
        </div>
        ${this.replyNick?y`<div class="vreplying">回复 @${this.replyNick} <button type="button" ?disabled=${this.submitting} @click=${this.onCancel}>取消回复</button></div>`:x}
        <textarea
          class="vinput veditor"
          name="content"
          aria-label="评论内容"
          placeholder=${this.placeholder}
          .readOnly=${this.submitting}
          @focus=${()=>this.finishProfile()}
        ></textarea>
        <div class="vcontrol">
          <div class="vemoji">
            <button
              type="button"
              aria-label="插入表情"
              aria-expanded=${String(this.emojiOpen)}
              ?disabled=${this.submitting}
              @click=${()=>{this.emojiOpen=!this.emojiOpen,this.render()}}
            >
              😊</button
            >${this.emojiOpen?qe(this.emojiCategory,e=>{this.emojiCategory=e,this.render()},e=>{let t=this.container.querySelector(`.veditor`);t.value+=` ${e} `,t.focus(),this.emojiOpen=!1,this.render()}):x}
          </div>
          ${this.guestFields.includes(`email`)?y`<label><input type="checkbox" name="notify" class="vnotify" ?disabled=${this.submitting} />有回复时邮件通知</label>`:x}
          <button
            class="vbtn vsubmit"
            type="button"
            ?disabled=${this.submitting}
            @click=${()=>{this.submitting||this.onSubmit(this.snapshot())}}
          >
            ${this.submitting?`发送中…`:`发送`}
          </button>
        </div>
      </div>`,this.container)}setReply(e){this.replyNick=e,this.render()}focus(){this.container.querySelector(`.veditor`)?.focus({preventScroll:!0})}setSubmitting(e){this.submitting=e,this.render()}clear(){this.container.querySelector(`.veditor`).value=``}destroy(){this.events.abort(),O(x,this.container).setConnected(!1),this.container.remove()}};
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
let Ye=(e,t,n)=>{let r=/* @__PURE__ */ new Map;for(let i=t;i<=n;i++)r.set(e[i],i);return r},Xe=N(class extends P{constructor(e){if(super(e),e.type!==M.CHILD)throw Error(`repeat() can only be used in text expressions`)}dt(e,t,n){let r;n===void 0?n=t:t!==void 0&&(r=t);let i=[],a=[],o=0;for(let t of e)i[o]=r?r(t,o):o,a[o]=n(t,o),o++;return{values:a,keys:i}}render(e,t,n){return this.dt(e,t,n).values}update(e,[t,n,r]){let i=ve(e),{values:a,keys:o}=this.dt(t,n,r);if(!Array.isArray(i))return this.ut=o,a;let s=this.ut??=[],c=[],l,u,d=0,f=i.length-1,p=0,m=a.length-1;for(;d<=f&&p<=m;)if(i[d]===null)d++;else if(i[f]===null)f--;else if(s[d]===o[p])c[p]=A(i[d],a[p]),d++,p++;else if(s[f]===o[m])c[m]=A(i[f],a[m]),f--,m--;else if(s[d]===o[m])c[m]=A(i[d],a[m]),k(e,c[m+1],i[d]),d++,m--;else if(s[f]===o[p])c[p]=A(i[f],a[p]),k(e,i[d],i[f]),f--,p++;else if(l===void 0&&(l=Ye(o,p,m),u=Ye(s,d,f)),l.has(s[d])){if(l.has(s[f])){let t=u.get(o[p]),n=t===void 0?null:i[t];if(n===null){let t=k(e,i[d]);A(t,a[p]),c[p]=t}else c[p]=A(n,a[p]),k(e,i[d],n),i[t]=null;p++}else j(i[f]),f--}else j(i[d]),d++;for(;p<=m;){let t=k(e,c[m+1]);A(t,a[p]),c[p++]=t}for(;d<=f;){let e=i[d++];e!==null&&j(e)}return this.ut=o,_e(e,c),b}});
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/var Q=class extends P{constructor(e){if(super(e),this.it=x,e.type!==M.CHILD)throw Error(this.constructor.directiveName+`() can only be used in child bindings`)}render(e){if(e===x||e==null)return this._t=void 0,this.it=e;if(e===b)return e;if(typeof e!=`string`)throw Error(this.constructor.directiveName+`() called with a non-string value`);if(e===this.it)return this._t;this.it=e;let t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};Q.directiveName=`unsafeHTML`,Q.resultType=1;let Ze=N(Q);function Qe(e){try{let t=new URL(e||``);if([`http:`,`https:`].includes(t.protocol)&&!t.username&&!t.password)return t.href}catch{}return`#`}function $e(e){let t=/* @__PURE__ */ new Date,n=new Date(e),r=t.getTime()-n.getTime(),i=Math.floor(r/1e3),a=Math.floor(i/60),o=Math.floor(a/60),s=Math.floor(o/24);return s>7?et(n):s>0?`${s} 天前`:o>0?`${o} 小时前`:a>0?`${a} 分钟前`:`刚刚`}function et(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`}function tt(e,t=`mm`){return`https://gravatar.loli.net/avatar/${/^[a-f0-9]{32}$/.test(e)?e:``}?s=40&d=${encodeURIComponent(t)}`}function nt(e,t,n,r=!1){return y`<li class="vcard" id=${e.id} tabindex="-1">
    ${t===`hide`||e.deleted?x:y`<img class="vimg" src=${tt(e.avatar_hash,t)} alt=${e.nick} />`}
    <section>
      <div class="vhead">
        <a
          href=${Qe(e.website)}
          rel="nofollow noopener noreferrer"
          target="_blank"
          >${e.nick}</a
        >${e.is_pinned?y`<span class="vpin">置顶</span>`:x}${e.is_admin?y`<span class="vbadge">博主</span>`:x}<span
          class="vtime"
          >${$e(e.created_at)}</span
        >${e.client?y`<span class="vua">${[e.client.browser,e.client.os].filter(Boolean).join(` · `)}</span>`:x}
      </div>
      ${e.reply_to?y`<button class="vreply-to" type="button" ?disabled=${!e.reply_to.available} @click=${()=>n.onLocate(e.reply_to.id)}>回复 @${e.reply_to.nick}</button>`:x}
      <div
        class="vcontent"
        @click=${e=>e.currentTarget.classList.remove(`expand`)}
      >
        ${e.deleted?`该评论已删除`:Ze(e.content_html)}
      </div>
      ${e.status!==`published`&&!e.deleted?y`<div class="hitalk-comment-status">${e.status===`pending`?`审核中`:`该评论未公开`}</div>`:x}
      <div class="vmeta">
        ${!e.deleted&&e.status===`published`?y`<button class="vlike" type="button" aria-pressed=${String(e.liked)} @click=${()=>n.onLike(e.id)}>${e.liked?`♥`:`♡`} <span class="vlike-count">${e.like_count}</span></button>`:x}${e.can_reply?y`<button class="vat" type="button" @click=${()=>n.onReply(e.id,e.nick)}>回复</button>`:x}${e.can_delete?y`<button class="vdelete" type="button" @click=${()=>n.onDelete(e.id)}>删除</button>`:x}
      </div>
      <div class="hitalk-reply-slot"></div>
      ${r?x:y`<ul class="vquote">
                ${Xe(e.replies||[],e=>e.id,e=>nt(e,t,n,!0))}
              </ul>
              ${e.reply_cursor?y`<button class="vbtn vmore-replies" ?disabled=${n.isLoading(e.id)} @click=${()=>n.onMore(e.id)}>${n.isLoading(e.id)?`正在加载…`:`查看更多回复（${e.reply_count||0}）`}</button>`:x}`}
    </section>
  </li>`}function rt(e,t,n){return e.length?y`<ul class="vlist">
        ${Xe(e,e=>e.id,e=>nt(e,t,n))}
      </ul>`:y`<div class="vempty">还没有评论哦，快来抢沙发吧！</div>`}var it=class{container;avatarType;actions;measured=/* @__PURE__ */ new WeakMap;constructor(e,t,n){this.container=e,this.avatarType=t,this.actions=n}update(e){O(rt(e,this.avatarType,this.actions),this.container);for(let e of this.container.querySelectorAll(`.vcontent`)){let t=e.innerHTML;this.measured.get(e)!==t&&(e.classList.remove(`expand`),e.offsetHeight>180&&e.classList.add(`expand`),this.measured.set(e,t))}}replySlot(e){return Array.from(this.container.querySelectorAll(`.vcard`)).find(t=>t.id===e)?.querySelector(`:scope > section > .hitalk-reply-slot`)||void 0}locate(e){let t=Array.from(this.container.querySelectorAll(`.vcard`)).find(t=>t.id===e);t&&(t.querySelector(`:scope > section > .vcontent`)?.classList.remove(`expand`),t.focus({preventScroll:!0}),t.scrollIntoView({block:`center`,behavior:`instant`}))}destroy(){O(x,this.container).setConnected(!1)}};let at={info:{title:`提示`,path:`M12 11v6M12 7h.01`},loading:{title:`发送中`,path:`M12 3a9 9 0 0 1 9 9`},success:{title:`操作成功`,path:`m7 12 3 3 7-7`},warning:{title:`请留意`,path:`M12 7v6M12 17h.01`},error:{title:`操作未完成`,path:`m8 8 8 8M16 8l-8 8`}};function ot(e,t){let{title:n,path:r}=at[t];return y`<div
    class="hitalk-feedback"
    data-visible=${!!e}
    data-kind=${t}
  >
    <svg
      class="hitalk-feedback-icon"
      ?hidden=${!e}
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="9"></circle>
      <path d=${r}></path>
    </svg>
    <div
      class="hitalk-status"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <strong class="hitalk-feedback-title" ?hidden=${!e}
        >${n}</strong
      >
      <span class="hitalk-feedback-message">${e}</span>
    </div>
  </div>`}async function st(e,t){if(!e)throw Error(`Hitalk: 缺少 server 配置`);let n=[...new Set(t.map(Y))],r=new Ge(e),i={};try{for(let e=0;e<n.length;e+=50)Object.assign(i,await r.getCommentCounts(n.slice(e,e+50)));return i}finally{r.destroy()}}async function ct({server:e,root:t=document}){let n=Array.from(t.querySelectorAll(`.hitalk-comment-count[data-xid]`),e=>{let t=e.getAttribute(`data-xid`);return{element:e,attribute:t,path:Y(t)}}),r=await st(e,n.map(e=>e.path));for(let{element:e,attribute:t,path:i}of n)e.getAttribute(`data-xid`)===t&&(e.textContent=String(r[i]??0));return r}let $=/* @__PURE__ */ new WeakMap;var lt=class{api;store;editor;commentList;receiptList;receipts=[];receiptContainer=L();container;view;editorContainer;editorHome=L();listContainer=L();unsubscribe;events=new AbortController;path;draftKey;requestKey;pending=null;destroyed=!1;submitting=!1;loading=!1;retry=!1;sequence=0;mutation=0;cursor=null;total=null;enabled=!0;firstLoad=!0;message=``;messageKind=`info`;busyReplies=/* @__PURE__ */ new Set;busyMutations=/* @__PURE__ */ new Set;options;constructor(e,t){let n=typeof e==`string`?document.querySelector(e):e;if(!(n instanceof HTMLElement))throw Error(`Hitalk: 无法找到指定的容器元素`);let r=Y(t.path??location.pathname);if(!Number.isInteger(t.pageSize??10)||(t.pageSize??10)<1||(t.pageSize??10)>20)throw Error(`Hitalk: pageSize 必须为 1–20 的整数`);let i=t.guestFields??[`nick`,`email`,`website`];if(!Array.isArray(i)||i.some(e=>![`nick`,`email`,`website`].includes(e)))throw Error(`Hitalk: guestFields 无效`);this.api=new Ge(t.server),this.path=r,this.options=t,this.draftKey=`hitalk:draft:${this.api.baseURL}:${r}`,this.requestKey=`${this.draftKey}:request`,this.store=new Ke(`hitalk:profile:${this.api.baseURL}`),$.get(n)?.destroy(),this.container=n,n.classList.add(`Hitalk`),this.view=n.ownerDocument.createElement(`div`),this.view.className=`hitalk-root`,n.replaceChildren(this.view),this.shell(),this.editorContainer=n.ownerDocument.createElement(`div`),this.editorContainer.className=`editor-container`,this.editorContainer.hidden=!0,this.editorHome.value.append(this.editorContainer),this.editor=new Je(this.editorContainer,this.store.getUserInfo(),t.placeholder||`说点什么吧…`,e=>{this.submit(e)},()=>this.cancelReply(),[...new Set(i)],e=>{this.store.setUserInfo(e),this.saveDraft()});let a={onReply:(e,t)=>this.reply(e,t),onLike:e=>{this.like(e)},onLocate:e=>{this.locate(e)},onDelete:e=>{this.remove(e)},onMore:e=>{this.moreReplies(e)},isLoading:e=>this.busyReplies.has(e)};this.commentList=new it(this.listContainer.value,t.avatar||`mm`,a),this.receiptList=new it(this.receiptContainer.value,t.avatar||`mm`,a),this.unsubscribe=this.store.subscribe(()=>this.update()),this.restoreDraft(),this.editorContainer.addEventListener(`input`,()=>this.saveDraft(),{signal:this.events.signal}),this.editorContainer.addEventListener(`change`,()=>this.saveDraft(),{signal:this.events.signal}),$.set(n,this),this.refresh()}saveDraft(){try{sessionStorage.setItem(this.draftKey,JSON.stringify({fields:this.editor.snapshot(),reply:this.store.getReplyTarget()}))}catch{}}restoreDraft(){try{let e=JSON.parse(sessionStorage.getItem(this.draftKey)||`null`);e&&typeof e.fields==`object`&&this.editor.restore(e.fields),e?.reply&&typeof e.reply.id==`string`&&typeof e.reply.nick==`string`&&(this.store.setReplyTarget(e.reply),this.editor.setReply(e.reply.nick));let t=JSON.parse(sessionStorage.getItem(this.requestKey)||`null`);t&&typeof t==`object`&&`fingerprint`in t&&typeof t.fingerprint==`string`&&`request`in t&&typeof t.request==`object`&&(this.pending=t)}catch{}}notice(e,t=`info`){this.message=e,this.messageKind=t,this.shell();let n=this.view.querySelector(`.hitalk-feedback`);n?.getAnimations?.().forEach(e=>e.cancel()),e&&!globalThis.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches&&n?.animate?.([{opacity:.6,transform:`translateY(-4px)`},{opacity:1,transform:`translateY(0)`}],{duration:200,easing:`ease-out`})}error(e){return e instanceof X&&e.code===`RATE_LIMITED`?`操作过于频繁，请在 ${e.retryAfter||60} 秒后重试`:e instanceof Error?e.message:`请稍后重试`}async refresh(){this.destroyed||await this.load(!1)}async load(e){let t=++this.sequence,n=this.mutation;this.loading=!0,this.retry=!1,this.shell();try{let r=await this.api.fetchComments(this.path,e?this.cursor:null,this.options.pageSize||10);if(this.destroyed||t!==this.sequence||n!==this.mutation)return;if(!e&&this.api.identity.read())try{let e=await this.api.pendingComments(this.path);if(this.destroyed||t!==this.sequence||n!==this.mutation)return;this.receipts=e.comments.filter(e=>e.status===`pending`&&!e.deleted)}catch(e){e instanceof X&&e.status===401&&(this.receipts=[])}if(this.destroyed||t!==this.sequence||n!==this.mutation)return;this.store.setComments([...new Map([...e?this.store.getComments():r.pinned,...r.comments].map(e=>[e.id,e])).values()]),this.cursor=r.next_cursor,this.total=r.total;let i=this.enabled;if(this.enabled=r.comments_enabled,this.enabled?i||this.notice(`评论已重新开放`):this.notice(`此页面已关闭评论`,`warning`),this.firstLoad){this.firstLoad=!1;let e=location.hash.slice(1),t=this.container.ownerDocument.getElementById(e);/^[A-Za-z0-9_-]{1,128}$/.test(e)&&(!t||t.closest(`.Hitalk`)&&t!==this.container)&&this.locate(e)}}catch(e){!this.destroyed&&t===this.sequence&&(this.retry=!0,this.notice(`加载失败：${this.error(e)}`,`error`))}finally{!this.destroyed&&t===this.sequence&&(this.loading=!1,this.shell())}}update(){let e=this.container.ownerDocument.activeElement;this.commentList.update(this.store.getComments()),this.receiptList.update(this.receipts);let t=this.store.getReplyTarget();((t?this.commentList.replySlot(t.id):null)||this.editorHome.value).append(this.editorContainer),e instanceof HTMLElement&&e.isConnected&&this.container.contains(e)&&e.focus({preventScroll:!0})}reply(e,t){!this.submitting&&this.enabled&&(this.store.setReplyTarget({id:e,nick:t}),this.editor.setReply(t),this.update(),this.editor.focus(),this.saveDraft())}cancelReply(){this.store.setReplyTarget(null),this.editor.setReply(null),this.editorHome.value.append(this.editorContainer),this.saveDraft()}async submit(e){if(this.destroyed||this.submitting)return;if(!this.enabled){this.notice(`此页面已关闭评论`,`warning`);return}if(!e.content.trim()){this.notice(`请先填写评论内容`,`error`);return}if(e.email&&!He(e.email.trim())){this.notice(`邮箱格式不正确`,`error`);return}if(e.website&&!Ue(e.website.trim())){this.notice(`网址格式不正确`,`error`);return}let t={path:this.path,title:this.options.title||document.title,nick:e.nick.trim()||`Guest`,email:e.email.trim()||void 0,website:e.website.trim()||void 0,content:e.content.trim(),reply_to_id:this.store.getReplyTarget()?.id,notify:!!(e.email.trim()&&e.notify)},n=JSON.stringify(t);this.pending?.fingerprint!==n&&(this.pending={fingerprint:n,request:{...t,client_request_id:crypto.randomUUID()}}),this.saveDraft();try{sessionStorage.setItem(this.requestKey,JSON.stringify(this.pending))}catch{}this.submitting=!0,this.editor.setSubmitting(!0),this.notice(`正在发送，请稍候…`,`loading`);try{let n=await this.api.createComment(this.pending.request);if(this.destroyed)return;this.mutation++,this.pending=null;try{sessionStorage.removeItem(this.requestKey)}catch{}if(this.editor.saveProfile({nick:t.nick,email:e.email,website:e.website}),this.editor.clear(),this.cancelReply(),this.saveDraft(),n.deleted){this.notice(`这条评论已经删除，不会重复发布`);return}if(n.status===`published`?this.store.upsert(n):(this.receipts=[n,...this.receipts.filter(e=>e.id!==n.id)],this.update()),this.notice(n.status===`published`?`评论已发送`:`已提交，审核通过后展示`,n.status===`published`?`success`:`warning`),n.status===`published`)try{if(n.root_id){let e=await this.api.context(n.id);if(!this.destroyed){let t=this.store.find(e.root.id);this.store.upsert({...e.root,replies:[...new Map([...t?.replies||[],...e.root.replies||[]].map(e=>[e.id,e])).values()],reply_cursor:t?.reply_cursor??e.root.reply_cursor})}}let e=await this.api.getCommentCounts([this.path]);this.destroyed||(this.total=e[this.path],this.shell())}catch{this.destroyed||this.notice(`评论已发送，列表同步失败，可重新加载`,`warning`)}}catch(e){e instanceof X&&e.code===`COMMENTS_CLOSED`&&(this.enabled=!1),this.destroyed||this.notice(e instanceof X?`提交失败：${this.error(e)}`:`暂未确认发送结果，重试会使用同一请求，不会重复发布`,e instanceof X?`error`:`warning`)}finally{this.submitting=!1,this.destroyed||this.editor.setSubmitting(!1)}}async like(e){if(this.destroyed||this.busyMutations.has(e))return;let t=this.store.find(e);if(t){this.busyMutations.add(e);try{let n=await this.api.likeComment(e,!t.liked);this.destroyed||(this.mutation++,this.store.patch(e,n))}catch(e){this.destroyed||this.notice(this.error(e),`error`)}finally{this.busyMutations.delete(e)}}}async remove(e){if(!(this.destroyed||this.busyMutations.has(e))){this.busyMutations.add(e);try{if(await this.api.deleteComment(e),!this.destroyed){this.mutation++,this.receipts=this.receipts.filter(t=>t.id!==e),this.store.markDeleted(e),this.store.getReplyTarget()?.id===e&&this.cancelReply(),this.notice(`评论已删除`,`success`);let t=await this.api.getCommentCounts([this.path]);this.destroyed||(this.total=t[this.path],this.shell())}}catch(e){this.destroyed||this.notice(this.error(e),`error`)}finally{this.busyMutations.delete(e)}}}async moreReplies(e){let t=this.store.find(e);if(this.destroyed||!t?.reply_cursor||this.busyReplies.has(e))return;this.busyReplies.add(e),this.update();let n=this.mutation;try{let r=await this.api.fetchReplies(e,t.reply_cursor);if(!this.destroyed&&n===this.mutation){let t=this.store.find(e);this.store.patch(e,{replies:[...new Map([...t?.replies||[],...r.comments].map(e=>[e.id,e])).values()],reply_cursor:r.next_cursor})}}catch(e){this.destroyed||this.notice(this.error(e),`error`)}finally{this.busyReplies.delete(e),this.destroyed||this.update()}}async locate(e){if(this.store.find(e)){this.commentList.locate(e);return}let t=this.mutation;try{let n=await this.api.context(e);if(this.destroyed||t!==this.mutation)return;let r=this.store.find(n.root.id);this.store.upsert({...n.root,replies:[...new Map([...r?.replies||[],...n.root.replies||[]].map(e=>[e.id,e])).values()],reply_cursor:r?.reply_cursor??n.root.reply_cursor}),this.commentList.locate(e)}catch(e){this.destroyed||this.notice(this.error(e),`error`)}}shell(){this.destroyed||(this.view.dataset.commentsEnabled=String(this.enabled),this.editorContainer&&(this.editorContainer.hidden=this.firstLoad||!this.enabled),O(y`<div ${z(this.editorHome)} class="editor-home"></div>
        ${ot(this.message,this.messageKind)}
        <button
          class="vbtn hitalk-retry"
          ?hidden=${!this.retry}
          @click=${()=>{this.refresh()}}
        >
          重新加载
        </button>
        <div class="info">
          <span class="count"
            >${this.total===null?``:`评论(${this.total})`}</span
          >
        </div>
        ${this.loading?y`<div class="hitalk-loading" role="status">正在加载…</div>`:x}
        <div class="hitalk-receipts" ?hidden=${!this.receipts.length}>
          <p class="hitalk-receipts-title">我的最近待审核评论</p>
          <div ${z(this.receiptContainer)}></div>
        </div>
        <div ${z(this.listContainer)} class="comment-list-container"></div>
        <button
          class="vbtn hitalk-more"
          ?hidden=${!this.cursor}
          ?disabled=${this.loading||this.submitting}
          @click=${()=>{this.load(!0)}}
        >
          加载更多评论
        </button>`,this.view))}destroy(){this.destroyed||(this.saveDraft(),this.destroyed=!0,this.sequence++,this.api.destroy(),this.events.abort(),this.unsubscribe(),this.editor.destroy(),this.commentList.destroy(),this.receiptList.destroy(),O(x,this.view).setConnected(!1),this.view.remove(),this.container.classList.remove(`Hitalk`),$.delete(this.container))}};function ut(e,t){return new lt(e,t)}return e.Hitalk=lt,e.fillCommentCounts=ct,e.getCommentCounts=st,e.mount=ut,e.normalizePagePath=Y,e})({});
