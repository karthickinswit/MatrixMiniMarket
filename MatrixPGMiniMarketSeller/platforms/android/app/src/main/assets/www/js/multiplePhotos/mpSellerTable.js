function createSellerCompTable (tx, success, error) {
    var createStatement = "CREATE TABLE IF NOT EXISTS mxpg_mp_seller(store_id TEXT, category_id TEXT, brand_id TEXT, image_uri TEXT, image_id TEXT , position INTEGER, non_execution TEXT)";
    tx.executeSql(createStatement, [], success, error);
    var createIndex = "CREATE UNIQUE INDEX mxpg_mp_index ON mxpg_mp_seller(store_id, category_id, brand_id, image_uri, position)";
    tx.executeSql(createIndex);
}


function populateMPTable(db, product) {
     db.transaction(function(tx){
        var storeId = product.storeId;
        var categoryId = product.categoryId;
        var brandId = product.brandId;
        var imageUrl = product.image || "";
        var position = product.imgPos || "";
        var nonExecution = product.nonExecution || false;

         tx.executeSql('INSERT OR replace INTO mxpg_mp_seller(store_id, category_id, brand_id, image_uri, position, non_execution, image_id) VALUES (?,?,?,?,?,?,?);',
            [storeId, categoryId, brandId, imageUrl, position, nonExecution, ""]);
     });

}


function cleanMPTable(db, product, fn) {
     db.transaction(function(tx){
            var storeId = product.storeId;
            var categoryId = product.categoryId;
            var brandId = product.brandId;
            var normId = product.normId;

            tx.executeSql('DELETE FROM mxpg_mp_seller WHERE store_id=? AND category_id=? AND brand_id=?;', [storeId, categoryId, brandId], function(){
                fn();
            });
     });
}


function selectCompletedProduct(db, storeId, categoryId, brandId, fn) {
      db.transaction(function(tx){
            tx.executeSql('SELECT * FROM mxpg_mp_seller WHERE store_id=? AND category_id=? AND brand_id=?;',
            [storeId, categoryId, brandId], function(tx, response){
                var results = [];
                var len = response.rows.length;

                for(var i = 0; i < len; i++){
                    var obj = response.rows.item(i);
                    obj.non_execution = (obj.non_execution == "true")? true:false;
                    results.push(obj);
                }

                fn(results);
            });
      });
}


/**
 * This method Select the all distinct record from compProductTable
 * @param  {object} db
 * @param  {json} store
 */

function completedProducts(db, storeId, fn) {

    var query = "select DISTINCT category_id, brand_id as product_id from mxpg_mp_seller where store_id= '" + storeId + "'";

    //query = query+ " group by channel_id";

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


/**
 * This method Select the all distinct record from compProductTable
 * @param  {object} db
 * @param  {json} store
 */

function selectCompSellerProducts(db, storeId, fn, categoryId, isSOS) {

    var query = "select image_id, brand_id, image_uri, category_id, non_execution, position from mxpg_mp_seller where store_id= " + storeId;

    //query = query+ " group by channel_id";

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

function isFullAuditCompleted(db, storeId, channelId, fn) {

    var query1 = "select count(DISTINCT category_id) as categoryCount from mxpg_mp_seller where store_id = '" + storeId + "'";

    var query2 = "select count(t1.category_id) as categoryCount from mxpg_cc_map t1 join mxpg_category t2 on t2.category_id = t1.category_id where t1.channel_id = "+ channelId +" order by t2.category_id asc";


    db.transaction(function(tx){
        tx.executeSql(query1 , [], function(tx, response) {
            var len = response.rows.length;
            var categoryCompCount = response.rows.item(0).categoryCount;

            db.transaction(function(tx){
                tx.executeSql(query2, [], function(tx, response){
                     var len = response.rows.length;
                     var categoryCount = response.rows.item(0).categoryCount;

                     if(categoryCompCount == categoryCount) {
                         fn(true);
                     }
                });
            });
        });
    });
}