(this["webpackJsonpnot-uml"]=this["webpackJsonpnot-uml"]||[]).push([[0],{13:function(t,e,n){},14:function(t,e,n){},16:function(t,e,n){"use strict";n.r(e);var o,a=n(2),r=n.n(a),c=n(8),i=n.n(c),h=(n(13),n(6)),l=(n(14),n(5)),s=n(0);!function(t){t[t.Root=0]="Root",t[t.View=1]="View",t[t.Action=2]="Action"}(o||(o={}));function u(t,e,n){var o,a=Object(s.a)(t);try{for(a.s();!(o=a.n()).done;){var r=o.value;r.x+=e,r.y+=n,u(r.next,e,n)}}catch(c){a.e(c)}finally{a.f()}}function f(t){var e,n={left:9999999,top:9999999,bottom:-9999999,right:-9999999},o=[],a=Object(s.a)(t);try{for(a.s();!(e=a.n()).done;){var r=e.value;n.left=Math.min(n.left,r.x),n.top=Math.min(n.top,r.y),n.right=Math.max(n.right,r.width+r.x),n.bottom=Math.max(r.height+r.y,n.bottom),r.next.length&&o.push({items:r.next,box:f(r.next)})}}catch(m){a.e(m)}finally{a.f()}if(o.length){var c,i=o.reduce((function(t,e){return t+e.box.bottom-e.box.top}),0)+20*(o.length-1),h=(n.top+n.bottom)/2-i/2,l=n.right+100,v=Object(s.a)(o);try{for(v.s();!(c=v.n()).done;){var d=c.value;u(d.items,l,h),h+=d.box.bottom-d.box.top+20;var x=p(d.items);n.left=Math.min(n.left,x.left),n.top=Math.min(n.top,x.top),n.right=Math.max(n.right,x.right),n.bottom=Math.max(n.bottom,x.bottom)}}catch(m){v.e(m)}finally{v.f()}}return n}function p(t){var e,n={left:99999,top:99999,right:-99999,bottom:-99999},o=Object(s.a)(t);try{for(o.s();!(e=o.n()).done;){var a=e.value,r=p(a.next);n.left=Math.min(n.left,a.x,r.left),n.top=Math.min(n.top,a.y,r.top),n.right=Math.max(n.right,a.x+a.width,r.right),n.bottom=Math.max(n.bottom,a.y+a.height,r.bottom)}}catch(c){o.e(c)}finally{o.f()}return n}function v(t,e){var n,a=[],r=t,c=Object(s.a)(e);try{for(c.s();!(n=c.n()).done;){var i=n.value,h={width:8*i.text.length,height:30},u={text:i.text,type:i.type,x:0,y:r,width:h.width,height:h.height,next:[]};if(r+=h.height,a.push(u),i.children)if(u.type===o.View){var f=v(r,i.children);a.push.apply(a,Object(l.a)(f))}else{var p=v(0,i.children);u.next=p}}}catch(d){c.e(d)}finally{c.f()}return a}function d(t){var e=v(0,t);return{items:e,box:f(e)}}function x(t){return t.startsWith("- ")?{text:t.substring(2).trimStart(),type:o.Action,children:[]}:t.startsWith("-> ")?{text:t.substring(3).trimStart(),type:o.View,children:[]}:{text:t,type:o.View,children:[]}}function m(t){var e=function(t){var e,n=[],o=Object(s.a)(t);try{for(o.s();!(e=o.n()).done;){var a,r,c=e.value;if(""!==c.trim()){var i=null!==(a=(null!==(r=c.match(/^\s+/))&&void 0!==r?r:[""])[0].length)&&void 0!==a?a:0,h=x(c.trim());n.push({spaces:i,element:h})}}}catch(l){o.e(l)}finally{o.f()}return n}(t.split("\n"));return function(t){var e,n={text:"[root]",type:o.Root,children:[]},a={spaces:0,element:n},r=[a],c=Object(s.a)(t);try{var i=function(){var t,n,o=e.value;(null!==(t=null===(n=r.filter((function(t){return t.spaces<o.spaces})))||void 0===n?void 0:n.shift())&&void 0!==t?t:a).element.children.push(o.element),r.unshift(o)};for(c.s();!(e=c.n()).done;)i()}catch(h){c.e(h)}finally{c.f()}return n}(e).children}function b(t){return'<text class="'.concat(t.type===o.View?"view":"action",'" dominant-baseline="hanging" x="').concat(t.x,'" y="').concat(t.y,'" font-size="10">').concat(t.text,"</text>")}function g(t,e,n,o){return'<path d="m'.concat(t," ").concat(e," h").concat(n,'" stroke="#000"').concat(o?' stroke-dasharray="5,5"':"",' stroke-width="2" fill="none"/>')}function y(t,e,n,o){var a=.8*(n-t-10),r=.2*(n-t-10);return'<path d="m'.concat(t," ").concat(e," h ").concat(5," c ").concat(a," ",0," ").concat(r," ").concat(o-e," ").concat(n-t-10," ").concat(o-e," h ").concat(5,'" stroke="#000" stroke-width="2" fill="none" marker-end="url(#arrowhead)" />')}function j(t){var e=[],n=[],a=o.Root,r=t.reduce((function(t,e){return Math.max(t,e.width)}),0);if(t.length){n.push("<g>");var c,i=Object(s.a)(t);try{for(i.s();!(c=i.n()).done;){var h=c.value;switch(a){case o.View:n.push(g(h.x,h.y-10,r,!1));break;case o.Action:n.push(g(h.x,h.y-10,r,!0))}if(n.push(b(h)),a=h.type,h.next){var u=h.next.find((function(t){return t.type===o.View}));u&&n.push(y(h.x+r+8,h.y+6,u.x-10,u.y+6)),e.push(h.next)}}}catch(d){i.e(d)}finally{i.f()}n.push("</g>");var f,p=Object(s.a)(e);try{for(p.s();!(f=p.n()).done;){var v=f.value;n.push.apply(n,Object(l.a)(j(v)))}}catch(d){p.e(d)}finally{p.f()}}return n}function w(t){return j(t).join("\n")}var O=n(1);var M=function(){var t=Object(a.useState)(""),e=Object(h.a)(t,2),n=e[0],o=e[1],r=Object(a.useState)(""),c=Object(h.a)(r,2),i=c[0],l=c[1],s=Object(a.useState)(100),u=Object(h.a)(s,2),f=u[0],p=u[1];function v(t){o(t);var e=function(t){var e=d(m(t)),n=e.items,o=e.box;return{svg:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="'.concat(o.left," ").concat(o.top," ").concat(o.right-o.left," ").concat(o.bottom-o.top,'">\n<style>\ntext { \n    font: 10pt monospace;\n}\n.view {\n    font-weight: bold;\n}\n</style>\n<defs>\n<marker id="arrowhead" markerWidth="10" markerHeight="7" \nrefX="5" refY="2.5" orient="auto">\n  <polygon points="0 0, 6 2.5, 0 5" />\n</marker>\n</defs>\n').concat(w(n),"\n</svg>"),box:o}}(t);l(e.svg),p(e.box.right)}return Object(O.jsxs)("div",{className:"App",children:[Object(O.jsx)("textarea",{value:n,onChange:function(t){return v(t.target.value)}}),Object(O.jsx)("div",{className:"chart-container",children:Object(O.jsx)("div",{style:{width:f+"px"},dangerouslySetInnerHTML:{__html:i}})})]})},k=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,17)).then((function(e){var n=e.getCLS,o=e.getFID,a=e.getFCP,r=e.getLCP,c=e.getTTFB;n(t),o(t),a(t),r(t),c(t)}))};i.a.render(Object(O.jsx)(r.a.StrictMode,{children:Object(O.jsx)(M,{})}),document.getElementById("root")),k()}},[[16,1,2]]]);
//# sourceMappingURL=main.c2f95671.chunk.js.map