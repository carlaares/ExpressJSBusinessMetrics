/* GET home page. */
exports.index = function(db){
  return function(req, res) {
    var collection = db.collection('databases');
    var dbs;
    collection.find().toArray(function(err, docs) {
      dbs = docs;
    });
    var dbs_count = 0;
    collection.count(function(err, count) {
      dbs_count = count;
    });

    res.render('index', { title: 'Express', databases_count: dbs_count, databases: dbs });
  }
};
