define([
	"backbone",
	"mustache",
	"select2"
], function(Backbone, Mustache) {
	var Norm = {};
	Norm.Model = Backbone.Model.extend({
		
		initialize: function() {}                             
	});

	Norm.View = Backbone.View.extend({

		className: "audits",

		events:{
			"click .take_product_photo": "takeProductPicture",
			"click .retake_product_photo": "takeProductPicture",
			"change .option": "onChangeOption",
			"change #frontage_applicable" : "toggleFrontage",
			"change .hotspot_decision" : "toggleHotspot",
			"click .product_done": "done",
			"click .back": "back",
			"click .complete_audit": "completeAudit",


            "click .take_signature_photo": "takeSignaturePicture",
            "click .retake_signature_photo": "takeSignaturePicture",


            "focus .auditer_comment" : "onFocusTextarea"
		},

		showNorms: function(mId, pId, product, hotspotPid){
			var that = this;

			this.getStoreName(mId);

			var id = mId.split("-");
            var auditId = id[0];
            var storeId = id[1];
            var channelId = id[2];

            var productName = product.product_name;
            var priority = product.priority;


            var pName = productName.toLowerCase().trim();

            var brandName = pName.replace(/\s/g, '');
            var hotspotExecution = false;
            if(brandName == "hotspotexecution"){
            	hotspotExecution = true;
            }

            var isFrontage = false;
            if(product.is_frontage == "true" || product.priority == 6){
            	isFrontage = true;
            }

			//Show completed norms(With user modified values)
			var fn = function(results){
				if(results.length > 0){
					require(['templates/t_audit_questions'], function(template){

						var callback = function(norms){
							selectProduct(db, pId, channelId, function(product){
								//Set first question as a frontage norm
								if(isFrontage && norms[0]){
									norms[0].isFrontage = isFrontage;
								}

								//Set first question as a hotspot decision norm
								if(hotspotExecution && norms[0]){
									norms[0].hotspotExecution = hotspotExecution;
								}

								for(var i = 0; i < norms.length; i++){
									var norm = norms[i];
									var no = norm.no;
									var yes = norm.yes;
									var options = norm.options;

									for(var j = 0; j < results.length; j++){
										var result = results[j];
										if(norm.normId == result.normId){
											for(var k = 0; k < options.length; k++){
												if(result.optionId == options[k].optionId){

												     if(norm.productId == result.productId && result.optionId == "9" ){
                                                            options[k].optionName = result.optionName;
                                                            break;
                                                     }else {
                                                            options[k].selected = "selected";
                                                            options[k].remarkTxt = result.remarkText;

                                                        break;
                                                     }
												}
											}

											var isOk = false;
											for(var l = 0; l < yes.length; l++){
												if(result.remarkId == yes[l].remarkId){
													yes[l].selected = "selected";
													norm.show1 = "block";
													norm.show2 = "none";
													isOk = true;
													break;
												}
											}

											if(!isOk){
												for(var m = 0; m < no.length; m++){
													if(result.remarkId == no[m].remarkId){
														no[m].selected = "selected";
														no[m].showRemark = "block";
														no[m].remarkTxt = result.remarkText;
														norm.show1 = "none";
														norm.show2 = "block";
														norm.showRemark = "block";
														break;
													}
												}
											}
											break;
										}
									}
								}

								var isImage = false;
								var imageURI = results[0].imageURI || "";
								if(imageURI){
									isImage = true;
								}

								var takePhoto = false;
								if(!imageURI && priority == 6){
									takePhoto = true;
								}

								if(!imageURI && priority == 10){
									takePhoto = true;
								}

								selectCompletedAudit(db, mId, function (result) {

								    var html = Mustache.to_html(
                                        template,
                                        {
                                            "norms":norms,
                                            "mId":mId,
                                            "productName":productName,
                                            "productId":pId,
                                            "name":that.storeName,
                                            "imageURI":imageURI,
                                            "isImage":isImage,
                                            "takePhoto":takePhoto,
                                            "element":"retake_product_photo",
                                            "priority": priority,
                                            "lastVisit": that.lastVisit,
                                            "auditerCmt": result[0].auditer_cmt || ""
                                        }
                                    );

                                    that.$el.empty().append(html);

                                    var isFrontageNo = (norms[0].options[1].selected == "selected") ? true:false;

                                    if(isFrontageNo) {
                                        that.$el.find("#frontage_applicable").trigger("change");
                                    }else {
                                        $( ".audit_no option[value=294]" ).wrap( "<span>" );
                                    }

								});


								
								//toggleHotspot function will disable certain elements based on hotspot decision value
//								if(priority == 10){
//									var hotspotDecision = $(".hotspot_decision").val().replace(/\s/g, '').toLowerCase();
//									if(hotspotDecision == "no"){
//										that.toggleHotspot("", "no");
//
//										//Hide all other norms except first
//										var elements  = $(".question");
//										for(var i = 1; i < elements.length; i++){
//											$(elements[i]).hide();
//										}
//									}
//								}

								if(priority == 8){
									var success = function(results){
										if(results.item(0)){
											if(results.item(0).option_name.replace(/\s/g, '').toLowerCase() == "no"){
												that.$el.find(".question_list .norms").prepend("<div class='warning_msg'>This hotspot brand can not be edited. Because hotspot execution is not available</div>");
												that.toggleHotspot("", "no", true);
											}
										}
									}

									selectHotSpotExecutionDecision(db, auditId, storeId, hotspotPid, success);
								}
								
								that.refreshScroll("wrapper_norms");

								return that;
							});
						}

						selectNorms(db, channelId, pId, priority, product.is_frontage, callback);
						
						return that;
					});
				}else{
					//Render first time(Default options)
					var callback = function(norms){
						//Set first question as a frontage norm
						if(isFrontage && norms[0]){
							norms[0].isFrontage = isFrontage;
						}
						//Set first question as a hotspot decision norm
						if(hotspotExecution && norms[0]){
							norms[0].hotspotExecution = hotspotExecution;
						}

						selectProduct(db, pId, channelId, function(product){
							require(['templates/t_audit_questions'], function(template){
								var takePhoto = false;
								if(product.priority == 6 || product.priority == 10){
									takePhoto = true;
								}
								norms.productName = productName;
								norms.productId = pId;
								norms.mId = mId;

								var html = Mustache.to_html(
									template,
									{
										"norms":norms, 
										"mId":mId,
										"productName":productName,
										"productId":pId, 
										"name":that.storeName,
										"takePhoto": takePhoto,
										"element":"retake_product_photo",
										"priority": priority,
										"lastVisit": that.lastVisit
									}
								);
								that.$el.empty().append(html);
								that.refreshScroll("wrapper_norms");					
				
								return that;
							});
						});
					}

					selectNorms(db, channelId, pId, priority, product.is_frontage, callback);
				}
			}
			
			selectProductsToVerify(db, auditId, storeId, pId, fn);
		},

		takeProductPicture:function(event){
			var that = this;

			var mId = $(".product_done").attr("href");

			var id = mId.split("-");
            var auditId = id[0];
            var storeId = id[1];
            var channelId = id[2];

			getStoreCode(db, storeId, function(storeCode){
			 	var callback = function(imageURI){
					that.refreshScroll("wrapper_norms");
				}

				var takeEl = "take_product_photo";
				var retakeEl = "retake_product_photo";
				inswit.takePicture(callback, takeEl, retakeEl, storeCode);
			});
		},

		onChangeOption: function(e){
			var option = e.target.options[e.target.selectedIndex].text
			
			if(option == "Yes" || option == "100"){
				$(e.target).parents(".question").find(".remarks_1").show();
				$(e.target).parents(".question").find(".remarks_2").hide();
				$(e.target).parents(".question").find(".remarks_3").hide();
				$(e.target).parents(".question").find(".remark_txt_bx").hide();

				this.selectFirstOption(e, "remarks_1");
			}else{
				$(e.target).parents(".question").find(".remarks_1").hide();
				$(e.target).parents(".question").find(".remarks_2").show();
				$(e.target).parents(".question").find(".remarks_3").show();
				$(e.target).parents(".question").find(".remark_txt_bx").show();

				this.selectFirstOption(e, "remarks_2");
			}
			this.refreshScroll("wrapper_norms");
		},

		selectFirstOption: function(event, selector) {
		    var size = $(event.target).parents(".question").find("."+selector+" select option").size();
		    var option = $(".question").find(".option").val();
            if(option == "No") {
                if ($( ".audit_no option[value=294]" ).parent().is( "span" ) ){
                        $( ".audit_no option[value=294]" ).unwrap();
                }
            }


             $(event.target).parents(".question").find("."+selector+" select>option:eq(1)").prop('selected', true);
           // }
		},

		toggleFrontage: function(event){
			var value = $(event.currentTarget).val().toLowerCase();

			var elements = this.$el.find(".question");

			if(value == "yes"){


				$(event.target).parents(".question").find(".remarks_1").show();
				$(event.target).parents(".question").find(".remarks_2").hide();

				$( ".audit_no option[value=294]" ).wrap( "<span>" );

				$(".remarks_2 option").removeAttr("selected");


				for(var i = 1; i < elements.length; i++){
					var normEl = $(elements[i]);
					var val = normEl.find(".option").val();


					if(!val || val == "" || val == undefined){
                        normEl.find(".option").prop("selectedIndex", 0);
                    }else {
                        normEl.find(".option").prop("selectedIndex", 0);
                        normEl.find(".remarks_1 option:eq(0)").attr("selected", "true");
                        normEl.find(".audit_yes").prop("selectedIndex", 0);
                        normEl.find(".remarks_1").show();
                        normEl.find(".remarks_2").hide();
                    }
				}

				$(".normal, .take_product_photo, .photo_block").show();
				$(".remark_txt_bx").hide();
				this.selectFirstOption(event, "remarks_1");

			}else{
				$(".remarks_1").hide();
				$(".remarks_2").show();

				if ( $( ".audit_no option[value=294]" ).parent().is( "span" ) ){
                        $( ".audit_no option[value=294]" ).unwrap();
                }
				var selectedValue = $(elements[0]).find(".audit_no").val() || "294";

				for(var i = 1; i < elements.length; i++){
					var normEl = $(elements[i]);
					normEl.find(".option").prop("selectedIndex", 2);
					normEl.find(".audit_no").val("50");

					if(normEl.find(".audit_no").val() !== "50"){
						//normEl.find(".audit_no").prop("selectedIndex", 1);
						normEl.find(".audit_no ").val(selectedValue);
					}
					
				}
				$(".normal, .take_product_photo, .photo_block").hide();
				this.selectFirstOption(event, "remarks_2");
			}

			this.refreshScroll("wrapper_norms");
		},

		toggleHotspot: function(event, value, isHotSpotBrand){

			if(event){
				value = $(event.currentTarget).val().toLowerCase();
			}
			
			var elements = this.$el.find(".question");
			elements.show();
			if(value == "select"){
				$(".remarks_2").hide();
				$(".remarks_1").show();

				$(".option").prop("selectedIndex", 0).prop("disabled", false);
				$(".audit_yes").prop("selectedIndex", 0).prop("disabled", false);

				$(".take_product_photo, .photo_block").show();

			}else if(value == "yes"){
				$(".remarks_2").hide();
				$(".remarks_1").show();

				$(".option").prop("selectedIndex", 0).prop("disabled", false);
				$(".audit_yes").prop("selectedIndex", 0).prop("disabled", false);

				$(".audit_no").prop("disabled", false);

				var normEl = $(elements[0]);
				normEl.find(".option").prop("selectedIndex", 1);

				$(".take_product_photo, .photo_block").show();

				this.selectFirstOption(event, "remarks_1");

			}else{
				$(".remarks_1").hide();
				$(".remarks_2").show();

				var index = 0;
				if(!isHotSpotBrand){
					index = 1;

					var normEl = $(elements[0]);
					normEl.find(".audit_no").prop("selectedIndex", 1);
				}else{
					$(".product_done").hide();
				}
				
				for(var i = index; i < elements.length; i++){
					normEl = $(elements[i]);
					normEl.find(".option").prop("selectedIndex", 2).trigger("change").prop("disabled", true);
					normEl.find(".audit_no").val("44").prop("disabled", true);

					if(!isHotSpotBrand && i > 0){
						$(elements[i]).hide();
					}
				}

				$(".take_product_photo, .photo_block").hide();
			}

			this.refreshScroll("wrapper_norms");
		},

		//Store the product details in client side DB temporarly.
		update: function(mId, auditId, storeId, channelId, fn){
			var that = this;

			var takePhoto = "no";
			var ele = that.$el.find(".norms");
			var priority = ele.attr("href");

			var hotspotDecision;
			if($(".hotspot_decision").val()){
				hotspotDecision = $(".hotspot_decision").val().trim().toLowerCase();
			}
			
			if(priority == 10 && hotspotDecision != "no"){
				takePhoto = "yes"
			}

			if(priority == 6){
				takePhoto = "yes"
			}

			if(that.$el.find("#frontage_applicable").val()){
				takePhoto = that.$el.find("#frontage_applicable").val().toLowerCase() || "no";
			}

			getDistributor(db, auditId, storeId, function(distributor){

				var image = $(".photo_block img").attr("src");
	 			if(distributor != inswit.DISTRIBUTOR){ //For certain distributor photo is not mandatory
					/*if(takePhoto == "yes" && !image){
						inswit.alert("Please take a brand photo!");
						return;
					}*/
	 			}

				if(takePhoto == "no"){
					image = "";
				}

				var product = {};
				product.storeId = storeId;
				product.auditId = auditId;
				product.storeName = that.storeName;
				product.isContinued = true;
				product.isCompleted = false;
				product.image = "";
				product.imageId = "";
				product.norms = that.getValues(auditId, storeId);
				product.imageURI = image || "";
				product.priority = priority;

				if(product.norms && product.norms.length > 0) {
					var callback = function(){
						/*//HotspotDescision is 'no' means we have to
						//update all hotspot brand norms as 'no'
						if(hotspotDecision == "no"){
							that.getAllHotspotBrands(auditId, storeId, channelId);
							window.history.back();
						}else if(hotspotDecision == "yes"){
							//Remove all hotspot brands from completed product table
							removeBrands(db, auditId, storeId);
							//If it is in verify page we need to go back and to do audits
							//for all other hotspot brands
							if(that.model.get("isVerify")){
								var route = "#audits/" + mId + "/products";
								router.navigate(route, {
					                trigger: true,
					                replace: true
					            });
							}else{
								window.history.back();
							}
						}else{
							window.history.back();
						}*/
						fn();
					}

					populateCompProductTable(db, product, callback);
				}else{
					//inswit.alert("No norms mapped to this product! \n Contact your administrator");
				}
	 		}, function(){

	 		});
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

			var fn = function(norms){
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

				var cb = function(){}

				populateCompProductTable(db, product, cb);
			}

			selectNorms(db, channelId, pId, priority, "false", fn);
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

		getValues: function(auditId, storeId){

			var elements = this.$el.find(".question");
			this.$(".norms").find(".error").removeClass("error");
            var normFieldType;

            var productName = this.$el.find(".product_header h2").text();
			var productId = this.$el.find(".product_header h2").attr("id");
			var norms = [];


			var auditerCmtEl = $(".auditer_comment");

            var auditerComment = auditerCmtEl.val() || "";

            /*if((auditerComment == "") || (auditerComment == undefined)) {
                var isVisible = auditerCmtEl.is(":visible");
                if(isVisible){
                    auditerCmtEl.addClass("error");
                    this.scrollView.scrollToElement(normEl.length);
                    return;
                }
            }*/


            updateAuditerComment(db, auditId, storeId, auditerComment);



			for(var i = 0; i < elements.length; i++){
				var norm = {},
					remarkName,
					remarkId,
					remarkTxt;

				var normEl = $(elements[i]);
				var normType = normEl.attr("id");


				if(normEl.find("select").length){
                    normFieldType = 1;
                }else if(normEl.find("textarea").length){
                    normFieldType = 0;
                }

                if(normFieldType == inswit.FIELDS.TEXT_INPUT){
                    var optionName = normEl.find(".field_value").val();
                    if(optionName < 0) {
                        alert("Negative value found, Please recheck the values.")
                        return;
                    }
                    var optionId = normEl.find(".field_value").attr("id");
                    remarkName = "No Remark";
                    remarkId = "100"
                }else {
                    var optionName = normEl.find(".option option:selected").text();
                    var optionId = normEl.find(".option option:selected").attr("id");
                }





				var isConsider = normEl.attr("rel") || false;
				var normName = normEl.find(".product_name").attr("rel");
				var normId = normEl.find(".product_name").attr("id");
				//var optionName = normEl.find(".option option:selected").text();
				//var optionId = normEl.find(".option option:selected").attr("id");
				var remarkTxt = normEl.find(".remark_txt_bx").val() || "";


				
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


                switch(normFieldType){
                    case 0:
                         if((norms[0].optionName == "No")) {
                            break;
                        }else if((optionName == "") || (remarkName == undefined)) {
                            normEl.addClass("error");
                            this.scrollView.scrollToElement(normEl[0]);
                            return;
                        }

                    break;
                    case 1:

                        if((optionId == "" ) || (optionId == undefined)) {
                            normEl.addClass("error");
                            this.scrollView.scrollToElement(normEl[0]);
                            return;
                        }
                        if((remarkId == "" ) || (remarkId == undefined)) {
                            normEl.addClass("error");
                            this.scrollView.scrollToElement(normEl[0]);
                            return;
                        }
                    break;

                    default:
                        if((remarkTxt == "") || (remarkTxt == undefined)) {
                            var isVisible = normEl.find(".remark_txt_bx").is(":visible");
                            if(isVisible){
                                normEl.addClass("error");
                                this.scrollView.scrollToElement(normEl[0]);
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
				norm.remarkTxt = remarkTxt;
				norm.auditerComment = auditerComment;

				norms.push(norm);
			}


			return norms;
		},

		done: function(event){
			var that = this;

			var mId = $(event.currentTarget).attr("href");
			var id = mId.split("-");
            var auditId = id[0];
            var storeId = id[1];
            var channelId = id[2];

			var takePhoto = "no";
			var ele = that.$el.find(".norms");
			var priority = ele.attr("href");

			if(priority == 8){
				var success = function(results){
					if(results.length == 0){
						inswit.alert("Please Audit Hotspot Execution first before audit hotspot brand");
					}else{
						that.update(mId, auditId, storeId, channelId);
					}
				}

				var hotspotPid = that.model.get("hotspotPid");
				selectHotSpotExecutionDecision(db, auditId, storeId, hotspotPid, success);
			}else{

				that.update(mId, auditId, storeId, channelId, function() {
				    /*setTimeout(function(){
				        that.showSignaturePage();
				    },500);*/
				    window.history.back();
				});

			}
		},


		getStoreName: function(mId){
			var that = this;

			fetchStoreName(db, mId, function(result){
				that.storeName = result.storeName;
				that.lastVisit = result.lastVisit;
			});
		},

		back: function(){
			window.history.back();
		},

		refreshScroll: function(wrapperEle) {
			if(!this.scrollView) {
				this.scrollView = new iScroll(wrapperEle);
			}
			this.scrollView.refresh();
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

                       updateAuditStatus(db, auditId, storeId);

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
        },


        onFocusTextarea: function() {
            var that = this;
            setTimeout(function() {
                that.refreshScroll("wrapper_norms");
            }, 1000)

        }

	});

	return Norm;
});