function $(){}function H(t,n){for(const e in n)t[e]=n[e];return t}function B(t){return t()}function j(){return Object.create(null)}function p(t){t.forEach(B)}function L(t){return typeof t=="function"}function ot(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}function I(t){return Object.keys(t).length===0}function G(t,...n){if(t==null)return $;const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function st(t,n,e){t.$$.on_destroy.push(G(n,e))}function lt(t,n,e,i){if(t){const r=O(t,n,e,i);return t[0](r)}}function O(t,n,e,i){return t[1]&&i?H(e.ctx.slice(),t[1](i(n))):e.ctx}function ft(t,n,e,i){if(t[2]&&i){const r=t[2](i(e));if(n.dirty===void 0)return r;if(typeof r=="object"){const l=[],u=Math.max(n.dirty.length,r.length);for(let o=0;o<u;o+=1)l[o]=n.dirty[o]|r[o];return l}return n.dirty|r}return n.dirty}function at(t,n,e,i,r,l){if(r){const u=O(n,e,i,l);t.p(u,r)}}function _t(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let i=0;i<e;i++)n[i]=-1;return n}return-1}function dt(t){const n={};for(const e in t)e[0]!=="$"&&(n[e]=t[e]);return n}let w=!1;function J(){w=!0}function K(){w=!1}function Q(t,n,e,i){for(;t<n;){const r=t+(n-t>>1);e(r)<=i?t=r+1:n=r}return t}function W(t){if(t.hydrate_init)return;t.hydrate_init=!0;let n=t.childNodes;if(t.nodeName==="HEAD"){const c=[];for(let s=0;s<n.length;s++){const a=n[s];a.claim_order!==void 0&&c.push(a)}n=c}const e=new Int32Array(n.length+1),i=new Int32Array(n.length);e[0]=-1;let r=0;for(let c=0;c<n.length;c++){const s=n[c].claim_order,a=(r>0&&n[e[r]].claim_order<=s?r+1:Q(1,r,y=>n[e[y]].claim_order,s))-1;i[c]=e[a]+1;const f=a+1;e[f]=c,r=Math.max(f,r)}const l=[],u=[];let o=n.length-1;for(let c=e[r]+1;c!=0;c=i[c-1]){for(l.push(n[c-1]);o>=c;o--)u.push(n[o]);o--}for(;o>=0;o--)u.push(n[o]);l.reverse(),u.sort((c,s)=>c.claim_order-s.claim_order);for(let c=0,s=0;c<u.length;c++){for(;s<l.length&&u[c].claim_order>=l[s].claim_order;)s++;const a=s<l.length?l[s]:null;t.insertBefore(u[c],a)}}function R(t,n){if(w){for(W(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;n!==t.actual_end_child?(n.claim_order!==void 0||n.parentNode!==t)&&t.insertBefore(n,t.actual_end_child):t.actual_end_child=n.nextSibling}else(n.parentNode!==t||n.nextSibling!==null)&&t.appendChild(n)}function ht(t,n,e){w&&!e?R(t,n):(n.parentNode!==t||n.nextSibling!=e)&&t.insertBefore(n,e||null)}function U(t){t.parentNode&&t.parentNode.removeChild(t)}function mt(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function V(t){return document.createElement(t)}function X(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function k(t){return document.createTextNode(t)}function pt(){return k(" ")}function yt(){return k("")}function gt(t,n,e,i){return t.addEventListener(n,e,i),()=>t.removeEventListener(n,e,i)}function Y(t,n,e){e==null?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function xt(t,n){for(const e in n)Y(t,e,n[e])}function Z(t){return Array.from(t.childNodes)}function tt(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function P(t,n,e,i,r=!1){tt(t);const l=(()=>{for(let u=t.claim_info.last_index;u<t.length;u++){const o=t[u];if(n(o)){const c=e(o);return c===void 0?t.splice(u,1):t[u]=c,r||(t.claim_info.last_index=u),o}}for(let u=t.claim_info.last_index-1;u>=0;u--){const o=t[u];if(n(o)){const c=e(o);return c===void 0?t.splice(u,1):t[u]=c,r?c===void 0&&t.claim_info.last_index--:t.claim_info.last_index=u,o}}return i()})();return l.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,l}function T(t,n,e,i){return P(t,r=>r.nodeName===n,r=>{const l=[];for(let u=0;u<r.attributes.length;u++){const o=r.attributes[u];e[o.name]||l.push(o.name)}l.forEach(u=>r.removeAttribute(u))},()=>i(n))}function bt(t,n,e){return T(t,n,e,V)}function $t(t,n,e){return T(t,n,e,X)}function nt(t,n){return P(t,e=>e.nodeType===3,e=>{const i=""+n;if(e.data.startsWith(i)){if(e.data.length!==i.length)return e.splitText(i.length)}else e.data=i},()=>k(n),!0)}function wt(t){return nt(t," ")}function vt(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}function Et(t,n){t.value=n??""}function Nt(t,n,e,i){e===null?t.style.removeProperty(n):t.style.setProperty(n,e,i?"important":"")}function kt(t,n){return new t(n)}let m;function h(t){m=t}function q(){if(!m)throw new Error("Function called outside component initialization");return m}function St(t){q().$$.on_mount.push(t)}function At(t){q().$$.after_update.push(t)}const d=[],C=[],x=[],M=[],z=Promise.resolve();let E=!1;function D(){E||(E=!0,z.then(F))}function jt(){return D(),z}function N(t){x.push(t)}const v=new Set;let g=0;function F(){const t=m;do{for(;g<d.length;){const n=d[g];g++,h(n),et(n.$$)}for(h(null),d.length=0,g=0;C.length;)C.pop()();for(let n=0;n<x.length;n+=1){const e=x[n];v.has(e)||(v.add(e),e())}x.length=0}while(d.length);for(;M.length;)M.pop()();E=!1,v.clear(),h(t)}function et(t){if(t.fragment!==null){t.update(),p(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(N)}}const b=new Set;let _;function Ct(){_={r:0,c:[],p:_}}function Mt(){_.r||p(_.c),_=_.p}function it(t,n){t&&t.i&&(b.delete(t),t.i(n))}function Bt(t,n,e,i){if(t&&t.o){if(b.has(t))return;b.add(t),_.c.push(()=>{b.delete(t),i&&(e&&t.d(1),i())}),t.o(n)}else i&&i()}function Lt(t,n){const e={},i={},r={$$scope:1};let l=t.length;for(;l--;){const u=t[l],o=n[l];if(o){for(const c in u)c in o||(i[c]=1);for(const c in o)r[c]||(e[c]=o[c],r[c]=1);t[l]=o}else for(const c in u)r[c]=1}for(const u in i)u in e||(e[u]=void 0);return e}function Ot(t){t&&t.c()}function Pt(t,n){t&&t.l(n)}function rt(t,n,e,i){const{fragment:r,after_update:l}=t.$$;r&&r.m(n,e),i||N(()=>{const u=t.$$.on_mount.map(B).filter(L);t.$$.on_destroy?t.$$.on_destroy.push(...u):p(u),t.$$.on_mount=[]}),l.forEach(N)}function ct(t,n){const e=t.$$;e.fragment!==null&&(p(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function ut(t,n){t.$$.dirty[0]===-1&&(d.push(t),D(),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function Tt(t,n,e,i,r,l,u,o=[-1]){const c=m;h(t);const s=t.$$={fragment:null,ctx:[],props:l,update:$,not_equal:r,bound:j(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(c?c.$$.context:[])),callbacks:j(),dirty:o,skip_bound:!1,root:n.target||c.$$.root};u&&u(s.root);let a=!1;if(s.ctx=e?e(t,n.props||{},(f,y,...S)=>{const A=S.length?S[0]:y;return s.ctx&&r(s.ctx[f],s.ctx[f]=A)&&(!s.skip_bound&&s.bound[f]&&s.bound[f](A),a&&ut(t,f)),y}):[],s.update(),a=!0,p(s.before_update),s.fragment=i?i(s.ctx):!1,n.target){if(n.hydrate){J();const f=Z(n.target);s.fragment&&s.fragment.l(f),f.forEach(U)}else s.fragment&&s.fragment.c();n.intro&&it(t.$$.fragment),rt(t,n.target,n.anchor,n.customElement),K(),F()}h(c)}class qt{$destroy(){ct(this,1),this.$destroy=$}$on(n,e){if(!L(e))return $;const i=this.$$.callbacks[n]||(this.$$.callbacks[n]=[]);return i.push(e),()=>{const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}$set(n){this.$$set&&!I(n)&&(this.$$.skip_bound=!0,this.$$set(n),this.$$.skip_bound=!1)}}export{jt as A,$ as B,lt as C,at as D,_t as E,ft as F,R as G,st as H,H as I,X as J,$t as K,xt as L,Lt as M,dt as N,Et as O,gt as P,mt as Q,qt as S,pt as a,ht as b,wt as c,Mt as d,yt as e,it as f,Ct as g,U as h,Tt as i,At as j,V as k,bt as l,Z as m,Y as n,St as o,Nt as p,k as q,nt as r,ot as s,Bt as t,vt as u,kt as v,Ot as w,Pt as x,rt as y,ct as z};
