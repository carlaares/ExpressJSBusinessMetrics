/* GET home page. */
exports.index = function(db){
  return function(req, res) {
    var collection = db.collection('databases');
    collection.find().toArray(function(err, docs) {
      res.render('index', { title: 'Express', databases_count: docs.length, databases: docs });
    });
  }
};
