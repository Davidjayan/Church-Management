(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[15],{611:function(e,t,a){"use strict";a.d(t,"a",(function(){return d}));var n=a(25),o=a(764),i=a(795),r=a(803),c=(a(0),a(621)),l=a.n(c),s=a(2),d=function(e){var t=e.notify,a=e.setNotify;return Object(s.jsx)(o.a,{direction:"down",in:t.isOpen,children:Object(s.jsx)(i.a,{severity:t.severity,variant:t.variant,style:{alignContent:"center",alignItems:"center",fontSize:18,position:"fixed",zIndex:3,marginLeft:"25%"},action:Object(s.jsx)(r.a,{"aria-label":"close",color:"inherit",size:"large",onClick:function(){a(Object(n.a)(Object(n.a)({},t),{},{isOpen:!1}))},children:Object(s.jsx)(l.a,{fontSize:"inherit"})}),sx:{mb:7},points:"0,100 50,00, 100,100",children:t.message})})}},612:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));var n="https://admin-management-website.000webhostapp.com/Church-management-api/api"},694:function(e,t,a){"use strict";var n=a(28),o=a(12),i=a(5),r=a(0),c=(a(39),a(118)),l=a(571),s=a(587),d=a(586),u=a(119),p=a(120),b=a(796),v=a(155),h=a(570),m=a(585);function j(e){return Object(h.a)("MuiButton",e)}var f=Object(m.a)("MuiButton",["root","text","textInherit","textPrimary","textSecondary","outlined","outlinedInherit","outlinedPrimary","outlinedSecondary","contained","containedInherit","containedPrimary","containedSecondary","disableElevation","focusVisible","disabled","colorInherit","textSizeSmall","textSizeMedium","textSizeLarge","outlinedSizeSmall","outlinedSizeMedium","outlinedSizeLarge","containedSizeSmall","containedSizeMedium","containedSizeLarge","sizeMedium","sizeSmall","sizeLarge","fullWidth","startIcon","endIcon","iconSizeSmall","iconSizeMedium","iconSizeLarge"]);var x=r.createContext({}),O=a(2),g=["children","color","component","className","disabled","disableElevation","disableFocusRipple","endIcon","focusVisibleClassName","fullWidth","size","startIcon","type","variant"],S=function(e){return Object(i.a)({},"small"===e.size&&{"& > *:nth-of-type(1)":{fontSize:18}},"medium"===e.size&&{"& > *:nth-of-type(1)":{fontSize:20}},"large"===e.size&&{"& > *:nth-of-type(1)":{fontSize:22}})},y=Object(u.a)(b.a,{shouldForwardProp:function(e){return Object(u.b)(e)||"classes"===e},name:"MuiButton",slot:"Root",overridesResolver:function(e,t){var a=e.ownerState;return[t.root,t[a.variant],t["".concat(a.variant).concat(Object(v.a)(a.color))],t["size".concat(Object(v.a)(a.size))],t["".concat(a.variant,"Size").concat(Object(v.a)(a.size))],"inherit"===a.color&&t.colorInherit,a.disableElevation&&t.disableElevation,a.fullWidth&&t.fullWidth]}})((function(e){var t,a,o,r=e.theme,c=e.ownerState;return Object(i.a)({},r.typography.button,(t={minWidth:64,padding:"6px 16px",borderRadius:(r.vars||r).shape.borderRadius,transition:r.transitions.create(["background-color","box-shadow","border-color","color"],{duration:r.transitions.duration.short}),"&:hover":Object(i.a)({textDecoration:"none",backgroundColor:r.vars?"rgba(".concat(r.vars.palette.text.primaryChannel," / ").concat(r.vars.palette.action.hoverOpacity,")"):Object(d.a)(r.palette.text.primary,r.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"text"===c.variant&&"inherit"!==c.color&&{backgroundColor:r.vars?"rgba(".concat(r.vars.palette[c.color].mainChannel," / ").concat(r.vars.palette.action.hoverOpacity,")"):Object(d.a)(r.palette[c.color].main,r.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"outlined"===c.variant&&"inherit"!==c.color&&{border:"1px solid ".concat((r.vars||r).palette[c.color].main),backgroundColor:r.vars?"rgba(".concat(r.vars.palette[c.color].mainChannel," / ").concat(r.vars.palette.action.hoverOpacity,")"):Object(d.a)(r.palette[c.color].main,r.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"contained"===c.variant&&{backgroundColor:(r.vars||r).palette.grey.A100,boxShadow:(r.vars||r).shadows[4],"@media (hover: none)":{boxShadow:(r.vars||r).shadows[2],backgroundColor:(r.vars||r).palette.grey[300]}},"contained"===c.variant&&"inherit"!==c.color&&{backgroundColor:(r.vars||r).palette[c.color].dark,"@media (hover: none)":{backgroundColor:(r.vars||r).palette[c.color].main}}),"&:active":Object(i.a)({},"contained"===c.variant&&{boxShadow:(r.vars||r).shadows[8]})},Object(n.a)(t,"&.".concat(f.focusVisible),Object(i.a)({},"contained"===c.variant&&{boxShadow:(r.vars||r).shadows[6]})),Object(n.a)(t,"&.".concat(f.disabled),Object(i.a)({color:(r.vars||r).palette.action.disabled},"outlined"===c.variant&&{border:"1px solid ".concat((r.vars||r).palette.action.disabledBackground)},"outlined"===c.variant&&"secondary"===c.color&&{border:"1px solid ".concat((r.vars||r).palette.action.disabled)},"contained"===c.variant&&{color:(r.vars||r).palette.action.disabled,boxShadow:(r.vars||r).shadows[0],backgroundColor:(r.vars||r).palette.action.disabledBackground})),t),"text"===c.variant&&{padding:"6px 8px"},"text"===c.variant&&"inherit"!==c.color&&{color:(r.vars||r).palette[c.color].main},"outlined"===c.variant&&{padding:"5px 15px",border:"1px solid currentColor"},"outlined"===c.variant&&"inherit"!==c.color&&{color:(r.vars||r).palette[c.color].main,border:r.vars?"1px solid rgba(".concat(r.vars.palette[c.color].mainChannel," / 0.5)"):"1px solid ".concat(Object(d.a)(r.palette[c.color].main,.5))},"contained"===c.variant&&{color:r.vars?r.vars.palette.text.primary:null==(a=(o=r.palette).getContrastText)?void 0:a.call(o,r.palette.grey[300]),backgroundColor:(r.vars||r).palette.grey[300],boxShadow:(r.vars||r).shadows[2]},"contained"===c.variant&&"inherit"!==c.color&&{color:(r.vars||r).palette[c.color].contrastText,backgroundColor:(r.vars||r).palette[c.color].main},"inherit"===c.color&&{color:"inherit",borderColor:"currentColor"},"small"===c.size&&"text"===c.variant&&{padding:"4px 5px",fontSize:r.typography.pxToRem(13)},"large"===c.size&&"text"===c.variant&&{padding:"8px 11px",fontSize:r.typography.pxToRem(15)},"small"===c.size&&"outlined"===c.variant&&{padding:"3px 9px",fontSize:r.typography.pxToRem(13)},"large"===c.size&&"outlined"===c.variant&&{padding:"7px 21px",fontSize:r.typography.pxToRem(15)},"small"===c.size&&"contained"===c.variant&&{padding:"4px 10px",fontSize:r.typography.pxToRem(13)},"large"===c.size&&"contained"===c.variant&&{padding:"8px 22px",fontSize:r.typography.pxToRem(15)},c.fullWidth&&{width:"100%"})}),(function(e){var t;return e.ownerState.disableElevation&&(t={boxShadow:"none","&:hover":{boxShadow:"none"}},Object(n.a)(t,"&.".concat(f.focusVisible),{boxShadow:"none"}),Object(n.a)(t,"&:active",{boxShadow:"none"}),Object(n.a)(t,"&.".concat(f.disabled),{boxShadow:"none"}),t)})),z=Object(u.a)("span",{name:"MuiButton",slot:"StartIcon",overridesResolver:function(e,t){var a=e.ownerState;return[t.startIcon,t["iconSize".concat(Object(v.a)(a.size))]]}})((function(e){var t=e.ownerState;return Object(i.a)({display:"inherit",marginRight:8,marginLeft:-4},"small"===t.size&&{marginLeft:-2},S(t))})),w=Object(u.a)("span",{name:"MuiButton",slot:"EndIcon",overridesResolver:function(e,t){var a=e.ownerState;return[t.endIcon,t["iconSize".concat(Object(v.a)(a.size))]]}})((function(e){var t=e.ownerState;return Object(i.a)({display:"inherit",marginRight:-4,marginLeft:8},"small"===t.size&&{marginRight:-2},S(t))})),C=r.forwardRef((function(e,t){var a=r.useContext(x),n=Object(l.a)(a,e),d=Object(p.a)({props:n,name:"MuiButton"}),u=d.children,b=d.color,h=void 0===b?"primary":b,m=d.component,f=void 0===m?"button":m,S=d.className,C=d.disabled,I=void 0!==C&&C,k=d.disableElevation,R=void 0!==k&&k,M=d.disableFocusRipple,N=void 0!==M&&M,E=d.endIcon,L=d.focusVisibleClassName,T=d.fullWidth,W=void 0!==T&&T,B=d.size,V=void 0===B?"medium":B,P=d.startIcon,F=d.type,A=d.variant,H=void 0===A?"text":A,J=Object(o.a)(d,g),D=Object(i.a)({},d,{color:h,component:f,disabled:I,disableElevation:R,disableFocusRipple:N,fullWidth:W,size:V,type:F,variant:H}),_=function(e){var t=e.color,a=e.disableElevation,n=e.fullWidth,o=e.size,r=e.variant,c=e.classes,l={root:["root",r,"".concat(r).concat(Object(v.a)(t)),"size".concat(Object(v.a)(o)),"".concat(r,"Size").concat(Object(v.a)(o)),"inherit"===t&&"colorInherit",a&&"disableElevation",n&&"fullWidth"],label:["label"],startIcon:["startIcon","iconSize".concat(Object(v.a)(o))],endIcon:["endIcon","iconSize".concat(Object(v.a)(o))]},d=Object(s.a)(l,j,c);return Object(i.a)({},c,d)}(D),q=P&&Object(O.jsx)(z,{className:_.startIcon,ownerState:D,children:P}),G=E&&Object(O.jsx)(w,{className:_.endIcon,ownerState:D,children:E});return Object(O.jsxs)(y,Object(i.a)({ownerState:D,className:Object(c.a)(S,a.className),component:f,disabled:I,focusRipple:!N,focusVisibleClassName:Object(c.a)(_.focusVisible,L),ref:t,type:F},J,{classes:_,children:[q,u,G]}))}));t.a=C},718:function(e,t,a){"use strict";var n=a(630);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n(a(631)),i=a(2),r=(0,o.default)((0,i.jsx)("path",{d:"M15 16h4v2h-4zm0-8h7v2h-7zm0 4h6v2h-6zM3 18c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V8H3v10zM14 5h-3l-1-1H6L5 5H2v2h12z"}),"DeleteSweep");t.default=r},785:function(e,t,a){"use strict";a.r(t);var n=a(29),o=a(25),i=a(69),r=a(718),c=a.n(r),l=a(573),s=a(694),d=a(609),u=a(792),p=a(803),b=a(0),v=a(612),h=a(611),m=a(2);t.default=function(){var e=Object(b.useState)([{sno:1,id:""}]),t=Object(i.a)(e,2),a=t[0],r=t[1],j=Object(b.useState)(2),f=Object(i.a)(j,2),x=f[0],O=f[1],g=Object(b.useState)({isOpen:!1,message:"",variant:"filled",severity:"error"}),S=Object(i.a)(g,2),y=S[0],z=S[1],w=a.map((function(e){return e.id}));return Object(m.jsxs)(l.a,{container:!0,direction:"column",alignContent:"flex-start",children:[Object(m.jsx)(h.a,{notify:y,setNotify:z}),Object(m.jsx)(s.a,{onClick:function(){r((function(e){return[].concat(Object(n.a)(e),[{sno:x,id:""}])})),O(x+1)},children:Object(m.jsx)(d.a,{variant:"h6",children:"Add New"})}),a.map((function(e){return Object(m.jsxs)(l.a,{item:!0,container:!0,justifyItems:"center",justifyContent:"center",children:[Object(m.jsx)(u.a,{margin:"dense",onChange:function(t){var a=t.target.value.slice(17);r((function(t){return t.map((function(t){return t.sno===e.sno?Object(o.a)(Object(o.a)({},t),{},{id:a}):t}))}))},placeholder:"Enter the link"},e.sno),Object(m.jsx)(p.a,{variant:"contained",onClick:function(){r((function(t){return t.filter((function(t){return t.sno!==e.sno}))})),O(x-1)},children:Object(m.jsx)(c.a,{})})]},e.sno)})),Object(m.jsx)(l.a,{item:!0,container:!0,justifyContent:"center",justifyItems:"center",alignContent:"center",alignItems:"center",children:Object(m.jsx)(s.a,{onClick:function(){fetch("".concat(v.a,"/youtubeid.php"),{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({id:w})}).then((function(e){return e.json()})).then((function(e){z(Object(o.a)(Object(o.a)({},y),{},{isOpen:!0,message:e})),window.location.reload()})).catch((function(e){console.error(e)}))},children:"Submit"})})]})}}}]);
//# sourceMappingURL=15.742c6aa5.chunk.js.map