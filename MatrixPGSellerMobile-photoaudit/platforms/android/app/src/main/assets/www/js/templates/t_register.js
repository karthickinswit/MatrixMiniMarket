define([],function(){
    var template = '<div class="container">\
    <div class="content">\
        <div id="login-form" class="form-horizontal register-screen" >\
          <div class="control-group">\
            <div class="user_name">\
              <input type="text" id="name" name="name"  class="width_90p input-xlarge" placeholder="Enter your user name *">\
            </div>\
            <div class="user_password">\
              <div>MediaDrm: {{imei}} </div>\
              <div>UUID: {{uuid}}</div>\
            </div>\
          <div class="control-group-login">\
            <div id="login-btn" class="btn btn-primary width_90p">Register</div>\
          </div>\
        </div>\
      </div>\
  </div>';
  
  return template;
  });
  