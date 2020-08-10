define([],function(){
    var template = {};

    template.multiplePhotoRows = '<div class="container" id="{{productId}}" >\
        <button class="btn non_execution_btn">\
              <span>\
                  <label class="checbox_label" for="chk1">\
                      <input type="checkbox" name="tester " class="execution_checkbox" id="chk1" value="Test1" {{#audited}} {{^non_execution}} disabled {{/non_execution}} {{/audited}} {{#audited}} {{#non_execution}}checked{{/non_execution}}{{/audited}}>\
                      <span class="non_brand_txt"> Promo not executed </span>\
                  </label>\
              </span>\
            </button>\
            <table class="table multiple_photo_table">\
               <tbody class="multiple_photo_table_body">\
                      {{#audited}}\
                        {{^non_execution}}\
                           <tr class="multiple_photo_table_row">\
                              <td>\
                                   <span class="pull-right">\
                                           <button class="btn-mini btn-warning hide remove_item">\
                                           X</button>\
                                   </span>\
                                    <div class="photo_block_container" >\
                                       <img src="{{image_uri}}" width="90%"  height="200px" style="margin-left:2.5%">\
                                       <a class="retake_photo retake_product_photo">Retake</a>\
                                    </div>\
                              </td>\
                           </tr>\
                        {{/non_execution}}\
                        {{#non_execution}}\
                            <tr class="multiple_photo_table_row">\
                                  <td>\
                                    <div class="pull-right">\
                                         <button class="btn-mini btn-warning remove_item" disabled>\
                                          X</button>\
                                    </div>\
                                    <div class="photo_block_container">\
                                     <button class="pull-left btn take_product_photo gillette_store_photo\" disabled>\
                                          <img class="ico_16" src="images/matrix_icons/take_photo_48.png">\
                                          Take Brand Photo\
                                     </button>\
                                    </div>\
                                  </td>\
                            </tr>\
                        {{/non_execution}}\
                      {{/audited}}\
                      {{^audited}}\
                           <tr class="multiple_photo_table_row">\
                              <td>\
                                <div class="pull-right">\
                                     <button class="btn-mini btn-warning remove_item">\
                                      X</button>\
                                </div>\
                                <div class="photo_block_container">\
                                 <button class="pull-left btn take_product_photo gillette_store_photo\">\
                                      <img class="ico_16" src="images/matrix_icons/take_photo_48.png">\
                                      Take Brand Photo\
                                 </button>\
                                </div>\
                              </td>\
                          </tr>\
                   {{/audited}}\
               </tbody>\
            </table>\
            <span class="add_product_photo" >\
               <button class="btn-mini btn-success add_item"  {{#audited}} {{#non_execution}} disabled {{/non_execution}} {{/audited}}>\
               +</button>\
            </span>\
        </div>';

          return template;


    });