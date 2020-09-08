function createCategoryChannelMap (tx, success, error) {
	var createStatement = "CREATE TABLE IF NOT EXISTS mxpg_cc_map(channel_id TEXT, category_id TEXT, audit_month TEXT, audit_month_id TEXT)";
    tx.executeSql(createStatement, [], success, error);
/*    var createIndex = "CREATE UNIQUE INDEX ccMapIndex ON mxpg_cc_map(category_id)";
    tx.executeSql(createIndex);
*/}

function populateCategoryChannel(db, ccMap, callback, error) {
	db.transaction(function(tx){
		for(var i = 0; i < ccMap.length; i++){
			var channelCategory = ccMap[i];
		    tx.executeSql('INSERT OR replace INTO mxpg_cc_map(channel_id, category_id, audit_month, audit_month_id) VALUES (?,?,?,?);',
		        [channelCategory.channelId, channelCategory.categoryId, channelCategory.auditMonth, channelCategory.auditId]
		    , callback, error);
		}
	});
}

function selectAuditedMonth(db, storeId, callback) {
    var query = 'SELECT * FROM mxpg_comp_audits where store_id ='+ storeId;

    db.transaction(function(tx){
        tx.executeSql(query, [], function(tx, response){

            var results = [];
            var len = response.rows.length;
            var obj = response.rows.item(0);

            callback(obj.month_audit_id);
        });
    });
}