define([
	"backbone",
	"mustache"
	], function(Backbone, Mustache) {

        var multiplePhotos = {};

        multiplePhotos.Model = Backbone.Model.extend({
            initialize: function() {
            }
        });

        multiplePhotos.View = Backbone.View.extend({
            className: "multiplePhotos",

            initialize: function() {
                this.modalEl = null;
            },

            events: {
                "click .add_item": "addPhoto",
                "click .remove_item": "removePhoto",
                "click .take_product_photo": "takeProductPicture",
                "click .retake_product_photo": "retakeProductPicture",
                "click .retake_photo": "retakeProductPicture",
                "change .execution_checkbox": "nonExecutionBrand"

            },

            render: function(callback) {

                var that = this;

                require(['multiplePhotos/template'], function(template){
                    var template = template.multiplePhotoRows;
                    var html = $(Mustache.to_html(template, that.model.toJSON()));
                    that.$el.append(html);
                    return callback(that);
                });
            },

           addPhoto: function(event) {
              event.preventDefault();
              event.stopPropagation();
              var that = this;

              if(this.$el.find(".add_item").hasClass("clicked")){
                                        //inswit.errorLog({"Clicked": that.$el.find(".upload_audit").hasClass("clicked")});
                  return;
              }

              this.$el.find(".add_item").addClass("clicked");
              var count = parseInt(this.$el.find(".audit_yes :selected").html()) || 0;

              require(['templates/t_audits'], function(template){
                  var html = Mustache.to_html(template.photoBlock);
                  that.$el.find(".multiple_photo_table_body").append(html);
                  that.$el.find(".add_item").removeClass("clicked");
                  inswit.events.trigger("refreshScroll");
              });
           },

          removePhoto: function(event) {
              var target =  $(event.target).parents().parents().parents().get(0);
              target.remove();
              inswit.events.trigger("refreshScroll");
          },


          retakeProductPicture: function(event) {

                  var parentsEl = $(event.currentTarget).parent();
                  this.takePhoto(parentsEl);
          },

          takeProductPicture:function(event){

                var parentsEl = $(event.currentTarget).parent();
                this.takePhoto(parentsEl);
                this.$el.find(".non_execution_btn").attr("disabled", true);
          },

          takePhoto: function(parentsEl) {
                var that = this;

                var mId = this.model.get("mId");

                var id = mId.split("-");
                var auditId = id[0];
                var storeId = id[1];
                var channelId = id[2];

                getStoreCode(db, storeId, function(storeCode){
                  var callback = function(imageURI){
                      inswit.events.trigger("refreshScroll");
                  }

                  var takeEl = "take_product_photo";
                  var retakeEl = "retake_product_photo";
                  inswit.takePicture(callback, takeEl, retakeEl, storeCode, parentsEl);
                  that.$el.find(".execution_checkbox").attr("disabled", true);
                });
          },

          nonExecutionBrand: function() {
                var element = this.$el.find(".execution_checkbox");
               if(element.is(':checked')) {
                   this.$el.find(".take_product_photo, .add_item, .remove_item").attr("disabled", true);
               }else {
                   this.$el.find(".take_product_photo, .add_item, .remove_item").removeAttr('disabled');
               }

          }



        });

    return multiplePhotos;
});