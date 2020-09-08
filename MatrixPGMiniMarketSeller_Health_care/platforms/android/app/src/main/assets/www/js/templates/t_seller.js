define([],function(){
    var template =  '<div class="audit_header">\
                        <div class="back">\
                            <img src="images/matrix_icons/back_arrow_red_72.png" class="ico_36">\
                        </div>\
                        <div class="left_content">\
                            <div class="center_content bold font_18 ellipsis width_80p">{{productName}}</div>\
                        </div>\
                    </div>\
                    <div id="wrapper_products" class="scroll_parent products_list">\
                    <div class="scroll_ele">\
                        <div class="products list-group">\
                        </div>\
                        <button class="complete_audit btn btn-success" href={{mId}}>Submit</button>\
                    </div>\
                    </div>';
    return template;
});