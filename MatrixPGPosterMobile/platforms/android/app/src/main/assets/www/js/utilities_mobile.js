//var PROJECTID = "1c62737aae0d11e59d090050569cb68c";   //development
 var PROJECTID = "d2fdea3832f411e89d0d0050569cb68c"; //production
//var PROJECTID = "97677c1832bc11e5a9bb0050569ccb08"; //demo
//var PROJECTID = "0223f70c2d0b11e8a9bf0050569ccb08"; //process

var inswit = {

	URI: "https://www.appiyo.com/",
	//URI: "http://72.52.114.252/",
	
	DB: "mxpg",

	PRIORITY:{
		PRIORITY_HIGH_ACCURACY:100,
		PRIORITY_BALANCED_POWER_ACCURACY:102,
		PRIORITY_LOW_POWER:104,
		PRIORITY_NO_POWER:105
	},

	TEST_ACCOUNT: {
		email: "",
		password: "",
	},
	
	VERSION : "1.1",

	LOGIN_CREDENTIAL: {
		"email": "poster@matrixbsindia.com",
		"password": "admin@matrix123"
	},

	LOGIN_PROCESS: {
		"projectId":PROJECTID,
		"workflowId":"c34f7e271f2548299163cfcbc8a45728",
		"processId":"ad9bc2667c9a48eb8b51acb872808350"
	},

	UPLOAD_PROCESS: {
		"projectId":PROJECTID,
		"workflowId":"0e7837a4583b44e791586b1a4b2ef39b",
		"processId":"0cd2262db260439a862ffc054d24a11d"
	},

	FORGOT_PROCESS: {
		"projectId":PROJECTID,
		"workflowId":"985ce60665794e74b1bcb1e55438f7fc",
		"processId":"f73083ac21a14e08855cef305a3da62d"
	},

	RESET_PROCESS: {
		"projectId":PROJECTID,
		"workflowId":"985ce60665794e74b1bcb1e55438f7fc",
		"processId":"687676040b15482b8ab79e6f9459e596"
	},
/*
	GET_DETAILED_AUDIT_PROCESS: {
		"projectId":PROJECTID,
		"workflowId":"47e6ab168f6711e5a9bb0050569ccb08",
		"processId":"484eb7568f6711e5a9bb0050569ccb08"
	},*/

	GET_ASSIGNED_AUDIT_PROCESS: {
		"projectId":PROJECTID,
		"workflowId":"4f86d9b2dad54348a25a39ab85d59d49",
		"processId":"19f016c9950541eab19f4a1696013de9"
	},

	INIT_PROCESS: {
		"projectId":PROJECTID,
		"workflowId":"6efae21eab8d4ceea7e155aceb8bd75e",
		"processId":"2fb354b8c21b4592b4231a5d85e87317"
	},

	ERROR_LOG: {
		"projectId":PROJECTID,
		"workflowId":"46224485c35d48569636734a8294bf28",
		"processId":"d732c9d8c01343a3a834e1f68a2c66ea"
	},

	ERROR_LOG_UPLOAD: {
		"projectId":PROJECTID,
		"workflowId":"f83374ebcda140b39baf09857f609a46",
		"processId":"45db426ee84f4365b207c485a6dc0b06"
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

	TIMEOUT: 30000,

	MAXIMUM_AGE: 10000,

	alertMessages : {
		"logOut" : "Are you sure you want to logout?"
	},

	ErrorMessages: {

		"noNetwork" : "check your network settings!",

		"password" : "* Enter valid password",

		"emailError" : "* Enter email id",

		"inValidEmailId" : "Invalid email id",
	},

	ERROR_LOG_TYPES: {
		LOGIN_FAILED: "LOGIN_FAILED",
		IMAGE_UPLOAD: "IMAGE_UPLOAD",
		DB_CREATION: "DB_CREATION",
		DB_UPDATION: "DB_UPDATION",
		UPLOAD_AUDIT: "UPLOAD_AUDIT",
		UPDATE_MASTER: "UPDATE_MASTER"
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
		    		enableHighAccuracy:false,
			    	maximumAge:inswit.MAXIMUM_AGE,
		    		timeout:inswit.TIMEOUT,
			    	priority: inswit.PRIORITY.PRIORITY_NO_POWER
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
		    "projectId":inswit.ERROR_LOG_UPLOAD.projectId,
		    "workflowId":inswit.ERROR_LOG_UPLOAD.workflowId,
		    "processId":inswit.ERROR_LOG_UPLOAD.processId,
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

	takePicture: function(callback, takeEl, retakeEl, superImposeText) {
		var that = this;

		//inswit.errorLog({"info":"Before taking picture"});

		if($("."+ takeEl + ", ." + retakeEl).hasClass("disable")) {
			return;
		}
		
		$("."+ takeEl + ", ." + retakeEl).addClass("disable");

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

	    var oldImageURI = $(".photo_block img").attr("src") || "";
		navigator.camera.getPicture(function(imageURI) {
			var template = "<img src='{{imageURI}}' width='100%' height='200'><a class='{{element}} retake_photo'>Retake</a>";
			var html = Mustache.to_html(template, {"imageURI":imageURI, "element":retakeEl});

			$("." + takeEl).remove();
			$(".photo_block").empty().append(html);

			callback(imageURI);

			if(oldImageURI){
				var imageList = [{"imageURI":oldImageURI}];
				inswit.clearPhoto(imageList);
			}
			
			$("."+ takeEl + ", ." + retakeEl).removeClass("disable");

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
			var norms = processVariables.normOptionRemarkMap;
			var options = processVariables.options;
			var remarks = processVariables.remarks;
			var distributors = processVariables.DistributorBranch;
			var empId = LocalStorage.getEmployeeId();
			var channels = processVariables.channelList;
			
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

			//Remove and populate the norm table
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
        },
};