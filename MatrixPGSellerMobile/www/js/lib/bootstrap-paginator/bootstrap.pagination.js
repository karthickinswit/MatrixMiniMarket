(function(c){var b=function(e,d){this.init(e,d);},a=null;b.prototype={init:function(f,e){this.$element=c(f);var d=(e&&e.bootstrapMajorVersion)?e.bootstrapMajorVersion:c.fn.bootstrapPaginator.defaults.bootstrapMajorVersion,g=this.$element.attr("id");if(d===2&&!this.$element.is("div")){throw"in Bootstrap version 2 the pagination must be a div element. Or if you are using Bootstrap pagination 3. Please specify it in bootstrapMajorVersion in the option";}else{if(d>2&&!this.$element.is("ul")){throw"in Bootstrap version 3 the pagination root item must be an ul element.";}}this.currentPage=1;this.lastPage=1;this.setOptions(e);this.initialized=true;},setOptions:function(d){this.options=c.extend({},(this.options||c.fn.bootstrapPaginator.defaults),d);this.totalPages=parseInt(this.options.totalPages,10);this.numberOfPages=parseInt(this.options.numberOfPages,10);if(d&&typeof(d.currentPage)!=="undefined"){this.setCurrentPage(d.currentPage);}this.listen();this.render();if(!this.initialized&&this.lastPage!==this.currentPage){this.$element.trigger("page-changed",[this.lastPage,this.currentPage]);}},listen:function(){this.$element.off("page-clicked");this.$element.off("page-changed");if(typeof(this.options.onPageClicked)==="function"){this.$element.bind("page-clicked",this.options.onPageClicked);}if(typeof(this.options.onPageChanged)==="function"){this.$element.on("page-changed",this.options.onPageChanged);}this.$element.bind("page-clicked",this.onPageClicked);},destroy:function(){this.$element.off("page-clicked");this.$element.off("page-changed");this.$element.removeData("bootstrapPaginator");this.$element.empty();},show:function(d){this.setCurrentPage(d);this.render();if(this.lastPage!==this.currentPage){this.$element.trigger("page-changed",[this.lastPage,this.currentPage]);}},showNext:function(){var d=this.getPages();if(d.next){this.show(d.next);}},showPrevious:function(){var d=this.getPages();if(d.prev){this.show(d.prev);}},showFirst:function(){var d=this.getPages();if(d.first){this.show(d.first);}},showLast:function(){var d=this.getPages();if(d.last){this.show(d.last);}},onPageItemClicked:function(e){var d=e.data.type,f=e.data.page;this.$element.trigger("page-clicked",[e,d,f]);},onPageClicked:function(f,d,e,g){var h=c(f.currentTarget);switch(e){case"first":h.bootstrapPaginator("showFirst");break;case"prev":h.bootstrapPaginator("showPrevious");break;case"next":h.bootstrapPaginator("showNext");break;case"last":h.bootstrapPaginator("showLast");break;case"page":h.bootstrapPaginator("show",g);break;}},render:function(){var o=this.getValueFromOption(this.options.containerClass,this.$element),q=this.options.size||"normal",l=this.options.alignment||"left",e=this.getPages(),k=this.options.bootstrapMajorVersion===2?c("<ul></ul>"):this.$element,m=this.options.bootstrapMajorVersion===2?this.getValueFromOption(this.options.listContainerClass,k):null,j=null,f=null,h=null,n=null,d=null,g=0;this.$element.prop("class","");this.$element.addClass("pagination");switch(q.toLowerCase()){case"large":case"small":case"mini":this.$element.addClass(c.fn.bootstrapPaginator.sizeArray[this.options.bootstrapMajorVersion][q.toLowerCase()]);break;default:break;}if(this.options.bootstrapMajorVersion===2){switch(l.toLowerCase()){case"center":this.$element.addClass("pagination-centered");break;case"right":this.$element.addClass("pagination-right");break;default:break;}}this.$element.addClass(o);this.$element.empty();if(this.options.bootstrapMajorVersion===2){this.$element.append(k);k.addClass(m);}this.pageRef=[];if(e.first){j=this.buildPageItem("first",e.first);if(j){k.append(j);}}if(e.prev){f=this.buildPageItem("prev",e.prev);if(f){k.append(f);}}for(g=0;g<e.length;g=g+1){d=this.buildPageItem("page",e[g]);if(d){k.append(d);}}if(e.next){h=this.buildPageItem("next",e.next);if(h){k.append(h);}}if(e.last){n=this.buildPageItem("last",e.last);if(n){k.append(n);}}},buildPageItem:function(i,g){var j=c("<li></li>"),e=c("<a></a>"),l="",k="",d=this.options.itemContainerClass(i,g,this.currentPage),f=this.getValueFromOption(this.options.itemContentClass,i,g,this.currentPage),h=null;switch(i){case"first":if(!this.getValueFromOption(this.options.shouldShowPage,i,g,this.currentPage)){return;}l=this.options.itemTexts(i,g,this.currentPage);k=this.options.tooltipTitles(i,g,this.currentPage);break;case"last":if(!this.getValueFromOption(this.options.shouldShowPage,i,g,this.currentPage)){return;}l=this.options.itemTexts(i,g,this.currentPage);k=this.options.tooltipTitles(i,g,this.currentPage);break;case"prev":if(!this.getValueFromOption(this.options.shouldShowPage,i,g,this.currentPage)){return;}l=this.options.itemTexts(i,g,this.currentPage);k=this.options.tooltipTitles(i,g,this.currentPage);break;case"next":if(!this.getValueFromOption(this.options.shouldShowPage,i,g,this.currentPage)){return;}l=this.options.itemTexts(i,g,this.currentPage);k=this.options.tooltipTitles(i,g,this.currentPage);break;case"page":if(!this.getValueFromOption(this.options.shouldShowPage,i,g,this.currentPage)){return;}l=this.options.itemTexts(i,g,this.currentPage);k=this.options.tooltipTitles(i,g,this.currentPage);break;}j.addClass(d).append(e);e.addClass(f).html(l).on("click",null,{type:i,page:g},c.proxy(this.onPageItemClicked,this));if(this.options.pageUrl){e.attr("href",this.getValueFromOption(this.options.pageUrl,i,g,this.currentPage));}if(this.options.useBootstrapTooltip){h=c.extend({},this.options.bootstrapTooltipOptions,{title:k});e.tooltip(h);}else{e.attr("title",k);}return j;},setCurrentPage:function(d){if(d>this.totalPages||d<1){throw"Page out of range";}this.lastPage=this.currentPage;this.currentPage=parseInt(d,10);},getPages:function(){var g=this.totalPages,h=(this.currentPage%this.numberOfPages===0)?(parseInt(this.currentPage/this.numberOfPages,10)-1)*this.numberOfPages+1:parseInt(this.currentPage/this.numberOfPages,10)*this.numberOfPages+1,e=[],f=0,d=0;h=h<1?1:h;for(f=h,d=0;d<this.numberOfPages&&f<=g;f=f+1,d=d+1){e.push(f);}e.first=1;if(this.currentPage>1){e.prev=this.currentPage-1;}else{e.prev=1;}if(this.currentPage<g){e.next=this.currentPage+1;}else{e.next=g;}e.last=g;e.current=this.currentPage;e.total=g;e.numberOfPages=this.options.numberOfPages;return e;},getValueFromOption:function(f){var d=null,e=Array.prototype.slice.call(arguments,1);if(typeof f==="function"){d=f.apply(this,e);}else{d=f;}return d;}};a=c.fn.bootstrapPaginator;c.fn.bootstrapPaginator=function(f){var e=arguments,d=null;c(this).each(function(h,i){var k=c(i),j=k.data("bootstrapPaginator"),g=(typeof f!=="object")?null:f;if(!j){j=new b(this,g);k=c(j.$element);k.data("bootstrapPaginator",j);return;}if(typeof f==="string"){if(j[f]){d=j[f].apply(j,Array.prototype.slice.call(e,1));}else{throw"Method "+f+" does not exist";}}else{d=j.setOptions(f);}});return d;};c.fn.bootstrapPaginator.sizeArray={"2":{"large":"pagination-large","small":"pagination-small","mini":"pagination-mini"},"3":{"large":"pagination-lg","small":"pagination-sm","mini":""}};c.fn.bootstrapPaginator.defaults={containerClass:"",size:"normal",alignment:"left",bootstrapMajorVersion:2,listContainerClass:"",itemContainerClass:function(d,e,f){return(e===f)?"active":"";},itemContentClass:function(d,e,f){return"";},currentPage:1,numberOfPages:5,totalPages:1,pageUrl:function(d,e,f){return null;},onPageClicked:null,onPageChanged:null,useBootstrapTooltip:false,shouldShowPage:function(e,f,g){var d=true;switch(e){case"first":d=(g!==1);break;case"prev":d=(g!==1);break;case"next":d=(g!==this.totalPages);break;case"last":d=(g!==this.totalPages);break;case"page":d=true;break;}return d;},itemTexts:function(d,e,f){switch(d){case"first":return"&lt;&lt;";case"prev":return"&lt;";case"next":return"&gt;";case"last":return"&gt;&gt;";case"page":return e;}},tooltipTitles:function(d,e,f){switch(d){case"first":return"Go to first page";case"prev":return"Go to previous page";case"next":return"Go to next page";case"last":return"Go to last page";case"page":return(e===f)?"Current page is "+e:"Go to page "+e;}},bootstrapTooltipOptions:{animation:true,html:true,placement:"top",selector:false,title:"",container:false}};c.fn.bootstrapPaginator.Constructor=b;}(window.jQuery));