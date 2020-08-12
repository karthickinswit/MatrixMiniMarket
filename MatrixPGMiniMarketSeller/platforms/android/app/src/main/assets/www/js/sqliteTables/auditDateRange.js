
function createAuditDateRange(tx, success, error) {
    var createStatement = "CREATE TABLE IF NOT EXISTS mxpg_audit_date_range(audit_id TEXT, audit_month TEXT, end_date TEXT, store_id TEXT)";
    tx.executeSql(createStatement, [], success, error);
    var createIndex = "CREATE UNIQUE INDEX mxpg_audit_date_index ON mxpg_audit_date_range(audit_id, store_id)";
    tx.executeSql(createIndex);
}

/**
 * This method Insert or Replace the record in the mxpg_audit_date_range table in SQLite DB.
 * @param  {object} db
 * @param  {json} store
 * @param  {function} callback function
 */

function populateAuditDateRange(db, storesDetails) {
    var obj = "";

    var length = storesDetails.length;

    db.transaction(function(tx){
        for(var i = 0; i < length; i++){
            var store = storesDetails[i];

            tx.executeSql('INSERT OR replace INTO mxpg_audit_date_range(audit_id, audit_month, end_date, store_id) VALUES(?,?,?,?);',
                [store.auditId, store.auditMonth, store.endDate, store.storeId], function(tx, results){

                }, function(a, e){
                    console.log(e);
            });
        }

    });
}



/**
 * This method Select the record from the All Store table in SQLite DB.
 * @param  {object} db
 * @param  {json} store
 */

function findMonthRange(db, storeId, fn) {

    var select_query = "select * from mxpg_audit_date_range where store_id=" + storeId;
    db.transaction(function(tx){
        tx.executeSql(select_query , [], function(tx, response) {
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
