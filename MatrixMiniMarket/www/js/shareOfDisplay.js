define([
	"backbone",
	"mustache",
	"select2"
], function(Backbone, Mustache) {
	var Brands = {};
	Brands.Model = Backbone.Model.extend({
		
		initialize: function() {}                             
	});

	Brands.View = Backbone.View.extend({

		className: "audits",

		events:{
			"click .back": "back",
			"change .category_option": "onCategoryChange",
			"change .brand_select": "onBrandChange",
			"click .add_item": "addItem",
			"click .remove_item": "removeItem",
			"click .save_sod_audit": "saveItem",
			"click .take_product_photo": "takeProductPicture",
			"click .add_photo": "addPhoto",
			"click .remove_photo": "removePhoto",
		
		},

		showBrands: function(mId, categoryId){
			var that = this;

			this.getStoreName(mId);


			setTimeout(function(){
				var id = mId.split("-");
	            var auditId = id[0];
	            var storeId = id[1];
	            var channelId = id[2];

	            that.model.set("auditId", auditId);
	            that.model.set("storeId", storeId);
	            that.model.set("channelId", channelId);

				var callback = function(result){
					require(['templates/t_list'], function(template){
							var categories = {};
							
							var length = result.length;
							for(var i =0; i<length; i++){
								if(result[i].category_type == 1) {
									result[i].smartSpot = true;
								}
							}
							
							categories = {"categories" : result};
							categories.mId = mId;
							categories.name = that.storeName;
							var html = Mustache.to_html(template.categoryOption, categories);
							that.$el.empty().append(html);

							that.$el.find(".SOD_header, .brand_header, .save_sod_audit").hide();
							that.$el.find(".brand_option").show();

							that.refreshScroll("wrapper_products");
					});
				};
				var sod = true;
				fetchCategories(db, channelId, callback, sod);
				
			}, 350);
		},

		onBrandChange: function(e) {
			var that = this;
			var brandId = e.target.options[e.target.selectedIndex].id;
			this.$el.find(".add_photo").removeClass("clicked");
			if(brandId == ""){
				that.$el.find(".save_sod_audit, .SOD, .SOD_header").hide();
				return;
			}
			

			this.model.set("brandId", brandId);

			var categoryId = this.model.get("categoryId");

			var auditId = that.model.get("auditId");
	        var storeId = that.model.get("storeId");


			that.$el.find(".SOD").empty();

			setTimeout(function(){

				var callback = function(result){

					var data = result;
					var callback=function(sodImages){
						var sodImages=sodImages;

					require(['templates/t_list'], function(template){
				

						var tos = [];
						var length = data.length;
						for (var i = 0; i < length; i++) {
							var obj = {};
							obj.id = data[i].sod_id;
							obj.name = data[i].sod_name;
							obj.value = data[i].count || 0;

							tos.push(obj);
						};



						var json = {"tos" : tos,"sodImages":sodImages};
						var html = Mustache.to_html(template.SOD, json,{multiplePhotoRows: template.multiplePhotoRows});
						that.$el.find(".SOD").empty().append(html);

						that.$el.find(".SOD_header, .SOD").show();

						that.$el.find(".save_sod_audit").show();

						that.refreshScroll("wrapper_products");
					});

				};
				selectSodImagePhotos(db, categoryId, brandId, auditId, storeId, callback);
				
			};
				
				selectCompSodTable(db, categoryId, brandId, auditId, storeId, callback);
				
			}, 350);		
		},

		onCategoryChange: function(e) {
			var that = this;
			var categoryId = e.target.options[e.target.selectedIndex].id;
			that.$el.find(".brand_option, .SOD").empty();
			that.$el.find(".save_sod_audit, .SOD, .SOD_header").hide();

			this.model.set("categoryId", categoryId);
			setTimeout(function(){

				var callback = function(result){
					require(['templates/t_list'], function(template){
							var brands = {};
							
							brands = {"brands" : result};
							var html = Mustache.to_html(template.brandOption, brands);
							that.$el.find(".brand_option").empty().append(html);

							that.refreshScroll("wrapper_products");
							that.$el.find(".brand_header, .brand_option").show();
					});
				};
				
				selectCategoryBrands(db, categoryId,  callback);
				
			}, 350);

			that.$el.find(".save_sod_audit").hide();

			that.refreshScroll("wrapper_products");

		},

		back: function(){
			window.history.back();
		},

		getStoreName: function(mId){
			var that = this;
			
			fetchStoreName(db, mId, function(result){
				that.storeName = result.storeName;
			});
		},

		addItem: function(event) {
			var el = $(event.target.parentElement.parentElement).find(".item_count");
			var count = parseInt(el.text())+1;
			el.text(count);
		},

		removeItem: function(event) {
			var el = $(event.target.parentElement.parentElement).find(".item_count");
			var count = parseInt(el.text())-1;
			if(count >= 0)
				el.text(count);
		},

		saveItem: function() {
			var that = this;
			this.model;
			var result = [];
			var countPhotos=false;


			var mpdEl = that.$el.find(".SOD .gillette_table_body");
                
                if(mpdEl.length) {

                    var noOfRowsEl = mpdEl.find(".gillette_table_row");
                    var isInvalidPhoto = false;

                    var len = noOfRowsEl.length;
                    for(var k = 0; k < len; k++) {
                        var availablePhoto = $(noOfRowsEl[k]).find(".photo_block_container img").attr("src");
                        var isInvalidPhoto = availablePhoto.startsWith("images/matrix_icons");
                        if(isInvalidPhoto){
							alert("Please Take SOD brand Photo Or remove empty tag");
						//    noOfRowsEl.addClass("error");
                        // 	this.scrollView.scrollToElement(noOfRowsEl[k]);
                        //    $(".product_done").removeClass("clicked");
                        //    throw new Error('Given MPD count and number of photos should be same');
                           return;
                            
                        }
                    }

                   
                       
                   
                }
			
			var sodRow =  this.$el.find(".sod_row");
			var length = sodRow.length;
			var PicCount=0;
			
			for(var i =0; i<length; i++){
				var data = {};
				var el = $(sodRow[i]);

				var sodId =  el.find(".sod_name").attr("id"); 
				var itemCount = el.find(".item_count").text();
				// if(sodId=="158"||"159"){floorPhotos=true;}
				
				data.sod_id = sodId

				data.count = itemCount;
				if(inswit.SOD_NORM_LIST.includes(sodId)){
					PicCount+=parseInt(itemCount);
				}
				data.audit_id = that.model.get("auditId");
				data.store_id = that.model.get("storeId");
				data.category_id = that.model.get("categoryId");
				data.brand_id = that.model.get("brandId");

				result.push(data);

			}
			if(len<PicCount){
				inswit.alert("Please take "+PicCount+" Photos");
				return;
			}

			that.getSODImages(that.model);
			populateCompSodTable(db, result, function() {
				console.log("success");
			});
			that.$el.find(".brand_option, .save_sod_audit, .brand_header, .SOD, .SOD_header").hide();

			that.$el.find(".category_option").prop('selectedIndex',0)
			that.refreshScroll("wrapper_products");

		},


		getSODImages: function(model) {
			var that=this;

		    

                var getMPDPhoto =  that.$el.find(".SOD .gillette_table_row");

                var noOfRows = getMPDPhoto.length;

                for(var i=0; i<noOfRows; i++) {

                    if($(getMPDPhoto[i]).find("img")) {
                        var imgUrl = $(getMPDPhoto[i]).find("img").attr("src");


                        var imgPos = i+1;
                        console.log("Photo"+ imgUrl);

                        var mpdNorm = {};
                        mpdNorm.storeId = model.get("storeId");
                        mpdNorm.image = imgUrl;
                        mpdNorm.imgPos = imgPos;
                        mpdNorm.categoryId = model.get("categoryId");
                        mpdNorm.channelId=model.get("channelId");
                        mpdNorm.auditId=model.get("auditId");
						mpdNorm.brandId=model.get("brandId");

                        populateSodImageTable(db, mpdNorm);

                    }
                }

		},
		takeProductPicture:function(event){

			var parentsEl = $(event.currentTarget).parent();
            this.takePhoto(parentsEl);
		},

		takePhoto: function(parentsEl) {
            var that = this;

            var mId = that.model.get("mId");

		    var id = mId.split("-");
            var auditId = id[0];
            var storeId = id[1];
            var channelId = id[2];
            selectCompletedAudit(db, mId, function(data){
				var auditData = data[0];
				var lat = auditData.lat;
				var lng = auditData.lng;

                getStoreCode(db, storeId, function(storeCode){
                    var callback = function(imageURI){
                        that.refreshScroll("wrapper_norms");
                    }

                    var takeEl = "take_product_photo";
                    var retakeEl = "retake_product_photo";
                    if(lat.length != 0) {
						storeCode = storeCode + "Z" + "Lat: "+ lat + "Z" + "Lng: "+lng;
					}
                    inswit.takePicture(callback, takeEl, retakeEl, storeCode, parentsEl);
                });
            });
		},
		addPhoto: function(event) {
			event.preventDefault();
			event.stopPropagation();
			var that = this;
 
			if(this.$el.find(".add_photo").hasClass("clicked")){
									   //inswit.errorLog({"Clicked": that.$el.find(".upload_audit").hasClass("clicked")});
				return;
			}
 
			this.$el.find(".add_photo").addClass("clicked");
			var addItemEl = $(event.target);
			that.questionEl = addItemEl.parents(".SOD");
			var count = 10 || 0;
 
			var tableRowElLen = that.questionEl.find(".gillette_table_row").length;
			if(count <= tableRowElLen) {
				inswit.alert("You have reached maximum limit of SOD MPD count");
				that.$el.find(".add_photo").removeClass("clicked");
				return;
			}else {
				require(['templates/t_audits'], function(template){
					var html = Mustache.to_html(template.sodPhotoBlock);
					var tableBodyEl = that.questionEl.find(".gillette_table_body").append(html);
					that.scrollView.refresh();
					that.$el.find(".add_photo").removeClass("clicked");
				});
			}
 
		},
		removePhoto: function(event) {
			var addItemEl = $(event.target);
			var that = this;
	
			that.questionEl = addItemEl.parents(".SOD");
			var tableRowElLen = that.questionEl.find(".gillette_table_row").length;
			if(tableRowElLen>1)
			{
			var target =  $(event.target).parents().parents().parents().get(0);
			target.remove();
			}
			else {
				inswit.alert("At least one SOD photo is must!");
			}
		},

		refreshScroll: function(wrapperEle) {
			if(!this.scrollView) {
				this.scrollView = new iScroll(wrapperEle);
			}
			this.scrollView.refresh();
		}


	});

	return Brands;
});