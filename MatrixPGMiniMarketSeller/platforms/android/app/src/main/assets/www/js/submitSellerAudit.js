define(["jquery"], function(){
	var Audit = function() {

	};

	Audit.prototype = {

		auditDone: function(el, event) {

			var that = this;

			this.scrollView = el.scrollView;

			var mId = $(event.currentTarget).attr("href");

			this.getStoreName(el, mId);

			var id = mId.split("-");
            var auditId = id[0];
            var storeId = id[1];
            var channelId = id[2];

            var categoryId = el.model.get("categoryId");
            var brandId = $(".container").attr("id");

            that.update(el, mId, auditId, storeId, categoryId, brandId);

		},

		//Store the product details in client side DB temporarly.
        update: function(el, mId, auditId, storeId, categoryId, brandId){
            var that = this;
            var nonExecution;

            var mpPhotoEl = $(".multiple_photo_table");
            var isChecked = $(".execution_checkbox").is(':checked');
            var photoTaken = mpPhotoEl.find("img").attr("src").endsWith("take_photo_48.png");

            if(photoTaken && !isChecked) {
                inswit.alert(inswit.ErrorMessages.checkProceed);
                return;
            }

            if(isChecked) {
                inswit.confirm(inswit.alertMessages.no_execution, function onConfirm(buttonIndex) {
                    if(buttonIndex == 2) {
                        return;
                    }else if(buttonIndex == 1) {
                        if(inswit.TIMER != 0) {
                             var audit = {};
                             audit.storeId = storeId;
                             audit.brandId = brandId;
                             audit.categoryId = categoryId;
                             audit.nonExecution = true;

                             populateMPTable(db, audit);
                             window.history.back();
                        }
                    }
                }, "Confirm", ["Yes", "No"]);
            }else if(mpPhotoEl.length == 1) {

                var audit = {};
                audit.storeId = storeId;
                audit.brandId = brandId;
                audit.categoryId = categoryId;

                that.getMPImages(audit, mpPhotoEl);
                 window.history.back();

                return;
            }
            return;


            var takePhoto = "no";
            var ele = that.$el.find(".norms");
            var priority = ele.attr("href");

            if(priority == 10 || priority == 6){
                takePhoto = "yes"
            }

            if(that.$el.find("#frontage_applicable").val()){
                takePhoto = that.$el.find("#frontage_applicable").val().toLowerCase() || "no";
            }

            getDistributor(db, auditId, storeId, function(distributor){

                var image = $(".photo_block img").attr("src") || "";
                var optImage = $(".opt_photo_block img").attr("src") || "";

                var isHotspot = that.model.get("isHotspot");

                if(isHotspot) {
                    if(image.length > 0 && optImage.length == 0) {
                        inswit.alert(inswit.ErrorMessages.hotspotCloseup);
                        return;
                    }else if (image.length == 0 && optImage.length > 0) {
                        inswit.alert(inswit.ErrorMessages.hotspotLongShot);
                        return;
                    }
                }

                if(takePhoto == "no"){
                    image = "";
                }

                var isChecked = that.$el.find(".execution_checkbox").is(':checked')
                if(image.length == 0 && !isChecked) {
                    inswit.alert(inswit.ErrorMessages.checkProceed);
                    return;
                }

                var pId = that.model.get("pId");
                var productName = that.model.get("productName");
                var qrCode = that.$el.find(".qrcode_text").val();




                var product = {};
                product.storeId = storeId;
                product.auditId = auditId;
                product.storeName = that.storeName;
                product.isContinued = true;
                product.isCompleted = false;
                product.image = "";
                product.imageId = "";
                product.imageURI = image || "";
                product.optImageId = "";
                product.optImageURI = optImage || "";
                product.priority = priority;
                product.pId = pId;
                product.productName = productName;
                product.nonExecution = isChecked;
                product.qrCode = qrCode;

                var callback = function(){

                    window.history.back();
                }
                if(isChecked) {
                    inswit.confirm(inswit.alertMessages.no_execution, function onConfirm(buttonIndex) {
                        if(buttonIndex == 2) {
                            return;
                        }else if(buttonIndex == 1) {
                            if(inswit.TIMER != 0) {
                                populateCompProductTable(db, product, callback);
                            }
                        }
                    }, "Confirm", ["Yes", "No"]);
                }else {
                    populateCompProductTable(db, product, callback);
                }


            }, function(){

            });
        },

		getImageUri: function(element) {
		     var flag = $(element).find(".take_product_photo").attr("rel");
		     if(!flag || flag == "true") {
		        flag = true;
		     }else {
		        flag = false;
		     }
            var isVisible = $(element).find(".photo_block").is(":visible");
            if(isVisible) {
                 var imageUri = element.find(".photo_block img").attr("src");
                 if(imageUri.startsWith("images/matrix_icons")) {
                    imageUri = null;
                 }
                 if(!imageUri && flag) {
                    var photoBlock = element.find(".take_product_photo");
                    this.scrollView.scrollToElement(photoBlock[0]);
                    photoBlock.addClass("error").addClass("error_background");
                    var erMsgIsPresent = photoBlock.find(".error_message").length;
                    if(!erMsgIsPresent)
                        photoBlock.append('<div class="error_message" style="display:block"> Photo required </div>');

                    $(".product_done").removeClass("clicked");
                    throw new Error('Brand photo is not present');
                 }
                 console.log(imageUri);

                 return imageUri;
            }
		},


		getMPImages: function(product, element) {

//		    var no = element.parent().find("#frontage_applicable").find(":selected").text();

            cleanMPTable(db, product, function() {

                var getMPphoto =  element.find(".multiple_photo_table_row");

                var noOfRows = getMPphoto.length;

                for(var i=0; i<noOfRows; i++) {

                    if($(getMPphoto[i]).find("img")) {
                        var imgUrl = $(getMPphoto[i]).find("img").attr("src");

                        var imgPos = i+1;
                        console.log("Photo"+ imgUrl);

                         if(imgUrl.startsWith("images/matrix_icons/take_photo_48.png")){
                            continue;
                         }

                        var mpdNorm = {};
                        mpdNorm.storeId = product.storeId;
                        mpdNorm.brandId = product.brandId;
                        mpdNorm.image = imgUrl;
                        mpdNorm.imgPos = imgPos;
                        mpdNorm.categoryId = product.categoryId;

                        console.log("mpdNorm"+ mpdNorm);

                        populateMPTable(db, mpdNorm);


                    }
                }


            });

		},

		getQrData: function(element) {
		    var data = element.find(".qrcode_text").val();
            console.log(data);

            return data;
		},

		checkPromoValues: function(elements) {

		    var length = elements.length;
            for(var i = 0; i < length; i++){
                var flag = true;
                var normEl = $(elements[i]);
                var optionName = normEl.find(".field_value").val();
                if(!optionName) {
                    flag = false;
                    if(i == length-1 ){
                        return flag;
                    }
                    continue;
                }else {
                    return flag;
                }
            }
		},

		getValues: function(element) {
		    var that = this;
			var elements = element.find(".question");
			$(".norms").find(".error").removeClass("error");
			var categoryType = $(".norms").attr("id");
			var normFieldType;
			var norms = [];
			var isPromoValuePresent = false;

			if(categoryType == 4) {
                isPromoValuePresent = that.checkPromoValues(elements);
                if(!isPromoValuePresent) {
                    alert("Fill atleast one value.");
                    $(".product_done").removeClass("clicked");
                    return;
                }
			}
			for(var i = 0; i < elements.length; i++){
				var norm = {},
					remarkName,
					remarkId;

				var normEl = $(elements[i]);

				var id =  normEl.find(".field_type").attr("id").split("-");
	            var normId = id[0];
	            var productId = id[1];
	            var productName = id[2];


				var isConsider = normEl.attr("rel") || false;
				var normName = normEl.find(".product_name").attr("rel");
				// var normId = normEl.find(".product_name").attr("id");

				var productName = normEl.find(".product_header h2").parent().text();


			//	var normFieldType = normEl.find(".product_name").hasClass("field_type") ? 0:1;


				if(normEl.find("select").length){
					normFieldType = 1;
				}else if(normEl.find("input").length){
					normFieldType = 0;
				}


				if(normFieldType == inswit.FIELDS.TEXT_INPUT){
					var optionName = normEl.find(".field_value").val();
					if(optionName < 0) {
						alert("Negative value found, Please recheck the values.")
						$(".product_done").removeClass("clicked");
						return;
					}
					var optionId = normEl.find(".field_value").attr("id");
					remarkName = "No Remark";
					remarkId = "100"
				}else {
					var optionName = normEl.find(".option option:selected").text();
					var optionId = normEl.find(".option option:selected").attr("id");
				}



				if(optionName == "Yes" || optionName == "100" && normFieldType == 3){
					remarkName = normEl.find(".audit_yes option:selected").text() || "";
					remarkId = normEl.find(".audit_yes option:selected").attr("id") || "";
				}else if(normId == "000" && normFieldType == 1) {
					optionName = normEl.find("option:selected").text();
					optionId = normEl.find("option:selected").attr("id");
					remarkName =  normEl.find("option:selected").text();
					remarkId = normEl.find("option:selected").attr("id");
				}else if(normFieldType == 1){
					remarkName = normEl.find(".audit_no option:selected").text() || "";
					remarkId = normEl.find(".audit_no option:selected").attr("id") || "";
				}else if(normFieldType == 0 && !optionName) {
					normEl.find(".field_value").val("");
					remarkName = "No Remark";
					//remarkId = normEl.find(".audit_no option:selected").attr("id") || "";
				}

				var isCategory = (normEl.find("select").attr("rel") == "category")? true:false;

				if(isCategory && optionName == "Yes") {
					remarkName = "Available";
					remarkId = "1";
				}else if(isCategory && optionName == "No"){
					remarkName = "Not Available";
					remarkId = "2";
				}


				if(categoryType != 4){
				    switch(normFieldType){
                        case 0:
                            if((optionName == "") || (remarkName == undefined) && !isPromoValuePresent) {
                                normEl.addClass("error");
                                this.scrollView.scrollToElement(normEl[0]);
                                $(".product_done").removeClass("clicked");
                                return;
                            }

                        break;
                        case 1:

                            if((optionId == "" ) || (optionId == undefined)) {
                                normEl.addClass("error");
                                this.scrollView.scrollToElement(normEl[0]);
                                $(".product_done").removeClass("clicked");
                                return;
                            }
                            if((remarkId == "" ) || (remarkId == undefined)) {
                                normEl.addClass("error");
                                this.scrollView.scrollToElement(normEl[0]);
                                $(".product_done").removeClass("clicked");
                                return;
                            }
                        break;
                    }
				}

				var mpdEl = normEl.find(".gillette_table_body");

                if(mpdEl.length) {
                   var noOfRows = mpdEl.find(".gillette_table_row");
                   var imgSrc = mpdEl.find(".photo_block_container img").attr("src");
                   if(optionName == "Yes") {
                        if(noOfRows.length != (remarkName) || imgSrc.startsWith("images/matrix_icons")) {
                           alert("Given MPD count and number of photos should be same.")
                           $(".product_done").removeClass("clicked");
                           throw new Error('Given MPD count and number of photos should be same');
                           return;
                        }
                   }
                }



				norm.productName = productName;
				norm.productId = productId;
				norm.isConsider = isConsider;
				norm.normName = normName;
				norm.normId = normId;
				norm.optionName = optionName;
				norm.optionId = optionId;
				norm.remarkName = remarkName;
				norm.remarkId = remarkId;

				norms.push(norm);
			}

			return norms;
		},

		getAllHotspotBrands: function(auditId, storeId, channelId){
			var that = this;

            var callback = function(response){

            	var len = response.rows.length;
            	for(var i = 0; i < len; i++){
	                var obj = response.rows.item(i);
	                var pId = obj.product_id;
	                var pName = obj.product_name;
	                var priority = obj.priority;

					that.selectHotSpotNorms(auditId, storeId, channelId, pId, pName, priority);
	            }
			};

			var error = function(e, a){};

			selectAllHotSpotBrands(db, auditId, storeId, channelId, callback, error);
		},

		selectHotSpotNorms: function(auditId, storeId, channelId, pId, pName, priority){
			var that = this;
			var fetchCategory = true;

			var brandwiseNorm = that.model.get("brandwiseNorm");
			var channelId = that.model.get("channelId");

			var cId ;
			if(brandwiseNorm) {
				cId = that.model.get("cId");
			}

			cId = channelId;

			var fn = function(norms){
				fetchCategory = false;

				selectNorms(db, channelId, pId, priority, fetchCategory, function(results) {
					norms = results.concat(norms);

					var product = {};
					product.storeId = storeId;
					product.auditId = auditId;
					product.storeName = that.storeName;
					product.isContinued = true;
					product.isCompleted = false;
					product.image = "";
					product.imageId = "";
					product.norms = that.getDefaultValues(norms, pId, pName, priority);
					product.imageURI = "";
					product.priority = priority;
					product.channelId = channelId;
					product.cId = cId;
					//product.isSOS = ;

				var cb = function(){}

				populateCompProductTable(db, product, cb);

				}, fetchCategory, brandwiseNorm, channelId, false, false, storeId);
			}

				if(brandwiseNorm){
					fetchCategory = false;
					callback.call([]);
				}else {
					selectNorms(db, channelId, pId, priority, product.is_frontage, callback, fetchCategory, brandwiseNorm, channelId, false, false, storeId);
				}
		},

		getDefaultValues: function(norms, pId, pName, priority){
			var values = [];
			for(var i = 0; i < norms.length; i++){
				var norm = norms[i];

				//Getting default options
				var optionName, optionId, remarkName, remarkId;
				for(var j = 0; j < norm.options.length; j++){
					var option = norm.options[j];

					if(option.optionName.replace(/\s/g, '').toLowerCase() == "no"){
						optionName = option.optionName;
						optionId = option.optionId;
						break;
					}
				}

				//Getting default remarks
				for(var k = 0; k < norm.no.length; k++){
					var remark = norm.no[k];

					if(remark.remarkId == "44"){
						remarkName = remark.remarkName;
						remarkId = remark.remarkId;
						break;
					}
				}

				var value = {};
				value.productName = pName;
				value.productId = pId;
				value.isConsider = norm.isConsider;
				value.normName = norm.normName;
				value.normId = norm.normId;
				value.optionName = optionName;
				value.optionId = optionId;
				value.remarkName = remarkName;
				value.remarkId = remarkId;

				values.push(value);
			}

			return values;
		},

		getStoreName: function(el, mId){
			var that = this;

			fetchStoreName(db, mId, function(result){
				that.storeName = result.storeName;
				var channelId = el.model.get("categoryId");
				fetchCategoryName(db, channelId, function(result){
					that.categoryName = result;
				});
			});
		},

	}

	return new Audit();
});