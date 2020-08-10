define([
	"backbone", 
	"mustache",
	"templates/t_register"
], function(Backbone, Mustache, template) {
	var Register = {};
	Register.Model = Backbone.Model.extend({
		
		initialize: function () { 

	    }                                
	});

	Register.View = Backbone.View.extend({

		className: "loginpage cover home_bg",
		
		initialize: function(){
			this.template = template;
        },

        render: function() {
            var that = this;
            var html ;
            cordova.plugins.IMEI(function (err, imei) {
                console.log('imei', imei);
                that.model.set("imei", imei)
                var uuid = device.uuid
                html = Mustache.to_html(that.template, {"imei": imei, "uuid": uuid});
                that.$el.html(html);
            });

			return that;
		},
    });

    return Register;
});