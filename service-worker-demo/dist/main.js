!function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n){function t(e){return new Promise((function(n,t){var r=new XMLHttpRequest;r.open("GET",e.url),r.responseType="blob",r.onload=function(){if(200==r.status){var o=[];o[0]=r.response,o[1]=e,n(o)}else t(Error("Image didn't load successfully; error code:"+r.statusText))},r.onerror=function(){t(Error("There was a network error."))},r.send()}))}"serviceWorker"in navigator&&navigator.serviceWorker.register("/sw-test/sw.js",{scope:"/sw-test/"}).then((function(e){e.installing?console.log("Service worker installing"):e.waiting?console.log("Service worker installed"):e.active&&console.log("Service worker active")})).catch((function(e){console.log("Registration failed with "+e)}));var r=document.querySelector("section");window.onload=function(){for(var e=0;e<=Gallery.images.length-1;e++)t(Gallery.images[e]).then((function(e){var n=document.createElement("img"),t=document.createElement("figure"),o=document.createElement("caption"),i=window.URL.createObjectURL(e[0]);n.src=i,n.setAttribute("alt",e[1].alt),o.innerHTML="<strong>"+e[1].name+"</strong>: Taken by "+e[1].credit,r.appendChild(t),t.appendChild(n),t.appendChild(o)}),(function(e){console.log(e)}))}}]);