define([
	"backbone",
	"mustache",
	"select2"
], function(Backbone, Mustache) {
	var Product = {};
	Product.Model = Backbone.Model.extend({
		
		initialize: function() {}                             
	});

	Product.View = Backbone.View.extend({

		className: "audits",

		events:{
			"click .verify_audit": "verify",
			"click .back": "back",
			"click .go_next": "showSignaturePage",
			"click .take_signature_photo": "takeSignaturePicture",
            "click .retake_signature_photo": "takeSignaturePicture",
            "click .complete_audit": "completeAudit",
		},

		showProducts: function(mId){
			var that = this;

			this.getStoreName(mId);

			setTimeout(function(){
				var id = mId.split("-");
	            var auditId = id[0];
	            var storeId = id[1];
	            var channelId = id[2];

				var callback = function(products){
					require(['templates/t_audit_products'], function(template){

						var fn = function(completedProducts){
							var cLength = completedProducts.length;
							var length = products.products.length;

							for(var i = 0; i < cLength; i++){
								var cProduct = completedProducts[i];
								for(var j = 0; j < length; j++){
									var product = products.products[j];
									if(product.product_id == cProduct.product_id){
										product.done = true;
										break;
									}
								}
							}
							products.mId = mId;
							products.name = that.storeName;

							var html = Mustache.to_html(template, products);
							that.$el.empty().append(html);

							if(cLength >= 1){
								//that.$el.find(".verify_audit").attr("disabled", false);
								that.$el.find(".go_next").attr("disabled", false);
							}
							that.refreshScroll("wrapper_products");
							return that;
						}
						selectCompProducts(db, auditId, storeId, fn);
					});
				};
				
				var er = function(e, a){
				};

				selectProducts(db, auditId, storeId, channelId, callback, er);
			}, 350);
		},

		verify: function(event){
			var route = $(event.currentTarget).attr("href");
			router.navigate(route, {
                trigger: true
            });
		},

		back: function(){
            var mId = this.model.get("mId");

            var isSelfieContainer = $(".upload_container");
            console.log("isSelfieContainer length"+ isSelfieContainer.length);
            if(isSelfieContainer.length == 1) {
                location.reload();
                return;
            }
          

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
                inswit.takePicture(callback, takeEl, retakeEl, storeCode);
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
                        inswit.alert("Please take a selfie photo with Counsellor!");
                        $(event.currentTarget).removeClass("clicked");
                        return;
                    }
                }

                var callback = function(isYes){
                    $(event.currentTarget).removeClass("clicked");
                    if(isYes == 1){

                      var auditorName = $("#aName").val() || "";

                       updateAuditStatus(db, auditId, storeId, auditorName);

                        var route = "#audits/" + mId + "/upload";
                        router.navigate(route, {
                            trigger: true
                        });
                    }
                }

                var title = "Alert";
                var message = "Are you sure you want to complete this audit?\n\n" +
                              "This will update the audit status as 'Audited', after which audit details cannot be modified.";
                var buttons = ["Yes", "No"];

                inswit.confirm(message, callback, title, buttons);

            }, function(){

            });
        }

	});

	return Product;
});