/* GET home page. */
exports.index = function(db){
  var collection = db.collection('databases');
  var dbs = collection.find().toArray();
  res.render('index', { title: 'Express', databases: dbs });
};
