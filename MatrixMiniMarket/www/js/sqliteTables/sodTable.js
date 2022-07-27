function createSODTable(tx, success, error) {
    var createStatement = "CREATE TABLE IF NOT EXISTS mxpg_sod(sod_id TEXT, sod_name TEXT)";
    tx.executeSql(createStatement, [], success, error);
    var createIndex = "CREATE UNIQUE INDEX cnSodIndex ON mxpg_sod(sod_id)";
    tx.executeSql(createIndex);
}
function createSodImageTable (tx, success, error) {
    var createStatement = "CREATE TABLE IF NOT EXISTS mxpg_sod_mpd(store_id TEXT, category_id TEXT, brand_id TEXT, audit_id TEXT, image_uri TEXT, image_id TEXT, position INTEGER)";
    tx.executeSql(createStatement, [], success, error);
    var createIndex = "CREATE UNIQUE INDEX mxpg_sod_mpd_index ON mxpg_sod_mpd(store_id, category_id, brand_id, audit_id, position)";
    tx.executeSql(createIndex);
}

function populateSODTable(db, sodOptions, success, error) {
    db.transaction(function(tx){
        for(var i = 0; i < sodOptions.length; i++){
            var option = sodOptions[i];

            tx.executeSql('INSERT OR replace INTO mxpg_sod(sod_id, sod_name) VALUES (?,?);',
            [option.sodId, option.sodName], success, error);
        }
    });
}

function createSODProductTable(tx, success, error) {
	var createStatement = "CREATE TABLE IF NOT EXISTS mxpg_comp_sod(audit_id TEXT, store_id TEXT, category_id TEXT, brand_id TEXT, sod_id TEXT, count TEXT)";
    tx.executeSql(createStatement, [], success, error);
    var createIndex = "CREATE UNIQUE INDEX cnCompSodIndex ON mxpg_comp_sod(audit_id, store_id, category_id, brand_id, sod_id )";
    tx.executeSql(createIndex);
}

function populateCompSodTable(db, data, success, error){

	 db.transaction(function(tx){
	 	for(var i = 0; i < data.length; i++){

            var option = data[i];
	        tx.executeSql('INSERT OR replace INTO mxpg_comp_sod(audit_id, store_id, category_id, brand_id, sod_id, count) VALUES (?,?,?,?,?,?);',
	        [option.audit_id, option.store_id, option.category_id, option.brand_id, option.sod_id, option.count], success, error);
    	}
    });
}
function populateSodImageTable(db, product) {
    db.transaction(function(tx){
       var storeId = product.storeId;
       var categoryId = product.categoryId;
       var brandId = product.brandId;
       var auditId = product.auditId;
       var imageUrl = product.image;
       var position = product.imgPos;
       var productName = product.productName;

        tx.executeSql('INSERT OR replace INTO mxpg_sod_mpd(store_id, category_id, brand_id, audit_id,position, image_uri) VALUES (?,?,?,?,?,?);',
               [storeId, categoryId, brandId, auditId,position, imageUrl]);
    });

}
function cleanSodImageTable(db, product, fn) {
    db.transaction(function(tx){
           var storeId = product.storeId;
           var categoryId = product.categoryId;
           
           var auditId = product.auditId;

           tx.executeSql('DELETE FROM mxpg_sod_mpd WHERE store_id=? AND audit_id=?  AND category_id=?;', [storeId, auditId,categoryId], function(){
               fn();
           });
    });
}

function selectCompSodTable(db, categoryId, brandId, auditId, storeId, callback) {
	var query = "select t1.sod_id, t1.count, t2.sod_name from mxpg_comp_sod t1  join mxpg_sod  t2 where t1.audit_id='" + auditId + "' AND t1.store_id='" + storeId +
					"' AND t1.brand_id='"+ brandId + "' AND t1.category_id='"+ categoryId + "'" + " AND t2.sod_id = t1.sod_id" ;
    
    db.transaction(function(tx){
        tx.executeSql(query , [], function(tx, response) {
            var results = [];
            var len = response.rows.length;
            if(len == 0){
            	selectSOD(callback);
            }

            for(var i = 0; i < len; i++){
                var obj = response.rows.item(i);
                results.push(obj);
            }
            
            callback(results);
        });
    });
}
function selectSodImagePhotos(db,categoryId,brandId, auditId, storeId, fn ) {

    var query = "select image_uri, position from mxpg_sod_mpd where category_id='" + categoryId + "' AND brand_id='" + brandId + "' AND audit_id='" + auditId + "' AND store_id='" + storeId +"'";

    db.transaction(function(tx){
        tx.executeSql(query , [], function(tx, response) {
            var results = [];
            var len = response.rows.length;

            for(var i = 0; i < len; i++){
                var obj = response.rows.item(i);
                results.push(obj);
            }

            fn(results);
        });
    });
}

function selectSOD(callback) {
	var query = "select * from mxpg_sod";

	db.transaction(function(tx){
        tx.executeSql(query , [], function(tx, response) {
            var results = [];
            var len = response.rows.length;
            for(var i = 0; i < len; i++){
                var obj = response.rows.item(i);
                results.push(obj);
            }
            
            callback(results);
        });
    });
}
function selectSODMPDDetails(db, storeId, fn) {
    var query = "select * from mxpg_sod_mpd where store_id='" + storeId +"'";


    db.transaction(function(tx){
        tx.executeSql(query , [], function(tx, response) {
            var results = [];
            var len = response.rows.length;

            for(var i = 0; i < len; i++){
                var obj = response.rows.item(i);
                results.push(obj);
            }

            fn(results);
        });
    });

}

function selectSodImageDetails(db, fn){

    var query = "select * from mxpg_sod_mpd";


    db.transaction(function(tx){
        tx.executeSql(query , [], function(tx, response) {
            var results = [];
            var len = response.rows.length;

            for(var i = 0; i < len; i++){
                var obj = response.rows.item(i);
                results.push(obj);
            }

            fn(results);
        });
    });
}
function updateSodImagephotos(db,brandId,auditId,storeId, categoryId, imageId, imgURI, position, success, error) {

    //console.log(db, brandId, storeId, categoryId, imageId, imgURI, position,auditId);
                    // brandId, storeId, categoryId, image, imgURI, imgPosition,auditId

   // if(brandId == "0") {
       var query='UPDATE mxpg_sod_mpd SET image_id='+imageId+' WHERE store_id='+storeId+' AND category_id='+categoryId+' AND image_uri='+imgURI+' AND position='+position+' AND audit_id='+auditId+' AND brand_id='+brandId+';';
      console.log(query);
       db.transaction(function(tx){
        tx.executeSql('UPDATE mxpg_sod_mpd SET image_id=? WHERE store_id=? AND category_id=? AND image_uri=? AND position=? AND audit_id=? AND brand_id=?;',
        [imageId, storeId, categoryId, imgURI, position,auditId,brandId],success, error
    
            
        );
    
            
        });
   // }

}
function sodCompleted(db, categoryId, channelId, storeId, success, error) {
    var query = "select count(sod_id) as sodCompCount from mxpg_comp_sod where  store_id =" + storeId ;
    
    db.transaction(function(tx){
        tx.executeSql(query, [], function(tx, response){
            var rows = response.rows;
            var len = response.rows.length;
            var sodCompCount=response.rows.item(0).sodCompCount;
           if(sodCompCount>0){
            success(true)
           }
           else{
            success(false)
           }
                console.log("results"+ sodCompCount);
            });
        }, error);
    

}
function selectSodImageDetails(db, fn){

    var query = "select * from mxpg_sod_mpd";


    db.transaction(function(tx){
        tx.executeSql(query , [], function(tx, response) {
            var results = [];
            var len = response.rows.length;

            for(var i = 0; i < len; i++){
                var obj = response.rows.item(i);
                results.push(obj);
            }

            fn(results);
        });
    });
}
