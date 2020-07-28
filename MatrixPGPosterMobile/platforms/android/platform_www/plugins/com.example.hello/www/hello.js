cordova.define("com.example.hello.hello", function(require, exports, module) {
module.exports = {
	    greet: function (name, successCallback, errorCallback) {
	        cordova.exec(successCallback, errorCallback, "Hello", "greet", [name]);
	    }
	};

});
