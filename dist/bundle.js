/*! For license information please see bundle.js.LICENSE.txt */
(()=>{var e={669:(e,t,r)=>{e.exports=r(609)},448:(e,t,r)=>{"use strict";var n=r(867),s=r(26),o=r(327),i=r(109),a=r(985),u=r(61);e.exports=function(e){return new Promise((function(t,c){var l=e.data,f=e.headers;n.isFormData(l)&&delete f["Content-Type"];var h=new XMLHttpRequest;if(e.auth){var d=e.auth.username||"",p=e.auth.password||"";f.Authorization="Basic "+btoa(d+":"+p)}if(h.open(e.method.toUpperCase(),o(e.url,e.params,e.paramsSerializer),!0),h.timeout=e.timeout,h.onreadystatechange=function(){if(h&&4===h.readyState&&(0!==h.status||h.responseURL&&0===h.responseURL.indexOf("file:"))){var r="getAllResponseHeaders"in h?i(h.getAllResponseHeaders()):null,n={data:e.responseType&&"text"!==e.responseType?h.response:h.responseText,status:h.status,statusText:h.statusText,headers:r,config:e,request:h};s(t,c,n),h=null}},h.onabort=function(){h&&(c(u("Request aborted",e,"ECONNABORTED",h)),h=null)},h.onerror=function(){c(u("Network Error",e,null,h)),h=null},h.ontimeout=function(){c(u("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED",h)),h=null},n.isStandardBrowserEnv()){var m=r(372),g=(e.withCredentials||a(e.url))&&e.xsrfCookieName?m.read(e.xsrfCookieName):void 0;g&&(f[e.xsrfHeaderName]=g)}if("setRequestHeader"in h&&n.forEach(f,(function(e,t){void 0===l&&"content-type"===t.toLowerCase()?delete f[t]:h.setRequestHeader(t,e)})),e.withCredentials&&(h.withCredentials=!0),e.responseType)try{h.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&h.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&h.upload&&h.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then((function(e){h&&(h.abort(),c(e),h=null)})),void 0===l&&(l=null),h.send(l)}))}},609:(e,t,r)=>{"use strict";var n=r(867),s=r(849),o=r(321),i=r(185);function a(e){var t=new o(e),r=s(o.prototype.request,t);return n.extend(r,o.prototype,t),n.extend(r,t),r}var u=a(r(655));u.Axios=o,u.create=function(e){return a(i(u.defaults,e))},u.Cancel=r(263),u.CancelToken=r(972),u.isCancel=r(502),u.all=function(e){return Promise.all(e)},u.spread=r(713),e.exports=u,e.exports.default=u},263:e=>{"use strict";function t(e){this.message=e}t.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},t.prototype.__CANCEL__=!0,e.exports=t},972:(e,t,r)=>{"use strict";var n=r(263);function s(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var r=this;e((function(e){r.reason||(r.reason=new n(e),t(r.reason))}))}s.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},s.source=function(){var e;return{token:new s((function(t){e=t})),cancel:e}},e.exports=s},502:e=>{"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},321:(e,t,r)=>{"use strict";var n=r(867),s=r(327),o=r(782),i=r(572),a=r(185);function u(e){this.defaults=e,this.interceptors={request:new o,response:new o}}u.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=a(this.defaults,e)).method=e.method?e.method.toLowerCase():"get";var t=[i,void 0],r=Promise.resolve(e);for(this.interceptors.request.forEach((function(e){t.unshift(e.fulfilled,e.rejected)})),this.interceptors.response.forEach((function(e){t.push(e.fulfilled,e.rejected)}));t.length;)r=r.then(t.shift(),t.shift());return r},u.prototype.getUri=function(e){return e=a(this.defaults,e),s(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},n.forEach(["delete","get","head","options"],(function(e){u.prototype[e]=function(t,r){return this.request(n.merge(r||{},{method:e,url:t}))}})),n.forEach(["post","put","patch"],(function(e){u.prototype[e]=function(t,r,s){return this.request(n.merge(s||{},{method:e,url:t,data:r}))}})),e.exports=u},782:(e,t,r)=>{"use strict";var n=r(867);function s(){this.handlers=[]}s.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},s.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},s.prototype.forEach=function(e){n.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=s},61:(e,t,r)=>{"use strict";var n=r(481);e.exports=function(e,t,r,s,o){var i=new Error(e);return n(i,t,r,s,o)}},572:(e,t,r)=>{"use strict";var n=r(867),s=r(527),o=r(502),i=r(655),a=r(793),u=r(303);function c(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return c(e),e.baseURL&&!a(e.url)&&(e.url=u(e.baseURL,e.url)),e.headers=e.headers||{},e.data=s(e.data,e.headers,e.transformRequest),e.headers=n.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),n.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||i.adapter)(e).then((function(t){return c(e),t.data=s(t.data,t.headers,e.transformResponse),t}),(function(t){return o(t)||(c(e),t&&t.response&&(t.response.data=s(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}},481:e=>{"use strict";e.exports=function(e,t,r,n,s){return e.config=t,r&&(e.code=r),e.request=n,e.response=s,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}},185:(e,t,r)=>{"use strict";var n=r(867);e.exports=function(e,t){t=t||{};var r={};return n.forEach(["url","method","params","data"],(function(e){void 0!==t[e]&&(r[e]=t[e])})),n.forEach(["headers","auth","proxy"],(function(s){n.isObject(t[s])?r[s]=n.deepMerge(e[s],t[s]):void 0!==t[s]?r[s]=t[s]:n.isObject(e[s])?r[s]=n.deepMerge(e[s]):void 0!==e[s]&&(r[s]=e[s])})),n.forEach(["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","maxContentLength","validateStatus","maxRedirects","httpAgent","httpsAgent","cancelToken","socketPath"],(function(n){void 0!==t[n]?r[n]=t[n]:void 0!==e[n]&&(r[n]=e[n])})),r}},26:(e,t,r)=>{"use strict";var n=r(61);e.exports=function(e,t,r){var s=r.config.validateStatus;!s||s(r.status)?e(r):t(n("Request failed with status code "+r.status,r.config,null,r.request,r))}},527:(e,t,r)=>{"use strict";var n=r(867);e.exports=function(e,t,r){return n.forEach(r,(function(r){e=r(e,t)})),e}},655:(e,t,r)=>{"use strict";var n=r(867),s=r(16),o={"Content-Type":"application/x-www-form-urlencoded"};function i(e,t){!n.isUndefined(e)&&n.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var a,u={adapter:(("undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process)||"undefined"!=typeof XMLHttpRequest)&&(a=r(448)),a),transformRequest:[function(e,t){return s(t,"Accept"),s(t,"Content-Type"),n.isFormData(e)||n.isArrayBuffer(e)||n.isBuffer(e)||n.isStream(e)||n.isFile(e)||n.isBlob(e)?e:n.isArrayBufferView(e)?e.buffer:n.isURLSearchParams(e)?(i(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):n.isObject(e)?(i(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};n.forEach(["delete","get","head"],(function(e){u.headers[e]={}})),n.forEach(["post","put","patch"],(function(e){u.headers[e]=n.merge(o)})),e.exports=u},849:e=>{"use strict";e.exports=function(e,t){return function(){for(var r=new Array(arguments.length),n=0;n<r.length;n++)r[n]=arguments[n];return e.apply(t,r)}}},327:(e,t,r)=>{"use strict";var n=r(867);function s(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,r){if(!t)return e;var o;if(r)o=r(t);else if(n.isURLSearchParams(t))o=t.toString();else{var i=[];n.forEach(t,(function(e,t){null!=e&&(n.isArray(e)?t+="[]":e=[e],n.forEach(e,(function(e){n.isDate(e)?e=e.toISOString():n.isObject(e)&&(e=JSON.stringify(e)),i.push(s(t)+"="+s(e))})))})),o=i.join("&")}if(o){var a=e.indexOf("#");-1!==a&&(e=e.slice(0,a)),e+=(-1===e.indexOf("?")?"?":"&")+o}return e}},303:e=>{"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},372:(e,t,r)=>{"use strict";var n=r(867);e.exports=n.isStandardBrowserEnv()?{write:function(e,t,r,s,o,i){var a=[];a.push(e+"="+encodeURIComponent(t)),n.isNumber(r)&&a.push("expires="+new Date(r).toGMTString()),n.isString(s)&&a.push("path="+s),n.isString(o)&&a.push("domain="+o),!0===i&&a.push("secure"),document.cookie=a.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},793:e=>{"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},985:(e,t,r)=>{"use strict";var n=r(867);e.exports=n.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a");function s(e){var n=e;return t&&(r.setAttribute("href",n),n=r.href),r.setAttribute("href",n),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:"/"===r.pathname.charAt(0)?r.pathname:"/"+r.pathname}}return e=s(window.location.href),function(t){var r=n.isString(t)?s(t):t;return r.protocol===e.protocol&&r.host===e.host}}():function(){return!0}},16:(e,t,r)=>{"use strict";var n=r(867);e.exports=function(e,t){n.forEach(e,(function(r,n){n!==t&&n.toUpperCase()===t.toUpperCase()&&(e[t]=r,delete e[n])}))}},109:(e,t,r)=>{"use strict";var n=r(867),s=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,r,o,i={};return e?(n.forEach(e.split("\n"),(function(e){if(o=e.indexOf(":"),t=n.trim(e.substr(0,o)).toLowerCase(),r=n.trim(e.substr(o+1)),t){if(i[t]&&s.indexOf(t)>=0)return;i[t]="set-cookie"===t?(i[t]?i[t]:[]).concat([r]):i[t]?i[t]+", "+r:r}})),i):i}},713:e=>{"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},867:(e,t,r)=>{"use strict";var n=r(849),s=r(778),o=Object.prototype.toString;function i(e){return"[object Array]"===o.call(e)}function a(e){return null!==e&&"object"==typeof e}function u(e){return"[object Function]"===o.call(e)}function c(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),i(e))for(var r=0,n=e.length;r<n;r++)t.call(null,e[r],r,e);else for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.call(null,e[s],s,e)}e.exports={isArray:i,isArrayBuffer:function(e){return"[object ArrayBuffer]"===o.call(e)},isBuffer:s,isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:a,isUndefined:function(e){return void 0===e},isDate:function(e){return"[object Date]"===o.call(e)},isFile:function(e){return"[object File]"===o.call(e)},isBlob:function(e){return"[object Blob]"===o.call(e)},isFunction:u,isStream:function(e){return a(e)&&u(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:c,merge:function e(){var t={};function r(r,n){"object"==typeof t[n]&&"object"==typeof r?t[n]=e(t[n],r):t[n]=r}for(var n=0,s=arguments.length;n<s;n++)c(arguments[n],r);return t},deepMerge:function e(){var t={};function r(r,n){"object"==typeof t[n]&&"object"==typeof r?t[n]=e(t[n],r):t[n]="object"==typeof r?e({},r):r}for(var n=0,s=arguments.length;n<s;n++)c(arguments[n],r);return t},extend:function(e,t,r){return c(t,(function(t,s){e[s]=r&&"function"==typeof t?n(t,r):t})),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}}},778:e=>{e.exports=function(e){return null!=e&&null!=e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}},748:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=n(r(669));t.ApiSync=class{constructor(e){this.url=e}fetch(e){return s.default.get(`${this.url}/${e}`)}save(e){const{id:t}=e;return t?s.default.put(`${this.url}/${t}`,e):s.default.post(this.url,e)}}},334:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Attributes=class{constructor(e){this.data=e,this.get=e=>this.data[e],this.set=e=>{Object.assign(this.data,e)},this.getAll=()=>this.data}}},751:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=r(976),o=n(r(669));t.Collection=class{constructor(e,t){this.rootUrl=e,this.deserialize=t,this.model=[],this.events=new s.Eventing}fetch(){o.default.get(this.rootUrl).then((e=>{e.data.forEach((e=>{this.model.push(this.deserialize(e))})),this.trigger("change")}))}get on(){return this.events.on}get trigger(){return this.events.trigger}}},976:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Eventing=class{constructor(){this.events={},this.on=(e,t)=>{const r=this.events[e]||[];r.push(t),this.events[e]=r},this.trigger=e=>{const t=this.events[e];t&&0!==t.length&&t.forEach((e=>{e()}))}}}},722:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Model=class{constructor(e,t,r){this.attributes=e,this.events=t,this.sync=r,this.on=this.events.on,this.trigger=this.events.trigger,this.get=this.attributes.get,this.set=e=>{this.attributes.set(e),this.events.trigger("change")},this.fetch=()=>{const e=this.attributes.get("id");if("number"!=typeof e)throw new Error("The specified user has not been previously saved!");this.sync.fetch(e).then((e=>{this.set(e.data)}))},this.save=()=>{this.sync.save(this.attributes.getAll()).then((e=>{this.trigger("save")})).catch((()=>{this.trigger("error")}))}}}},365:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CollectionView=class{constructor(e,t){this.parent=e,this.collection=t,this.render=()=>{this.parent.innerHTML="";const e=document.createElement("template");e.innerHTML=this.template();for(let t of this.collection.model)this.renderItem(t,e.content);this.parent.append(e.content)},this.collection.on("change",(()=>{this.render()})),this.collection.fetch()}}},718:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.View=class{constructor(e,t){this.parent=e,this.model=t,this.regions={},this.bindModel=()=>{this.model.on("change",this.render)},this.bindEvents=e=>{const t=this.eventsMap();for(let r in t){const[n,s]=r.split(":");e.querySelectorAll(s).forEach((e=>{e.addEventListener(n,t[r])}))}},this.render=()=>{this.parent.innerHTML="";const e=document.createElement("template");e.innerHTML=this.template(),this.mapRegions(e.content),this.bindEvents(e.content),this.onRender(),this.parent.append(e.content)},this.bindModel()}eventsMap(){return{}}regionsMap(){return{}}mapRegions(e){const t=this.regionsMap();for(let r in t){let n=e.querySelector(t[r]);n&&(this.regions[r]=n)}}onRender(){}}},607:(e,t,r)=>{"use strict";const n=r(558),s=r(604),o=r(368),i=n.User.buildUser({id:2});i.fetch();const a=document.getElementById("user-list");a&&new o.UserList(a,n.User.buildUserCollection()).render();const u=document.getElementById("root");u&&new s.UserEdit(u,i).render()},558:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(722),s=r(334),o=r(748),i=r(976),a=r(751),u="http://localhost:3000/users";class c extends n.Model{static buildUser(e){return new c(new s.Attributes(e),new i.Eventing,new o.ApiSync(u))}static buildUserCollection(){return new a.Collection(u,(e=>c.buildUser(e)))}setRandomAge(){this.set({age:Math.floor(Math.random()*Math.floor(100))})}}t.User=c},604:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(718),s=r(357),o=r(763);class i extends n.View{regionsMap(){return{userShow:".user-show",userForm:".user-form"}}onRender(){new s.UserShow(this.regions.userShow,this.model).render(),new o.UserForm(this.regions.userForm,this.model).render()}template(){return'\n    <br>\n    <div class="user-show"></div>\n    <br>\n    <div class="user-form"></div>\n    <br>'}}t.UserEdit=i},763:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(718);class s extends n.View{constructor(){super(...arguments),this.setName=()=>{const e=this.parent.querySelector("input");e&&this.model.set({name:e.value})},this.onButtonClick=()=>{this.model.setRandomAge()},this.saveUser=()=>{this.model.save()}}eventsMap(){return{"click:#name":this.setName,"click:#random-age-button":this.onButtonClick,"click:#save-button":this.saveUser}}template(){return`\n    <br>\n    <input id="name-input" placeholder="${this.model.get("name")}">\n    <button id="name">Update Name</button>\n    <br>\n    <button id="random-age-button">Set Random Age</button>\n    <br>\n    <button id="save-button">Save</button>\n    <br>\n    `}}t.UserForm=s},368:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(365);class s extends n.CollectionView{renderItem(e,t){const r=t.querySelector("ul"),n=e.get("name");r&&n&&(r.innerHTML+=`<li>${n}</li>`)}template(){return"\n    <h1>User List</h1>\n    <ul></ul>\n    <br>\n    "}}t.UserList=s},357:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=r(718);class s extends n.View{template(){return`\n    <h3>User Detail</h3>\n    name: ${this.model.get("name")}\n    <br>\n    age: ${this.model.get("age")}\n    <br>\n    <br>\n    `}}t.UserShow=s}},t={};!function r(n){if(t[n])return t[n].exports;var s=t[n]={exports:{}};return e[n].call(s.exports,s,s.exports,r),s.exports}(607)})();