(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-40db6a6f"],{"0796":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"compactCoat"},[e("page-header",{attrs:{activeTab:"6"}},[t._v("Header")]),e("search"),e("div",{staticClass:"coat"},[e("div",{staticClass:"contCoat"},[t._m(0),e("div",{staticClass:"blockCoat"},[e("div",{staticClass:"blockTr"},[e("p",{staticClass:"tdLeft"},[t._v("高度：")]),e("p",{staticClass:"tdRight"},[t._v(t._s(t.detailData.number))])]),e("div",{staticClass:"blockTr"},[e("p",{staticClass:"tdLeft"},[t._v("时间戳：")]),e("p",{staticClass:"tdRight"},[t._v(t._s(t.time))])]),e("div",{staticClass:"blockTr"},[e("p",{staticClass:"tdLeft lt-long"},[t._v("哈希：")]),e("p",{staticClass:"tdRight"},[t._v(t._s(t.detailData.hash))])]),e("div",{staticClass:"blockTr block-tr-special",staticStyle:{border:"0"}},[e("p",{staticClass:"tdLeft"},[t._v("交易数：")]),e("p",{staticClass:"tdRight shubiao",on:{click:function(a){return t.fromMiner(t.detailData.number,t.detailData.txs)}}},[t._v(t._s(t.detailData.txs))])])])])]),e("div",{staticClass:"footer"},[e("page-footer",{staticClass:"footer"})],1)],1)},i=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"tilCoat"},[e("h3",[t._v("区块")])])}],n=e("386f"),c=e("0472"),o=e("0ff1"),r=(e("f78d"),e("4ec3")),l={name:"compact",components:{PageHeader:n["a"],PageFooter:c["a"],search:o["a"]},data:function(){return{maskingShow:!1,detailData:"",time:"",blockNum:""}},watch:{$route:function(){this.blockNum=this.$route.query.num,this.getData(this.blockNum)}},created:function(){this.blockNum=this.$route.query.num,this.getData(this.blockNum)},methods:{getData:function(t){var a=this;this.$jsonp(r["a"].indexGetBlock()+"/block/blockChain/blockDetail?param="+t).then((function(t){console.log(t),1!=t.error&&(a.detailData=t.obj,a.time=t.date)}))},toDetail:function(){this.maskingShow=!1,this.$router.push({path:"/compactDetail2"})},fromMiner:function(t,a){this.$router.push({path:"/tradeView",query:{number:t,tradeNum:a}})}}},u=l,g=(e("881c"),e("2877")),p=Object(g["a"])(u,s,i,!1,null,"5e0d5560",null);a["default"]=p.exports},"0ff1":function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"b-search-box clear"},[e("div",{staticClass:"b-search right"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.searchText,expression:"searchText"}],attrs:{type:"text",placeholder:"地址/交易哈希/区块号"},domProps:{value:t.searchText},on:{input:function(a){a.target.composing||(t.searchText=a.target.value)}}}),e("button",{staticClass:"b-btn-search el-icon-search",attrs:{type:"button"},on:{click:function(a){return t.searchData(t.searchText)}}})])])},i=[],n=(e("ac1f"),e("5319"),e("4ec3"),{name:"search-input",created:function(){},data:function(){return{searchText:""}},methods:{searchData:function(t){t=t.replace(/\s*/g,"");var a=String(t).length;0!=a&&this.common.commonSearch(this,t)}}}),c=n,o=(e("5de9"),e("2877")),r=Object(o["a"])(c,s,i,!1,null,"43a64045",null);a["a"]=r.exports},"538b":function(t,a,e){"use strict";e("72f0")},"5de9":function(t,a,e){"use strict";e("9c59")},"5e0f":function(t,a,e){},"72f0":function(t,a,e){},"881c":function(t,a,e){"use strict";e("5e0f")},"9c59":function(t,a,e){},f78d:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:t.loading,expression:"loading",modifiers:{fullscreen:!0,lock:!0}}],attrs:{id:"smartList"}},[e("div",{staticClass:"block"},[e("el-pagination",{staticClass:"abcd",attrs:{background:"",layout:"slot,prev","current-page":Number(t.pages),"prev-text":"<","page-size":t.pageData.pageSize,total:Number(t.pagesLength)},on:{"current-change":t.pageChange}},[e("span",{staticClass:"first-pager page-cursor el-icon-d-arrow-left",on:{click:t.firstPage}})]),e("span",{staticClass:"m-page-count"},[t._v(t._s(Number(t.pages))+"/"+t._s(Number(t.pagesLength)))]),e("el-pagination",{staticClass:"abcd",attrs:{background:"",layout:"pager,next,slot","next-text":">","page-size":t.pageData.pageSize,"current-page":Number(t.pages),total:Number(t.pagesLength)},on:{"current-change":t.pageChange}},[e("span",{staticClass:"last-pager page-cursor el-icon-d-arrow-right",on:{click:t.lastPage}})])],1)])},i=[],n={name:"contents",mounted:function(){this.pageControl()},components:{},methods:{pageControl:function(){var t=this;this.loading=!0;var a=this;this.showData=[],setTimeout((function(){a.loading=!1}),3e3),""!=this.pageData.url&&this.$jsonp(this.pageData.url+"pageNo="+this.pages).then((function(e){if(1==e.error)return a.loading=!1,void a.common.errBox(a,"请求失败",3);a.pagesLength=e.lastBlockNumber,t.$emit("get-data",e),a.loading=!1}))},firstPage:function(){this.pages=1,this.pageControl()},lastPage:function(){this.pages=Math.ceil(this.pagesLength/this.pageData.pageSize),this.pageControl()},pageChange:function(t){this.pages="".concat(t),this.pageControl()}},computed:{},props:{pageData:Object},data:function(){return{pages:1,pagesLength:0,pageSize:0,showData:[],loading:!1}}},c=n,o=(e("538b"),e("2877")),r=Object(o["a"])(c,s,i,!1,null,"0a81c1a9",null);a["a"]=r.exports}}]);