(function(){"use strict";var e={64921:function(e,t,n){n.d(t,{Z:function(){return f}});var r=n(9669),o=n.n(r),i=n(12346);const a=e=>window.localStorage.getItem(e),s=(e,t)=>{window.localStorage.setItem(e,t)},u=e=>{window.localStorage.removeItem(e)};var c={getToken:a,saveToken:s,destroyToken:u},l=n(33190);const d={vueInstance:null,init(e){e.use(i.Z,o()),this.vueInstance=e},query(e,t){return this.vueInstance.axios.get(e,{params:t}).catch((e=>{console.error(e)}))},get(e,t=""){return this.vueInstance.axios.get(`${e}/${t}`).catch((e=>{console.error(e)}))},post(e,t){return this.vueInstance.axios.post(`${e}`,t).catch((e=>{console.error(e)}))},update(e,t,n){return this.vueInstance.axios.put(`${e}/${t}`,n).catch((e=>{console.error(e)}))},put(e,t){return this.vueInstance.axios.put(`${e}`,t).catch((e=>{console.error(e)}))},delete(e,t){return this.vueInstance.axios.delete(`${e}/${t}`).catch((e=>{console.error(e)}))},getFileFormData(e,t){const n=new FormData;if(t){if(e&&e.length>0)for(let r=0;r<e.length;r++)n.append("uploadFiles",e[r])}else e&&e.length>0&&n.append("uploadFile",e[0]);return n},execXhr(e,t,n,r){const o=new XMLHttpRequest;o.timeout=6e5,o.open("POST",`${e}`,!0),o.setRequestHeader("Access-Control-Allow-Origin","*"),o.setRequestHeader(l.B1,c.getToken(l.B1)),o.responseType="json",o.addEventListener("load",(()=>{const e=o.response;return n(e)})),o.addEventListener("error",(()=>r(o.response))),o.send(t)},upload(e,t,n){return new Promise(((r,o)=>{const i=this.getFileFormData(t,n);this.execXhr(e,i,r,o)}))},download(e,t,n,r){const o=new XMLHttpRequest;let i=`${e}/${t}`;if(null!==n&&void 0!==n){const e=Object.keys(n);e.length>0&&(i+="?"+e.map((e=>`${e}=${n[e]}`)).join("&"))}o.open("GET",i,!0),o.setRequestHeader("Access-Control-Allow-Origin","*"),o.setRequestHeader(l.B1,c.getToken(l.B1)),o.responseType="blob",o.onload=()=>{const e=document.createElement("a");e.href=window.URL.createObjectURL(o.response),e.download=r,e.click()},o.send()},parts(e,t,n,r){return new Promise(((o,i)=>{const a=this.getFileFormData(t,r);a.append("params",new Blob([JSON.stringify(n)],{type:"application/json"})),this.execXhr(e,a,o,i,a)}))}};var f=d},56591:function(e,t,n){n(28594);var r=n(49963),o=n(66252);function i(e,t,n,r,i,a){const s=(0,o.up)("router-view");return(0,o.wg)(),(0,o.j4)(s)}var a={name:"App"},s=n(83744);const u=(0,s.Z)(a,[["render",i]]);var c=u,l=n(42119);const d=[{path:"/",name:"ChatMng",component:()=>n.e(912).then(n.bind(n,41912))}],f=(0,l.p7)({history:(0,l.PO)("/chat/"),routes:d});var m=f,p=n(33907),h=n(33190),g=n(6315);const v="mutSetAlertIns",b="mutSetConfirmIns",w="mutSetLoadingIns",y="mutSetLoadingPercentage",T="mutShowAlert",k="mutCloseAlert",x="mutShowConfirm",C="mutCloseConfirm",E="mutShowLoading",S="mutCloseLoading",P={loading:{ins:null,showPercent:!1,percent:0},alert:{ins:null,text:"",centered:!1,callback:null,alertTimeout:null},confirm:{ins:null,text:"",centered:!1,callback:null,closeCallback:null}},O={[v](e,t){e.alert.ins=t},[b](e,t){e.confirm.ins=t},[w](e,t){e.loading.ins=t},[T](e,{text:t,callback:n,centered:r,timeout:o}){e.alert.text=t,e.alert.callback=n,e.alert.centered=!!r,o>0&&(e.alert.alertTimeout&&(clearTimeout(e.alert.alertTimeout),e.alert.alertTimeout=null),e.alert.alertTimeout=setTimeout((()=>{e.alert.show=!1}),1e3*o)),e.alert.ins.show()},[k](e){e.alert.ins.hide(),e.alert.text=""},[x](e,{text:t,callback:n,closeCallback:r,centered:o}){e.confirm.text=t,e.confirm.callback=n,e.confirm.closeCallback=r,e.confirm.centered=!!o,e.confirm.ins.show()},[C](e){e.confirm.ins.hide(),e.confirm.text=""},[E](e,t){e.loading.ins.show(),e.loading.percent=0,e.loading.showPercent=t},[S](e){e.loading.ins.hide()},[y](e,t){e.loading.percent=t}};var A={namespaced:!0,state:P,mutations:O},j=(0,p.MT)({state:{},mutations:{},actions:{},modules:{auth:h.ZP,users:g.ZP,common:A}}),I=n(64921);const L=(0,r.ri)(c);I.Z.init(L),L.use(m).use(j).mount("#app")},33190:function(e,t,n){n.d(t,{B1:function(){return o}});var r=n(64921);const o="kb-admin-token",i="setSession",a="setExpiredTime",s="checkAuth",u="renewAuth",c={session:null,sessionExpiredTime:0},l={[i](e,t){e.session=t},[a](e,t){e.sessionExpiredTime=0==t?0:(new Date).getTime()+6e5}},d={[s](){return new Promise((e=>{r.Z.query("/v1/admin/auth/",{}).then((t=>e(t)))}))},[u](){return new Promise((e=>{r.Z.put("/v1/admin/auth/",{}).then((t=>e(t)))}))}};t["ZP"]={namespaced:!0,state:c,mutations:l,actions:d}},6315:function(e,t,n){n.d(t,{Zv:function(){return i},lr:function(){return a}});var r=n(64921);const o="actGetUsers",i="actGetUsersEncrypt",a="actGetUsersDecrypt",s={},u={},c={[o](e,t){return console.log("ACT_GET_USERS;;",t),new Promise((e=>{r.Z.get("/api/chat/user",t).then((t=>e(t)))}))},[i](e,t){return console.log("ACT_GET_USERS_ENCRYPT;;",t),new Promise((e=>{r.Z.query("/api/chat/users/encrypt",t).then((t=>e(t)))}))},[a](e,t){return console.log("ACT_GET_USERS_DECRYPT;;",t),new Promise((e=>{r.Z.query("/api/chat/users/decrypt",t).then((t=>e(t)))}))}};t["ZP"]={namespaced:!0,state:s,mutations:u,actions:c}}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={id:r,loaded:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.loaded=!0,i.exports}n.m=e,function(){n.amdO={}}(),function(){var e=[];n.O=function(t,r,o,i){if(!r){var a=1/0;for(l=0;l<e.length;l++){r=e[l][0],o=e[l][1],i=e[l][2];for(var s=!0,u=0;u<r.length;u++)(!1&i||a>=i)&&Object.keys(n.O).every((function(e){return n.O[e](r[u])}))?r.splice(u--,1):(s=!1,i<a&&(a=i));if(s){e.splice(l--,1);var c=o();void 0!==c&&(t=c)}}return t}i=i||0;for(var l=e.length;l>0&&e[l-1][2]>i;l--)e[l]=e[l-1];e[l]=[r,o,i]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,r){return n.f[r](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/"+e+".5eebfee3.js"}}(),function(){n.miniCssF=function(e){return"css/"+e+".3716a16b.css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.hmd=function(e){return e=Object.create(e),e.children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:function(){throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e}}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="frontend:";n.l=function(r,o,i,a){if(e[r])e[r].push(o);else{var s,u;if(void 0!==i)for(var c=document.getElementsByTagName("script"),l=0;l<c.length;l++){var d=c[l];if(d.getAttribute("src")==r||d.getAttribute("data-webpack")==t+i){s=d;break}}s||(u=!0,s=document.createElement("script"),s.charset="utf-8",s.timeout=120,n.nc&&s.setAttribute("nonce",n.nc),s.setAttribute("data-webpack",t+i),s.src=r),e[r]=[o];var f=function(t,n){s.onerror=s.onload=null,clearTimeout(m);var o=e[r];if(delete e[r],s.parentNode&&s.parentNode.removeChild(s),o&&o.forEach((function(e){return e(n)})),t)return t(n)},m=setTimeout(f.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=f.bind(null,s.onerror),s.onload=f.bind(null,s.onload),u&&document.head.appendChild(s)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p="/chat/"}(),function(){var e=function(e,t,n,r){var o=document.createElement("link");o.rel="stylesheet",o.type="text/css";var i=function(i){if(o.onerror=o.onload=null,"load"===i.type)n();else{var a=i&&("load"===i.type?"missing":i.type),s=i&&i.target&&i.target.href||t,u=new Error("Loading CSS chunk "+e+" failed.\n("+s+")");u.code="CSS_CHUNK_LOAD_FAILED",u.type=a,u.request=s,o.parentNode.removeChild(o),r(u)}};return o.onerror=o.onload=i,o.href=t,document.head.appendChild(o),o},t=function(e,t){for(var n=document.getElementsByTagName("link"),r=0;r<n.length;r++){var o=n[r],i=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(i===e||i===t))return o}var a=document.getElementsByTagName("style");for(r=0;r<a.length;r++){o=a[r],i=o.getAttribute("data-href");if(i===e||i===t)return o}},r=function(r){return new Promise((function(o,i){var a=n.miniCssF(r),s=n.p+a;if(t(a,s))return o();e(r,s,o,i)}))},o={143:0};n.f.miniCss=function(e,t){var n={912:1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=r(e).then((function(){o[e]=0}),(function(t){throw delete o[e],t})))}}(),function(){var e={143:0};n.f.j=function(t,r){var o=n.o(e,t)?e[t]:void 0;if(0!==o)if(o)r.push(o[2]);else{var i=new Promise((function(n,r){o=e[t]=[n,r]}));r.push(o[2]=i);var a=n.p+n.u(t),s=new Error,u=function(r){if(n.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var i=r&&("load"===r.type?"missing":r.type),a=r&&r.target&&r.target.src;s.message="Loading chunk "+t+" failed.\n("+i+": "+a+")",s.name="ChunkLoadError",s.type=i,s.request=a,o[1](s)}};n.l(a,u,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,r){var o,i,a=r[0],s=r[1],u=r[2],c=0;if(a.some((function(t){return 0!==e[t]}))){for(o in s)n.o(s,o)&&(n.m[o]=s[o]);if(u)var l=u(n)}for(t&&t(r);c<a.length;c++)i=a[c],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(l)},r=self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=n.O(void 0,[998],(function(){return n(56591)}));r=n.O(r)})();
//# sourceMappingURL=app.8c2f69a5.js.map