(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[18],{611:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var c=n(25),a=n(764),i=n(795),s=n(803),r=(n(0),n(621)),o=n.n(r),j=n(2),l=function(e){var t=e.notify,n=e.setNotify;return Object(j.jsx)(a.a,{direction:"down",in:t.isOpen,children:Object(j.jsx)(i.a,{severity:t.severity,variant:t.variant,style:{alignContent:"center",alignItems:"center",fontSize:18,position:"fixed",zIndex:3,marginLeft:"25%"},action:Object(j.jsx)(s.a,{"aria-label":"close",color:"inherit",size:"large",onClick:function(){n(Object(c.a)(Object(c.a)({},t),{},{isOpen:!1}))},children:Object(j.jsx)(o.a,{fontSize:"inherit"})}),sx:{mb:7},points:"0,100 50,00, 100,100",children:t.message})})}},612:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var c="https://admin-management-website.000webhostapp.com/Church-management-api/api"},780:function(e,t,n){"use strict";n.r(t);var c=n(25),a=n(69),i=(n(4),n(0)),s=n(612),r=n(611),o=n(2);t.default=function(){var e=Object(i.useState)([]),t=Object(a.a)(e,2),n=t[0],j=t[1],l=Object(i.useState)([]),u=Object(a.a)(l,2),b=u[0],h=u[1],O=Object(i.useState)(),d=Object(a.a)(O,2),p=d[0],f=d[1],m=Object(i.useState)(),x=Object(a.a)(m,2),v=x[0],g=x[1],S=Object(i.useState)({isOpen:!1,message:"",variant:"filled",severity:"error"}),C=Object(a.a)(S,2),y=C[0],E=C[1],N=[],I=new Date,R=I.getDate();"00"===(R=R<10?"0"+R:R)&&(R=31,T-=1);var T=I.getMonth()+1>12?I.getMonth():I.getMonth()+1;T=T<10?"0"+T:T;var w=I.getFullYear();I=w+"-"+T+"-"+R,Object(i.useEffect)((function(){fetch("".concat(s.a,"/searchname.php"),{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){j(e)})).catch((function(e){console.error(e)}))}),[]);var k=0,D=n.length;for(k=0;k<D;k++)""!==n[k]&&N.push({name:n[k],present:!1});Object(i.useEffect)((function(){h(N)}),[n]);return Object(o.jsxs)("div",{className:"church-attendance-body",children:[Object(o.jsx)(r.a,{notify:y,setNotify:E}),Object(o.jsxs)("select",{className:"sel-inp",onChange:function(e){return g(e.target.value)},children:[Object(o.jsx)("option",{value:"FIRST SERVICE",children:"FIRST SERVICE"}),Object(o.jsx)("option",{value:"SECOND SERVICE",children:"SECOND SERVICE"}),Object(o.jsx)("option",{value:"THIRD SERVICE",children:"THIRD SERVICE"})]}),Object(o.jsx)("input",{className:"inp",type:"date",onChange:function(e){f(e.target.value)}}),Object(o.jsx)("button",{className:"btn",onClick:function(){f(I)},children:"Click if Today"}),Object(o.jsxs)("p",{children:["Date:",p]}),Object(o.jsxs)("table",{children:[Object(o.jsx)("thead",{children:Object(o.jsxs)("tr",{children:[Object(o.jsx)("th",{children:"Name"}),Object(o.jsx)("th",{children:"Present"}),Object(o.jsx)("th",{children:"Absent"})]})}),Object(o.jsx)("tbody",{children:b.map((function(e){return Object(o.jsxs)("tr",{children:[Object(o.jsx)("td",{children:e.name}),Object(o.jsx)("td",{children:Object(o.jsxs)("label",{className:"container",children:[Object(o.jsx)("input",{onChange:function(t){var n="true"===t.target.value;h((function(t){return t.map((function(t){return t.name===e.name?Object(c.a)(Object(c.a)({},t),{},{present:n}):t}))}))},type:"radio",name:e.name,value:"true"})," ",Object(o.jsx)("span",{className:"fas fa-check present"})," "]})}),Object(o.jsxs)("td",{children:[Object(o.jsxs)("label",{className:"container",children:[Object(o.jsx)("input",{onChange:function(t){var n="false"!==t.target.value;h((function(t){return t.map((function(t){return t.name===e.name?Object(c.a)(Object(c.a)({},t),{},{present:n}):t}))}))},type:"radio",name:e.name,value:"false"})," ",Object(o.jsx)("span",{className:"fas fa-times absent"})]})," "]})]},e.name)}))}),Object(o.jsx)("tfoot",{})]}),Object(o.jsx)("button",{className:"btn",onClick:function(){b&&fetch("".concat(s.a,"/church_attendance.php"),{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({churchattendance:b,date:p,service:v})}).then((function(e){return e.json()})).then((function(e){E(Object(c.a)(Object(c.a)({},y),{},{isOpen:!0,message:e})),window.location.reload()})).catch((function(e){console.error(e)}))},children:"Submit"})]})}}}]);
//# sourceMappingURL=18.53b3a4e0.chunk.js.map