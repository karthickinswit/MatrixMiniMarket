var PROJECTID = "cd7ab744e13411eaa360c282e0885855"; //process
//var PROJECTID = "db9cc048e79611eaa360c282e0885855"; //production
//var PROJECTID = "99b8f2863f5511e9bb4f0050569c0a8e"; //development testing
var inswit = {

	URI: "https://www.appiyo.com/",
	
	DB: "mxpg",

	PRIORITY:{
		PRIORITY_HIGH_ACCURACY:100,
		PRIORITY_BALANCED_POWER_ACCURACY:102,
		PRIORITY_LOW_POWER:104,
		PRIORITY_NO_POWER:105
	},

	navigator: {
		notification: {
			alert: "alert"
		}
	},

	cordova: "",

	TEST_ACCOUNT: {
		email: "",
		password: "",
	},

	VERSION : "1.1",

	LOGIN_CREDENTIAL: {
	   "email": "pandghealth@matrixbsindia.com",
	   "password": "admin@matrix123"
	},

	LOGIN_PROCESS: {

	   "projectId":PROJECTID,
	   "workflowId":"258b3267bd2541298de70a470e8360ed",
	   "processId":"6f1fa4a7412641cbb496dcba5a493980"
	},

	UPLOAD_PROCESS: {
	   "projectId":PROJECTID,
	   "workflowId":"07f705887753442695714a88639f5681",
	   "processId":"462c36ca4f244f1d959044abe0033d78"
	},

	FORGOT_PROCESS: {
	   "projectId":PROJECTID,
	   "workflowId":"5ca9223281dc40d1a2c36422af5953f4",
	   "processId":"905ce05eadc24516aa45af23086644ed"
	},

	RESET_PROCESS: {
	   "projectId":PROJECTID,
	   "workflowId":"5ca9223281dc40d1a2c36422af5953f4",
	   "processId":"29e4ffdbd1d641ae8f43915f75878dcd"
	},

	GET_DETAILED_AUDIT_PROCESS: {
	   "projectId":PROJECTID,
	   "workflowId":"898408311e8c4dce91eea053f4ee62cc",
	   "processId":"2d0f5896444e40f5980405382ac35af1"
	},

	GET_ASSIGNED_AUDIT_PROCESS: {
	   "projectId":PROJECTID,
	   "workflowId":"269d0f52c5ab4b469d96f46eaeeb71ad",
	   "processId":"fb543e56d45b4b05a734a704681be9ed"
	},

	INIT_PROCESS: {
	   "projectId":PROJECTID,
	   "workflowId":"f707e34f366a4d8da5e75a3aff273ccf",
	   "processId":"b47577814bc648d79da44752775fa994"
	},

	ERROR_LOG: {
	   "projectId":PROJECTID,
	   "workflowId":"627dcb17343740b983ce56479c7bafda",
	   "processId":"bd8c5df8184642d6a2a62a7b12c1fda3"
	},

	ERROR_LOG_UPLOAD: {
	   "projectId":PROJECTID,
	   "workflowId":"7621152bc06e4cc68b13b793b0f91419",
	   "processId":"68853629529e4117bcb036d261b36556"
	},

	SERVER_TIME: {
		   "projectId":PROJECTID,
		   "workflowId":"ea9c5deb76614b0099444908bd8205d7",
		   "processId":"86224586b6c844c3bd82908dcf25a1d1"
	   },



	//Don't change the order.
	COLORS:[
		"#FF0000",
		"#808000",
		"#800080",
		"#000080",
		"#008000",
		"#008080",
		"#800080",
		"#F5DEB3",
		"#FF6347",
		"#A0522D",
		"#FA8072",
		"#663399",
		"#EEE8AA",
		"#778899",
		"#ADFF2F",
		"#DAA520",
		"#808080",
		"#000000",
		"#800000",
		"#4B0082"
	],

	//Don't change the order.
	BGCOLOR:[
		"#FFFFFF",
		"#FFE199",
		"#FFE0E0"
	],

	//To this distributor photo is not mandatory
	DISTRIBUTOR: 33,

	TIMEOUT: 100000,

	MAXIMUM_AGE: 10000,

	TIMER: 0,

    TIMER_MIN: 0,

	alertMessages : {
		"logOut" : "Are you sure you want to logout?",

		"restartAudit": "Already taken photos for this store will be deleted. Do you like to proceed?",

		"no_execution" : "You have chosen NonExecution. Are you sure you want to continue?",

		"forceLogout": "Are you sure you want to forcly clear the application data?",
	},

	ErrorMessages: {

		"noNetwork" : "check your network settings!",

		"password" : "* Enter valid password",

		"emailError" : "* Enter email id",

		"inValidEmailId" : "Invalid email id",

		"timerExceed": "Taking photos for this store exceeded the time limit.\nYou can restart taking photos by selecting the store from store list.",

        "oldTimerExceed": "Already taken photos for this store are invalid as the time exceeds the limit.\nYou will be navigated to Start page.",

        "checkProceed": "Please check NonExecution to proceed.",

        "invalidMobileTime": "Looks like mobile date&time settings are changed.\nYou can restart taking photos by selecting the store from store list.",

   		"UploadAllFail": "Due to some network issue, some store photos failed to upload, \n so please try after some time.",


	},

	ERROR_LOG_TYPES: {
		LOGIN_FAILED: "LOGIN_FAILED",
		IMAGE_UPLOAD: "IMAGE_UPLOAD",
		DB_CREATION: "DB_CREATION",
		DB_UPDATION: "DB_UPDATION",
		UPLOAD_AUDIT: "UPLOAD_AUDIT",
		UPDATE_MASTER: "UPDATE_MASTER"
	},

	FIELD_TYPES: {
		INT: "1",
		TEXT: "2",
		OPTION: "3"
	},

	FIELDS: {
		"TEXT_INPUT": "0"
	},

	alert: function(msg, title) {
    	navigator.notification.alert( msg, function(){}, title || 'Alert'  );
    },
    
    confirm: function (msg, OnConfirm, title, buttons) {
        navigator.notification.confirm(
            msg,
            OnConfirm,
            title || 'Confirmation Dialog',
            buttons || ["Ok", "Cancel"]
        );
    },

    showLoaderEl: function(message){
    	require(["jquery"], function($){
	    	$(".loader-container").mask(message || "", 100);
    	});
    },

    hideLoaderEl: function(){
    	require(["jquery"], function($){
    		$(".loader-container").unmask();
    	});
    },

   	clearAudits: function(allAudits, processedAudits, newAuditDetails, isConsider){

    	var currentDate = new Date();
    	var currentYear = currentDate.getFullYear();
    	var currentMonth = currentDate.getMonth() + 1;
    	var currentDay = currentDate.getDate();

	    var i = allAudits.length;
    	while(i--){
    		var audit = allAudits[i];
    		var auditId = audit.auditId;
    		var storeId = audit.id;

    		if(newAuditDetails && newAuditDetails.stores && newAuditDetails.stores.length > 0){

    			var newAudits = newAuditDetails.stores;
    			var newAuditId = newAuditDetails.auditId;

    			var isValid = false;
	    		for(var k = 0; k < newAudits.length; k++){

	    			var newAudit = newAudits[k];
	    			var newStoreId = newAudit.sId;

	    			if(storeId == newStoreId && auditId == newAuditId){
	    				isValid = true;
	    				break;
	    			}
	    		}

				if(!isValid){
					var removedButCompleted = false;
					for(var l = 0; l < processedAudits.length; l++){
		    			var prosAudit = processedAudits[l];
		    			var prosAuditId = prosAudit.audit_id;
		    			var prosStoreId = prosAudit.store_id;
		    			var prosComp = prosAudit.comp_audit;

		    			if(storeId == prosStoreId && auditId == prosAuditId && prosComp == "true"){
		    				removedButCompleted = true;
		    				break;
		    			}
		    		}
		    		if(!removedButCompleted){
			    		allAudits.splice(i, 1);
			    		removeAudit(db, auditId, storeId, function(){});
			    	}
				}	    		
    		}else if(isConsider === true){
    			var removedButCompleted = false;
				for(var l = 0; l < processedAudits.length; l++){
	    			var prosAudit = processedAudits[l];
	    			var prosAuditId = prosAudit.audit_id;
	    			var prosStoreId = prosAudit.store_id;
	    			var prosComp = prosAudit.comp_audit;

	    			if(storeId == prosStoreId && auditId == prosAuditId && prosComp == "true"){
	    				removedButCompleted = true;
	    				break;
	    			}
	    		}
	    		if(!removedButCompleted){
		    		allAudits.splice(i, 1);
		    		removeAudit(db, auditId, storeId, function(){});
		    	}
    		}

    		var isProcessed = false;
    		for(var j = 0; j < processedAudits.length; j++){
    			var pAudit = processedAudits[j];
    			var pAuditId = pAudit.audit_id;
    			var pStoreId = pAudit.store_id;
    			var pComp = pAudit.comp_audit;

    			if(storeId == pStoreId && auditId == pAuditId && pComp == "true"){
    				isProcessed = true;
    				break;
    			}
    		}

    		if(!isProcessed){
    			var date = audit.endDate;

	    		date = date.split("-");
		    	var day = parseInt(date[0]);
		    	var month = parseInt(date[1]);
		    	var year = parseInt(date[2]);

		    	var clear = false;
		    	if(year < currentYear){
		    		clear = true;
		    	}else if(month < currentMonth){
		    		clear = true;
		    	}

		    	if(clear){

		    		allAudits.splice(i, 1);
		    		removeAudit(db, auditId, storeId, function(){});
		    	}
    		}
    	}
    },
    
	makeRequest: function(method, url,  callbacks, data){
		var success = checkConnection();
	   	if(!success) {
	   		if(callbacks.failure){
	   			callbacks.failure(0);
	   			return;
	   		}

	   		inswit.alert("No Internet Connection!", "Error");
	   		return;
	   	}

		var that = this;
		
		$.ajax({
			url: url,
			type: method,
			data: data,
			timeout: 90000, //60 sec
			dataType: 'json',
			cache: false,
			success: function(response, textStatus, jqXHR){

				callbacks.success.call(callbacks.scope, response);
			},
			failure: function () {
				inswit.hideLoaderEl();

				if(callbacks.failure){
					callbacks.failure(1);
					return;
				}

                that.alert('Check your network settings!');
            },
			error: function(jqXHR, textStatus, errorThrown){
				inswit.hideLoaderEl();

				if(callbacks.failure){
					callbacks.failure(2);
					return;
				}

				if(textStatus === "timeout"){
					that.alert("Check your network settings!");
				}else {
					if(that.networkAvailable()) {
						that.alert('Server error.Try again!');
					}
				}
			}
		});
	},

	executeProcess: function(processVariables, callbacks){
		
		var success = checkConnection();
		if(!success) {
	   		if(callbacks.failure){
	   			callbacks.failure(0);
	   			return;
	   		}

	   		inswit.alert("No Internet Connection!", "Error");
	   		return;
	   	}

		var that = this;

		var projectId = processVariables.projectId;
		var workflowId = processVariables.workflowId;
		var url = this.URI + "ProcessStore/d/workflows/" + workflowId + "/execute?projectId=" + projectId;

		processVariables = {"processVariables": JSON.stringify(processVariables)}
		
		$.ajax({
			url: url,
			type: "PUT",
			data: processVariables,
			timeout: 90000, //60 sec
			dataType: 'json',
			cache: false,
			success: function(response, textStatus, jqXHR){

				if(response.Error === "0"){
					callbacks.success.call(callbacks.scope, response);
				}else{
					if(callbacks.failure){
						callbacks.failure(2);
						return;
					}else{
						inswit.alert("Server Error. Try Again Later!", "Error");
					}
				}	
			},
			failure: function() {
				inswit.hideLoaderEl();
				if(callbacks.failure){
					callbacks.failure(1);
					return;
				}

                that.alert('Check your network settings!');
            },
			error: function(jqXHR, textStatus, errorThrown){
				inswit.hideLoaderEl();
				if(callbacks.failure){
					callbacks.failure(2);
					return;
				}

				if(textStatus === "timeout"){
					that.alert("Check your network settings!");
				}else {
					if(that.networkAvailable()) {
						that.alert('Server error.Try again later!');
					}
				}
			}
		});
	},

	networkAvailable: function() {
		var networkState = navigator.connection.type;
		if(isDesktop()){
	        return true;
	    }
		if(Connection.NONE == networkState) {
			return false;
		}
		
		return true;
	},

	sessionOut: function(callback) {
		LocalStorage.removeAccessToken();
		LocalStorage.removeEmployeeId();
		LocalStorage.resetAuditFilter();
		
		router.navigate("/", {
			trigger: true
		});
  	},

  	isValidSession: function() {
  		var isValid = false;
		var token = LocalStorage.getAccessToken();

		if(token)
			isValid = true;

		return isValid;
  	},

  	clearPhoto: function(imageList){

		// simple error handler
		function onFailure(e) {
	        console.log('Error: Image file delete failed');
		};
		// delete the file
		function onSuccess(fileEntry){
			console.log(fileEntry.name);

			fileEntry.remove(function(){
				console.log("Image file deleted");
			}, function(){
				console.log("Image file delete failed");
			});
		};

		for(var i = 0; i < imageList.length; i++){
			var imageURI = imageList[i].imageURI;
			if(imageURI)
				window.resolveLocalFileSystemURI(imageURI, onSuccess, onFailure);
		}
	},

	loginInToAppiyo: function(callback){
		var that = this;

		var data = {
			"email": inswit.LOGIN_CREDENTIAL.email.trim(),
			"password": inswit.LOGIN_CREDENTIAL.password.trim(),
			"longTermToken": true
		}

		var url = inswit.URI + "ProcessStore/account/login";
		inswit.makeRequest("POST", url, {
            success: function(response){    
               if(response.token) {
               		LocalStorage.setAccessToken(response.token);
               		cordova.plugins.IMEI(function (err, imei) {
						console.log('imei', imei)
						callback(imei);
					});

				}else {
					inswit.alert("Login Failed.Try Again!");
					inswit.hideLoaderEl();
				}
            }, failure: function(error){
            	switch(error){
            		case 0:{
            			inswit.alert("No Internet Connection!");
            			break;
            		}
            		case 1:{
            			inswit.alert("Check your network settings!");
            			break;
            		}
            		case 2:{
            			inswit.alert("Login Failed.Try Again!");
            			break;
            		}
            	}
            	
            	inswit.hideLoaderEl();
            }
        }, data);
	},

	/**
	 * Get Latitude and longitude using HTML5 geolocation
	 * Recursively it may try twice with 30 seconds timeout(totally 1 minute)
	 * @param  {Function} callback [description]
	 * @param  {[type]}   options  [description]
	 * @param  {[type]}   retry    [description]
	 * @return {[type]}   object   [description]
	 */
	getLatLng: function(callback, options, retry){
		var that = this;
		
		if(navigator.geolocation) {
		    navigator.geolocation.getCurrentPosition(
		    	function(position) {
		    		var pos = {
						lat: position.coords.latitude || "",
						lng: position.coords.longitude || ""
					};

					callback(pos);
					return;

		    	}, function(error) {
			    	options = {
						enableHighAccuracy:false,
				    	maximumAge:inswit.MAXIMUM_AGE,
		    			timeout:inswit.TIMEOUT
					};

					if(retry){

		    			options = {
		    				enableHighAccuracy:false,
					    	maximumAge:inswit.MAXIMUM_AGE,
		    				timeout:inswit.TIMEOUT,
					    	priority: inswit.PRIORITY.PRIORITY_HIGH_ACCURACY
						};

		    			that.getLatLngUsingLocationServices(callback, options, false);
		    			return;
		    		}

		    		that.getLatLng(callback, options, true);

			    }, options);
		}else{
			options = {
				enableHighAccuracy:true,
		    	maximumAge:inswit.MAXIMUM_AGE,
		    	timeout:inswit.TIMEOUT,
		    	priority: inswit.PRIORITY.PRIORITY_HIGH_ACCURACY
			};

			that.getLatLngUsingLocationServices(callback, options, false);
		}  
	},

	/**
	 * Get Latitude and longitude using Location services plgin
	 * Recursively it may try twice with 30 seconds timeout(totally 1 minute)
	 * @param  {Function} callback [description]
	 * @param  {[type]}   options  [description]
	 * @param  {[type]}   retry    [description]
	 * @return {[type]}   object   [description]
	 */
	getLatLngUsingLocationServices: function(callback, options, retry){
		var that = this;

		cordova.plugins.locationServices.geolocation.getCurrentPosition(
			function(position) {
				var pos = {
					lat: position.coords.latitude || "",
					lng: position.coords.longitude || ""
				};
					
				callback(pos);
				return;

			}, function(error) {
				if(retry){
					
					callback("");
					return;
				}

		    	options = {
		    		enableHighAccuracy:true,
			    	maximumAge:inswit.MAXIMUM_AGE,
		    		timeout:inswit.TIMEOUT,
			    	priority: inswit.PRIORITY.PRIORITY_HIGH_ACCURACY
				};

				that.getLatLngUsingLocationServices(callback, options, true);

		    }, options);
	},

	/**
	 * [setColorCode: It will set the color code for audlit list based on the channel type]
	 * @param {[type]}   auditList [description]
	 * @param {Function} fn        [description]
	 */
	setColorCode: function(auditList, fn){

		var length = auditList.length;
		selectChannels(db, function(channels){

			var channelLength = channels.length;
			for(var i = 0; i < length; i++){
				for(var j = 0; j < channelLength; j++){

					var channel = channels.item(j);
					if(channel.channel_id == auditList[i].channelId){
						var channelName = channel.channel_name;
						var matches = channelName.match(/\b(\w)/g);
						var channelCode = matches.join('');

						auditList[i].color = inswit.COLORS[j];
						auditList[i].channelCode = channelCode;
						break;
					}
				}
			}

			fn(auditList);
		});
	},

	errorLog: function(error) {
		inswit.hideLoaderEl();

		var pVariables = {
		    "projectId":inswit.ERROR_LOG.projectId,
		    "workflowId":inswit.ERROR_LOG.workflowId,
		    "processId":inswit.ERROR_LOG.processId,
		    "ProcessVariables":{
		    	"executing": JSON.stringify(error),
		    	"empId":LocalStorage.getEmployeeId(),
		    	"issueDate":new Date(),
		    	"version": inswit.VERSION
		    }
		};

		inswit.executeProcess(pVariables, {
		    success: function(response){
		    	if(response.ProcessVariables){
		    		
		    	}
            }, failure: function(error){
            	inswit.hideLoaderEl();
            	switch(error){
            		case 0:{
            			inswit.alert("No Internet Connection!");
            			break;
            		}
            		case 1:{
            			inswit.alert("Check your network settings!");
            			break;
            		}
            		case 2:{
            			inswit.alert("Server Busy.Try Again!");
            			break;
            		}
            	}
            }
        });
	},

	takePicture: function(callback, takeEl, retakeEl, superImposeText, parentsEl) {
		var that = this;
		var oldImageURI;
		var singlePhoto, dynamicStyle;

		//inswit.errorLog({"info":"Before taking picture"});

		if(!parentsEl) {

            if($("."+ takeEl + ", ." + retakeEl).hasClass("disable")) {
                return;
            }

            $("."+ takeEl + ", ." + retakeEl).addClass("disable");
            oldImageURI = $(".photo_block img").attr("src") || "";
        }else {
            if(parentsEl.find("."+ takeEl + ", ." + retakeEl).hasClass("disable")) {
                return;
            }

            singlePhoto = (parentsEl.hasClass("single_photo") == true) ? true:false;

            if(!singlePhoto) {
                dynamicStyle = "multiple_photo_block";
            }

            parentsEl.find("."+ takeEl + ", ." + retakeEl).addClass("disable");
            oldImageURI = parentsEl.find(".photo_block img").attr("src") || "";

        }

		if (!navigator.camera) {
			inswit.alert("Camera API not supported", "Error");
			return;
		}

		var cameraOptions = {
			quality: 50,
			destinationType: Camera.DestinationType.FILE_URI,//0=DATA_URL, 1=FILE_URI      
			sourceType: Camera.PictureSourceType.CAMERA,  // 0=Photo Library, 1=Camera, 2=Saved Album
			encodingType: Camera.EncodingType.JPEG,// 0=JPEG 1=PNG,
			targetWidth: 728,
	        targetHeight: 1024,
	        correctOrientation: true,
	        inbuiltCamera: true,
	        superImposeTimeStamp: true,
	        superImposeText: superImposeText || ""
	    };

		navigator.camera.getPicture(function(imageURI) {
			var template = "<img class="+ dynamicStyle +" src='{{imageURI}}' width='100%' height='200'><a class='{{element}} retake_photo'>Retake</a>";
			var html = Mustache.to_html(template, {"imageURI":imageURI, "element":retakeEl});

            if(!parentsEl) {
			    $("." + takeEl).remove();
			    $(".photo_block").empty().append(html);
			}else {
			     $(parentsEl).find("."+ takeEl + ", ." + retakeEl).remove();
			     var photoBlock = $(parentsEl).find(".photo_block");
			     if(photoBlock.length == 0) {
			        $(parentsEl).empty().append(html);
			     }else {
			        $(parentsEl).find(".photo_block").empty().append(html);
			     }
			}

			callback(imageURI);

			if(oldImageURI){
				var imageList = [{"imageURI":oldImageURI}];
				inswit.clearPhoto(imageList);
			}

			if(!parentsEl) {
			    $("."+ takeEl + ", ." + retakeEl).removeClass("disable");
			}else {
			    parentsEl.find("."+ takeEl + ", ." + retakeEl).removeClass("disable");
			}

		},function(err) {
			var imageURI = $(".photo_block img").attr("src") || "";
			callback(imageURI);
			$("."+ takeEl + ", ." + retakeEl).removeClass("disable");
		}, cameraOptions);
	},

	updateMasterData: function(processVariables, callback){
		var that = this;

		db.transaction(function(tx){
			var products = processVariables.brandChanMap;
			var productNormMap = processVariables.brandNormMap;
			var norms = processVariables.normOptionRemarkMap || [];
			var options = processVariables.options || [];
			var remarks = processVariables.remarks || [];
			var distributors = processVariables.DistributorBranch;
			var empId = LocalStorage.getEmployeeId();
			var channels = processVariables.channelList;
			var categoryList = processVariables.categoryList;
			
			var modified = false;
			//Remove and populate the product table
			if(products && products.length > 0){
				modified = true;

				removeTable(db, "mxpg_product", function(){
					populateProductTable(db, products, function(){}, function(error, info){
						
						var desc = {
							value: products,
							table: "mxpg_product"
						};

						var pVariables = {
						    "projectId":inswit.ERROR_LOG.projectId,
						    "workflowId":inswit.ERROR_LOG.workflowId,
						    "processId":inswit.ERROR_LOG.processId,
						    "ProcessVariables":{
						    	"errorType": inswit.ERROR_LOG_TYPES.UPDATE_MASTER,
						    	"empId":empId,
						    	"issueDate": new Date(),
						    	"issueDescription": JSON.stringify(desc),
						    	"version": inswit.VERSION
						    }
						};
		
						inswit.executeProcess(pVariables, {
						    success: function(response){
						    	if(response.ProcessVariables){
						    		
						    	}
			                }, failure: function(error){
			                	inswit.hideLoaderEl();
			                	switch(error){
			                		case 0:{
			                			inswit.alert("No Internet Connection!");
			                			break;
			                		}
			                		case 1:{
			                			inswit.alert("Check your network settings!");
			                			break;
			                		}
			                		case 2:{
			                			inswit.alert("Server Busy.Try Again!");
			                			break;
			                		}
			                	}
			                }
			            });
					});
				});
			}
			
			//Remove and populate the norm table
			if(norms && norms.length > 0){
				modified = true;

				removeTable(db, "mxpg_norm", function(){
					populateNormTable(db, norms, function(){}, function(error, info){
						var desc = {
							value: norms,
							table: "mxpg_norm"
						};
						var pVariables = {
						    "projectId":inswit.ERROR_LOG.projectId,
						    "workflowId":inswit.ERROR_LOG.workflowId,
						    "processId":inswit.ERROR_LOG.processId,
						    "ProcessVariables":{
						    	"errorType": inswit.ERROR_LOG_TYPES.UPDATE_MASTER,
						    	"empId":empId,
						    	"issueDate":new Date(),
						    	"issueDescription": JSON.stringify(desc),
						    	"version": inswit.VERSION
						    }
						};
		
						inswit.executeProcess(pVariables, {
						    success: function(response){
						    	if(response.ProcessVariables){
						    		
						    	}
			                }, failure: function(error){
			                	inswit.hideLoaderEl();
			                	switch(error){
			                		case 0:{
			                			inswit.alert("No Internet Connection!");
			                			break;
			                		}
			                		case 1:{
			                			inswit.alert("Check your network settings!");
			                			break;
			                		}
			                		case 2:{
			                			inswit.alert("Server Busy.Try Again!");
			                			break;
			                		}
			                	}
			                }
			            });
					});
				});
			}

			//Remove and populate the category table
			if(categoryList && categoryList.length > 0){
				modified = true;

				removeTable(db, "mxpg_category", function(){
					populateCategoryTable(db, categoryList, function(){}, function(error, info){
						var desc = {
							value: categoryList,
							table: "mxpg_category"
						};
						var pVariables = {
						    "projectId":inswit.ERROR_LOG.projectId,
						    "workflowId":inswit.ERROR_LOG.workflowId,
						    "processId":inswit.ERROR_LOG.processId,
						    "ProcessVariables":{
						    	"errorType": inswit.ERROR_LOG_TYPES.UPDATE_MASTER,
						    	"empId":empId,
						    	"issueDate":new Date(),
						    	"issueDescription": JSON.stringify(desc),
						    	"version": inswit.VERSION
						    }
						};
		
						inswit.executeProcess(pVariables, {
						    success: function(response){
						    	if(response.ProcessVariables){
						    		
						    	}
			                }, failure: function(error){
			                	inswit.hideLoaderEl();
			                	switch(error){
			                		case 0:{
			                			inswit.alert("No Internet Connection!");
			                			break;
			                		}
			                		case 1:{
			                			inswit.alert("Check your network settings!");
			                			break;
			                		}
			                		case 2:{
			                			inswit.alert("Server Busy.Try Again!");
			                			break;
			                		}
			                	}
			                }
			            });
					});
				});
			}

			//Remove and populate the channel table
			if(channels && channels.length > 0){
				modified = true;

				removeTable(db, "mxpg_channel", function(){
					populateChannelTable(db, channels, function(){}, function(error, info){
						var desc = {
							value: channels,
							table: "mxpg_channel"
						};
						var pVariables = {
						    "projectId":inswit.ERROR_LOG.projectId,
						    "workflowId":inswit.ERROR_LOG.workflowId,
						    "processId":inswit.ERROR_LOG.processId,
						    "ProcessVariables":{
						    	"errorType": inswit.ERROR_LOG_TYPES.UPDATE_MASTER,
						    	"empId":empId,
						    	"issueDate":new Date(),
						    	"issueDescription": JSON.stringify(desc),
						    	"version": inswit.VERSION
						    }
						};
		
						inswit.executeProcess(pVariables, {
						    success: function(response){
						    	if(response.ProcessVariables){
						    		
						    	}
			                }, failure: function(error){
			                	inswit.hideLoaderEl();
			                	switch(error){
			                		case 0:{
			                			inswit.alert("No Internet Connection!");
			                			break;
			                		}
			                		case 1:{
			                			inswit.alert("Check your network settings!");
			                			break;
			                		}
			                		case 2:{
			                			inswit.alert("Server Busy.Try Again!");
			                			break;
			                		}
			                	}
			                }
			            });
					});
				});
			}


			//Remove and populate the option table
			if(options && options.length > 0){
				modified = true;

				removeTable(db, "mxpg_option", function(){
					populateOptionTable(db, options, function(){}, function(error, info){
						var desc = {
							value: options,
							table: "mxpg_option"
						};
						var pVariables = {
						    "projectId":inswit.ERROR_LOG.projectId,
						    "workflowId":inswit.ERROR_LOG.workflowId,
						    "processId":inswit.ERROR_LOG.processId,
						    "ProcessVariables":{
						    	"errorType": inswit.ERROR_LOG_TYPES.UPDATE_MASTER,
						    	"empId":empId,
						    	"issueDate":new Date(),
						    	"issueDescription": JSON.stringify(desc),
						    	"version": inswit.VERSION
						    }
						};
		
						inswit.executeProcess(pVariables, {
						    success: function(response){
						    	if(response.ProcessVariables){
						    		
						    	}
			                }, failure: function(error){
			                	inswit.hideLoaderEl();
			                	switch(error){
			                		case 0:{
			                			inswit.alert("No Internet Connection!");
			                			break;
			                		}
			                		case 1:{
			                			inswit.alert("Check your network settings!");
			                			break;
			                		}
			                		case 2:{
			                			inswit.alert("Server Busy.Try Again!");
			                			break;
			                		}
			                	}
			                }
			            });
					});
				});
			}

			//Remove and populate the remark table
			if(remarks && remarks.length > 0){
				modified = true;

				removeTable(db, "mxpg_remark", function(){
					populateRemarkTable(db, remarks, function(){}, function(error, info){
						var desc = {
							value: remarks,
							table: "mxpg_remark"
						};
						var pVariables = {
						    "projectId":inswit.ERROR_LOG.projectId,
						    "workflowId":inswit.ERROR_LOG.workflowId,
						    "processId":inswit.ERROR_LOG.processId,
						    "ProcessVariables":{
						    	"errorType": inswit.ERROR_LOG_TYPES.UPDATE_MASTER,
						    	"empId":empId,
						    	"issueDate":new Date(),
						    	"issueDescription": JSON.stringify(desc),
						    	"version": inswit.VERSION
						    }
						};
		
						inswit.executeProcess(pVariables, {
						    success: function(response){
						    	if(response.ProcessVariables){
						    		
						    	}
			                }, failure: function(error){
			                	inswit.hideLoaderEl();
			                	switch(error){
			                		case 0:{
			                			inswit.alert("No Internet Connection!");
			                			break;
			                		}
			                		case 1:{
			                			inswit.alert("Check your network settings!");
			                			break;
			                		}
			                		case 2:{
			                			inswit.alert("Server Busy.Try Again!");
			                			break;
			                		}
			                	}
			                }
			            });
					});
				});
			}
			
			//Remove and populate the ProductNormMap table
			if(productNormMap && productNormMap.length > 0){
				modified = true;

				removeTable(db, "mxpg_pn_map", function(){
					populateProductNormMap(db, productNormMap, function(){}, function(error, info){
						
						var desc = {
							value: productNormMap,
							table: "mxpg_pn_map"
						};

						var pVariables = {
						    "projectId":inswit.ERROR_LOG.projectId,
						    "workflowId":inswit.ERROR_LOG.workflowId,
						    "processId":inswit.ERROR_LOG.processId,
						    "ProcessVariables":{
						    	"errorType": inswit.ERROR_LOG_TYPES.UPDATE_MASTER,
						    	"empId":empId,
						    	"issueDate":new Date(),
						    	"issueDescription": JSON.stringify(desc),
						    	"version": inswit.VERSION
						    }
						};
		
						inswit.executeProcess(pVariables, {
						    success: function(response){
						    	if(response.ProcessVariables){
						    		
						    	}
			                }, failure: function(error){
			                	inswit.hideLoaderEl();
			                	switch(error){
			                		case 0:{
			                			inswit.alert("No Internet Connection!");
			                			break;
			                		}
			                		case 1:{
			                			inswit.alert("Check your network settings!");
			                			break;
			                		}
			                		case 2:{
			                			inswit.alert("Server Busy.Try Again!");
			                			break;
			                		}
			                	}
			                }
			            });
					});
				});
			}
			
			//Remove and populate the DistributorBranchLocationMap table
			if(distributors && distributors.length > 0){
				modified = true;

				removeTable(db, "mxpg_dist_brch_loc", function(){
					populateDistBranchLocationTable(db, distributors, function(){}, function(error, info){
						
						var desc = {
							value: distributors,
							table: "mxpg_dist_brch_loc"
						};

						var pVariables = {
						    "projectId":inswit.ERROR_LOG.projectId,
						    "workflowId":inswit.ERROR_LOG.workflowId,
						    "processId":inswit.ERROR_LOG.processId,
						    "ProcessVariables":{
						    	"errorType": inswit.ERROR_LOG_TYPES.UPDATE_MASTER,
						    	"empId":empId,
						    	"issueDate":new Date(),
						    	"issueDescription": JSON.stringify(desc),
						    	"version": inswit.VERSION
						    }
						};
		
						inswit.executeProcess(pVariables, {
						    success: function(response){
						    	if(response.ProcessVariables){
						    		
						    	}
			                }, failure: function(error){
			                	inswit.hideLoaderEl();
			                	switch(error){
			                		case 0:{
			                			inswit.alert("No Internet Connection!");
			                			break;
			                		}
			                		case 1:{
			                			inswit.alert("Check your network settings!");
			                			break;
			                		}
			                		case 2:{
			                			inswit.alert("Server Busy.Try Again!");
			                			break;
			                		}
			                	}
			                }
			            });
					});
				});
			}

			//Remove completed audits from the DB
			if(modified){
				selectAllCompletedAudit(db, function(audits){
					var imageList = [];
					var i;
					if(audits.length > 0){
						for(i = 0; i < audits.length; i++){
							(function(index){
								var auditId = audits[index].audit_id;
								var storeId = audits[index].store_id;

								if(audits[index].comp_audit == "false"){
									imageList.push({"imageURI":audits[index].store_image});
									if(audits[index].audited == "true"){
										
										selectCompProducts(db, auditId, storeId, function(products){
											for(var j = 0; j < products.length; j++){
												var product = products[j];

												if(product.image_uri){
													imageList.push({"imageURI":product.image_uri});
												}
											}
											
											//Remove unfinished audit from the DB
											removeAudit(db, auditId, storeId, function(){
												if(index + 1 == audits.length){
													callback();
													//Clear unwanted photo from mobile cache
													inswit.clearPhoto(imageList);
												}
											});
										});
									}else{
										removeAudit(db, auditId, storeId, function(){
											if(index + 1 == audits.length){
												callback();
												//Clear unwanted photo from mobile cache
												inswit.clearPhoto(imageList);
											}
										});
									}
								}

								if(index + 1 == audits.length){
									callback();
									//Clear unwanted photo from the mobile cache
									inswit.clearPhoto(imageList);
								}

							})(i);
						}
					}else{
						callback();
					}
				});
			}else{
				callback();
			}					              
		});
	},

	setTimer: function(elementName, minutes, seconds, storeId) {
    	var element, endTime, hours, mins, msLeft;

    	function twoDigits( n )
    	{
    	   return (n <= 9 ? "0" + n : n);
    	}

    	function updateTimer()
    	{
    	   msLeft = endTime - (+new Date);
    	   if ( msLeft < 1000 ) {
    	      inswit.stopTimer(elementName);
    	      inswit.confirm(inswit.ErrorMessages.timerExceed, function onConfirm(buttonIndex) {
    		    if(buttonIndex == 1) {
    		       router.navigate("/audits", {
    		              trigger: true
    		       });
    		        return;
    		    }
    	      }, "Confirm", ["Ok"]);
    	   } else {
    	       element = $("."+ elementName);
    	       time = new Date( msLeft );
    	       hours = time.getUTCHours();
    	       mins = time.getUTCMinutes();
    	       element.html((hours ? hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds() ));
    	       inswit.TIMER = setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
    	   }
    	}

    	element = $("."+ elementName);
    	element.data("storeId", storeId);
    	endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
    	updateTimer();
    },

    stopTimer: function(elementName) {
    	clearTimeout(inswit.TIMER);
    	inswit.TIMER = 0;
    	var storeId = $("."+elementName).data('storeId');
    	console.log(storeId);
    	inswit.clearPartialAudit(storeId);
    },

    exitTimer: function() {
         clearTimeout(inswit.TIMER);
         inswit.TIMER = 0;
         $(".timer").text("").data('storeId', null);
    },

    clearPartialAudit: function(storeId) {

    	getProdImage(db, storeId, function(response){

            var imageList = [];
            var result = response.rows;
            var length = response.rows.length;
            if(length > 0) {
                for(var i = 0; i < length; i++){
                   var storeImage = result.item(i).image_uri;
                   imageList.push({
                       "imageURI":storeImage
                   });
                }
                console.log(imageList);
                inswit.clearPhoto(imageList);
            }

    	});

    	getStoreImage(db, storeId, function(response){
            var imageList = [];
            imageList.push({
            "imageURI":response.store_image
            });
            console.log(imageList);
            inswit.clearPhoto(imageList);

    	});

    	removePartialAudit(db, storeId);

    	getMPDImage(db, storeId, function(response){
             var imageList = [];
             var result = response.rows;
             var length = response.rows.length;
             if(length > 0) {
               for(var i = 0; i < length; i++){
                  var image_uri = result.item(i).image_uri;
                  imageList.push({
                      "imageURI":image_uri
                  });
               }
               console.log(imageList);
               inswit.clearPhoto(imageList);
            }
        });
    },

    getServerTime: function(fn){
        var that = this;

        var success = checkConnection();
        if(!success) {
            inswit.alert("No Internet Connection!", "Error");
            fn("", 1);
            return;
        }

        var processVariables = {
            "projectId":inswit.SERVER_TIME.projectId,
            "workflowId":inswit.SERVER_TIME.workflowId,
            "processId":inswit.SERVER_TIME.processId,
            "ProcessVariables":{
                "version": inswit.VERSION
            }
        };

        inswit.executeProcess(processVariables, {
            success: function(response){
                if(response.ProcessVariables && response.Error == "0"){
                    var date = new Date(response.ProcessVariables.time);

                    date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                    fn(date);
                }

            }, failure: function(error){
                fn("");
            }
        });
    },

    getCurrentTime: function() {
        return new Date();
    },

    getFormattedDateTime: function(date) {
        var formatDate = date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        return formatDate;
    }
};