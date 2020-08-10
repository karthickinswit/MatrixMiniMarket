"use strict"

define([
	"backbone",
	"mustache",
	"select2"
], function(Backbone, Mustache) {
	var Category = {};
	Category.Model = Backbone.Model.extend({
		
		initialize: function() {}                             
	});

	Category.View = Backbone.View.extend({

		className: "audits",

		events:{
			"click .back": "back",
			"click .go_next": "showSignaturePage",
			"click .complete_audit": "completeAudit",
			"click .take_signature_photo": "takeSignaturePicture",
            "click .retake_signature_photo": "takeSignaturePicture",
            "click .restart_audit": "restartAudit"
		},

		showCategories: function(mId){
			var that = this;

			this.getStoreName(mId);

			setTimeout(function(){
				var id = mId.split("-");
	            var auditId = id[0];
	            var storeId = id[1];
	            var channelId = id[2];
	            var isSgfAvailable = false;
	            var sgfIndex = -1;
                if(inswit.TIMER == 0) {
                    that.startTimer(storeId);
                }
	            

				var callback = function(result){
					console.log(result);

					require(['templates/t_list'], function(template){
						var categories = {};

                        var fn = function(completedProducts){
                            var smartSpotId, sgfId;
                            var auditedProducts = completedProducts;
                            var length = result.length;
                            for(var i =0; i<length; i++){
                                if(result[i].category_type == 4) {
                                    result[i].smartSpot = true;
                                    smartSpotId = result[i].category_id;
                                    that.checkBrandsCompleted(smartSpotId, channelId, storeId);
                                }

                                /*for(var j = 0; j < auditedProducts.length; j++){
                                    var cProduct = auditedProducts[j];
                                    console.log(result[i]);
                                    if(result[i].category_id == cProduct.category_id) {
                                         result[i].done = true;
                                    }
                                }*/
                            }

                            categories = {"categories" : result};
                            categories.mId = mId;
                            categories.name = that.storeName;
                            var html = Mustache.to_html(template.category, categories);
                            that.$el.empty().append(html);

                            that.refreshScroll("wrapper_products");

                            isFullAuditCompleted(db, storeId, channelId, function(isCompleted) {
                                if(isCompleted) {
                                    that.$el.find(".complete_audit, .audit-btn").prop("disabled", false);
                                }
                            });


                          /*  isAuditCompleted(db, storeId, smartSpotId, channelId, function(isCompleted) {
                                if(isCompleted) {
                                    that.$el.find(".complete_audit, .audit-btn").prop("disabled", false);
                                }

                            });*/
                        }

						completedProducts(db, storeId, fn, channelId);

					});
				};

				selectAuditedMonth(db, storeId, function(auditMonthId){
				    fetchCategories(db, channelId, auditMonthId, callback);
				});
				

				
			}, 150);
		},

		checkSmartSpotComplete: function(categoryId, channelId, storeId) {
			var that = this;
			var callback = function(result) {
				if(result) {
					that.$el.find(".list-group-item span"+ "#"+categoryId).find("img").show();
				}
			};
			smartSpotCompleted(db, categoryId, channelId, storeId, callback);
		},

		checkBrandsCompleted: function(categoryId, channelId, storeId) {
            var that = this;
            var callback = function(result) {
                if(result) {
                    that.$el.find(".list-group-item span"+ "#"+categoryId).find("img").show();
                }
            };
            mpSellerCompleted(db, categoryId, channelId, storeId, callback);
        },

		checkPromoBrandComplete: function(categoryId, channelId, storeId) {
            var that = this;
            var callback = function(result) {
                if(result) {
                    that.$el.find(".list-group-item span"+ "#"+categoryId).find("img").show();
                }
            };
            checkPromoCompleted(db, categoryId, channelId, storeId, callback);
        },

		checkSgfComplete: function(channelId, storeId) {
			var that = this;
			var callback = function(result) {
				if(result) {
					that.$el.find(".list-group-item span"+ "#"+channelId).find("img").show();
				}
			};
			isSgfCompleted(db, channelId, storeId, callback);
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

		refreshScroll: function(wrapperEle) {
			if(!this.scrollView) {
				this.scrollView = new iScroll(wrapperEle);
			}
			this.scrollView.refresh();
		},

		showSignaturePage: function(){
			var that = this;

			var mId = this.model.get("mId");

			var id = mId.split("-");
            var auditId = id[0];
            var storeId = id[1];
            var channelId = id[2];

			require(['templates/t_store_score'], function(template){
				var html = Mustache.to_html(template, {"mId": mId, "name": that.storeName});
				that.$el.empty().append(html);

				selectCompletedAudit(db, mId, function(audit){
	            	if(audit.length > 0){
	            		var imageURI = audit.item(0).sign_image;

	            		if(imageURI){
	            			var template = "<img src='{{imageURI}}' width='100%' height='200'><a class='retake_signature_photo retake_photo'>Retake</a>";
							var html = Mustache.to_html(template, {"imageURI":imageURI});

							that.$el.find(".take_signature_photo").remove();
							that.$el.find(".photo_block").empty().append(html);
							that.refreshScroll("audit_score");
	            		}
	                }
            	});

				return that;
			});
		},

		completeAudit: function(event){
			var that = this;


			if($(event.currentTarget).hasClass("clicked")){
				return;
			}
			$(event.currentTarget).addClass("clicked");

			var mId = $(event.currentTarget).attr("href");
			var id = mId.split("-");
            var auditId = id[0];
            var storeId = id[1];
            var channelId = id[2];

			getDistributor(db, auditId, storeId, function(distributor){

	 			if(distributor != inswit.DISTRIBUTOR){ //For certain distributor photo is not mandatory
	 				var image = $(".photo_block img").attr("src");
					if(!image){
						// inswit.alert("Please take a sign off photo!");
						// $(event.currentTarget).removeClass("clicked");
						// return;
					}
	 			}

	 			var callback = function(isYes){
					$(event.currentTarget).removeClass("clicked");
					if(isYes == 1){
                       inswit.exitTimer();

		   	           updateAuditStatus(db, auditId, storeId);

		   	           /* var route = "#audits/" + mId + "/upload";
		   				router.navigate(route, {
		   	                trigger: true
		   	            });*/

                        var route = "#audits";
                        router.navigate(route, {
                            trigger: true
                        });
					}
				}

				/*var title = "Alert";
				var message = "Are you sure you want to complete this audit?\n\n" +
							  "This will update the audit status as 'Audited', after which audit details cannot be modified.";
	            var buttons = ["Yes", "No"];

				inswit.confirm(message, callback, title, buttons);*/

				callback(1);

	 		}, function(){

	 		});
		},


		takeSignaturePicture:function(event){
			var that = this;

			var mId = that.$el.find(".complete_audit").attr("href");
			var id = mId.split("-");
            var auditId = id[0];
            var storeId = id[1];
            var channelId = id[2];

            getStoreCode(db, storeId, function(storeCode){
            	var callback = function(imageURI){
					updateSignaturePhoto(db, auditId, storeId, imageURI);
					that.refreshScroll("audit_score");
				}

				var takeEl = "take_signature_photo";
				var retakeEl = "retake_signature_photo";
				var signPhotoEl = that.$el.find(".take_signature_photo");
                inswit.takePicture(callback, takeEl, retakeEl, storeCode, signPhotoEl);
            });
		},


		startTimer: function(storeId) {
            if(inswit.TIMER) {
                return;
            }else  {
                var ele = $(".timer_container").show();
                var el = "timer";
                var minutes = LocalStorage.getAuditTimeLimit();
                var seconds = 0;
                inswit.setTimer(el, minutes, seconds, storeId);
            }
        },

        restartAudit: function() {
             inswit.confirm(inswit.alertMessages.restartAudit, function onConfirm(buttonIndex) {
                  if(buttonIndex == 1) {
                     inswit.showLoaderEl("Clearing photo(s) ! Please wait...");
                     var el = "timer";
                     inswit.stopTimer(el);
                     inswit.exitTimer();
                     setTimeout(function(){
                         inswit.hideLoaderEl();
                         router.navigate("/audits", {
                                trigger: true
                         });
                     }, 2000);
                  }
             }, "Confirm", ["Ok", "No"]);
        }


	});

	return Category;
});