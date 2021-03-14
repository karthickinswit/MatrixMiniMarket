
require.config({
    baseUrl: "js",
    paths: {
        'async': 'lib/require/plugins/async',
        underscore: 'lib/underscore-min',
        backbone: 'lib/backbone-min',
        "jquery": "lib/jquery-2.0.2.min",
        "mustache": "lib/mustache",
        bootstrap: "lib/bootstrap/js/bootstrap.min",
        "css": 'lib/require/plugins/css',
        "jquery.loadmask": "lib/jqueryloadmask/jquery.loadmask",
        "select2" : "lib/select2-4.0.1/dist/js/select2"

    },
    shim: {
        jquery: {
            exports: "$"
        },
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        "bootstrap": {
            deps: ["jquery"]
        },
        mustache: {
            exports: "Mustache"
        },
        "jquery-ui": {
            deps: ["jquery"]
        },
        "jquery.loadmask": ["jquery"]
    }
});

var platform;

function onDeviceReady(isDesktop) {
    platform = cordova.platformId;

    var frontCamera = false;
    require(["router", "jquery.loadmask"], function(Router) {
        try{

            if(!window.openDatabase) {
                inswit.alert('Databases are not supported in this browser');
            }else{
                window.db = openSqliteDb();
            }
        }catch(e){
            if(e == 2) {
                console.log("Invalid database version");
            }else {
                console.log("Unknown error " + e);
            }
            return;
        }

        if(!LocalStorage.getAuditFilter()) {
            LocalStorage.resetAuditFilter();
        }
       
        router = new Router();
        Backbone.history.start();
        
        inswit.events = _.extend({}, Backbone.Events);
        
        $('body').addClass("android cover");
        select2Intitialize();

        screen.orientation.lock('portrait');
        
        $("#confirmPreview").click(function(){
            setTimeout(function(){
                //  oldSrc - Old Image Location, After the confirmation of new image, Delete the old Image.
                var oldSrcImg = $('.capturedImage').attr('oldSrc');
                var imageList = [{"imageURI":oldSrcImg}];
                inswit.clearPhoto(imageList);

                var imageURI = $('.capturedImage').attr('src');

                $(".in_app_camera").hide();
                $(".previewblock").hide();
                if(!inswit.parentsEl) {
					$("." + inswit.takeEl).remove();
					$(".photo_block").empty().append(inswit.html);
				}else {
					$(inswit.parentsEl).find("."+ inswit.takeEl + ", ." + inswit.retakeEl).remove();
					var photoBlock = $(inswit.parentsEl).find(".photo_block");
					if(photoBlock.length == 0) {
						$(inswit.parentsEl).empty().append(inswit.html);
					}else {
						$(inswit.parentsEl).find(".photo_block").empty().append(inswit.html);
					}
                }

                inswit.callback(imageURI);
                var image = $('.capturedImage');
                image.attr("src", "");    
                
            }, 10);
        });

        $("#retryCamera").click(function() {
            var imageSrc = $('.capturedImage').attr('src');
            var imageList = [{"imageURI":imageSrc}];
            inswit.clearPhoto(imageList);
            setTimeout(function(){
                startCamera();
            }, 10);
            var image = $('.capturedImage');
            image.attr("src", "");
        });


        $("#switch_camera").click(function() {
            $("#camerablock").hide();
            CameraPreview.switchCamera(function() {
                $("#camerablock").show();
            }, function() {
                $("#camerablock").show();
            });
        });
        

    });

    document.addEventListener("backbutton", backKeyDown, false);

    // Make the request
    requestLocationAccuracy();

    var crashlytics = FirebaseCrashlytics.initialise();
    crashlytics.logException("my caught exception");

}

if (!isDesktop()) {
    // This is running on a device so waiting for deviceready event
    document.addEventListener('deviceready', onDeviceReady, false);
    document.addEventListener("resume", onResume, false);
    document.addEventListener("touchstart", function(){}, true);

    window.scrollTo(0,1);
      
}else {
    //On desktop don't have to wait for anything
    onDeviceReady(true);
}

function isDesktop() {
    return !navigator.userAgent.match(/(Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile)/);
}

function closeDialog(){
    history.back();
}

function startCamera(){
    options = {
        x: 0,
        y: 0,
        width: window.screen.width,
        height: window.screen.height-200,
        camera: CameraPreview.CAMERA_DIRECTION.BACK,
        tapPhoto: true,
        previewDrag: true,
        toBack: false,
        alpha: 1,
        storeToFile: true,
        disableExifHeaderStripping: false,
        superImposeText: superImposeText
    },
    CameraPreview.startCamera(options, function(){
        $("#camerablock").show();
        $(".previewblock").hide();
    });
}

function onResume(){}

function backKeyDown(e) {
    var hash = location.hash;
    var temp = hash.split("/");

    var link = location.hash.split('/');

    var previewBlock = $(".previewblock").is(":visible");
    if(previewBlock) {
        setTimeout(function(){
            var imageSrc = $('.capturedImage').attr('src');
            var imageList = [{"imageURI":imageSrc}];
            inswit.clearPhoto(imageList);
            startCamera();    
        }, 0);
        return false;
    }

    var inAppCamera = $(".in_app_camera").is(":visible");
    if(inAppCamera) {
        stopCamera();
        return false;
    }


    var length = temp.length;
    if(length > 0)
        temp = temp[length - 1];
    else
        temp = "";

	if(hash == "" || hash == "#audits") {
        inswit.confirm("Are you sure want to quit?", 
            function(index) {
                if(index == 1) {
                    navigator.app.exitApp();
                }
        }, "Quit", ["Ok", "Cancel"]);

        return false;
    }else if(temp === "upload"){

        router.navigate("/audits", {
            trigger: true
        });
    }else if(link[2] == "categoryList"){
            return;
    }else if(hash === "signature"){
        return;
    }else{
        history.back();
    }
}

function stopCamera(){
    CameraPreview.stopCamera();
    setTimeout(function(){ 
        $(".in_app_camera").hide();
    }, 10);
}

function select2Intitialize() {
    $.fn.modal.Constructor.prototype.enforceFocus = function () {
        var that = this;
        $(document).on('focusin.modal', function (e) {
            if ($(e.target).hasClass('select2-input')) {
                return true;
            }

            if (that.$element[0] !== e.target && !that.$element.has(e.target).length) {
                that.$element.focus();
            }
        });
    };
}

function checkConnection() {
    if(isDesktop())
        return true;

	var networkState = navigator.connection.type;
	if(Connection.NONE == networkState)
		return false;
	
	return true;
}

function openSqliteDb() {
    var db = window.openDatabase(inswit.DB, "", "matrix", 1000000);
    return db;
}

function Migrator(db) {
    var migrations = [];
    this.migration = function(number, func){
        migrations[number] = func;
    };
    var doMigration = function(number){
        var initialVersion = parseInt(db.version) || 0;
        if(initialVersion != number && migrations[number]){
            db.changeVersion(db.version, String(number), function(t){
                migrations[number](t);
            },function(err){
                if(console.error) 
                    console.error("Error!: %o", err);
            },function(){
                doMigration(number+1);
            });
        }
    };
    this.doIt = function(){
        var initialVersion = parseInt(db.version) || 0;
        try{
            doMigration(initialVersion+1);
        }catch(e) {
            if(console.error) 
                console.error(e);
        }
    }
}

function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function onError(error) {
    console.error("The following error occurred: " + error);
}

function handleLocationAuthorizationStatus(status) {
    switch (status) {
        case cordova.plugins.diagnostic.permissionStatus.GRANTED:
            if(platform === "ios"){
                onError("Location services is already switched ON");
            }else{
                _makeRequest();
            }
            break;
        case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
            requestLocationAuthorization();
            break;
        case cordova.plugins.diagnostic.permissionStatus.DENIED:
            if(platform === "android"){
                onError("User denied permission to use location");
            }else{
                _makeRequest();
            }
            break;
        case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
            // Android only
            onError("User denied permission to use location");
            break;
        case cordova.plugins.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
            // iOS only
            onError("Location services is already switched ON");
            break;
    }
}

function requestLocationAuthorization() {
    cordova.plugins.diagnostic.requestLocationAuthorization(handleLocationAuthorizationStatus, onError);
}

function requestLocationAccuracy() {
    cordova.plugins.diagnostic.getLocationAuthorizationStatus(handleLocationAuthorizationStatus, onError);
}

function _makeRequest(){
    cordova.plugins.locationAccuracy.canRequest(function(canRequest){
        if (canRequest) {
            cordova.plugins.locationAccuracy.request(function () {
                    // handleSuccess("Location accuracy request successful");
                }, function (error) {
                    onError("Error requesting location accuracy: " + JSON.stringify(error));
                    if (error) {
                        // Android only
                        onError("error code=" + error.code + "; error message=" + error.message);
                        if (platform === "android" && error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED) {
                            if (window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")) {
                                cordova.plugins.diagnostic.switchToLocationSettings();
                            }
                        }
                    }
                }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY // iOS will ignore this
            );
        } else {
            // On iOS, this will occur if Location Services is currently on OR a request is currently in progress.
            // On Android, this will occur if the app doesn't have authorization to use location.
            onError("Cannot request location accuracy");
        }
    });
}

