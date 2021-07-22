/*************************** Create All Enterprise Table in DB if not exist*****************************************/

function createNorm(tx, success, error) {
    var createStatement = "CREATE TABLE IF NOT EXISTS mxpg_category(category_id TEXT, category_name TEXT, isPromo BOOLEAN DEFAULT(FALSE))";
    tx.executeSql(createStatement, [], success, error);
    // var createIndex = "CREATE UNIQUE INDEX allNormIndex ON mxpg_norm(norm_id, option_id, remark_id)";
    // tx.executeSql(createIndex);
    
}

// function createOption(tx, success, error) {
//     var createStatement = "CREATE TABLE IF NOT EXISTS mxpg_option(option_id TEXT, option_name TEXT)";
//     tx.executeSql(createStatement, [], success, error);
//     var createIndex = "CREATE UNIQUE INDEX allOptionIndex ON mxpg_option(option_id)";
//     tx.executeSql(createIndex);
// }

// function createRemark(tx, success, error) {
//     var createStatement = "CREATE TABLE IF NOT EXISTS mxpg_remark(remark_id TEXT, remark_name TEXT)";
//     tx.executeSql(createStatement, [], success, error);
//     var createIndex = "CREATE UNIQUE INDEX allRemarkIndex ON mxpg_remark(remark_id)";
//     tx.executeSql(createIndex);
// }

/**
 * This method Insert or Replace the record in the All Store table in SQLite DB.
 * @param  {object} db
 * @param  {json} store
 * @param  {function} callback function
 */

// function populateNormTable(db, norms, success, error) {
//     db.transaction(function(tx){
//         for(var i = 0; i < norms.length; i++){
//             var norm = norms[i];
//             tx.executeSql('INSERT OR replace INTO mxpg_norm(norm_id, norm_name, option_id, remark_id) VALUES (?,?,?,?);',
//                 [norm.normId, norm.normName, norm.optionId, norm.remarkId]
//             , success, error);
//         }
//     });
// }

/**
 * This method Insert or Replace the record in the All Store table in SQLite DB.
 * @param  {object} db
 * @param  {json} store
 * @param  {function} callback function
 */

// function populateOptionTable(db, options, success, error) {
//     db.transaction(function(tx){
//         for(var i = 0; i < options.length; i++){
//             var option = options[i];
//             tx.executeSql('INSERT OR replace INTO mxpg_option(option_id, option_name) VALUES (?,?);',
//                 [option.id, option.name]
//             , success, error);
//         }
//     });
// }

/**
 * This method Insert or Replace the record in the All Store table in SQLite DB.
 * @param  {object} db
 * @param  {json} store
 * @param  {function} callback function
 */

// function populateRemarkTable(db, remarks, success, error) {
//     db.transaction(function(tx){
//         for(var i = 0; i < remarks.length; i++){
//             var remark = remarks[i];
//             tx.executeSql('INSERT OR replace INTO mxpg_remark(remark_id, remark_name) VALUES (?,?);',
//                 [remark.id, remark.name]
//             , success, error);
//         }
       
//     });
// }
