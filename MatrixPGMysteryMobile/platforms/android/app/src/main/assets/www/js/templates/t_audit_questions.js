define([],function(){
    var template =  '<div class="audit_header">\
                        <div class="back">\
                            <img src="images/matrix_icons/back_arrow_red_72.png" class="ico_36">\
                        </div>\
                        <div class="left_content header_border_left">\
                            <div class="center_content bold font_18">{{name}}</div>\
                        </div>\
                    </div>\
                    <div class="product_header"><h2 class="font_16" id={{productId}}>{{productName}}</h2></div>\
                    <div class="scroll_parent question_list" id="wrapper_norms">\
                        <div class="norms scroll_ele" href={{priority}} rel={{takePhoto}}>\
                             <!--<div class="pull-right last_visit">\
                                Last visit: \
                                <span class="last_visit_norm"> {{lastVisit}}</span>\
                             </div>-->\
                            {{#norms}}\
                                {{#isFrontage}}\
                                     {{#textBox}}\
                                        <div class="question" rel={{isConsider}}>\
                                            <span class="product_name width_60p field_type " id="{{normId}}" rel="{{normName}}">{{question}}</span>\
                                            <div class="field_intent">\
                                                <textarea min="0" {{#others}}disabled{{/others}} id="{{#options}}{{optionId}}{{/options}}"  value="{{#options}}{{optionName}}{{/options}}" class="{{#total}}total_{{normQType}}{{/total}} {{^total}}{{^others}}{{normQType}}{{/others}}{{/total}} {{#others}}other_{{normQType}}{{/others}} field_value float-left"  type="{{#typeINT}}number{{/typeINT}}{{#typeTEXT}}text{{/typeTEXT}}" name="lname">\
                                                </br>\
                                            </div>\
                                            <div class="error_message">*Field is required</div>\
                                        </div>\
                                    {{/textBox}}\
                                    {{^textBox}}\
                                         <div class="question" rel={{isConsider}} id=-1>\
                                            <div class="product_name" id="{{normId}}" rel="{{normName}}">{{question}}</div>\
                                            <div class="error_message">*Field is required</div>\
                                            <div>\
                                                <select id="frontage_applicable" class="option" style="margin-bottom:10px" type="select">\
                                                    <option>select</option>\
                                                    {{#options}}\
                                                        <option id={{optionId}} {{selected}}>{{optionName}}</option>\
                                                    {{/options}}\
                                                </select>\
                                            </div>\
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
                                            {{#reason}}\
                                             <div class="remarks_3" style="display:{{showRemark}};">\
                                                <textarea type="text" class="remark_txt_bx">{{#no}}{{remarkTxt}}{{/no}}</textarea>\
                                             </div>\
                                            {{/reason}}\
                                        </div>\
                                     {{/textBox}}\
                                {{/isFrontage}}\
                                {{^isFrontage}}\
                                     {{#textBox}}\
                                        <div class="normal question" rel={{isConsider}}>\
                                            <span class="product_name width_60p field_type " id="{{normId}}" rel="{{normName}}">{{question}}</span>\
                                            <div class="field_intent text-center">\
                                                <textarea min="0" {{#others}}disabled{{/others}} id={{#options}}{{optionId}}{{/options}} value="{{#options}}{{optionName}}{{/options}}" class="width_90p {{#total}}total_{{normQType}}{{/total}} {{^total}}{{^others}}{{normQType}}{{/others}}{{/total}} {{#others}}other_{{normQType}}{{/others}} field_value float-left"  type="{{#typeINT}}number{{/typeINT}}{{#typeTEXT}}text{{/typeTEXT}}" name="lname"> {{#options}} {{optionName}} {{/options}}</textarea>\
                                                </br>\
                                            </div>\
                                            <div class="error_message">*Field is required</div>\
                                        </div>\
                                     {{/textBox}}\
                                     {{^textBox}}\
                                        <div class="normal question" rel={{isConsider}}>\
                                            <div class="product_name" id="{{normId}}" rel="{{normName}}">{{question}}</div>\
                                            <div class="error_message">*Field is required</div>\
                                            <div>\
                                                <select class="option {{#hotspotExecution}}hotspot_decision{{/hotspotExecution}}" style="margin-bottom:10px" type="select">\
                                                    <option>select</option>\
                                                    {{#options}}\
                                                        <option id={{optionId}} {{selected}}>{{optionName}}</option>\
                                                    {{/options}}\
                                                </select>\
                                            </div>\
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
                                            {{#reason}}\
                                             <div class="remarks_3" style="display:{{showRemark}};">\
                                                <textarea type="text" class="remark_txt_bx">{{#no}}{{remarkTxt}}{{/no}}</textarea>\
                                             </div>\
                                            {{/reason}}\
                                        </div>\
                                      {{/textBox}}\
                                {{/isFrontage}}\
                            {{/norms}}\
                            <textarea class="auditer_comment" rows="4" cols="50" placeholder="Describe your remark here...">{{auditerCmt}}</textarea>\
                            {{#takePhoto}}\
                               <!-- <button class="btn take_product_photo">\
                                    <img class="ico_16" src="images/matrix_icons/take_photo_48.png">\
                                    <i class="icon_photo"></i> Take Brand Photo\
                                </button> -->\
                            {{/takePhoto}}\
                            <!-- <div class="photo_block">\
                                {{#isImage}}\
                                    <img src="{{imageURI}}" width="95%" height="200px" style="margin-left:2.5%">\
                                    <a class="retake_photo {{element}}">Retake</a>\
                                {{/isImage}}\
                            </div> -->\
                            <button href={{mId}} class="product_done btn btn-success">Done</button>\
                        </div>\
                    </div>';

    return template;
});