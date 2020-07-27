
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

function onDeviceReady(isDesktop) {
    require(["router", "config/dbMigration", "jquery.loadmask"], function(Router, Setup) {
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

        var tableName = "mxpg_comp_products";
        isTableExist(tableName, function(result) {
        	var length = result.rows.length;
            if(length == 1) {
                Setup.configureDB();
            }
        });

    });
}

if(!isDesktop()) {
    // This is running on a device so waiting for deviceready event
    document.addEventListener('deviceready', onDeviceReady, false);
    document.addEventListener("backbutton", backKeyDown, true);
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

function onResume(){}

function backKeyDown(e) {
    var hash = location.hash;
    var temp = hash.split("/");

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
    }else if(temp === "upload" || temp === "all"){

        router.navigate("/audits", {
            trigger: true
        });
    }else if(location.hash.lastIndexOf("products") != -1|| location.hash.lastIndexOf("continue") != -1){
        if(location.hash.lastIndexOf("products/") != -1){
            history.back();
        }else{
            return;
        }
    }else{
        history.back();
    }
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