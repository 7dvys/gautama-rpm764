(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[86],{6628:function(e,a,t){Promise.resolve().then(t.bind(t,8934))},8934:function(e,a,t){"use strict";t.r(a);var s=t(9268),n=t(8128),r=t.n(n),l=t(6006);let i=e=>{let a=e.split("^XA").map((e,a)=>a>0?"^XA\n^MD10\n^PR4\n^MTD\n^LH0,0\n^PW720\n^LL240\n"+e:"");return a.join("")},c=()=>{let[e,a]=(0,l.useState)("ZPL"),[t,n]=(0,l.useState)(""),[c,o]=(0,l.useState)("");return(0,l.useEffect)(()=>{o(i(t))},[t]),(0,s.jsxs)("div",{className:r().zpl,children:[(0,s.jsxs)("div",{className:r().inputContainer,children:[(0,s.jsxs)("nav",{className:r().nav,children:[(0,s.jsx)("div",{className:"ZPL"==e?r().active:"",onClick:()=>{a("ZPL")},children:"ZPL"}),(0,s.jsx)("div",{className:"Gen"==e?r().active:"",onClick:()=>{a("Gen")},children:"Generar"})]}),"ZPL"==e?(0,s.jsx)("textarea",{className:r().textarea,onChange:e=>{n(e.target.value)},placeholder:"Coloque aqui su ZPL..."}):"<Gen/>"]}),(0,s.jsxs)("div",{className:r().outputContainer,children:[(0,s.jsxs)("nav",{className:r().nav,children:[(0,s.jsx)("div",{className:r().active,children:"Resultado"}),(0,s.jsx)("div",{className:r().clipboard,onClick:()=>{navigator.clipboard.writeText(c)},children:(0,s.jsx)("img",{className:r().clipboardImage,src:"copy.svg"})})]}),(0,s.jsx)("textarea",{className:r().textarea,defaultValue:c,disabled:!0})]})]})};a.default=c},8128:function(e){e.exports={zpl:"styles_zpl__6j7ZF",inputContainer:"styles_inputContainer___XrQl",nav:"styles_nav__YW234",active:"styles_active__j6kLG",textarea:"styles_textarea__eKsaH",outputContainer:"styles_outputContainer__Ma8Qy",clipboard:"styles_clipboard__0NjJo",clipboardImage:"styles_clipboardImage__VgB_K"}},3177:function(e,a,t){"use strict";/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var s=t(6006),n=Symbol.for("react.element"),r=(Symbol.for("react.fragment"),Object.prototype.hasOwnProperty),l=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,i={key:!0,ref:!0,__self:!0,__source:!0};function c(e,a,t){var s,c={},o=null,_=null;for(s in void 0!==t&&(o=""+t),void 0!==a.key&&(o=""+a.key),void 0!==a.ref&&(_=a.ref),a)r.call(a,s)&&!i.hasOwnProperty(s)&&(c[s]=a[s]);if(e&&e.defaultProps)for(s in a=e.defaultProps)void 0===c[s]&&(c[s]=a[s]);return{$$typeof:n,type:e,key:o,ref:_,props:c,_owner:l.current}}a.jsx=c,a.jsxs=c},9268:function(e,a,t){"use strict";e.exports=t(3177)}},function(e){e.O(0,[667,139,744],function(){return e(e.s=6628)}),_N_E=e.O()}]);