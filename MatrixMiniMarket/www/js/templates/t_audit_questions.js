define([],function(){
    var template = {};
    template.normTemplate =  '<div class="norm_header audit_header">\
                        <div class="back">\
                            <img src="images/matrix_icons/back_arrow_red_72.png" class="ico_36">\
                        </div>\
                        <div class="left_content">\
                            <div class="center_content bold font_18  ellipsis width_80p">{{name}}</div>\
                            <div class="sub_header_name">{{categoryName}}</div>\
                        </div>\
                    </div>\
                    <div class="scroll_parent question_list" id="wrapper_norms">\
                        <div class="norms scroll_ele" href={{priority}} rel={{takePhoto}} id={{categoryType}}>\
                            <div class="category-brand-norm">\
                                {{#norms}}\
                                    {{^isCategoryNorm}}\
                                        {{^iscategorySmartSpot}}\
                                            {{#product_name}}\
                                                <div class="product_header"><h2 class="font_16" id={{productId}}>{{product_name}}</h2></div>\
                                            {{/product_name}}\
                                            {{#isFrontage}}\
                                                {{#textBox}}\
                                                    <div class="question" rel={{isConsider}}>\
                                                        <span class="product_name width_60p field_type " id="{{normId}}-{{productId}}-{{product_name}}" rel="{{normName}}">{{question}}</span>\
                                                        <div class="field_intent">\
                                                            <input rel = "{{percentage}}" min="0" {{#others}}disabled{{/others}} id="{{#options}}{{optionId}}{{/options}}"  value="{{#options}}{{optionName}}{{/options}}" class="{{#total}}total_{{normQType}}{{/total}} {{^total}}{{^others}}{{normQType}}{{/others}}{{/total}} {{#others}}other_{{normQType}}{{/others}} field_value float-left"  type="{{#typeINT}}number{{/typeINT}}{{#typeTEXT}}text{{/typeTEXT}}" name="lname">\
                                                            </br>\
                                                        </div>\
                                                        <div class="error_message">*Field is required</div>\
                                                    </div>\
                                                {{/textBox}}\
                                                {{^textBox}}\
                                                    <div class="question" rel={{isConsider}} >\
                                                        <span class="product_name field_type" id="{{normId}}-{{productId}}-{{product_name}}" rel="{{normName}}">{{question}}</span>\
                                                            <select id="frontage_applicable" class="option" style="margin-bottom:10px" type="select">\
                                                                <option>select</option>\
                                                                {{#options}}\
                                                                    <option id={{optionId}} {{selected}}>{{optionName}}</option>\
                                                                {{/options}}\
                                                            </select>\
                                                        <div class="remarks_1" style="display:{{show1}}">\
                                                            <select class="audit_yes" type="select">\
                                                                <option>select</option>\
                                                                {{#yes}}\
                                                                    <option value={{remarkId}} id={{remarkId}} {{selected}}>{{remarkName}}</option>\
                                                                {{/yes}}\
                                                            </select>\
                                                        </div>\
                                                        <div class="remarks_2" style="display:{{show2}}">\
                                                            <select class="audit_no" type="select">\
                                                                <option>select</option>\
                                                                {{#no}}\
                                                                    <option value={{remarkId}} id={{remarkId}} {{selected}}>{{remarkName}}</option>\
                                                                {{/no}}\
                                                            </select>\
                                                        </div>\
                                                         {{#multiplePhoto}}\
                                                            {{>multiplePhotoRows}}\
                                                         {{/multiplePhoto}}\
                                                    </div>\
                                                {{/textBox}}\
                                            {{/isFrontage}}\
                                            {{^isFrontage}}\
                                                {{#textBox}}\
                                                    <div class="question" rel={{isConsider}}>\
                                                        <span class="product_name width_60p field_type " id="{{normId}}-{{productId}}-{{product_name}}" rel="{{normName}}">{{question}}</span>\
                                                        <div class="field_intent">\
                                                            <input min="0" rel="{{percentage}}" {{#others}}disabled{{/others}} id={{#options}}{{optionId}}{{/options}} value="{{#options}}{{optionName}}{{/options}}" class="{{#total}}total_{{normQType}}{{/total}} {{^total}}{{^others}}{{normQType}}{{/others}}{{/total}} {{#others}}other_{{normQType}}{{/others}} field_value float-left"  type="{{#typeINT}}number{{/typeINT}}{{#typeTEXT}}text{{/typeTEXT}}" name="lname">\
                                                            </br>\
                                                        </div>\
                                                        <div class="error_message">*Field is required</div>\
                                                    </div>\
                                                {{/textBox}}\
                                                {{^textBox}}\
                                                    <div class="question" rel={{isConsider}} id={{#options}}{{optionId}}{{/options}}>\
                                                        <span class="product_name option_header field_type" id="{{normId}}-{{productId}}-{{product_name}}" rel="{{normName}}">{{question}}</span>\
                                                            <select  id="frontage_applicable" class="option {{#hotspotExecution}}hotspot_decision{{/hotspotExecution}}" style="margin-bottom:10px" type="select">\
                                                                <option>select</option>\
                                                                {{#options}}\
                                                                    <option id={{optionId}} {{selected}}>{{optionName}}</option>\
                                                                {{/options}}\
                                                            </select>\
                                                        <div class="remarks_1" style="display:{{show1}}">\
                                                            <select class="audit_yes" type="select">\
                                                                <option>select</option>\
                                                                {{#yes}}\
                                                                    <option value={{remarkId}} id={{remarkId}} {{selected}}>{{remarkName}}</option>\
                                                                {{/yes}}\
                                                            </select>\
                                                        </div>\
                                                        <div class="remarks_2" style="display:{{show2}}">\
                                                            <select class="audit_no" type="select">\
                                                                <option>select</option>\
                                                                {{#no}}\
                                                                    <option value={{remarkId}} id={{remarkId}} {{selected}}>{{remarkName}}</option>\
                                                                {{/no}}\
                                                            </select>\
                                                        </div>\
                                                          {{#multiplePhoto}}\
                                                                {{>multiplePhotoRows}}\
                                                          {{/multiplePhoto}}\
                                                    </div>\
                                                {{/textBox}}\
                                            {{/isFrontage}}\
                                         {{/iscategorySmartSpot}}\
                                    {{/isCategoryNorm}}\
                                    {{#isCategoryNorm}}\
                                        {{#product_name}}\
                                            <div class="category_header product_header"><h2 class="font_16" id={{productId}}>{{product_name}}</h2></div>\
                                        {{/product_name}}\
                                        {{#textBox}}\
                                            <div class="question" rel={{isConsider}}>\
                                                <span class="product_name width_60p field_type " id="{{normId}}-0-0" rel="{{normName}}">{{question}}</span>\
                                                <div class="field_intent">\
                                                    <input rel="{{percentage}}" min="0" id={{#options}}{{optionId}}{{/options}} value="{{#options}}{{optionName}}{{/options}}" class="field_value float-left"  type="{{#typeINT}}number{{/typeINT}}{{#typeTEXT}}text{{/typeTEXT}}" name="lname">\
                                                    </br>\
                                                </div>\
                                                <div class="error_message">*Field is required</div>\
                                            </div>\
                                        {{/textBox}}\
                                        {{^textBox}}\
                                            <div class="question" rel={{isConsider}} id={{#options}}{{optionId}}{{/options}}>\
                                                <span class="product_name option_header field_type"  id="{{normId}}-0-0" rel="{{normName}}">{{question}}</span>\
                                                    <select id="frontage_applicable" rel="category" class="option {{#hotspotExecution}}hotspot_decision{{/hotspotExecution}}" style="margin-bottom:10px" type="select">\
                                                        <option>select</option>\
                                                        {{#options}}\
                                                            <option id={{optionId}} {{selected}}>{{optionName}}</option>\
                                                        {{/options}}\
                                                    </select>\
                                                <div class="remarks_1" style="display:none;">\
                                                    <select class="audit_yes" type="select">\
                                                        <option>select</option>\
                                                        {{#yes}}\
                                                            <option value={{remarkId}} id={{remarkId}} {{selected}}>{{remarkName}}</option>\
                                                        {{/yes}}\
                                                    </select>\
                                                </div>\
                                                <div class="remarks_2" style="display:none;">\
                                                    <select class="audit_no" type="select">\
                                                        <option>select</option>\
                                                        {{#no}}\
                                                            <option value={{remarkId}} id={{remarkId}} {{selected}}>{{remarkName}}</option>\
                                                        {{/no}}\
                                                    </select>\
                                                </div>\
                                                {{#multiplePhoto}}\
                                                    {{>multiplePhotoRows}}\
                                                {{/multiplePhoto}}\
                                            </div>\
                                        {{/textBox}}\
                                    {{/isCategoryNorm}}\
                                {{/norms}}\
                                {{#takePhoto}}\
                                <div class="photo_block {{^multiplePhoto}}single_photo{{/multiplePhoto}}">\
                                    <button class="btn take_product_photo" >\
                                        <img class="ico_16" src="images/matrix_icons/take_photo_48.png">\
                                        <i class="icon_photo"></i> Take Brand Photo\
                                    </button>\
                                 </div>\
                                {{/takePhoto}}\
                                <div class="photo_block {{^multiplePhoto}}single_photo{{/multiplePhoto}}">\
                                    {{#isImage}}\
                                        <img src="{{imageURI}}" width="95%" height="200px" style="margin-left:2.5%">\
                                        <a class="retake_photo {{element}}">Retake</a>\
                                    {{/isImage}}\
                                </div>\
                                {{#qrFlag}}\
                                    <div class="qr_scan_block">\
                                        <input type="text" id="{{previous_code}}" class="qrcode_text" value="{{qrCode}}" disabled ></input>\
                                        <button class="btn btn-small scan_qr">Scan QR</button>\
                                    </div>\
                            	{{/qrFlag}}\
                            </div>\
                         -<button href={{mId}} class="product_done btn btn-success">Done</button>\
                        </div>\
                    </div>';


     template.multiplePhotoRows = '<table class="table gillette_table hide" id="{{normId}}-{{productId}}" >\
                                       <tbody class="gillette_table_body">\
                                           {{#photoRequired}}\
                                              {{#auditImages}}\
                                                   <tr class="gillette_table_row">\
                                                      <td>\
                                                           {{#multiplePhoto}}\
                                                               <span class="pull-right">\
                                                                       <button class="btn-mini btn-warning hide remove_item">\
                                                                       X</button>\
                                                               </span>\
                                                           {{/multiplePhoto}}\
                                                           {{#takePhoto}}\
                                                                {{#photoRequired}}\
                                                                     <div class="photo_block_container  {{#multiplePhoto}}multiple_photo{{/multiplePhoto}} {{^multiplePhoto}}single_photo{{/multiplePhoto}} ">\
                                                                          <button class="pull-left btn take_product_photo {{#multiplePhoto}} gillette_store_photo {{/multiplePhoto}}\">\
                                                                               <img class="ico_16" src="images/matrix_icons/take_photo_48.png">\
                                                                               Take Brand Photo\
                                                                          </button>\
                                                                     </div>\
                                                                {{/photoRequired}}\
                                                           {{/takePhoto}}\
                                                           {{^takePhoto}}\
                                                                <div class="photo_block_container {{#multiplePhoto}}multiple_photo{{/multiplePhoto}} {{^multiplePhoto}}single_photo{{/multiplePhoto}}" >\
                                                                   <img src="{{image_uri}}"  {{#multiplePhoto}} width="90%"  {{/multiplePhoto}} {{^multiplePhoto}} width="95%" {{/multiplePhoto}} height="200px" style="margin-left:2.5%">\
                                                                   <a class="retake_photo retake_product_photo">Retake</a>\
                                                                </div>\
                                                           {{/takePhoto}}\
                                                      </td>\
                                                    </tr>\
                                              {{/auditImages}}\
                                           {{/photoRequired}}\
                                           {{^auditImages}}\
                                               <tr class="gillette_table_row hide">\
                                                  <td>\
                                                      {{#multiplePhoto}}\
                                                            <div class="pull-right">\
                                                                 <button class="btn-mini btn-warning hide remove_item">\
                                                                  X</button>\
                                                            </div>\
                                                      {{/multiplePhoto}}\
                                                      {{#photoRequired}}\
                                                        <div class="photo_block_container  {{#multiplePhoto}}multiple_photo{{/multiplePhoto}} {{^multiplePhoto}}single_photo{{/multiplePhoto}} ">\
                                                             <button class="pull-left btn take_product_photo {{#multiplePhoto}} gillette_store_photo {{/multiplePhoto}}\">\
                                                                  <img class="ico_16" src="images/matrix_icons/take_photo_48.png">\
                                                                  Take Brand Photo\
                                                             </button>\
                                                        </div>\
                                                      {{/photoRequired}}\
                                                  </td>\
                                              </tr>\
                                           {{/auditImages}}\
                                       </tbody>\
                                   </table>\
                                   {{#multiplePhoto}}\
                                       {{^hideMultiplePhotos}}\
                                            <span class="add_product_photo hide">\
                                               <button class="btn-mini btn-success add_item">\
                                               +</button>\
                                            </span>\
                                       {{/hideMultiplePhotos}}\
                                  {{/multiplePhoto}}';

    return template;
});