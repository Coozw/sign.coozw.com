(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-21694bd2"],{"275e":function(t,e,a){},"28ad":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAAA/CAYAAABDyo4+AAAAAXNSR0IArs4c6QAAA1FJREFUeAHtmztrVEEYhndVgqLxkiCIoFgKFhZqpVaCotFAIGqjNomixqDgT7ANAU1SWVlYCBZeIvgPRLQTKxEMapHgJY0SE+P6vMvOerLsbjKzrMnONx+8mes5e75n5/Kdcza5XLK6BPJ1W5exsVAo7OHju9F2NIWe5/P5V6S2DTB5dAv9QFmboTCGNpomBIDBLJUq+afUbTYJCcc70UQVKJVVgrTFHCScPoLmK2nUKI9Tv6nZkFY1+wM8z99B/6VeUxd97wHJznTD2f3oF/Kxx3S2AQlH29ALHzqlvk9Imz7dPGdDc7rj6CH0reS4TyJINkIAHD2Fpn3olPqagtQdCOkRx7U3Z3yvsLPi6HH0Hfma4iQza9IJnA2ZbnYibgB1odCRZCYEaASSmekmSF+Rr2nhNjOStCaFQDIVcWt3++I7jOgvSGam2zGcTRF3vdAMQCcTpHqEaANQ6O6m6Wbm3i10uumhm5nd7SjOhuxupm5L9Mh2CvlazduSqu/FOLu2wg2LTP+V2PyTi+pBY2it5wWO0/88796ms8ctAASYAzReR/tQq8YLc1z7NtSGfO0ZB5zLQioDAs5ZGu8iG89SaqN7SJNG0oy6FN8gAGc3+RFkHY6Y9KIBZWTuFctp8luLNemPCPQzaNYp4wDtVSFZmYDWsJ0qOUCz5aaUEYE/6LcyDtBrFZKVCXwgN6GSA/SA/DtVJCsSGGYX+zeCKHymug99SoByQ/C47ziU4yBVsHLvIulHh1Er3ukWuG6tH/p1mm8kzSG5UXQDQPMqRGl8yRfRLPK1EQ5YHSUU5xQOKn7x/XWIQN5Bbj12p4srxUHB0e8Yfe02B0QPR9MqFE700+pSA3DWxDWPKrwBzGUUuuZED6cPOCG7lRbkBAcI1UxbefRwNK3mqnm/SN0w7dEvyFcSnIqF2BUBczUQjokIWXBCF+Top9VAIBwTEXIjcKIfOdcaGDnRwxlsAE70cU5PIBwTEfJ64LxBvhY/HMU7UNE/svhGyfFHyJlg8Izn0LEDJ2AExR8hu5HjUkZPO3q7hFFkD04GUi+A6j0E04Icd5zjYNRKAXABvUdZm6RwE/3XB+wLXhzWuuDlqAdEJ597EO1Ak+glL/Q+kiZLBFqIwF8JDqJw8wH7UwAAAABJRU5ErkJggg=="},"53ca":function(t,e,a){"use strict";a.d(e,"a",(function(){return s}));a("a4d3"),a("e01a"),a("d3b7"),a("d28b"),a("3ca3"),a("ddb0");function s(t){return s="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},s(t)}},"66ec":function(t,e,a){"use strict";a("275e")},"69a9":function(t,e,a){"use strict";a("b1ed")},ae01:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"times"},[a("div",{staticClass:"lanheng"},[a("div",{staticClass:"first",class:t.sendData>=1||0==t.sendData?t.active:""}),a("div",{class:t.sendData>=2||0==t.sendData?t.active:""}),a("div",{class:t.sendData>=3?t.active:""}),a("div",{staticClass:"last",class:t.sendData>=3?t.active:""})]),a("div",{staticClass:"coat"},[a("div",{staticClass:"itemCoat itemCoat1",class:t.sendData>=1||0==t.sendData?t.active:""},[a("div",[t._v("1")]),a("p",[t._v("填写私钥")])]),a("div",{staticClass:"itemCoat itemCoat2",class:t.sendData>=2||0==t.sendData?t.active:""},[a("div",[t._v("2")]),a("p",{domProps:{innerHTML:t._s(0==t.sendData?"扫码认证":"填写企业信息")}})]),a("div",{staticClass:"itemCoat itemCoat3",class:t.sendData>=3?t.active:""},[a("div",[t._v("3")]),a("p",[t._v("提交成功")])])])])},c=[],n=(a("a9e3"),a("4ec3"),{name:"companyTil",props:{sendData:Number},components:{},data:function(){return{active:"activeColor"}},methods:{}}),o=n,i=(a("69a9"),a("2877")),r=Object(i["a"])(o,s,c,!1,null,"0ac0f2ec",null);e["a"]=r.exports},b1ed:function(t,e,a){},bce6:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"authenCoat"},[s("timershaft",{attrs:{sendData:0}}),s("img",{attrs:{src:a("f4ec")}}),s("p",[t._v("请用微信扫描二维码，进行实名认证")]),s("canvas",{staticStyle:{width:"2.4rem",height:"2.4rem"},attrs:{id:"qrcodes"}}),s("div",{staticClass:"aCoat"},[s("a",{directives:[{name:"show",rawName:"v-show",value:2==t.type,expression:"type==2"}],attrs:{href:t.wxMoveSrc}},[t._v("去实名"),s("img",{attrs:{src:a("28ad"),alt:""}})])])],1)},c=[],n=a("53ca"),o=a("4ec3"),i=a("d055"),r=a.n(i),d=a("ae01"),l={name:"compact",components:{timershaft:d["a"]},props:["datas"],data:function(){return{timer:"",type:"",wxMoveSrc:"",qrcodeImg:""}},watch:{datas:{handler:function(t){console.log(t.val),this.creatQrcode(t.val)},deep:!0}},destroyed:function(){clearInterval(sessionStorage.getItem("keepTimer"))},mounted:function(){console.log(this.datas),this.type=this.common.isMove(),this.datas.val&&this.creatQrcode(this.datas.val)},methods:{saveImg:function(){var t=document.getElementById("qrcodes"),e=document.createElement("a");e.href=t.toDataURL(),e.download="drcQrcode",e.click()},creatQrcode:function(t){console.log(t),console.log(t);var e=document.getElementById("qrcodes"),a=this;e.style.height="2.4rem",e.style.width="2.4rem","object"!=Object(n["a"])(t)&&""!=t&&(a.wxMoveSrc=this.datas.val,r.a.toCanvas(e,t,(function(t){console.log(t),t||2==a.type||(clearInterval(sessionStorage.getItem("keepTimer")),a.timer=setInterval((function(){console.log(a.datas.address),o["a"].getShiming({address:a.datas.address}).then((function(t){console.log(t),t.success&&1==t.data.status&&(window.clearInterval(a.timer),a.$router.push({path:"/company2",query:{type:1,address:a.datas.address}}),a.owmPass="")}))}),2e3),sessionStorage.setItem("keepTimer",a.timer)),a.qrcodeImg=e.toDataURL()})))}}},m=l,u=(a("66ec"),a("2877")),v=Object(u["a"])(m,s,c,!1,null,"d04526cc",null);e["default"]=v.exports},f4ec:function(t,e,a){t.exports=a.p+"img/tengxunyun@3x.07f085f5.png"}}]);