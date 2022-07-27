define([],function(){
var template = '<div class="audit_header">\
                    <div class="back">\
                        <img src="images/matrix_icons/back_arrow_red_72.png" class="ico_36">\
                    </div>\
                    <div class="left_content">\
                        <div class="center_content bold font_18 ellipsis width_80p">{{storeName}}</div>\
                    </div>\
                </div>\
                <div id="wrapper_products" class="scroll_parent products_list">\
                    <div class="scroll_ele">\
                        <ul class="products list-group">\
                            <table class="table table-bordered holistic_table" border="1">\
                                <thead>\
                                   <tr>\
                                        <th>Product name</th>\
                                        {{#isSOS}}<th>SOS %</th>{{/isSOS}}\
                                        {{#isSKU}}<th>SKU %</th>{{/isSKU}}\
                                        <th>Smartspot / Device</th>\
                                   </tr>\
                                </thead>\
                                <tbody>\
                                   {{#audits}}\
                                     <tr>\
                                        <td>{{ productName}}</td>\
                                        {{#isSOS}}<td>{{#sos_percnt}}{{ sos_percnt}} %{{/sos_percnt}}{{^sos_percnt}}NA{{/sos_percnt}}</td>{{/isSOS}}\
                                        {{#isSKU}}<td>{{#sku_percnt}}{{ sku_percnt}} %{{/sku_percnt}}{{^sku_percnt}}NA{{/sku_percnt}}</td>{{/isSKU}}\
                                        <td class="Default {{smartspot}}">{{#smartspot}}{{ smartspot}}{{/smartspot}}{{^smartspot}}NA{{/smartspot}}</td>\
                                      </tr>\
                                   {{/audits}}\
                                 </tbody>\
                            </table>\
                        </ul>\
                        <button class="audit-btn go_next btn btn-success" href={{mId}}>Complete Audit</button>\
                      </div>\
                  </div>';

return template;
});
